import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Дополнительный импорт стилей
import "notiflix/dist/notiflix-3.2.6.min.css";


const refs = {
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
}


const setAttributes = (el, attrs) => {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};
setAttributes(refs.inputDelay, {'step':'100', 'min':'0'});
setAttributes(refs.inputStep, { 'step': '100', 'min': '0' });
setAttributes(refs.inputAmount, { 'min': '0' });

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      };
    }, delay);
  });
};
  
const resolvePromise = (result) => {
  if (!result) 
    return;
  const { position, delay } = result; 
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
const rejectPromise = (result) => {
  if (!result) 
    return;
  const { position, delay } = result; 
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
   
refs.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const values = { 
    delay: +e.target.delay.value,
    step: +e.target.step.value,
    amount: +e.target.amount.value,
  };
  
  startCreatePromisesHandler(values);

  console.log(values);
})

const startCreatePromisesHandler = ({ delay, step, amount }) => {
  const promises = [];
  for (let i = 0; i < amount; i += 1) {
    createPromise(i+1,delay).then(resolvePromise).catch(rejectPromise);
    delay += step;   
  };
};