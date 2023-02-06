import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  const delay = +formElements.delay.value;
  const step = +formElements.step.value;
  const amount = +formElements.amount.value;

  const formData = {
    delay,
    step,
    amount,
  };

  generatePromise(formData);
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

function generatePromise({ delay, step, amount }) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(result => {
        Notify.success(result);
      })
      .catch(error => {
        Notify.failure(error);
      });
    delay += step;
  }
}
