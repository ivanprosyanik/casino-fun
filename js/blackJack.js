const coloda = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const btnGetCard = document.getElementById('get-card');
const btnStop = document.getElementById('stop');
const btnNewGame = document.getElementById('new-game');
const restartGame = document.getElementById('restart');
const moneyOutput = document.querySelector('.header__money');

const betInput = document.getElementById('input-bet');
const cash = document.getElementById('your-cash');

const resultPlayer = document.getElementById('result-player');
const resultPc = document.getElementById('result-pc');
const resultGame = document.getElementById('result-game');

import { localStorageMoney, stickyHeader } from "./index.js";
stickyHeader();
localStorageMoney(moneyOutput);


let money = parseInt(localStorage.getItem('money'));
cash.textContent = money;

// let money = 100;
let bet = 0;
let playerCard = 0;
let computerNumber = 0;


betInput.min = 1;
betInput.max = money;

// console.log(typeof betInput.value);

function getCard() {
  let card = coloda[Math.floor(Math.random() * coloda.length)];
  return card
}

function player() {
  if (bet === 0) {
    bet += 1
    money -= betInput.value;
    localStorage.setItem('money', money);
    moneyOutput.textContent = money;
    cash.textContent = money;
  }
  playerCard += getCard()
  // console.log(`Your card: ${playerCard}`);
  resultPlayer.textContent = `${playerCard}`;
  playLose(playerCard);
}

function playLose(number) {
  if (number > 21) {
    // console.log('You lose');
    resultGame.classList.add('active');
    resultGame.textContent = 'You lose';
    btnGetCard.disabled = true;
    btnStop.disabled = true;

    if (money == 0) {
      restartGame.classList.add('active');
      restartGame.scrollIntoView({ behavior: 'smooth' });
      btnNewGame.disabled = true;
    }
  }
};

function computer() {
  while (computerNumber <= 17) {
    computerNumber += getCard();
    resultPc.textContent = `${computerNumber}`;
  }
  checkCards()
}

function checkCards() {
  if (computerNumber > playerCard && computerNumber <= 21) {
    // console.log('You lose');
    resultGame.classList.add('active')
    resultGame.textContent = 'You lose';
    if (money <= 0) {
      restartGame.classList.add('active');
      btnNewGame.disabled = true;
    };
  } else if (computerNumber == playerCard && computerNumber <= 21) {
    console.log('This is draw!');
    resultGame.classList.add('active');
    resultGame.textContent = 'Draw';
    money += parseInt(betInput.value);
    localStorage.setItem('money', money);
    moneyOutput.textContent = money;
    cash.textContent = money;
  } else if (playerCard > computerNumber && playerCard <= 21 || computerNumber > 21) {
    console.log('You win');
    resultGame.classList.add('active')
    resultGame.textContent = 'You Win';
    let winMoney = betInput.value * 2;
    money += winMoney; 
    localStorage.setItem('money', money);
    moneyOutput.textContent = money;
    cash.textContent = money;
  }
  btnGetCard.disabled = true;
  btnStop.disabled = true;
}

function newGame() {
  if (money != 0) {
    playerCard = 0;
    computerNumber = 0;
    btnGetCard.disabled = false;
    btnStop.disabled = false;
    console.clear();
    bet = 0;
    cash.textContent = money;

    resultGame.classList.remove('active');
    resultPlayer.textContent = '';
    resultPc.textContent = '';
  } else {
    window.location.reload()
  }
}

btnGetCard.addEventListener('click', () => {
  if (betInput.value < 0 && bet == 0) {
    alert('Please enter a valid number!');
    betInput.value = 1;
  } else if (betInput.value > money && bet == 0) {
    alert(`You don't have enough money!`)
  } else {
    player();
  }
});

btnStop.addEventListener('click', () => {
  if (playerCard === 0) {
    if (betInput.value <= money) {
      money -= betInput.value;
      cash.textContent = money;
    } else {
      alert('У вас недостаточно денег! 2')
      newGame()
    }
  } else {
    computer();
  }
});

btnNewGame.addEventListener('click', () => {
  localStorageMoney(moneyOutput);
  newGame();
});

restartGame.addEventListener('click', () => {
  window.location.reload()
});