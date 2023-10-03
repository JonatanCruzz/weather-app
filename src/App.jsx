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
  const [countryName, setCountryName] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_KEY = "854242af7bfad6cf312ea537f1156536";

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=${API_KEY}`);
      setWeather(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setCountryName('');

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
      <main className={`app font-["Lato"] flex flex-col justify-center items-center min-h-screen px-2 
        ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} 
        ${weatherBackground[backgroundClass]}`}>
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleDarkMode}
            checked={isDarkMode}
            className="sr-only"
          />
          <span className="slider"></span>
        </label>
        <div className="mt-4 mb-4">
          <div className={`search-form-container p-4 ${isDarkMode ? 'dark' : ''}`}>
            <form className="search-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ingrese el nombre del país"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                className={`p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300 
                ${isDarkMode ? 'bg-[#29292b75] text-white' : 'bg-white text-black'}`}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg ml-2 
                ${isDarkMode
                    ? 'bg-[#0058aad2] text-white hover:bg-[#0057aa]'
                    : 'bg-[#ffffff] text-[#0057aa] hover:bg-[#ffffff46]'
                  } ${isDarkMode ? 'dark' : ''}`}
              >
                Buscar Clima
              </button>
            </form>
          </div>
        </div>
        {weather === null ? (
          <div className='loader sm:flex sm:justify-center sm:items-center'></div>
        ) : (
          <WeatherContainer weather={weather} isDarkMode={isDarkMode} />
        )}
      </main>
      {isDarkMode && <div className="dark-overlay"></div>}
    </div>
  );
}

export default App
