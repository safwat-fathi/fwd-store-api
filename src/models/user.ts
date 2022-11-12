import Client from "../db";
import bcrypt from "bcrypt";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = (process.env as {
  BCRYPT_PASSWORD: string;
  SALT_ROUNDS: string;
}) || { BCRYPT_PASSWORD: "", SALT_ROUNDS: "" };

export class UserStore {
  async create(u: User): Promise<User[]> {
    try {
      const connect = await Client.connect();

      const sql =
        "INSERT INTO users (firstName, lastName, password) values ($1, $2, $3) RETURNING *";

      const hash = await bcrypt.hash(
        u.password + BCRYPT_PASSWORD,
        +SALT_ROUNDS
      );

      const result = await connect.query(sql, [u.firstName, u.lastName, hash]);

      const user = result.rows[0];

      connect.release();

      return user;
    } catch (err) {
      throw new Error(`Could not create user: ${err}`);
    }
  }

  async auth(fName: string, password: string): Promise<User | null> {
    const connect = await Client.connect();

    const sql = "SELECT password FROM users WHERE firstName=($1)";
  }
}
