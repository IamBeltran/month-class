/**
 * @file Manage unit tests for the month class.
 */

// ━━	IMPORT MODULES	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const Month = require('../src');
const datebook = require('./fixture/dummy.datebook');
// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const EXPECTEDS = [
  {
    tasks: [
      {
        date: '2021-01-04',
        title: 'Dummy todo 01',
        description: 'On the day 04th',
        holiday: true,
        type: 'task',
        YYMMDD: [2021, 0, 4],
      },
      {
        date: '2021-01-11',
        title: 'Dummy todo 02',
        description: 'On the day 11th',
        holiday: false,
        type: 'task',
        YYMMDD: [2021, 0, 11],
      },
    ],
    events: [
      {
        date: '2021-01-18',
        title: 'Dummy todo 03',
        description: 'On the day 18th',
        holiday: false,
        type: 'event',
        YYMMDD: [2021, 0, 18],
      },
      {
        date: '2021-01-25',
        title: 'Dummy todo 04',
        description: 'On the day 25th',
        holiday: true,
        type: 'event',
        YYMMDD: [2021, 0, 25],
      },
    ],
    appointments: [
      {
        date: '2021-01-05',
        title: 'Dummy todo 05',
        description: 'On the day 05th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 0, 5],
      },
      {
        date: '2021-01-12',
        title: 'Dummy todo 06',
        description: 'On the day 12th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 0, 12],
      },
    ],
    meetings: [
      {
        date: '2021-01-19',
        title: 'Dummy todo 07',
        description: 'On the day 19th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 0, 19],
      },
      {
        date: '2021-01-25',
        title: 'Dummy todo 08',
        description: 'On the day 25th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 0, 25],
      },
      {
        date: '2021-01-08',
        title: 'Dummy todo 09',
        description: 'On the day 19th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 0, 8],
      },
      {
        date: '2021-01-15',
        title: 'Dummy todo 10',
        description: 'On the day 25th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 0, 15],
      },
    ],
  },

  {
    tasks: [
      {
        date: '2021-01-04',
        title: 'Dummy todo 01',
        description: 'On the day 04th',
        holiday: true,
        type: 'task',
        YYMMDD: [2021, 0, 4],
      },
      {
        date: '2021-01-11',
        title: 'Dummy todo 02',
        description: 'On the day 11th',
        holiday: false,
        type: 'task',
        YYMMDD: [2021, 0, 11],
      },
    ],
    events: [
      {
        date: '2021-01-18',
        title: 'Dummy todo 03',
        description: 'On the day 18th',
        holiday: false,
        type: 'event',
        YYMMDD: [2021, 0, 18],
      },
      {
        date: '2021-01-25',
        title: 'Dummy todo 04',
        description: 'On the day 25th',
        holiday: true,
        type: 'event',
        YYMMDD: [2021, 0, 25],
      },
    ],
    appointments: [
      {
        date: '2021-01-05',
        title: 'Dummy todo 05',
        description: 'On the day 05th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 0, 5],
      },
      {
        date: '2021-01-12',
        title: 'Dummy todo 06',
        description: 'On the day 12th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 0, 12],
      },
    ],
    meetings: [
      {
        date: '2021-01-19',
        title: 'Dummy todo 07',
        description: 'On the day 19th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 0, 19],
      },
      {
        date: '2021-01-25',
        title: 'Dummy todo 08',
        description: 'On the day 25th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 0, 25],
      },
      {
        date: '2021-01-08',
        title: 'Dummy todo 09',
        description: 'On the day 19th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 0, 8],
      },
      {
        date: '2021-01-15',
        title: 'Dummy todo 10',
        description: 'On the day 25th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 0, 15],
      },
    ],
  },

  {
    tasks: [
      {
        date: '2021-02-01',
        title: 'Dummy todo 11',
        description: 'On the day 01th',
        holiday: true,
        type: 'task',
        YYMMDD: [2021, 1, 1],
      },
      {
        date: '2021-02-08',
        title: 'Dummy todo 12',
        description: 'On the day 08th',
        holiday: false,
        type: 'task',
        YYMMDD: [2021, 1, 8],
      },
    ],
    events: [
      {
        date: '2021-02-15',
        title: 'Dummy todo 13',
        description: 'On the day 15th',
        holiday: false,
        type: 'event',
        YYMMDD: [2021, 1, 15],
      },
      {
        date: '2021-02-22',
        title: 'Dummy todo 14',
        description: 'On the day 22th',
        holiday: true,
        type: 'event',
        YYMMDD: [2021, 1, 22],
      },
    ],
    appointments: [
      {
        date: '2021-02-02',
        title: 'Dummy todo 15',
        description: 'On the day 02th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 1, 2],
      },
      {
        date: '2021-02-09',
        title: 'Dummy todo 16',
        description: 'On the day 09th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 1, 9],
      },
    ],
    meetings: [
      {
        date: '2021-02-16',
        title: 'Dummy todo 17',
        description: 'On the day 16th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 1, 16],
      },
      {
        date: '2021-02-23',
        title: 'Dummy todo 18',
        description: 'On the day 23th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 1, 23],
      },
      {
        date: '2021-02-05',
        title: 'Dummy todo 19',
        description: 'On the day 05th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 1, 5],
      },
      {
        date: '2021-02-12',
        title: 'Dummy todo 20',
        description: 'On the day 12th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 1, 12],
      },
    ],
  },
  {
    tasks: [
      {
        date: '2021-03-03',
        title: 'Dummy todo 21',
        description: 'On the day 04th',
        holiday: true,
        type: 'task',
        YYMMDD: [2021, 2, 3],
      },
      {
        date: '2021-03-10',
        title: 'Dummy todo 22',
        description: 'On the day 11th',
        holiday: false,
        type: 'task',
        YYMMDD: [2021, 2, 10],
      },
    ],
    events: [
      {
        date: '2021-03-17',
        title: 'Dummy todo 23',
        description: 'On the day 18th',
        holiday: false,
        type: 'event',
        YYMMDD: [2021, 2, 17],
      },
      {
        date: '2021-03-24',
        title: 'Dummy todo 24',
        description: 'On the day 25th',
        holiday: true,
        type: 'event',
        YYMMDD: [2021, 2, 24],
      },
    ],
    appointments: [
      {
        date: '2021-03-31',
        title: 'Dummy todo 25',
        description: 'On the day 05th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 2, 31],
      },
      {
        date: '2021-03-04',
        title: 'Dummy todo 26',
        description: 'On the day 12th',
        holiday: false,
        type: 'appointment',
        YYMMDD: [2021, 2, 4],
      },
    ],
    meetings: [
      {
        date: '2021-03-11',
        title: 'Dummy todo 27',
        description: 'On the day 19th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 2, 11],
      },
      {
        date: '2021-03-18',
        title: 'Dummy todo 28',
        description: 'On the day 25th',
        holiday: false,
        type: 'meeting',
        YYMMDD: [2021, 2, 18],
      },
      {
        date: '2021-03-25',
        title: 'Dummy todo 29',
        description: 'On the day 19th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 2, 25],
      },
      {
        date: '2021-03-31',
        title: 'Dummy todo 30',
        description: 'On the day 25th',
        holiday: true,
        type: 'meeting',
        YYMMDD: [2021, 2, 31],
      },
    ],
  },
];

const MONTH_PLANNER = [
  {
    name: {
      describe: 'Month: property planner',
      test: 'month.planner match object contents',
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
      describe: 'Month: property planner',
      test: 'month.planner match object contents',
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
      describe: 'Month: property planner',
      test: 'month.planner match object contents',
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
      describe: 'Month: property planner',
      test: 'month.planner match object contents',
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
describe.each(MONTH_PLANNER)('$name.describe', ({ name, options, expected }) => {
  const month = new Month(options);
  test(name.test, () => {
    expect(month.planner).toEqual(expected);
  });
});
