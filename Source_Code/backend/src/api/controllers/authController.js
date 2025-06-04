const authHelper = require("../helpers/authHelper");
const authService = require("../services/authService");

// Sign up
exports.signUp = async (req, res, next) => {
    const { username, password, email, fullName } = req.body;
    try {
        const hashedPassword = await authHelper.hashPassword(password);
        const result = await authService.signUp(
            username,
            hashedPassword,
            email,
            fullName
        );
        console.log(result);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Log in
exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await authService.login(res, username, password);

        // Remember current user:
        req.currentUser = {
            id: result.userInfo.id,
            username: result.userInfo.username,
        };

        res.json({
            userInfo: result.userInfo,
            accessToken: result.accessToken,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Login with Facebook:
exports.loginWithFacebook = async (req, res, next) => {
    const { accessToken } = req.body;
    try {
        const result = await authService.loginWithFacebook(res, accessToken);
        // Remember current user:
        req.currentUser = {
            id: result.userInfo.id,
            username: result.userInfo.username,
        };
        res.json({
            userInfo: result.userInfo,
            accessToken: result.accessToken,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Log out:
exports.logout = async (req, res, next) => {
    const { _id } = req.body;
    req.currentUser = null;
    try {
        const result = await authService.logout(res, _id);
        res.json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// refresh access token:
exports.refreshAccessToken = async (req, res, next) => {
    const cookies = req.cookies;
    const refreshToken = cookies.jwt;
    console.log("refreshToken: ", refreshToken);
    try {
        const result = await authService.refreshAccessToken(refreshToken);
        res.json(result);
    } catch (error) {
        console.log(error, "Error to get new access token!");
        next(error);
    }
};
