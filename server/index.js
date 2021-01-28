/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/hello', (req, res) => {
  res.send('hello');
});

const ports = {
  item: 1000,
  ultbought: 2000,
  alsoliked: 2000,
  reviews: 3000,
  qna: 4000,
};

app.get('/api/products/:id/:service', (req, res) => {
  const itemNum = parseInt(req.params.id, 10);
  const { service } = req.params;
  axios.get(`http://localhost:${ports[service]}/api/products/${itemNum}/${service}`)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.post('/api/products/reviews', (req, res) => {
  axios.post('http://localhost:3000/api/products/reviews', req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

app.post('/api/products/:id/qna', (req, res) => {
  const { id } = req.params;
  axios.post(`http://localhost:4000/api/products/${id}/qna`, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

app.post('/api/products/:id/qna/answer', (req, res) => {
  const { id } = req.params;
  axios.post(`http://localhost:4000/api/products/${id}/qna/answer`, req.body)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

app.patch('/api/products/:id/:service/:helpful', (req, res) => {
  const { service, id, helpful } = req.params;
  axios.patch(`http://localhost:${ports[service]}/api/products/${id}/${service}/${helpful}`, id)
    .then((response) => res.send(response))
    .catch((err) => res.send(err));
});

app.patch('/api/products/:id/qna/answer/:helpful', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { helpful } = req.params;
  axios.patch(`http://localhost:4000/api/products/${id}/qna/answer/${helpful}`, req.body)
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
