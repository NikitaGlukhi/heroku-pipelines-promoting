import {
  getInput,
  startGroup,
  endGroup,
  setFailed,
  setOutput,
} from '@actions/core';
import { execSync } from 'child_process';
import { createCatFile } from './create-cat-file';

const api_key = getInput('heroku_api_key');
const email = getInput('heroku_email');
const app_name = getInput('heroku_app_name');
const promote_to_app = getInput('heroku_promote_to_app');

try {
  let script = `heroku pipelines:promote -a ${app_name}`;
  let statusValue = `Successfully promoted heroku app ${app_name}`;
  let promoteGroupMsg = `Promoting app ${app_name}`;

  script += promote_to_app ? ` --to ${promote_to_app}` : '';
  statusValue += promote_to_app ? ` to ${promote_to_app} app(-s)` : '';
  promoteGroupMsg += promote_to_app ? ` to ${promote_to_app} app(-s)` : '';

  startGroup('Heroku sign in');
  execSync(createCatFile(email, api_key));
  console.log('Created and wrote to ~./netrc');

  execSync('heroku login');
  console.log('Successfully logged into Heroku');
  endGroup();

  startGroup(promoteGroupMsg);
  execSync(script);
  setOutput('status', statusValue);
  endGroup();
} catch (err) {
  setFailed(err.toString());
}
