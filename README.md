# Typeform OAuth Flow Sandbox

A simple app to test the OAuth flow in Typeform and the different scopes provided. 

You'll get to choose what scopes (permissions) you want to use to login with Typeform and then try them out.

## Installation
1. [Create an application in Typeform](https://admin.typeform.test/account#/section/apps) 
1. Clone the repo
1. Run `yarn install` (or `npm install`) inside the repo directory
1. Copy the `.env.dist` file to a `.env` file and add your `REDIRECT_URL`, and the `CLIENT_ID` and `CLIENT_SECRET` you got from Typeform on step 1
1. Run `export $(cat .env)` to save those values as enviromental variables
1. Run `yarn start` (or `npm start`) to start the app
1. Go to `http://localhost:3000` to begin using it

Alternatively, you can set a PORT env variable which will be picked up by the app.

This project uses PassportJS and a custom passport-typeform strategy to connect via OAuth.
