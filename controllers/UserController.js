const User = require('../models').User;
const authService = require('./../services/AuthService');
const sessionService = require('./../services/SessionService');

const getSingle = async function(req, res) {
    let data;

    data = req.body;
    
    res.setHeader('Content-Type', 'application/json');

    [errOnGetUserById, result] = await to(User.findById(data.userId));

    if (errOnGetUserById) return ReE(res, errOnGetUserById, 422);

    if (result !== null) return ReS(res, { user: result.toView() });

    else return ReE(res, {message: "No user found"});
};
module.exports.getSingle = getSingle;

const getAll = async function(req, res){
    [errOnGetAllUser, users] = await to(User.find());

    if (errOnGetAllUser) return ReE(res, errOnGetAllUser, 422);

    if (users === null) return ReE(res, { message: 'No users found '});

    Array.from(users).forEach((user) => {
        return user.toView()
    });

    return ReS(res, { users: users });
}
module.exports.getAll = getAll;

const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, 'Please enter an email or phone number to register.');
    } else if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) return ReE(res, err, 422);
        return ReS(res, { message: 'Successfully created new user.', user: user.toWeb(), token: user.getJWT() }, 201);
    }
}
module.exports.create = create;

const get = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    return ReS(res, { user: user.toWeb() });
}
module.exports.get = get;

const update = async function(req, res) {
    let err, user, data
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        console.log(err, user);

        if (err.message.includes('E11000')) {
            if (err.message.includes('phone')) {
                err = 'This phone number is already in use';
            } else if (err.message.includes('email')) {
                err = 'This email address is already in use';
            } else {
                err = 'Duplicate Key Entry';
            }
        }

        return ReE(res, err);
    }
    return ReS(res, { message: 'Updated User: ' + user.email, user: user });
}
module.exports.update = update;

const remove = async function(req, res) {
    let user;

    user = req.user;

    [errOnRemove, result] = await to(user.remove());

    if (errOnRemove) return ReE(res, errOnRemove);

    else return ReS(res, { message: "User removed succesfully" });
}
module.exports.remove = remove;

const login = async function(req, res) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) return ReE(res, err, 422);
    
    var refreshToken;
    if(req.body.permanent === true){
        [err, refreshToken] = await to(sessionService.createRefreshToken(user));
    }
    
    return ReS(res, { token: user.getJWT(), refreshToken: refreshToken,  user: user.toWeb() });
}
module.exports.login = login;

const removeRefreshToken = async function(req, res) {
    let user, err, result;
    user = req.user;

    [err, result] = await to (sessionService.removeRefreshToken(user))
    if(result){
        return ReS(res, { msg: 'Session destroyed' });
    }
    return ReE(res, {msg: 'Session not found'});
}
module.exports.removeRefreshToken = removeRefreshToken;
