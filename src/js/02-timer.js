import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  dataTime: document.querySelector('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const timer = {
  intervalId: null,

  start(finalTime) {
    this.reset();
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = finalTime - currentTime;

      if (deltaTime <= 0) {
        this.reset();
        return;
      }

      updateTimerFace(convertMs(deltaTime));
    }, 1000);

    refs.startBtn.disabled = true;
  },

  reset() {
    clearInterval(this.intervalId);
  },
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate > selectedDates[0]) {
      Notify.failure('Please choose a date in the future');

      refs.startBtn.disabled = true;
      timer.reset();
    } else {
      timer.reset();
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', () =>
        timer.start(selectedDates[0])
      );
      console.log(selectedDates[0]);
    }
  },
};

refs.startBtn.disabled = true;

flatpickr('#datetime-picker', options);

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
