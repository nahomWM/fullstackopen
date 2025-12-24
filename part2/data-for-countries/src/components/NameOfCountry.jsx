import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const NameOfCountry = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital && country.capital[0]) {
      weatherService
        .getWeather(country.capital[0])
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => {
          console.error("Error fetching weather:", error);
        });
    }
  }, [country]);

  return (
    <div>
      <p>{country.name.common}</p>
      <ul>
        <li>capital {country.capital[0]}</li>
        <li>area {country.area}</li>
      </ul>
      <p>languages:</p>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`the flag of ${country.name.common}`}
        width="200"
      />

      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>temperature {weather.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default NameOfCountry;
