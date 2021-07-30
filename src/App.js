import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=London&aqi=no`
      )
      .then((data) => {
        setWeather(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // Event
  const weatherInput = (e) => {
    setInput(e.target.value);
  };
  const searchWeather = () => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=c3f0e84453534dc881b154422212807&q=${input}`
      )
      .then((data) => {
        setWeather(data.data);
      });
  };
  return (
    <div>
      {weather && (
        <div>
          <div className="search">
            <input onChange={weatherInput} type="text" />
            <button onClick={searchWeather}>Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.name}</h1>
            <h2>{weather.location.region}</h2>
            <div className="condition">
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt="" />
              <h3>{weather.current.temp_c} Celsius</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
