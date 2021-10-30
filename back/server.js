const express = require("express");
const mongoose = require("mongoose");
const foodRouter = require("./routes/bookRoutes.js");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://Book-admin:ваш пароль@cluster0.d6dtp.mongodb.net/test", // создайте свою строку подключения
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
