/**
 * @file Manages utils module, used to check the types of values given.
 */

// ━━	CONSTANTS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * @type {RegExp}
 * @private
 */
const regex = /\s([a-z|A-Z]+)/;

// ━━	FUNCTIONS	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `toString()` method returns a string representing the object.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {string} A string representing the object.
 * @example const tostring = toString(true); // [object Boolean];
 *
 */
const toString = value => ({}.toString.call(value));

/**
 * The `toType()` method returns a string indicating the type of the unevaluated
 * operand.
 *
 * @private
 * @param   {*} value - The value to be checked.
 * @returns {string} The type of the unevaluated operand.
 * @example toType(true); // 'boolean';
 *
 */
const toType = value => toString(value).match(regex)[1].toLocaleLowerCase();

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * The `isArray()` function determines whether a value is Array or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Array; otherwise, false.
 * @example isArray([1, 2]); // true
 *
 */
const isArray = value => Array.isArray(value);

/**
 * The `isBoolean()` function determines whether a value is Boolean or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Boolean; otherwise, false.
 * @example isBoolean(true); // true;
 *
 */
const isBoolean = value => toString(value) === '[object Boolean]';

/**
 * The `isDate()` function determines whether a value is instance of Date or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Date; otherwise, false.
 * @example isDate(new Date()); // true;
 *
 */
const isDate = value => toString(value) === '[object Date]';

/**
 * The `isFunction()` function determines whether a value is Function or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the value is Function; otherwise, false.
 * @example isFunction(() => {}); // true;
 *
 */
const isFunction = value => toString(value) === '[object Function]';

/**
 * The `isNumber()` function determines whether a value is Number or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Number; otherwise, false.
 * @example isNumber(1); // true;
 *
 */
const isNumber = value => toString(value) === '[object Number]';

/**
 * The `isFloatNumber()` function determines whether a value is Float Number
 * or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Float Number; otherwise, false.
 * @example isFloatNumber(1.3); // true;
 *
 */
const isFloatNumber = value => toString(value) === '[object Number]' && !Number.isInteger(value);

/**
 * The `isIntNumber()` function determines whether a value is Interger Number
 * or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Interger Number; otherwise, false.
 * @example isIntNumber(1.4); // false;
 *
 */
const isIntNumber = value => toString(value) === '[object Number]' && Number.isInteger(value);

/**
 * The `isString()` function determines whether a value is String or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is String; otherwise, false.
 * @example isString('Hello world'); // true;
 *
 */
const isString = value => toString(value) === '[object String]';

/**
 * The `isObject()` function determines whether a value is Object or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Object; otherwise, false.
 * @example isObject({ color: 'blue' }); // true;
 *
 */
const isObject = value => toString(value) === '[object Object]';

/**
 * The `isNullObject()` function determines whether a value is Object without
 * constructor or not. For example `Object.create(null)`.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is Object without constructor or not; otherwise, false.
 * @example isNullObject(Object.create(null)); // true;
 *
 */
const isNullObject = value => isObject(value) && !Object.getPrototypeOf(value);

/**
 * The `isPOJO()` function determines whether a value is POJO (Plain Old Java Object)
 * or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the given value is POJO; otherwise, false.
 * @example isPOJO({ age: 3 }); // true;
 *
 */
const isPOJO = value =>
  isObject(value) &&
  (isNullObject(value) || Object.getPrototypeOf(value).constructor.name === 'Object');

/**
 * The `isEmptyArray()` function determines whether a value is an Empty Array
 * or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the value is empty Array; otherwise, false.
 * @example isEmptyArray([]); // true
 *
 */
const isEmptyArray = value => Array.isArray(value) && value.length === 0;

/**
 * The `isEmptyObject()` function determines whether a value is an Empty Object
 * or not.
 *
 * @private
 * @param   {*} value - The value to be tested.
 * @returns {boolean} True if the value is Empty Object; otherwise, false.
 * @example isEmptyObject({}); // true
 *
 */
const isEmptyObject = value => isObject(value) && Object.getOwnPropertyNames(value).length === 0;

/**
 * The `isArrayOf()` function determines whether a value is an `Array` with
 * contains types of value or not.
 *
 * @private
 * @param   {Array} array - The `Array` to be tested.
 * @param   {Array.<string>} types - The expected types of value.
 * @returns {boolean} True if all array elements are the expected types; otherwise, false.
 * @example isArrayOf([1, 2, 3], ['numbers']); // true
 *
 */
const isArrayOf = (array, types) =>
  array.map(item => types.includes(toType(item))).every(item => !!item);

/**
 * The `isObjectOf()` function determines determines whether a value is an
 * `object` with contains types of value or not.
 *
 * @private
 * @param   {object} object - The `Object` to be tested.
 * @param   {Array.<string>} types - The expected types of value.
 * @returns {boolean} True if all Object properties are the expected types; otherwise, false.
 * @example isObjectOf({ a: 1, b: 2 }, ['numbers']); // true
 *
 */
const isObjectOf = (object, types) =>
  Object.keys(object)
    .map(key => types.includes(toType(object[key])))
    .every(item => !!item);

// ▶ IS TYPE
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isFloatNumber = isFloatNumber;
exports.isIntNumber = isIntNumber;
exports.isString = isString;
exports.isObject = isObject;
exports.isNullObject = isNullObject;
exports.isPOJO = isPOJO;
exports.isEmptyArray = isEmptyArray;
exports.isEmptyObject = isEmptyObject;
exports.isArrayOf = isArrayOf;
exports.isObjectOf = isObjectOf;
