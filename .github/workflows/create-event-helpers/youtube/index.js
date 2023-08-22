import path from 'path';
import axios from 'axios';
import {google} from 'googleapis';
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
 * @param {String} title Title
 * @param {String} description Description
 * @param {String} scheduledStartTime RFC3339 scheduled starting time
 * @param {String} thumbnail Thumbnail URL (only supports PNG and JPG formats)
 * @param {String} playlistId Playlist ID to add the stream to
 */
async function scheduleLivestream(title, description, scheduledStartTime, thumbnail, playlistId) {
  try {
    const id = await _createNewBroadcast(title, description, scheduledStartTime);
    await Promise.all([
      _addThumbnailToVideo(id, thumbnail),
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
    
    axios({
      method: 'get',
      url: thumbnailUri,
      responseType: 'stream'
    }).then(res => {
      const thumbnailStream = res.data;

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

// Example usage
// scheduleLivestream(
//   'Test stream!',
//   'Test stream description',
//   '2023-08-05T13:00:00Z',
//   'https://raw.githubusercontent.com/asyncapi/brand/master/brand-guidelines/branded-tools/assets/tooling-parser-light.png',
//   'PLSNLKbNep0njUwB8FtzM_I99hlmrd2Cz2'
// );
