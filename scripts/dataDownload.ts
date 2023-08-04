

import { program } from "commander";
import {Octokit} from "octokit";
import {homedir} from "os";
import {join} from "path";
import {existsSync, readFileSync} from "fs";
import * as assert from "assert";
import * as date from "date-and-time";

function getGHToken(): string {
  let envToken = process.env.GITHUB_TOKEN;
  let tokenFile = join(homedir(), "GITHUB_TOKEN")
  if (typeof envToken !== "undefined") {
    return envToken;
  }
  if (existsSync(tokenFile)) {
    return readFileSync(tokenFile).toString();
  }
  assert.fail("No GITHUB_TOKEN found in environment or in $HOME/GITHUB_TOKEN");
}

const ghDateFormat: string = "YYYY-MM-DD"

async function main() {
  const defaultUntil = new Date().toISOString().split("T")[0];
  const defaultSince = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  program
    .option("-s, --since <since>", "Since date (YYYY-MM-DD)", defaultSince)
    .option("-u, --until <until>", "Until date (YYYY-MM-DD)", defaultUntil)

  program.parse();
  const options = program.opts();
  console.log("Options", options);

  const token = getGHToken();
  const octokit = new Octokit({
    auth: token,
  });

  let workflow = octokit.rest.actions.getWorkflow({
    owner: "enso-org",
    repo: "enso",
    workflow_id: "benchmark.yml"
  })

  let createdStr = date.format(options.since, ghDateFormat) + ".." + date.format(options.until, ghDateFormat);
  console.debug("Created", createdStr);

  let workflowRuns = octokit.rest.actions.listWorkflowRuns({
    owner: "enso-org",
    repo: "enso",
    workflow_id: "benchmark.yml",
    branch: "develop",
    status: "success",
    created: createdStr
  });

  Promise.all([workflow, workflowRuns]).then(values => {
    console.log("Workflow runs", values[1]);
  });

}

main();



