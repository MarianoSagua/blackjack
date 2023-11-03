/**
 * This function activates the computer turn
 * @param {Array<String>} deck
 * @param {Array<Number>} acumPoints
 * @param {Array<Number>} pointsPlayers
 * @param {Function} determineWinner
 * @param {Function} askCard
 * @param {Function} createCard
 * @param {Element} divCardsPlayers
 */

export const computerTurn = (
  deck,
  acumPoints,
  pointsPlayers,
  determineWinner,
  askCard,
  createCard,
  divCardsPlayers
) => {
  let pointsComputer = 0;

  do {
    const card = askCard(deck);
    pointsComputer = acumPoints(card, pointsPlayers.length - 1);
    createCard(card, pointsPlayers.length - 1, divCardsPlayers);

    if (pointsPlayers[pointsPlayers.length - 2] > 21) {
      break;
    }
  } while (
    pointsComputer <= pointsPlayers[pointsPlayers.length - 2] &&
    pointsPlayers[pointsPlayers.length - 2] <= 21
  );

  determineWinner(pointsComputer);
};
