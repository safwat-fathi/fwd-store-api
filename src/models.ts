import Client from "./db";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {}
}
