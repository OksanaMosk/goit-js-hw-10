import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';
import '../css/styles.css';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

startPage();
function startPage() {
  loaderEl.textContent = '';
  errorEl.style.display = 'none';
  divCatInfo.classList.add('box-hidden');
}

divCatInfo.classList.add('box-hidden');
selector.style.width = '565px';

selector.addEventListener('change', onSelectBreed);

// function onSelectBreed(event) {
//   loaderEl.classList.replace('is-hidden', 'loader');
//   selector.classList.add('is-hidden');
//   divCatInfo.classList.add('is-hidden');
//   divCatInfo.classList.add('box-hidden');

//   const breedId = event.currentTarget.value;

//   fetchCatByBreed(breedId)
//     .then(data => {
//       selector.classList.remove('is-hidden');
//       loaderEl.classList.replace('loader', 'is-hidden');
//       const { url, breeds } = data[0];
//       divCatInfo.innerHTML = `<div class="box"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
//       event.stopPropagation();
//       divCatInfo.classList.remove('is-hidden');
//       divCatInfo.classList.remove('box-hidden');
//       hiddenEl();
//       divCatInfo.classList.remove('hidden');
//     })
//     .catch(error => {
//       messageError();
//     });
// }

function onSelectBreed(event) {
  const breedId = event.currentTarget.value;

  if (breedId) {
    loaderEl.classList.replace('is-hidden', 'loader');
    selector.classList.add('is-hidden');
    divCatInfo.classList.add('is-hidden');
    divCatInfo.classList.add('box-hidden');

    fetchCatByBreed(breedId)
      .then(data => {
        selector.classList.remove('is-hidden');
        loaderEl.classList.replace('loader', 'is-hidden');
        divCatInfo.classList.remove('is-hidden');
        divCatInfo.classList.remove('box-hidden');
        const { url, breeds } = data[0];
        divCatInfo.innerHTML = `<div class="box"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
        hiddenEl();
      })
      .catch(error => {
        messageError();
      });
  }
}
function hiddenEl() {
  errorEl.style.display = 'none';
  loaderEl.textContent = '';
}

function messageError() {
  hiddenEl();
  loaderEl.classList.replace('loader', 'is-hidden');
  divCatInfo.classList.add('box-hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!',
    {
      timeout: 2000,
    }
  );
}

let arrBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    divCatInfo.classList.add('box-hidden');
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
    selector.classList.remove('hidden');
  })
  .catch(error => {
    messageError();
  });
