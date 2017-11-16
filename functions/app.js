const cors = require('cors');
const express = require('express');
const fetch = require('isomorphic-fetch');

const app = module.exports = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('null');
});

app.get('/bookmarks', (req, res) => {
  const { uri } = req.query;
  const requestUri = `http://b.hatena.ne.jp/entry/json/?url=${encodeURIComponent(uri)}`
  express.json();
  fetch(requestUri)
    .then(response => response.json())
    .then(({ bookmarks, count, title }) => res.send({ count, bookmarks, title }))
    .catch((error) => {
      res.status(500);
      res.send({ error: error.message });
    });
});
