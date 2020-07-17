"use strict";

const CARROT_SIZE = 130;

export const itemType = Object.freeze({
  carrot: "carrot",
  bug: "bug",
});

export class Field {
  constructor(itemCnt) {
    this.ITEM_COUNT = itemCnt;
    this.cur_cnt = this.ITEM_COUNT;

    this.field = document.querySelector(".game_field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (e) => this.onClick(e));
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  initGame() {
    this.field.innerHTML = "";
    this.cur_cnt = this.ITEM_COUNT;
    this._addItem("carrot", "img/carrot.png");
    this._addItem("bug", "img/bug.png");
  }

  _addItem(className, imgPath) {
    const maxX = this.fieldRect.width - CARROT_SIZE;
    const maxY = this.fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < this.ITEM_COUNT; i++) {
      const item = document.createElement("img");
      item.setAttribute("src", imgPath);
      item.classList.add(className);
      item.style.top = `${randomPosition(maxY)}px`;
      item.style.left = `${randomPosition(maxX)}px`;
      this.field.appendChild(item);
    }
  }

  onClick(e) {
    const target = e.target;
    if (target.matches(".carrot")) {
      target.remove();
      this.onItemClick && this.onItemClick(itemType.carrot);
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick(itemType.bug);
    }
  }
}

function randomPosition(max) {
  return Math.floor(Math.random() * max);
}
