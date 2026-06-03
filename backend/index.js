const express=require("express");
const mongoose =require("mongoose")
const urlRoutes=require("./routes/routes.js")
const app=express();
const cors=require("cors")
app.use(cors());
app.use(express.json());

app.use("/", urlRoutes);

mongoose.connect('mongodb+srv://devNish17:na!nskh!atnat@nishant117.72wnkac.mongodb.net/url-shortend').
then(()=>{
    console.log("Database connected..")
app.listen(2000, () => {

  console.log("Server started and");
  console.log("listening at port 2000");
});
}).
catch((err)=>{
    console.log("error occured",err);
})



