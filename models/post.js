const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    fileUrl: {
        type: String
    },

    thumbnailUrl: {
        type: String
    },

    postType: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    isValid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true });

PostSchema.methods.toView = function() {
    let json = this.toJSON({ virtuals: true })
    delete json.isValid;
    return json;
}

//Add all virtual porperty to the JSON 
// Delete commentsList and reactionsList as it's no longer used anymore
PostSchema.methods.toList = function() {
    let json = this.toJSON({ virtuals: true })
    delete json.isValid;
    return json;
}

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;