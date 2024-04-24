const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const user = require("../models/user");
const services = require("../services");
const { userService } = require("../services")
const libs = require('../lib');
const { userModel } = require('../models');

const createSessionobj = (user) => {
    const session = {};
    session.userId = user[userModel.columnName.id];
    session.email = user[userModel.columnName.email];
    session.role = user[userModel.columnName.role];
    session.profilePic = user[userModel.columnName.profilePic];
    session.displayname = user[userModel.columnName.displayname];
    return libs.utils.createSessionObj(session);
}


//TODO Password Validation
/**
 * 
 * @param {{email: string, password: string, rememberMe: true}} payload 
 * @param {boolean} byPassPasswordCheck 
 * Exercise extreme caution when utilizing byPassPasswordCheck, as its misuse can lead to severe security ramifications
 * @returns {Promise<[string, string | undefined]>}
 */
const login = async (payload, byPassPasswordCheck) => {
    const email = payload.email;
    const password = payload.password;
    const rememberMe = payload.rememberMe
    const user = await userService.getSingleUserFromDb(null, `where email='${email}'`);
    if (!user?.email) {
        throw new Error(`No user found with same email.`);
    }

    if (user?.varification_token !== null) {
        throw new Error(libs.messages.errorMessage.userVarificationRequired)
    }

    if (!byPassPasswordCheck) {
        const isPasswordValid = await libs.utils.checkIfValidEncyprtion(user.password, password);
        if (!isPasswordValid) {
            throw new Error('Password is not valid');
        }
    }

    const sessionObj = createSessionobj(user);
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            sid: (sessionObj).sid
        },libs.constants.jwtSecret
    );

    let longTermSessionToken = null;
    if (rememberMe) {
        longTermSessionToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
            }
        , libs.constants.jwtSecret, {
            expiresIn: libs.constants.longTermSessionExpireTime_Seconds,
        })
    }

    await services.redisService.sessionRedis(
        'set',`${libs.constants.sessionPrefix}:${sessionObj.sid}`,
        JSON.stringify(sessionObj), 'EX', libs.constants.sessionExpireTime_Seconds,
    );
    return [token, longTermSessionToken];
}



const signup = async ({email, password, name}) => {
    const userWithSameEmail = (await userService.getUserFormDb(
        null,
        `WHERE email='${email}'`)
    )?.[0];
    if (userWithSameEmail) {
        if (userWithSameEmail.varification_token == null) {
            throw new Error(`User with the same email already exists`);
        }
    
        return userWithSameEmail;
    }

    const varificationToken = crypto.randomBytes(40).toString('hex');
    console.log(`Varification Token For ${email} = ${varificationToken}`);
    const resultOfUserCreation = await userService.createUserDB(
        {
            [user.columnName.email]:email,
            [user.columnName.displayname]: name,
            [user.columnName.password]: password,
            [user.columnName.varification_token]: varificationToken,
        }
    );
    const result = resultOfUserCreation.rows?.[0];
    if ( !result ) {
        throw new Error('User Cannot Be Created');
    } 
    return result;
}


const verifyAccount = async (token) => {
    const userData = (await services.userService.updateUserDB({
        [user.columnName.varification_token]: null,
    }, `WHERE ${user.columnName.varification_token} = '${token}'`))?.[0];

    return userData;
}

const authenticateSession = async function ( token ) {
    try {
        const userData = jwt.decode(token);
        const {id: userId, sid} = userData
        if ( ! sid )        throw new Error("Session id is null");
        if ( ! userId )     throw new Error("User id is null");

        const sessionKey = `${libs.constants.sessionPrefix}:${sid}`;
        const sessionStr = await services.redisService.sessionRedis('get', sessionKey);
        if ( ! sessionStr )     return ;

        services.redisService.sessionRedis('expire', sessionKey, libs.constants.sessionExpireTime_Seconds);
        const sessionObj = JSON.parse(sessionStr);
        if ( sessionObj && sessionObj.userId == userId )    return libs.utils.createSessionObj(sessionObj);
        return ;
    } catch (error) {
        console.log("Error in authenticateSession. Error = ", error);
        return ;
    }
}

module.exports = {
    login,
    signup,
    verifyAccount,
    createSessionobj,
    authenticateSession
}