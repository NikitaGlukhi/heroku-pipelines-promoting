# Heroku pipelines promoting

This is a very simple GitHub action, that allows you promote your applications throw
Heroku pipeline.


## Inputs
The action comes with additional options that you can use to configure your project's behavior on Heroku. You can setup these options under the "with" object as presented above:

| Name                   | Required | Description                                                                                    |
|------------------------|----------|------------------------------------------------------------------------------------------------|
| heroku_api_key         | true     | This will be used for authentication. You can find it in your heroku homepage account settings |
| heroku_email           | true     | Email that you use with heroku                                                                 |
| heroku_app_name        | true     | The app name, that will be promoted                                                            |
| heroku_promote_to_app  | false    | The app(-s), where will be promoted heroku_app_name                                            |

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
      - uses: actions/checkout@v4
      - uses: NikitaGlukhi/heroku-pipelines-promoting@v3
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "stage-test-app"
          heroku_email: "example@gmail.com"
          heroku_promote_to_app: "test-prod-app1,test-prod-app2"
```
