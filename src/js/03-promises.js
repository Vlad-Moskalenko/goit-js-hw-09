import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.5.min.js";

const formEl = document.querySelector('.form')
const submitBtn = formEl.querySelector('button')

submitBtn.addEventListener('click', onSubmitBtnClick)

function onSubmitBtnClick(e) {
  e.preventDefault()
  const amount = +formEl.elements.amount.value;
  const step = +formEl.elements.step.value;
  let delay = +formEl.elements.delay.value;

  for (let i = 1; i <= amount; i++){
    createPromise(i, delay).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });

    delay += step;
   }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay);
  });
}
