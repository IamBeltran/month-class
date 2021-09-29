/**
 * @file Manages createPlanner module, used to create planner property the
 * class Month.
 */

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `sortByDay()` function sorts the elements of an object array with
 * property `day`. The property `day` is type number.
 *
 * @private
 * @param     {{ day:number }} first - The first element for comparison.
 * @param     {{ day:number }} second - The second element for comparison.
 * @returns   {Array<{ day:number }>} The sorted array.
 * @example const days = [{ day: 100 }, { day: 2 }, { day: 1 }];
 *
 * const sorted = days.sort(sortByDay); // [{ day: 1 }, { day: 2 }, { day: 100 }]
 *
 */
const sortByDay = (first, second) => first.day - second.day;

/**
 * The function returns a number `array` with three elements that represent a
 * date `[YY,MM, DD]`, The function requires the `date` parameter that must be
 * `string` and follow the ISO 8601 date format.
 *
 * @private
 * @param {string} date - A string that represent a date.
 * @returns {Array<number>} A number array with three elements.
 * @example const YYMMDD = ISO2YYMMDD('2021-05-27T01:16:24.929Z'); // [2021, 4, 27]
 *
 */
const ISO2YYMMDD = date =>
  date
    .slice(0, 10)
    .split('-')
    .map(item => parseInt(item, 10))
    .map((item, idx) => (idx === 1 ? item - 1 : item));

/**
 * The `filterByDate()` function filter an object `array`, filtering the
 * elements that do not correspond to a given period of time.
 *
 * The function requires an parameter `options`, must be an object with the
 * properties `datebook` `YYMMDD` and `SCE`.
 *
 * The `options.datebook` value must be a object `array`, that represents a
 * collection of scheduled activities from a Datebook.
 *
 * The `options.YYMMDD` value must be a number `array` with three elements, that
 * represents a date (year, month and day). The value of the month is as
 * `Date.prototype.getDate()`.
 *
 * The `options.SCE` value must be a number `array` with three elements. The array
 * values represent the month's start day, month's current day and month's end
 * day. The value of the elements is like `Date.prototype.getDate()`.
 *
 * @private
 * @param {object} options - Function options.
 * @param {Array.<object>} options.datebook - An object array.
 * @param {Array.<number>} options.YYMMDD - A number `array` with three elements.
 * @param {Array.<number>} options.SCE - A number `array` with three elements.
 * @returns {Array.<object>} A object `array`.
 * @example const filtered = filterByDate({
 *   datebook: [
 *     { date: '2021-01-03', title: 'dummy todo 01' },
 *     { date: '2021-01-13', title: 'dummy todo 02' },
 *     { date: '2020-01-13', title: 'dummy todo 03' },
 *   ],
 *   YYMMDD: [2021, 0, 15],
 *   SCE: [1, 15, 31],
 * }); // [...]
 *
 */
const filterByDate = ({ datebook, YYMMDD, SCE }) =>
  datebook
    .map(plan => ({ ...plan, YYMMDD: ISO2YYMMDD(plan.date) }))
    .filter(plan => {
      const YEAR = plan.YYMMDD[0] === YYMMDD[0];
      const MONTH = plan.YYMMDD[1] === YYMMDD[1];
      const DAYS = plan.YYMMDD[2] >= SCE[0] && plan.YYMMDD[2] <= SCE[2];
      return YEAR && MONTH && DAYS;
    });

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createPlanner()` function returns an object with the properties `tasks`,
 * `events`, `appointments` and `meetings`, that represent scheduled activities
 * of datebook.
 *
 * The function requires an parameter `options`, must be an object with the
 * properties `datebook` `YYMMDD` and `SCE`.
 *
 * The `options.datebook` value must be a object `array`, that represents a
 * collection of scheduled activities from a Datebook.
 *
 * The `options.YYMMDD` value must be a number `array` with three elements, that
 * represents a date (year, month and day). The value of the month is as
 * `Date.prototype.getDate()`.
 *
 * The `options.SCE` value must be a number `array` with three elements. The array
 * values represent the month's start day, month's current day and month's end
 * day. The value of the elements is like `Date.prototype.getDate()`.
 *
 * @private
 * @param {object} options - Function options.
 * @param {Array.<object>} options.datebook - An object `array`, collection of scheduled activities.
 * @param {Array.<number>} options.YYMMDD - A number `array` with three elements.
 * @param {Array.<number>} options.SCE - A number `array` with three elements.
 * @returns {object} A object.
 * @example const planner = createPlanner({
 *   datebook: [
 *     { date: '2021-01-03', title: 'dummy todo 01' },
 *     { date: '2021-01-13', title: 'dummy todo 02' },
 *     { date: '2020-01-13', title: 'dummy todo 03' },
 *   ],
 *   YYMMDD: [2021, 0, 15],
 *   SCE: [1, 15, 31],
 * }); // { tasks: [..], events: [..], appointments: [..], meetings: [..], };
 *
 */
const createPlanner = ({ datebook, YYMMDD, SCE }) => {
  const filtered = filterByDate({ datebook, YYMMDD, SCE });
  const sorted = filtered.sort(sortByDay);
  const tasks = sorted.filter(item => item.type === 'task');
  const events = sorted.filter(item => item.type === 'event');
  const appointments = sorted.filter(item => item.type === 'appointment');
  const meetings = sorted.filter(item => item.type === 'meeting');
  return {
    tasks,
    events,
    appointments,
    meetings,
  };
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = createPlanner;
