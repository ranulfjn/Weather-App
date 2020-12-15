import React, { useState } from "react";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {

 
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(0, 21);
    return date;
  };


  const wind=(s)=>{

    let direction;
    if(s>348.75 && s<11.25)
    {
      direction="N"
    }else if(s>11.25 && s<33.75){
      direction="NNE"
    }else if(s>33.7525 && s<56.25){
      direction="NE"
    }else if(s>56.25 && s<78.75){
      direction="ENE"
    }else if(s>78.75 && s<101.25){
      direction="E"
    }else if(s>101.25 && s<123.75){
      direction="ESE"
    }else if(s>123.75 && s<146.25){
      direction="SE"
    }else if(s>146.25 && s<168.75){
      direction="SSE"
    }else if(s>168.75 && s<191.25){
      direction="S"
    }else if(s>191.25 && s<213.75){
      direction="SSW"
    }else if(s>213.75 && s<236.25){
      direction="SW"
    }else if(s>236.25 && s<258.75){
      direction="WSW"
    }else if(s>258.75 && s<281.25){
      direction="W"
    }else if(s>281.25 && s<303.75){
      direction="WNW"
    }else if(s>303.75 && s<326.25){
      direction="NW"
    }else if(s>326.25 && s<348.75){
      direction="NNW"
    }
    return direction;
  }

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    <div>
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date"> {dateBuild(new Date())}</div>
            </div>
            <div className="weather-container">
              <div className="temperature">
                
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="temperature-min_max">
                Max {Math.round(weather.main.temp_max)}°C  Min {Math.round(weather.main.temp_min) }°C
              </div>
              <div className="image">
               <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt=''></img>
              </div> 
              <div className="temperature-feels">
                Feels Like {Math.round(weather.main.feels_like)}°C
              </div>
              <div  className="weather">Humidity {weather.main.humidity}</div>
              <div className="wind">Wind {weather.wind.speed}m/s { wind(weather.wind.deg)}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;