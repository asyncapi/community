const yaml = require("js-yaml");
const { readFile, writeFile } = require("fs").promises;
const path = require("path");
module.exports = async ({ github, context, botCommentURL }) => {
	try {
		let message, eventNumber, eventTitle, orgName, repoName;
		if (botCommentURL) {
			const voteCommentContext = await fetchCommentInformation();
			message = voteCommentContext.messageBody;
			eventNumber = voteCommentContext.eventNumber;
			eventTitle = voteCommentContext.eventTitle;
			orgName = voteCommentContext.orgName;
			repoName = voteCommentContext.repoName;
		} else {
			// Extract necessary details from the context when triggered by issue_comment
			message = context.payload.comment.body;
			eventNumber = context.issue.number;
			eventTitle = context.payload.issue.title;
			orgName = context.repo.owner;
			repoName = context.repo.repo;
		}

		// Path to the vote tracking file
		const voteTrackingFile = path.join("voteTrackingFile.json");

		// Parse the vote-closed comment created by git-vote[bot]
		const votingRows = await parseVoteClosedComment();

		// Example table vote comment that is parsed here https://github.com/asyncapi/community/issues/1227#issuecomment-2167463252
		const latestVotes = votingRows.map((row) => {
			//skipping first element as parsing is based on split, so table where column starts with | will have first element of created array empty
			const [, user, vote, timestamp] = row.split("|").map((col) => col.trim());
			return {
				user: user.replace("@", ""),
				vote,
				timestamp,
				isVotedInLast3Months: true,
			};
		});

		console.log(
			"content of latestVotes:",
			JSON.stringify(latestVotes, null, 2)
		);

		let maintainerInformation;
		try {
			const maintainerInfo = await readFile("MAINTAINERS.yaml", "utf8");
			maintainerInformation = yaml.load(maintainerInfo);
		} catch (readError) {
			console.error("Error reading MAINTAINERS.yaml:", readError);
			throw readError;
		}

		// Update the TSC Members
		const voteDetails = await updateVoteTrackingFile();
		console.log(
			"content of voteDetails:",
			JSON.stringify(voteDetails, null, 2)
		);

		const updatedVoteDetails = [];

		// Process each vote detail to update voting information
		voteDetails.forEach((voteInfo) => {
			const userVote = latestVotes.find(
				(vote) => vote.user.toLowerCase() === voteInfo.name.toLowerCase()
			);

			console.log("content of userVote:", JSON.stringify(userVote, null, 2));

			let currentTime;
			if (userVote && userVote.timestamp) {
				currentTime = userVote.timestamp.toString().split(" ")[0];
			}
			const userInfo = latestVotes.find(
				(vote) => vote.user.toLowerCase() === voteInfo.name.toLowerCase()
			);

			console.log("content of userInfo:", JSON.stringify(userInfo, null, 2));

			const voteChoice = userInfo ? userInfo.vote : "Not participated";

			console.log(
				"content of voteChoice:",
				JSON.stringify(voteChoice, null, 2)
			);

			voteInfo.lastVoteClosedTime = new Date().toISOString().split("T")[0];

			console.log("content of voteInfo:", JSON.stringify(voteInfo, null, 2));

			if (userInfo) {
				voteInfo.isVotedInLast3Months = isVotingWithinLastThreeMonths(voteInfo);
        voteInfo.lastParticipatedVoteTime = currentTime;
				voteInfo[
					voteChoice === "In favor"
						? "agreeCount"
						: voteChoice === "Against"
						? "disagreeCount"
						: "abstainCount"
				]++;
			} else {
				voteInfo.notParticipatingCount++;
				if (!isVotingWithinLastThreeMonths(voteInfo)) {
					voteInfo.isVotedInLast3Months = false;
				}
			}

			// Update vote information with the issue title and number
			let updatedVoteInfo = {};
			Object.keys(voteInfo).forEach((key) => {
				if (key === "name") {
					updatedVoteInfo["name"] = voteInfo.name;
					updatedVoteInfo[eventTitle + "$$" + eventNumber] = voteChoice;
				} else {
					updatedVoteInfo[key] = voteInfo[key];
				}
			});
			updatedVoteDetails.push(updatedVoteInfo);
		});

		try {
			await writeFile(
				voteTrackingFile,
				JSON.stringify(updatedVoteDetails, null, 2)
			);
		} catch (writeError) {
			console.error("Error writing to voteTrackingFile.json:", writeError);
			throw writeError;
		}

		const markdownTable = await jsonToMarkdownTable(updatedVoteDetails);
		try {
			await writeFile("TSC_VOTING_OVERVIEW.md", markdownTable);
			console.log("Markdown table has been written to TSC_VOTING_OVERVIEW.md");
		} catch (writeError) {
			console.error("Error writing to TSC_VOTING_OVERVIEW.md:", writeError);
			throw writeError;
		}

		async function jsonToMarkdownTable(data) {
			if (!data || data.length === 0) {
				console.error("Data is empty or undefined");
				return "";
			}

			const keys = Object.keys(data[0]).filter(
				(key) => key !== "firstVoteClosedTime"
			);

			const titles = {
				name: "GitHub user name",
				lastParticipatedVoteTime:
					"Last time the TSC member participated in a vote",
				hasVotedInLast3Months:
					"Flag indicating if TSC member voted in last 3 months. This information is calculated after each voting, and not basing on a schedule as there might be moments when there is no voting in place for 3 months and therefore no TSC member votes.",
				lastVoteClosedTime:
					"Date when last vote was closed. It indicated when the last voting took place and marks the date when this tracking document was updated.",
				agreeCount: "Number of times TSC member agreed in a vote.",
				disagreeCount: "Number of times TSC member did not agree in a vote.",
				abstainCount: "Number of times TSC member abstained from voting.",
				notParticipatingCount:
					"Number of times TSC member did not participate in voting.",
			};

			// Fill missing properties with default values and log the processing
			data = data.map((obj, index) => {
				const newObj = {};
				keys.forEach((key) => {
					newObj[key] = obj[key] !== undefined ? obj[key] : "N/A";
				});
				return newObj;
			});

			let markdownTable =
				"<!-- This file is generated by a script. Do not manually update it unless there is a visible mistake and point to the script that is responsible for updating the document. -->\n";
			markdownTable +=
				"| " +
				keys
					.map((key) => {
						if (key.includes("$$")) {
							const [title, number] = key.split("$$");
							return `[${title}](https://github.com/${orgName}/${repoName}/issues/${number})`;
						}
						return `<span style="position: relative; cursor: pointer;" title="${
							titles[key] || key
						}">${key}</span>`;
					})
					.join(" | ") +
				" |\n";

			markdownTable += "| " + keys.map(() => "---").join(" | ") + " |\n";
			markdownTable += data
				.map(
					(obj) =>
						"| " +
						keys
							.map((key) => {
								if (key === "name")
									return `[${obj[key]}](https://github.com/${obj[key]})`;
								if (key.includes("$$")) {
									const icons = {
										"In favor": "👍",
										Against: "👎",
										Abstain: "👀",
										"Not participated": "🔕",
									};
									return `<span style="position: relative; cursor: pointer;" title="${
										obj[key]
									}">${icons[obj[key]] || obj[key]}</span>`;
								}
								return obj[key];
							})
							.join(" | ") +
						" |"
				)
				.join("\n");

			return markdownTable;
		}

		// Parse the vote-closed comment created by git-vote[bot]
		// No need to look for "Vote closed" as this is already validated by the workflow that runs this code
		async function parseVoteClosedComment() {
			const bindingVotesSectionMatch = message.match(
				/Binding votes \(\d+\)[\s\S]*?(?=(<details>|$))/
			);
			const bindingVotesSection = bindingVotesSectionMatch
				? bindingVotesSectionMatch[0]
				: "";
			return bindingVotesSection.match(/\| @\w+.*?\|.*?\|.*?\|/g) || [];
		}

		// Check if voting duration is within the last three months
		function isVotingWithinLastThreeMonths(voteInfo) {
      const currentDate = new Date();
      let lastVoteDate;

      if (voteInfo.lastParticipatedVoteTime && !voteInfo.lastParticipatedVoteTime.includes("Member has not")) {
        lastVoteDate = new Date(voteInfo.lastParticipatedVoteTime);
      } else {
        return false; // No valid voting history
      }

      const diffInDays = (currentDate - lastVoteDate) / (1000 * 60 * 60 * 24);
      return diffInDays <= 90; // 90 days = 3 months
    }

    // Function to update the voteTrackingFile with updated TSC Members
		async function updateVoteTrackingFile() {
			const tscMembers = maintainerInformation.filter(
				(entry) => entry.isTscMember
			);
			let voteDetails = [];
			try {
				voteDetails = JSON.parse(await readFile(voteTrackingFile, "utf8"));
			} catch (readError) {
				console.error("Error reading voteTrackingFile.json:", readError);
				throw readError;
			}
			let updatedVoteDetails = [...voteDetails];
			const updatedTSCMembers = [];
			const requiredKeys = [
				"name",
				"lastParticipatedVoteTime",
				"isVotedInLast3Months",
				"lastVoteClosedTime",
				"agreeCount",
				"disagreeCount",
				"abstainCount",
				"notParticipatingCount",
			];
			// Function to check if an object has all required keys
			const isValidExampleMember = (member) => {
				return requiredKeys.every((key) => member.hasOwnProperty(key));
			};
			// Find the first valid example member
			const validExampleMember = voteDetails.find(isValidExampleMember);

			if (validExampleMember) {
				tscMembers.forEach((member) => {
					const existingMember = voteDetails.find(
						(voteInfo) =>
							voteInfo.name.toLowerCase() === member.github.toLowerCase()
					);
					if (!existingMember) {
						// Create a new member by copying the structure of the valid example member
						const newMember = {};

						// Copy the keys from the valid example member to the new member with default values
						Object.keys(validExampleMember).forEach((key) => {
							switch (key) {
								case "name":
									newMember[key] = member.github;
									break;
								case "lastParticipatedVoteTime":
									newMember[key] =
										"Member has not participated in all previous voting process.";
									break;
								case "isVotedInLast3Months":
									newMember[key] =
										"Member has not participated in all previous voting process.";
									break;
								case "lastVoteClosedTime":
									newMember[key] = new Date().toISOString().split("T")[0];
									break;
								case "firstVoteClosedTime":
									newMember[key] = validExampleMember["firstVoteClosedTime"]; // This is used to determine when the first vote closed so that we can determine the duration between two votes easily
									break;
								case "agreeCount":
								case "disagreeCount":
								case "abstainCount":
								case "notParticipatingCount":
									newMember[key] = 0;
									break;
								default:
									newMember[key] = "Not participated";
							}
						});

						updatedTSCMembers.push(newMember);
					}
				});
			} else {
				console.log("No valid example member found in voteDetails.");
			}

			if (updatedTSCMembers.length > 0) {
				try {
					updatedVoteDetails = updatedVoteDetails.concat(...updatedTSCMembers);
          await writeFile(
						voteTrackingFile,
						JSON.stringify(updatedVoteDetails, null, 2)
					);
				} catch (writeError) {
					console.error("Error wile writing file:", writeError);
				}
			}
			return updatedVoteDetails;
		}
		// Method to fetch information from the comment when workflow triggered manually
		async function fetchCommentInformation() {
			const urlParts = botCommentURL.split("/");
			const eventNumber = urlParts[urlParts.length - 1].split("#")[0];
			const commentId = urlParts[urlParts.length - 1]
				.split("#")[1]
				.replace("issuecomment-", "");
			const [owner, repo] = urlParts.slice(3, 5);
			let orgName = owner;
			let repoName = repo;
			let messageBody = "";
			let eventTitle = "";

			try {
				const messageResponse = await github.request(
					"GET /repos/{owner}/{repo}/issues/comments/{comment_id}",
					{
						owner: owner,
						repo: repo,
						comment_id: commentId,
					}
				);
				messageBody = messageResponse.data.body;

				const issueResponse = await github.rest.issues.get({
					owner,
					repo,
					issue_number: eventNumber,
				});
				eventTitle = issueResponse.data.title;
			} catch (error) {
				console.error(error);
			}

			return {
				orgName,
				repoName,
				eventNumber,
				commentId,
				messageBody,
				eventTitle,
			};
		}
	} catch (error) {
		console.error("Error while running the vote_tracker workflow:", error);
	}
};
