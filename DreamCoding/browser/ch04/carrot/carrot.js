"use strict";

const ITEM_COUNT = 10;
const CARROT_SIZE = 130;

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();
const play_btn = document.querySelector(".play");
const counting = document.querySelector(".counting");
const timer = document.querySelector(".timer");
const popup = document.querySelector("#pop-up");
const message = document.querySelector(".message");
const replay_btn = document.querySelector(".replay");

const carrotSound = new Audio("sound/carrot_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");

let interval = null;
let cur_cnt = ITEM_COUNT;
let isWin = false;

/* 이미지 생성 */
function addItem(className, imgPath) {
  const maxX = fieldRect.width - CARROT_SIZE;
  const maxY = fieldRect.height - CARROT_SIZE;

  for (let i = 0; i < ITEM_COUNT; i++) {
    const item = document.createElement("img");
    item.setAttribute("src", imgPath);
    item.classList.add(className);
    item.style.top = `${randomPosition(maxY)}px`;
    item.style.left = `${randomPosition(maxX)}px`;
    field.appendChild(item);
  }
}

/* 랜덤 좌표 생성 */
function randomPosition(max) {
  return Math.floor(Math.random() * max);
}

/* 게임 초기화 */
function initGame() {
  field.innerHTML = "";
  timer.textContent = `0:${ITEM_COUNT}`;
  counting.textContent = ITEM_COUNT;
  cur_cnt = ITEM_COUNT;
  addItem("carrot", "img/carrot.png");
  addItem("bug", "img/bug.png");
}

function showStopButton() {
  play_btn.classList.replace("play", "stop");
  play_btn.innerHTML = "<i class='fas fa-stop'></i>";
}

function updateTimerText(time) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  timer.textContent = `${min}:${sec}`;
}

/* 타이머 */
function startGameTimer() {
  let time = ITEM_COUNT - 1;
  interval = setInterval(() => {
    if (time <= 0) {
      isWin = false;
      stopGame();
    }
    updateTimerText(time--);
  }, 1000);
}

/* 게임 시작 */
function startGame() {
  initGame();
  showStopButton();
  startGameTimer();
}

function showPopUpWithText(text) {
  popup.style.display = "block";
  message.textContent = text;
}

/* 게임 오버 */
function stopGame() {
  clearInterval(interval);

  if (isWin) {
    showPopUpWithText("You Won🎉");
    playSound(winSound);
  } else {
    showPopUpWithText("REPLAY?");
    playSound(alertSound);
  }
}

/* counting */
function updateCarrotCnt() {
  counting.textContent = --cur_cnt;
  if (cur_cnt === 0) {
    isWin = true;
    stopGame();
  }
}

function playSound(sound) {
  sound.currentTiem = 0;
  sound.play();
}

playSound(bgSound);
timer.textContent = `0:${ITEM_COUNT}`;
counting.textContent = ITEM_COUNT;
play_btn.addEventListener("click", () => {
  if (play_btn.classList.contains("play")) {
    startGame();
  } else {
    stopGame();
  }
});

replay_btn.addEventListener("click", () => {
  popup.style.display = "none";
  startGame();
});

field.addEventListener("click", (e) => {
  const target = e.target;
  if (target.matches(".carrot")) {
    target.remove();
    playSound(carrotSound);
    updateCarrotCnt();
  } else if (target.matches(".bug")) {
    playSound(bugSound);
    isWin = false;
    stopGame();
  }
});
