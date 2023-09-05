import axios from 'axios';
import SlimSelect from 'slim-select';

new SlimSelect({
  select: '#selectElement',
  settings: {
    allowDeselect: true,
  },
});

const url = `https://api.thecatapi.com/v1/images/search`;
axios.defaults.headers.common['x-api-key'] =
  'live_Z0UHJxttXDpi84D6XggncnWBSjuu0VNSoSROyArWqIofjKLv9bkMBKAH7wCjVcZ6';

fetch('https://api.thecatapi.com/v1/breeds')
  .then(response => {
    return response.json();
  })
  .then(cats => {
    console.log(cats);
  })
  .catch(error => {
    console.log(error);
  });
