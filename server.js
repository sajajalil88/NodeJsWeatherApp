const express = require('express');
const axios = require('axios');

const app = express();
// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

//render the index template
app.get("/", (Req,res)=>{
    res.render("index", {weather:null, error:null});
});

//handle the weather route
app.get("/weather", async (req,res) =>{
    const city = req.query.city;
    const apiKey = "6929ba1682303aee44f799c671c9428d";
    const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    let weather;
    let error = null;
    try{
        const response = await axios.get(APIUrl);
        weather = response.data;
    }catch(error){
        weather = null;
        error = "Error, Please try again";
    }
    res.render("index", {weather, error});
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});