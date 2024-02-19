CREATE TABLE IF NOT EXISTS "players" (
  "id" SERIAL PRIMARY KEY,
  "full_name" VARCHAR(40) NOT NULL,
  "events_played" INTEGER NOT NULL DEFAULT 0,
  "wins" REAL NOT NULL DEFAULT 0,
  "penalty" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "events" (
  "id" SERIAL PRIMARY KEY,
  "course" VARCHAR(200) NOT NULL,
  "date" DATE NOT NULL,
  "teebox" VARCHAR,
  "format" VARCHAR(80) NOT NULL,
  "complete" BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) UNIQUE NOT NULL,
  "password" VARCHAR(1000) NOT NULL,
  "access_level" INTEGER NOT NULL DEFAULT 0,
  "player_id" INTEGER REFERENCES "players" ("id") ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS "event_scores" (
  "id" SERIAL PRIMARY KEY,
  "player_one" INTEGER REFERENCES "players" ("id") ON DELETE CASCADE,
  "player_two" INTEGER REFERENCES "players" ("id") ON DELETE CASCADE,
  "penalty" INTEGER NOT NULL DEFAULT 0,
  "score_final" INTEGER NOT NULL DEFAULT 0,
  "event_id" INTEGER REFERENCES "events" ("id") ON DELETE CASCADE
);

---------------------- MOCK DATA --------------------------
INSERT INTO "players" ("full_name")
VALUES ('Mike DeGraw'), ('Ryan Olson'), ('Josh Leary'), ('Torben Jepsen'), ('Alex Jungers'), ('Jeremiah Ballard'), ('Chris Olson'), ('James Leary'), ('Ben Hodge'), ('Matt Valiant'),('Ryan Dumpprope'), ('Brian King');
