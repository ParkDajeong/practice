const img = document.querySelector("img");
const hl = document.querySelector(".hl");
const spacing = document.querySelector("#spacing");
const blurBar = document.querySelector("#blur");
const base = document.querySelector("#base");

const changeImgDeco = function() {
    const space = spacing.value;
    const color = base.value;
    const blur = blurBar.value;

    hl.style.color = color;
    img.style.border = `${space}px solid ${color}`;
    img.style.filter = `blur(${blur}px)`
}

window.addEventListener("input", changeImgDeco);
changeImgDeco();
