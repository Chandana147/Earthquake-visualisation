import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Civic from "./Earthquakes.jsx"
import 'leaflet/dist/leaflet.css';

const App=()=> {
  const [geoJson, setgeoJson] = useState([])

  useEffect(()=> {
    console.log(geoJson);
  },[geoJson]);

  useEffect(() => {
    receiving();
  },[]);

    const receiving = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/geoJson`)
        console.log(response);
        if (response.data.code === 200) {
          setgeoJson(response.data.message)
        }
        else {
          console.log('not data');
          // alert('not working')
        }
      }
      catch (err) {
        console.log(err)
        // alert('wrong')
      }
    }
  return (
    <div id="earth">
      Earthquake Visualization
      <Civic earthquakesData={geoJson} />
    </div>
  );
}
export default App;
