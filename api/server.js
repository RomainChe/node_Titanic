const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require('cors');
const routes = require('./routes/routes.js');

dotenv.config();
const { APP_HOSTNAME, APP_PORT, MONGODB_URI, SECRET_KEY, MONGO_DB_NAME } = process.env;

const app = express();

app.use(cors());
app.use(express.json())
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", routes);

mongoose.connect(`${MONGODB_URI}${MONGO_DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
})
.then(() => {
  console.log("Connexion à MongoDB réussie");
})
.catch((error) => {
  console.error("Erreur de connexion à MongoDB :", error);
});

app.listen(APP_PORT, () => {
  console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
});
