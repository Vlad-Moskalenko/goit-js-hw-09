import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.js";

const startBtn = document.querySelector("[data-start]");
const timerItemsEl = document.querySelectorAll('.value');

let selectedData;
let timeoutID;

startBtn.setAttribute("disabled", "disabled")

startBtn.addEventListener('click', onStartBtnClick)

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] < Date.now()) Notify.failure("Please choose date in the future")
    if (selectedDates[0] > Date.now()) {
      selectedData = selectedDates[0]
      startBtn.removeAttribute("disabled")
    }
  },
});

function onStartBtnClick() {
  startBtn.setAttribute("disabled", "disabled");

  timeoutID = setInterval(onTimerStart, 1000)
}

function onTimerStart() {
  const timerTime = convertMs(selectedData - Date.now())

  if(timerTime.every(item => item == 0)) timeEnds()

  timerItemsEl.forEach((el, ind) => el.innerHTML = addLeadingZero(timerTime[ind]))
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0')
}

function timeEnds() {
  clearInterval(timeoutID)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return [ days, hours, minutes, seconds ];
}
