const express = require('express');
const app = express();
const PORT = 3333;
const Reviews = require('../database/Review.js');
const cors = require('cors');
const path = require('path');
app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/reviews', (req, res) => {
  Reviews.find()
    .then(data => res.send(data))
    .catch(err => console.error(err));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});