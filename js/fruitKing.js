'use strict'

const body = document.querySelector('.body');
const modalFree = document.getElementById('modalFree');
const modalWin = document.getElementById('modalWin');
const countFree = document.getElementById('countFree');
const lostFreeSpin = document.getElementById('lostFreeSpin');
const winInFree = document.getElementById('winInFree');
const gamePriceShow = document.getElementById('gamePriceShow');
const gamePrice = document.querySelector('.signs__list');
const lostFreeSpinDiv = document.querySelector('.lost-free-spin');
const modalFreeClose = document.querySelector('.modal-free__close');
const modalWinClose = document.querySelector('.modal-win__close');
const matrixContainer = document.getElementById('numbers');
let divMatrixHTML = '';
const btnStart = document.getElementById('btnStart');
btnStart.disabled = false;
const gameMoney = document.querySelector('.game__money');
const setBet = document.getElementById('setBet');
let signs = ['✅', '💎', '🍒', '🍋', '🍌', '🍓', '🍉', '👑'];
const moneyOutput = document.querySelector('.header__money');

import { localStorageMoney, stickyHeader } from "./index.js";
localStorageMoney(moneyOutput);
stickyHeader();
let money = parseInt(localStorage.getItem('money'));

let bet;
let betElem = document.createElement('div');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

gamePriceShow.addEventListener('click', () => {
  gamePrice.classList.toggle('active');
});

setBet.addEventListener('input', () => {
  bet = Number(setBet.value);

});
moneyOutput.textContent = money;
gameMoney.textContent = money;

let slots =
  [
    ['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0'],
  ];

function minusBet(bet) {
  money = money - bet;
  moneyOutput.textContent = money;
  gameMoney.textContent = money;
  localStorage.setItem('money', money);
  betElem.classList.add('game__money-minus-bet'); // Добавляем базовый класс

  // Добавляем активный класс для анимации появления
  betElem.classList.add('game__money-minus-bet--active');

  // Убираем класс через 1 секунду, чтобы элемент плавно исчез
  setTimeout(() => {
    betElem.classList.remove('game__money-minus-bet--active'); // Убираем класс, чтобы плавно исчезнуть

    // Можно удалить элемент после того, как transition завершится
    setTimeout(() => {
      betElem.remove(); // Удаляем элемент после того, как он исчез
    }, 300);  // Время transition для плавного исчезновения
  }, 1000);  // Время анимации появления // Время анимации появления
  // setTimeout(() => {
  //   betElem.classList.remove('money__minus-bet--active');
  // }, 1000);
  gameMoney.appendChild(betElem);
  betElem.textContent = `-${bet}`;
}

function plusBet(bet) {
  money = money + bet;
  localStorage.setItem('money', money);
  moneyOutput.textContent = money;
  gameMoney.textContent = money;
}

async function buildMatrix() {
  divMatrixHTML = '';
  matrixContainer.innerHTML = '';
  for (let i = 0; i < slots.length; i++) {
    for (let j = 0; j < slots[0].length; j++) {
      slots[i][j] = signs[Math.floor(Math.random() * signs.length)];
      divMatrixHTML += `<div class="matrix-cell matrix-cell--${i}_${j}">${slots[i][j]}</div>`;
    }
    divMatrixHTML += '<br>';
  }
  matrixContainer.innerHTML = divMatrixHTML;
  await sleep(500);
}

buildMatrix();


modalWinClose.addEventListener('click', () => {
  body.classList.remove('lock');
  modalWin.classList.remove('active');
  btnStart.disabled = false;
});

function checkWinnerLine(line, lineClass) {
  if (winnerLine(line)) {
    console.log(money);
    checkCoeff(line);
    console.log(line);
    console.log(money);

    // Добавляем класс .winner для выигрышной линии
    for (let i = 0; i < lineClass.length; i++) {
      const cellClass = `.matrix-cell--${lineClass[i][0]}_${lineClass[i][1]}`;
      const cell = document.querySelector(cellClass);
      console.log(cell);

      // console.log('Ищем элемент:', cellClass, cell); // Выводим в консоль

      if (cell) {
        setTimeout(() => {
          cell.classList.add('winner');
        }, 800);

        // console.log('Класс добавлен:', cell);
      } else {
        // console.log('Элемент не найден:', cellClass);
      }
    }
    moneyOutput.classList.add('active');
  }
}

async function freeSpins(count) {
  let freeSpinSigns = '✅';
  signs = signs.filter(item => item !== freeSpinSigns);
  lostFreeSpin.textContent = count;
  let counts = count;
  let currentMoney = money;
  for (let i = 0; i < count; i++) {
    await sleep(2500)
    console.log('free spins');
    counts -= 1;
    lostFreeSpin.textContent = counts;
    buildMatrix(bet);
    updateLines();
    console.log(signs);
  }
  setTimeout(() => {
    modalWin.classList.add('active');
    body.classList.add('lock')
    currentMoney = money - currentMoney;
    winInFree.textContent = currentMoney;
  }, 2500);
  signs.unshift('✅');
}

