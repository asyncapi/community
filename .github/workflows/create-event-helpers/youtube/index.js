const { google } = require("googleapis");
const core = require("@actions/core");

const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/youtube'],
    credentials: JSON.parse(process.env.YOUTUBE_SERVICE_ACCOUNT)
});

const youtube = google.youtube({
    version: "v3",
    auth: auth
});

async function createBroadcast(){
    try {
        await youtube.liveBroaddcast.insert({
            
        })
        
    } catch (error) {
        
    }
}