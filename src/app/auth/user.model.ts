export class User {

  constructor(readonly username: string,
              readonly token: string,
              readonly photoUrl: string,
              readonly name: string,
              readonly surname: string,
              readonly expiry: number,
              readonly roles: string[]) {

  }

}

export function isAdmin(user: User): boolean {
  return user !== null && user.roles.find((r) => {
    return r === 'ROLE_ADMIN';
  }) !== undefined;
}
