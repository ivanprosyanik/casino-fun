'use strict';

const moneyOutput = document.querySelector('.header__money');
export function stickyHeader(params) {
  const header = document.querySelector('.header');
  window.onscroll = () => {
    if (window.pageYOffset > 50) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };
}

export function localStorageMoney(moneyOutput) {
  let money;
  if (!localStorage.getItem('money')) {
    money = 5000;
    localStorage.setItem('money', money);
    moneyOutput.textContent = money
  } else {
    money = parseInt(localStorage.getItem('money'));
    moneyOutput.textContent = money
  }
  return money;
}
localStorageMoney(moneyOutput)