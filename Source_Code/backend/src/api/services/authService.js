const { StatusCodes } = require("http-status-codes");
const {
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    storeRefreshTokenToCookie,
} = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const { env } = require("process");
require("dotenv").config();
const userQuery = require("../mongooseQuery/userQuery");
const axios = require("axios");

// Sign up service:
exports.signUp = async (username, password, email, fullName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existedEmail = await userQuery.findAnUser({ email });
            const existedUsername = await userQuery.findAnUser({ username });

            if (existedEmail) {
                reject({
                    status: StatusCodes.CONFLICT,
                    message: "email",
                });
            } else if (existedUsername) {
                reject({
                    status: StatusCodes.CONFLICT,
                    message: "username",
                });
            } else {
                const newUser = await userQuery.createUser({
                    username,
                    email,
                    password,
                    fullName,
                });
                resolve({
                    status: StatusCodes.CREATED,
                    data: newUser,
                });
            }
        } catch (error) {
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "something wrong!",
            });
        }
    });
};

// Login service:
exports.login = (res, username, password) => {
    return new Promise(async (resolve, reject) => {
        // find the username:
        try {
            const user = await userQuery.findAnUser({ username });
            if (!user) {
                reject({
                    status: StatusCodes.UNAUTHORIZED,
                    message: "wrong username!",
                });
            } else {
                const matchPassword = await comparePassword(
                    password,
                    user.password
                );

                if (!matchPassword) {
                    reject({
                        status: StatusCodes.UNAUTHORIZED,
                        message: "wrong password!",
                    });
                } else {
                    // clear old refresh token
                    user.refreshToken = null;
                    const accessToken = generateAccessToken(user);
                    const refreshToken = generateRefreshToken(user);
                    console.log(refreshToken);
                    // store refresh token in cookie:
                    storeRefreshTokenToCookie(res, refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "None",
                        maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days
                    });
                    // Store user's refresh token
                    // await userQuery.updateAnUser({ ...user }, { refreshToken });
                    user.refreshToken = refreshToken;
                    await user.save();

                    resolve({
                        userInfo: user,
                        accessToken: accessToken,
                    });
                }
            }
        } catch (error) {
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Error to get all users!",
            });
        }
    });
};

// Login with Facebook service:
exports.loginWithFacebook = (res, accessToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!accessToken) {
                reject({
                    status: StatusCodes.UNAUTHORIZED,
                    message: "Unauthorized!!!",
                });
            }

            const fbRes = await axios.get(`https://graph.facebook.com/me`, {
                params: {
                    fields: "id,name,email,picture.width(200).height(200)",
                    access_token: accessToken,
                },
            });
            const { id, name, email, picture } = fbRes.data;
            const user = await userQuery.findAnUser({ facebookId: id });
            if (!user) {
                // Create new user:
                const newUser = await userQuery.createUser({
                    facebookId: id,
                    fullName: name,
                    email,
                    avatar: picture.data.url,
                });
                const accessToken = generateAccessToken(newUser);
                const refreshToken = generateRefreshToken(newUser);
                storeRefreshTokenToCookie(res, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days
                });
                newUser.refreshToken = refreshToken;
                await newUser.save();
                resolve({
                    userInfo: newUser,
                    accessToken,
                });
            } else {
                console.log(user);
                // User already exists:
                const accessToken = generateAccessToken(user);
                const refreshToken = generateRefreshToken(user);
                storeRefreshTokenToCookie(res, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days
                });
                user.refreshToken = refreshToken;
                await user.save();
                resolve({
                    userInfo: user,
                    accessToken,
                });
            }
        } catch (error) {}
    });
};

// Logout service:
exports.logout = (res, _id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userQuery.findAnUser({ _id });
            user.refreshToken = null;
            await user.save();
            storeRefreshTokenToCookie(res, "", {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 0,
            });

            resolve({
                status: StatusCodes.OK,
                message: "Logout successfully!",
            });
        } catch (error) {
            console.log(error);
            reject({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: "Error to logout!",
            });
        }
    });
};

// Refresh access token:
exports.refreshAccessToken = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!refreshToken) {
                reject({
                    status: StatusCodes.UNAUTHORIZED,
                    message: "Unauthorized!!!",
                });
            } else {
                const user = await userQuery.findAnUser({
                    refreshToken,
                });

                if (!user)
                    reject({
                        status: StatusCodes.FORBIDDEN,
                        message: "Forbidden!",
                    });
                jwt.verify(
                    refreshToken,
                    env.REFRESH_TOKEN_CODE,
                    (error, decoded) => {
                        if (
                            error ||
                            decoded.userInfo.username !== user.username
                        )
                            reject({
                                status: StatusCodes.FORBIDDEN,
                                message: "Forbidden!",
                            });

                        const newAccessToken = generateAccessToken(user);
                        resolve({
                            status: StatusCodes.CREATED,
                            message: "Created!",
                            newAccessToken,
                        });
                    }
                );
            }
        } catch (error) {
            reject(error);
        }
    });
};
