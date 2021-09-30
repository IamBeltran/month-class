/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const MONTH_YYMMDD = [
  {
    name: {
      describe: 'Month: read-only property YYMMDD',
      test: 'month.YYMMDD match array contents',
    },
    options: { current: new Date(2020, 1, 15) },
    expected: [2020, 1, 15],
  },
  {
    name: {
      describe: 'Month: read-only property YYMMDD',
      test: 'month.YYMMDD match array contents',
    },
    options: { current: new Date(2017, 2, 15) },
    expected: [2017, 2, 15],
  },
  {
    name: {
      describe: 'Month: read-only property YYMMDD',
      test: 'month.YYMMDD match array contents',
    },
    options: { current: new Date(2016, 0, 3) },
    expected: [2016, 0, 3],
  },
  {
    name: {
      describe: 'Month: read-only property YYMMDD',
      test: 'month.YYMMDD match array contents',
    },
    options: { current: new Date(2018, 4, 5) },
    expected: [2018, 4, 5],
  },
  {
    name: {
      describe: 'Month: read-only property YYMMDD',
      test: 'month.YYMMDD match array contents',
    },
    options: { current: new Date(2019, 10, 15) },
    expected: [2019, 10, 15],
  },
];

const MONTH_WEEKEND = [
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 0 },
    expected: [6, 0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 1 },
    expected: [1, 0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 2 },
    expected: [1, 2],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 3 },
    expected: [2, 3],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 4 },
    expected: [3, 4],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 5 },
    expected: [4, 5],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 6 },
    expected: [5, 6],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 7 },
    expected: [0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 8 },
    expected: [1],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 9 },
    expected: [2],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 10 },
    expected: [3],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 11 },
    expected: [4],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 12 },
    expected: [5],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 13 },
    expected: [6],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: 14 },
    expected: [0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0000011' },
    expected: [6, 0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '1000001' },
    expected: [1, 0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '1100000' },
    expected: [1, 2],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0110000' },
    expected: [2, 3],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0011000' },
    expected: [3, 4],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0001100' },
    expected: [4, 5],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0000110' },
    expected: [5, 6],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0000001' },
    expected: [0],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '1000000' },
    expected: [1],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0100000' },
    expected: [2],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0010000' },
    expected: [3],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0001000' },
    expected: [4],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0000100' },
    expected: [5],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0000010' },
    expected: [6],
  },
  {
    name: {
      describe: 'Month: read-only property WEEKEND',
      test: 'month.WEEKEND match array contents',
    },
    options: { weekend: '0000000' },
    expected: [],
  },
];

const MONTH_SCE = [
  {
    name: {
      describe: 'Month: read-only property SCE',
      test: 'month.SCE match array contents',
    },
    options: { current: new Date(2020, 1, 15) },
    expected: [1, 15, 29],
  },
  {
    name: {
      describe: 'Month: read-only property SCE',
      test: 'month.SCE match array contents',
    },
    options: { current: new Date(2021, 1, 20) },
    expected: [1, 20, 28],
  },
  {
    name: {
      describe: 'Month: read-only property SCE',
      test: 'month.SCE match array contents',
    },
    options: { current: new Date(2021, 0, 3) },
    expected: [1, 3, 31],
  },
  {
    name: {
      describe: 'Month: read-only property SCE',
      test: 'month.SCE match array contents',
    },
    options: { current: new Date(2021, 3, 10) },
    expected: [1, 10, 30],
  },
  {
    name: {
      describe: 'Month: read-only property SCE',
      test: 'month.SCE match array contents',
    },
    options: { current: new Date(2021, 4, 15) },
    expected: [1, 15, 31],
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
describe.each(MONTH_YYMMDD)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.YYMMDD).toEqual(expected);
  });
});

describe.each(MONTH_WEEKEND)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.WEEKEND).toEqual(expected);
  });
});

describe.each(MONTH_SCE)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.SCE).toEqual(expected);
  });
});
