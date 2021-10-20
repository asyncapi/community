const { copyFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');

// this script copies a tweet with tweet file name passed with TWEET_FILENAME env variable and puts it 
// in the /tweets/ directory, under a dedicated directory that indicates it is recurring tweet
// filename of the tweet is a date that indicates when it was tweeted

// to run it locally just call in terminal the following from a root of the project
// TWEET_FILENAME=discuss-ideas.tweet node .github/scripts/createTweetFile.js

const tweetFilename = process.env['TWEET_FILENAME']; //is a filename with file extension, like "discuss-ideas.tweet"
const date = new Date().toISOString().split('T')[0] // gives us YYYY-MM-DD that will be used as a filename for the tweet
const filenameNoExt = path.parse(tweetFilename).name; // gives us for example "discuss-ideas" from "discuss-ideas.tweet". It is needed for custom folder name
const customDestinyDir = path.join(__dirname,`../../tweets/recurring-${filenameNoExt}`); //gives us for example "tweets/recurring-discuss-ideas"

const copySrc = path.join(__dirname, `/recurring_tweets/${tweetFilename}`); // gives us for example ".github/scripts/recurring_tweets/discuss-ideas.tweet"
const copyDest = `${customDestinyDir}/${date}.tweet`; //gives us for example "tweets/recurring-discuss-ideas/2021-10-14.tweet"

if (!existsSync(customDestinyDir)) mkdirSync(customDestinyDir); // we need to create new custom dir only if it doesn't exist yet, otherwise we would get an error
copyFileSync(copySrc, copyDest); // copies a file with new name to new location