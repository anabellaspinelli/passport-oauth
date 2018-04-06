const router = require('express').Router();
const request = require('superagent');
const scopes = require('../config/scopes');

const TF_API_BASE = 'https://api.typeform.com';

scopes.forEach(scope => {
  router.get(`/${scope}`, (req, res) => {
    request
      .get(`${TF_API_BASE}/${scope}`)
      .set({ Authorization: `Bearer ${req.user.access_token}` })
      .then(response => {
        res.send({
          typeformResponseBody: response.body,
          typeformResponseStatus: res.status
        });
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error(e));
  });
});

module.exports = router;
