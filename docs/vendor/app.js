/**
 * @file Manages the main script for the sample page.
 */
/* eslint-disable no-undef */

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » MAPPERS
/**
 * A `Object` with English and Spanish translations of month names.
 *
 * @type {{ ES: Map.<number,string>, EN: Map.<number,string> }}
 */
const MONTHS_MAPPER = {
  ES: new Map([
    [0, 'Enero'],
    [1, 'Febrero'],
    [2, 'Marzo'],
    [3, 'Abril'],
    [4, 'Mayo'],
    [5, 'Junio'],
    [6, 'Julio'],
    [7, 'Agosto'],
    [8, 'Septiembre'],
    [9, 'Octubre'],
    [10, 'Noviembre'],
    [11, 'Diciembre'],
  ]),
  EN: new Map([
    [0, 'January'],
    [1, 'February'],
    [2, 'March'],
    [3, 'April'],
    [4, 'May'],
    [5, 'June'],
    [6, 'July'],
    [7, 'August'],
    [8, 'September'],
    [9, 'October'],
    [10, 'November'],
    [11, 'December'],
  ]),
};

/**
 * A `Object` with English and Spanish translations of weekday names.
 *
 * @type {{ ES: Map.<number,string>, EN: Map.<number,string> }}
 */
const WEEKDAYS_MAPPER = {
  ES: new Map([
    [0, 'Domingo'],
    [1, 'Lunes'],
    [2, 'Martes'],
    [3, 'Miércoles'],
    [4, 'Jueves'],
    [5, 'Viernes'],
    [6, 'Sábado'],
  ]),
  EN: new Map([
    [0, 'Sunday'],
    [1, 'Monday'],
    [2, 'Tuesday'],
    [3, 'Wednesday'],
    [4, 'Thursday'],
    [5, 'Friday'],
    [6, 'Saturday'],
  ]),
};

/**
 * A `Object` with English and Spanish translations of day type names.
 *
 * @type {{ ES: Map.<string,string>, EN: Map.<string,string> }}
 */
const TYPE_MAPPER = {
  ES: new Map([
    ['elapsed', 'Transcurrido'],
    ['current', 'Actual'],
    ['remaining', 'Restante'],
  ]),
  EN: new Map([
    ['elapsed', 'Elapsed'],
    ['current', 'Current'],
    ['remaining', 'Remaining'],
  ]),
};

/**
 * An `Object` with the class names for the rows of a table.
 *
 * @type {Map.<string,string>}
 */
const CLASS_TYPE_MAPPER = new Map([
  ['elapsed', 'elapsed'],
  ['current', 'current'],
  ['remaining', 'remaining'],
]);

/**
 * An `Object` with the class names for the rows of a table.
 *
 * @type {Map.<boolean,string>}
 */
const CLASS_WEEKEND_MAPPER = new Map([
  [true, 'weekend'],
  [false, 'weekday'],
]);

// » HTML ELEMENTS
/**
 * Reference to an html element.
 *
 * @type {HTMLTableSectionElement}
 */
const TCAPTION = document.getElementById('month-table-caption');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const TBODY = document.getElementById('month-days');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const SUMARY_DAYS_LIST = document.getElementById('summary-days-list');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const SUMARY_WEEKS_LIST = document.getElementById('summary-weeks-list');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const TASK_TOTAL = document.getElementById('task-total');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const TASKS_LIST = document.getElementById('tasks-list');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const MEETING_TOTAL = document.getElementById('meeting-total');

/**
 * Reference to an html element.
 *
 * @type {HTMLElement}
 */
const MEETING_LIST = document.getElementById('meeting-list');

// » STRING TEMPLATES
/**
 * String template to dynamically create html rows.
 *
 * @type {string}
 */
