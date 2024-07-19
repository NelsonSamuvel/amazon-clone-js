import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function formatDate(days){
    const today = dayjs();
    const deliveryDay = today.add(days, 'days');
    return deliveryDay.format('dddd, MMMM D');
}