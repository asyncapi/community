This document covers the technical aspect of events organization. It describes the basic steps required for every official AsyncAPI event.

## AsyncAPI Calendar

Every event must be created in [AsyncAPI Google Calendar](https://calendar.google.com/calendar/u/0/embed?src=tbrbfq4de5bcngt8okvev4lstk@group.calendar.google.com) and an invitation sent to asyncapi-users@googlegroups.com.

You need to be a member of [this](https://groups.google.com/u/1/g/asyncapi-users) user group to get an invitation.

## Event-related GitHub issue

Every event instance must have a corresponding GitHub issue with details on schedule and how to participate. Such an issue must be created in [the community repository](https://github.com/asyncapi/community/issues).

The issue creation process for official AsyncAPI events is semi-automated. You do not have to create an issue on your own, but you can trigger a dedicated GitHub Action workflow to do it for you.

1. Go to [**Actions** tab](https://github.com/asyncapi/community/actions)
2. Select **Create community event issue** workflow
3. Click **Run workflow** button
4. Provide data required by the form and click another **Run workflow** button visible in the form

As a result, a new GitHub issue is created in the repository.

> You need to manually close issues for old meetings and manage pinned issues.

## New events registration

* To get a new issue registered in AsyncAPI Calendar, contact the community in the `#events` channel in [Slack](https://www.asyncapi.com/slack-invite),
* To modify an issue creation workflow to support a new event, modify [this workflow](.github/workflows/create-event-issue.yml) and add a new script like [this one](.github/workflows/event_issue_templates/sig.js).
