# Heroku pipelines promoting

This is a very simple GitHub action, that allows you promote your applications throw
Heroku pipeline.


## Inputs
* `heroku_api_key` **(required)** - This will be used for authentication. You can find it in your heroku homepage account settings.
* `heroku_email` **(required)** - Email that you use with heroku
* `heroku_app_name` **(required)** - The app name, that will be promoted
* `heroku_promote_to_app` **(optional)** - The app(-s), where will be promoted heroku_app_name
