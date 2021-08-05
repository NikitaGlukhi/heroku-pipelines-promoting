const core = require('@actions/core');
const { execSync } = require('child_process');

const createCatFile = ({ email, api_key }) => `cat >~/.netrc <<EOF
machine api.heroku.com
    login ${email}
    password ${api_key}
machine git.heroku.com
    login ${email}
    password ${api_key}
EOF`;

const heroku = {
    api_key: core.getInput('heroku_api_key'),
    email: core.getInput('heroku_email'),
    app_name: core.getInput('heroku_app_name'),
    promote_to_app: core.getInput('heroku_promote_to_app')
};

try {
    let script = `heroku pipelines:promote -r ${heroku.app_name}`;
    let statusValue = `Successfully promoted heroku app ${heroku.app_name}`;

    script += heroku.promote_to_app ? ` --to ${heroku.promote_to_app}` : '';
    statusValue += heroku.promote_to_app ? ` to ${heroku.promote_to_app} app(-s)` : '';

    execSync(createCatFile(heroku));
    console.log('Created and wrote to ~./netrc');

    execSync('heroku login');
    console.log('Successfully logged into heroku');

    execSync(script);
    core.setOutput('status', statusValue);
} catch (err) {
    core.setFailed(err.toString());
}
