import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import ForeCast from "./components/forecast/ForeCast";
import { WEATHER_API_URL, WEATER_API_KEY } from "./api";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    // enlem ve boylam değerlerini manipule ettik
    const [lat, lon] = searchData.value.split(" ");

    // console.log(lat, lon);

    // güncel hava durumu
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATER_API_KEY}&units=metric`
    );
    // hava durumu tahmini
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        // gelen dataları state aktardık
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForeCast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  // console.log(forecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <ForeCast data={forecast} />}
    </div>
  );
}

export default App;
