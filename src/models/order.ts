import Client from "../db";

export type Order = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: "active" | "complete";
};

export class OrderStore {
  async showCurrent(user_id: string): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM orders WHERE user_id=($1) AND status='active'";

      const result = await connect.query(sql, [user_id]);

      connect.release();

      const order = result.rows[0];

      return order;
    } catch (err) {
      throw new Error(
        `Could not find current order to user with ID: ${user_id}. Error: ${err}`
      );
    }
  }
}
