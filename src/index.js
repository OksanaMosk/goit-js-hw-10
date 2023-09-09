import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';
import './styles.css';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

errorEl.style.display = 'none';
loaderEl.textContent = '';
loaderEl.classList.replace('loader', 'is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      data: arrBreedsId,
    });
  })
  .catch(onFetchError);

selector.style.width = '565px';
selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {
  loaderEl.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  function hiddenEl() {
    errorEl.style.display = 'none';
    loaderEl.textContent = '';
  }

  fetchCatByBreed(breedId)
    .then(data => {
      selector.classList.remove('is-hidden');
      loaderEl.classList.replace('loader', 'is-hidden');
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      divCatInfo.classList.remove('is-hidden');
      hiddenEl();
    })
    .catch(error => {
      errorEl.style.display = 'none';
      loaderEl.textContent = '';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page! BUT Homework is already accepted. 😉 ',
        {
          timeout: 2000,
        }
      );
    });
}

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loaderEl.classList.replace('loader', 'is-hidden');
}
