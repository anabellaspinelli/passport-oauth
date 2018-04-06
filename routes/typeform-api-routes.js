const router = require('express').Router();
const request = require('superagent');
const TF_API_BASE = 'https://api.typeform.com';

router.get('/forms', (req, res) => {
  return (
    request
      .get(`${TF_API_BASE}/forms`)
      .set({ Authorization: `Bearer ${req.user.access_token}` })
      .then(response => {
        res.send(response.body);
      })
      // eslint-disable-next-line no-console
      .catch(e => console.error(e))
  );
});

module.exports = router;
