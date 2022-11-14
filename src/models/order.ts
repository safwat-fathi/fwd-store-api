import Client from "../db";

export type Order = {
  id: number;
  product_id: number;
  quantity: number;
  user_id: number;
  status: "active" | "complete";
};

export class OrderStore {
  async create(o: Order): Promise<Order> {
    try {
      const connect = await Client.connect();

      // get order to see if it is open
      const orderSql = "SELECT * FROM orders WHERE id=($1)";

      const orderResult = await connect.query(orderSql, [o.id]);

      const order: Order = orderResult.rows[0];

      if (order.status !== "active") {
        throw new Error(
          `Could not add product ${o.product_id} to order ${o.id} because order status is ${order.status}`
        );
      }
      // return order;

      const newOrderSql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";

      const newOrderResult = await connect.query(newOrderSql, [
        o.quantity,
        o.id,
        o.product_id,
      ]);

      const newOrder: Order = newOrderResult.rows[0];

      connect.release();

      return newOrder;
    } catch (err) {
      throw new Error(`Could not create order: ${err}`);
    }
  }

  async show(user_id: string): Promise<Order> {
    try {
      const connect = await Client.connect();
      const sql = "SELECT * FROM product WHERE user_id=($1)";

      const result = await connect.query(sql, [user_id]);

      connect.release();

      const order = result.rows[0];

      return order;
    } catch (err) {
      throw new Error(`Could not find order to user ${user_id}. Error: ${err}`);
    }
  }
}
