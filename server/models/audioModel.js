const mongoose = require("mongoose");
const Album = require("./albumModel");
const Schema = mongoose.Schema;
const utils = require("./../utils/modelUtilities");

const AudioSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please specify a title"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    thumbnail: {
        type: String,
        default: "thumbnail-default.png",
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
    album: {
        type: Schema.ObjectId,
        ref: "Album",
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

AudioSchema.pre(/^find/, function (next) {
    this.populate({
        path: "channel",
        select: "_id name",
    }).populate("artists");

    next();
});

AudioSchema.pre("save", function (next) {
    this.updatedAt = Date.now();

    next();
});

AudioSchema.pre("find", function (next) {
    this.find({ isSuspended: { $ne: true } });
    next();
});

AudioSchema.methods.incrementListens = async function () {
    this.listens = this.listens + 1;

    if (this.album) {
        const album = await Album.findById(this.album);
        await album.incrementListens();
    }

    this.save();
};

AudioSchema.methods.report = async function () {
    utils.report(this);
};

const Audio = mongoose.model("Audio", AudioSchema);

module.exports = Audio;
