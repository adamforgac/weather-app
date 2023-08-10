/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-alert */
/* eslint-disable no-console */

import {
  format, addDays, parse, getHours, compareAsc,
} from 'date-fns';
import { handleFahrenheit } from './dom';

function getAllData() {
  const place = 'Zlín';

  const confirmIcon = document.querySelector('.search-input img');
  const textInput = document.querySelector('.search-input input');
  const desktopCheckbox = document.querySelector('.top-banner-right input');

  function confirmInput() {
    const allCards = document.querySelector('.all-hour-cards');
    allCards.innerHTML = '';
    if (textInput.value === '') {
      alert('Please select location');
    } else {
      getData(textInput.value);
    }
  }

  textInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      confirmInput();
    }
  });

  confirmIcon.addEventListener('click', () => {
    confirmInput();
  });

  async function getData(location) {
    try {
      const wrapper = document.querySelector('.wrapper');
      const loader = document.querySelector(".loader");
      wrapper.classList.add('unscrollable');
      loader.style.display = "block";
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0d4d2e5c8434473ea8b82507232707&q=${location}&days=3&aqi=no`, { mode: 'cors' });
      const weatherData = await response.json();
      loader.style.display = "none";
      wrapper.classList.remove('unscrollable');
      createObject(weatherData);
    } catch (error) {
      alert(`Error fetching weather data: ${error}`);
    }
  }

  getData(place);

  function createObject(weatherData) {
    const weatherInfo = {
      allDays: {
        locationName: weatherData.location.name,
        regionName: weatherData.location.region,
        countryName: weatherData.location.country,
      },

      current: {
        feelsLike: weatherData.current.feelslike_c,
        visibility: weatherData.current.vis_km,
        pressure: weatherData.current.pressure_mb,
        wind: weatherData.current.wind_kph,
        lastUpdate: weatherData.current.last_updated,
        name: weatherData.location.name,
        country: weatherData.location.country,
      },

      firstDay: {
        avgCelsius: weatherData.forecast.forecastday[0].day.avgtemp_c,
        date: weatherData.current.date,
        weatherText: weatherData.forecast.forecastday[0].day.condition.text,
        allHours: weatherData.forecast.forecastday[0].hour,
        sunrise: weatherData.forecast.forecastday[0].astro.sunrise,
        sunset: weatherData.forecast.forecastday[0].astro.sunset,
      },

      secondDay: {
        allHours: weatherData.forecast.forecastday[1].hour,
        avgCelsius: weatherData.forecast.forecastday[1].day.avgtemp_c,
        date: weatherData.forecast.forecastday[1].date,
        weatherText: weatherData.forecast.forecastday[1].day.condition.text,
      },

      thirdDay: {
        avgCelsius: weatherData.forecast.forecastday[2].day.avgtemp_c,
        date: weatherData.forecast.forecastday[2].date,
        weatherText: weatherData.forecast.forecastday[2].day.condition.text,
      },
    };

    getSetup(weatherInfo);
    getThreeDays(weatherInfo);
    getOverview(weatherInfo);
    getHourly(weatherInfo);
    getAllLocations();
  }

  function getSetup(weatherData) {
    const placeInfo = document.querySelector('.current-location h2');
    const placeInfoPhone = document.querySelector('.settings-position p');
    const locationName = weatherData.current.name;

    placeInfo.textContent = `${locationName}`;
    placeInfoPhone.textContent = `${locationName}`;
  }

  function getThreeDays(weatherInfo) {
  // GETS DAYS

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    const dayNameOne = daysOfWeek[today.getDay()];
    const dayNameTwo = daysOfWeek[tomorrow.getDay()];
    const dayNameThree = daysOfWeek[dayAfterTomorrow.getDay()];

    // GETS DATES

    const formattedOne = format(today, 'd. M.');

    const dayAfter = addDays(today, 1);
    const formattedTwo = format(dayAfter, 'd. M.');

    const anotherDayAfter = addDays(today, 2);
    const formattedThree = format(anotherDayAfter, 'd. M.');

    // GETS TEXT

    const currentText = weatherInfo.firstDay.weatherText;
    const secondDayText = weatherInfo.secondDay.weatherText;
    const thirdDayText = weatherInfo.thirdDay.weatherText;

    const firstTextCustomized = currentText.toLowerCase();
    const secondTextCustomized = secondDayText.toLowerCase();
    const thirdTextCustomized = thirdDayText.toLowerCase();

    // GETS TEMPERATURES

    const currentTemperature = weatherInfo.firstDay.avgCelsius;
    const secondDayTemperature = weatherInfo.secondDay.avgCelsius;
    const thirdDayTemperature = weatherInfo.thirdDay.avgCelsius;

    const firstRounded = Math.round(currentTemperature);
    const secondRounded = Math.round(secondDayTemperature);
    const thirdRounded = Math.round(thirdDayTemperature);

    // MANIPULATES THE DOM

    const dayOneImagePlace = document.querySelector('.weather-image-day1');
    setDomIcon(dayOneImagePlace, firstTextCustomized, null, null);

    const dayTwoImagePlace = document.querySelector('.weather-image-day2');
    setDomIcon(dayTwoImagePlace, secondTextCustomized, null, null);

    const dayThreeImagePlace = document.querySelector('.weather-image-day3');
    setDomIcon(dayThreeImagePlace, thirdTextCustomized, null, null);

    const dayOneTemperature = document.querySelector('.weather-day1');
    setDomTemperature(dayOneTemperature, firstRounded);

    const dayTwoTemperature = document.querySelector('.weather-day2');
    setDomTemperature(dayTwoTemperature, secondRounded);

    const dayThreeTemperature = document.querySelector('.weather-day3');
    setDomTemperature(dayThreeTemperature, thirdRounded);

    const dayOne = document.querySelector('.date-day1');
    setDomDay(dayOne, dayNameOne);

    const dayTwo = document.querySelector('.date-day2');
    setDomDay(dayTwo, dayNameTwo);

    const dayThree = document.querySelector('.date-day3');
    setDomDay(dayThree, dayNameThree);

    const dateOne = document.querySelector('.data-date1');
    setDomDate(dateOne, formattedOne);

    const dateTwo = document.querySelector('.data-date2');
    setDomDate(dateTwo, formattedTwo);

    const dateThree = document.querySelector('.data-date3');
    setDomDate(dateThree, formattedThree);
  }

  function getHourly(weatherData) {
    const { sunset } = weatherData.firstDay;
    const { sunrise } = weatherData.firstDay;

    // object with first day hours
    const { allHours } = weatherData.firstDay;

    // object with second day hours
    const allHoursSecond = weatherData.secondDay.allHours;

    // last location update
    const { lastUpdate } = weatherData.current;
    const lastUpdateSeparated = lastUpdate.split(' ');

    // last update time
    const parsedTime = parse(lastUpdateSeparated[1], 'HH:mm', new Date());

    // last update hour
    const currentHour = getHours(parsedTime);

    // hour section
    const hourSection = document.querySelector('.all-hour-cards');

    // generates the dom cards
    for (let i = 0; i < 24; i++) {
      const hourCardDiv = document.createElement('div');
      hourCardDiv.className = 'hour-card';

      const timeDiv = document.createElement('div');
      timeDiv.className = 'hour-card-time';
      const timeParagraph = document.createElement('p');
      timeDiv.appendChild(timeParagraph);

      const iconDiv = document.createElement('div');
      iconDiv.className = 'hour-card-icon';
      const iconImage = document.createElement('img');
      iconImage.src = '';
      iconImage.alt = '';
      iconDiv.appendChild(iconImage);

      const temperatureDiv = document.createElement('div');
      temperatureDiv.className = 'hour-card-temperature';
      const temperatureParagraph = document.createElement('p');
      temperatureDiv.appendChild(temperatureParagraph);
      temperatureDiv.querySelector('p').classList.add('celsius');

      hourCardDiv.appendChild(timeDiv);
      hourCardDiv.appendChild(iconDiv);
      hourCardDiv.appendChild(temperatureDiv);

      hourSection.appendChild(hourCardDiv);
    }

    const remainingHoursToday = 24 - currentHour;
    const remainingHoursTomorrow = 24 - remainingHoursToday;

    // all hour cards
    const allHourCards = document.querySelectorAll('.hour-card');

    // all hours that remain today
    const allTodayHours = [];

    // all hours that remain tomorrow
    const allTomorrowHours = [];

    // all hour cards available tomorrow
    const availableHourCardsTomorrow = [];

    // takes all available hours for tomorrow
    for (let i = 0; i <= remainingHoursTomorrow; i++) {
      allTomorrowHours.push(i);
    }

    // takes all available cards for tomorrow
    for (let i = remainingHoursToday; i < allHourCards.length; i++) {
      availableHourCardsTomorrow.push(allHourCards[i]);
    }

    for (let i = currentHour; i <= 24; i++) {
      allTodayHours.push(i);
    }

    for (let i = 0; i < remainingHoursToday; i++) {
    // card time part
      const currentCardTime = allHourCards[i].querySelector('.hour-card-time p');
      // all times that remain for today
      const arrayTimePosition = allHours[allTodayHours[i]].time;
      const dataParts = arrayTimePosition.split(' ');
      currentCardTime.textContent = dataParts[1];

      const differentFormat = parse(dataParts[1], 'HH:mm', new Date());
      const differentFormatFinal = format(differentFormat, 'hh:mm a');

      const currentIconText = allHours[allTodayHours[i]].condition.text;
      const currentCardIcon = allHourCards[i].querySelector('.hour-card-icon img');
      setDomIcon(currentCardIcon, currentIconText, sunset, sunrise, differentFormatFinal);

      // card temperature part
      const currentCardTemperature = allHourCards[i].querySelector('.hour-card-temperature p');
      // all temperatures that remain for today
      const arrayTemperaturePosition = allHours[allTodayHours[i]].temp_c;
      const roundedTemperature = Math.round(arrayTemperaturePosition);
      currentCardTemperature.textContent = `${roundedTemperature}°`;
    }

    for (let i = 0; i < availableHourCardsTomorrow.length; i++) {
      const currentCard = availableHourCardsTomorrow[i].querySelector('.hour-card-time p');
      const allDatas = allHoursSecond[i].time;
      const twoParts = allDatas.split(' ');
      currentCard.textContent = twoParts[1];

      const differentFormat = parse(twoParts[1], 'HH:mm', new Date());
      const differentFormatFinal = format(differentFormat, 'hh:mm a');

      const currentIconText = allHoursSecond[allTomorrowHours[i]].condition.text;
      const currentCardIcon = availableHourCardsTomorrow[i].querySelector('.hour-card-icon img');
      setDomIcon(currentCardIcon, currentIconText, sunset, sunrise, differentFormatFinal);

      const currendCardTemperature = availableHourCardsTomorrow[i].querySelector('.hour-card-temperature p');
      const temperature = allHoursSecond[i].temp_c;
      const roundedTemperature = Math.round(temperature);
      currendCardTemperature.textContent = `${roundedTemperature}°`;
    }
  }

  function getOverview(weatherData) {
    const { visibility } = weatherData.current;
    const { pressure } = weatherData.current;
    const { feelsLike } = weatherData.current;
    const { wind } = weatherData.current;

    setDomOverview(visibility, pressure, feelsLike, wind);
  }

  function setDomOverview(visibility, pressure, feelslike, wind) {
    const visibilityNum = document.querySelector('.visibility-num');
    const pressureNum = document.querySelector('.pressure-num');
    const feelsLikeNum = document.querySelector('.feels-like-num');
    const windSpeedNum = document.querySelector('.wind-speed-num');

    const roundCelsius = Math.round(feelslike);
    const roundSpeed = Math.round(wind);

    const visibilityString = visibility.toString();
    const pressureString = pressure.toString();
    const feelsLikeString = roundCelsius.toString();
    const windString = roundSpeed.toString();

    visibilityNum.textContent = `${visibilityString} km`;
    pressureNum.textContent = `${pressureString} hPa`;
    feelsLikeNum.textContent = `${feelsLikeString}°`;
    windSpeedNum.textContent = `${windString} km/h`;
  }

  function setDomIcon(domElement, weatherText, sunsetHour, sunriseHour, currentTime) {
    const image = getTheIcon(weatherText, sunsetHour, sunriseHour, currentTime);
    domElement.src = image;
  }

  function setDomTemperature(domElement, temperature) {
    const stringTemperature = temperature.toString();
    domElement.textContent = `${stringTemperature}°`;
  }

  function setDomDate(domElement, date) {
    domElement.textContent = date;
  }

  function setDomDay(domElement, day) {
    domElement.textContent = day;
  }

  function getTheIcon(text, sunsetHour, sunriseHour, currentTime) {
    const conditionTexts = [
    // 0-1
      'clear',
      'sunny',
      // 2
      'partly cloudy',
      // 3-4
      'cloudy',
      'overcast',
      // 5-10
      'mist',
      'fog',
      'haze',
      'smoke',
      'dust',
      'freezing fog',
      // 11-21
      'light rain',
      'light showers of ice pellets',
      'moderate rain',
      'moderate rain at times',
      'light rain showers',
      'light rain shower',
      'moderate rain showers',
      'patchy light rain with thunder',
      'patchy rain possible',
      'patchy light rain',
      'light freezing rain',
      // 22-31
      'heavy rain',
      'moderate or heavy showers of ice pellets',
      'torrential rain shower',
      'moderate or heavy rain shower',
      'heavy rain at times',
      'heavy rain showers',
      'freezing rain',
      'tropical storm',
      'moderate or heavy rain with thunder',
      'moderate or heavy freezing rain',
      // 32-49
      'light snow',
      'patchy light snow',
      'blowing snow',
      'patchy moderate snow',
      'patchy light drizzle',
      'patchy snow possible',
      'patchy sleet possible',
      'moderate snow',
      'light drizzle',
      'patchy light snow with thunder',
      'light sleet',
      'moderate sleet',
      'light snow showers',
      'moderate snow showers',
      'patchy freezing drizzle possible',
      'freezing drizzle',
      'light sleet showers',
      'moderate sleet showers',
      // 50-60
      'heavy snow',
      'moderate or heavy snow with thunder',
      'moderate or heavy snow showers',
      'heavy sleet',
      'ice pellets',
      'patchy heavy snow',
      'heavy snow showers',
      'heavy sleet showers',
      'moderate or heavy sleet',
      'blizzard',
      'heavy freezing drizzle',
      // 61-64
      'thunderstorms',
      'thunder showers',
      'thundery outbreaks possible',
      'hurricane',
      // 65
      'tornado',
    ];

    const weatherTextCustomized = text.toLowerCase();
    const weatherIndex = conditionTexts.indexOf(weatherTextCustomized);

    let folder = 'day';

    if (sunriseHour !== null && sunsetHour !== null) {
      const time1 = parse(currentTime, 'hh:mm a', new Date());
      const time2 = parse(sunriseHour, 'hh:mm a', new Date());
      const time3 = parse(sunsetHour, 'hh:mm a', new Date());
      const comparison = compareAsc(time1, time2);
      const comparison2 = compareAsc(time1, time3);
      if (comparison <= 0) {
        folder = 'night';
      }

      if (comparison2 >= 0) {
        folder = 'night';
      }
    }

    return collectImage(weatherIndex, folder);
  }

  function collectImage(weatherIndex, folder) {
    if (weatherIndex >= 0 && weatherIndex < 2) {
      return `images/${folder}/weather-icon-sunny.png`;
    } if (weatherIndex === 2) {
      return `images/${folder}/weather-icon-partlyCloudy.png`;
    } if (weatherIndex > 2 && weatherIndex < 5) {
      return `images/${folder}/weather-icon-cloudy.png`;
    } if (weatherIndex > 4 && weatherIndex < 11) {
      return `images/${folder}/weather-icon-foggy.png`;
    } if (weatherIndex > 10 && weatherIndex < 22) {
      return `images/${folder}/weather-icon-lightRain.png`;
    } if (weatherIndex > 21 && weatherIndex < 32) {
      return `images/${folder}/weather-icon-heavyRain.png`;
    } if (weatherIndex > 31 && weatherIndex < 50) {
      return `images/${folder}/weather-icon-snow.png`;
    } if (weatherIndex > 49 && weatherIndex < 61) {
      return `images/${folder}/weather-icon-snow.png`;
    } if (weatherIndex > 60 && weatherIndex < 65) {
      return `images/${folder}/weather-icon-storm.png`;
    } if (weatherIndex === 65) {
      return `images/${folder}/weather-icon-tornado.png`;
    }
    alert('There was an error with weather conditions');
  }

  async function getAllLocations() {
    const locations = ['New York', 'London', 'Paris', 'Tokyo', 'Honk Kong', 'Los Angeles'];
    const allDomElements = document.querySelectorAll('.city-card');

    const weatherDataPromises = locations.map((location) => {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=0d4d2e5c8434473ea8b82507232707&q=${location}&days=1`;
      return fetch(url)
        .then((response) => response.json())
        .catch((error) => {
          alert(`Error fetching weather data for ${location}:`, error);
          return null;
        });
    });

    Promise.all(weatherDataPromises)
      .then((weatherDataArray) => {
        for (let i = 0; i < weatherDataArray.length; i++) {
          const cardText = allDomElements[i].querySelector('.other-cities-weather-text');
          const iconText = weatherDataArray[i].current.condition.text;
          cardText.textContent = iconText;

          const cardTemperature = allDomElements[i].querySelector('.other-cities-temperature');
          const roundedTemp = Math.round(weatherDataArray[i].current.temp_c);
          cardTemperature.textContent = `${roundedTemp}°`;

          const cardIcon = allDomElements[i].querySelector('img');
          const { sunrise } = weatherDataArray[i].forecast.forecastday[0].astro;
          const { sunset } = weatherDataArray[i].forecast.forecastday[0].astro;
          const lastUpdate = weatherDataArray[i].current.last_updated;
          const updateParts = lastUpdate.split(' ');
          const updateFormat = parse(updateParts[1], 'HH:mm', new Date());
          const differentFormat = format(updateFormat, 'hh:mm a');
          setDomIcon(cardIcon, iconText, sunset, sunrise, differentFormat);
        }
        desktopCheckbox.checked ? handleFahrenheit() : null;
      })
      .catch((error) => {
        alert('Error:', error);
      });
  }
}

export default getAllData;
