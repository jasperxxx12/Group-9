const pool = require("./database");

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS refresh_tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                token TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log("users and refresh_tokens tables created (or already exist)");
    } catch (err) {
        console.error("Error creating tables:", err);
    } finally {
        pool.end();
    }
};

createTables();