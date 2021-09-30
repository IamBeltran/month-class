/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');
const datebook = require('./fixture/dummy.datebook');
// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EXPECTEDS = [
  {
    day: 1,
    date: [2021, 0, 1],
    weekday: 5,
    type: 'elapsed',
    week: 1,
    workday: 1,
    isWorkday: true,
    isWeekend: false,
    scheduled: {
      tasks: 0,
      events: 0,
      appointments: 0,
      meetings: 0,
      total: 0,
    },
  },
  {
    day: 15,
    date: [2021, 0, 15],
    weekday: 5,
    type: 'current',
    week: 3,
    workday: 8,
    isWorkday: false,
    isWeekend: false,
    scheduled: {
      tasks: 0,
      events: 0,
      appointments: 0,
      meetings: 1,
      total: 1,
    },
  },
  {
    day: 4,
    date: [2021, 1, 4],
    weekday: 4,
    type: 'elapsed',
    week: 1,
    workday: 3,
    isWorkday: true,
    isWeekend: false,
    scheduled: {
      tasks: 0,
      events: 0,
      appointments: 0,
      meetings: 0,
      total: 0,
    },
  },
  {
    day: 20,
    date: [2021, 2, 20],
    weekday: 6,
    type: 'remaining',
    week: 3,
    workday: 17,
    isWorkday: true,
    isWeekend: false,
    scheduled: {
      tasks: 0,
      events: 0,
      appointments: 0,
      meetings: 0,
      total: 0,
    },
  },
];

const MONTH_DAYS = [
  {
    name: {
      describe: 'Month: property days',
      test: 'month.days match object contents',
    },
    day: 0,
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000001',
      datebook,
    },
    expected: EXPECTEDS[0],
  },
  {
    name: {
      describe: 'Month: property days',
      test: 'month.days match object contents',
    },
    day: 14,
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000011',
      datebook,
    },
    expected: EXPECTEDS[1],
  },
  {
    name: {
      describe: 'Month: property days',
      test: 'month.days match object contents',
    },
    day: 3,
    options: {
      current: new Date(2021, 1, 10),
      weekend: '0000001',
      datebook,
    },
    expected: EXPECTEDS[2],
  },
  {
    name: {
      describe: 'Month: property days',
      test: 'month.days match object contents',
    },
    day: 19,
    options: {
      current: new Date(2021, 2, 15),
      weekend: '0000001',
      datebook,
    },
    expected: EXPECTEDS[3],
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe.each(MONTH_DAYS)('$name.describe', ({ name, day, options, expected }) => {
  const month = new Month(options);
  const DAY = month.days[day];
  test(name.test, () => {
    expect(DAY).toEqual(expected);
  });
});
