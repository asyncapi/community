## Overview

In the [search for the right governance model](https://www.asyncapi.com/blog/governance-motivation), we ended up defining a Technical Steering Committee (TSC) that can help make decisions related to the entire AsyncAPI Initiative and not only a specific repository. TSC voting is described in the official [Charter](https://github.com/asyncapi/community/blob/master/CHARTER.md#4-tsc-voting).

To make the voting process easier with proper automation, we use [**Git Vote**](https://github.com/cncf/gitvote) bot.

### Voting Location

- Voting must only take place in the [community](https://github.com/asyncapi/community) repository.
- Voting automation works only with GitHub Issues and Pull Requests.

The Discussions should only be used for initial discussion, brainstorming ideas, or seeking initial support.

In the majority of cases, topics we vote on introduce new rules or ways of doing things. This implies that proper community documentation is needed for these topics. We recommend using Pull Requests instead of Issues to conduct voting on a topic, as it allows you to provide context and finalize documentation.

### Voting Rules

* Only votes from [TSC members](https://www.asyncapi.com/community/tsc) are counted. You are still encouraged to participate in voting, even if your vote is not binding.
* TSC members have at least 7 calendar days to vote. As a community, we did not set an exact voting deadline and only have a rule that you can translate into: "Just be nice and give people at least 7 days to get familiar with the topic so they can vote." Our automation is set for 4 weeks to take into account all possible limitations related to holidays and other events.
* TSC members can skip some votes, although, if you do not have an opinion, please participate with 👀 to indicate that you saw a vote but you have no opinion and abstain. There is one strict rule, though: if you do not participate in voting within three months, you will stop being a TSC member. It has nothing to do, though, with your maintainer responsibilities.
* The vote is completed when more than 50% of the voting is in favor.

### Voting Process

#### Start Voting

1. The TSC member adds a `/vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment with instructions on how the voting should be done. It is based on  👍🏼 , 👎🏼 and 👀 emojis. You can still put comments or suggestions.
3. The AsyncAPI bot adds a `vote` label, making it easier to extract information about voted topics and participation.

#### Check Status

1. Anyone can add a `/check-vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment with an update on how many binding votes were provided. And how much the percentage is required to finish the voting process.

### Cancel Voting

1. The TSC member adds `/cancel-vote` comment to an Issue or a Pull Request.
2. The Git Vote bot creates a comment.
3. The AsyncAPI bot removes the `vote` label.

### Finish Voting

Voting cannot be concluded with a comment; it ends when more than half of the users with binding votes say yes or when the deadline passes.

The Git Vote bot adds a comment that voting is completed.

### Note

* As per the [Charter](./CHARTER.md), a quorum is not needed. However, Git Vote has technical limitations, and a quorum should be reached. That's why we allocate 4 weeks for voting, and it's important to actively encourage participation to ensure that the quorum (where votes cast exceed 50% of eligible voters) is met.
* The abstain votes are included in the total number of votes; they are not removed.
* At present, Git Vote is enabled in the community repo only, and the Git Vote bot handles all voting processes. We will add Git Vote to other projects in the future.
