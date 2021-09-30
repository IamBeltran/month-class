/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MONTH_WEEKENDS = [
  {
    name: {
      describe: 'Month: property weekends',
      test: 'month.weekends match array contents',
    },
    options: { current: new Date(2021, 0, 15), weekend: '0000001' },
    expected: [3, 10, 17, 24, 31],
  },
  {
    name: {
      describe: 'Month: property weekends',
      test: 'month.weekends match array contents',
    },
    options: { current: new Date(2021, 0, 15), weekend: '0000011' },
    expected: [2, 3, 9, 10, 16, 17, 23, 24, 30, 31],
  },
  {
    name: {
      describe: 'Month: property weekends',
      test: 'month.weekends match array contents',
    },
    options: { current: new Date(2021, 1, 10), weekend: '0000001' },
    expected: [7, 14, 21, 28],
  },
  {
    name: {
      describe: 'Month: property weekends',
      test: 'month.weekends match array contents',
    },
    options: { current: new Date(2021, 2, 15), weekend: '0000001' },
    expected: [7, 14, 21, 28],
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe.each(MONTH_WEEKENDS)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.weekends).toEqual(expected);
  });
});
