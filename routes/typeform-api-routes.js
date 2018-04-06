const router = require('express').Router();
const request = require('superagent');

const TF_API_BASE = 'https://api.typeform.com';

['forms', 'images', 'themes'].forEach(scope => {
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

router.get('/responses', (req, res) => {
  request
    .get(`${TF_API_BASE}/forms`)
    .set({ Authorization: `Bearer ${req.user.access_token}` })
    .then(formsResponse => formsResponse.body.items[0].id)
    .then(formId => {
      return request
        .get(`${TF_API_BASE}/forms/${formId}/responses`)
        .set({ Authorization: `Bearer ${req.user.access_token}` });
    })
    .then(responsesResponse => {
      res.send({
        typeformResponseBody: responsesResponse.body,
        typeformResponseStatus: responsesResponse.status
      });
    })
    // eslint-disable-next-line no-console
    .catch(e => console.error(e));
});

router.get('/webhooks', (req, res) => {
  request
    .get(`${TF_API_BASE}/forms`)
    .set({ Authorization: `Bearer ${req.user.access_token}` })
    .then(formsResponse => formsResponse.body.items[0].id)
    .then(formId => {
      return request
        .get(`${TF_API_BASE}/forms/${formId}/webhooks/tag`)
        .set({ Authorization: `Bearer ${req.user.access_token}` });
    })
    .then(webhooksResponse => {
      res.send({
        typeformResponseBody: webhooksResponse.body,
        typeformResponseStatus: webhooksResponse.status
      });
    })
    // eslint-disable-next-line no-console
    .catch(e => console.error(e));
});

module.exports = router;
