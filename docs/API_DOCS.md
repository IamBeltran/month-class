# 📅 Month class

The `Month` class manages the information of a month from given date, such as number of weeks, number of work days, number of weekend.

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
  datebook: [{
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
  }],
});
```

## Instance properties

### YYMMDD `Readonly`

- Type `Array.<number>`

Description: It is a number `array` with three elements.

The array elements represent the year number, month number and day number `[YY, MM, DD]`.

### WEEKEND `Readonly`

- Type `Array.<number>`

Description: Its a number `array`.

The array elements represent days of the week that are not working days and takes as weekend, its value is like like as `Date.prototype.getDay()`.

### SCE `Readonly`

- Type `Array.<number>`

Description: Its a number `array`, with three elements.

The array elements represent one day of the month, the day month start, the day month current and the day month end, its value is like `Date.prototype.getDate()`.

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

month.addDatebook([{
  date: '2021-01-10',
  title: 'Send final sales report',
  description: "Don't forget to attach graphics",
  type: 'task',
  holiday: true,
}]);
```
