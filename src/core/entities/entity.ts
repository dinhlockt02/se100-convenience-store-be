import { validate } from 'class-validator';

export class Entity {
  async validateData(): Promise<string[]> {
    const validationErrors = await validate(this);
    if (validationErrors.length !== 0) {
      return validationErrors.map((error) => `Invalid ${error.property}`);
    }
    return [];
  }
}
