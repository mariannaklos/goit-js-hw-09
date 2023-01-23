import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');
const refDivTimer = document.querySelector('.timer');
const refDivFields = document.querySelectorAll('.field');

input.style.borderRadius = '3px';
btn.style.borderRadius = '4px';
btn.style.backgroundColor = '#2196f3';
btn.style.color = 'white';
refDivTimer.style.display = 'flex';
refDivTimer.style.justifyContent = 'space-evenly';
refDivTimer.style.marginTop = '350px';
refDivTimer.style.fontSize = '45px';
refDivTimer.style.fontWeight = '600';
refDivFields.forEach(field => {
  field.style.display = 'inline-grid';
  field.style.justifyItems = 'center';
});

btn.addEventListener('click', onStartTimer);
btn.setAttribute('disabled', true);

let time = null;
let timerObj = {};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    time = selectedDates[0].getTime();

    if (selectedDates[0].getTime() + 60000 < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btn.setAttribute('disabled', true);
    } else {
      btn.removeAttribute('disabled', false);
    }
  },
};

flatpickr(input, options);

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

  timerObj = { days, hours, minutes, seconds };

  return timerObj;
}

function onStartTimer() {
  timerId = setInterval(() => {
    if (time - new Date() <= 0) {
      clearInterval(timerId);
      return;
    }

    if (time - new Date() > 0) {
      btn.setAttribute('disabled', true);
    }

    convertMs(time - new Date());
    console.log(time - new Date());

    spanDays.textContent = addLeadingZero(`${timerObj.days}`);
    spanHours.textContent = addLeadingZero(`${timerObj.hours}`);
    spanMinutes.textContent = addLeadingZero(`${timerObj.minutes}`);
    spanSeconds.textContent = addLeadingZero(`${timerObj.seconds}`);
  }, 1000);
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}