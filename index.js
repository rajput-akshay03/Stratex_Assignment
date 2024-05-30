const express= require("express");
const routes = require("./Routes/index");
const app=express();
require("dotenv").config();
app.get("/",(req,res)=>{
      res.send("hello this is running")
})
const PORT =process.env.PORT||4000;
app.use(express.json());
app.use(routes);
app.listen(PORT,()=>{
    console.log(`running at ${PORT}`);
})
