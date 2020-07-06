const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const utils = require("./../utils/modelUtilities");

const ChannelSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Channel name is Required"],
        unique: true,
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Channel description is Required"],
    },
    coverImage: {
        type: String,
        default: "channel-cover-default.png",
        required: true,
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
        default: Date.now(),
    },
});

ChannelSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "_id name photo",
    });

    next();
});

ChannelSchema.methods.report = async function () {
    utils.report(this);
};

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;
