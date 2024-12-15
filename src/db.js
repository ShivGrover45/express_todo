import {DatabaseSync} from 'node:sqlite'

const db=new DatabaseSync(':memory:')

//execute sql commands through string 
db.exec(`
    CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
    )
    `)

    db.exec(`
        CREATE TABLE todos(
        id INTEGER,
        user_id INTEGER,
        tasks TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
        )
        `)

        export default db