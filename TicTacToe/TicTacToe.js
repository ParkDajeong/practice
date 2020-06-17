const table = document.querySelector("table");
const trList = Array.from(table.querySelectorAll("tr"));
const tdList = Array.from(table.querySelectorAll("td"));
const spaceList = Array.from(Array(3), () => new Array(3));
const now = document.querySelector(".now span");
const result = document.querySelector(".result");
let turn = "X";
let isGameOver = false;

// 임시 - 더 똑똑한 방법 찾아보자.
for (let i = 0; i < 3; i++) {
  for (let j = 0, k = i * 3; j < 3; j++, k++) {
    spaceList[i][j] = tdList[k];
  }
}

// 칸 클릭 이벤트 - X 또는 O 표시
function clickSpace(e) {
  if (isGameOver) return;
  if (this.textContent !== "") return;

  this.textContent = turn;
  if (checkLine(this, turn)) {
    isGameOver = true;
    result.textContent = `결과 : ${turn}의 승리`;
    return;
  }

  // 턴 넘기기
  turn = turn === "X" ? "O" : "X";
  now.textContent = turn;
}

// 한 줄이 되었는지 체크
function checkLine(space, turn) {
  const row = trList.indexOf(space.parentNode);
  const col = spaceList[row].indexOf(space);

  // 가로 체크
  if (spaceList[row].every((el) => el.textContent === turn)) {
    return true;
  }

  // 세로 체크
  if (spaceList.every((el) => el[col].textContent === turn)) {
    return true;
  }

  // 대각선 체크
  if (
    (spaceList[0][0].textContent == turn && spaceList[1][1].textContent == turn && spaceList[2][2].textContent == turn) ||
    (spaceList[0][2].textContent == turn && spaceList[1][1].textContent == turn && spaceList[2][0].textContent == turn)
  ) {
    return true;
  }

  return false;
}

tdList.forEach((td) => td.addEventListener("click", clickSpace));
