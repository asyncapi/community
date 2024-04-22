# AsyncAPI Bounty Program

## Overview

The AsyncAPI Bounty Program is a specification of the software development process, customized to meet the needs of the AsyncAPI Initiative.

The AsyncAPI Bounty Program operates exclusively on donated funds, does not seek financial profit, uses publicly and freely available tools only, and has as its main purpose rewarding individual open source maintainers and contributors while creating an artificial set of time constraints to make the schedule for achieving assigned targets predictable.

Anyone may implement this specification of the software development process with or without any modification in any way they find suitable.


## Budget

The budget of the Bounty Program per calendar year is twenty thousand US dollars and 00 cents (USD 20,000.00), which is five thousand US dollars and 00 cents (USD 5,000.00) per calendar quarter (three calendar months), split as follows:

- Four thousand six hundred US dollars and 00 cents (USD 4,600.00) per calendar quarter as the total amount of reward for completed Bounty Issues

- Four hundred US dollars and 00 cents (USD 400.00) per calendar quarter as the cost of the Bounty Program Coordination

The reward for completion of the Bounty Issue of Complexity Level `Medium` is two hundred US dollars and 00 cents (USD 200.00).

The reward for completion of the Bounty Issue of Complexity Level `Advanced` is four hundred US dollars and 00 cents (USD 400.00).

Approximate maximum quantity of Bounty Issues per calendar quarter round varies from twelve to twenty three (from ((11 * 400) + (1 * 200)) to (23 * 200)).


## Prioritization Of Participants

Bounty Program Participants are prioritized in the following order:

1. AsyncAPI Maintainers (from any repository,) checked at https://github.com/asyncapi/community/blob/master/MAINTAINERS.yaml

