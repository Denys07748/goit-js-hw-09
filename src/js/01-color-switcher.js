const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let timerId = null;

btnStartEl.addEventListener('click', onStartChangeBgColor);
btnStopEl.addEventListener('click', onStopChangeBgColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onStartChangeBgColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartEl.disabled = true;
}

function onStopChangeBgColor() {
  btnStartEl.disabled = false;
  clearInterval(timerId);
}
