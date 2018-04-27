const router = require('express').Router()
const request = require('superagent')
const fs = require('fs')
const path = require('path')

const TF_API_BASE = 'https://api.typeform.com'

router.get('/forms', (req, res) => {
  getFromTypeform('forms', req)
    .then(response =>
      res.send({
        typeformResponseBody: response.body,
        typeformResponseStatus: res.status
      })
    )
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.get('/images', (req, res) => {
  getFromTypeform('images', req)
    .then(response =>
      res.send({
        typeformResponseBody: response.body,
        typeformResponseStatus: res.status
      })
    )
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.get('/themes', (req, res) => {
  getFromTypeform('themes', req, { visibility: 'private' })
    .then(response =>
      res.send({
        typeformResponseBody: response.body,
        typeformResponseStatus: res.status
      })
    )
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.get('/responses', (req, res) => {
  getFromTypeform('forms', req)
    .then(formsResponse => formsResponse.body.items[0].id)
    .then(formId => {
      return request
        .get(`${TF_API_BASE}/forms/${formId}/responses`)
        .set({ Authorization: `Bearer ${req.user.access_token}` })
    })
    .then(responsesResponse => {
      res.send({
        typeformResponseBody: responsesResponse.body,
        typeformResponseStatus: responsesResponse.status
      })
    })
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.get('/webhooks', (req, res) => {
  postToTypeform('forms', req, { title: 'Typeform OAuth Test App (webhooks)' })
    .then(formResponse => formResponse.body.id)
    .then(formId => {
      return request
        .put(`${TF_API_BASE}/forms/${formId}/webhooks/oauthTag`)
        .set({ Authorization: `Bearer ${req.user.access_token}` })
        .send({
          url: 'https://www.google.com',
          enabled: true
        })
    })
    .then(whPutResponse => whPutResponse.body)
    .then(whPutResponse => {
      return request
        .get(
          `${TF_API_BASE}/forms/${whPutResponse.form_uid}/webhooks/${whPutResponse.tag}`
        )
        .set({ Authorization: `Bearer ${req.user.access_token}` })
    })
    .then(whGetResponse => {
      res.send({
        typeformResponseBody: whGetResponse.body,
        typeformResponseStatus: whGetResponse.status
      })
    })
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.post('/webhooks', (req, res) => {
  return getFromTypeform('forms', req)
    .then(formsResponse => formsResponse.body.items[0].id)
    .then(formId => {
      return request
        .put(`${TF_API_BASE}/forms/${formId}/webhooks/oauthTag`)
        .set({ Authorization: `Bearer ${req.user.access_token}` })
        .send({ url: 'https://www.google.com', enabled: true })
    })
    .then(response => {
      res.send({
        typeformResponseBody: response.body,
        typeformResponseStatus: response.status
      })
    })
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.post('/forms', (req, res) => {
  postToTypeform('forms', req, {
    title: `Typeform OAuth Test App ${Date.now()}`
  })
    .then(postFormResponse => {
      res.send({
        typeformResponseBody: postFormResponse.body,
        typeformResponseStatus: postFormResponse.status
      })
    })
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.post('/themes', (req, res) => {
  postToTypeform('themes', req, {
    name: `Typeform OAuth Test App ${Date.now()}`,
    font: 'Raleway',
    colors: {
      question: '#FFFFFF',
      answer: '#000000',
      button: '#B84242',
      background: '#FF7A7A'
    }
  })
    .then(postFormResponse => {
      res.send({
        typeformResponseBody: postFormResponse.body,
        typeformResponseStatus: postFormResponse.status
      })
    })
    .catch(err =>
      res.send({
        typeformResponseBody: err.response.text,
        typeformResponseStatus: err.status
      })
    )
})

router.post('/images', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '../public/img/beach.jpeg'),
    'base64',
    (err, data) => {
      if (err) throw err
      request
        .post(`${TF_API_BASE}/images`)
        .set({ Authorization: `Bearer ${req.user.access_token}` })
        .send({
          image: data,
          file_name: `Typeform_OAuth_${Date.now()}.jpeg`
        })
        .then(postImageResponse => {
          console.log('tf response', postImageResponse.body)
          res.send({
            typeformResponseBody: postImageResponse.body,
            typeformResponseStatus: postImageResponse.status
          })
        })
        .catch(err =>
          res.send({
            typeformResponseBody: err.response.text,
            typeformResponseStatus: err.status
          })
        )
    }
  )
})

module.exports = router

function getFromTypeform (collection, req, query) {
  query = query || {}

  return request
    .get(`${TF_API_BASE}/${collection}`)
    .set({ Authorization: `Bearer ${req.user.access_token}` })
    .query(query)
}

function postToTypeform (collection, req, body) {
  return request
    .post(`${TF_API_BASE}/${collection}`)
    .set({ Authorization: `Bearer ${req.user.access_token}` })
    .send(body)
}
