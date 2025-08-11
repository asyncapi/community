---
title: Publishing meetings as podcasts
weight: 40
---


This document covers how to publish recorded AsyncAPI meetings as podcasts.

# FAQ

## How do I publish broadcasted meetings as podcasts?

### Why do we need this feature?

- Some people prefer to listen to the video/livestream as an audio (podcast) instead of watching the video.

- The goal is to upload our AsyncAPI video/live streams on `Spotify For Podcasters` platform, ultimately allowing the listener to play the episodes on Spotify. Almost every YouTube video can be converted into a podcast.


### Who can upload the videos?

- The workflow can only be triggered by a person with write access to the `master` branch of the `asyncapi/community` repository.

### What is needed?

- The YouTube video ID is needed to trigger the workflow.

### What is YouTube video ID?

- A YouTube video ID is a unique combination of characters that identifies a specific video on the YouTube platform. It's used in the URL of the video to direct users to the exact video they want to watch. The video ID is typically a sequence of letters, numbers, and special characters that generally comes after the "v=" parameter in the URL.
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

Here is an example with a procedure on how to use this workflow:

1. Go to the `Actions` section on GitHub.
2. Scroll down the menu on the left-hand side.
3. Click on the `Upload Episode from YouTube To Spotify for Podcasters` option.
4. Click on the `Run Workflow` button.
5. Provide the YouTube ID in the box.
6. Click on `Run workflow` button. 
7. Wait for the workflow to finish. (Depending on video size, it may take some time to upload, so please have patience. Thank you.) .
8. A few moments later....Hurray! Your episode is now uploaded successfully!

You can also modify description and other information for uploaded podcast directly in Spotify:

1. Go to https://podcasters.spotify.com/.
2. Login using AsyncAPI account.
2. Go to `Episodes` section. There, you will see your latest upload.
3. Perform edits and save them.
