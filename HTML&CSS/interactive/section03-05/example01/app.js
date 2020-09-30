// const h1 = document.querySelector("h1");
const guage = document.querySelector(".guage");
const guage_vertical = document.querySelector(".guage-vertical");
const cloudsWrap = document.querySelector(".cloudsWrap");
let scrollTop = 0;

window.addEventListener("scroll", () => {
  // window.scrollTop을 이용할 수도 있지만 IE에서는 해당 property가 존재하지 않음.
  scrollTop = document.documentElement.scrollTop;

  // document.body.scrollHeight ==> HTML 문서의 전체 길이 === body에 준 height 값
  // window.outerHeight ==> 브라우저를 포함한 현재 보이는 화면의 높이
  // 웹 페이지 시작 시, 처음 보이는 화면만큼의 스크롤 값을 빼줘야 100%를 만들 수 있다.
  let per = Math.floor((scrollTop / (document.body.scrollHeight - window.outerHeight)) * 100);

  // h1.innerText = `${per}%`;
  guage.style.width = `${per}%`;
  guage_vertical.style.height = `${per}%`;

  cloudsWrap.style.transform = `translateY(${scrollTop / 1.6}px)`;
});
