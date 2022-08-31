import * as util from './utility.js';
import pets from '../pets.json' assert { type: "json" };

export default function activateCarousel() {
  const carousel = document.querySelector('.carousel');

  generateCardsContainer();
  const cardsContainer = document.querySelector('.carousel__cards-container');

  const petsCards = pets.map(pet => getPetCard(pet));

  util.shuffleArray(petsCards);

  appendCards(petsCards.slice(0, 3));

  // ==================================================
  const rightArrow = document.querySelector('.carousel__right-arrow');

  rightArrow.addEventListener('click', () => {
    const untouchedCards = petsCards.slice(3);

    util.shuffleArray(untouchedCards);

    appendCards(untouchedCards.slice(0, 3));
  })

  // Simply append cards to cardsContainer.


  // Generate a cards container with three random pets.
  // Create an array of pets without the pets in the cards container (length = 8 - 3 = 5) named remainingPets
  // Shuffle remainingPets array.
  // Create a new cards container with three random pets from remainingPets array.
  // Set the new cards container's position to absolute.
  // Attach the new cards container to the left or right side of the currently visible cards container
  // (depending on the arrow clicked).
  // Create animation to translate to the new cards container.
  // On animation end, change the current cards container's content to that of the new cards container.
  
  function appendCards(cards) {
    /**
     * Appends the cards from the given array
     * to the cards container.
     */
    cards.forEach(card => cardsContainer.appendChild(card));
  }

  function generateCardsContainer() {
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('carousel__cards-container');
    carousel.appendChild(cardsContainer);
  }

  function getCardsContainer(petsArray) {
    /**
     * Returns a container with the cards from the given array of pets.
     * 
     * @param  {array}  petsArray - Array of objects, each object contains data about a pet.
     * 
     * @return {object} cardsContainer - HTML div element that contains the cards of the pets from
     *                                   the given array.
     */
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('carousel__cards-container');

    petsArray.forEach(pet => {
      const petCard = getPetCard(pet);
      cardsContainer.appendChild(petCard);
    })

    return cardsContainer;
  }

  function getPetCard(pet) {
    /**
     * Returns the given pet's card.
     * 
     * @param  {object} pet - Object that contains the pet's data.
     * 
     * @return {object} card - The html element for the card of the given pet. 
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
