const cursorItem = document.querySelector(".cursorItem");
const circle = document.querySelector(".circle");
const btnYes = document.querySelector("#yes");
const btnNo = document.querySelector("#no");
let x = 0;
let y = 0;
let mouseX = 0;
let mouseY = 0;
const speed = 0.1;

const mouseFunc = (e) => {
  x = e.clientX;
  y = e.clientY;
};

const loop = () => {
  mouseX += (x - mouseX) * speed;
  mouseY += (y - mouseY) * speed;

  cursorItem.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

  window.requestAnimationFrame(loop);
};
loop();

// Mouse Move
window.addEventListener("mousemove", mouseFunc);

// Yes Button In-Out
btnYes.addEventListener("mouseover", () => {
  circle.style.transform = "scale(.3)";
});
btnYes.addEventListener("mouseout", () => {
  circle.style.transform = "scale(1)";
});

// No Button In-Out
btnNo.addEventListener("mouseover", () => {
  circle.style.transform = "scale(.3)";
});
btnNo.addEventListener("mouseout", () => {
  circle.style.transform = "scale(1)";
});
