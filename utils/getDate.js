function handleMonthNavigation(currentDate, calenderNavigation) {
  if (calenderNavigation === "prev") {
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else if (calenderNavigation === "next") {
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  
  return currentDate;
}

function handleWeekNavigation(currentDate, calenderNavigation) {
  if (calenderNavigation === "prev") {
    currentDate.setDate(currentDate.getDate() - 7);
  } else if (calenderNavigation === "next") {
    currentDate.setDate(currentDate.getDate() + 7);
  }
  return currentDate;
}

export function getCalenderDays(view, calenderNavigation, currentDate) {
  currentDate = new Date(currentDate);

  if (view === "month") {
    currentDate = new Date(
      handleMonthNavigation(currentDate, calenderNavigation)
    );
  } else if (view === "week") {
   return getDatesForCurrentWeek(currentDate, calenderNavigation);
  }

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const prevMonth = new Date(currentYear, currentMonth, 0);

  let totalPrevMonthDays = firstDayOfMonth.getDay();
  const calenderDays = [];
  for (let i = 0; i < totalPrevMonthDays; i++) {
    calenderDays.unshift({ current: false, Date: new Date(prevMonth) });
    prevMonth.setDate(prevMonth.getDate() - 1);
  }

  while (firstDayOfMonth <= lastDayOfMonth) {
    calenderDays.push({ current: true, Date: new Date(firstDayOfMonth) });
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }
  totalPrevMonthDays = lastDayOfMonth.getDay();
  for (let i = 0; i < 7 - totalPrevMonthDays - 1; i++) {
    calenderDays.push({ current: false, Date: new Date(firstDayOfMonth) });
    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
  }

  return calenderDays;
}

export function getMonthNameAndYear(month, year) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month]} ${year}`;
}

export function getWeekNameAndDate(datesInWeek) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = datesInWeek.getDate();

  const Day = days[datesInWeek.getDay()];
  return `${startDate} - ${Day}`;

}


export function getDatesForCurrentWeek(currentDate, calenderNavigation = "current") {
  
  const today = new Date(handleWeekNavigation(currentDate, calenderNavigation));
  
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(today); // Copy current date
  const endOfWeek = new Date(today); // Copy current date

  startOfWeek.setDate(today.getDate() - currentDay ); // Set to Monday of current week
  endOfWeek.setDate(today.getDate() + (7 - currentDay-1)); // Set to Sunday of current week

  const datesInWeek = [];
  for (let d = startOfWeek; d <= endOfWeek; d.setDate(d.getDate() + 1)) {
    datesInWeek.push({
      current: true,
      Date: new Date(d),
    });
  }
 
  return datesInWeek;
}
