const myModule = (() => {
  "use strict";
  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["A", "J", "Q", "K"];

  let pointsPlayers = [];
  let pointsComputer = 0;

  //HTML Referencies
  const btns = document.querySelectorAll(".btn");
  const smalls = document.querySelectorAll("small");
  const divCardsPlayers = document.querySelectorAll(".divCards");

  //This function initialize the game
  const initializeGame = (numPlayers = 2) => {
    deck = createDeck();
    pointsPlayers = [];
    pointsComputer = 0;
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

  // This function create a new deck
  const createDeck = () => {
    deck = [];

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

  // This function allows me to ask a card
  const askCard = () => {
    if (deck.length === 0) {
      throw "There's no cards in the deck";
    }

    return deck.pop();
  };

  // This function serves to obtain the value from the card
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return isNaN(value) ? (value === "A" ? 11 : 10) : parseInt(value);
  };

  // Turn: 0 = first player and the last one will be the computer
  const acumPoints = (card, turn) => {
    pointsPlayers[turn] += cardValue(card);
    smalls[turn].innerText = pointsPlayers[turn].toString();
    return pointsPlayers[turn];
  };

  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("carta");
    divCardsPlayers[turn].append(imgCard);
  };

  // This function shows an output with a message to the user with the result based on points earned
  const determineWinner = () => {
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

  // Turn for the computer
  const computerTurn = () => {
    do {
      const card = askCard();
      pointsComputer = acumPoints(card, pointsPlayers.length - 1);
      createCard(card, pointsPlayers.length - 1);

      if (pointsPlayers[pointsPlayers.length - 2] > 21) {
        break;
      }
    } while (
      pointsComputer <= pointsPlayers[pointsPlayers.length - 2] &&
      pointsPlayers[pointsPlayers.length - 2] <= 21
    );

    determineWinner();
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
    const card = askCard();
    const pointsPlayer = acumPoints(card, 0);
    createCard(card, 0);

    if (pointsPlayer > 21) {
      disabledBtns(true);
      computerTurn();
    } else if (pointsPlayer === 21) {
      disabledBtns(true);
      computerTurn();
    }
  });

  btns[2].addEventListener("click", () => {
    disabledBtns(true);
    computerTurn();
  });

  return {
    newGame: initializeGame,
  };
})();
