/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');
const datebook = require('./fixture/dummy.datebook');
// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MONTH_HOLIDAYS = [
  {
    name: {
      describe: 'Month: property holidays',
      test: 'month.holidays match array contents',
    },
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000001',
      datebook,
    },
    expected: [4, 25, 8, 15],
  },
  {
    name: {
      describe: 'Month: property holidays',
      test: 'month.holidays match array contents',
    },
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000011',
      datebook,
    },
    expected: [4, 25, 8, 15],
  },
  {
    name: {
      describe: 'Month: property holidays',
      test: 'month.holidays match array contents',
    },
    options: {
      current: new Date(2021, 1, 10),
      weekend: '0000001',
      datebook,
    },
    expected: [1, 22, 5, 12],
  },
  {
    name: {
      describe: 'Month: property holidays',
      test: 'month.holidays match array contents',
    },
    options: {
      current: new Date(2021, 2, 15),
      weekend: '0000001',
      datebook,
    },
    expected: [3, 24, 25, 31],
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe.each(MONTH_HOLIDAYS)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.holidays).toEqual(expected);
  });
});
