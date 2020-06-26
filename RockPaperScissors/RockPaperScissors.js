const hands = document.querySelectorAll(".imgBox img");
const buttons = document.querySelectorAll(".btns button");
const result = document.querySelector(".result");
let imgIndex = 0;
let isStop = false;

const rule = {
  rock: 0,
  scissors: 1,
  paper: 2,
};

class Player {
  constructor(score = 0) {
    this._score = score;
  }

  get score() {
    return this._score;
  }

  set score(num) {
    this._score = num;
  }
}
const com = new Player();
const user = new Player();

// 이미지 번갈아가면서 나타나게
function showImage() {
  if (isStop) return;

  hands.forEach((hand) => (hand.style.display = "none"));
  if (imgIndex >= hands.length) imgIndex = 0;
  hands[imgIndex++].style.display = "inline-block";

  setTimeout(showImage, 80);
}

function pauseImage() {
  setTimeout(() => {
    isStop = false;
    showImage();
  }, 1200);
}

// 버튼 클릭 이벤트
function clickButton() {
  isStop = true;
  const com = imgIndex - 1;
  const user = rule[this.name];
  const cal = com - user;

  switch (cal) {
    case 1:
    case -2:
      result.textContent = "👏당신이 이겼습니다👏";
      showScore("user");
      break;
    case -1:
    case 2:
      result.textContent = "😥당신이 졌습니다😥";
      showScore("com");
      break;
    case 0:
      result.textContent = "비겼습니다.";
      pauseImage();
      break;
    default:
      isStop = false;
      alert("ERROR) 알 수 없는 오류. 새로 고침 해주세요.");
  }

  //console.log("com : ", com, " user : ", user);
}

// 득점
function showScore(winner) {
  const com_scoreBoard = document.querySelector(".com");
  const user_scoerBoard = document.querySelector(".user");

  if (winner === "com") {
    com.score = com.score + 1;
    com_scoreBoard.textContent = com.score;
  } else if (winner === "user") {
    user.score = user.score + 1;
    user_scoerBoard.textContent = user.score;
  }

  pauseImage();
}

showImage();
buttons.forEach((btn) => btn.addEventListener("click", clickButton));
