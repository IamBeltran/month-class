/**
 * @file Manages isValid module, used to check the options of the constructor
 * method of the class Month.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const utils = require('./utils');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * Regular expression used to check the pattern of the weekend option.
 *
 * @private
 * @type {RegExp}
 */
const regexWeekend = /^[0-1]{7}$/;

/**
 * Regular expression used to check the pattern of the datebook item option.
 *
 * @private
 * @type {RegExp}
 */
const regexDate = /^\d{4}-\d{2}-\d{2}/;

/**
 * Array containing all allowed types of planned dates in datebook plans.
 *
 * @type {Array.<string>}
 * @private
 */
const types = ['task', 'event', 'appointment', 'meeting'];

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The 'isValidPlan()' function return a boolean value, validates if an object
 * follows a schema.
 *
 * @private
 * @param   {object} plan - A object.
 * @returns {boolean} `true` if the value is an valid object schema; otherwise, `false`.
 * @example const isValid = isValidDatebookItem({
 *   date: '2021-01-15',
 *   title: "Mom's birthday",
 *   description: "Mom's birthday",
 *   holiday: false,
 *   type: 'event',
 * }); // expected value true
 *
 */
const isValidPlan = plan => {
  if (!utils.isObject(plan)) return false;
  if (!('date' in plan)) return false;
  if (!('title' in plan)) return false;
  if (!('description' in plan)) return false;
  if (!('holiday' in plan)) return false;
  if (!('type' in plan)) return false;

  if (!utils.isString(plan.date)) return false;
  if (!utils.isString(plan.title)) return false;
  if (!utils.isString(plan.description)) return false;
  if (!utils.isString(plan.type)) return false;
  if (!utils.isBoolean(plan.holiday)) return false;

  if (!regexDate.test(plan.date)) return false;
  if (Number.isNaN(Date.parse(plan.date))) return false;
  if (Date.parse(plan.date) <= 0) return false;
  if (!types.includes(plan.type)) return false;

  if (plan.title.length === 0) return false;
  if (plan.description.length === 0) return false;
  return true;
};

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `isValidWeekend()` function returns a boolean value. Determines whether the
 * passed value is an valid weekend value for the `getWeekends()` function.
 *
 * @private
 * @param   {number|string} weekend - The value to be checked.
 * @returns {boolean} `true` if the value is an valid weekend option; otherwise, `false`.
 * @example const isValid = isValidWeekend(1); // expected value true
 *
 */
const isValidWeekend = weekend => {
  const isByNumber = utils.isIntNumber(weekend) && weekend >= 0 && weekend <= 14;
  const isByPattern = regexWeekend.test(weekend);
  return isByNumber || isByPattern;
};

/**
 * The `isValidDatebook()` function returns a boolean value. Determines if all
 * the values of a passed array are valid.
 *
 * @param     {Array.<object>} plans - An object array.
 * @returns   {boolean} `true` if all array elements is an valid object schema; otherwise, `false`.
 * @private
 * @example const isValid = isValidDatebookItems(item);
 *
 */
const isValidDatebook = plans => plans.map(plan => isValidPlan(plan)).every(item => item === true);

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
exports.weekend = isValidWeekend;
exports.datebook = isValidDatebook;
