'use strict'

const matrixContainer = document.getElementById('numbers');
let divMatrixHTML = '';

const btnStart = document.getElementById('btnStart');
btnStart.disabled = false;
const moneyOutput = document.getElementById('money');
const setBet = document.getElementById('setBet');
const signs = ['💎', '✅', '🍒', '🍋', '🍌', '🍓', '🍉', '👑'];
let money = 5000;
let bet;
let betElem = document.createElement('div');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


setBet.addEventListener('input', () => {
  bet = Number(setBet.value);
});
moneyOutput.textContent = money;

let slots =
  [
    ['0', '0', '0'],
    ['0', '0', '0'],
    ['0', '0', '0'],
  ];

function minusBet(bet) {
  money = money - bet;
  moneyOutput.textContent = money;
  betElem.classList.add('money__minus-bet'); // Добавляем базовый класс

  // Добавляем активный класс для анимации появления
  betElem.classList.add('money__minus-bet--active');

  // Убираем класс через 1 секунду, чтобы элемент плавно исчез
  setTimeout(() => {
    betElem.classList.remove('money__minus-bet--active'); // Убираем класс, чтобы плавно исчезнуть

    // Можно удалить элемент после того, как transition завершится
    setTimeout(() => {
      betElem.remove(); // Удаляем элемент после того, как он исчез
    }, 300);  // Время transition для плавного исчезновения
  }, 1000);  // Время анимации появления // Время анимации появления
  // setTimeout(() => {
  //   betElem.classList.remove('money__minus-bet--active');
  // }, 1000);
  moneyOutput.appendChild(betElem);
  betElem.textContent = `-${bet}`;
}


async function buildMatrix(params) {
  // ['💎', '✅', '🍒', '🍋', '🍌', '🍓', '🍉', '👑'];;
  const weight = [3, 1, 9, 7, 5, 5, 4, 2];
  divMatrixHTML = '';
  matrixContainer.innerHTML = '';
  // for (let i = 0; i < slots.length; i++) {
  //   for (let j = 0; j < slots[0].length; j++) {
  //     slots[i][j] = getRandomElementWithWeight(signs, weight);
  //     // divMatrixHTML += <div class="matrix-cell matrix-cell--${j} active">${slots[i][j]}</div>;
  //   }
  //   // divMatrixHTML += '<br>';
  // }

  for (let i = 0; i < slots.length; i++) {
    for (let j = 0; j < slots[0].length; j++) {
      slots[i][j] = getRandomElementWithWeight(signs, weight);
      divMatrixHTML += `<div class="matrix-cell matrix-cell--${i}_${j}">${slots[i][j]}</div>`;
    }
    divMatrixHTML += '<br>';
  }
  matrixContainer.innerHTML = divMatrixHTML;
  await sleep(500);
}


function getRandomElementWithWeight(elements, weights) {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;

  for (let i = 0; i < elements.length; i++) {
    cumulativeWeight += weights[i];
    if (random < cumulativeWeight) {
      return elements[i];
    }
  }
}

buildMatrix();


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


async function freeSpins() {
  for (let i = 0; i < 10; i++) {
    await sleep(1000)
    console.log('free spins');
    buildMatrix(bet);
    updateLines();
  }
}

function winnerLine(line) {
  return (line[0] === line[1] && line[1] === line[2]);
}

function checkCoeff(line) {
  // ['💎', '✅', '🍒', '🍋', '🍌', '🍓', '🍉', '👑'];
  switch (line[0]) {
    case '🍒':
      money = money + bet;
      moneyOutput.textContent = money;
      console.log('bet is return');
      break;
    case '🍓':
      money = money + bet / 2;
      moneyOutput.textContent = money;
      console.log('bet is return');
      break;
    case '🍌':
      money = money + bet * 1.5;
      moneyOutput.textContent = money;
      console.log('bet is return');
      break;
    case '🍉':
      money = money + bet * 2;
      moneyOutput.textContent = money;
      console.log('bet is return');
      break;
    case '🍋':
      money = money + bet * 2.5;
      moneyOutput.textContent = money;
      console.log('bet is *2');
      break;
    case '💎':
      money = money + bet * 3;
      moneyOutput.textContent = money;
      console.log('bet is *3');
      break;
    case '👑':
      money = money + bet * 5;
      moneyOutput.textContent = money;
      console.log('bet is *2');
      break;
    case '✅':
      freeSpins();
      break;
    default:
      break;
  }
}

// function updateLines() {

//   const topLine =
//     [
//       slots[0][0],
//       slots[0][1],
//       slots[0][2]
//     ];
//   const middleLine =
//     [
//       slots[1][0],
//       slots[1][1],
//       slots[1][2]
//     ];
//   const bottomLine =
//     [
//       slots[2][0],
//       slots[2][1],
//       slots[2][2]
//     ];

//   const diagonaleFirst =
//     [
//       slots[0][0],
//       slots[1][1],
//       slots[2][2]
//     ];

//   const diagonaleSecond =
//     [
//       slots[0][2],
//       slots[1][1],
//       slots[2][0]
//     ];

//   checkWinnerLine(topLine);
//   checkWinnerLine(middleLine);
//   checkWinnerLine(bottomLine);
//   checkWinnerLine(diagonaleFirst);
//   checkWinnerLine(diagonaleSecond);
// }

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
  if(btnStart.disabled) {
    setTimeout(() => {
      btnStart.disabled = false;
    }, 1700);
  }
  if (bet) {
    buildMatrix();
    minusBet(bet);
    updateLines();
    moneyOutput.classList.remove('active');
  } else {
    alert('Please, enter bet!')
  }
}

btnStart.addEventListener('click', () => start(bet));
