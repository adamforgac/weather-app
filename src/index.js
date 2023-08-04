/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-alert */
/* eslint-disable no-console */
import { format, addDays } from 'date-fns';
import showMenu from './modules/dom';

showMenu();

const place = 'Miami';

async function getData(location) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0d4d2e5c8434473ea8b82507232707&q=${location}&days=3&aqi=no`, { mode: 'cors' });
    const weatherData = await response.json();
    const currentDate = new Date();
    const currentTime = currentDate.getHours();
    const { icon } = weatherData.current.condition;
    console.log(weatherData);

    const weatherInfo = {
      allDays: {
        locationName: weatherData.location.name,
        regionName: weatherData.location.region,
        countryName: weatherData.location.country,
      },

      firstDay: {
        avgCelsius: weatherData.current.avgtemp_c,
        avgFahrenheit: weatherData.current.avgtemp_f,
        date: weatherData.current.date,
        weatherText: weatherData.current.condition.text,
        allHours: weatherData.forecast.forecastday[0].hour,
      },

      secondDay: {
        avgCelsius: weatherData.forecast.forecastday[1].day.avgtemp_c,
        avgFahrenheit: weatherData.forecast.forecastday[1].day.avgtemp_f,
        date: weatherData.forecast.forecastday[1].date,
        weatherText: weatherData.forecast.forecastday[1].day.condition.text,
        allHours: weatherData.forecast.forecastday[1].hour,
      },

      thirdDay: {
        avgCelsius: weatherData.forecast.forecastday[2].day.avgtemp_c,
        avgFahrenheit: weatherData.forecast.forecastday[2].day.avgtemp_f,
        date: weatherData.forecast.forecastday[2].date,
        weatherText: weatherData.forecast.forecastday[2].day.condition.text,
        allHours: weatherData.forecast.forecastday[2].hour,
      },
    };

    getInfo();

    function getInfo() {
      // GETS ALL 3 DAYS

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const dayAfterTomorrow = new Date(today);
      dayAfterTomorrow.setDate(today.getDate() + 2);

      const dayNameToday = daysOfWeek[today.getDay()];
      const dayNameTomorrow = daysOfWeek[tomorrow.getDay()];
      const dayNameDayAfterTomorrow = daysOfWeek[dayAfterTomorrow.getDay()];

      // GETS ALL 3 DATES

      const formattedToday = format(today, 'd. M.');

      const dayAfter = addDays(today, 1);
      const formattedDayAfter = format(dayAfter, 'd. M.');

      const anotherDayAfter = addDays(today, 2);
      const formattedAnotherDayAfter = format(anotherDayAfter, 'd. M.');

      // GETS THE RIGHT ICON

      const conditionTexts = [
        'Clear',
        'Sunny',
        'Partly Cloudy',
        'Cloudy',
        'Overcast',
        'Mist',
        'Fog',
        'Haze',
        'Smoke',
        'Dust',
        'Light Rain',
        'Moderate Rain',
        'Heavy Rain',
        'Light Snow',
        'Moderate Snow',
        'Heavy Snow',
        'Light Sleet',
        'Moderate Sleet',
        'Heavy Sleet',
        'Light Rain Showers',
        'Moderate Rain Showers',
        'Heavy Rain Showers',
        'Light Snow Showers',
        'Moderate Snow Showers',
        'Heavy Snow Showers',
        'Light Sleet Showers',
        'Moderate Sleet Showers',
        'Heavy Sleet Showers',
        'Thunderstorms',
        'Thunder Showers',
        'Freezing Rain',
        'Freezing Drizzle',
        'Freezing Fog',
        'Tornado',
        'Tropical Storm',
        'Hurricane',
      ];
    }
  } catch (error) {
    alert('Error fetching weather data:', error);
  }
}

getData(place);
