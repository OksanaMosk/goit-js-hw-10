import axios from 'axios';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement',
  settings: {
    allowDeselect: document.getElementById('div.cat-info'),
  },
});

BASE_URL = `https://api.thecatapi.com/v1/breeds`;
axios.defaults.headers.common['x-api-key'] =
  'live_Z0UHJxttXDpi84D6XggncnWBSjuu0VNSoSROyArWqIofjKLv9bkMBKAH7wCjVcZ6';

const refs = {
  container: document.querySelector('.cat-info'),
};

fetch('https://api.thecatapi.com/v1/images/0XYvRd7oD')
  .then(response => {
    return response.json();
  })
  .then(cat => {
    breed_ids = cat.id;
    const murkup = breed_ids;
    console.log(cat);
    refs.container.innerHTML = murkup;
  })
  .catch(error => {
    console.log(error);
  });

const breedSelectEl = document.querySelector('#allowDeselect');

const fetchBreeds = event => {
  event.preventDefault();
  console.log(event);
};

breedSelectEl.addEventListener('select', fetchBreeds);
