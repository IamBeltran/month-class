/**
 * @file Manages MonthError module, used to create all errors specific to
 * the Month class.
 */

// ━━	MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/**
 * MonthError is the base class for all errors specific to the 'Month' class.
 *
 * @class    MonthError
 * @augments Error
 * @private
 */
class MonthError extends Error {
  /**
   * Creates an instance of MonthError.
   *
   * The `message` parameter must be type `string` or `function`. If
   * a function is passed as a parameters, necessary to execute the function
   * must be passed as the second parameter in the constructor, if the result of
   * the function is not of type `string`, it will throw a `TypeError`.
   *
   * @memberof  MonthError
   * @param     {string|Function} message - MonthError's message.
   * @param     {Array} [params] - Parameter to create an error message.
   * @throws    {TypeError} If the message is not of type string.
   * @example const ERROR = new MonthError('current option must be a Date');
   *
   * const DYNAMIC_MESSAGE = type => `current option must be a ${type}`;
   * const DYNAMIC_ERROR = new MonthError(DYNAMIC_MESSAGE, ['Date']);
   *
   */
  constructor(message, params) {
    const isFunction = typeof message === 'function';
    const $message = isFunction ? message.apply(message, params) : message;
    if (typeof $message !== 'string') {
      throw new TypeError('error message must be string');
    }
    super($message);
    this.name = 'MonthError';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MonthError);
    }
  }

  /**
   * All messages for specific errors of the month class.
   *
   * @static
   * @memberof MonthError
   */
  static messages = {
    TYPE_CURRENT_OPTION: 'current option must be a Date',
    TYPE_DATEBOOK_OPTION: 'datebook option must be an Array',
    INVALID_WEEKEND_OPTION: 'weekend option must be a number or string',
    INVALID_DATEBOOK_ITEM: "Some datebook's item has wrong format",
  };
}

// ━━	EXPORT MODULE	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
module.exports = MonthError;
