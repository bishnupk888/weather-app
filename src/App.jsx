import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Forecast from './components/forecast/Forecast';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState, useEffect } from 'react';
import Background from './components/background/Background';
import HomeWeather from './components/home-weather/HomeWeather';
import Loader from './components/loader/Loader'; 

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true); 

  function getTimeOfDay() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return 'morning';
    } else if (hours >= 12 && hours < 17) {
      return 'afternoon';
    } else if (hours >= 17 && hours < 21) {
      return 'evening';
    } else {
      return 'night';
    }
  }

  const handleOnSearchChange = (searchData) => {
    setLoading(true); // Set loading to true when starting a new search

    const [latitude, longitude] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();

        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setLoading(false); 
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); 
      });
  };

  const timeOfDay = getTimeOfDay();
  const weatherNow = currentWeather?.weather[0]?.description;

  useEffect(() => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading && <Loader />} 
      <Background weatherCondition={weatherNow} timeOfDay={timeOfDay} setLoading={setLoading}>
        <div className='overlay'>
          <Search onSearchChange={handleOnSearchChange}/>
          {(!currentWeather && !forecast) && <HomeWeather />}
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {forecast && <Forecast data={forecast} />}
        </div> 
      </Background>
      
    </>
  );
}

export default App;
