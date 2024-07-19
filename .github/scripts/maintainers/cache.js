const fs = require("fs");
const core = require("@actions/core");

module.exports = {
  fetchWithCache,
  saveCache,
  loadCache,
  printAPICallsStats,
};

const CODEOWNERS_CACHE_PATH = "github.api.cache.json";

let cacheEntries = {};

let numberOfFullFetches = 0;
let numberOfCacheHits = 0;

async function loadCache() {
  try {
    cacheEntries = JSON.parse(fs.readFileSync(CODEOWNERS_CACHE_PATH, "utf8"));
  } catch (error) {
    core.warning(`Cache was not restored: ${error}`);
  }
}

async function saveCache() {
  fs.writeFileSync(CODEOWNERS_CACHE_PATH, JSON.stringify(cacheEntries));
}

async function fetchWithCache(cacheKey, fetchFn) {
  const cachedResp = cacheEntries[cacheKey];

  try {
    const { data, headers } = await fetchFn({
      headers: {
        "if-modified-since": cachedResp?.lastModified ?? "",
      },
    });

    cacheEntries[cacheKey] = {
      // last modified header is more reliable than etag while executing calls on GitHub Action
      lastModified: headers["last-modified"],
      data,
    };

    numberOfFullFetches++;
    return data;
  } catch (error) {
    if (error.status === 304) {
      numberOfCacheHits++;
      core.debug(`Returning cached data for ${cacheKey}`);
      return cachedResp.data;
    }
    throw error;
  }
}

function printAPICallsStats() {
  core.startGroup("API calls statistic");
  core.info(
    `Number of API calls count against rate limit: ${numberOfFullFetches}`,
  );
  core.info(`Number of cache hits: ${numberOfCacheHits}`);
  core.endGroup();
}
