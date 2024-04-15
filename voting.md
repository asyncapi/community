## Overview

In the [search for the right governance model](https://www.asyncapi.com/blog/governance-motivation) we ended up defining a Technical Steering Committee (TSC) that can help make decisions that are related to the entire AsyncAPI Initiative and not only a specific repository. TSC voting is described in the official [Charter](https://github.com/asyncapi/community/blob/master/CHARTER.md#4-tsc-voting).

To make the voting process easier with proper automation we use [**git-vote**](https://github.com/cncf/gitvote) bot.

### Voting Location

- Voting must only take place in the [community](https://github.com/asyncapi/community) repository.
- Voting automation works only with GitHub Issues and Pull Requests.

Discussions should be used only for initial discussion, to brainstorm ideas or to get some initial support.

In the majority of cases topics we vote on introduce some new rules, some new ways of doing things. This means that in the majority of cases, the topic we vote on needs proper community documentation. We recommend that you use Pull Requests over Issues to run voting on a topic where you provide context and final documentation.

### Voting Rules

* Only votes from [TSC members](https://www.asyncapi.com/community/tsc) are counted. You are still encouraged to participate in voting, even if your vote is not binding.
* TSC members have no less than 7 calendar days to vote. As a community, we did not set an exact voting deadline and only have a rule that you can translate into: "Just be nice and give people at least 7 days to get familiar with the topic so they can vote". Our automation is set for 4 weeks, to take into account all possible limitations related to holidays and other events.
* TSC members can skip some votes, although, if you do not have an opinion, please participate with 👀 to indicated that you saw a vote, but you have no opinion and abstain. There is one strict rule though, that if you do not participate in voting within any three-month period, you stop being TSC member. It has nothing to do though with your maintainer responsibilities.
* The vote is completed when more than 50% voting are in favour.

### Voting Process

#### Start Voting

1. TSC member adds a `/vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment with instructions on how the voting should be done. It is based on  👍🏼 , 👎🏼 and 👀 emojis. You can still put comments or suggestions.
3. The AsyncAPI bot adds a `vote` label making it easier for us to extract information about voted topics and participation.

#### Check Status

1. Anyone can add a `/check-vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment with an update on how many binding votes were provided. and how much the percentage requires to finish the voting process.

### Cancel Voting

1. The TSC member adds `/cancel-vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment.
3. The AsyncAPI bot removes the `vote` label.

### Finish Voting

There is no way to complete voting with a comment. It ends either when the majority of the positive voting is reached that is least >50% of the users with binding votes or the duration deadline ends.

The Git Vote bot adds a comment that voting is completed.

### Note

* As per the CHARTER, quorum is not needed. However, git-vote has technically limitations and quorum should be reached. That's the reason we give 4 weeks to vote and we should chase people to vote in order to reach the quorum of people (people voting is >50).
* The abstain votes are included in the total number of votes, they are not removed.
* At present, the git-vote is enabled in the community repo only, and all the voting process will be done by git-vote bot, We will add git-vote feature in other projects as well in future.
