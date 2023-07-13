import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import Civic from "./Civic.jsx"
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
        const response = await axios.get(`http://localhost:8080/geoJson`)
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
    <>
      <Civic earthquakesData={geoJson} />
    </>
  );
}
export default App;
