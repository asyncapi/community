## Overview

In the [search for the right governance model](https://www.asyncapi.com/blog/governance-motivation) we ended up defining Technical Steering Committee (TSC) that can help making decisions that are related to entire AsyncAPI Initiative and not only specific repository. TSC voting is described in official [Charter](https://github.com/asyncapi/community/blob/master/CHARTER.md#4-tsc-voting).

To make voting process easier with proper automation we use [**git-vote**](https://github.com/cncf/gitvote) bot.

### Voting Location

- Voting must take place only in [community](https://github.com/asyncapi/community) repository
- Voting automation works only with GitHub Issues and Pull Requests

Discussions should be used only for initial discussion, to brainstorm ideas or get some initial support.

In majority of cases topics we vote on introduce some new rules, some new ways of doing things. This means that in majority of cases the topic we vote on needs proper community documentation. We recommend that you use Pull Requests over Issues to run voting on topic where you provide context and final documentation.

### Voting Rules

* Only votes from [TSC members](https://www.asyncapi.com/community/tsc) are counted. You are still encouraged to participate in voting, even if your vote is not binding.
* TSC members have no less than 7 calendar days to vote. As community we did not set exact voting deadline and only have a rule that you can translate into: "just be nice and give people at least 7 days to get familiar with the topic so they can vote". Our automation is set for 4 weeks, to take into account all possible limitations related to holidays and other events.
* The vote completes when more than 50% voting are in favour.

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
