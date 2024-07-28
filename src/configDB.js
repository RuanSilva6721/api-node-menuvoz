// import sqlite3 from 'sqlite3'
// import { open } from 'sqlite'

// // you would have to import / invoke this in another file
// export async function openDb () {
//   return open({
//     filename: './database.db',
//     driver: sqlite3.Database
//   })
// }
import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const db = pgp({
  connectionString: 'postgresql://menuvoz_owner:ThZRGu7H5LdW@ep-flat-forest-a52on6u8.us-east-2.aws.neon.tech/menuvoz?sslmode=require',
  ssl: { rejectUnauthorized: false } // para conexões seguras
});

export default db;
