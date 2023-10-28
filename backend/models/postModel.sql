CREATE TABLE posts (
  id varchar NOT NULL UNIQUE PRIMARY KEY,
  photo varchar NOT NULL,
  caption text DEFAULT '',
  date_posted TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  user_id integer NOT NULL REFERENCES users (id),
  status varchar DEFAULT 'public'
);

CREATE TABLE photos (
	id serial PRIMARY KEY,
  image_url varchar NOT NULL,
  post_id integer NOT NULL REFERENCES posts (id)
);

CREATE TABLE likes (
	id serial PRIMARY KEY,
  post_id varchar NOT NULL REFERENCES posts (id),
  sender_id integer NOT NULL REFERENCES users (id)
);

CREATE TABLE comments (
	id serial PRIMARY KEY,
  content text NOT NULL,
  date_commented timestamptz DEFAULT CURRENT_TIMESTAMP,
  post_id varchar NOT NULL REFERENCES posts (id),
  sender_id integer NOT NULL REFERENCES users (id)
);