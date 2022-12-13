import Client from "../db";
import bcrypt from "bcrypt";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = (process.env as {
  BCRYPT_PASSWORD: string;
  SALT_ROUNDS: string;
}) || { BCRYPT_PASSWORD: "", SALT_ROUNDS: "" };

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connect = await Client.connect();

      const sql = "SELECT * FROM users";

      const result = await connect.query(sql);

      const users = result.rows;

      connect.release();

      return users;
    } catch (err) {
      throw new Error(`Could not create user: ${err}`);
    }
  }

  async show(id: Partial<User["id"]>): Promise<User> {
    try {
      const connect = await Client.connect();

      const sql = "SELECT * FROM users WHERE id=($1)";

      const result = await connect.query(sql, [id]);

      const user = result.rows[0];

      connect.release();

      return user;
    } catch (err) {
      throw new Error(`Could not show user: ${err}`);
    }
  }

  async create(u: Partial<User>): Promise<User> {
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

      const sql = "SELECT * FROM users WHERE firstName=($1)";

      const result = await connect.query(sql, [fName]);

      if (result.rows.length) {
        const user: User = result.rows[0];

        const isValidPass = await bcrypt.compare(
          password + BCRYPT_PASSWORD,
          user.password
        );

        if (isValidPass) return user;
      }

      return null;
    } catch (err) {
      throw new Error(`Could not auth user: ${err}`);
    }
  }
}
