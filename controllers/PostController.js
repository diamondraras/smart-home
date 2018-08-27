const Post = require('../models').Post;

/** req contains 
/*  req.user after authencification
**/

// @return array of posts 
// Working
const getAll = async function(req, res) {
    let posts = [];

    Post.find({})
        .then((results) => {
            results.forEach(result => {
                posts.push(result.toList())
            });
            return ReS(res, { posts: posts });
        })
        .catch((err) => {
            return ReE(res, err, 422);
        })
}
module.exports.getAll = getAll;

// Get all posts made by the current user
const getAllByUser = async function(req, res) {
    let user = req.user;
    let posts = [];

    Post.find({ userId: user._id })
        .then((results) => {
            if (!results)
                return ReE(res, new Error('User has no posts'), 422);
            results.forEach(result => {
                posts.push(result.toList())
            });
            return ReS(res, { posts: posts });
        })
        .catch((err) => {
            return ReE(res, err, 422);
        })
}
module.exports.getAllByUser = getAllByUser;

const getAllByMatch = async function(req, res) {
    let user = req.user;
    let posts = [];
    let query = {};
    query['isValid'] = true;
    if(req.body.matchId){
         query['matchId'] = req.body.matchId;
    }

    console.log(query);
    
    Post.find(query)
        .then((results) => {
            if (results == ''){
                return ReE(res, {message : 'No match video found'}, 422);
            }
            results.forEach(result => {
                posts.push(result.toList())
            });
            return ReS(res, { videos: posts });
        })
        .catch((err) => {
            return ReE(res, err, 422);
        })
}
module.exports.getAllByMatch = getAllByMatch;

//Require only post props 
//Currently working
const create = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.files)
        return ReE(res, new Error('No file uploaded'))

    let user = req.user;
    let postProps = req.body;
    postProps.userId = user._id;

    postProps.fileUrl = req.files.file[0].path;
    postProps.thumbnailUrl = req.files.thumbnail[0].path;

    /** Transform string of hashtag into array of hashtag */
    if(postProps.hashtag){
        let old_hashtags = postProps.hashtag.split("#");
        let new_hashtags = [];
    
        for (i = 0; i < old_hashtags.length; i++) {
            if (old_hashtags[i] != '') {
                new_hashtags.push('#' + old_hashtags[i])
            }
        }
        postProps.hashtag = new_hashtags;
    }


    const new_post = new Post(postProps);
    new_post.save((err, results) => {
        if (err) return ReE(res, err, 422);
        new_post.toWeb().then((obj) => {
            return ReS(res, { message: 'Post successfully created', post: obj });
        })
    });
}
module.exports.create = create;

const createMultiple = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    if (!req.files)
        return ReE(res, new Error('No file uploaded'))

    
    let user = req.user;
    let postProps = req.body;
    let posts  = [];
    let count = 0;
    postProps.userId = user._id;
    /** Transform string of hashtag into array of hashtag */
    if(postProps.hashtag){
        let old_hashtags = postProps.hashtag.split("#");
        let new_hashtags = [];
    
        for (i = 0; i < old_hashtags.length; i++) {
            if (old_hashtags[i] != '') {
                new_hashtags.push('#' + old_hashtags[i])
            }
        }
        postProps.hashtag = new_hashtags;
    }

    req.files.file.forEach((file) => {
        postProps.fileUrl = file.path;
        postProps.thumbnailUrl = req.files.thumbnail[count].path;
        count++;
        posts.push({...postProps})
    })
    Post.create(posts).then(() => {
        return ReS(res, { message: 'Posts successfully created'});
    });
}
module.exports.createMultiple = createMultiple;

//Get single record by id
//Working
const get = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let user = req.user;

    Post.findById(req.params.post_id)
        .populate('commentsList')
        .then((result) => {
            return ReS(res, { post: result.toView() })
        })
        .catch((err) => {
            return ReE(res, err, 422)
        })
};
module.exports.get = get;


//Working
const update = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let files = req.files
    let post, postProps;

    postProps = req.body;
    Post.findById(postProps.postId)
        .then((result) => {
            delete postProps.postId;
            if (files) {
                if (files.file)
                    postProps.fileUrl = files.file[0].path;
                if (files.thumbnail)
                    postProps.thumbnailUrl = files.thumbnail[0].path;
            }
            result.update(postProps)
                .then(() => {
                    return ReS(res, { message: 'Post successfully updated' });
                })
                .catch((err) => {
                    return ReE(res, err, 422)
                })
        })
        .catch((err) => {
            return ReE(res, err, 422)
        })

}
module.exports.update = update;

const remove = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Post.findById(req.body._id)
        .then((result) => {
            result.remove()
                .then(() => {
                    console.log('removed');
                    return res.send({ 'success': 'true', 'message': 'Post deleted' });
                })
                .catch((err) => {
                    return ReE(res, err);
                })
        })
        .catch((err) => {
            return ReE(res, err)
        })


}
module.exports.remove = remove;

const react = async function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let user = req.user;

    Post.findById(req.body._id)
        .then(async function(post) {
            if (req.body.type == "clap") {
                post.reactionsList.clapList.addToSet(user._id);
                [err, result] = await to(post.save())
            } else if (req.body.type == "dislike") {
                post.reactionsList.dislikeList.addToSet(user._id);
                [err, result] = await to(post.save())
            } else if (req.body.type == "unclap") {
                post.reactionsList.clapList.pull(user._id);
                [err, result] = await to(post.save())
            } else if (req.body.type == "like") {
                post.reactionsList.dislikeList.pull(user._id);
                [err, result] = await to(post.save())
            } else {
                return ReR(res, "Error with the entered reaction")
            }
            return ReS(res, { message: "Post successfully updated", post: result })
        })
}
module.exports.react = react;

const shareMe = async function (req, res){
    let user, data;

    user = req.user;
    data = req.body;

    [errOnFindPost, post] = await to(Post.findById(data.postId));
    if (errOnFindPost) return ReE(res, errOnFindPost);
    
    post.shareList.addToSet(user._id);
    user.profil.shareList.addToSet(post._id);

    [errOnSaveUserShareList, user] = await to(user.save());
    if (errOnSaveUserShareList) return ReE(res, errOnSaveUserShareList);

    [errOnSavePostShareList, post] = await to(post.save());
    if (errOnSavePostShareList) return ReE(res, errOnSavePostShareList);

    return ReS(res, { message: 'Shared post: ' + post._id });
}
module.exports.shareMe = shareMe;
