const pool = require("../config/database");

const create = async (username, hashedPassword) => {
    const result = await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
        [username, hashedPassword]
    );
    return result.rows[0];
};

const findByUsername = async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
};

const saveRefreshToken = async (userId, token) => {
    await pool.query("INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)", [userId, token]);
};

const findRefreshToken = async (token) => {
    const result = await pool.query("SELECT * FROM refresh_tokens WHERE token = $1", [token]);
    return result.rows[0];
};

const deleteRefreshToken = async (token) => {
    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [token]);
};

module.exports = { create, findByUsername, saveRefreshToken, findRefreshToken, deleteRefreshToken };