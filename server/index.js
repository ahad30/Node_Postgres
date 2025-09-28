const express = require("express");
require('dotenv').config();
const app = express();
const cors = require("cors");
const pool = require("./db/db");

const itemRoutes = require('./routes/itemRoutes');

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

app.use('/api', itemRoutes);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
