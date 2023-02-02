const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const path = require('path');
const app = express();

mongoose.connect("mongodb+srv://issou:8383@cluster0.k4dphx2.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
/*Ce middleware sert à intercepeter toutes les requètes qui ont un content-type: json, 
et nous met à dispodition celui-ci sur l'objet requète dans req.body*/
app.use(express.json());
//Une ancienne methode: 'body.parser'

/*Accés à l'API depuis n'importe où/Ajouter les headers mentionnés aux requètes envoyées vers notre API/
Envoyer des requétes avec les methodes GET, POST, ETC....

Methode qui permet d'empecher les erreurs CORS: bloque les appels HTTP entre des serveurs différents, 
ce qui empêche donc les requêtes 
malveillantes d'accéder à des ressources sensibles. 
Dans notre cas, nous avons deux origines : localhost:3000 et localhost:4200 , 
et nous souhaiterions qu'elles puissent communiquer entre elles. Pour cela, nous devons ajouter 
des headers à notre objet  response*/

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use(bodyParser.json());

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = app;
