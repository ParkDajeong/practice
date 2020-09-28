const h1 = document.querySelector("h1");
const cursorItem = document.querySelector(".cursor_item");
let x = 0;
let y = 0;
let mouseX = 0;
let mouseY = 0;
const speed = 0.05;

function mouseFunc(e) {
  x = e.clientX;
  y = e.clientY;
  h1.innerText = `x: ${x}, y: ${y}`;
  cursorItem.style.transform = `translate(${x}px, ${y}px)`;
}

window.addEventListener("click", mouseFunc);
// window.addEventListener("mousemove", mouseFunc);
// loop();

function loop() {
  // 공식과도 같대.
  mouseX += (x - mouseX) * speed;
  mouseY += (y - mouseY) * speed;
  cursorItem.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

  // requestAnimationFrame(): 자연스러운 움직임이 필요할 때 주로 사용됨.
  // 모션울 주거나 컨텐츠를 만들 때, 많이 사용한다.
  window.requestAnimationFrame(loop);
}
