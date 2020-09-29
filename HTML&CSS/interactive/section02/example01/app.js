const h1 = document.querySelector("h1");
const human = document.querySelector(".human");
const bg = document.querySelector(".background");
let x = 0;
let y = 0;
let mouseX = 0;
let mouseY = 0;
const speed = 0.01;

const mouseFunc = (e) => {
  x = e.clientX - window.innerWidth / 2;
  y = e.clientY - window.innerHeight / 2;
};

const loop = () => {
  mouseX += (x - mouseX) * speed;
  mouseY += (y - mouseY) * speed;

  h1.innerText = `x: ${x}, mouseX: ${mouseX}`;
  // 기본
  // human.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

  // 마이너스를 주면 반대로 움직이게 할 수 있다.
  // human.style.transform = `translate(${-mouseX}px, ${-mouseY}px)`;

  // 조금만 움직이고 싶으면 값을 나눠준다.
  human.style.transform = `translate(${-(mouseX / 5)}px, ${-(mouseY / 5)}px)`;
  bg.style.transform = `translate(${mouseX / 5}px, ${mouseY / 5}px)`;

  window.requestAnimationFrame(loop);
};

loop();

window.addEventListener("mousemove", mouseFunc);
