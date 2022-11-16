import Client from "../db";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export class ProductStore {
  async create(p: Partial<Product>): Promise<Product> {
    try {
      const connect = await Client.connect();

      const sql =
        "INSERT INTO products (name, price) values ($1, $2) RETURNING *";

      const result = await connect.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      connect.release();

      return product;
    } catch (err) {
      throw new Error(`Could not create product: ${err}`);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connect = await Client.connect();

      const sql = "SELECT * FROM products";

      const result = await connect.query(sql);

      connect.release();

      const users: Product[] = result.rows;

      return users;
    } catch (err) {
      throw new Error(`Could not index products: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM product WHERE id=($1)";

      const result = await connect.query(sql, [id]);

      connect.release();

      const user = result.rows[0];

      return user;
    } catch (err) {
      throw new Error(`Could not find product with ID: ${id}. Error: ${err}`);
    }
  }
}
