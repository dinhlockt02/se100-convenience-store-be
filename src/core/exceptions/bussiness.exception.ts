export class BussinessException extends Error {}

export class ConflictException extends BussinessException {}

export class ValidationException extends BussinessException {
  errors: string[];

  constructor(message: string, errors: string[]) {
    super(message);
    this.errors = errors;
  }
}

export class NotFoundException extends BussinessException {}
