import WeatherStats from "./WeatherStats"
import { useState, useEffect } from "react"

const weatherIcons = {
    "clear sky": "/icons/01d.png",
    "few clouds": "/icons/02d.png",
    "scattered clouds": "/icons/03d.png",
    "overcast clouds": "/icons/04d.png",
    "broken clouds": "/icons/04d.png",
    "windy": "/icons/05d.png",
    "shower rain": "/icons/09d.png",
    "rain": "/icons/10d.png",
    "moderate rain": "/icons/10d.png",
    "light rain": "/icons/10d.png",
    "thunderstorm": "/icons/11d.png",
    "snow": "/icons/13d.png",
    "mist": "/icons/50d.png",
}

const WeatherContainer = ({ weather, isDarkMode }) => {

    const [isCelsius, setIsCelsius] = useState(true)

    const saveUnitPreferenceToLocalStorage = (isCelsius) => {
        localStorage.setItem("unitPreference", JSON.stringify(isCelsius));
    };

    const changeUnitTemp = (temp) => {
        if (isCelsius) {
            //celcius
            return (temp - 273.15).toFixed(1) + "°C"
        } else {
            //fahrenheit
            return (((temp - 273.15) * 9 / 5) + 32).toFixed(1) + "°F"
        }
    }

    const handleChangeUnit = () => {
        const newUnitPreference = !isCelsius;
        setIsCelsius(newUnitPreference);
        saveUnitPreferenceToLocalStorage(newUnitPreference);
    };

    useEffect(() => {
        const storedUnitPreference = JSON.parse(localStorage.getItem("unitPreference"));
        if (storedUnitPreference !== null) {
            setIsCelsius(storedUnitPreference);
        }
    }, []);

    const containerClass = isDarkMode ? "bg-[#29292b75] text-white" : "bg-[#dcdfe575] text-black";
    const buttonClassDarkMode = isDarkMode ? "bg-[#0058aad2] text-white hover:bg-[#0057aa]" : "bg-[#ffffff] text-[#0057aa] hover:bg-[#ffffff46]";
    const windIcon = isDarkMode ? "/wind.png" : "/windBlack.png";
    const humidityIcon = isDarkMode ? "/humidity.png" : "/humidityBlack.png";
    const pressureIcon = isDarkMode ? "/pressure.png" : "/pressureBlack.png";

    return (
        <section className="text-center gap-5 grid">

            <h3 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h3>

            <div className="gap-5 grid sm:grid-cols-[1fr_auto]">
                {/* seccion superior */}
                <article className={`rounded-2xl grid grid-cols-2 items-center p-3 gap-4 ${containerClass}`}>
                    <h4 className="col-span-2 text-lg capitalize">{weather.weather[0].description}</h4>
                    <span className="text-5xl">{changeUnitTemp(weather.main.temp)}</span>
                    <div>
                        <img src={weatherIcons[weather.weather[0].description]} alt="" className="w-40 h-40" />
                    </div>
                </article>

                {/* seccion inferior */}
                <article className={`grid grid-cols-3 
                justify-items-center rounded-2xl p-2 
                py-3 sm:grid-cols-1 ${containerClass}`}>
                    <WeatherStats icon={windIcon} unit="m/s" value={weather.wind.speed} isDarkMode={isDarkMode} />
                    <WeatherStats icon={humidityIcon} unit="%" value={weather.main.humidity} isDarkMode={isDarkMode} />
                    <WeatherStats icon={pressureIcon} unit="hPa" value={weather.main.pressure} isDarkMode={isDarkMode} />
                </article>

                <div className="flex justify-center items-center">
                    <button onClick={handleChangeUnit}
                        className={`w-32 rounded-full py-1 shadow-xl ${buttonClassDarkMode}`}>
                        {isCelsius ? "Cambiar a °F" : "Cambiar a °C"}
                    </button>
                </div>

            </div>
        </section>
    )
}
export default WeatherContainer