# AsyncAPI Bounty Program


## Budget

The budget of the Bounty Program per calendar year is twenty thousand US dollars 00 cents (USD 20,000.00), which is five thousand US dollars 00 cents (USD 5,000.00) per calendar quarter (three calendar months).

Reward for Bounty Issue of Complexity Level `Medium` is two hundred US dollars 00 cents (USD 200.00).

Reward for Bounty Issue of Complexity Level `Advanced` is four hundred US dollars 00 cents (USD 400.00).

Approximate quantity of Bounty Issues per calendar quarter varies from thirteen to twenty five (from ((12 * 400) + (1 * 200)) to (25 * 200)).


## Prioritization of participants

Bounty Program Participants are prioritized in the following order:

1. AsyncAPI Maintainers (from any repository)

2. Regular contributors (GitHub users who have three or more Pull Requests merged throughout the AsyncAPI GitHub Organization)

3. Other (if a GitHub user doesn't fall under the above, the maintainer can determine the criteria i. e. regular volunteers, etc)


## Bounty Issues' numbering

To ensure ease of referencing, searching and automation, strictly defined format of Bounty Issues' numbering is used:

1. In submissions of issues for Bounty Program: `[repo]#[issue]` (`cli#38`)

2. In invoices claiming reward: invoice subject `Bounty [repo]#[issue]` (e.g., `Bounty cli#38`), tag `bounty`


## Clarification of time periods

Due to asynchronous nature of the AsyncAPI project itself and thus its Bounty Program, UTC offset in Bounty Program Issues' starting and ending dates is used. Starting dates should be considered having start at `00:00:00 UTC+12:00`, ending dates should be considered having end at `23:59:59 UTC-12:00`.


## Bounty Issue Submission

Bounty Issues for the upcoming calendar quarter round of the Bounty Program are submitted during the second and third weeks of the last month of the current calendar quarter, after call for such submission, in a quantity of no more than two issues per repository, in comments of the dedicated [AsyncAPI Organization's Discussion](https://github.com/orgs/asyncapi/discussions), by the AsyncAPI Maintainer of the given repository, containing the following five fields:

1. Number: `cli#361`

2. Full GitHub link: https://github.com/asyncapi/cli/issues/361

3. Scope: `We need to extend the functionality of '--version' flag in AsyncAPI CLI to include info about versions of other AsyncAPI libraries used in the project`

4. Complexity: `Medium` | `Advanced`

5. Type: `Coding` | `Docs` | `Design`

In case two Bounty Issues are inextricably linked and cannot be completed separately from each other, such connection must be explicitly stated in the Scope.

In case total reward for all submitted Bounty Issues exceeds budget allocated for the upcoming calendar quarter round of the Bounty Program, full list of submitted Bounty Issues undergoes randomization with [random.org](https://random.org). Inextricably linked Bounty Issues in this case get joined into one generic issue (e.g., `cli#361-cli#38`). After randomization the resulted randomized list is crawled from the beginning until total reward for the Bounty Issues reaches the amount of the budget allocated for the upcoming calendar quarter round of the Bounty Program.

In case reward for the last Bounty Issue in the resulted randomized list generates excess of the budget, this and all following issues until the end of the resulted randomized list are excluded from participation in the upcoming calendar quarter round of the Bounty Program. Such Bounty Issues are allowed to be submitted during submission of Bounty Issues for the next calendar quarter round of the Bounty Program.

All GitHub issues selected as Bounty Issues get labels on GitHub:

- `bounty`

- `level/medium` or `level/advanced` according to the Complexity Level of the Bounty Issue

- label indicating calendar quarter round of the Bounty Program in which Bounty Issue participates (e.g., `2024-Q1`)

After addition of labels GitHub issues selected as Bounty Issues can be viewed with GitHub's search tool using the URL formed as:
```
https://github.com/issues?q=is%3Aopen+org%3Aasyncapi+label%3Abounty+label%3A2024-Q1
```
Also, Bounty Issues that have no assignee and thus are free to pick up can be viewed with GitHub's search tool using the URL formed as:
```
https://github.com/issues?q=is%3Aopen+org%3Aasyncapi+label%3Abounty+no%3Aassignee
```


## Bounty Issue Timeline

Start date in Bounty Program is counted from Monday of the next week when assignment of the Bounty Issue on GitHub happened.

In case assignment of the Bounty Issue on GitHub happened during fourth or fifth week of the last month of the calendar quarter, start date in Bounty Program is counted from the first Monday of the new calendar quarter round.

For Bounty Issues of Complexity Level `Medium`:
- Draft Pull Request must be submitted not later than on Friday of second week from the start date and updated on every Friday until submission of Final Pull Request
- Final Pull Request must be submitted not later than on Friday of fourth week from the start date and merged not later than on Friday of sixth week from the start date

For Bounty Issues of Complexity Level `Advanced`:
- Draft Pull Request must be submitted not later than on Friday of third week from the start date and updated on every Friday until submission of Final Pull Request
- Final Pull Request must be submitted not later than on Friday of sixth week from the start date and merged not later than on Friday of eighth week from the start date

If the Bounty Program Participant has not provided a weekly PR update, they are pinged as a reminder to do so.

In case the Bounty Program Participant still doesn't provide the PR update after three pings over three weeks, it is assumed that the task cannot be completed within the rest of the time, and the Bounty Program Participant has silently dropped the Bounty Issue. Ban rules are applied to such Bounty Program Participant, and the Bounty Issue becomes free for assignment to another Bounty Program Participant with a reset timeline, in the next calendar quarter round of the Bounty Program. At the same time the reward for this Bounty Issue does not alter the budget allocated for the next calendar quarter round of the Bounty Program, and it is excluded from randomization process for the next calendar quarter round of the Bounty Program if such process is to take place. 

Dropped Bounty Issue gets label of the second calendar quarter round (e.g., `2024-Q2`) and label `dropped`. If during two calendar months of the second calendar quarter round the dropped Bounty Issue was not picked up by any Bounty Program Participant for resolution, all bounty-related labels are removed from it and this Bounty Issue becomes a regular GitHub issue, which can again be submitted as a Bounty Issue Candidate. It also can again be assigned to the same Bounty Program Participant who dropped it.

### Example Bounty Issue Timeline

| Complexity Level | Assignment date (by GitHub) | Start date (by BP rules) | End date (by BP rules) | Draft PR submission | Final PR submission | Final PR merge |
|------------------|-----------------------------|--------------------------|------------------------|---------------------|---------------------|----------------|
| Medium           | 2023-04-27                  | 2023-01-05               | **2023-06-09**             | 2023-05-12          | 2023-05-26          | **2023-06-09**     |
| Advanced         | 2023-04-26                  | 2023-01-05               | **2023-06-23**             | 2023-05-19          | 2023-06-09          | **2023-06-23**     |


## Extension of Bounty Issue's Timeline

In case of the online absence of the AsyncAPI Maintainer in [Slack](https://asyncapi.slack.com) for a period of more than three working days in a raw, all target dates of the Bounty Issue Timeline are increased by one calendar week per each three working days in a raw of the online absence of the AsyncAPI Maintainer plus one calendar week. 'Plus one calendar week' period is required because after the AsyncAPI Maintainer has regained a confident online presence in [Slack](https://asyncapi.slack.com), the Bounty Program Participant would have to spend time getting back to the insides of the issue, and nearly unfamiliar at that time her or his own code.

In case of unpredicted force majeure circumstances that could not be foreseen and/or are beyond the control of both the Bounty Program Participant and the AsyncAPI Maintainer, the Bounty Issue Timeline can be increased by either a fixed or indefinite amount of time, with a fair explanation in the Bounty Issue's or Pull Request's comments.

Communication on the necessity of the Bounty Issue Timeline extension should happen prior to any current milestone of the Bounty Issue's Timeline approaching, with a reflection of the start of such communication in the Bounty Issue's or Pull Request's comments, in case a communication platform other than GitHub is used.


## Additional conditions

AsyncAPI Maintainers are allowed to work on Bounty Issues submitted by themselves.

Bounty Program Participant is allowed to choose up to two Bounty Issues of any Complexity Level for simultaneous resolution.

In case documentation must be provided together with solution requested in the Bounty Issue, such requirement should be explicitly stated in the Scope during Bounty Issue submission.

Bounty Issue has an overall time of life of five calendar months. If the Bounty Issue was not resolved during the first calendar quarter round (e.g., `2024-Q1`), it gets label of the second calendar quarter round (e.g., `2024-Q2`) and label `stalled`. If during two calendar months of the second calendar quarter round the Bounty Issue was not picked up by any Bounty Program Participant for resolution, all bounty-related labels are removed from it and Bounty Issue becomes a regular GitHub issue, which can again be submitted as a Bounty Issue Candidate.



## Claiming reward

Claiming reward for the completed Bounty Issue is made through submission of invoice at [AsyncAPI page on OpenCollective](https://opencollective.com/asyncapi) (button 'SUBMIT EXPENSE') with invoice subject '`Bounty [repo]#[issue]`' (e.g., '`Bounty cli#38`'), tag '`bounty`'.

At the time of writing (2023-10-01) OpenCollective supports `ACH`, `International SWIFT through Wise` (limitations of financial technology company 'Wise' are applied) and `PayPal` as automated payout methods. In rare cases (once per calendar year) Bounty Program Participant in personal communication with OpenCollective can request them to perform a payout using custom payment method to a non-sanctioned jurisdiction.

**Potential Bounty Program Participants should check whether they will be able to receive payment themselves before starting participation in the Bounty Program.**

Note, that if Bounty Program Participant submits invoice expenses for more than six hundred US dollars 00 cents (USD 600.00) per calendar year to a Collective at OpenCollective with a Fiscal Host in the US (which is AsyncAPI), she or he will be asked to fill out an IRS tax information form, which will be either a `W-8BEN` or a `W-8BEN-E` depending on whether the Bounty Program Participant is an individual or a sole proprietor, supplying a local tax ID.


## Ban

Each new Bounty Program Participant starts participation in the Bounty Program with the quantity of Bans equal to zero.

In case a Bounty Program Participant stops rendering services directed towards resolution of the Bounty Issue without any communication on the subject (performs silent drop) for the first time, she or he receives a First Ban and will not be eligible to participate in the Bounty Program during the next one calendar quarter. After this period the First Ban expires.

In case a Bounty Program Participant stops rendering services directed towards resolution of the Bounty Issue without any communication on the subject (performs silent drop) for the second time during two calendar quarters after the expiration of the First Ban, she or he receives a Second Ban and will not be eligible to participate in the Bounty Program during the next three calendar quarters. After this period the Second Ban expires.

After the expiration of the Second Ban or after two calendar quarters after the expiration of the First Ban if no Second Ban was received during this time, her or his Ban history is considered clean, and the quantity of Bans is reset to zero.

A dedicated list is used for the purpose of tracking Ban history.


## Instruction on assuring a Ban receipt

First ask to assign the Bounty Issue to you on GitHub, _only then_ start to think on the task, understand you can't do it, silently drop.


## Instruction on avoiding a Ban receipt

Think on the task, make sure that you understand how to do it and CAN do it, ask to assign the Bounty Issue to you on GitHub, meet all milestones of the Bounty Issue Timeline.


##### This document is the consolidated and formalized version of all information publicly available in free form at
##### https://github.com/orgs/asyncapi/discussions/541#discussioncomment-5462792
##### https://github.com/orgs/asyncapi/discussions/877#discussioncomment-6970799
