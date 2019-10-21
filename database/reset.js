const {Client} = require('pg');
const client = new Client(
  {
    database: 'deckbuilder',
  }
)
client.connect();

client.query(`DROP TABLE IF EXISTS decks`)
client.query(`DROP TABLE IF EXISTS searchHist`)

client.query(`CREATE TABLE decks (
  id serial NOT NULL,
  owner_id character varying(50),
  deck_list jsonb,
  CONSTRAINT urls_pkey PRIMARY KEY (id)
)`);

client.query(`CREATE TABLE searchHist (
  id serial NOT NULL,
  query jsonb,
  response jsonb,
  CONSTRAINT hist_pkey PRIMARY KEY (id)
)`);
