/**
 * @file Manages the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MonthError = require('./MonthError');
const utils = require('./helpers/utils');
const isValid = require('./helpers/isValid');
const readonly = require('./helpers/readonly');
const createPlanner = require('./services/createPlanner');
const createWeekends = require('./services/createWeekends');
const createHolidays = require('./services/createHolidays');
const createNonWorkdays = require('./services/createNonWorkdays');
const createDays = require('./services/createDays');
const createSummary = require('./services/createSummary');

// ━━	TYPEDEF	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `weekend` option indicates the days of the week that are taken as the
 * weekend in the month.
 *
 * Must be a `string` or integer `number` between 0 to 15. If a `string` is
 * passed, the string must match to regex `/^[0-1]{7}$/`. For example if want to
 * indicate that weekends are Fridays, the value must be `"0000100"`.
 *
 * @private
 * @typedef {(string|number)} WeekendOption
 */

/**
 * An activity scheduled on a datebook.
 *
 * An `Object` that contains the details of a task, event, appointment or
 * meeting.
 *
 * @private
 * @typedef  {object}                                 Activity
 * @property {string}                                 date        - Scheduled date for the activity, ISO format (ISO 8601) `"YYYY-MM-DD"`.
 * @property {string}                                 title       - Activity title.
 * @property {string}                                 description - Activity description.
 * @property {boolean}                                holiday     - If the activity is taken as a holiday.
 * @property {'task'|'event'|'appointment'|'meeting'} type        - Activity type, allowed values are `task`, `event`, `appointment`, `meeting`.
 */

/**
 * The `datebook` option is a collection of scheduled activities.
 *
 * Must be an object `array`, every object must have the properties `date`,
 * `title`, `description`, `holiday` and `type`.
 *
 * @private
 * @typedef {Array.<Activity>} Datebook
 */

/**
 * A task-type scheduled activity.
 *
 * An `Object` with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.
 *
 * @private
 * @typedef  {object}         Task
 * @property {string}         date        - Scheduled date for the task `"YYYY-MM-DD"`.
 * @property {string}         title       - Task title.
 * @property {string}         description - Task description.
 * @property {boolean}        holiday     - If the task is taken as a holiday.
 * @property {'task'}         type        - Type of scheduled activity `task`.
 * @property {Array.<number>} YYMMDD      - Scheduled date for the task `[YY, MM, DD]`.
 */

/**
 * An event-type scheduled activity.
 *
 * An `Object` that contains the details of an event, with the properties `date`,
 * `title`, `description`, `holiday`, `type`, and `YYMMDD`.
 *
 * @private
 * @typedef  {object}         Event
 * @property {string}         date        - Scheduled date for the event `"YYYY-MM-DD"`.
 * @property {string}         title       - Event title.
 * @property {string}         description - Event description.
 * @property {boolean}        holiday     - If the event is taken as a holiday.
 * @property {'event'}        type        - Type of scheduled activity `event`.
 * @property {Array.<number>} YYMMDD      - Scheduled date for the event `[YY, MM, DD]`.
 */

/**
 * An appointment-type scheduled activity.
 *
 * An `Object` that contains the details of an appointment, with the properties
 * `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.
 *
 * @private
 * @typedef  {object}         Appointment
 * @property {string}         date        - Scheduled date for the appointment `"YYYY-MM-DD"`.
 * @property {string}         title       - Appointment title.
 * @property {string}         description - Appointment description.
 * @property {boolean}        holiday     - If the appointment is taken as a holiday.
 * @property {'appointment'}  type        - Type of scheduled activity `appointment`.
 * @property {Array.<number>} YYMMDD      - Scheduled date for the appointment `[YY, MM, DD]`.
 */

/**
 * An meeting-type scheduled activity.
 *
 * An object that contains the details of a meeting, with the properties `date`,
 * `title`, `description`, `holiday`, `type`, and `YYMMDD`.
 *
 * @private
 * @typedef  {object}         Meeting
 * @property {string}         date        - Scheduled date for the meeting `"YYYY-MM-DD"`.
 * @property {string}         title       - Meeting title.
 * @property {string}         description - Meeting description.
 * @property {boolean}        holiday     - If the meeting is taken as a holiday.
 * @property {'meeting'}      type        - Type of scheduled activity `meeting`.
 * @property {Array.<number>} YYMMDD      - Scheduled date for the meeting `[YY, MM, DD]`.
 */

