const imgArr = document.querySelectorAll(".moveImg");
const bird = document.querySelector("video");
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
  const movement = [15, 9, 4];

  imgArr.forEach((img, idx) => {
    img.style.transform = `translate(${-(mouseX / movement[idx])}px, ${-(mouseY / movement[idx])}px)`;
  });
  bird.style.transform = `translate(${-(mouseX / 10)}px, ${-(mouseY / 10)}px)`;

  window.requestAnimationFrame(loop);
};

loop();

window.addEventListener("mousemove", mouseFunc);
