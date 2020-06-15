"use strict";
const input = document.querySelector("input[name='numbers']");
const insertBtn = document.querySelector(".insertBtn");
const trList = document.querySelectorAll(".score tr");
const result = document.querySelector(".result");
const pick = randomNumber();
let chance = 1;

function checkKeyCode(e) {
  const val = this.value;
  this.value = val.replace(/[^0-9]/gi, "");

  if (e.keyCode === 13) {
    insertBtn.click();
  }
}

function randomNumber() {
  const pick = [];
  while (pick.length < 4) {
    const rd = Math.floor(Math.random() * 9) + 1;

    if (pick.includes(rd)) continue;
    pick.push(rd);
  }

  return pick;
}

function inputNumber(e) {
  const numbers = input.value.split("").map(Number);
  let strike = 0;
  let ball = 0;
  if (numbers.length <= 0) return;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === pick[i]) {
      strike++;
    } else if (pick.includes(numbers[i])) {
      ball++;
    }
  }

  showScore(numbers, strike, ball);
  chance++;
}

function showScore(numbers, strike, ball) {
  const tdList = trList[chance].querySelectorAll("td");
  const td_input = tdList[1];
  const td_score = tdList[2];

  td_input.textContent = `${numbers}`;
  td_score.textContent = `${strike} 스트라이크, ${ball} 볼`;
}

console.log(pick);
insertBtn.addEventListener("click", inputNumber);
input.addEventListener("keyup", checkKeyCode);
