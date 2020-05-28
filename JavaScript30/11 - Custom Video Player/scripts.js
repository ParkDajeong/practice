const video = document.querySelector("video");
const playBtn = document.querySelector(".toggle");
const progress = document.querySelector(".progress__filled");
const progressBar = document.querySelector(".progress");
const volumeBar = document.querySelector("input[name='volume']");
const speedBar = document.querySelector("input[name='playbackRate']");
const skipBtn = document.querySelectorAll("[data-skip]");

// 비디오 재생
function playVideo() {
    if(video.paused) {
        console.dir(video);
        video.play();
        playBtn.innerText = "❚❚"
    } else {
        video.pause();
        playBtn.innerText = "►"
    }
}

// 비디오 재생바
function showProgress(){
    const time = (video.currentTime / video.duration) * 100;
    progress.style.flexBasis = `${time}%`;
}

// 재생바 컨트롤
function handleProgress(e) {
    const scrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// 볼륨 조절
function controlVol() {
    video.volume = this.value;
}

// 속도 조절
function controlSpeed() {
    video.playbackRate = this.value;
}

// 건너뛰기
function skipVideo() {
    const skipSec = Number.parseInt(this.dataset.skip);
    video.currentTime = video.currentTime + skipSec;
}

video.addEventListener("click", playVideo);
video.addEventListener("timeupdate", showProgress);
playBtn.addEventListener("click", playVideo);
volumeBar.addEventListener("input", controlVol);
speedBar.addEventListener("input", controlSpeed);
skipBtn.forEach(btn => btn.addEventListener("click", skipVideo));

let mousedown = false;
progressBar.addEventListener("click", handleProgress);
progressBar.addEventListener("mousemove", (e) => mousedown && handleProgress(e));
progressBar.addEventListener("mousedown", () => mousedown = true);
progressBar.addEventListener("mouseup", () => mousedown = false);
