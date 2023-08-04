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
}

export default showMenu;
