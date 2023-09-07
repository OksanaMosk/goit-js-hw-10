import axios from 'axios';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement',
  settings: {
    allowDeselect: document.getElementById('div.cat-info'),
  },
});

BASE_URL = `https://api.thecatapi.com/v1/`;
axios.defaults.headers.common['x-api-key'] =
  'live_Z0UHJxttXDpi84D6XggncnWBSjuu0VNSoSROyArWqIofjKLv9bkMBKAH7wCjVcZ6';

const refs = {
  containerCatInfo: document.querySelector('.cat-info'),
};

fetchBreeds();
function fetchBreeds() {
  fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.json();
    })
    .then(fetchCatByBreed)

    .catch(error => {
      console.log(error);
    });
}

fetchCatByBreed();
const breedId = e.currentTarget.value;
function fetchCatByBreed(breedId) {
   .then(data => {
   const { url, breeds } = data[0];
        return (refs.containerCatInfo.innerHTML = `<div class="cat"><img src = "${url} " alt = "${breeds[0].name}"></div>
      <div><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><b>Temperament:</b>${breeds[0].temperament}</p></p</div>>`);
   }
  )
  .catch(onFetchError);
     } 

// fetchBreeds().then(data => {
//   data.forEach(element => {
//     arrBreedsId.push({ text: element.name, value: element.id });
//     console.log(arrBreedsId);
//   });
//   new SlimSelect({
//     select: selector,
//     data: arrBreedsId,
//   });
// });
// const breedSelectEl = document.querySelector('#allowDeselect');

// fetchBreeds = event => {
//   event.preventDefault();
//   console.log(event);
// };

// breedSelectEl.addEventListener('select', fetchBreeds);
