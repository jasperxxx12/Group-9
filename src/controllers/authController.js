const authService = require("../service/authService");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ error: "username and password are required" });
        }
        const user = await authService.register(username, password);
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const login = async (req, res) => {
    console.log("NEW LOGIN CODE RUNNING");
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ error: "username and password are required" });
        }
        const result = await authService.login(username, password);

        // store the refresh token as an httpOnly cookie instead of the body
        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            // secure: true, // enable this once you're serving over HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT_REFRESH_SECRET expiry
        });

        res.send({ accessToken: result.accessToken, user: result.user });
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
};

const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken; // <-- read from cookie, not body
        const accessToken = await authService.refresh(token);
        res.send({ accessToken });
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
};

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken; // <-- read from cookie, not body
        await authService.logout(token);
        res.clearCookie("refreshToken");
        res.send({ message: "Logged out successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

module.exports = { register, login, refresh, logout };