const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const utils = require("./../utils/modelUtilities");

const AlbumSchema = new Schema({
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
    artists: [
        {
            type: Schema.ObjectId,
            ref: "Artist",
            default: "unknown",
        },
    ],
    channel: {
        type: Schema.ObjectId,
        ref: "Channel",
        required: [true, "Please specify a channel"],
    },
    genre: {
        type: String,
        required: [true, "Please add a genre"],
        trim: true,
    },
    listens: {
        type: Number,
        default: 0,
    },
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

AlbumSchema.pre(/^find/, function (next) {
    this.populate({
        path: "channel",
        select: "_id name",
    });

    next();
});

AlbumSchema.methods.incrementListens = async function () {
    this.listens = this.listens + 1;
    this.save();
};

AlbumSchema.methods.report = async function () {
    utils.report(this);
};

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
