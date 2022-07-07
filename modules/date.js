import { DateTime } from './luxon.js';

const displayDateTime = () => {
  const date = document.querySelector('.datetime');
  const today = DateTime.fromISO('2017-05-15T08:30:00');
  date.innerHTML = today;
};

export default displayDateTime;