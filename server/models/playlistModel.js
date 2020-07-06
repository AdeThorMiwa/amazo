const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const utils = require("./../utils/modelUtilities");

const PlaylistSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please specify a title"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    coverImage: {
        type: String,
        default: "album-cover-default.png",
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
    },
    audios: [
        {
            type: Schema.ObjectId,
            ref: "Audio",
        },
    ],
    genre: [
        {
            type: String,
            trim: true,
        },
    ],
    reports: {
        type: Number,
        default: 0,
        select: false,
    },
    isSuspended: {
        type: Boolean,
        default: false,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

PlaylistSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "_id name",
    });

    next();
});

PlaylistSchema.methods.report = async function () {
    utils.report(this);
};

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
