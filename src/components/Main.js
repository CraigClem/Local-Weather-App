// import React from 'react'
import axios from 'axios'
import React, { useState } from 'react'
import moment from 'moment'
import LinearProgress from '@material-ui/core/CircularProgress'




function Main() {
  const [weather, setWeather] = React.useState(null)
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  let geo = navigator.geolocation 


  // call to request data from weather api
  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=2f90953a8384cc18f9ea51fce298caa3`)
      setWeather(response.data)
      console.log(response.data)
    }
    getData()
  // reload when either lat or long change  
  },[lat, long])


// get current location of user.
  React.useEffect(() => {
    geo.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [lat, long, geo]);

  const handleRefresh = () => {
    window.location.reload();
  }


  return (
    <div className="main">
    <div className="date">
    <p>Date: {moment().format('LL')}</p>
    <p>Day: {moment().format('dddd')}</p>
    </div>
      { weather ? 
      <div className="weather">
      <h1>{weather.name}</h1>
      <img src={`http://openweathermap.org/img/wn/${weather.weather.map(item=>item.icon)}@2x.png`} alt=""/>
      <h2>{weather.weather.map(item => item.description)}</h2>
      <h3>Current Temp: {weather.main.temp}℃</h3>
      <h3>Max Temp: {weather.main.temp_max}℃</h3>
      <h3>Min Temp: {weather.main.temp_min}℃</h3>
      <button onClick={handleRefresh}/>
      </div>
      :
      <LinearProgress/>
    }
    </div>

  )
}

export default Main