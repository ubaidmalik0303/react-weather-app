import React, { useState } from 'react';
import './App.css';

const api = {
  key: "c2030c381789a39aad2dab779571c197",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octuber", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const date = new Date();
  const cur_month = date.getMonth();
  const cur_day = date.getDay();
  const cur_year = date.getFullYear();
  const cur_date = date.getDate();

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then((result) => {
          setWeather(result)
          setQuery('')
        })
    }
  }

  return (
    <div className="container">
      <div className="main">
        <input type="text" className="search-bar" placeholder="Karachi, Lahore...." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={(e) => search(e)} />
        {typeof weather.main != "undefined" ? <>
          <div className="city-detail">
            <h1>{weather.name}, {weather.sys.country}</h1>
            <h2>{days[cur_day]} {cur_date} {months[cur_month]} {cur_year}</h2>
          </div>
          <div className="weather">
            <h1>{Math.round(weather.main.temp)}°c</h1>
          </div>
          <h1 className="clouds">{weather.weather[0].main}</h1>
        </> : <><h1 className="search-city-heading">Search Your City</h1></>}
      </div>
    </div>
  );
}

export default App;
