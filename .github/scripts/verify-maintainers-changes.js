const { execSync } = require("child_process");
const yaml = require("yaml");
const fs = require("fs");

const prAuthor = process.argv[2];

if (prAuthor.includes("[async-bot]")) {
  console.log("Changes made by an async-bot. Verification not necessary.");
  process.exit(0);
}

execSync("git fetch origin main");
execSync("git checkout FETCH_HEAD -- Maintainers.yaml");

const maintainersBefore = yaml.parse(fs.readFileSync("Maintainers.yaml", "utf8"));

execSync("git checkout HEAD Maintainers.yaml");
const maintainersAfter = yaml.parse(fs.readFileSync("Maintainers.yaml", "utf8"));

const beforeSet = new Set(maintainersBefore.map((maintainer) => maintainer.name));
const afterSet = new Set(maintainersAfter.map((maintainer) => maintainer.name));

let isCriticalChangeDetected = false;

for (const maintainer of maintainersAfter) {
  if (!beforeSet.has(maintainer.name)) {
    console.error(`::error::Critical changes have been made to Maintainers.yaml by ${prAuthor}. A new maintainer object has been added. Please review.`);
    isCriticalChangeDetected = true;
    break;
  }
}

if (!isCriticalChangeDetected) {
  for (const maintainer of maintainersBefore) {
    if (!afterSet.has(maintainer.name)) {
      console.error(`::error::Critical changes have been made to Maintainers.yaml by ${prAuthor}. A maintainer object has been removed. Please review.`);
      isCriticalChangeDetected = true;
      break;
    }
  }
}

if (!isCriticalChangeDetected) {
  for (let i = 0; i < maintainersAfter.length; i++) {
    const maintainerBefore = maintainersBefore.find(m => m.name === maintainersAfter[i].name);
    const maintainerAfter = maintainersAfter[i];

    if (maintainerBefore && (maintainerBefore.github !== maintainerAfter.github || !arraysAreEqual(maintainerBefore.repos, maintainerAfter.repos))) {
      console.error(`::error::Critical changes have been made to Maintainers.yaml by ${prAuthor}. Changes to critical attributes detected. Please review.`);
      isCriticalChangeDetected = true;
      break;
    }
  }

  if (!isCriticalChangeDetected) {
    console.log("No critical changes detected.");
  }
}

if (isCriticalChangeDetected) {
    console.log("::set-output name=isCriticalChange::true");
}

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
