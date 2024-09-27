import * as util from './utility.js';
import pets from '../pets.json' with { type: "json" };

export default function activateCarousel() {
  const slidesContainer = document.querySelector('.carousel__slides-container');
  const leftSlide = slidesContainer.querySelector('.carousel__slide-left');
  const centerSlide = slidesContainer.querySelector('.carousel__slide-center');
  const rightSlide = slidesContainer.querySelector('.carousel__slide-right');
  const petsCards = pets.map(pet => getPetCard(pet));

  util.shuffleArray(petsCards);

  centerSlide.append(...petsCards.slice(0, 3));

  // ==================================================
  const leftArrow = document.querySelector('.carousel__left-arrow');
  const rightArrow = document.querySelector('.carousel__right-arrow');

  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  // ==================================================
  slidesContainer.addEventListener('animationend', animationEvent => {
    if (animationEvent.animationName === 'move-left') {
      slidesContainer.classList.remove('transition-left');
      removeChildren(centerSlide);
      centerSlide.append(...leftSlide.children);
    }
    else if (animationEvent.animationName === 'move-right') {
      slidesContainer.classList.remove('transition-right');
      removeChildren(centerSlide);
      centerSlide.append(...rightSlide.children);
    }
    else {
      throw new Error(`Unexpected animation name: ${animationEvent.animationName}.
      Expected 'move-left' or 'move-right'`);
    }

    leftArrow.addEventListener('click', moveLeft);
    rightArrow.addEventListener('click', moveRight);
  })

  // ==================================================
  function removeChildren(node) {
    [...node.children].forEach(child => {
      node.removeChild(child);
    });
  }

  function moveLeft() {
    const shownCards = [...centerSlide.children];
    const remainingCards = petsCards.filter(card => !shownCards.includes(card));

    util.shuffleArray(remainingCards);
    leftSlide.append(...remainingCards.slice(0, 3));

    slidesContainer.classList.add('transition-left');

    leftArrow.removeEventListener('click', moveLeft);
    rightArrow.removeEventListener('click', moveRight);
  }

  function moveRight() {
    const shownCards = [...centerSlide.children];
    const remainingCards = petsCards.filter(card => !shownCards.includes(card));

    util.shuffleArray(remainingCards);
    rightSlide.append(...remainingCards.slice(0, 3));

    slidesContainer.classList.add('transition-right');

    leftArrow.removeEventListener('click', moveLeft);
    rightArrow.removeEventListener('click', moveRight);
  }

  function getPetCard(pet) {
    /**
     * Returns the given pet's card.
     * 
     * @param  {object} pet - Object that contains the pet's data.
     * 
     * @return {node}   card - The node for the card of the given pet. 
     */
    const card = document.createElement('div');
    card.classList.add('carousel__card', 'card');

    card.innerHTML = `
      <div class="card__image-box">
        <img src="${pet.img}" alt="a pet">
      </div>
      <div class="card__title">
        ${pet.name}
      </div>
      <button class="card__button">
        Learn more
      </button>
    `;

    return card;
  }
}
