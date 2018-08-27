const User = require('../models').User;
const ProfilSchema = require('../models/profil_schema');
const observableDiff = require('deep-diff').observableDiff;
const applyChange = require('deep-diff').applyChange;
const diff = require('deep-diff');

const getMyProfil = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    
    let user, profil;

    user = req.user;
    profil = user.profil.toWeb();

    return ReS(res, { profil: profil });
}
module.exports.getMyProfil = getMyProfil;

const getMyClapList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let user, options;

    user = req.user;

    options = {
        path: 'profil.clapList',
        model: 'User'
    };

    [errOnGetClapList, result] = await to(User.populate(user, options));

    if (errOnGetClapList) return ReE(res, errOnGetClapList, 422);

    profil = result.profil.toWeb();

    return ReS(res, { clapList: profil.clapList });

}
module.exports.getMyClapList = getMyClapList;

const getMyFollowingList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let user, options;

    user = req.user;

    options = {
        path: 'profil.followingList',
        model: 'User'
    };

    [errOnGetMyFollowingList, result] = await to(User.populate(user, options));

    if (errOnGetMyFollowingList) return ReE(res, errOnGetMyFollowingList, 422);

    profil = result.profil.toWeb();

    return ReS(res, { followingList: profil.followingList });

}
module.exports.getMyFollowingList = getMyFollowingList;

const getMyFollowerList = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let user, options;

    user = req.user;

    options = {
        path: 'profil.followerList',
        model: 'User'
    };

    [errOnGetMyFollowerList, result] = await to(User.populate(user, options));

    if (errOnGetMyFollowerList) return ReE(res, errOnGetMyFollowerList, 422);

    profil = result.profil.toWeb();

    return ReS(res, { followerList: profil.followerList });

}
module.exports.getMyFollowerList = getMyFollowerList;

const updateMyProfil = async function(req, res) {
    let user, data, oldProfil, newProfil;
    let differences;

    user = req.user;
    data = req.body.updates;    

    lhs = user.profil.toObject()
    rhs = data

    observableDiff(lhs, rhs, function (d) {
        // Apply all changes except to the name property...
        if (d.kind == 'E' || d.kind == 'N') {
          applyChange(lhs, rhs, d);
        }
      });
    user.set({profil : lhs})
    
    result = await user.save();
    // [errOnUpdate result] = await to(user.save());
    // if (errOnUpdate) return ReE(res, errOnUpdate, 422);
    
    if (result !== null) return ReS(res, { message: "Updated user: " + user.email, profil: result.profil.toWeb() });
}
module.exports.updateMyProfil = updateMyProfil;

const updateMyPhoto = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let user, photoUrl; 

    if (!req.files.file)
        return ReE(res, new Error('No file uploaded'))

    user = req.user;
    photoUrl = req.files.file[0].path;
    user.profil.photoUrl = photoUrl;

    [errOnUpdatePhoto, result] = await to(user.save());
    
    if (errOnUpdatePhoto) return ReE(res, err);

    return ReS(res, { message: 'Photo successfully updated', profil: user.profil.toWeb() });
}
module.exports.updateMyPhoto = updateMyPhoto;

const addToMyFollowingList = async function(req, res) {
    let user, userToAdd, data;

    user = req.user;
    data = req.body;
    
    [errOnFindUser, userToAdd] = await to(User.findById(data.userId));

    user.profil.followingList.addToSet(userToAdd._id);
    userToAdd.profil.followerList.addToSet(user._id);

    [errOnUpdateUserToAdd, UserToAddProfil] = await to(userToAdd.save());

    [errOnUpdateCurrentUser, CurrentUserProfil] = await to(user.save());

    if (errOnUpdateUserToAdd) return ReE(res, errOnUpdateCurrentUser);

    return ReS(res, {message: "Updated user: " + user.email, followingList: CurrentUserProfil.profil.toWeb().followingList });
}
module.exports.addToMyFollowingList = addToMyFollowingList;

const addMyClap = async function(req, res) {
    let user, userToClap, data;

    user = req.user;
    data = req.body;
    
    [errOnFindUser, userToClap] = await to(User.findById(data.userId));

    userToClap.profil.clapList.addToSet(user._id);

    [errOnUpdateUserToClap, updatedUser] = await to(userToClap.save());

    if (errOnUpdateUserToClap) return ReE(res, errOnUpdateUserToClap);

    return ReS(res, {message: "Updated user: " + userToClap.email, clapList: updatedUser.profil.toWeb().clapList });
}
module.exports.addMyClap = addMyClap;

const removeFromMyFollowingList = async function(req, res) {
    let user, data;

    user = req.user; 
    data = req.body;

    [errOnFindUser, userToRemove] = await to(User.findById(data.userId));

    user.profil.followingList.pull(userToRemove._id);
    userToRemove.profil.followerList.pull(user._id);

    [errOnRemoveFromMyFollowingList, user] = await to(user.save());
    if (errOnRemoveFromMyFollowingList) return ReE(res, errOnRemoveFromMyFollowingList);

    [errOnRemoveFromMyFollowerList, userToRemove] = await to(userToRemove.save());
    if (errOnRemoveFromMyFollowerList) return ReE(res, errOnRemoveFromMyFollowerList);

    return ReS(res, {message: "Updated user: " + user.email, followingList: user.profil.toWeb().followingList });
}
module.exports.removeFromMyFollowingList = removeFromMyFollowingList;

const removeMyClap = async function(req, res) {
    let user, userToClap, data;

    user = req.user;
    data = req.body;
    
    [errOnFindUser, userToClap] = await to(User.findById(data.userId));

    userToClap.profil.clapList.pull(user._id);

    [errOnUpdateUserToClap, updatedUser] = await to(userToClap.save());

    if (errOnUpdateUserToClap) return ReE(res, errOnUpdateUserToClap);

    return ReS(res, {message: "Updated user: " + userToClap.email, clapList: updatedUser.profil.toWeb().clapList });
}
module.exports.removeMyClap = removeMyClap;