export interface IToken {
  sub: any;
}

export interface IAuthTokenService {
  createToken(payload: IToken): Promise<string>;
  verify(token: string): Promise<IToken>;
}
