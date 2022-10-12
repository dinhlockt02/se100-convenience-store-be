export interface IPasswordHasherService {
  hash(plainString: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
