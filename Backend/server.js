require("dotenv").config();
const express= require("express");
const app = express();
const axios = require("axios")
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error)=>{console.log(error)})
database.once("connected", ()=>{console.log("database connected")})
const earthquake = require('./earthquake');
const cors=require('cors');

app.use(cors({
  origin: ['http://localhost:3000',"https://earthquake-visualisation.vercel.app","https://earthquake-visualisation-kuevamv88-chandana147.vercel.app/"]
}));
app.get('/fetchedData', async (req, res) => {
  try {
    const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json');
    if (response.data && response.data.Infogempa && response.data.Infogempa.gempa) {
      const database = response.data.Infogempa.gempa;
      console.log(database);
      
      database.map((x)=>{
        const newEarthquake = new earthquake({
          DateTime: x.DateTime,
          Region: x.Wilayah,
          Magnitude:x.Magnitude,
          Latitude: parseFloat(x.Lintang),
          Longtitude: parseFloat(x.Bujur)

        });
        newEarthquake.save();
      })

      res.status(200).json({ message: 'Data inserted successfully!' });
    } else {
      res.status(404).json({ message: 'No earthquake data found.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'An error occurred.' });
  }
});

app.get('/geoJson', async (req, res) => {
  try{
    const data = await earthquake.find({})
    if(data.length > 0){
      console.log('db daata',data);
        const geoJson = data.map((x)=>({
          type:"Infogempa",
            geometry: {
              DateTime: x.DateTime,
              Region: x.Region,
              Magnitude:x.Magnitude,
              Latitude:x.Latitude,
              Longtitude:x.Longtitude
            },
            properties: {
              name: "geoJson"
            }
        }))
        res.status(200).json({ message : geoJson, code:200 });
    }
   else{
    res.status(200).json({
      mag: 'data not found'
    })
   }
  }
  catch(err){
    console.log(err)
    res.status(500).json({ message: 'An error occurred.' });   
  }
});

const port = 8080;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
});