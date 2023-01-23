import Notiflix from 'notiflix';

const refForm = document.querySelector('.form');
refForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  const delayStep = Number(step.value);
  const quantity = Number(amount.value);
  let firstDelay = Number(delay.value);

  for (let position = 1; position <= quantity; position += 1) {
    const delay = (firstDelay += position === 1 ? 0 : delayStep);

    createPromise({ position, delay })
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}