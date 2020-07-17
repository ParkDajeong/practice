"use strict";

export default class PopUp {
  constructor() {
    this.popup = document.querySelector("#pop-up");
    this.replay_btn = document.querySelector(".replay");
    this.message = document.querySelector(".message");
    this.replay_btn.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popup.style.display = "block";
    this.message.textContent = text;
  }

  hide() {
    this.popup.style.display = "none";
  }
}
