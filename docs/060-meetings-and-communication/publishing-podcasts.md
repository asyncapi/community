---
title: Publishing meetings as podcasts
weight: 40
---

# FAQ 

## Publishing recorded meetings as podcasts on AsyncAPI
This document covers FAQs on publishing recorded AsyncAPI meetings as podcasts. It is intended to guide any AsyncAPI member who has the rights/access to stream and record meetings; on how to publish the recorded meetings as podcasts. For more information on streaming and recording meetings, check the [Meetings-Organization](https://www.asyncapi.com/docs/community/060-meetings-and-communication/MEETINGS_ORGANIZATION) document.

### Why do we need this feature?

- Some people prefer to listen to the video/livestream as an audio (podcast) instead of watching the video.

- The goal is to upload our AsyncAPI video/live streams on `Spotify For Podcasters` platform, ultimately allowing the listener to play the episodes on Spotify. Almost every YouTube video can be converted into a podcast.


### Who can upload the videos?

- Anyone with write access to the `asyncapi/community` repository’s `master` branch.

### What is needed?

- The YouTube video ID.

### What is YouTube video ID?
>> **What is YouTube video ID?**
The video ID is an 11-character alphanumeric string that uniquely identifies a YouTube video.
ID is usually the last part of the URL after `v=` or separated by a forward slash (`/`):
- https://www.youtube.com/watch?v=VIDEO_ID
- https://www.youtu.be/VIDEO_ID
- https://www.youtube.com/shorts/VIDEO_ID
- https://www.youtube.com/embed/VIDEO_ID
You may also find URLs with a video in a playlist: `https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`
Here, video ID is located between `?v=` and `&list=` URL parameters.
**This workflow accepts only the YouTube *video ID*, not a full URL or playlist. You need to extract the `VIDEO_ID` and provide it as an input.**

- [More examples](#list-of-different-types-of-youtube-links) of video ID are given below: ⬇️

#### How to find YouTube ID?

Let's take this video link, for example: https://www.youtube.com/watch?v=3rg_7hIb9PQ.

Here the video ID is the word/entity after `https://www.youtube.com/watch?v=`, i.e., `3rg_7hIb9PQ`


### List of different types of YouTube links

- `https://www.youtube.com/watch?v=VIDEO_ID`
  - Here, it can be https://www.youtube.com/watch?v=3rg_7hIb9PQ
- `https://youtu.be/VIDEO_ID`
  - Here, it can be https://www.youtu.be/3rg_7hIb9PQ
- `https://www.youtube.com/embed/VIDEO_ID`
  - Here, it can be https://www.youtube.com/embed/3rg_7hIb9PQ
- `https://www.youtube.com/playlist?list=PLAYLIST_ID`
  - Here, it can be https://www.youtube.com/playlist?list=PLbi1gRlP7piiaD67o1F4EOPoZztg2r8l6
- `https://www.youtube.com/shorts/VIDEO_ID`
  - Here, it can be https://www.youtube.com/shorts/3rg_7hIb9PQ
- `https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`
  - Here, it can be https://www.youtube.com/watch?v=deLUAobdVpw&list=PLbi1gRlP7piiaD67o1F4EOPoZztg2r8l6
- `https://youtube.com/shorts/VIDEO_ID?feature=share`
  - Here, it can be https://youtube.com/shorts/U5jUr8XAF_M?feature=share


### Step-by-step procedure

1. Open the Upload Episode from YouTube To Spotify for Podcasters actions workflow in the `<repo name>` repository
2. Click on the `Run Workflow` button.
3. Provide the YouTube ID in the box.
4. Click on `Run workflow` button. 
5. Wait for the workflow to finish (It may take some time to upload the video).

(Optional) You can modify the description and other information for the uploaded podcast directly in Spotify:
1. Go to https://creators.spotify.com/.
2. Login using AsyncAPI account.
3. Go to the 'Episodes' section to see your latest upload.
4. Perform edits and save them.
