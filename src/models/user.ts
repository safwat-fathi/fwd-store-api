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
  async create(u: User): Promise<User> {
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
    try {
      const connect = await Client.connect();

      const sql = "SELECT password FROM users WHERE firstName=($1)";

      const result = await connect.query(sql, [fName]);

      connect.release();

      if (result.rows.length) {
        const user: User = result.rows[0];

        const isValidPass = await bcrypt.compare(password, user.password);

        if (isValidPass) return user;
      }

      return null;
    } catch (err) {
      throw new Error(`Could not auth user: ${err}`);
    }
  }

  async index(): Promise<User[]> {
    try {
      const connect = await Client.connect();

      const sql = "SELECT * FROM users";

      const result = await connect.query(sql);

      connect.release();

      const users: User[] = result.rows;

      return users;
    } catch (err) {
      throw new Error(`Could not index users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";

      const result = await connect.query(sql, [id]);

      connect.release();

      const user = result.rows[0];

      return user;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
}
