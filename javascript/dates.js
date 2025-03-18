import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import isSatSun from './day.js';

const today = dayjs();
const newDate = today.subtract('1', 'month');

const randomDate = dayjs();

console.log(isSatSun(randomDate.add(2, 'day')));
