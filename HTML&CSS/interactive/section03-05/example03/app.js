const progressBar = document.querySelector(".progress-bar");
let scrollTop = 0;

const fillProgressBar = () => {
  scrollTop = document.documentElement.scrollTop;
  const per = Math.floor((scrollTop / document.body.scrollHeight) * 100);

  progressBar.style.width = `${per}%`;
};

window.addEventListener("scroll", fillProgressBar);
