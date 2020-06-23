const lottoForm = document.querySelector("form[name='lottoForm']");
const numBox = document.querySelectorAll("#lottoForm input");
const clearBtn = document.querySelector(".allClear");
const alert = document.querySelector(".alert");
const result = document.querySelector(".result");
const rankBox = document.querySelector(".rank");
let isEnd = false;

// 입력한 숫자 중복 체크
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

// 모두 초기화
function allClear() {
  numBox.forEach((box) => (box.value = null));
  numBox[0].focus();
  result.innerHTML = "";
  rankBox.innerHTML = "";
  isEnd = false;
}

// 추첨 버튼 클릭
function inputLottoNumbers(e) {
  e.preventDefault();
  if (isEnd) return;

  const data = new FormData(lottoForm);
  const inputNums = Array.from(data.values());
  if (hasDuplicates(inputNums)) {
    alert.classList.add("active");
    return;
  }

  // console.log("입력한 로또 번호 :", inputNums);
  pickNumber(inputNums);
}

// 포커스 이동
let timer;
function moveFocus() {
  alert.classList.remove("active");
  if (timer) {
    clearTimeout(timer);
  }
  if (Number(this.value) < 1 || Number(this.value) > 45) {
    this.value = "";
    return;
  }
  timer = setTimeout(() => {
    this.nextElementSibling.focus();
  }, 250);
}

// 로또 번호 추첨
function pickNumber(inputNums) {
  const shuffle = shuffleNumber();
  const lotto = shuffle.slice(0, 6);
  const bonus = shuffle[shuffle.length - 1];
  let cnt = 0;
  let hasBonus = false;

  lotto.forEach((num) => result.appendChild(createSpan(num, "ball")));
  result.appendChild(createSpan("+", "plusText"));
  result.appendChild(createSpan(bonus, "ball"));

  inputNums.forEach((num) => {
    if (lotto.includes(Number(num))) cnt++;
    if (Number(num) === bonus) hasBonus = true;
  });

  let rank = "";
  switch (cnt) {
    case 6:
      rank = "1등";
      break;
    case 5:
      rank = hasBonus ? "2등" : "3등";
      break;
    case 4:
      rank = "4등";
      break;
    case 3:
      rank = "5등";
      break;
  }

  if (rank === "") {
    rankBox.textContent = "아쉽지만 다음 기회에...";
  } else {
    rankBox.textContent = `축하합니다. ${rank} 입니다.`;
  }

  isEnd = true;

  // console.log("당첨 :", lotto);
  // console.log("보너스 번호 :", bonus);
  // console.log("몇 개?", cnt);
}

// <span>태그 생성 함수
function createSpan(text, className) {
  const span = document.createElement("span");
  span.textContent = text;
  coloringBall(text, span);
  span.classList.add(className);

  return span;
}

// 공 색깔 설정
function coloringBall(text, span) {
  const num = Number(text);
  if (!num) return;
  if (num >= 1 && num <= 10) {
    span.classList.add("yellow");
  } else if (num <= 20) {
    span.classList.add("blue");
  } else if (num <= 30) {
    span.classList.add("red");
  } else if (num <= 40) {
    span.classList.add("purple");
  } else {
    span.classList.add("green");
  }
}

// 번호 섞기
function shuffleNumber() {
  const lottoNum = Array(45)
    .fill()
    .map((val, idx) => idx + 1);
  const sf = [];
  while (lottoNum.length > 0) {
    sf.push(lottoNum.splice(Math.floor(Math.random() * lottoNum.length), 1)[0]);
  }

  return sf;
}

numBox[0].focus();
numBox.forEach((box) => box.addEventListener("input", moveFocus));
lottoForm.addEventListener("submit", inputLottoNumbers);
clearBtn.addEventListener("click", allClear);
