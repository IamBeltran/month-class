/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');
const datebook = require('./fixture/dummy.datebook');
// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EXPECTEDS = [
  {
    dates: {
      start: new Date(2021, 0, 1),
      current: new Date(2021, 0, 15),
      end: new Date(2021, 0, 31),
    },
    days: {
      current: 15,
      total: 31,
      elapsed: 14,
      remaining: 16,
      percentage: 0.48,
    },
    weeks: {
      current: 3,
      total: 6,
      elapsed: 2,
      remaining: 3,
      percentage: 0.5,
    },
    workdays: {
      current: 10,
      total: 22,
      elapsed: 9,
      remaining: 12,
      percentage: 0.45,
    },
  },
  {
    dates: {
      start: new Date(2021, 0, 1),
      current: new Date(2021, 0, 15),
      end: new Date(2021, 0, 31),
    },
    days: {
      current: 15,
      total: 31,
      elapsed: 14,
      remaining: 16,
      percentage: 0.48,
    },
    weeks: {
      current: 3,
      total: 6,
      elapsed: 2,
      remaining: 3,
      percentage: 0.5,
    },
    workdays: {
      current: 8,
      total: 17,
      elapsed: 7,
      remaining: 9,
      percentage: 0.47,
    },
  },
  {
    dates: {
      start: new Date(2021, 1, 1),
      current: new Date(2021, 1, 10),
      end: new Date(2021, 1, 28),
    },
    days: {
      current: 10,
      total: 28,
      elapsed: 9,
      remaining: 18,
      percentage: 0.36,
    },
    weeks: {
      current: 2,
      total: 5,
      elapsed: 1,
      remaining: 3,
      percentage: 0.4,
    },
    workdays: {
      current: 7,
      total: 20,
      elapsed: 6,
      remaining: 13,
      percentage: 0.35,
    },
  },
  {
    dates: {
      start: new Date(2021, 2, 1),
      current: new Date(2021, 2, 15),
      end: new Date(2021, 2, 31),
    },
    days: {
      current: 15,
      total: 31,
      elapsed: 14,
      remaining: 16,
      percentage: 0.48,
    },
    weeks: {
      current: 3,
      total: 5,
      elapsed: 2,
      remaining: 2,
      percentage: 0.6,
    },
    workdays: {
      current: 12,
      total: 23,
      elapsed: 11,
      remaining: 11,
      percentage: 0.52,
    },
  },
];

const MONTH_SUMMARY = [
  {
    name: {
      describe: 'Month: property summary',
      test: 'month.summary match object contents',
    },
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000001',
      datebook,
    },
    expected: EXPECTEDS[0],
  },
  {
    name: {
      describe: 'Month: property summary',
      test: 'month.summary match object contents',
    },
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000011',
      datebook,
    },
    expected: EXPECTEDS[1],
  },
  {
    name: {
      describe: 'Month: property summary',
      test: 'month.summary match object contents',
    },
    options: {
      current: new Date(2021, 1, 10),
      weekend: '0000001',
      datebook,
    },
    expected: EXPECTEDS[2],
  },
  {
    name: {
      describe: 'Month: property summary',
      test: 'month.summary match object contents',
    },
    options: {
      current: new Date(2021, 2, 15),
      weekend: '0000001',
      datebook,
    },
    expected: EXPECTEDS[3],
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe.each(MONTH_SUMMARY)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.summary).toEqual(expected);
  });
});
