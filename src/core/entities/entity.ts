export interface Entity {
  validateData(): Promise<string[]>;
}
