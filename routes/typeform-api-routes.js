const router = require('express').Router();
const request = require('superagent');
const fs = require('fs');
const path = require('path');

const TF_API_BASE = 'https://api.typeform.com';

router.get('/forms', (req, res) => {
  getFromTypeform('forms', req).then(response =>
    res.send({
      typeformResponseBody: response.body,
      typeformResponseStatus: res.status
    })
  );
});

router.get('/images', (req, res) => {
  getFromTypeform('images', req).then(response =>
    res.send({
      typeformResponseBody: response.body,
      typeformResponseStatus: res.status
    })
  );
});

router.get('/themes', (req, res) => {
  getFromTypeform('themes', req).then(response =>
    res.send({
      typeformResponseBody: response.body,
      typeformResponseStatus: res.status
    })
  );
});

router.get('/responses', (req, res) => {
  getFromTypeform('forms', req)
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
  getFromTypeform('forms', req)
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

router.post('/forms', (req, res) => {
  postToTypeform('forms', req, { title: 'oauth test' }).then(
    postFormResponse => {
      res.send({
        typeformResponseBody: postFormResponse.body,
        typeformResponseStatus: postFormResponse.status
      });
    }
  );
});

router.post('/themes', (req, res) => {
  postToTypeform('themes', req, { name: 'oauth test' }).then(
    postFormResponse => {
      res.send({
        typeformResponseBody: postFormResponse.body,
        typeformResponseStatus: postFormResponse.status
      });
    }
  );
});

router.post('/images', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '../public/img/beach.jpeg'),
    'base64',
    (err, data) => {
      if (err) throw err;
      console.log('readFile');
      request
        .post(`${TF_API_BASE}/images`)
        .set({ Authorization: `Bearer ${req.user.access_token}` })
        .send({
          image: data,
          file_name: 'ana.png'
        })
        .then(postImageResponse => {
          console.log('tf response', postImageResponse.body);
          res.send({
            typeformResponseBody: postImageResponse.body,
            typeformResponseStatus: postImageResponse.status
          });
        })
        .catch(err => console.log(err));
    }
  );
});

module.exports = router;

function getFromTypeform(collection, req) {
  return request
    .get(`${TF_API_BASE}/${collection}`)
    .set({ Authorization: `Bearer ${req.user.access_token}` });
}

function postToTypeform(collection, req, body) {
  return request
    .post(`${TF_API_BASE / collection}`)
    .set({ Authorization: `Bearer ${req.user.access_token}` })
    .send(body);
}
