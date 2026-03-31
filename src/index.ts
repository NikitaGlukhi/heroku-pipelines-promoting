import {
  getInput,
  startGroup,
  endGroup,
  setFailed,
  setOutput,
} from "@actions/core";
import { execSync } from "child_process";
import { createCatFile } from "./create-cat-file";

const heroku = {
  api_key: getInput("heroku_api_key"),
  email: getInput("heroku_email"),
  app_name: getInput("heroku_app_name"),
  promote_to_app: getInput("heroku_promote_to_app"),
};

try {
  let script = `heroku pipelines:promote -a ${heroku.app_name}`;
  let statusValue = `Successfully promoted heroku app ${heroku.app_name}`;
  let promoteGroupMsg = `Promoting app ${heroku.app_name}`;

  script += heroku.promote_to_app ? ` --to ${heroku.promote_to_app}` : "";
  statusValue += heroku.promote_to_app
    ? ` to ${heroku.promote_to_app} app(-s)`
    : "";
  promoteGroupMsg += heroku.promote_to_app
    ? ` to ${heroku.promote_to_app} app(-s)`
    : "";

  startGroup("Heroku sign in");
  execSync(createCatFile(heroku));
  console.log("Created and wrote to ~./netrc");

  execSync(`git config user.name "Heroku-Deploy"`);
  execSync(`git config user.email "${heroku.email}"`);
  console.log("Successfully logged into Heroku");
  endGroup();

  startGroup(promoteGroupMsg);
  execSync(script);
  setOutput("status", statusValue);
  endGroup();
} catch (err) {
  setFailed(err.toString());
}
