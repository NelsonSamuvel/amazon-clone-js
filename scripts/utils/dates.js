import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

function isWeekend(dateObj) {
  const day = dateObj.format("dddd");
  return day === "Saturday" || day === "Sunday";
}

export function formatDate(days) {
  let remainingDays = days;

  let today = dayjs();
  while (remainingDays > 0) {
    today = today.add(1, "day");
    if (!isWeekend(today)) {
      remainingDays--;
    }
  }
  return today.format("dddd, MMMM D");
  
}


export function formatOrderDate(orderTime){
  let day = dayjs(orderTime);
  day = day.format('MMMM, DD');
  return day;
}
