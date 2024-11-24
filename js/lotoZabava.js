'use strict';

const firstField = document.querySelector('.first--field');
const secondField = document.querySelector('.second--field');
const btnStart = document.getElementById('btnStart');
const btnRandom = document.getElementById('btnRandom');
const btnClear = document.getElementById('btnClear');
const gameMoney = document.getElementById('moneyOutput');
const moneyOutput = document.querySelector('.header__money');
const setBet = document.getElementById('setBet');
let lastWin = document.getElementById('lastWin');
let btnOnField = '';

let coef4 = document.getElementById('coef-4');
let coef5 = document.getElementById('coef-5');
let coef6 = document.getElementById('coef-6');
let coef7 = document.getElementById('coef-7');
let coef8 = document.getElementById('coef-8');
let coef9 = document.getElementById('coef-9');
let coef10 = document.getElementById('coef-10');


let bet;
let money;

import { localStorageMoney, stickyHeader } from "./index.js";
stickyHeader();
localStorageMoney(moneyOutput);
money = parseInt(localStorage.getItem('money'));

setBet.addEventListener('input', () => {
  bet = Number(setBet.value);
  setCoef(bet);
});
gameMoney.textContent = money;

function generateButton() {
  for (let i = 1; i <= 40; i++) {
    btnOnField += `
     <li class="loto__item">
       <button class="loto__item-btn" type="button" id='${i}'>${i}</button>
      </li>`
  }
  firstField.insertAdjacentHTML('afterbegin', btnOnField);
  btnOnField = ''
  for (let i = 41; i <= 80; i++) {
    btnOnField += `
     <li class="loto__item">
       <button class="loto__item-btn" type="button" id='${i}'>${i}</button>
      </li>`
  }
  secondField.insertAdjacentHTML('afterbegin', btnOnField);
};
generateButton();

let randomNumbers = [];
function randomNumber() {
  randomNumbers = []
  for (let i = 1; i <= 20; i++) {
    let random;
    do {
      random = Math.floor(Math.random() * 80) + 1; // Генерируем случайное число от 1 до 80
    } while (randomNumbers.includes(random)); // Повторяем, если число уже есть в массиве
    randomNumbers.push(random); // Добавляем уникальное число в массив
  }
}

const btns = document.querySelectorAll('.loto__item-btn');
let userNumber = [];
btns.forEach((e) => {
  e.addEventListener('click', () => {
    if (e.classList.contains('active')) {
      userNumber = userNumber.filter(item => item !== e.innerText);
      e.classList.remove('active');
    } else if (userNumber.length <= 9) {
      e.classList.add('active')
      userNumber.push(e.innerText);
    }
  });
});

let match = 0;

function calcCoef(bet, match) {
  switch (match) {
    case 4:
      money = money + bet * 2;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 2;
      coef4.parentElement.classList.add('active');
      break;
    case 5:
      money = money + bet * 5;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 5;
      coef5.parentElement.classList.add('active');
      break;
    case 6:
      money = money + bet * 16;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 16;
      coef6.parentElement.classList.add('active');
      break;
    case 7:
      money = money + bet * 80;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 80;
      coef7.parentElement.classList.add('active');
      break;
    case 8:
      money = money + bet * 240;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 240;
      coef8.parentElement.classList.add('active');
      break;
    case 9:
      money = money + bet * 700;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 700;
      coef9.parentElement.classList.add('active');
      break;
    case 10:
      money = money + bet * 1000;
      localStorage.setItem('money', money);
      moneyOutput.textContent = money;
      gameMoney.textContent = money;
      lastWin.textContent = bet * 1000;
      coef10.parentElement.classList.add('active');
      break;
    default:
      break;
  }
}

function setCoef(bet) {
  coef4.textContent = bet * 2;
  coef5.textContent = bet * 5;
  coef6.textContent = bet * 16;
  coef7.textContent = bet * 80;
  coef8.textContent = bet * 240;
  coef9.textContent = bet * 700;
  coef10.textContent = bet * 1000;
}

let numbersList = document.querySelector('.loto__numbers-list');

const array = Array.from(Array(16), (_, index) => (index < 10 ? index.toString() : String.fromCharCode(97 + index - 10)));

function generateColor(numbersItems) {
  numbersItems.forEach(e => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      let a = Math.floor(Math.random() * array.length);
      color += array[a];
    };
    e.style.outlineColor = color;
  });
};

let numbersListItem = '';
function play() {
  if (bet) {
    money = money - bet;
    localStorage.setItem('money', money);
    moneyOutput.textContent = money;
    randomNumber();
    console.log(...randomNumbers);
    numbersListItem = '';
    for (let i = 0; i < randomNumbers.length; i++) {
      numbersListItem += `<li class="loto__numbers-item">${randomNumbers[i]}</li>`
    }
    numbersList.innerHTML = numbersListItem;
    const numbersItems = document.querySelectorAll('.loto__numbers-item');
    generateColor(numbersItems);
    match = 0;
    gameMoney.textContent = money;
    for (let i = 0; i < randomNumbers.length; i++) {
      for (let j = 0; j < userNumber.length; j++) {
        if (randomNumbers[i] == userNumber[j]) {
          match += 1;
          numbersItems[i].classList.add('winner')
        }
      }
    }
    calcCoef(bet, match);
  } else {
    alert('Please, set bet');
  }
};

btnStart.addEventListener('click', () => {
  if (bet > money) {
    alert('Enough money')
  } else if (userNumber.length < 4) {
    alert('Mark 4 to 10 numbers and tap PLAY')
  } else {
    coef4.parentElement.classList.remove('active');
    coef5.parentElement.classList.remove('active');
    coef6.parentElement.classList.remove('active');
    coef7.parentElement.classList.remove('active');
    coef8.parentElement.classList.remove('active');
    coef9.parentElement.classList.remove('active');
    coef10.parentElement.classList.remove('active');
    play();
  }
});

btnRandom.addEventListener('click', () => {
  userNumber = [];
  btns.forEach(e => {
    e.classList.remove('active');
  });
  for (let i = 1; i <= 10; i++) {
    let random;
    do {
      random = Math.floor(Math.random() * 80) + 1; // Генерируем случайное число от 1 до 80
    } while (userNumber.includes(random)); // Повторяем, если число уже есть в массиве
    btns.forEach(e => {
      if (random == e.innerText) {
        e.classList.add('active');
        userNumber.push(e.innerText); // Добавляем уникальное число в массив
      }
    });
  }
});

btnClear.addEventListener('click', () => {
  userNumber = [];
  btns.forEach(e => {
    e.classList.remove('active');
  });
});

const modalRotate = document.querySelector('.modal__rotate');
const body = document.querySelector('.body');

window.addEventListener('resize', () => {
  if (window.innerWidth < 576) {
    modalRotate.classList.add('active');
    body.classList.add('lock');
  } else {
    modalRotate.classList.remove('active');
    body.classList.remove('lock');
  }
});