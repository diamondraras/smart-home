const Session = require('./../models').Session;
const crypto = require('crypto');

const createRefreshToken = async function(user) {
    var err;

    //Find any existing session and return the refresh token
    var [err, existing_session] = await to(Session.findOne({ userId: user._id }));

    if(existing_session){
        return existing_session.refreshToken;
    }
    //if not, create a new session with token
    var refreshToken = user.id.toString() + '.' + crypto.randomBytes(
        40).toString('hex');
    var session = new Session({
        refreshToken,
        userId: user.id
    })

    var result;
    [err, result] = await to (session.save())
    if (err) TE(err.message);

    return refreshToken;
}
module.exports.createRefreshToken = createRefreshToken;

const removeRefreshToken = async function(user){
    var err, res;
    var [err, session] = await to(Session.findOne({'userId': user.id}));

    if(session){
        [err, res] = await to(session.remove());
        return true;
    }
    if (err) TE(err.message);
    return false;
}
module.exports.removeRefreshToken = removeRefreshToken;