const STRING_ROW_TABLE = `<tr class="<CLASS_TYPE> <CLASS_WEEKEND>">
  <th scope="row"><DAY></th>
  <td><STRING_DATE></td>
  <td><NAME_WEEKDAY></td>
  <td><NAME_TYPE></td>
  <td><WORKDAY></td>
  <td><WEEK></td>
  <td><CHAR_WEEKEND></td>
  <td><CHAR_WORKDAY></td>
  <td><TOTAL></td>
</tr>
`;

/**
 * String template to dynamically create html list.
 *
 * @type {string}
 */
const STRING_LIST_SUMMARY = `<li class="list-group-item d-flex justify-content-between align-items-start bg-dark text-white">
  <div class="ms-2 me-auto">
    <div class="fw-bold"><DESCRIPTION></div>
  </div>
  <span class="badge bg-light text-dark rounded-pill"><AMOUNT></span>
</li>`;

/**
 * String template to dynamically create html list.
 *
 * @type {string}
 */
const STRING_LIST_PLANNER = `<li class="list-group-item d-flex justify-content-between align-items-start bg-dark text-white">
  <div class="ms-2 me-auto">
    <div class="fw-bold"><TITLE></div>
    <div class="text-muted"><DESCRIPTION></div>
  </div>
  <span class="badge bg-light text-dark rounded-pill"><DATE></span>
</li>`;

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `documentReady()` specify a function to execute when the DOM is fully loaded.
 *
 * @function      documentReady
 * @param         {Function} callback - A function to execute after the DOM is ready.
 * @returns       {void} A function to execute after the DOM is ready.
 * @example documentReady(() => {});
 *
 */
const DOMReady = callback =>
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? callback()
    : document.addEventListener('DOMContentLoaded', callback);

/**
 * The `getFormattedDate()` function returns a string with date format.
 *
 * The function requires the parameter `YYMMDD` must be a numeric array with
 * three elements, representing a date [YEAR, MONTH, DAY].
 *
 * @private
 * @param   {Array.<number>} YYMMDD - A number array with tree elements.
 * @returns {string} A `string` with date format.
 * @example getFormattedDate(YYMMDD); // 2020-03-01
 *
 */
const getFormattedDate = YYMMDD =>
  Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(YYMMDD[0], YYMMDD[1], YYMMDD[2]));

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
 * An `Object` with information of a day.
 *
 * @typedef  {object}         RowData
 * @property {number}         day           - Day of the month.
 * @property {Array.<number>} date          - The date of the day `[YY, MM, DD]`.
 * @property {number}         weekday       - The day of the week, value is like `Date.prototype.getDay()`.
 * @property {string}         type          - `elapsed`, `current`, `remaining`.
 * @property {number}         week          - Week number of the month.
 * @property {number}         workday       - Workday number of the month.
 * @property {boolean}        isWorkday     - If the day is a work day.
 * @property {boolean}        isWeekend     - If the day is a weekend.
 * @property {Scheduled}      scheduled     - Number of the activities of a day.
 * @property {number}         total         - Total number of scheduled activities.
 * @property {string}         string_date   - A date in text format.
 * @property {string}         class_type    - CSS class name for a table row.
 * @property {string}         class_weekend - CSS class name for a table row.
 * @property {string}         name_weekday  - Weekday name.
 * @property {string}         name_type     - Day type name.
 * @property {string}         char_weekend  - Character to identify if it is true or false.
 * @property {string}         char_workday  - Character to identify if it is true or false.
 */

/**
 * The `createData()` function adds properties to an `Object` of type `day`.
 *
 * @param         {Day} day - An `Object` with information for a day of the month.
 * @returns       {RowData} An `Object` with information for a day of the month.
 * @example createData(day);
 *
 */
const createData = day =>
  Object.assign(day, {
    total: day.scheduled.total,
    string_date: getFormattedDate(day.date),
    class_type: CLASS_TYPE_MAPPER.get(day.type),
    class_weekend: CLASS_WEEKEND_MAPPER.get(day.isWeekend),
    name_weekday: WEEKDAYS_MAPPER.EN.get(day.weekday),
    name_type: TYPE_MAPPER.EN.get(day.type),
    char_weekend: day.isWeekend ? '✓' : '-',
    char_workday: day.isWorkday ? '✓' : '-',
  });

