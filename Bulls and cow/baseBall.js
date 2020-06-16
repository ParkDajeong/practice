"use strict";
const input = document.querySelector("input[name='numbers']");
const insertBtn = document.querySelector(".insertBtn");
const trList = document.querySelectorAll(".score tr");
const result = document.querySelector(".result");

const player = (function () {
  const pick = randomNumber();
  let chance = 0;
  let isGameOver = false;

  return {
    getPick: () => Array.from(pick),
    getChance: () => chance,
    setChance: () => chance++,
    getGameState: () => isGameOver,
    setGameState: () => (isGameOver = true),
  };
})();

/* --------------- 엔터키인지 확인 --------------- */
function checkKeyCode(e) {
  const val = this.value;
  this.value = val.replace(/[^0-9]/gi, "");

  if (e.keyCode === 13) {
    insertBtn.click();
  }
}

/* ---------- 겹치지 않는 랜덤한 숫자 4개 뽑기 ---------- */
function randomNumber() {
  const pick = [];
  while (pick.length < 4) {
    const rd = Math.floor(Math.random() * 9) + 1;

    if (pick.includes(rd)) continue;
    pick.push(rd);
  }

  return pick;
}

/* --------------- 중복된 숫자 확인 --------------- */
function checkDuplication(guess) {
  for (let i = 0; i < guess.length; i++) {
    if (guess.lastIndexOf(guess[i]) !== i) {
      return false;
    }
  }
  return true;
}

/* --------------- 점수 출력 --------------- */
function showScore(guess, strike, ball) {
  const chance = player.getChance();
  const tdList = trList[chance].querySelectorAll("td");
  const td_input = tdList[1];
  const td_score = tdList[2];

  td_input.textContent = `${guess}`;
  if (strike === 4) {
    td_score.textContent = `홈런!!`;
    result.textContent = "축하합니다. 홈런입니다!!";
    player.setGameState();
  } else {
    td_score.textContent = `${strike} 스트라이크, ${ball} 볼`;
  }
}

/* --------------- 게임 실행 --------------- */
function inputNumber(e) {
  const guess = input.value.split("").map(Number);
  let strike = 0;
  let ball = 0;

  if (player.getGameState()) {
    return;
  }
  if (guess.length === 0 || guess.length < 4) return;
  if (!checkDuplication(guess)) {
    result.innerText = `중복된 숫자가 있습니다.
    다른 숫자를 입력해주세요.`;
    return;
  }

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === player.getPick()[i]) {
      strike++;
    } else if (player.getPick().includes(guess[i])) {
      ball++;
    }
  }
  player.setChance();
  showScore(guess, strike, ball);
  input.value = "";

  if (player.getChance() === 9) {
    result.innerText = `모든 기회를 사용하였습니다.
    정답은 ${player.getPick()} 입니다.`;
    player.setGameState();
  }
}

//console.log(player.getPick());
insertBtn.addEventListener("click", inputNumber);
input.addEventListener("keyup", checkKeyCode);
