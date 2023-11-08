const express =require("express");
const bodyParser = require('body-parser'); 
const cors = require("cors");

const authRoutes =require("./Routes/auth");
const userRoutes =require("./Routes/user");

const app=express();
require('dotenv').config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth',authRoutes);
app.use('/user',userRoutes);

const port=3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});