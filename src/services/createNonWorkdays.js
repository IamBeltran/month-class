/**
 * @file Manages createNonWorkdays module, used to create nonworkdays property the
 * class Month.
 */

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `sortByNumber()` function sorts a number array.
 *
 * @param     {number } first - The first element for comparison.
 * @param     {number } second - The second element for comparison.
 * @returns   {Array<number>} The sorted array.
 * @private
 * @example [100, 2, 1].sort(sortByNumber); // expected value [1, 2, 100]
 *
 */
const sortByNumber = (first, second) => first - second;

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createNonWorkdays()` function returns a number array, that represent the
 * month's days that it is non workdays.
 *
 * The function requires an parameter `settings`, must be an object with the
 * properties `weekends` and `holidays`.
 *
 * The `settings.weekends` value must be a number array, that represents the
 * days of the month that are weekends. The values are like `Date.prototype.getDate()`.
 *
 * The `settings.holidays` value must be a number array, that represents the
 * days of the month that are holidays. The values are like `Date.prototype.getDate()`.
 *
 * @param     {object} settings - An object with two properties: holidays, weekends.
 * @param     {Array.<number>} settings.weekends - An array with numeric elements.
 * @param     {Array.<number>} settings.holidays - An array with numeric elements.
 * @returns   {Array.<number>}  An array with numeric items.
 * @private
 * @example const nonworkdays = createNonWorkdays({ weekends, holidays });
 *
 */
const createNonWorkdays = ({ weekends, holidays }) => Array.from(new Set([...weekends, ...holidays])).sort(sortByNumber); // eslint-disable-line prettier/prettier

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = createNonWorkdays;
