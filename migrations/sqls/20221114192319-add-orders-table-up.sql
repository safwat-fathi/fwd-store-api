CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id bigint REFERENCES users(id),
	status VARCHAR(100) NOT NULL CHECK(status IN ('active', 'complete')) DEFAULT 'active'
);
CREATE TABLE order_products (
	id SERIAL PRIMARY KEY,
	quantity integer NOT NULL,
	order_id bigint REFERENCES orders(id),
	product_id bigint REFERENCES products(id)
);