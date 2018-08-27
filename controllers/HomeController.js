const Post = require('../models').Post;

const Dashboard = function(req, res) {
    let user = req.user.id;
    return res.json({ success: true, message: 'it worked', data: 'user name is :' });
}
module.exports.Dashboard = Dashboard

const getMyFriendsPost = function(req, res) {
    let followingList, limit, offset, options;
    
    followingList = req.user.profil.followingList;
    // options = { userId: { $in: followingList }, postType: req.body.postType };
    options = { postType: req.body.postType };
    limit = parseInt(req.body.limit);
    offset = parseInt(req.body.offset);

    Post
        .find(options)
        .sort('-createdAt')
        .limit(limit)
        .skip(offset)
        .then((result) => {
            return ReS(res, { posts: result });
        })
        .catch((err) => {
            return ReE(res, err);
        });
}
module.exports.getMyFriendsPost = getMyFriendsPost;