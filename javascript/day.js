
export default function isWeekend (date) {
    date = date.format('dddd');
    return date === 'Saturday' || date === 'Sunday';
}