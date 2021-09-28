/**
 * @file Manages createWeekends module.
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createWeekends()` function returns a number `array` that represent the
 * month's days that are weekend. The value of the returned elements is the same
 * `Date.prototype.getDate()`.
 *
 * The function requires an parameter `settings`, must be an object with the
 * properties `YYMMDD` `WEEKEND` and `SCE`.
 *
 * The `settings.YYMMDD` value must be a number array with three elements, that
 * represents a date (year, month and day). The value of the month is as
 * `Date.prototype.getDate()`.
 *
 * The `settings.WEEKEND` value must be a number array. The array values represent
 * the days of the week that are weekend, the value of the elements is like
 * `Date.prototype.getDay()`.
 *
 * The `settings.SCE` value must be a number array with three elements. The array
 * values represent the month's start day, month's current day and month's end
 * day. The value of the elements is like `Date.prototype.getDate()`.
 *
 * @private
 * @param   {object} settings - Function settings.
 * @param   {Array.<number>} settings.YYMMDD - A number array with three elements.
 * @param   {Array.<number>} settings.WEEKEND - A number array.
 * @param   {Array.<number>} settings.SCE - A number array with three elements.
 * @returns {Array.<number>} A number array.
 * @example const weekends = createWeekends({
 *   YYMMDD: [2020, 0, 1],
 *   WEEKEND: [6, 0],
 *   SCE: [1, 12, 31],
 * }); // expected value [4, 5, 11, 12, 18, 19, 25, 26]
 *
 */
const createWeekends = ({ YYMMDD, WEEKEND, SCE }) => {
  const [YY, MM] = YYMMDD;
  const total = SCE[2];
  const temporary = new Date(YY, MM, 1);
  const weekends = [];

  for (let i = 1; i <= total; i += 1) {
    temporary.setDate(i);
    const weekday = temporary.getDay();
    if (WEEKEND.includes(weekday)) weekends.push(i);
  }
  return weekends;
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = createWeekends;
