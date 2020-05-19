/*
 * ES5로 구현
var showCurrentTime = function() {
    var hourHand = document.querySelector(".hour-hand");
    var minHand = document.querySelector(".min-hand");
    var secHand = document.querySelector(".second-hand");

    var now = new Date();
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    if(h>12) h = h - 12;

    //애초에 바늘 위치가 -90도 이므로 +90을 해준다.
    var hourDeg = (h * 30) + (m * 0.5) + 90;
    var minDeg = (m * 6) + 90;
    var secDeg = (s * 6) + 90;

    //console.log("시 :", h, " 분: ", m, " 초: ", s);

    hourHand.style.transform = "rotate(" + hourDeg + "deg)";
    minHand.style.transform = "rotate(" + minDeg + "deg)";
    secHand.style.transform = "rotate(" + secDeg + "deg)";
}
*/

///////////////////////// ES6로 변환하기 /////////////////////////

const hourHand = document.querySelector(".hour-hand");
const minHand = document.querySelector(".min-hand");
const secHand = document.querySelector(".second-hand");

const showCurrentTime = () => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    if(h>12) h = h - 12;

    const hourDeg = h*30 + m*0.5 + 90;
    const minDeg = m*6 + 90;
    const secDeg = s*6 + 90;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minHand.style.transform = `rotate(${minDeg}deg)`;
    secHand.style.transform = `rotate(${secDeg}deg)`;
}

// setInterval()은 일정한 시간을 간격으로 코드를 반복 실행
// setTimeout()은 지정한 시간이 지난 후에 딱 한번 코드 호출
window.setInterval(showCurrentTime, 1000);
