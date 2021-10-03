/**
 * @file Manages createSummary module, used to create summary property the
 * class Month.
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createSummary()` funtion returns an `object` with month's information,
 * month's summary, month's work days summary, month's weeks summary, month's
 * days summary and month's dates summary.
 *
 * The function requires an parameter `options`, must be an object with the
 * properties `YYMMDD` and `nonworkdays`.
 *
 * The `options.YYMMDD` value must be a number array with three elements, that
 * represents a date (year, month and day). The value of the month is as
 * `Date.prototype.getDate()`.
 *
 * The `options.nonworkdays` value must be a number array, that represent the
 * month's non-working days.
 *
 * @private
 * @param   {object} options - Function options.
 * @param   {Array.<number>} options.YYMMDD  - An array with three numeric items.
 * @param   {Array.<number>} options.nonworkdays - An array with numeric items.
 * @returns {object} An object with month's information.
 * @example const summary = createSummary({
 *   YYMMDD: [2021, 4, 25],
 *   nonworkdays: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
 * });
 *
 */
const createSummary = ({ YYMMDD, nonworkdays }) => {
  const [YY, MM, DD] = YYMMDD;

  // DATES
  const startMonth = new Date(YY, MM, 1);
  const currentMonth = new Date(YY, MM, DD);
  const endMonth = new Date(YY, MM + 1, 0);

  // DAYS
  const currentDay = currentMonth.getDate();
  const totalDays = endMonth.getDate();
  const elapsedDays = currentDay - 1;
  const remainingDays = totalDays - currentDay;
  const percentageDays = parseFloat((currentDay / totalDays).toFixed(2));

  // TEMPORARY
  const temporary = new Date(YY, MM, 1);
  const firstWeekday = startMonth.getDay();
  const startINSunday = firstWeekday === 0;
  const startWeek = startINSunday ? 0 : 1;

  let CURRENT_WEEK = startWeek;
  let TOTAL_WEEKS = startWeek;
  let CURRENT_WORKDAY = 0;
  let TOTAL_WORKDAYS = 0;

  for (let index = 1; index <= totalDays; index += 1) {
    temporary.setDate(index);
    const dayWeek = temporary.getDay();
    if (dayWeek === 0 && index <= currentDay) {
      CURRENT_WEEK += 1;
    }
    if (dayWeek === 0) {
      TOTAL_WEEKS += 1;
    }
    if (!nonworkdays.includes(index) && index <= currentDay) {
      CURRENT_WORKDAY += 1;
    }

    if (!nonworkdays.includes(index)) {
      TOTAL_WORKDAYS += 1;
    }
  }

  // WEEKS
  const currentWeek = CURRENT_WEEK;
  const totalWeeks = TOTAL_WEEKS;
  const elapsedWeeks = currentWeek - 1;
  const remainingWeeks = totalWeeks - currentWeek;
  const percentageWeeks = parseFloat((currentWeek / totalWeeks).toFixed(2));

  // WORKDAYS
  const currentWorkday = CURRENT_WORKDAY;
  const totalWorkdays = TOTAL_WORKDAYS;
  const elapsedWorkdays = currentWorkday - 1;
  const remainingWorkdays = totalWorkdays - currentWorkday;
  const percentageWorkdays = parseFloat((currentWorkday / totalWorkdays).toFixed(2));

  return {
    dates: {
      start: startMonth,
      current: currentMonth,
      end: endMonth,
    },
    days: {
      current: currentDay,
      total: totalDays,
      elapsed: elapsedDays,
      remaining: remainingDays,
      percentage: percentageDays,
    },
    weeks: {
      current: currentWeek,
      total: totalWeeks,
      elapsed: elapsedWeeks,
      remaining: remainingWeeks,
      percentage: percentageWeeks,
    },
    workdays: {
      current: currentWorkday,
      total: totalWorkdays,
      elapsed: elapsedWorkdays,
      remaining: remainingWorkdays,
      percentage: percentageWorkdays,
    },
  };
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = createSummary;
