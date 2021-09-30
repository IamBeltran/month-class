# Class: Month

![Logo](docs/LOGO.png)

The `Month` class manages the information of a month from given date, such as number of weeks, number of work days, number of weekend.

## Constructor `new Month([options])`

Creates an instance of Month.

The class `Month` requires an optional parameter `options`, must be an `object` with the properties `current`, `weekend` and `datebook`.

The `options.current` value must be type `date`, it is used as a base to identify the days that have `elapsed`, the `remaining` days of the month and `current` day, the `default` value is `new Date()`.

The `options.weekend` value must be a `string` or integer `number` between `0` to `15`. If a `string` is passed, the string must match to regex `/^[0-1]{7}$/`, the `default` value is `0`.

The `options.datebook` value must be an object `array`, that represents a collection of scheduled activities from a Datebook, the default value is `[]`.

Parameters Description:

| Name               | Type            | Attributes                | Description                                                                  |
|--------------------|-----------------|---------------------------|------------------------------------------------------------------------------|
| `options`          | `object`        | `[optional]`              | Month class options.                                                         |
| `options.current`  | `Date`          | `[optional = new Date()]` | Current date of month.                                                       |
| `options.weekend`  | `WeekendOption` | `[optional = 0]`          | Option to specify weekends. [See Weekend option](#Weekend-option).           |
| `options.datebook` | `Datebook`      | `[optional = []]`         | Scheduled activities of the month. [See Datebook-option](#Datebook-option).  |

### Throws

- If `options.current` is not instance Date, Type `MonthError`.
- If `options.weekend` is not a valid weekend option, Type `MonthError`.
- If `options.datebook` is not an array, Type `MonthError`.
- If any `options.datebook` elements is not a valid object, Type `MonthError`.

### Examples

```javascript
const month = new Month();

const month = new Month({
  current: new Date(2021, 0, 15),
  weekend: 0,
  datebook: [
    {
      date: '2021-01-20',
      title: "Mom's birthday",
      description: "Don't forget to buy a gift",
      type: 'event',
      holiday: true,
    },
    {
      date: '2021-01-10',
      title: 'Send final sales report',
      description: "Don't forget to attach graphics",
      type: 'task',
      holiday: true,
    },
      date: new Date(2021, 0, 15).toISOString(),
      title: 'Rick and morty season finale',
      description: "Don't forget to order pizza",
      type: 'task',
      holiday: true,
    }
  ],
});
```

### Weekend option

The `weekend` option indicates the days of the week that are taken as the weekend in the month.

Must be a `string` or integer `number` between `0` to `15`. If a `string` is passed, the string must match to regex `/^[0-1]{7}$/`. For example if want to indicate that weekends are Fridays, the value must be `"0000100"`.

The following table shows the corresponding days if a number is passed and its `string` equivalent.

| Number | String      | Weekday             |
|--------|-------------|---------------------|
| 0      | `'0000011'` | Saturday, Sunday    |
| 1      | `'1000001'` | Sunday, Monday      |
| 2      | `'1100000'` | Monday, Tuesday     |
| 3      | `'0110000'` | Tuesday, Wednesday  |
| 4      | `'0011000'` | Wednesday, Thursday |
| 5      | `'0001100'` | Thursday, Friday    |
| 6      | `'0000110'` | Friday, Saturday    |
| 7      | `'0000001'` | Sunday              |
| 8      | `'1000000'` | Monday              |
| 9      | `'0100000'` | Tuesday             |
| 10     | `'0010000'` | Wednesday           |
| 11     | `'0001000'` | Thursday            |
| 12     | `'0000100'` | Friday              |
| 13     | `'0000010'` | Saturday            |
| 14     | `'0000001'` | Sunday              |
| 15     | `'0000000'` | None                |

### Datebook option

The `datebook` option is a collection of scheduled activities.

Must be an array of objects that follow the following characteristics

| Property      | Type      | Description                                                               |
|---------------|-----------|---------------------------------------------------------------------------|
| `date`        | `string`  | Scheduled date for activity, ISO format (ISO 8601) `"YYYY-MM-DD"`.        |
| `title`       | `string`  | Activity title.                                                           |
| `description` | `string`  | Activity description.                                                     |
| `holiday`     | `boolean` | If activity is taken as a holiday.                                        |
| `type`        | `string`  | Activity type, allowed values: `task`, `event`, `appointment`, `meeting`. |

```javascript
// Example
const datebook = [{
  date: '2021-01-20',
  title: "Mom's birthday",
  description: "Don't forget to buy a gift",
  type: 'event',
  holiday: true,
},{
  date: '2021-01-10',
  title: 'Send final sales report',
  description: "Don't forget to attach graphics",
  type: 'task',
  holiday: true,
},{
  date: new Date(2021, 0, 15).toISOString(),
  title: 'Rick and morty season finale',
  description: "Don't forget to order pizza",
  type: 'task',
  holiday: true,
}];

```

## Instance Properties

### YYMMDD `Readonly`

- Type `Array.<number>`

Description:

### WEEKEND `Readonly`

- Type `Array.<number>`

Description:

### SCE `Readonly`

- Type `Array.<number>`

Description:

### year

- Type `number`

Description: The year of the month.

Its value is like `Date.prototype.getFullYear()`.

### number

- Type `number`

Description: The month number.

Its value is like `Date.prototype.getMonth()`.

### planner

- Type `Planner` [See Planner](#Type-Planner)

Description: Ordered collection of plans of the month.

### weekends

- Type `Array.<number>`

Description:

### holidays

- Type `Array.<number>`

Description:

### nonworkdays

- Type `Array.<number>`

Description:

### days

- Type `Days`

Description:

### summary

- Type `Sumary`

Description:

## Instance Methods

## Type Definitions

### Type Planner

- Type: `object`

Ordered collection of activities of the month.

An object with the properties `tasks`, `events`, `appointments` and `meetings`, each property of the object is an `array`.

Properties:

| Name            | Type                   | Description                                                        |
|-----------------|------------------------|--------------------------------------------------------------------|
| `tasks`         | `Array.<Task>`         | Collection of all [Tasks](#Type-Task) for the month.               |
| `events`        | `Array.<Event>`        | Collection of all [Events](#Type-Event) for the month.             |
| `appointments`  | `Array.<Appointment>`  | Collection of all [Appointments](#Type-Appointment) for the month. |
| `meetings`      | `Array.<Meeting>`      | Collection of all [Meetings](#Type-Meeting) for the month.         |

### Type Task

- Type: `object`

A task-type scheduled activity.

An object with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.

Properties:

| Name          | Type             | Description                               |
|---------------|------------------|-------------------------------------------|
| `date`        | `string`         | Scheduled date for the task "YYYY-MM-DD"  |
| `title`       | `string`         | Task title.                               |
| `description` | `string`         | Task description.                         |
| `holiday`     | `boolean`        | If the task is taken as a holiday.        |
| `type`        | `"task"`         | Type of scheduled activity task.          |
| `YYMMDD`      | `Array.<number>` | Scheduled date for the task [YY, MM, DD]. |

### Type Event

- Type: `object`

A event-type scheduled activity.

An object with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.

Properties:

| Name          | Type             | Description                                |
|---------------|------------------|--------------------------------------------|
| `date`        | `string`         | Scheduled date for the event "YYYY-MM-DD"  |
| `title`       | `string`         | Event title.                               |
| `description` | `string`         | Event description.                         |
| `holiday`     | `boolean`        | If the Event is taken as a holiday.        |
| `type`        | `"event"`        | Type of scheduled activity event.          |
| `YYMMDD`      | `Array.<number>` | Scheduled date for the event [YY, MM, DD]. |

## USAGE

## TODO
