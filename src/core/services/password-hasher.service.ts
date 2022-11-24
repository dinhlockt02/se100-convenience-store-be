export interface IPasswordHasherService {
  hash(plainString: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}

export const IPasswordHasherServiceLabel = 'IPasswordHasherServiceLabel';
