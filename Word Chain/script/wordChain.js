"use strict";
const wordBox = document.querySelector(".word");
const lifes = document.querySelectorAll(".fa-heart");
const inputBox = document.querySelector("input[name='input-word']");

const startWordList = ["개구리", "빨래", "컴퓨터", "은하수", "배구", "연필", "독서", "미세먼지"];

// 모듈패턴(유형 중, 즉시 실행 함수)
const user = (function () {
  const words = [];
  let score = 0;
  let life = 3;

  return {
    getStartWord: () => words[words.length - 1],
    getScore: () => score,
    setScore: () => score++,
    decreaseLife: () => {
      life--;
      return life;
    },
    getWordList: () => [...words],
    checkWordList: (word) => {
      const result = words.find((el) => el === word);
      return result !== undefined ? false : true;
    },
    addWordList: (word) => words.push(word),
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
  inputBox.classList.remove("correct");
  inputBox.classList.remove("wrong");
  // Enter 가 아니거나, inputBox가 비어있으면 실행 안되게
  if (e.key !== "Enter" || inputBox.value == "") return;

  const startWord = user.getStartWord();
  let inputWord = inputBox.value.replace(/ /gi, ""); //공백 제거
  let end = startWord[startWord.length - 1];

  // 시작 단어의 끝과 입력 단어의 처음이 같지 않거나,
  // 앞에서 이미 사용한 단어라면 오답 처리
  if (end !== inputWord[0] || inputWord.length <= 1 || !user.checkWordList(inputWord)) {
    const life = user.decreaseLife();
    lifes[life].classList.add("decrease");
    inputBox.classList.add("wrong");
    inputBox.value = "";
    checkGameOver(life);
    return;
  }

  user.setScore();
  user.addWordList(inputWord);
  inputBox.classList.add("correct");
  wordBox.innerText = user.getStartWord();
  inputBox.value = "";
}

const idx = (Math.random() * startWordList.length) | 0;
user.addWordList(startWordList[idx]);
wordBox.innerText = user.getStartWord();
inputBox.addEventListener("keyup", inputWord);
