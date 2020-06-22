const lottoForm = document.querySelector("form[name='lottoForm']");
const numBox = document.querySelectorAll("#lottoForm input");
const clearBtn = document.querySelector(".allClear");
const alert = document.querySelector(".alert");
const result = document.querySelector(".result");
let isEnd = false;

// 입력한 숫자 중복 체크
function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

// input 모두 초기화
function allClear() {
  numBox.forEach((box) => (box.value = null));
  numBox[0].focus();
  result.innerHTML = "";
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

  console.log("입력한 로또 번호 :", inputNums);
  pickNumber();
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
function pickNumber() {
  const shuffle = shuffleNumber();
  const lotto = shuffle.slice(0, 6);
  const bonus = shuffle[shuffle.length - 1];

  lotto.forEach((num) => result.appendChild(createSpan(num, "ball")));
  result.appendChild(createSpan("+", "plusText"));
  result.appendChild(createSpan(bonus, "ball"));

  isEnd = true;

  console.log("당첨 :", lotto);
  console.log("보너스 번호 :", bonus);
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
