const fs = require("fs");

module.exports = {
  fetchWithCache,
  saveCache,
  loadCache,
  printAPICallsStats,
};

const CODEOWNERS_CACHE_PATH = "./.github/scripts/maintainers/github.api.cache.json";

let cacheEntries = {};

let numberOfFullFetches = 0;
let numberOfCacheHits = 0;

function loadCache(core) {
  try {
    cacheEntries = JSON.parse(fs.readFileSync(CODEOWNERS_CACHE_PATH, "utf8"));
  } catch (error) {
    core.warning(`Cache was not restored: ${error}`);
  }
}

function saveCache() {
  fs.writeFileSync(CODEOWNERS_CACHE_PATH, JSON.stringify(cacheEntries));
}

async function fetchWithCache(cacheKey, fetchFn, core) {
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

function printAPICallsStats(core) {
  core.startGroup("API calls statistic");
  core.info(
    `Number of API calls count against rate limit: ${numberOfFullFetches}`,
  );
  core.info(`Number of cache hits: ${numberOfCacheHits}`);
  core.endGroup();
}