/**
 * Collection of activities of the month, organized by type.
 *
 * An `Object` with the properties `tasks`, `events`, `appointments` and
 * `meetings`, every property of the object is an array.
 *
 * @private
 * @typedef  {object}              Planner
 * @property {Array.<Task>}        tasks        - Collection of all tasks for the month.
 * @property {Array.<Event>}       events       - Collection of all events for the month.
 * @property {Array.<Appointment>} appointments - Collection of all appointments for the month.
 * @property {Array.<Meeting>}     meetings     - Collection of all meetings for the month.
 */

/**
 * Count of activities of the day, organized by type.
 *
 * An `Object` with the properties `tasks`, `events`, `appointments`, `meetings`
 * and total, every property of the object is an `number`.
 *
 * @private
 * @typedef  {object} Scheduled
 * @property {number} tasks        - Total number of the tasks of a day.
 * @property {number} events       - Total number of the events of a day.
 * @property {number} appointments - Total number of the appointments of a day.
 * @property {number} meetings     - Total number of the meetings of a day.
 * @property {number} total        - Total number of activities of a day.
 */

/**
 * Details of a day.
 *
 * An `Object` with the properties `day`, `date`, `weekday`, `type`, `week`,
 * `workday`, `isWorkday`, `isWeekend`, and `scheduled`.
 *
 * @private
 * @typedef  {object}         Day
 * @property {number}         day       - Day of the month.
 * @property {Array.<number>} date      - The date of the day `[YY, MM, DD]`.
 * @property {number}         weekday   - The day of the week, value is like `Date.prototype.getDay()`.
 * @property {string}         type      - `elapsed`, `current`, `remaining`.
 * @property {number}         week      - Week number of the month.
 * @property {number}         workday   - Workday number of the month.
 * @property {boolean}        isWorkday - If the day is a work day.
 * @property {boolean}        isWeekend - If the day is a weekend.
 * @property {Scheduled}      scheduled - Number of the activities of a day.
 */

/**
 * The details of the days of the month, a collection of information about all
 * the days of the month.
 *
 * An object `array`, every `array` element contains information about a day of
 * the month, If it is a weekend or a work day, if it has already elapsed, it is
 * the current day, week number.
 *
 * @private
 * @typedef {Array.<Day>} Days
 */

/**
 * Month's dates summary.
 *
 * @private
 * @typedef  {object} DatesSummary
 * @property {Date}   start        - Month's start date.
 * @property {Date}   current      - Month's current date.
 * @property {Date}   end          - Month's end date.
 */

/**
 * Month's days summary.
 *
 * @private
 * @typedef  {object} DaysSummary
 * @property {number} current     - Month's current day.
 * @property {number} total       - Month's total days.
 * @property {number} elapsed     - Month's elapsed days.
 * @property {number} remaining   - Month's remaining days.
 * @property {number} percentage  - Month's percentage remaining days.
 */

/**
 * Month's weeks summary.
 *
 * @private
 * @typedef  {object} WeeksSumary
 * @property {number} current     - Month's current week.
 * @property {number} total       - Month's total weeks.
 * @property {number} elapsed     - Month's elapsed weeks.
 * @property {number} remaining   - Month's remaining weeks.
 * @property {number} percentage  - Month's percentage remaining weeks.
 */

/**
 * Month's work days summary.
 *
 * @private
 * @typedef  {object} WorkdaysSumary
 * @property {number} current        - Month's current work day.
 * @property {number} total          - Month's total work days.
 * @property {number} elapsed        - Month's elapsed work days.
 * @property {number} remaining      - Month's remaining work days.
 * @property {number} percentage     - Month's percentage remaining work days.
 */

/**
 * Summary of the month with information on weeks, working days and dates.
 *
 * An `Object` with the properties `dates`, `days`, `weeks`, and `workdays`.
 *
 * @private
 * @typedef  {object}         Summary
 * @property {DatesSummary}   dates    - Month's dates Summary.
 * @property {DaysSummary}    days     - Month's days Summary.
 * @property {WeeksSumary}    weeks    - Month's weeks Summary.
 * @property {WorkdaysSumary} workdays - Month's work days Summary.
 */

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ERRORS = MonthError.messages;

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `Month` class manages the information of a month from given date, such as
 * number of weeks, number of work days, number of weekend.
 *
 * @version 1.0.0
 */
