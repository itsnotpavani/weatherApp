const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
var query="";
var temperature="";
var realfeel="";
var humidity="";
var weather="";
var imageurl="";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.post("/",function(req,res){
  query=req.body.cityName;
  var apikey="8d0c5e6ede5cdba9a35d755f27499430";
  var units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+units+"&appid="+apikey;

  https.get(url,function(response){console.log(response.statusCode);
  response.on("data",function(data){

    var weatherdata=JSON.parse(data);
    console.log(weatherdata);

    temperature=weatherdata.main.temp;
    realfeel=weatherdata.main.feels_like;
    humidity=weatherdata.main.humidity;
    weather=weatherdata.weather[0].description;
    
    var icon=weatherdata.weather[0].icon;
    imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
    res.redirect("/");

  });
  });
});
app.get("/",function(req,res){
  res.render("file",{placeName:query,temp:temperature,feel:realfeel,weather:weather,humid:humidity,imgurl:imageurl});
});
app.listen(3000,function(){console.log("the sever is up and running");});
