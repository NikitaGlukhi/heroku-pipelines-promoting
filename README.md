# Heroku pipelines promoting

This is a very simple GitHub action, that allows you promote your applications throw
Heroku pipeline.


## Inputs
* `heroku_api_key` **(required)** - This will be used for authentication. You can find it in your heroku homepage account settings.
* `heroku_email` **(required)** - Email that you use with heroku
* `heroku_app_name` **(required)** - The app name, that will be promoted
* `heroku_promote_to_app` **(optional)** - The app(-s), where will be promoted heroku_app_name

## Example
```
name: Deploy Production to Heroku

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: NikitaGlukhi/heroku-pipelines-promoting@v1.1
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "stage-test-app"
          heroku_email: "example@gmail.com"
          heroku_promote_to_app: "test-prod-app1,test-prod-app2"
```
