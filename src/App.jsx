import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import WeatherContainer from './components/WeatherContainer'

const weatherBackground = {
  "brokenClouds": "brokenClouds",
  "clearSky": "clearSky",
  "fewClouds": "fewClouds",
  "overcastClouds": "overcastClouds",
  "scatteredClouds": "scatteredClouds",
  "rain": "rain",
  "showerRain": "showerRain",
  "lightRain": "lightRain",
  "snow": "snow",
  "mist": "mist",
  "windy": "windy",
  "thunderStorm": "thunderStorm",
}

function App() {

  const [weather, setWeather] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(false);

  const saveDarkModeToLocalStorage = (isDarkMode) => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  };


  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveDarkModeToLocalStorage(newDarkMode);
  };

  const success = (pos) => {
    const lat = pos.coords.latitude
    const long = pos.coords.longitude
    const API_KEY = "854242af7bfad6cf312ea537f1156536"

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
      .then(({ data }) => setWeather(data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    if (storedDarkMode !== null) {
      setIsDarkMode(storedDarkMode);
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  const backgroundClass = weather ? weather.weather[0].description.split(' ').map((word, index) =>
    index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('') : '';

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <main className={`app font-["Lato"] flex justify-center items-center min-h-screen px-2 
      ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} 
      ${weatherBackground[backgroundClass]}`}>
        <label className="switch absolute top-4">
          <input
            type="checkbox"
            onChange={toggleDarkMode}
            checked={isDarkMode}
            className="sr-only"
          />
          <span className="slider"></span>
        </label>
        {weather === null ? <div className='loader sm:flex sm:justify-center sm:items-center'></div> :
          <WeatherContainer weather={weather} isDarkMode={isDarkMode} />
        }
      </main>
      {isDarkMode && <div className="dark-overlay"></div>}
    </div>
  );
}

export default App
