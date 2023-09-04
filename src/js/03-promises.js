
const Notiflix = require('notiflix');


const formRef = document.querySelector(".form")
formRef.addEventListener("input", saveValue)

const valueForm = {
    delay: null,
    amount: null,
    step: null,
}

//? Сохраняет значения инпутов

function saveValue(e) {

    e.preventDefault()

    valueForm.delay = +formRef.elements.delay.value
    valueForm.amount = +formRef.elements.amount.value
    valueForm.step = +formRef.elements.step.value
    
}

function createPromise(position, delay) {
  
  return new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;
    
        setTimeout(() => {
          if (shouldResolve) {
            resolve({ position, delay });
          } else {
            reject({ position, delay });
          }
        }, delay);
      });
}




//? Показываем уведомления по сабмиту
formRef.addEventListener("submit", showPromise)

function showPromise(e) {
  e.preventDefault()

  for (let i = 1; i < valueForm.amount; i++) {
     const currentDelay =  valueForm.delay + i * valueForm.step;
     createPromise(i, currentDelay)
  .then(({ position, delay }) => {
     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
     Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}







