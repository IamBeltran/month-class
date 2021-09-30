/**
 * @file Manages readonly module, used to create the read-only properties for
 * the class Month.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const utils = require('./utils');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * A Map object that stores the valid patterns for the `getPattern()` function.
 *
 * @private
 * @type {Map<number, string>}
 */
const mapWeekend = new Map([
  [0, '0000011'], //  00 Saturday, Sunday
  [1, '1000001'], //  01 Sunday, Monday
  [2, '1100000'], //  02 Monday, Tuesday
  [3, '0110000'], //  03 Tuesday, Wednesday
  [4, '0011000'], //  04 Wednesday, Thursday
  [5, '0001100'], //  05 Thursday, Friday
  [6, '0000110'], //  06 Friday, Saturday
  [7, '0000001'], //  07 Sunday
  [8, '1000000'], //  08 Monday
  [9, '0100000'], //  09 Tuesday
  [10, '0010000'], // 10 Wednesday
  [11, '0001000'], // 11 Thursday
  [12, '0000100'], // 12 Friday
  [13, '0000010'], // 13 Saturday
  [14, '0000001'], // 14 Saturday
  [15, '0000000'], // 15 None
]);

/**
 * Array with numeric elements. The numbers represents the days of the week,
 * where 0 represents Sunday, like `Date.prototype.getDay()`.
 *
 * @private
 * @type {Array.<number>}
 */
const weekdays = [1, 2, 3, 4, 5, 6, 0];

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `getPattern()` function returns a `string` representing the days that are
 * weekends. The string contains only 0 or 1 and length 7 where 0 are the
 * workdays and 1 the weekends.
 *
 * `value` must be a `string` or integer `number` between 0 to 15. If a `string`
 * is passed, the string must match to regex `/^[0-1]{7}$/`.
 *
 * @private
 * @param     {number|string} value - A valid weekend option.
 * @returns   {string} A `string` representing the days of the week.
 * @example const pattern = getPattern(1); // expected value '1000001'
 *
 * @example const pattern = getPattern(2); // expected value '1200000'
 * const PATTERN_02 = getPattern(2); // expected value '1100000'
 * const PATTERN_03 = getPattern(0); // expected value '0000000'
 *
 */
const getPattern = value => {
  const isByNumber = utils.isIntNumber(value) && value >= 0 && value <= 14;
  if (isByNumber) return mapWeekend.get(value);
  return value;
};

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createYYMMDD()` function returns from an instance of `Date` a number
 * array with three elements. The array elements represent the year number,
 * month number and day number.
 *
 * @private
 * @param   {Date} date - An instance `Date`.
 * @returns {Array.<number>} A number `array` with three elements.
 * @example const YYMMDD = createYYMMDD(new Date(2020, 1, 12));
 * const [YEAR, MONTH, DAY] = YYMMDD; // expected value [2020, 1, 12]
 *
 */
const createYYMMDD = date => [date.getFullYear(), date.getMonth(), date.getDate()];

/**
 * The `createWeekends()` function returns a number `array`. The array elements
 * represent days of the week that are not working days and takes as weekend.
 * Where 0 represents Sunday and 1 monday, like as `Date.prototype.getDay()`.
 *
 * The `option` parameter must be an integer number between 0 and 14 or a
 * `string` that match the regex `/^[0-1]{7}$/` (e.g. '0000001'). The first
 * digit in the string represents Monday and the last digit represents Sunday.
 * The zeros represent the working days and the ones represent the non-working
 * days.
 *
 * @private
 * @param   {number|string} option - A valid weekend option.
 * @returns {Array.<number>} A number array.
 * @example const weekend = createWeekend(1); // expected value [0, 6]
 *
 */
const createWeekend = option => {
  const pattern = getPattern(option);
  const chars = pattern.split('');
  return weekdays.reduce((acc, curr, idx) => (chars[idx] === '1' ? [...acc, curr] : acc), []);
};

/**
 * The `createSCE()` function returns a number `array` with three elements from
 * another number `array`. The array elements represent one day of the month,
 * the day month start, the day month current and the day month end, its value
 * is like `Date.prototype.getDate()`.
 *
 * The `YYMMDD` param must be a number `array` with three elements. The array
 * elements represent the year number, month number and day number `[YY, MM, DD]`.
 *
 * @param     {Array.<number>} YYMMDD - A number array with three elements.
 * @returns   {Array.<number>} A number array with three elements.
 * @private
 * @example const SCE = createSCE([2021, 0, 15]); // expected value [1, 15, 31]
 *
 */
const createSCE = YYMMDD => {
  const [YY, MM, DD] = YYMMDD;
  return [1, DD, new Date(YY, MM + 1, 0).getDate()];
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.createYYMMDD = createYYMMDD;
exports.createWeekend = createWeekend;
exports.createSCE = createSCE;
