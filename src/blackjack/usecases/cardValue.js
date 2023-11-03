/**
 * This function is used to obtain a value of the card
 * @param {any} card
 * @returns {Number}
 */
export const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);
  return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
};
