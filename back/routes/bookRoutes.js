const express = require("express");
const bookModel = require("../models/book");
const app = express();

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.send('ok');
});

app.get("/books", async (request, res) => {
  const books = await bookModel.find({});

  try {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    res.send(books);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/book", async (request, response) => {
  const book = new bookModel(request.body);

  try {
    response.set('Access-Control-Allow-Origin', '*')
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    await book.save();
    response.send(book);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.patch("/book/:id", async (request, response) => {
  try {
    response.set('Access-Control-Allow-Origin', '*')
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    const book = await bookModel.findByIdAndUpdate(request.params.id, request.body);
    await book.save();
    response.send(book);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/book/:id", async (request, response) => {
  try {
    response.set('Access-Control-Allow-Origin', '*')
    response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    const book = await bookModel.findByIdAndDelete(request.params.id);

    if (!book) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});


module.exports = app;
