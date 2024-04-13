const mongoose = require("mongoose");
const forumSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            name: String,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    author: {
        type: String
    },
    authorId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
  },
);

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;