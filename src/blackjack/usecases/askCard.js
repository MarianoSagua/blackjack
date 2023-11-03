/**
 * This function allows me to ask a card
 * @param {Array<String>} deck
 * @returns {String}
 */
export const askCard = (deck) => {
  if (!deck || deck.length === 0) {
    throw "There's no cards in the deck";
  }

  return deck.pop();
};