2. Regular contributors (GitHub users who have three or more Pull Requests merged throughout the AsyncAPI GitHub Organization, checked with https://github.com/search?q=is%3Apr+org%3Aasyncapi+is%3Amerged+author%3Agh_username)

3. Other (if a GitHub user doesn't fall under the above, the AsyncAPI Maintainer can determine the criteria i. e. regular volunteers, etc.)

Assignment of the Bounty Issue on GitHub to users that fall under the first category can be performed immediately after the addition of the GitHub label `bounty` according to GitHub's timestamp.

Assignment of the Bounty Issue on GitHub to users that fall under the second and third categories is performed not earlier than three calendar days after the addition of the GitHub label `bounty` according to GitHub's timestamp.


## Bounty Issues' Numbering

To ensure ease of referencing, searching and automation, strictly defined format of Bounty Issues' numbering is used:

1. In submissions of issues for Bounty Program: `[repo]#[issue]` (`cli#38`)

2. In invoices claiming reward: invoice's subject `Bounty [repo]#[issue]` (e.g., `Bounty cli#38`), tag `bounty` (two rewards can be joined into one sum, in this case a comma and a space must be used in the invoice's subject as a separator for Bounty Issues' numbers, e.g., `Bounty cli#38, cli#361`)


## Clarification Of Time Periods

Due to asynchronous nature of the AsyncAPI Initiative itself and thus its Bounty Program, UTC offset in Bounty Program Issues' starting and ending dates is used. Starting dates should be considered having start at `00:00:00 UTC+12:00`, ending dates should be considered having end at `23:59:59 UTC-12:00` (inclusive.)


## Bounty Issue's Submission

Bounty Issues for the upcoming calendar quarter round of the Bounty Program are submitted during the first and second full (seven-day) calendar weeks of the last month of the current calendar quarter, after the call for such submission, in a quantity of no more than two issues per repository, in the comments of the dedicated [AsyncAPI Organization's Discussion](https://github.com/orgs/asyncapi/discussions), by an AsyncAPI Maintainer who will be responsible for the resolution of the given Bounty Issue from the AsyncAPI's side, containing the following five fields:

1. Number: `cli#361`

2. Full GitHub link: https://github.com/asyncapi/cli/issues/361

3. Scope: `We need to extend the functionality of '--version' flag in AsyncAPI CLI to include info about versions of other AsyncAPI libraries used in the project`

4. Complexity: `Medium` | `Advanced`

5. Type: `Coding` | `DevOps` | `Docs` | `Design`

In case documentation must be provided together with solution requested in the Bounty Issue, such requirement should be explicitly stated in the Scope.

In case two Bounty Issues are inextricably linked and cannot be completed separately from each other, such connection must be explicitly stated in the Scope.

In case total reward for all submitted Bounty Issues exceeds budget allocated for the upcoming calendar quarter round of the Bounty Program, full list of submitted Bounty Issues undergoes randomization with [random.org](https://random.org). Inextricably linked Bounty Issues in this case get joined into one generic issue (e.g., `cli#361-cli#38`). After randomization the resulted randomized list is crawled from the beginning until total reward for the Bounty Issues reaches the amount of the budget allocated for the upcoming calendar quarter round of the Bounty Program.

In case reward for the last Bounty Issue in the resulted randomized list generates excess of the budget, this and all following issues until the end of the resulted randomized list are excluded from participation in the upcoming calendar quarter round of the Bounty Program. Such Bounty Issues are allowed to be submitted during submission of Bounty Issues for the next calendar quarter round of the Bounty Program.

All GitHub issues selected as Bounty Issues get labels on GitHub:

- GitHub label `bounty`

- text label `level/medium` or `level/advanced` according to the Complexity Level of the Bounty Issue

- text label indicating calendar quarter round of the Bounty Program in which Bounty Issue participates (e.g., `bounty/2024-Q1`)

After addition of labels GitHub issues selected as Bounty Issues can be viewed with GitHub's search tool using the URL formed as:
```
https://github.com/issues?q=is%3Aopen+org%3Aasyncapi+%22bounty/2024-Q1%22+in%3Acomments
```
Also, Bounty Issues that have no assignee and thus are free to pick up can be viewed with GitHub's search tool using the URL formed as:
```
https://github.com/issues?q=is%3Aopen+org%3Aasyncapi+%22bounty/2024-Q1%22+in%3Acomments+no%3Aassignee
```
Note, that results of the GitHub search are visible to logged-in GitHub users only.


## Bounty Issue's Timeline

Start date in Bounty Program is counted from Monday of the next week when assignment of the Bounty Issue on GitHub happened.

In case assignment of the Bounty Issue on GitHub happened during third or fourth full (seven-day) calendar week of the last month of the calendar quarter, start date in Bounty Program is counted from the first Monday of the new calendar quarter round.

For Bounty Issues of Complexity Level `Medium`:

- Draft Pull Request, [linked to the Bounty Issue using a keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if applicable,  must be submitted no later than Friday of the second week from the start date and updated every Friday until submission of Final Pull Request

- Final Pull Request must be submitted no later than Friday of fourth week from the start date and merged no later than Friday of sixth week from the start date

For Bounty Issues of Complexity Level `Advanced`:

- Draft Pull Request, [linked to the Bounty Issue using a keyword](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if applicable, must be submitted no later than Friday of the third week from the start date and updated every Friday until submission of Final Pull Request

- Final Pull Request must be submitted no later than Friday of sixth week from the start date and merged no later than Friday of eighth week from the start date

Updates to the Draft Pull Request are determined by:

- activity in the `Commits` section of the Draft Pull Request

- activity of the automated code analysis service that runs on every commit (`SonarCloud`)

If no Pull Request is involved, updates on the Bounty Issue are determined by:

- activity in the Bounty Issue's comments

In case the Bounty Program Participant has not provided a weekly update to the Draft Pull Request and/or on the Bounty Issue (on Monday, the last activity of any of the abovementioned types was five or more calendar days before, e.g., on `2024-01-29`, the last activity of any type was on `2024-01-24` or earlier,) they are pinged as a reminder to do so.

In case the Bounty Program Participant has not provided an update to the Draft Pull Request and/or on the Bounty Issue after two pings over two Mondays, on the third Monday it is assumed that the task cannot be completed within the rest of the time, and the Bounty Program Participant has silently dropped the Bounty Issue. Suspension rules are applied to such Bounty Program Participants, and the Bounty Issue becomes free for assignment to another Bounty Program Participant with a reset timeline, both in the current and next calendar quarter rounds of the Bounty Program.

In case the dropped Bounty Issue is transferred to the next calendar quarter round of the Bounty Program, the reward for this Bounty Issue does not alter the budget allocated for the next calendar quarter round of the Bounty Program, and it is excluded from the randomization process for the next calendar quarter round of the Bounty Program if such a process is to take place.

Dropped Bounty Issue gets text label of the second calendar quarter round (e.g., `bounty/2024-Q2`) and text label `bounty/dropped`. If during two calendar months of the second calendar quarter round of the Bounty Program the dropped Bounty Issue was not picked up by any Bounty Program Participant for resolution, all bounty-related labels are removed from it and this Bounty Issue becomes a regular GitHub issue, which can again be submitted as a Bounty Issue Candidate. It also can again be assigned to the same Bounty Program Participant who dropped it.

### Bounty Issue's Timeline Example

|Complexity Level|Assignment date (by GitHub)|Start date (by BP rules)|End date (by BP rules)|Draft PR submission|Final PR submission|Final PR merge|
|----------------|---------------------------|------------------------|----------------------|-------------------|-------------------|--------------|
|Medium          |2023-04-27                 |2023-05-01              |**2023-06-09**        |2023-05-12         |2023-05-26         |**2023-06-09**|
|Advanced        |2023-04-26                 |2023-05-01              |**2023-06-23**        |2023-05-19         |2023-06-09         |**2023-06-23**|


## Extension Of Bounty Issue's Timeline

In case of the online absence of the AsyncAPI Maintainer in [Slack](https://asyncapi.slack.com) for a period of more than three working days in a row, all remaining target dates of the Bounty Issue Timeline are increased by one calendar week per each three working days in a row of the online absence of the AsyncAPI Maintainer plus one calendar week. 'Plus one calendar week' period is required because after the AsyncAPI Maintainer has regained a confident online presence in [Slack](https://asyncapi.slack.com), the Bounty Program Participant would have to spend time getting back to the insides of the issue, and nearly unfamiliar at that time their own code.

In case of unpredicted [force majeure](https://iccwbo.org/wp-content/uploads/sites/3/2020/03/icc-forcemajeure-hardship-clauses-march2020.pdf) and/or circumstances that could not be foreseen and/or that are beyond the control of both the Bounty Program Participant and the AsyncAPI Maintainer, the Bounty Issue Timeline can be increased by a fixed or indefinite amount of time, with a fair explanation in the Bounty Issue's or Pull Request's comments.

Communication on the necessity of the Bounty Issue Timeline extension should happen prior to any current milestone of the Bounty Issue's Timeline approaching, with a reflection of the start of such communication in the Bounty Issue's or Pull Request's comments, in case a communication platform other than GitHub is used.


## Bounty Issue's Reclassification

Upon request of the AsyncAPI Maintainer who is responsible for the resolution of the given Bounty Issue from the AsyncAPI's side in the Bounty Issue's comments in the process of resolution, the Complexity Level of the Bounty Issue can be reclassified in any direction (both lowered to `Medium` and heightened to `Advanced`,) with corresponding changes to the Bounty Issue's Timeline in case of a need.


## Bounty Issue's Completion

To avoid half-merges, unmet dependencies on the completion of other (inextricably linked) issues, waiting for merges of other separate PRs that provide critically important functionality for the given task, etc., and to avoid situations where AsyncAPI has already acquired an obligation to pay but factually the conditions of the Bounty Issue completion are not met yet, a system of double control with separation of concerns is exercised on the Bounty Issues:

- after Bounty Issue's closure on GitHub, the AsyncAPI Maintainer, who was responsible for the resolution of the given Bounty Issue from the AsyncAPI's side, confirms the Bounty Issue's technical resolution by posting a separate confirming comment in this Bounty Issue's comments;

- the Bounty Program Participant proceeds with the process of claiming the reward only after the second comment from the Bounty Program Coordinator, confirming the Bounty Issue completion and readiness to perform the payout.


## Bounty Issue's Time Of Life

Bounty Issue has an overall time of life of five calendar months since the start of the calendar quarter it was first introduced in. If the Bounty Issue was not assigned during the first calendar quarter round (e.g., `bounty/2024-Q1`), it gets text label of the second calendar quarter round (e.g., `bounty/2024-Q2`) and text label `bounty/stalled`. If during two calendar months of the second calendar quarter round of the Bounty Program the Bounty Issue still was not picked up by any Bounty Program Participant for resolution, all bounty-related labels are removed from it and Bounty Issue becomes a regular GitHub issue, which can again be submitted as a Bounty Issue Candidate.


## Additional Conditions

AsyncAPI Maintainers are allowed to work on Bounty Issues submitted by themselves.

Bounty Program Participant is allowed to choose up to two Bounty Issues of any Complexity Level for simultaneous resolution.

GitHub label `bounty` has hex code `#0E8A16`.


## Claiming The Reward

Claiming the reward for the completed Bounty Issue is done via submission of an invoice at the [AsyncAPI page on Open Collective](https://opencollective.com/asyncapi) (button '`SUBMIT EXPENSE`'.)

**Before submission of the invoice, the Bounty Program Participant MUST ensure that the account they will use for the payout is VERIFIED, fully operational, and able to receive payments.**

Requirements for the invoice:

- Make sure that your `Full Name` on GitHub, as well as `Legal Name` and `Full name of the account holder` on the invoice, **are the same** and are YOUR REAL LEGAL NAME according to the passport/ID (on Open Collective, nicknames are allowed only in `Settings / Public profile / Display name`, and it is **this** name that will be displayed publicly throughout all https://opencollective.com, if you have privacy concerns)

- **Expense title**: '`Bounty [repo]#[issue]`' (e.g., '`Bounty cli#38`' or '`Bounty cli#38, cli#361`' in case of two rewards being joined into one sum)

- **Tag**: '`bounty`'

- **Set invoice details / Description**: mention full URL of the GitHub issue which served as the Bounty Issue

AsyncAPI does not perform financial transactions itself and relies on Open Collective's Fiscal Host 'Open Source Collective' to service payments and, thus, [comply with global sanctions](https://docs.oscollective.org/how-it-works/basics/expense-policies-and-limitations#permitted-countries-ofac-checks-and-payments-to-certain-countries). However, it has been empirically proven that even if the Bounty Program Participant is a citizen of a sanctioned jurisdiction, they can still receive the financial payment made to a payee in a non-sanctioned jurisdiction. Taking this into account, **potential Bounty Program Participants must check whether they will be able to receive payment themselves prior to starting participation in the Bounty Program**. AsyncAPI will not take any action if Open Source Collective refuses to relay the payment due to US or global sanctions imposed on a jurisdiction or an individual.

Also, note that if a Bounty Program Participant submits invoice expenses for more than six hundred US dollars and 00 cents (USD 600.00) per calendar year to a Collective at Open Collective with a Fiscal Host in the US (AsyncAPI fits this description,) they will be asked to fill out an IRS tax information form, which will be either a `W-8BEN` or a `W-8BEN-E` depending on whether the Bounty Program Participant has the legal status of an individual or of a sole proprietor, **supplying a local Tax ID**.

At the time of writing (2023-10-01) Open Collective supports `ACH`, `International SWIFT through Wise` (limitations of financial technology company 'Wise' are applied) and `PayPal` as automated payout methods. In rare cases (once per calendar year) Bounty Program Participant in personal communication with Open Collective can request them to perform a payout using a custom payment method to a non-sanctioned jurisdiction.


## Suspension

Each new Bounty Program Participant starts participation in the Bounty Program with the quantity of Suspensions equal to zero.

In case a Bounty Program Participant stops rendering services directed toward resolution of the Bounty Issue without any communication on the subject (performs 'silent drop') and/or fails to complete the Bounty Issue within the assigned Timeline, for the first time, they receive a First Suspension and will be prohibited from participating in the Bounty Program starting from the current moment and during two calendar months from the beginning of the next full (three-month) calendar quarter. After this period, the First Suspension expires.

In case a Bounty Program Participant stops rendering services directed toward resolution of the Bounty Issue without any communication on the subject (performs 'silent drop') and/or fails to complete the Bounty Issue within the assigned Timeline, for the second time during two full (three-month) calendar quarters after the expiration of the First Suspension, they receive a Second Suspension and will be prohibited from participating in the Bounty Program starting from the current moment and during eight calendar months from the beginning of the next full (three-month) calendar quarter. After this period, the Second Suspension expires.

In case a Bounty Program Participant stops rendering services directed toward resolution of two Bounty Issues simultaneously without any communication on the subject (performs 'silent drop') and/or fails to complete two Bounty Issues within the assigned Timeline simultaneously, the Second Suspension is applied immediately.

Reward for the completed Bounty Issue (Bounty Issues) is not paid to the Bounty Program Participant who received Suspension for this Bounty Issue (Bounty Issues) in the current and next one Bounty Program's calendar quarter round, even in case of its (their) voluntary completion.

After the expiration of the Second Suspension or after two full (three-month) calendar quarters after the expiration of the First Suspension, if no Second Suspension was received during this time, their Suspension history is considered clean, and the quantity of Suspensions is reset to zero.

A dedicated list is used for the purpose of tracking Suspension history.

### Instruction on assuring a Suspension receipt

First ask to assign the Bounty Issue to you on GitHub, _only then_ start to think on the task, understand you can't do it, silently drop.

### Instruction on avoiding a Suspension receipt

Think on the task, make sure that you understand how to do it and CAN do it, ask to assign the Bounty Issue to you on GitHub, meet all milestones of the Bounty Issue Timeline.


## Sources

This document is the consolidated and formalized version of all information publicly available in free form at

##### https://github.com/orgs/asyncapi/discussions/541#discussioncomment-5462792
##### https://github.com/orgs/asyncapi/discussions/877#discussioncomment-6970799
##### https://docs.opencollective.com/help/expenses-and-getting-paid/tax-information
##### https://asyncapi.slack.com/archives/C05UHTSEHE2/p1699433566459269
##### https://github.com/asyncapi/community/pull/897#discussion_r1390778779
##### https://github.com/asyncapi/community/issues/1072
