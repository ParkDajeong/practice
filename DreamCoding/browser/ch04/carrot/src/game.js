"use strict";
import { Field, itemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
});

export default class GameBulider {
  itemCount(num) {
    this.itemCount = num;
    return this;
  }

  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  build() {
    return new Game(
      this.itemCount, //
      this.gameDuration
    );
  }
}

class Game {
  constructor(itemCount, gameDuration) {
    this.itemCount = itemCount;
    this.gameDuration = gameDuration;

    this.counting = document.querySelector(".counting");
    this.timer = document.querySelector(".timer");
    this.play_btn = document.querySelector(".play");
    this.play_btn.addEventListener("click", () => {
      if (this.play_btn.matches(".play")) {
        this.start();
      } else {
        this.stop();
      }
    });

    this.gameField = new Field(itemCount);
    this.gameField.setClickListener(this.onItemClick);

    this.interval = undefined;
    this.cur_cnt = itemCount;
    this.isWin = false;
  }

  onItemClick = (item) => {
    if (item === itemType.carrot) {
      sound.playCarrot();
      this.updateCarrotCnt();
    } else if (item === itemType.bug) {
      sound.playBug();
      this.isWin = false;
      this.stop();
    }
  };

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.showInfoData();
    this.initGame();
    this.showStopButton();
    this.startGameTimer();
    sound.playBackground();
  }

  stop() {
    clearInterval(this.interval);

    if (this.isWin) {
      sound.playWin();
    } else {
      sound.playAlert();
    }

    this.onGameStop && this.onGameStop(this.isWin ? Reason.win : Reason.lose);
    sound.stopBackground();
  }

  initGame() {
    this.counting.textContent = this.itemCount;
    this.timer.textContent = `0:${this.gameDuration}`;
    this.time = this.gameDuration;
    this.cur_cnt = this.itemCount;
    this.gameField.initGame();
  }

  updateCarrotCnt() {
    this.counting.textContent = --this.cur_cnt;
    if (this.cur_cnt === 0) {
      this.isWin = true;
      this.stop();
    }
  }

  showStopButton() {
    this.play_btn.style.visibility = "visible";
    this.play_btn.classList.replace("play", "stop");
    this.play_btn.innerHTML = "<i class='fas fa-stop'></i>";
  }

  hideStopButton() {
    this.play_btn.style.visibility = "hidden";
  }

  showInfoData() {
    this.timer.style.visibility = "visible";
    this.counting.style.visibility = "visible";
  }

  updateTimerText() {
    const min = Math.floor(this.time / 60);
    const sec = this.time % 60;
    this.timer.textContent = `${min}:${sec}`;
  }

  startGameTimer() {
    this.interval = setInterval(() => {
      if (this.time <= 0) {
        this.isWin = false;
        this.stop();
      }
      this.updateTimerText(this.time--);
    }, 1000);
  }
}
