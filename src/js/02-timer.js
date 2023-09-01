// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';

// document.addEventListener('DOMContentLoaded', options);

// let isTimeDeferense = 0;
// let date = 0;

// const linkRefs = {
//   days: document.querySelector('[data-days]'),
//   hours: document.querySelector('[data-hours]'),
//   minutes: document.querySelector('[data-minutes]'),
//   seconds: document.querySelector('[data-seconds]'),
//   btnStart: document.querySelector('[data-start]'),
//   setId: null,
//   ifClickStart: false,
// };

// const option = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   minDate: 'today',
//   onClose(selectedDates) {
//     const chosenDate = new Date(selectedDates[0]);
//     const nowCurrentDate = new Date();
//     date = mathTime(chosenDate, nowCurrentDate);

//     if (date < 0) {
//       window.alert('Выберите будущую дату и время.');
//       return;
//     } else if (date > 0) {
//       linkRefs.btnStart.classList.remove('js-pointer');
//       linkRefs.btnStart.addEventListener('click', () => {
//         linkRefs.setId = setInterval(() => {
//           const currentDate = new Date();
//           isTimeDeferense = mathTime(chosenDate, currentDate);

//           startTimer(isTimeDeferense);
//           checkEndTimer();
//           console.log("psps");
//         }, 1000);
//       });
//     }
//   },
// };

// // Считает разницу между датами
// function mathTime(after, now) {
//   return after - now;
// }

// // Добавляет опции библиотеки
// function options() {
//   flatpickr('#datetime-picker', option);
// }

// // Функция присвоения значений в HTML
// function startTimer(timeParam) {
//   const days = Math.floor(timeParam / (1000 * 60 * 60 * 24));
//   const hours = Math.floor(
//     (timeParam % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutes = Math.floor((timeParam % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeParam % (1000 * 60)) / 1000);

//   linkRefs.days.textContent = addLeadingZero(days);
//   linkRefs.hours.textContent = addLeadingZero(hours);
//   linkRefs.minutes.textContent = addLeadingZero(minutes);
//   linkRefs.seconds.textContent = addLeadingZero(seconds);
// }

// // Функция добавления ведущего нуля, если значение меньше 10
// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// // Функция проверки на конец таймера
// function checkEndTimer() {
//   if (
//     linkRefs.days.textContent === '00' &&
//     linkRefs.hours.textContent === '00' &&
//     linkRefs.minutes.textContent === '00' &&
//     linkRefs.seconds.textContent === '00'
//   ) {
//     clearInterval(linkRefs.setId);
//   }
// }

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

document.addEventListener('DOMContentLoaded', initialize);

let countdownInterval = null;
let selectedDate = null;
let ifClickStart = false;

const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
};

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: 'today',
  onClose(selectedDates) {
    selectedDate = new Date(selectedDates[0]);
    const now = new Date();

    if (selectedDate <= now) {
      window.alert('Выберите будущую дату и время.');
      return;
    }

    elements.btnStart.classList.remove('js-pointer');
    elements.btnStart.addEventListener('click', startCountdown);
  },
};

function initialize() {
  flatpickr('#datetime-picker', flatpickrOptions);
}

function startCountdown() {
  clearInterval(countdownInterval);
  
ifClickStart = true;  
  if (ifClickStart) {
    elements.btnStart.removeEventListener("submit", startCountdown)
    elements.btnStart.classList.add('js-pointer');
  } // Удаление обработчика событий

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0, 0, 0, 0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimer(days, hours, minutes, seconds) {
  elements.days.textContent = addLeadingZero(days);
  elements.hours.textContent = addLeadingZero(hours);
  elements.minutes.textContent = addLeadingZero(minutes);
  elements.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
