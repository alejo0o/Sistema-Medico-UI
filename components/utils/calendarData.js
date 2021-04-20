import {
  endOfMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  addDays,
} from 'date-fns';

function takeWeek(start = new Date()) {
  let date = startOfWeek(startOfDay(start), { weekStartsOn: 1 });

  return function () {
    const week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };
}

export function takeMonth(start = new Date()) {
  let month = [];
  let date = start;

  function lastDayOfRange(range) {
    return range[range.length - 1][6];
  }

  return function () {
    const weekGen = takeWeek(startOfMonth(date));
    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGen());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };
}
export function allDays(start = new Date()) {
  const data = takeMonth(start)();
  const all_days = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      all_days.push(data[i][j]);
    }
  }
  return all_days;
}
