/*
** 오디오 출력 - 다정
**

var playSound = function(e) {
    var keyCode = e.keyCode;
    var key = document.querySelector(".key[data-key='" + keyCode + "']");
    var audio = document.querySelector("audio[data-key='" + keyCode + "']");

    audio.play();
    key.classList.add("playing", "sound");
}

window.addEventListener("keydown", playSound);

**
*/

// 오디오 출력
var playSound = function(e) {
    var keyCode = e.keyCode;
    var key = document.querySelector(".key[data-key='" + keyCode + "']");
    var audio = document.querySelector("audio[data-key='" + keyCode + "']");

    // audio가 없는 경우, 함수를 빠져나간다.
    if(!audio) return;

    audio.play();
    // currentTime 속성은 오디오(비디오)의 현재 위치를 설정하거나 반환한다.
    // 이 속성을 설정하면 재생이 지정된 위치로 이동한다.
    // currentTime = 0 은 처음으로 이동하는 것.
    audio.currentTime = 0;
    key.classList.add("playing");
}

// 변화된 css 초기화
var removeTransition = function(e) {
    if(!e.target.classList.contains("playing")) return;
    e.target.classList.remove("playing");
}

var keys = document.querySelectorAll(".key");

for(var i=0; i<keys.length; i++) {
    keys[i].addEventListener("transitionend", removeTransition);
}
window.addEventListener("keydown", playSound);