/**
 * The `createRows()` function returns a string, using a `string` template to
 * create a `row` type html element.
 *
 * @param   {RowData} data - An `Object` with information of a day of month.
 * @returns {string} String template, with structure of an html element <tr>.
 * @example createRows(data);
 *
 */
const createRows = data =>
  STRING_ROW_TABLE.replaceAll('<CLASS_TYPE>', data.class_type)
    .replaceAll('<CLASS_WEEKEND>', data.class_weekend)
    .replaceAll('<DAY>', data.day)
    .replaceAll('<STRING_DATE>', data.string_date)
    .replaceAll('<NAME_WEEKDAY>', data.name_weekday)
    .replaceAll('<NAME_TYPE>', data.name_type)
    .replaceAll('<WORKDAY>', data.workday)
    .replaceAll('<WEEK>', data.week)
    .replaceAll('<CHAR_WEEKEND>', data.char_weekend)
    .replaceAll('<CHAR_WORKDAY>', data.char_workday)
    .replaceAll('<TOTAL>', data.total);

/**
 * A task-type scheduled activity.
 *
 * An `Object` with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.
 *
 * @private
 * @typedef  {object}         Activity
 * @property {string}         date        - Scheduled date for the task `"YYYY-MM-DD"`.
 * @property {string}         title       - Task title.
 * @property {string}         description - Task description.
 * @property {boolean}        holiday     - If the task is taken as a holiday.
 * @property {'task'}         type        - Type of scheduled activity `task`.
 * @property {Array.<number>} YYMMDD      - Scheduled date for the task `[YY, MM, DD]`.
 */

/**
 * The `createPlannerList()` function returns a string, using a `string` template to
 * create a `list` type html element.
 *
 * @param   {Activity} activity - TODO ADD DESCRIPTION.
 * @returns {string} String template, with structure of an html element <li>.
 * @example createTaskList(task);
 *
 */
const createPlannerList = item =>
  STRING_LIST_PLANNER.replaceAll('<TITLE>', item.title)
    .replaceAll('<DATE>', item.date)
    .replaceAll('<DESCRIPTION>', item.description);

/**
 * The `createSummaryList()` function returns a string, using a `string` template to
 * create a `list` type html element.
 *
 * @param   {Array} item - TODO ADD DESCRIPTION.
 * @returns {string} String template, with structure of an html element <li>.
 * @example createSummaryList(item);
 *
 */
const createSummaryList = ([description, amount]) =>
  STRING_LIST_SUMMARY.replaceAll('<DESCRIPTION>', description).replaceAll('<AMOUNT>', amount);

/**
 * TODO ADD DESCRIPTION.
 *
 * @param   {number} number - TODO ADD DESCRIPTION.
 * @param   {number} digit - TODO ADD DESCRIPTION.
 * @returns {string} TODO ADD DESCRIPTION.
 * @example addDigits(1, 2); // expeted value '01'
 *
 */
