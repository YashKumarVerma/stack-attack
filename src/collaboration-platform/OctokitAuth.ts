import fs from "fs";

import { Octokit } from "@octokit/rest";

let cachedOctokit: Octokit | undefined;
let repoPathForCachedOctokit: string | undefined;

function octokitConstructor(repoPath: string): Octokit {
  try {
    const configFileContents = fs
      .readFileSync(`${repoPath}/sttack.config.json`)
      .toString();
    const { personalAccessToken } = JSON.parse(configFileContents);
    const octokit = new Octokit({
      auth: personalAccessToken,
    });
    return octokit;
  } catch (error) {
    console.log(error);
    console.log(
      "Please create a token on GitHub (https://github.com/settings/tokens) and set it up on a sttack.config.json file",
    );
    process.exit(1);
  }
}

export function getOctokit(repoPath: string): Octokit {
  if (repoPathForCachedOctokit === repoPath && cachedOctokit) {
    return cachedOctokit;
  }

  cachedOctokit = octokitConstructor(repoPath);
  repoPathForCachedOctokit = repoPath;
  return cachedOctokit;
}
