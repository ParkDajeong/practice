"use strict";
import PopUp from "./popup.js";
import GameBulider, { Reason } from "./game.js";

const ITEM_COUNT = 10;

const game = new GameBulider() //
  .itemCount(ITEM_COUNT)
  .gameDuration(8)
  .build();
const gameFinishBanner = new PopUp();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.win:
      message = "You Won🎉";
      break;
    case Reason.lose:
      message = "REPLAY?";
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(message);
  game.hideStopButton();
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
