// Express app

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config()

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

// Creates Express app
const app = express();


mongoose.connect(process.env.DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



// To access the body of a POST request
// Intercepts every requests with a json content-type (application/json) and makes it accessible from req.body
// Older equivalent : body-parser()
app.use(express.json());


// Headers on the response object (to communicate with the front part of the web app)
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// Saves routers on the Express app
app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

// Handles static path
app.use("/images", express.static(path.join(__dirname, "images")));




module.exports = app;