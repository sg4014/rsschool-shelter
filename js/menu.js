'use strict';

export default function activateMenu() {
  const body = document.body;
  const burgerIcon = document.querySelector('.header__burger');
  const logo = document.querySelector('.header__logo');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('.overlay');

  /*--Open menu on burger click------------------------------------------------------------------*/
  burgerIcon.addEventListener('click', () => {
    burgerIcon.classList.toggle('header__burger_active');  // Rotate burger icon
    logo.classList.toggle('header__logo_hidden');          // Hide (show) header's logo
    menu.classList.toggle('menu_active');                  // Slide-in (slide-out) menu
    overlay.classList.toggle('overlay_active');            // Show (hide) overlay
    body.classList.toggle('scroll-locked');                // Prohibit (allow) scrolling
  });
  
  /*--Close menu on a click outside menu------------------------------------------------------------------*/
  document.addEventListener('click', event => {
    if (
      event.target != burgerIcon.firstElementChild &&
      event.target != menu
      ) {
      burgerIcon.classList.remove('header__burger_active'); // Rotate burger to default position
      logo.classList.remove('header__logo_hidden');         // Show header's logo
      menu.classList.remove('menu_active');                 // Slide-out menu
      overlay.classList.remove('overlay_active');           // Hide overlay
      body.classList.remove('scroll-locked');               // Allow scrolling
    }
  })
}


