/* eslint-disable func-names */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */
function showMenu() {
  const menuButton = document.querySelector('.settings');
  const settingsBanner = document.querySelector('.settings-banner');
  const xIcon = document.querySelector('.fa-xmark');
  const wrapper = document.querySelector('.wrapper');

  menuButton.addEventListener('click', () => {
    settingsBanner.classList.add('visible-banner');
    wrapper.classList.add('unscrollable');
    menuButton.style.transform = 'rotate(160deg)';
  });

  xIcon.addEventListener('click', () => {
    settingsBanner.classList.remove('visible-banner');
    wrapper.classList.remove('unscrollable');
    menuButton.style.transform = 'rotate(0deg)';
  });

  const desktopCheckbox = document.querySelector('.top-banner-right input');
  const mobileCheckbox = document.querySelector('.settings-switch input');

  desktopCheckbox.addEventListener('change', function () {
    mobileCheckbox.checked = this.checked;
    desktopCheckbox.checked ? handleFahrenheit() : handleCelsius();
  });

  mobileCheckbox.addEventListener('change', function () {
    desktopCheckbox.checked = this.checked;
    mobileCheckbox.checked ? handleFahrenheit() : handleCelsius();
  });
}

function handleFahrenheit() {
  const allTemperatures = document.querySelectorAll('.celsius');
  for (let i = 0; i < allTemperatures.length; i++) {
    const temperatureText = allTemperatures[i].textContent;
    const temperatureTextOnly = temperatureText.split('°');
    const temperatureNum = Number(temperatureTextOnly[0]);
    const fahrenheit = Math.round((temperatureNum * 9 / 5) + 32);
    const fahrenheitString = fahrenheit.toString();
    allTemperatures[i].textContent = `${fahrenheitString}°`;
  }
}

function handleCelsius() {
  const allTemperatures = document.querySelectorAll('.celsius');
  for (let i = 0; i < allTemperatures.length; i++) {
    const temperatureText = allTemperatures[i].textContent;
    const temperatureTextOnly = temperatureText.split('°');
    const temperatureNum = Number(temperatureTextOnly[0]);
    const celsius = Math.round((temperatureNum - 32) * 5 / 9);
    const celsiusString = celsius.toString();
    allTemperatures[i].textContent = `${celsiusString}°`;
  }
}

export default showMenu;
export { handleFahrenheit };
export { handleCelsius };
