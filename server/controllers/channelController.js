const extend = require("lodash/extend");
const Channel = require("../models/channelModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./../factory/DBFactory");

exports.get = factory.getAll(Channel);

exports.createNewChannel = factory.createOne(Channel);

exports.getOne = factory.getOne(Channel);
exports.update = factory.updateOne(Channel);
exports.delete = factory.deleteOne(Channel);

exports.isOwner = catchAsync(async (req, res, next) => {
    let channelId = req.body.channel || req.params.id;

    let channel = await Channel.findById(channelId);

    if (!channel) return next(new AppError("Channel not found", 404));
    if (channel.user._id.toString() !== req.user.id)
        return next(new AppError("Unauthorized user", 404));

    req.channel = extend(channel, req.body);
    next();
});

exports.getUserChannels = catchAsync(async (req, res, next) => {
    const channels = await Channel.find({ user: req.params.id });
    if (!channels.length)
        return res.status(200).json({
            status: "success",
            data: {
                data: [],
            },
        });

    req.channels = channels;
    next();
});

exports.parseChannel = (req, res, next) => {
    req.body = extend(req.channel, req.body);
    next();
};

exports.aliasByUser = (req, res, next) => {
    req.query.user = req.params.id;
    next();
};

exports.reportChannel = factory.report(Channel);
