const coordinates = document.querySelector(".coordinates");
const horozontal = document.querySelector(".horozontal");
const vertical = document.querySelector(".vertical");
const target = document.querySelector(".target");
const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;

console.log(targetRect);
console.log(targetHalfWidth, targetHalfHeight);

function moveImgage(e) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  horozontal.style.transform = `translateY(${mouseY}px)`;
  vertical.style.transform = `translateX(${mouseX}px)`;

  target.style.transform = `translate(${mouseX - targetHalfWidth}px, ${mouseY - targetHalfHeight}px)`;

  coordinates.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  coordinates.textContent = `(${mouseX}px, ${mouseY}px)`;
}

document.addEventListener("mousemove", moveImgage);
