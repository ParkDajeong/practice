const coordinates = document.querySelector(".coordinates");
const horozontal = document.querySelector(".horozontal");
const vertical = document.querySelector(".vertical");

function moveImgage(e) {
  const img = document.querySelector("img");
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  img.style.left = `${mouseX}px`;
  img.style.top = `${mouseY}px`;

  coordinates.textContent = `(${mouseX}px, ${mouseY}px)`;
  coordinates.style.left = `${mouseX}px`;
  coordinates.style.top = `${mouseY}px`;

  horozontal.style.top = `${mouseY}px`;
  vertical.style.left = `${mouseX}px`;
}

document.addEventListener("mousemove", moveImgage);
