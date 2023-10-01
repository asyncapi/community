# AsyncAPI Bounty Program


## Budget

The budget of the Bounty Program per calendar year is twenty thousand US dollars 00 cents (USD 20,000.00), which is five thousand US dollars 00 cents (USD 5,000.00) per calendar quarter (three calendar months).

Reward for Bounty Issue of Complexity Level `Medium` is two hundred US dollars 00 cents (USD 200.00).

Reward for Bounty Issue of Complexity Level `Advanced` is four hundred US dollars 00 cents (USD 400.00).

Approximate quantity of Bounty Issues per calendar quarter varies from thirteen to twenty five (from ((12 * 400) + (1 * 200)) to (25 * 200)).


## Prioritization of participants

Bounty Program Participants are prioritized in the following order:

1. AsyncAPI maintainers (from any repository)

2. Regular contributors (GitHub users who have three or more Pull Requests merged throughout the AsyncAPI GitHub organization)

3. Other (if a GitHub user doesn't fall under the above, the maintainer can determine the criteria i. e. regular volunteers, etc)


## Bounty Issues' numbering

To ensure ease of referencing, searching and automation, strictly defined format of Bounty Issues' numbering is used:

1. In submissions of issues for Bounty Program: `[repo]#[issue]` (`cli#38`)

2. In invoice claiming reward: invoice subject `Bounty [repo]#[issue]` (`Bounty cli#38`), tag `bounty`


## Bounty Issue Submission

Up to two Bounty Issues per each calendar quarter round of the Bounty Program are submitted in comments of dedicated AsyncAPI GitHub Organization's Discussion by the AsyncAPI Maintainer of the repository where the candidate for the Bounty Issue is residing, containing the following five fields:

1. Number: `cli#361`

2. Full GitHub link: https://github.com/asyncapi/cli/issues/361

3. Scope: `We need to extend the functionality of '--version' flag in AsyncAPI CLI to include info about versions of other AsyncAPI libraries used in the project`

4. Complexity: `Medium` | `Advanced`

5. Type: `Coding` | `Docs` | `Design`


## Bounty Issue Timeline

Start date in Bounty Program is counted from Monday of the next week when assignment of the Bounty Issue on GitHub happened.

Due to asynchronous nature of the AsyncAPI project itself and thus its Bounty Program, UTC offset in Bounty Program Issues' start dates, end dates and weekdays is used. Start dates should be viewed as having addition of `00:00:00 UTC+12:00`. End dates and weekdays should be viewed as having addition of `23:59:59 UTC-12:00`.

For Bounty Issues of Complexity Level `Medium`:
- Draft Pull Request must be submitted not later than on Friday of second week from the start date and updated on every Friday until submission of Final Pull Request
- Final Pull Request must be submitted not later than on Friday of fourth week from the start date and merged not later than on Friday of sixth week from the start date

For Bounty Issues of Complexity Level `Advanced`:
- Draft Pull Request must be submitted not later than on Friday of third week from the start date and updated on every Friday until submission of Final Pull Request
- Final Pull Request must be submitted not later than on Friday of sixth week from the start date and merged not later than on Friday of eighth week from the start date

If the Bounty Program Participant has not provided a weekly PR update, they are pinged as a reminder to do so.
In case the Bounty Program Participant still doesn't provide the PR update after three pings over three weeks, it is assumed that the task cannot be completed within the rest of the time, and the Bounty Program Participant has silently dropped the issue. Ban rules are applied to such Bounty Program Participant, and the Bounty Issue becomes free for assignment to another Bounty Program Participant with a reset timeline.

### Example Bounty Issue Timeline

| Complexity Level | Assignment date (by GitHub) | Start date (by BP rules) | End date (by BP rules) | Draft PR submission | Final PR submission | Final PR merge |
|------------------|-----------------------------|--------------------------|------------------------|---------------------|---------------------|----------------|
| Medium           | 2023-04-27                  | 2023-01-05               | **2023-06-09**             | 2023-05-12          | 2023-05-26          | **2023-06-09**     |
| Advanced         | 2023-04-26                  | 2023-01-05               | **2023-06-23**             | 2023-05-19          | 2023-06-09          | **2023-06-23**     |


## Extension of Bounty Issue's Timeline

In case of the online absence of the AsyncAPI Maintainer in Slack https://asyncapi.slack.com for a period of more than three working days in a raw, all target dates of the Bounty Issue Timeline are increased by one calendar week per each three working days in a raw of the online absence of the AsyncAPI Maintainer plus one calendar week. 'Plus one calendar week' period is required because after the AsyncAPI Maintainer has regained a confident online presence in Slack https://asyncapi.slack.com, the Bounty Program Participant would have to spend time getting back to the insides of the issue, and nearly unfamiliar at that time her or his own code.

In case of unpredicted force majeure circumstances that could not be foreseen and/or are beyond the control of both the Bounty Program Participant and the AsyncAPI Maintainer, the Bounty Issue Timeline can be increased by either a fixed or indefinite amount of time, with a fair explanation in the Bounty Issue's or Pull Request's comments.

Communication on the necessity of the Bounty Issue Timeline extension should happen prior to any current milestone of the Bounty Issue's Timeline approaching, with a reflection of the start of such communication in the Bounty Issue's or Pull Request's comments, in case a communication platform other than GitHub is used.


## Additional conditions

AsyncAPI Maintainers are allowed to work on Bounty Issues submitted by themselves.

Bounty Program Participant is allowed to choose up to two Bounty Issues of any Complexity Level for simultaneous delivery.

In case the doc documenting functionality, which is being covered in the Bounty Issue, should be created, edited, or altered simultaneously with the Bounty Issue's resolution, such requirement should be explicitly stated in the Scope during Bounty Issue submission.


## Ban

Should any Bounty Program Participant drop or fail to complete one Bounty Issue assigned to them, she or he will not be eligible to participate in the Bounty Program during next calendar quarter as a penalty.

Dropping or failing to complete two Bounty Issues will result in permanent ban from participation in the Bounty Program.


## Instruction on gaining a Ban

First ask to assign the Bounty Issue to you, _only then_ start to think on the task, understand you can't do it, silently drop.


## Instruction on avoiding a Ban

Think on the task, make sure that you understand how to do it and CAN do it, ask to assign the Bounty Issue to you, meet all milestones of the Bounty Issue Timeline.


##### This document is the consolidated and formalized version of information publicly available in free form at
##### https://github.com/orgs/asyncapi/discussions/541#discussioncomment-5462792
##### https://github.com/orgs/asyncapi/discussions/877#discussioncomment-6970799
