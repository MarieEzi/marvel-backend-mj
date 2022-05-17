const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/users_marvel');
require ("dotenv").config()


app.get("/", (req, res) => {
  res.json({message : "Welcome sur la route de MJ"});
});

//gestion des users
app.post("/user/signup", async (req, res) => {
  
  const User = mongoose.model("User", {
    pseudo: {
        type: String,
      },
    email: {
      unique: true,
      type: String,
    },
    password : String,
  });

  const newUser = new User(req.fields);
  try {
        await newUser.save();
        res.json({
      _id: newUser._id,
      pseudo: newUser.pseudo,
      email: newUser.email,
      password: newUser.password,
        });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/user/login", async (req, res) => {
  const User = mongoose.model("User", {
    pseudo: {
        type: String,
      },
    email: {
      unique: true,
      type: String,
    },
    password : String,
  });

  try {
    const userToCheck = await User.findOne({ email: req.fields.email });
    if (userToCheck === null) {
      res.status(401).json({ message: "Unauthorized ! 1" });

      if (userToCheck.hash === newHash) {
        res.json({
          _id: userToCheck._id,
          password: userToCheck.password,
          email: userToCheck.email,
        });
      } else {
        res.status(401).json({ message: "Unauthorized ! 2" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//liste des comics
app.get("/comics", async (req,res) => {
  try{
const response = await axios.get (`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`);
res.json(response.data);  
}catch (error){
    console.log(error.message);
  }
});



//liste des comics avec un personnage spécial
app.get("/comics/:characterId",async (req,res) => {
  try{
const response = await axios.get (`https://lereacteur-marvel-api.herokuapp.com/character/:characterId?apiKey=${process.env.MARVEL_API_KEY}`);
res.send(response.data);  
}catch (error){
    console.log(error.message);
  }
});

//liste des personnages
app.get("/characters",async (req,res) => {
  try{
const response = await axios.get (`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}`);
res.json(response.data);  
}catch (error){
    console.log(error.message);
  }
});

//liste des infos sur les personnages spéciaux
app.get("/character/:characterId",async (req,res) => {
  try{
const response = await axios.get (`https://lereacteur-marvel-api.herokuapp.com/character/:characterId?apiKey=${process.env.MARVEL_API_KEY}`);
res.send(response.data);  
}catch (error){
    console.log(error.message);
  }
});

app.all("*", (req, res) => {
  res.status(400).json("Route introuvable !");
});

app.listen(process.env.PORT, () => { 
  console.log("Server started");
});