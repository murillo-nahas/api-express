import sqlite3 from "sqlite3";

const source = "db.sqlite";

const SQL_PRODUCT_CREATE = `
    CREATE TABLE product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )`;

const db = new sqlite3.Database(source, (err) => {
  if (err) {
    console.log(err.message);
    throw err;
  } else {
    console.log("Database connected");
    db.run(SQL_PRODUCT_CREATE, (err) => {
      if (err) {
        console.log("Table already exists");
      } else {
        console.log("Table created successfully");
      }
    });
  }
});

export { db };