class Month {
  /**
   * Creates an instance of Month.
   *
   * The class `Month` requires an optional parameter `options`, must be an
   * `Object` with the properties `current`, `weekend` and `datebook`.
   *
   * The `options.current` value must be type `date`, it is used as a base to identify
   * the days that have `elapsed`, the `remaining` days of the month and `current` day,
   * the `default` value is `new Date()`.
   *
   * The `options.weekend` value must be a `string` or integer `number` between `0` to `15`.
   * If a `string` is passed, the string must match to regex `/^[0-1]{7}$/`, the
   * `default` value is `0`.
   *
   * The `options.datebook` value must be an object `array`, that represents a
   * collection of scheduled activities from a Datebook, the `default` value is `[]`.
   *
   * @memberof  Month
   * @param     {object} [options] - Month class options.
   * @param     {Date} [options.current] - Current date of month.
   * @param     {WeekendOption} [options.weekend] - Option to specify weekends.
   * @param     {Datebook} [options.datebook] - Scheduled activities of the month.
   * @throws    {MonthError} If `options.current` is not instance Date.
   * @throws    {MonthError} If `options.weekend` is not a valid weekend option.
   * @throws    {MonthError} If `options.datebook` is not an array.
   * @throws    {MonthError} If any `options.datebook` elements is not a valid object.
   * @example const month = new Month();
   *
   * @example const month = new Month({
   *   current: new Date(2021, 0, 15),
   *   weekend: 0,
   *   datebook: [
   *     {
   *       date: '2021-01-20',
   *       title: "Mom's birthday",
   *       description: "Don't forget to buy a gift",
   *       type: 'event',
   *       holiday: true,
   *     },
   *     {
   *       date: '2021-01-10',
   *       title: 'Send final sales report',
   *       description: "Don't forget to attach graphics",
   *       type: 'task',
   *       holiday: true,
   *     },
   *   ],
   * });
   *
   */
  constructor({ current = new Date(), weekend = 0, datebook = [] } = {}) {
    if (!utils.isDate(current)) {
      throw new MonthError(ERRORS.TYPE_CURRENT_OPTION);
    }
    if (!isValid.weekend(weekend)) {
      throw new MonthError(ERRORS.INVALID_WEEKEND_OPTION);
    }
    if (!utils.isArray(datebook)) {
      throw new MonthError(ERRORS.TYPE_DATEBOOK_OPTION);
    }
    if (!utils.isEmptyArray(datebook) && !isValid.datebook(datebook)) {
      throw new MonthError(ERRORS.INVALID_DATEBOOK_SCHEMA);
    }
    // » DEFINE READ-ONLY PROPERTIES
    /**
     * Its a number `array` with three elements.
     *
     * The array elements represent the year number, month number and day
     * number `[YY, MM, DD]`.
     *
     * @type {Array.<number>}
     * @member YYMMDD
     * @memberof Month
     * @instance
     * @readonly
     */
    Object.defineProperty(this, 'YYMMDD', { value: readonly.createYYMMDD(current) });

    /**
     * Its a number `array`.
     *
     * The array elements represent days of the week that are not working days
     * and takes as weekend, its value is like like as `Date.prototype.getDay()`.
     *
     * @type {Array.<number>}
     * @member WEEKEND
     * @memberof Month
     * @instance
     * @readonly
     */
    Object.defineProperty(this, 'WEEKEND', { value: readonly.createWeekend(weekend) });

    /**
     * Its a number `array`, with three elements.
     *
     * The array elements represent one day of the month, the day month start,
     * the day month current and the day month end, its value is like
     * `Date.prototype.getDate()`.
     *
     * @type {Array.<number>}
     * @member SCE
     * @memberof Month
     * @instance
     * @readonly
     */
    Object.defineProperty(this, 'SCE', { value: readonly.createSCE(this.YYMMDD) });

    /**
     * The year of the month.
     *
     * Its value is like `Date.prototype.getFullYear()`.
     *
     * @type {number}
     */
    this.year = this.YYMMDD[0]; // eslint-disable-line prefer-destructuring

    /**
     * The month number.
     *
     * Its value is like `Date.prototype.getDate()`.
     *
     * @type {number}
     */
    this.number = this.YYMMDD[1]; // eslint-disable-line prefer-destructuring

    /**
     * Collection of activities of the month, organized by type.
     *
     * An `Object` with the properties `tasks`, `events`, `appointments` and
     * `meetings`, every property of the object is an `array`.
     *
     * @type {Planner}
     */
    this.planner = createPlanner({
      datebook,
      YYMMDD: this.YYMMDD,
      SCE: this.SCE,
    });

    /**
     * The month days that are weekends.
     *
     * A number `array` that value of elements is like `Date.prototype.getDate()`.
     *
     * @type {Array.<number>}
     */
    this.weekends = createWeekends({
      YYMMDD: this.YYMMDD,
      WEEKEND: this.WEEKEND,
      SCE: this.SCE,
    });

    /**
     * The month days that are holidays.
     *
     * A number `array` that value of elements is like a `Date.prototype.getDate()`.
     *
     * @type {Array.<number>}
     */
    this.holidays = createHolidays(this.planner);

    /**
     * The month days that are non workdays.
     *
     * A number `array` that value of elements is like a `Date.prototype.getDate()`.
     *
     * @type {Array.<number>}
     */
    this.nonworkdays = createNonWorkdays({
      weekends: this.weekends,
      holidays: this.holidays,
    });

    /**
     * The details of the days of the month, a collection of information about
     * all the days of the month.
     *
     * An object `array`, every `array` element contains information about a day
     * of the month, If it is a weekend or a work day, if it has already elapsed,
     * it is the current day, week number.
     *
     * @type {Days}
     */
    this.days = createDays({
      YYMMDD: this.YYMMDD,
      SCE: this.SCE,
      weekends: this.weekends,
      nonworkdays: this.nonworkdays,
      planner: this.planner,
    });

    /**
     * Summary of the month with information on weeks, working days and dates.
     *
     * An `Object` with the properties `dates`, `days`, `weeks`, and `workdays`.
     *
     * @type {Summary}
     */
    this.summary = createSummary({
      YYMMDD: this.YYMMDD,
      nonworkdays: this.nonworkdays,
    });
  }

