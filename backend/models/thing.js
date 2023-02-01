const mongoose = require("mongoose");
//création d'un sham de données
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});
//Méthode de mongoose qui permet d'exporter le model dans notre base de donnée
module.exports = mongoose.model("Thing", thingSchema);

/*Ce modèle nous permettra non seulement d'appliquer notre structure de données, 
mais aussi de simplifier les opérations de lecture 
et d'écriture dans la base de données*/
