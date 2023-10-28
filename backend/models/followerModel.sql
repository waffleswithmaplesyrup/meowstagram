CREATE TABLE followers (
	id serial PRIMARY KEY,
  recipient_id integer NOT NULL REFERENCES users (id),
  follower_id integer NOT NULL REFERENCES users (id)
);