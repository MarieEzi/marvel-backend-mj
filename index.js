const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const app = express();
app.use(formidableMiddleware());
app.use(cors());
require ("dotenv").config()



app.get("/", (req, res) => {
  return res.json({ message : "welcome"})
})
   

app.listen(process.env.PORT, () => { 
  console.log("Server started");
});