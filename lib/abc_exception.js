/*
Exception when trying to instantiate abstract base classes,
Abstract Base Type exception.
@class
*/
export class ABCException extends Error {
  constructor(className) {
    super(`${className} is an abtract base class, subclass to instantiate`);
    this.name = "ABTException";
  }
}
