/**
 * @file Manages createDays module, used to create days property the
 * class Month.
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createDays()` function returns a object array. The value of the
 * returned elements is the same `Date.prototype.getDate()`, that represent the
 * month's days that it is holidays.
 *
 * The function requires an parameter `options`, must be an object with the
 * properties `YYMMDD`, `SCE`, `weekends`, `nonworkdays` and `planner`.
 *
 * The `options.YYMMDD` value must be a number array with three elements, that
 * represents a date (year, month and day). The value of the month is as
 * `Date.prototype.getDate()`.
 *
 * The `options.SCE` value must be a number array with three elements. The array
 * values represent the month's start day, month's current day and month's end
 * day. The value of the elements is like `Date.prototype.getDate()`.
 *
 * The `options.weekends` value must be a number array, that represents the
 * days of the month that are weekends. The values are like
 * `Date.prototype.getDate()`.
 *
 * The `options.nonworkdays` value must be a number array, that represents the
 * days of the month that are non workdays. The values are like
 * `Date.prototype.getDate()`.
 *
 * The `options.planner` value must be an object with the properties `tasks`,
 * `events`, `appointments` and `meetings`, that represent scheduled activities
 * of datebook.
 *
 * @param     {object} options - Function options.
 * @param     {Array.<number>} options.YYMMDD - A number array with three elements.
 * @param     {Array.<number>} options.SCE - A number array with three elements.
 * @param     {Array.<number>} options.weekends - A number array.
 * @param     {Array.<number>} options.nonworkdays - A number array.
 * @param     {Array.<number>} options.planner - A object.
 * @returns   {Array.<object>} An object array.
 * @private
 * @example const days = createDays({ weekends, holidays });
 *
 */
const createDays = ({ YYMMDD, SCE, weekends, nonworkdays, planner }) => {
  const [YY, MM] = YYMMDD;
  const [start, current, end] = SCE;
  const { tasks, events, appointments, meetings } = planner;
  const days = [];
  const temporary = new Date(YY, MM, 1);

  // » first weekday of month
  const first = temporary.getDay();
  let week = first === 0 ? 0 : 1;
  let workday = 0;
  for (let idx = start; idx <= end; idx += 1) {
    temporary.setDate(idx);

    const isWorkday = !nonworkdays.includes(idx);
    const isWeekend = weekends.includes(idx);
    const weekday = temporary.getDay();

    const type = idx < current ? 'elapsed' : idx === current ? 'current' : 'remaining'; // eslint-disable-line no-nested-ternary
    const TASKS = tasks.filter(item => item.YYMMDD[2] === idx).length;
    const EVENTS = events.filter(item => item.YYMMDD[2] === idx).length;
    const APPOINTMENTS = appointments.filter(item => item.YYMMDD[2] === idx).length;
    const MEETINGS = meetings.filter(item => item.YYMMDD[2] === idx).length;
    const TOTAL = TASKS + EVENTS + APPOINTMENTS + MEETINGS;
    const scheduled = {
      tasks: TASKS,
      events: EVENTS,
      appointments: APPOINTMENTS,
      meetings: MEETINGS,
      total: TOTAL,
    };

    if (weekday === 0) {
      week += 1;
    }

    if (isWorkday) {
      workday += 1;
    }

    const day = {
      day: idx,
      date: [YY, MM, idx],
      weekday,
      type,
      week,
      workday,
      isWorkday,
      isWeekend,
      scheduled,
    };
    days.push(day);
  }
  return days;
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = createDays;
