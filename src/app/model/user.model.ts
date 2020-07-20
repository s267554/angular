export interface User {
  id: string;
  email: string;
  token: string;
  photoUrl: string;
  name: string;
  surname: string;
  role: string;
  expiry: number;
}
