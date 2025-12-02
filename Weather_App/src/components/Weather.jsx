import React, { useState, useEffect, useRef } from 'react'
import './Weather.css' 
import searchIcon from "../assets/search.png"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"



const Weather = () => {

  const inputRef= useRef()
  const [weatherData, setWeatherData]=useState(false);

  const search = async(city)=>{

    if (city === "") {
      alert("PLease enter city name:");
      return;
    }

    try {
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
        
      }

      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon
      })
    } catch (error) {
      setWeatherData(false);
      console.error("Error");
    }
  }

  useEffect(()=>{
    search("Athens");
  },[])

  return (
    <div className='container'>
        <div className='search'>
            <input ref={inputRef} type="text" placeholder='Search'/>
            <img src={searchIcon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
      <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}  alt="weather icon"  className='icons'/>
      <p className='temperature'>{weatherData.temperature}</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather_data'>
        <div className="col">
            <img src={humidity} alt="" />
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind} alt="" />
            <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;