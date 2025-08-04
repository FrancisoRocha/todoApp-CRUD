
// RENDERIZADO DEL DIA Y MES
export const renderDate = () => {

    const day = document.querySelector('.title-day');
    const number = document.querySelector('.title-number');
    const month = document.querySelector('.title-month');

    const nowDay = new Date();

    //DIA DEL MES (1 - 31)
    const dayNumber = nowDay.getDate();

    //DIA SE LA SEMANA (0 - 6)
    const dayWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysWeeks = dayWeek[nowDay.getDay()];

    //MES DEL AÑO (0 - 11)
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthFullName = monthName[nowDay.getMonth()];

    day.textContent = daysWeeks;
    number.textContent = dayNumber;
    month.textContent = monthFullName;

}
