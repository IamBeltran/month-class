/**
 * @file Manages createHolidays module, used to create nonworkdays property the
 * class Month.
 */

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `mergePlans()` function returns an object array with the activities of
 * the month, requires a parameter that must be an object, with the properties
 * `tasks`, `events`, `appointments` and `meetings`.
 *
 * @private
 * @param   {object} planner - An `object` with month activities ordered by type.
 * @returns {Array.<object>} An array with datebookItem.
 * @example const datebook = mergePlans({
 *   tasks: [],
 *   events: [],
 *   appointments: [],
 *   meetings: [],
 * }); // expected value []
 *
 */
const mergePlans = planner => [
  ...planner.tasks,
  ...planner.events,
  ...planner.appointments,
  ...planner.meetings,
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `createHolidays()` function returns a number array. The value of the
 * returned elements is the same `Date.prototype.getDate()`, that represent the
 * month's days that it is holidays.
 *
 * The function requires a parameter that must be an object, with the properties
 * `tasks`, `events`, `appointments` and `meetings`.
 *
 * @private
 * @param   {object} planner - Object with sorted datebookitems by type.
 * @returns {Array.<number>} An array with numeric items.
 * @example const holidays = getDaysHoliday(datebook); // [1,2,3]
 *
 */
const createHolidays = planner => {
  const merged = mergePlans(planner);
  if (merged.length === 0) return [];
  const holidays = merged.reduce((a, i) => (i.holiday ? [...a, i.YYMMDD[2]] : [...a]), []);
  return Array.from(new Set(holidays));
};

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = createHolidays;
