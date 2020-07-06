const Album = require("../models/albumModel");
const factory = require("../factory/DBFactory");
const request = require("./../utils/request");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");
const extend = require("lodash/extend");

exports.get = factory.getAll(Album);

exports.create = factory.createOne(Album);

exports.getOne = factory.getOne(Album);

exports.update = factory.updateOne(Album);
exports.delete = factory.deleteOne(Album);

exports.parseChannel = (req, res, next) => {
    req.params.id = req.params.albumId;
    next();
};

exports.isOwner = catchAsync(async (req, res, next) => {
    let albumId = request.getAlbum(req);

    let album = await Album.findById(albumId);

    if (!album) return next(new AppError("Album not found", 404));
    if (album.channel.user._id.toString() !== req.user.id)
        return next(new AppError("Unauthorized user", 404));

    req.album = extend(album, req.body);
    next();
});

exports.ownByChannel = catchAsync(async (req, res, next) => {
    let albumId = request.getAlbum(req);
    if (albumId === "undefined") {
        let channelId = request.getChannel(req);
        const album = await Album.findById(albumId);

        if (!album) return next(new AppError("Channel not found", 404));
        let ownByChannel = album.channel._id.toString() === channelId;

        if (!ownByChannel)
            return next(new AppError("Unauthorized Album access", 401));
    }

    next();
});

exports.albumByArtist = factory.byArtist(Album);

exports.aliasByChannel = (req, res, next) => {
    req.query.channel = req.params.id;
    next();
};

exports.aliasByUser = (req, res, next) => {
    req.query.channel = {};

    req.query.channel["or"] = req.channels.map(({ _id }) => _id).join(",");
    next();
};

exports.aliasAudios = (req, res, next) => {
    req.query.album = req.params.id;
    next();
};

exports.reportAlbum = factory.report(Album);
