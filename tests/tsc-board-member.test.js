const fs = require('fs-extra');
const path = require('path');
const { writeJSON } = require('../scripts/helpers/writeJSON');
const { 
  loadJson, 
  hasRelevantFlag, 
  mergeUniqueMembers, 
  generateTSCBoardMembersList 
} = require('../scripts/tsc-board-member');

jest.mock('fs-extra');
jest.mock('../scripts/helpers/writeJSON');

describe('generateTSCBoardMembersList', () => {
  const maintainers = [
    { github: 'alice', isTscMember: true },
    { github: 'bob', isBoardChair: true },
    { github: 'charlie' } // no flag
  ];

  const ambassadors = [
    { github: 'bob', isBoardMember: true }, // overlap
    { github: 'dave', isBoardMember: true },
    { github: 'eve' } // no flag
  ];

  const mergedExpected = [
    { github: 'alice', isTscMember: true },
    { github: 'bob', isBoardChair: true, isBoardMember: true },
    { github: 'dave', isBoardMember: true }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loadJson should parse JSON content', () => {
    const json = JSON.stringify([{ github: 'test', isTscMember: true }]);
    fs.readFileSync.mockReturnValueOnce(json);

    const result = loadJson('path/to/file.json');
    expect(result).toEqual([{ github: 'test', isTscMember: true }]);
    expect(fs.readFileSync).toHaveBeenCalledWith('path/to/file.json', 'utf-8');
  });

  it('hasRelevantFlag should return true for members with flags', () => {
    expect(hasRelevantFlag({ isTscMember: true })).toBe(true);
    expect(hasRelevantFlag({ isBoardMember: true })).toBe(true);
    expect(hasRelevantFlag({ isBoardChair: true })).toBe(true);
    expect(hasRelevantFlag({})).toBe(false);
  });

  it('mergeUniqueMembers should merge and deduplicate members correctly', () => {
    const result = mergeUniqueMembers(maintainers, ambassadors);
    expect(result).toEqual(mergedExpected);
  });

  it('generateTSCBoardMembersList should write filtered list and call writeJSON', async () => {
    fs.readFileSync.mockImplementation((filePath) => {
      if (filePath.includes('MAINTAINERS.json')) return JSON.stringify(maintainers);
      if (filePath.includes('AMBASSADORS_MEMBERS.json')) return JSON.stringify(ambassadors);
      return '[]';
    });

    const logSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
    await generateTSCBoardMembersList();

    expect(writeJSON).toHaveBeenCalledWith('MAINTAINERS.yaml', 'MAINTAINERS.json');
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'TSC_BOARD_MEMBERS.json',
      JSON.stringify(mergedExpected, null, 2)
    );
    expect(logSpy).toHaveBeenCalledWith('✅ Generated 3 filtered TSC/Board members');
  });

  it('generateTSCBoardMembersList should handle errors and log them', async () => {
    writeJSON.mockRejectedValueOnce(new Error('Failed to convert YAML'));
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await generateTSCBoardMembersList();

    expect(errorSpy).toHaveBeenCalledWith(
      '❌ Failed to generate TSC members list:',
      expect.any(Error)
    );
  });
});
