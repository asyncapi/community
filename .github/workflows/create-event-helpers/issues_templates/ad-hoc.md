---
title: "{{ env.MEETING_NAME }}, {{ env.FULL_DATE | date('H:mm [UTC] dddd MMMM Do YYYY') }}"
---

<table>
<tr>
<th>Meeting Info</th>
<th>Details</th>
</tr>
<tr>
<td>Purpose</td>
<td>{{ env.MEETING_DESC }}</td>
</tr>
<tr>
<td>Time</td>
<td><strong>{{ env.FULL_DATE | date('H') }}:00 UTC</strong> | Translate to your time zone with <a href="https://dateful.com/convert/coordinated-universal-time-utc?t={{ env.FULL_DATE | date('kk') }}&d={{ env.DATE_ONLY }}">time zone converter</a>.</td>
</tr>
<tr>
<th>Meeting Place</th>
<th>Link</th>
</tr>
<tr>
<td>Zoom</td>
<td><a href="{{ env.ZOOM_LINK }}">Join live</a>.</td>
</tr>
<tr>
<td>YouTube</td>
<td><a href="https://www.youtube.com/asyncapi">Watch live and interact through live chat</a>.</td>
</tr>
<tr>
<td>Twitch</td>
<td><a href="https://www.twitch.tv/asyncapi">Watch live</a>.</td>
</tr>
<tr>
<td>Twitter</td>
<td><a href="https://twitter.com/AsyncAPISpec">Watch live</a>.</td>
</tr>
<tr>
<td>LinkedIn</td>
<td><a href="https://www.linkedin.com/company/asyncapi">Watch live</a>.</td>
</tr>
<tr>
<th>More Info</th>
<th>Details</th>
</tr>
<tr>
<td>Meeting Recordings</td>
<td><a href="https://www.youtube.com/asyncapi">YouTube Playlist</a>.</td>
</tr>
<tr>
<td>AsyncAPI Initiative Calendar</td>
<td><a href="https://calendar.google.com/calendar/embed?src=c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com&ctz=UTC">Public URL</a>.</td>
</tr>
<tr>
<td>iCal File</td>
<td><a href="https://calendar.google.com/calendar/ical/c_q9tseiglomdsj6njuhvbpts11c%40group.calendar.google.com/public/basic.ics">Add to your calendar</a>.</td>
</tr>
<tr>
<td>Newsletter</td>
<td><a href="https://www.asyncapi.com/newsletter">Subscribe to get weekly updates on upcoming meetings</a>.</td>
</tr>
</table>
  

## Agenda

> Don't wait for the meeting to discuss topics that already have issues. Feel free to comment on them earlier.

1. Q&A
1. _Place for your topic_
1. Q&A

## Notes

tbd
