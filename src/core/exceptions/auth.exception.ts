import { BussinessException } from './bussiness.exception';

export class AuthException extends BussinessException {}
export class UnauthotizedException extends AuthException {}