  /**
   * The `addDatebook()` method adds scheduled activities.
   *
   * `datebook` value must be an object `array`, .
   *
   * @memberof  Month
   * @param     {Datebook} datebook - Plans of the month.
   * @returns   {this} To chain methods.
   * @throws    {MonthError} If `datebook` is not an array.
   * @throws    {MonthError} If any `datebook` elements is not a valid object.
   * @example const month = new Month();
   *
   * month.addDatebook([
   *   {
   *     date: '2021-01-10',
   *     title: 'Send final sales report',
   *     description: "Don't forget to attach graphics",
   *     type: 'task',
   *     holiday: true,
   *   },
   * ]);
   *
   */
  addDatebook(datebook) {
    if (!utils.isArray(datebook)) {
      throw new MonthError(ERRORS.TYPE_DATEBOOK_OPTION);
    }
    if (!utils.isEmptyArray(datebook) && !isValid.datebook(datebook)) {
      throw new MonthError(ERRORS.INVALID_DATEBOOK_SCHEMA);
    }
    const { tasks, events, appointments, meetings } = createPlanner({
      datebook,
      YYMMDD: this.YYMMDD,
      SCE: this.SCE,
    });

    const {
      tasks: Tasks,
      events: Events,
      appointments: Appointments,
      meetings: Meetings,
    } = this.planner;

    // » JOIND OLD AND NEW DATEBOOK ITEMS
    const addedTasks = [...Tasks, ...tasks];
    const addedEvents = [...Events, ...events];
    const addedAppointments = [...Appointments, ...appointments];
    const addedMeetings = [...Meetings, ...meetings];

    // » UPDATE DATEBOOK PROPERTIES
    this.planner = {
      tasks: addedTasks,
      events: addedEvents,
      appointments: addedAppointments,
      meetings: addedMeetings,
    };

    // » UPDATE DAYS PROPERTIES
    this.holidays = createHolidays(this.planner);
    this.nonworkdays = createNonWorkdays({
      weekends: this.weekends,
      holidays: this.holidays,
    });
    this.days = createDays({
      YYMMDD: this.YYMMDD,
      SCE: this.SCE,
      weekends: this.weekends,
      nonworkdays: this.nonworkdays,
      planner: this.planner,
    });

    // » UPDATE SUMMARY PROPERTIES
    this.summary = createSummary({
      YYMMDD: this.YYMMDD,
      nonworkdays: this.nonworkdays,
    });

    return this;
  }
}

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = Month;
