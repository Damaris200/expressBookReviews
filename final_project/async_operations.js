const axios = require('axios');
const BASE = 'http://localhost:5000';

const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE}/`);
    console.log("All Books:", response.data);
  } catch (err) {
    console.error(err.message);
  }
};

const getByISBN = (isbn) => {
  axios.get(`${BASE}/isbn/${isbn}`)
    .then(res => console.log("By ISBN:", res.data))
    .catch(err => console.error(err.message));
};

const getByAuthor = (author) => {
  axios.get(`${BASE}/author/${author}`)
    .then(res => console.log("By Author:", res.data))
    .catch(err => console.error(err.message));
};

const getByTitle = (title) => {
  axios.get(`${BASE}/title/${title}`)
    .then(res => console.log("By Title:", res.data))
    .catch(err => console.error(err.message));
};

getAllBooks();
getByISBN("1");
getByAuthor("Chinua Achebe");
getByTitle("Things Fall Apart");