require("dotenv").config();
const { connectDb } = require("./src/services/mongoose");
const userRoute = require("./src/routes/user");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

connectDb().catch((err) => console.log(err));
app.use(express.json());
app.use(userRoute);

app.listen(port, () => {
  console.log(`Le serveur tourne sur http://localhost:${port}`);
});
