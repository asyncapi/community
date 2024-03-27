const path = require('path');
const {google} = require('googleapis');
const fetch = require('node-fetch');
const OAuth2 = google.auth.OAuth2;
const youtube = google.youtube('v3');

const CREDENTIALS = JSON.parse(process.env.GOOGLE_OAUTH_TOKEN); // token.json file contents
const CLIENT_SECRET = JSON.parse(process.env.GOOGLE_OAUTH_CLIENT_SECRET); // client_secret.json file contents

const OAUTH_CLIENT = new OAuth2(
  CLIENT_SECRET.web.client_id,
  CLIENT_SECRET.web.client_secret,
  CLIENT_SECRET.web.redirect_uris[0]
);
OAUTH_CLIENT.credentials = CREDENTIALS;

module.exports = { scheduleLivestream };

/**
 * Schedules a live stream with the parameters provided.
 * 
 * @param {String} scheduledStartTime RFC3339 scheduled starting time
 */
async function scheduleLivestream(scheduledStartTime) {
  try {
    const title = process.env.MEETING_NAME;
    const suffix = process.env.MEETING_NAME_SUFFIX;
    const description = process.env.MEETING_DESC;
    const banner = process.env.MEETING_BANNER;
    const summary = suffix ? `${title} ${suffix}` : title;
    const playlistId = process.env.YT_PLAYLIST;

    const id = await _createNewBroadcast(summary, description, scheduledStartTime);
    await Promise.all([
      _addThumbnailToVideo(id, banner),
      _addVideoToPlaylist(id, playlistId)
    ]);

  } catch ( e ) {
    console.log(e);
  }
}

function _createNewBroadcast(title, description, startTime) {
  return new Promise((resolve, reject) => {
    youtube.liveBroadcasts.insert({
      auth: OAUTH_CLIENT,
      part: 'id,snippet,contentDetails,status',
      requestBody: {
        snippet: {
          title,
          description,
          scheduledStartTime: startTime
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false
        }
      }
    }, (err, res) => {
      if ( err ) {
        reject(err);
      } else {
        resolve(res.data.id);
      }
    })
  });
}

function _addThumbnailToVideo(videoId, thumbnailUri) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(thumbnailUri);
    const mimeType = (ext == 'png' ? 'image/png' : 'image/jpeg');
    
    fetch(thumbnailUri).then(res => {
      const thumbnailStream = res.body;

      youtube.thumbnails.set({
        auth: OAUTH_CLIENT,
        videoId,
        media: {
          mimeType,
          body: thumbnailStream
        }
      }, (err, res) => {
        if ( err ) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

function _addVideoToPlaylist(videoId, playlistId) {
  return new Promise((resolve, reject) => {
    if ( !playlistId ) return resolve();

    youtube.playlistItems.insert({
      auth: OAUTH_CLIENT,
      part: 'contentDetails,id,snippet,status',
      requestBody: {
        snippet: {
          playlistId,
          resourceId: {
            kind: 'youtube#video',
            videoId
          }
        }
      }
    }, (err, res) => {
      if ( err ) {
        reject(err);
      } else {
        resolve();
      }
    })
  });
}
