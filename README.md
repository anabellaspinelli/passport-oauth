# passport-oauth

You'll need a keys.js in config with your app keys, and this format:

```
module.exports = {
  typeform: {
    clientID: <your Typeform client ID>,
    clientSecret: <your Typeform client Secret>
  },
  session: {
    cookieKey: 'some string?'
  }
};
```