const addDigits = (number, digit) =>
  number.toLocaleString('en-US', {
    minimumIntegerDigits: Number(digit),
    useGrouping: false,
  });

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DOMReady(() => {
  const current = new Date();
  const YEAR = current.getFullYear();
  const MONTH = current.getMonth();
  const [DATE_00, DATE_01, DATE_02, DATE_03, DATE_04, DATE_05, DATE_06, DATE_07] = [
    [YEAR, MONTH + 1, 1],
    [YEAR, MONTH + 1, 2],
    [YEAR, MONTH + 1, 15],
    [YEAR, MONTH + 1, 20],
    [YEAR, MONTH + 1, 28],
    [YEAR, MONTH + 1, 3],
    [YEAR, MONTH + 1, 4],
    [YEAR, MONTH + 1, 16],
  ]
    .map(([YY, MM, DD]) => [YY, addDigits(MM, 2), addDigits(DD, 2)])
    .map(d => d.join('-'));

  const datebook = [
    {
      date: DATE_00,
      title: 'Create monthly sales report',
      description: 'Finish on the day 1th',
      holiday: false,
      type: 'task',
    },
    {
      date: DATE_01,
      title: 'Send monthly sales report',
      description: "Don't forget to attach graphics",
      holiday: false,
      type: 'task',
    },
    {
      date: DATE_02,
      title: 'Create product catalog',
      description: 'Hire photographer',
      holiday: false,
      type: 'task',
    },
    {
      date: DATE_03,
      title: 'Send product catalog',
      description: "Don't forget to attach photos",
      holiday: false,
      type: 'task',
    },
    {
      date: DATE_04,
      title: 'Pay credit card',
      description: 'Monthly payment $34.50',
      holiday: false,
      type: 'task',
    },

    {
      date: DATE_05,
      title: 'Meeting with managers',
      description: 'In the cafe in the square, 11:30 a.m.',
      holiday: false,
      type: 'meeting',
    },
    {
      date: DATE_06,
      title: 'Meeting with investors',
      description: 'Show the new product catalog',
      holiday: false,
      type: 'meeting',
    },
    {
      date: DATE_07,
      title: 'Meeting with suppliers',
      description: 'In the cafe in the square, 11:30 a.m.',
      holiday: false,
      type: 'meeting',
    },
  ];

  const month = new Month({
    current,
    weekend: '0000011',
    datebook,
  });

  const { YYMMDD, days, planner, summary } = month;
  const { tasks, meetings } = planner;

  const CAPTION_DATE = `Month: ${MONTHS_MAPPER.EN.get(YYMMDD[1])} - ${YYMMDD[0]}`;

  // » INNER ROWS TABLE
  const MONTH_DAYS = days;
  const TBODY_DATA = MONTH_DAYS.map(createData);
  const TBODY_ROWS = TBODY_DATA.map(createRows);
  TCAPTION.innerHTML += CAPTION_DATE;
  TBODY_ROWS.forEach(row => {
    TBODY.innerHTML += row;
  });

  const SUMMARY_DAYS = [
    ['Current', summary.days.current],
    ['Total', summary.days.total],
    ['Elapsed', summary.days.elapsed],
    ['Remaining', summary.days.remaining],
    ['Percentage', `${summary.days.percentage * 100} %`],
  ];

  const DAYS = SUMMARY_DAYS.map(createSummaryList);

  DAYS.forEach(day => {
    SUMARY_DAYS_LIST.innerHTML += day;
  });

  const SUMMARY_WEEKS = [
    ['Current', summary.weeks.current],
    ['Total', summary.weeks.total],
    ['Elapsed', summary.weeks.elapsed],
    ['Remaining', summary.weeks.remaining],
    ['Percentage', `${summary.weeks.percentage * 100} %`],
  ];

  const WEEKS = SUMMARY_WEEKS.map(createSummaryList);

  WEEKS.forEach(day => {
    SUMARY_WEEKS_LIST.innerHTML += day;
  });

  // SUMARY_DAYS_LIST
  // » TASKS LIST
  const MONTH_TASKS = tasks;
  const TASKS = MONTH_TASKS.map(createPlannerList);
  TASK_TOTAL.innerHTML += MONTH_TASKS.length;
  TASKS.forEach(task => {
    TASKS_LIST.innerHTML += task;
  });

  // » MEETING_LIST
  const MONTH_MEETINGS = meetings;
  const MEETINGS = MONTH_MEETINGS.map(createPlannerList);
  MEETING_TOTAL.innerHTML += MONTH_MEETINGS.length;
  MEETINGS.forEach(meeting => {
    MEETING_LIST.innerHTML += meeting;
  });
});
