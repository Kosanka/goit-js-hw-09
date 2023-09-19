import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import "flatpickr/dist/flatpickr.min.css";
import "notiflix/dist/notiflix-3.2.6.min.css";



const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const timer = document.querySelector('.timer .value');

const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');

let startDate = null;
let diffDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            Notify.failure("Please choose a date in the future");
            return;
        }
        startDate = selectedDates[0].getTime();
        startBtn.disabled = false;
        console.log(startDate);
        updateTimer(convertMs(startDate-Date.now()));
        return startDate;
  },
};

flatpickr(inputTime, options);

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
};

const pad = (value) => {
    return String(value).padStart(2, '0');
}

const updateTimer = ({ days, hours, minutes, seconds }) => {
    timerDays.textContent = pad(days);
    timerHours.textContent = pad(hours);
    timerMinutes.textContent = pad(minutes);
    timerSeconds.textContent = pad(seconds);
};

const startTimer = () => {
    diffDate = startDate - Date.now();
    inputTime.disabled = true;
    startBtn.disabled = true;
    Notify.info(`Start. Time left 
        ${convertMs(diffDate).days} :
        ${pad(convertMs(diffDate).hours)} :
        ${pad(convertMs(diffDate).minutes)} :
        ${timerSeconds.textContent}`); 
        
    
    const timerId = setInterval(() => {
    diffDate = startDate - Date.now();        
        if (diffDate <= 0) {
            Notify.success('Time is over');
            clearInterval(timerId);
            updateTimer(convertMs(0));
            inputTime.disabled = false;
            startBtn.disabled = false;
            return;
        };
        console.log(diffDate);
        updateTimer(convertMs(diffDate));
    },1000)
    
}

startBtn.addEventListener('click', startTimer);
