/*
Exception when trying to instantiate abstract base classes,
Abstract Base Class exception.
@class
*/
export class ABCException extends Error {
  /**
   *
   * @param {String} className is the name of the abstract class that requested instantiation
   */
  constructor(className) {
    super(`${className} is an abtract base class, subclass to instantiate`);
    this.name = "ABCException";
  }
}
