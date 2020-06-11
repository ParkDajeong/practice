"use strict!";
const pageBtn = document.querySelectorAll(".first .dot");

function moveSlide01() {
  const imgList = document.querySelector(".first .imgList");
  const width = imgList.offsetWidth;
  const idx = this.dataset.slide;

  pageBtn.forEach((el) => el.classList.remove("active"));
  this.classList.add("active");
  imgList.style.transform = `translateX(-${width * idx}px)`;
}

pageBtn.forEach((el) => el.addEventListener("click", moveSlide01));
pageBtn[0].click();

///////////////////////////////////////////////////////////////////////
const arrowBtns = document.querySelectorAll(".second .btn");
const imgList = document.querySelector(".second .imgList");

const firstClone = imgList.firstElementChild.cloneNode(true);
const lastClone = imgList.lastElementChild.cloneNode(true);
imgList.prepend(lastClone);
imgList.append(firstClone);

const width = imgList.firstElementChild.offsetWidth;
imgList.style.transform = `translateX(-${width}px)`;

let curIndex = 1;

function moveSlide02() {
  const move = parseInt(this.dataset.move);
  const imgs = imgList.querySelectorAll("li");

  curIndex += move;
  imgList.style.transform = `translateX(-${width * curIndex}px)`;
  if (curIndex >= imgs.length - 1) {
    curIndex = 1;
    setTimeout(() => {
      imgList.style.transition = "all 0s";
      imgList.style.transform = `translateX(-${width * curIndex}px)`;
    }, 10);
  } else if (curIndex <= 0) {
    curIndex = imgs.length - 2;
    setTimeout(() => {
      imgList.style.transition = "all 0s";
      imgList.style.transform = `translateX(-${width * curIndex}px)`;
    }, 10);
  }
}

arrowBtns.forEach((el) => el.addEventListener("click", moveSlide02));

///////////////////////////////////////////////////////////////////////////////

const thList = document.querySelector(".third .imgList");
const pages = document.querySelectorAll(".third .page");

function controlPagination() {
  console.log(this);
}

pages.forEach((elem) => elem.addEventListener("click", controlPagination));
