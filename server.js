const express = require('express');
const ejs = require('ejs');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const dotenv = require('dotenv'); // Import dotenv package

dotenv.config(); // Load environment variables from .env file

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  const apiKey = process.env.OMDB_API_KEY; // Access the API key from environment variables
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      res.render('search', { movies: data.Search });
    } else {
      res.render('error');
    }
  };
  xhr.send();
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
