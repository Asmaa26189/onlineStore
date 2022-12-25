CREATE TYPE status_order AS ENUM ('active', 'complete');
CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  status status_order NOT NULL
);