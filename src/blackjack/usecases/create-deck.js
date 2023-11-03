import _ from "underscore";

/**
 * This function create a new deck
 * @param {Array<String>} types
 * @param {Array<String>} specials
 * @returns {Array<String>} 
 */
export const createDeck = (types, specials) => {
  if (!types || types.length === 0)
    throw new Error("types is required as an array!");
  if (!specials || specials.length === 0)
    throw new Error("specials is Required as an array!");

  let deck = [];

  for (let i = 2; i < 10; i++) {
    for (const type of types) {
      deck.push(i + type);
    }
  }

  for (const type of types) {
    for (const special of specials) {
      deck.push(special + type);
    }
  }

  return _.shuffle(deck);
};
