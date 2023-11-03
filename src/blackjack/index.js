import {
  askCard,
  cardValue,
  computerTurn,
  createCard,
  createDeck,
} from "./usecases";
import _ from "underscore";
import Swal from "sweetalert2";

let deck = [];
const types = ["C", "D", "H", "S"],
  specials = ["A", "J", "Q", "K"];

let pointsPlayers = [];

//HTML Referencies
const btns = document.querySelectorAll(".btn");
const smalls = document.querySelectorAll("small");
const divCardsPlayers = document.querySelectorAll(".divCards");

//This function initialize the game
const initializeGame = (numPlayers = 2) => {
  deck = createDeck(types, specials);
  pointsPlayers = [];
  for (let i = 0; i < numPlayers; i++) {
    pointsPlayers.push(0);
  }

  btns[1].disabled = false;
  btns[2].disabled = false;

  smalls.forEach((element) => {
    element.innerHTML = "0";
  });

  divCardsPlayers.forEach((elem) => (elem.innerHTML = ""));
};

// Turn: 0 = first player and the last one will be the computer
const acumPoints = (card, turn) => {
  pointsPlayers[turn] += cardValue(card);
  smalls[turn].innerText = pointsPlayers[turn].toString();
  return pointsPlayers[turn];
};

// This function shows an output with a message to the user with the result based on points earned
const determineWinner = (pointsComputer) => {
  setTimeout(() => {
    Swal.fire({
      position: "center",
      icon:
        pointsComputer === pointsPlayers
          ? "warning"
          : pointsPlayers > 21
          ? "error"
          : pointsComputer > 21
          ? "success"
          : "error",
      title:
        pointsComputer === pointsPlayers
          ? "Draw"
          : pointsPlayers > 21
          ? "You Lost!"
          : pointsComputer > 21
          ? "You Win!"
          : "You Lost!",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 1000);
};

const disabledBtns = (state) => {
  btns[1].disabled = state;
  btns[2].disabled = state;
};

// Events
btns[0].addEventListener("click", () => {
  initializeGame();
});

btns[1].addEventListener("click", () => {
  const card = askCard(deck);
  const pointsPlayer = acumPoints(card, 0);
  createCard(card, 0, divCardsPlayers);

  if (pointsPlayer > 21) {
    disabledBtns(true);
    computerTurn(
      deck,
      acumPoints,
      pointsPlayers,
      determineWinner,
      askCard,
      createCard,
      divCardsPlayers
    );
  } else if (pointsPlayer === 21) {
    disabledBtns(true);
    computerTurn(
      deck,
      acumPoints,
      pointsPlayers,
      determineWinner,
      askCard,
      createCard,
      divCardsPlayers
    );
  }
});

btns[2].addEventListener("click", () => {
  disabledBtns(true);
  computerTurn(
    deck,
    acumPoints,
    pointsPlayers,
    determineWinner,
    askCard,
    createCard,
    divCardsPlayers
  );
});
