"use strict";
const wordBox = document.querySelector(".word");
const lifes = document.querySelectorAll(".fa-heart");
const inputBox = document.querySelector("input[name='input-word']");

let startWord = "개구리";

// 모듈패턴(유형 중, 즉시 실행 함수)
const user = (function () {
  let score = 0;
  let life = 3;

  return {
    getScore: () => score,
    setScore: () => score++,
    decreaseLife: () => {
      life--;
      return life;
    },
  };
})();

function checkGameOver(life) {
  if (life === 0) {
    const modal = document.querySelector(".modal");
    const restart = document.querySelector(".restart");
    modal.style.display = "block";
    modal.querySelector("p").innerText = `총 ${user.getScore()}번의 랠리를 이어갔습니다.
    게임을 다시하고 싶다면, 다시 시작을 눌러주세요!`;
    restart.addEventListener("click", () => location.reload());
  }
}

function inputWord(e) {
  // Enter 가 아니거나, inputBox가 비어있으면 실행 안되게
  if (e.key !== "Enter" || inputBox.value == "") return;

  let inputWord = inputBox.value.replace(/ /gi, ""); //공백 제거
  let end = startWord[startWord.length - 1];

  if (end !== inputWord[0]) {
    const life = user.decreaseLife();
    lifes[life].style.color = "#fff";
    inputBox.value = "";
    checkGameOver(life);
    return;
  }

  startWord = inputWord;
  user.setScore();
  wordBox.innerText = startWord;
  inputBox.value = "";
}

wordBox.innerText = startWord;
inputBox.addEventListener("keyup", inputWord);