function winnerLine(line) {
  return (line[0] === line[1] && line[1] === line[2]);
}

function checkCoeff(line) {
  let currentMoney = money;
  switch (line[0]) {
    case '🍒':
      setTimeout(() => {
        plusBet(bet);
      }, 1000);
      console.log('bet is return');
      break;
    case '🍓':
      setTimeout(() => {
        plusBet(bet / 2);
      }, 1000);
      console.log('bet / 2');
      break;
    case '🍌':
      setTimeout(() => {
        plusBet(bet * 1.5);
      }, 1000);
      console.log('bet * 1.5');
      break;
    case '🍉':
      setTimeout(() => {
        plusBet(bet * 2);
      }, 1000);
      console.log('bet * 2');
      break;
    case '🍋':
      console.log('bet * 2.5');
      setTimeout(() => {
        plusBet(bet * 2.5);
      }, 1000);
      break;
    case '💎':
      setTimeout(() => {
        plusBet(bet * 3);
      }, 1000);
      console.log('bet is *3');
      break;
    case '👑':
      setTimeout(() => {
        plusBet(bet * 5);
      }, 1000);
      console.log('bet * 5');
      break;
    default:
      break;
  }
  setTimeout(() => {
    currentMoney = money - currentMoney;
    betElem.classList.add('game__money-plus-bet'); // Добавляем базовый класс

    // Добавляем активный класс для анимации появления
    betElem.classList.add('game__money-plus-bet--active');

    // Убираем класс через 1 секунду, чтобы элемент плавно исчез
    setTimeout(() => {
      betElem.classList.remove('game__money-plus-bet--active'); // Убираем класс, чтобы плавно исчезнуть

      // Можно удалить элемент после того, как transition завершится
      setTimeout(() => {
        betElem.remove(); // Удаляем элемент после того, как он исчез
      }, 1000);  // Время transition для плавного исчезновения
    }, 1000);  // Время анимации появления // Время анимации появления
    gameMoney.appendChild(betElem);
    betElem.textContent = `+${currentMoney}`;
  }, 1000);
}

function updateLines() {
  const topLine = [
    [0, 0],
    [0, 1],
    [0, 2]
  ];
  const middleLine = [
    [1, 0],
    [1, 1],
    [1, 2]
  ];
  const bottomLine = [
    [2, 0],
    [2, 1],
    [2, 2]
  ];

  const diagonaleFirst = [
    [0, 0],
    [1, 1],
    [2, 2]
  ];

  const diagonaleSecond = [
    [0, 2],
    [1, 1],
    [2, 0]
  ];

  setTimeout(() => {
    checkWinnerLine([slots[0][0], slots[0][1], slots[0][2]], topLine);
    checkWinnerLine([slots[1][0], slots[1][1], slots[1][2]], middleLine);
    checkWinnerLine([slots[2][0], slots[2][1], slots[2][2]], bottomLine);
    checkWinnerLine([slots[0][0], slots[1][1], slots[2][2]], diagonaleFirst);
    checkWinnerLine([slots[0][2], slots[1][1], slots[2][0]], diagonaleSecond);
  }, 1000);
}

function start(bet) {
  btnStart.disabled = true;
  if (btnStart.disabled) {
    setTimeout(() => {
      btnStart.disabled = false;
      lostFreeSpin.textContent = '';
      lostFreeSpinDiv.classList.remove('active');
    }, 1700);
  }
  if (bet) {
    buildMatrix();
    minusBet(bet);
    updateLines();
    moneyOutput.classList.remove('active');
    let freeSpinSigns = '✅';
    let count = 0;
    for (let i = 0; i < slots.length; i++) {
      for (let j = 0; j < slots[0].length; j++) {
        if (slots[i][j] == freeSpinSigns) {
          count += 1;
          console.log(`${i} + ${j}`);
        }
      }
    }
    if (count === 3) {
      modalFreeFunc(10);
    } else if (count === 4) {
      modalFreeFunc(15);
    } else if (count >= 5) {
      modalFreeFunc(20);
    }
  } else {
    alert('Please, enter bet!')
  }
}

function modalFreeFunc(count) {
  btnStart.disabled = true;
  setTimeout(() => {
    modalFree.classList.add('active');
    body.classList.add('lock');
    lostFreeSpin.classList.add('active');
    lostFreeSpinDiv.classList.add('active');
    countFree.textContent = count;
  }, 2200);
  modalFreeClose.addEventListener('click', () => {
    btnStart.disabled = true;
    modalFree.classList.remove('active');
    body.classList.remove('lock');
    freeSpins(count);
  });
};

btnStart.addEventListener('click', () => {
  if (bet > money) {
    alert('У вас недостаточно денег!');
    localStorageMoney(moneyOutput);
    money = parseInt(localStorage.getItem('money'));
    gameMoney.textContent = money;
  } else {
    start(bet)
  }
});
