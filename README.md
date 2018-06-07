# Typeform OAuth Flow Sandbox

A simple app to test the OAuth flow in Typeform and the different scopes provided. 

You'll get to choose what scopes (permissions) you want to use to login with Typeform and then try them out.

![](https://lh3.googleusercontent.com/yasebXE_8Ky2eCisdgpn2umi-Rb4E5YcAf_NBCyalPXFWsc-Le4cUVSvyXRR8yvdZW73T0bJO8rWKp8OfHALXqbAyFP_ggdkMAZrus4y-dK0VCapOEwcA0Rf8MHsECJLqCqNY9if6f5JnThWx-4uhj3rpc_duM2xJqv4lH2U1s5IaG2ojbMiUKYUfCGcLXGadHtm4VsJwduFz2sw_MNyvMFFlE50t5f9VDrH3EY0heK02ymXeS8kXx3per4EuCvQby1geF9FyWCV-pJFK9fGO0t-I7-y_sqUfvopk_Yj-U1akAhpUqdcG_KUmnCNt98ONooyvq3MAzRSpOyQx6iCdRrFWswvkqNGvXGHje5qlqoFMTdWJCh3ZAl7BL4TcBQ9SDSuVU1rDByyajoHac76F-CCgqja8Jd4w72yC01kmcSHmjsRgD1YtWL6wkxN4eYaKkzz8qkowQZ6sIm5e1UPcyWM9TggOROjFe1X6VCKxElNKLfoT1zUBBVl5rbPtfnWTbpwq2ajhXLjCSrFOjAUoH4yvmLegspAZJKRX33VCQ9ugHgCvoytLoGIj0xdwZiUcxefMGe7tSDkQbqY1IU9RmpAUxriV1gKalgEhHZI=w960-h677-no "Scope selection dashboard")

## Installation

1. Clone the repo
1. Run `yarn install` (or `npm install`) inside the repo directory
1. Copy the `.env.dist` file to a `.env` file  
1. [Create an application in Typeform](https://admin.typeform.test/account#/section/apps)
    * Make sure you set up the redirect URI to `http://localhost:9031/auth/typeform/redirect`.
    * You can replace `localhost:9031` with wherever you're running the app, but make sure the last part of the route is correct.
1. Add the `CLIENT_ID` and `CLIENT_SECRET` you got from Typeform on the previous step
1. Run `yarn start` (or `npm start`) to start the app
1. Go to `http://localhost:9031` to begin using it

### Optional settings
These are optional values that can be added to the .env file

#### Redirect URL
You can set up a `REDIRECT_URI` here, otherwise it will default to `http://localhost:9031/auth/typeform/redirect`. 
Only change it if you also changed it in step 4.

#### Authorizartion and Token URLs
`AUTHORIZATION_URL` and `TOKEN_URL` are there to use a local instance of the auth api. 
If they're not provided, they default to production.

#### Port
`PORT` will be picked up by the app instead of 9301.

This project uses PassportJS and a custom [passport-typeform](https://www.npmjs.com/package/passport-typeform) strategy to connect via OAuth.
