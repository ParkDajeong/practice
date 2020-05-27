const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const clear = document.getElementById("clear");

// 단순히 크기만이 아닌 캔버스의 해상도를 늘려줘야 함
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 100;
ctx.lineCap = "round";

let startX = 0, startY = 0;
let isDrawing = false;
let hue = 0;
// lineWidth의 값을 늘릴지, 줄일지를 결정하는 boolean 값
let direction = true;

const drawLine = (curX, curY) => {
    // strokeStyle : 도형의 윤곽선 색을 설정한다.
    // 색상 표현 방법 관련
    // http://tcpschool.com/css/css3_module_colors
    // beginPath() : 새로운 경로 생성한다.
    // moveTo(x, y) : 포인트를 지정한 (x, y) 좌표로 이동한다.
    // lineTo(x, y) : 현재 좌표(moveTo())에서 지정한 (x, y) 좌표까지 선을 그린다.
    // stroke() : 선을 이용하여 도형을 그린다.(마무리 느낌)
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(curX, curY);
    ctx.stroke();

    hue++;
    if(hue >= 360) hue = 0;

    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      direction = !direction;
    }

    if(direction) {
      ctx.lineWidth++;
    } else {
      ctx.lineWidth--;
    }
};

const startDrawing = (e) => {
    isDrawing = true;
    startX = e.﻿clientX;
    startY = e.﻿clientY;
};

const drawing = (e) => {
    if(!isDrawing) return;

    const curX = e.﻿clientX;
    const curY = e.﻿clientY;
    drawLine(curX, curY);
    startX = curX;
    startY = curY;
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => isDrawing = false);
clear.addEventListener("click", ()=> {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
