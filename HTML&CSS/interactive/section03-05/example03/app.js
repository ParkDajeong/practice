const progressBar = document.querySelector(".progress-bar");
const img0 = document.querySelector("#img-0");
const img1 = document.querySelector("#img-1");
const img2 = document.querySelector("#img-2");
const img3 = document.querySelector("#img-3");
const img4 = document.querySelector("#img-4");
const img5 = document.querySelector("#img-5");
const img6 = document.querySelector("#img-6");
let scrollTop = 0;
let x = 0;
let y = 0;
let mouseX = 0;
let mouseY = 0;
const speed = 0.03;

const fillProgressBar = () => {
  const per = Math.floor((scrollTop / document.body.scrollHeight) * 100);

  progressBar.style.width = `${per}%`;
};

const scrollFunc = () => {
  scrollTop = document.documentElement.scrollTop;
  fillProgressBar();

  img0.style.transform = `translateY(${scrollTop * 0.03}px)`;
  img1.style.transform = `translateY(${-scrollTop * 0.03}px)`;
  img2.style.transform = `translateY(${-scrollTop * 0.12}px)`;
  img3.style.transform = `translateY(${-scrollTop * 0.16}px)`;
  img4.style.transform = `translateY(${-scrollTop * 0.22}px)`;
  img5.style.transform = `translateY(${-scrollTop * 0.25}px)`;
};

const getMousePosition = (e) => {
  // 브라우저 정가운데가 (0, 0)이 되도록.
  x = e.clientX - window.innerWidth / 2;
  y = e.clientY - window.innerHeight / 2;

  // console.log(`${x}, ${y}`);
};

const loop = () => {
  mouseX += (x - mouseX) * speed;
  mouseY += (y - mouseY) * speed;

  img4.style.transform = `translate(${mouseX / 140}px, ${-scrollTop * 0.22}px)`;
  // translate()만 하면 이미지 끝이 보여서 scale()로 약간만 키워주기
  img5.style.transform = `scale(1.1) translate(${-mouseX / 70}px, ${-scrollTop * 0.25}px)`;
  img6.style.transform = `scale(1.2) translate(${-mouseX / 20}px, ${-mouseY / 20}px)`;

  window.requestAnimationFrame(loop);
};

loop();

window.addEventListener("scroll", scrollFunc);
window.addEventListener("mousemove", getMousePosition);
