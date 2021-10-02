# 🗓️ Month class

The `Month` class manages the information of a month from given date, such as number of weeks, number of work days, number of weekend.

## Installation

First install Node.js. Then:

```javascript
npm install month-class
```

## Importing

```javascript
// Using Node.js `require()`
const Month = require('month-class');

// Using ES6 imports
import Month from 'month-class';
```

## Overview

### Create instance

```javascript
const Month = require('month-class');

const month = new Month();

// It is equivalent
const month = new Month({
  current: new Date(),
  weekend: 0,
  datebook: [],
});
```

### Select weekends

See [documentation](https://github.com/IamBeltran/month-class/blob/main/docs/API_DOCS.md) for more details.

```javascript
const month = new Month({
  current: new Date(),
  weekend: 14, // Sunday is the only weekend
});

// It is equivalent
const month = new Month({
  current: new Date(),
  weekend: '0000001', // Sunday is the only weekend
});
```

### Activity

Information about a scheduled activity.

An `Object` containing the properties `date`, `title`, `description`, `type` and `holiday`.

__Important!__ All properties are required, `date` is a `string` with ISO format (ISO 8601).

```javascript
const Month = require('month-class');

const activity = {
  date: '2021-01-11', // before current day
  title: 'Send final sales report',
  description: "Don't forget to attach graphics",
  type: 'task', // Allowed values: 'task', 'event', 'appointment', 'meeting'.
  holiday: false,
};

const month = new Month({
  current: new Date(2021, 0, 15),
  datebook: [activity],
});

```

### Datebook

The 'datebook' is a collection of activities, those that do not correspond to the month will be omitted, leaving only those of the month indicated in current.

```javascript
const Month = require('month-class');

const date = new Date(2021, 0, 15);
const datebook = [{
  date: '2021-01-11',
  title: 'Send final sales report',
  description: "Don't forget to attach graphics",
  type: 'task',
  holiday: false,
},{
  date: new Date(2021, 0, 10).toISOString(),
  title: 'Meeting with managers',
  description: "In the cafe in the square, 11:30 a.m.",
  type: 'meeting',
  holiday: false,
},{
  date: '2021-02-11', // Will be omitted
  title: 'Send product catalog',
  description: "Don't forget to attach photos",
  type: 'task',
  holiday: false,
}];

const month = new Month({
  current: date,
  datebook,
});

// or
const month = new Month({ current: date });

month.addDatebook(datebook);
```

### Workdays

The workdays are: `workdays = month days - nonworkdays`

The non-workdays are: `nonworkdays = weekdays + holidays`

```javascript
const Month = require('month-class');

const date = new Date(2021, 0, 15); // 31 days
const datebook = [{
  date: new Date(2021, 0, 11).toISOString(),
  title: 'Meeting with managers',
  description: "In the cafe in the square, 11:30 a.m.",
  type: 'meeting',
  holiday: true, // One holiday
}];

const weekend = '0000001' // Sunday is weekend

const month = new Month({ current: date, datebook });

//    [        2021-01-15        ]
//    [ S,  M,  T,  W,  T,  F,  S]
// 01 [                     1,  2]
// 02 [ 3,  4,  5,  6,  7,  8,  9]
// 03 [10, 11, 12, 13, 14, 15, 16]
// 04 [17, 18, 19, 20, 21, 22, 23]
// 05 [24, 25, 26, 27, 28, 29, 30]
// 06 [31                        ]

//    WEEKENDS     [3, 10, 17, 24, 31] =  5
//    HOLIDAYS                    [11] =  1
// NONWORKDAYS [3, 10, 11, 17, 24, 31] =  6

//       TOTAL [1, 2, 3, 4, 5,..., 31] = 31
//    WORKDAYS [1, 2, 4, 5, 6,..., 30] = 31 - 6 = 25

```

### Month.prototype.days

```javascript
const Month = require('month-class');

// or const month = new Month();
const month = new Month({
  current: new Date(2021, 0, 15), // Friday, January 15 2021
  weekend: '0000011', // Weekend days: Saturday Sunday
  datebook: [{
    date: '2021-01-11',
    title: 'Send final sales report',
    description: "Don't forget to attach graphics",
    type: 'task', // Allowed values: 'task', 'event', 'appointment', 'meeting'.
    holiday: false,
  },{
    date: '2021-08-14', // The date does not correspond to the indicated month, Will be omitted.
    title: 'Rick and morty season finale',
    description: "Don't forget to order pizza",
    type: 'event',
    holiday: false,
  },{
    date: '2021-01-26',
    title: 'Pay the credit card',
    description: 'Amount 345.50',
    type: 'task',
    holiday: false,
  },{
    date: '2021-01-19',
    title: 'Meeting with investors',
    description: 'Send quote before',
    type: 'task',
    holiday: true, // One less work-day
  }],
});

// Array with information of the month
const { days } = month;

console.log(days.length); // Expected value 31
console.log(days[10]);
/*
{
  day: 11,
  date: [ 2021, 0, 11 ],
  weekday: 1,
  type: 'elapsed',
  week: 3,
  workday: 7,
  isWorkday: true,
  isWeekend: false,
  scheduled: { tasks: 1, events: 0, appointments: 0, meetings: 0, total: 1 }
}
*/

console.log(days[18]);
/*
{
  day: 19,
  date: [ 2021, 0, 19 ],
  weekday: 2,
  type: 'remaining',
  week: 4,
  workday: 12,
  isWorkday: false,
  isWeekend: false,
  scheduled: { tasks: 0, events: 0, appointments: 0, meetings: 1, total: 1 }
}
*/

```

### Month.prototype.planner

```javascript
const Month = require('month-class');

// or const month = new Month();
const month = new Month({
  current: new Date(2021, 0, 15), // Friday, January 15 2021
  weekend: '0000011', // Weekend days: Saturday Sunday
  datebook: [{
    date: '2021-01-11',
    title: 'Send final sales report',
    description: "Don't forget to attach graphics",
    type: 'task', // Allowed values: 'task', 'event', 'appointment', 'meeting'.
    holiday: false,
  },{
    date: '2021-08-14', // The date does not correspond to the indicated month, Will be omitted.
    title: 'Rick and morty season finale',
    description: "Don't forget to order pizza",
    type: 'event',
    holiday: false,
  },{
    date: '2021-01-26',
    title: 'Pay the credit card',
    description: 'Amount 345.50',
    type: 'task',
    holiday: false,
  },{
    date: '2021-01-19',
    title: 'Meeting with investors',
    description: 'Send quote before',
    type: 'task',
    holiday: true, // One less work-day
  }],
});

// Object with scheduled activities, organized by type
const { planner } = month;

console.log(planner);
/*
{
  tasks: [...],         3 elements
  events: [...],        1 element
  appointments: [...],  0 elements
  meetings: [...],      0 elements
}
*/

console.log(planner.events);

/*
[
  {
    date: '2021-08-14',
    title: 'Rick and morty season finale',
    description: "Don't forget to order pizza",
    type: 'event',
    holiday: false,
  },
]
*/

```

## API Docs

Find the API docs [here](https://github.com/IamBeltran/month-class/blob/main/docs/API_DOCS.md)

## TODO

- 🔳 Create react provider.
