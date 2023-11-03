/**
 * This function creates a card
 * @param {String} card
 * @param {Number} turn
 * @param {Element} divCardsPlayers
 */
export const createCard = (card, turn, divCardsPlayers) => {
  const imgCard = document.createElement("img");
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.classList.add("carta");
  divCardsPlayers[turn].append(imgCard);
};
