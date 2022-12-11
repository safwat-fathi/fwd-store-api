CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
	user_id bigint REFERENCES users(id),
	status VARCHAR(100) NOT NULL CHECK(status IN ('active', 'complete')) DEFAULT 'active'
);
