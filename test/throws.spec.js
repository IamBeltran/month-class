/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');
const MonthError = require('../src/MonthError');

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ERRORS = MonthError.messages;

const MONTH_ERROR = [
  {
    name: {
      describe: 'Month: throws MonthError',
      test: 'invalid type current should throw: MonthError',
    },
    options: { current: true },
    error: MonthError,
  },
  {
    name: {
      describe: 'Month: throws MonthError',
      test: 'invalid type weekend should throw: MonthError',
    },
    options: { weekend: true },
    error: MonthError,
  },
  {
    name: {
      describe: 'Month: throws MonthError',
      test: 'invalid type datebook should throw: MonthError',
    },
    options: { datebook: true },
    error: MonthError,
  },
  {
    name: {
      describe: 'Month: throws MonthError',
      test: 'invalid datebook schema should throw: MonthError',
    },
    options: { datebook: [true] },
    error: MonthError,
  },
];

const MONTH_ERROR_MESSAGES = [
  {
    name: {
      describe: 'Month: throws MonthError.messages',
      test: `invalid type current should throw: ${ERRORS.TYPE_CURRENT_OPTION}`,
    },
    options: { current: true },
    message: ERRORS.TYPE_CURRENT_OPTION,
  },
  {
    name: {
      describe: 'Month: throws MonthError.messages',
      test: `invalid type weekend should throw: ${ERRORS.INVALID_WEEKEND_OPTION}`,
    },
    options: { weekend: true },
    message: ERRORS.INVALID_WEEKEND_OPTION,
  },
  {
    name: {
      describe: 'Month: throws MonthError.messages',
      test: `invalid type datebook should throw: ${ERRORS.TYPE_DATEBOOK_OPTION}`,
    },
    options: { datebook: true },
    message: ERRORS.TYPE_DATEBOOK_OPTION,
  },
  {
    name: {
      describe: 'Month: throws MonthError.messages',
      test: `invalid datebook items should throw: ${ERRORS.INVALID_DATEBOOK_SCHEMA}`,
    },
    options: { datebook: [true] },
    message: ERRORS.INVALID_DATEBOOK_SCHEMA,
  },
];

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » THROW TEST
describe.each(MONTH_ERROR)('$name.describe', ({ name, options, error }) => {
  test(name.test, () => {
    expect(() => new Month(options)).toThrow(error);
  });
});

describe.each(MONTH_ERROR_MESSAGES)('$name.describe', ({ name, options, message }) => {
  test(name.test, () => {
    expect(() => new Month(options)).toThrow(message);
  });
});
