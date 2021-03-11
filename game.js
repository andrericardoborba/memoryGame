const cards = document.querySelectorAll(".card");
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let pairs = 0;

startGame();

function restart() {
  let gameOver = document.querySelector("#gameOver");
  gameOver.style.display = "none";
  cards.forEach((card) => {
    card.classList.remove("flip");
  });
  lockBoard = false;
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
  pairs = 0;
  startGame();
}

function startGame() {
  shuffle();
  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
  }

  function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
      disableCards();
      pairs++;
      if (pairs === 6) {
        let gameOver = document.querySelector("#gameOver");
        gameOver.style.display = "flex";
      }
      return;
    }
    unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      resetBoard();
    }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  function shuffle() {
    cards.forEach((card) => {
      let randomPosition = Math.floor(Math.random() * 12);
      card.style.order = randomPosition;
    });
  }

  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
  });
}
