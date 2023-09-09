import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import 'slim-select/dist/slimselect.css';
import './styles.css';

const selector = document.querySelector('.breed-select');
const divCatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
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
  loader.classList.replace('is-hidden', 'loader');
  selector.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');
  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'is-hidden');
      selector.classList.remove('is-hidden');
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
      divCatInfo.classList.remove('is-hidden');
      hiddenEl();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function hiddenEl() {
  error.style.display = 'none';
  loader.textContent = '';
}

function onFetchError(error) {
  selector.classList.remove('is-hidden');
  loader.classList.replace('loader', 'is-hidden');
}
// лишнє
// const renderBreedsSelect = breeds => {
//   const markup = breeds
//     .map(breed => {
//       return `<option value="${breed.reference_image_id}">${breed.name}</option>`;
//     })
//     .join('');
//   breedSelect.insertAdjacentHTML('beforeend', markup);

//   new SlimSelect({
//     select: '#single',
//   });
// };

// const fetchAndRenderBreeds = () => {
//   loaderEl.classList.remove('unvisible');
//   fetchBreeds()
//     // .then(breeds => console.log(breeds))
//     .then(breeds => renderBreedsSelect(breeds))
//     .catch(error => {
//       console.log(error);
//       Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page!'
//       );
//     })
//     .finally(() => {
//       loaderEl.classList.add('unvisible');
//       breedSelect.classList.remove('unvisible');
//     });
// };
