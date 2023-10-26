-- //* create users table
CREATE TABLE users (
	id serial PRIMARY KEY,
  username varchar NOT NULL UNIQUE,
  email varchar NOT NULL UNIQUE,
  password varchar NOT NULL,
  profile_pic varchar DEFAULT '/assets/default.jpg',
  bio text DEFAULT '',
  permissions varchar DEFAULT 'ok',
  date_created TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);