# Class: Month

![Logo](docs/LOGO.png)

The `Month` class manages the information of a month from given date, such as number of weeks, number of work days, number of weekend.

## USAGE

## Constructor `new Month([options])`

Creates an instance of Month.

The class `Month` requires an optional parameter `options`, must be an `object` with the properties `current`, `weekend` and `datebook`.

The `options.current` value must be type `date`, it is used as a base to identify the days that have `elapsed`, the `remaining` days of the month and `current` day, the `default` value is `new Date()`.

The `options.weekend` value must be a `string` or integer `number` between `0` to `15`. If a `string` is passed, the string must match to regex `/^[0-1]{7}$/`, the `default` value is `0`.

The `options.datebook` value must be an object `array`, that represents a collection of scheduled activities from a Datebook, the default value is `[]`.

Parameters Description:

| Name               | Type            | Attributes                | Description                                                                |
|--------------------|-----------------|---------------------------|----------------------------------------------------------------------------|
| `options`          | `object`        | `[optional]`              | Month class options.                                                       |
| `options.current`  | `Date`          | `[optional = new Date()]` | Current date of month.                                                     |
| `options.weekend`  | `WeekendOption` | `[optional = 0]`          | Option to specify weekends. [See Weekend option](#Type-WeekendOption).     |
| `options.datebook` | `Datebook`      | `[optional = []]`         | Scheduled activities of the month. [See Datebook option](#Type-Datebook).  |

Throws:

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

## Instance properties

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

Description: Collection of activities of the month, organized by type.

An `object` with the properties `tasks`, `events`, `appointments` and `meetings`, every property of the object is an `array`.

### weekends

- Type `Array.<number>`

Description: The month days that are weekends.

A number `array` that value of elements is like `Date.prototype.getDate()`.

### holidays

- Type `Array.<number>`

Description: The month days that are holidays.

A number `array` that value of elements is like `Date.prototype.getDate()`.

### nonworkdays

- Type `Array.<number>`

Description: The month days that are non workdays.

A number `array` that value of elements is like a `Date.prototype.getDate()`.

### days

- Type `Days` [See Days](#Type-Days)

Description: The details of the days of the month, a collection of information about all the days of the month.

An object `array`, every array element contains information about a day of the month, If it is a weekend or a work day, if it has already elapsed, it is the current day, week number.

### summary

- Type `Sumary` [See Sumary](#Type-Sumary)

Description: Summary of the month with information on weeks, working days and dates.

An object with the properties `dates`, `days`, `weeks`, and `workdays`.

## Instance methods

### addDatebook(datebook) → {this}

The datebook value must be an object array, that represents a collection of scheduled activities from a Datebook.

Parameters Description:

| Name        | Type        | Attributes        | Description                                                               |
|-------------|-------------|-------------------|---------------------------------------------------------------------------|
| `datebook`  | `Datebook`  |                   | Scheduled activities of the month. [See Datebook option](#Type-Datebook). |

Throws:

- If `datebook` is not an array, Type `MonthError`.
- If any `datebook` elements is not a valid object, Type `MonthError`.

#### Example

```javascript
const month = new Month();

month.addDatebook([
  {
    date: '2021-01-10',
    title: 'Send final sales report',
    description: "Don't forget to attach graphics",
    type: 'task',
    holiday: true,
  },
]);
```

## Type Definitions

### Type `WeekendOption`

- Type: `number|string`

Description: The `weekend` option indicates the days of the week that are taken as the weekend in the month.

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

### Type `Datebook`

- Type: `Array.<Activity>` [See Activity](#Type-Activity)

Description: The `datebook` option is a collection of scheduled activities.

Must be an object `array`, every object must have the properties `date`, `title`, `description`, `holiday` and `type`.

### Type `Activity`

- Type: `Object`

Description: An activity scheduled on a datebook.

An `Object` that contains the details of a task, event, appointment or meeting.

Properties:

| Name          | Type      | Description                                                               |
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

### Type `Planner`

- Type: `Object`

Description: Collection of activities of the month.

An `Object` with the properties `tasks`, `events`, `appointments` and `meetings`, every property of the object is an array.

Properties:

| Name            | Type                   | Description                                                        |
|-----------------|------------------------|--------------------------------------------------------------------|
| `tasks`         | `Array.<Task>`         | Collection of all [Task](#Type-Task) for the month.                |
| `events`        | `Array.<Event>`        | Collection of all [Event](#Type-Event) for the month.              |
| `appointments`  | `Array.<Appointment>`  | Collection of all [Appointment](#Type-Appointment) for the month.  |
| `meetings`      | `Array.<Meeting>`      | Collection of all [Meeting](#Type-Meeting) for the month.          |

### Type `Task`

- Type: `Object`

Description: A task-type scheduled activity.

An `Object` that contains the details of a task, with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.

Properties:

| Name          | Type             | Description                               |
|---------------|------------------|-------------------------------------------|
| `date`        | `string`         | Scheduled date for the task "YYYY-MM-DD"  |
| `title`       | `string`         | Task title.                               |
| `description` | `string`         | Task description.                         |
| `holiday`     | `boolean`        | If the task is taken as a holiday.        |
| `type`        | `"task"`         | Type of scheduled activity task.          |
| `YYMMDD`      | `Array.<number>` | Scheduled date for the task [YY, MM, DD]. |

### Type `Event`

- Type: `Object`

Description: An event-type scheduled activity.

An `Object` that contains the details of an event, with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.

Properties:

| Name          | Type             | Description                                |
|---------------|------------------|--------------------------------------------|
| `date`        | `string`         | Scheduled date for the event "YYYY-MM-DD"  |
| `title`       | `string`         | Event title.                               |
| `description` | `string`         | Event description.                         |
| `holiday`     | `boolean`        | If the Event is taken as a holiday.        |
| `type`        | `"event"`        | Type of scheduled activity event.          |
| `YYMMDD`      | `Array.<number>` | Scheduled date for the event [YY, MM, DD]. |

### Type `Appointment`

- Type: `object`

Description: A appointment-type scheduled activity.

An `object` with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.

Properties:

| Name          | Type             | Description                                      |
|---------------|------------------|--------------------------------------------------|
| `date`        | `string`         | Scheduled date for the appointment "YYYY-MM-DD"  |
| `title`       | `string`         | Appointment title.                               |
| `description` | `string`         | Appointment description.                         |
| `holiday`     | `boolean`        | If the appointment is taken as a holiday.        |
| `type`        | `"appointment"`  | Type of scheduled activity appointment.          |
| `YYMMDD`      | `Array.<number>` | Scheduled date for the appointment [YY, MM, DD]. |

### Type `Meeting`

- Type: `object`

Description: A meeting-type scheduled activity.

An `object` with the properties `date`, `title`, `description`, `holiday`, `type`, and `YYMMDD`.

Properties:

| Name          | Type              | Description                                  |
|---------------|-------------------|----------------------------------------------|
| `date`        | `string`          | Scheduled date for the meeting "YYYY-MM-DD"  |
| `title`       | `string`          | Meeting title.                               |
| `description` | `string`          | Meeting description.                         |
| `holiday`     | `boolean`         | If the meeting is taken as a holiday.        |
| `type`        | `"meeting"`       | Type of scheduled activity meeting.          |
| `YYMMDD`      | `Array.<number>`  | Scheduled date for the meeting [YY, MM, DD]. |

### Type `Day`

- Type: `Object`

Description: Details of a day.

An `Object` with the properties `day`, `date`, `weekday`, `type`, `week`, `workday`, `isWorkday`, `isWeekend`, and `scheduled`.

Properties:

| Name        | Type              | Description                                                   |
|-------------|-------------------|---------------------------------------------------------------|
| `day`       | `number`          | Day of the month.                                             |
| `date`      | `Array.<number>`  | The date of the day `[YY, MM, DD]`.                           |
| `weekday`   | `number`          | The day of the week, value is like `Date.prototype.getDay()`. |
| `type`      | `string`          | `elapsed`, `current`, `remaining`.                            |
| `week`      | `number`          | Week number of the month.                                     |
| `workday`   | `number`          | Workday number of the month.                                  |
| `isWorkday` | `boolean`         | If the day is a work day.                                     |
| `isWeekend` | `boolean`         | If the day is a weekend.                                      |
| `scheduled` | `Scheduled`       | Number of the activities of a day.                            |

### Type `Days`

- Type: `Array.<Day>` [See Activity](#Type-Day)

Description: The details of the days of the month, a collection of information about all the days of the month.

An object `array`, every `array` element contains information about a day of the month, If it is a weekend or a work day, if it has already elapsed, it is the current day, week number.

### Type `Summary`

- Type: `Object`

Description: Summary of the month with information on weeks, working days and dates.

An `Object` with the properties `dates`, `days`, `weeks`, and `workdays`.

Properties:

| Name       | Type             | Description                |
|------------|------------------|----------------------------|
| `dates`    | `DatesSummary`   | Month's dates Summary.     |
| `days`     | `DaysSummary`    | Month's days Summary.      |
| `weeks`    | `WeeksSumary`    | Month's weeks Summary.     |
| `workdays` | `WorkdaysSumary` | Month's work days Summary. |

### Type `DatesSummary`

- Type: `Object`

Description: Month's dates summary.

An `Object` with the properties `start`, `current`, and `end`.

Properties:

| Name      | Type   | Description           |
|-----------|--------|-----------------------|
| `start`   | `Date` | Month's start date.   |
| `current` | `Date` | Month's current date. |
| `end`     | `Date` | Month's end date.     |

### Type `DaysSummary`

- Type: `Object`

Description: Month's dates summary.

An `Object` with the properties `current`, `total`, `elapsed`, `remaining` and `percentage`.

Properties:

| Name         | Type     | Description                        |
|--------------|----------|------------------------------------|
| `current`    | `number` | Month's currentd day.              |
| `total`      | `number` | Month's total days.                |
| `elapsed`    | `number` | Month's elapsed days.              |
| `remaining`  | `number` | Month's remaining days.            |
| `percentage` | `number` | Month's percentage remaining days. |

### Type `WeeksSumary`

- Type: `Object`

Description: Month's weeks summary.

An `Object` with the properties `current`, `total`, `elapsed`, `remaining` and `percentage`.

Properties:

| Name         | Type     | Description                         |
|--------------|----------|-------------------------------------|
| `current`    | `number` | Month's current week.               |
| `total`      | `number` | Month's total weeks.                |
| `elapsed`    | `number` | Month's elapsed weeks.              |
| `remaining`  | `number` | Month's remaining weeks.            |
| `percentage` | `number` | Month's percentage remaining weeks. |

### Type `WorkdaysSumary`

- Type: `Object`

Description: Month's work days summary.

An `Object` with the properties `current`, `total`, `elapsed`, `remaining` and `percentage`.

Properties:

| Name         | Type     | Description                             |
|--------------|----------|-----------------------------------------|
| `current`    | `number` | Month's current work day.               |
| `total`      | `number` | Month's total work days.                |
| `elapsed`    | `number` | Month's elapsed work days.              |
| `remaining`  | `number` | Month's remaining work days.            |
| `percentage` | `number` | Month's percentage remaining work days. |

## TODO
