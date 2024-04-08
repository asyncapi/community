## Overview

In the [search for the right governance model](https://www.asyncapi.com/blog/governance-motivation) we ended up defining Technical Steering Committee (TSC) that can help making decisions that are related to entire AsyncAPI Initiative and not only specific repository. TSC voting is described in official [Charter](https://github.com/asyncapi/community/blob/master/CHARTER.md#4-tsc-voting).

To make voting process easier with proper automation we use [**git-vote**](https://github.com/cncf/gitvote) bot.
### Voting Rules

* The voting will be done by only TSC Members.
* The duration of the voting will be 2 minutes. 
* The vote will be passed when more than 50% voting are in favour.

### Voting Process

#### Start Voting

1. TSC member adds `/vote` comment to an Issue or a Pull Request.
2. Git Vote bot creates a comment with instruction on how the voting should be done. It is based on  👍🏼 , 👎🏼 and 👀 emojis. You can still put comments or suggestions.
3. AsyncAPI bot adds `vote` label so later it is easier for us to extract information about voted topics and participation.

#### Check Status

1. Anyone can add `/check-vote` comment to an Issue or a Pull Request.
2. Git Vote bot creates a comment with update on how many binding votes were provided and how much is missing to reach the quorum.

### Cancel Voting

1. TSC member adds `/cancel-vote` comment to an Issue or a Pull Request.
2. Git Vote bot creates a comment.
3. AsyncAPI bot removes `vote` label.

### Finish Voting

There is no way to complete voting with a comment. It ends either when quorum is reached or duration deadline ends.

Git Vote bot adds a comment that voting is completed.
