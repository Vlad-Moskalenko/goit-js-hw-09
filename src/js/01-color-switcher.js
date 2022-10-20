const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyBgColor = document.body.style;

let timeoutID;

window.addEventListener('load', () => stopBtn.setAttribute('disabled', 'disabled'))
startBtn.addEventListener('click', onStartBtnClick)
stopBtn.addEventListener('click', onStopBtnClick)

function onStartBtnClick() {
  timeoutID = setInterval(changeBodyBg, 1000)

  setRemoveDisabledAttr(startBtn, stopBtn)
}

function onStopBtnClick() {
  clearInterval(timeoutID)

  setRemoveDisabledAttr(stopBtn, startBtn)
}

function setRemoveDisabledAttr(setBtn, removeBtn) {
  setBtn.setAttribute('disabled', 'disabled')
  removeBtn.removeAttribute('disabled')
}

function changeBodyBg(){
  bodyBgColor.backgroundColor = getRandomHexColor()
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
