/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');
const datebook = require('./fixture/dummy.datebook');
// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MONTH_NONWORKDAYS = [
  {
    name: {
      describe: 'Month: property nonworkdays',
      test: 'month.nonworkdays match array contents',
    },
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000001',
      datebook,
    },
    expected: [3, 4, 8, 10, 15, 17, 24, 25, 31],
  },
  {
    name: {
      describe: 'Month: property nonworkdays',
      test: 'month.nonworkdays match array contents',
    },
    options: {
      current: new Date(2021, 0, 15),
      weekend: '0000011',
      datebook,
    },
    expected: [2, 3, 4, 8, 9, 10, 15, 16, 17, 23, 24, 25, 30, 31],
  },
  {
    name: {
      describe: 'Month: property nonworkdays',
      test: 'month.nonworkdays match array contents',
    },
    options: {
      current: new Date(2021, 1, 10),
      weekend: '0000001',
      datebook,
    },
    expected: [1, 5, 7, 12, 14, 21, 22, 28],
  },
  {
    name: {
      describe: 'Month: property nonworkdays',
      test: 'month.nonworkdays match array contents',
    },
    options: {
      current: new Date(2021, 2, 15),
      weekend: '0000001',
      datebook,
    },
    expected: [3, 7, 14, 21, 24, 25, 28, 31],
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe.each(MONTH_NONWORKDAYS)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  // console.log(month.nonworkdays);
  test(name.test, () => {
    expect(month.nonworkdays).toEqual(expected);
  });
});
