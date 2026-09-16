const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const register = async (username, password) => {
    const existing = await userModel.findByUsername(username);
    if (existing) throw new Error("Username already taken");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await userModel.create(username, hashedPassword);
};

const login = async (username, password) => {
    const user = await userModel.findByUsername(username);
    if (!user) throw new Error("Invalid username or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid username or password");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await userModel.saveRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user: { id: user.id, username: user.username } };
};

const refresh = async (token) => {
    if (!token) throw new Error("No refresh token provided");

    const stored = await userModel.findRefreshToken(token);
    if (!stored) throw new Error("Invalid refresh token");

    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return generateAccessToken(payload);
};

const logout = async (token) => {
    await userModel.deleteRefreshToken(token);
};

module.exports = { register, login, refresh, logout };