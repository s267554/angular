export interface User {
  readonly username: string;
  readonly token: string;
  readonly photoUrl: string;
  readonly name: string;
  readonly surname: string;
  readonly expiry: number;
  readonly roles: string[];
}
