const titleWrap = document.querySelector(".titleWrap");
const coverImg = document.querySelector(".coverImg");
const cover = document.querySelector(".cover");
const title = document.querySelector("h1");
const cover_opacity = 0.3;
let scrollTop = 0;

cover.style.opacity = cover_opacity;

window.addEventListener("scroll", (e) => {
  scrollTop = document.documentElement.scrollTop;

  // titleWrap.style.backgroundPosition = `center ${-scrollTop / 15}px`;

  // titleWrap 에 background-img를 설정하고, scale을 줄 경우엔 글씨도 같이 scale이 된다.
  // 상속돼서 그런듯. 그래서 그걸 원치 않으면 이미지용 div를 따로 만들어서 사용한다.
  coverImg.style.transform = `scale(${1 + scrollTop / 3000})`;

  cover.style.opacity = cover_opacity + scrollTop / 1500;

  title.style.transform = `translateY(${-scrollTop / 5}px)`;
});
