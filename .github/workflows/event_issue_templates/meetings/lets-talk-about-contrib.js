module.exports.getMeetingIssueContent = (time, date) => {

    return `The purpose of this meeting is to focus on contributors, focus on people that want to contribute to AsyncAPI Initiative but do not know how to do it. AsyncAPI Initiative is a large project, with lots of code, lots of docs, and many many other areas that need help, but it is not easy to start.

Recordings from the previous meetings are available in [this](https://www.youtube.com/playlist?list=PLbi1gRlP7pigPBrBMaNQhUeniR1pdDMiY) playlist on YouTube.

**This time we meet at ${time} UTC. Check what time is it in your time zone with [time zone converter](https://dateful.com/convert/coordinated-universal-time-utc?t=${time}&d=${date})**

Join [this](https://groups.google.com/forum/#!forum/asyncapi-users) mailing list to get an always-up-to-date invite to the meeting in your calendar. You can also check [AsyncAPI Calendar](https://calendar.google.com/calendar/u/0/embed?src=tbrbfq4de5bcngt8okvev4lstk@group.calendar.google.com).

This meatin is a live-stream that goes to the following social media:
- [YouTube](https://www.youtube.com/asyncapi)
- [Twitch](https://www.twitch.tv/asyncapi)
- [Twitter](https://twitter.com/AsyncAPISpec)
- [LinkedIn](https://www.linkedin.com/company/asyncapi)

To broadcast the live-stream, we are using [Restream](https://restream.io/). You are invited to join us live on the call and not only interact through chats on YouTube and Twitch.`
}