This document covers the aspect of different meetings organization at AsyncAPI.

## FAQ

### What I need to schedule a meeting?

To schedule a meeting you need to be:
- one of licensed Zoom users associated with AsyncAPI Zoom account. It is required because only licensed users can start meeting, live transcripts and streaming.
- GitHub Action workflow for `Ad Hoc` meeting scheduling should be updated. New licensed user should be added as alternative host.
- a member of [GitHub team called meetings-organizars](https://github.com/orgs/asyncapi/teams/meetings-organizers). It is required because only maintainers of given repository can manually trigger GitHub Actions workflows. This group has `Maintain` role in `community` repository where meeting automation is implemented.
- a member of a team in AsyncAPI Restream account. It is required because hosts, before they start streaming the meeting from Zoom, must login to Restream and modify the title of the stream that will show up in social platforms.

### What meetings do we have/

* `Regular` meetings: meetings like `Community Meeting` or `Thinking Out Loud` that happen regularly, have their dedicated area of interest and own brand.
* `Ad Hoc` meetings: meetings for topic that do not match any `Regular` meeting and should be organized separately. Every official AsyncAPI Zoom licensed user should have right to schedule it.

### How to schedule new meeting?

1. Go to [**Actions** tab](https://github.com/asyncapi/community/actions)
1. Select one of the workflows that starts with **Schedule**. Choose the one that represents the meeting that you want to schedule
1. Click **Run workflow** button
1. Provide data required by the form and click another **Run workflow** button visible in the form

We have an automated workflow in place:
1. Automation starts after clicking **Run workflow**. Unless there is another GitHub Actions outage and proper events are not delivered to automation :smiley:
1. It creates new meeting in Zoom. It is by default configured to support live streaming
1. It creates a GitHub issue with all details about the meeting
1. It creates a new Google Calendar entry with special metadata containing the GitHub issue number
1. It sends a tweet with information about newly scheduled event

### How do I get notified about upcomming meetings?

TODO: add missing link where folks can find subscription form
Subscribe to AsyncAPI Newsletter to get information about upcomming meetings.

We have an automated workflow in place:
1. Automation starts every Friday, midnight
1. It gets from Google Calendar information about all the meetings scheduled for upcomming week
1. It schedules a MailChipm campaign to send email with list of meetings. It is sent on Friday at 11AM in subscriber's time zone

### Where can I find AsyncAPI calendar?

- [Main link to calendar](https://calendar.google.com/calendar/embed?src=c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com&ctz=UTC)
- [iCal/ics file](https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics)

### How to cancel the meeting?

If you scheduled a meeting but for some reason it needs to be canceled, just close the corresponding meeting issue.
We have an automated workflow in place:
1. Automation starts when GitHub issue is closed
1. It checks if closed issue represents a future event
1. It removes meeting from AsyncAPI Google Calendar

### How to register a new regular meeting?

Start [discussion in community repository](https://github.com/asyncapi/community/discussions). Explain the idea and justify why it requires separate meeting. At the moment we have [approval from Technical Steering Commitee](https://github.com/asyncapi/community/discussions/295) to pay for 8 Zoom licenses.

Once new meeting is approved, add new workflow like [this one](.github/workflows/create-event-community-meeting.yml) and add a new GitHub issue template like [this one](.github/workflows/create-event-helpers/issues_templates/community.md).


### How to become a host?

Once your `Regular` meeting got approved contact `Fran Mendez` so he can give you access to all required tools.