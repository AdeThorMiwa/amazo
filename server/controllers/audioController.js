const fs = require("fs");
const mongoose = require("mongoose");
const extend = require("lodash/extend");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Audio = require("../models/audioModel");
const factory = require("../factory/DBFactory");
const request = require("./../utils/request");
const allGenres = require("./../constants/genres");

let gridfs = null;
mongoose.connection.on("connected", () => {
    gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

exports.get = factory.getAll(Audio);

exports.getOne = factory.getOne(Audio);

exports.update = factory.updateOne(Audio);

exports.delete = factory.deleteOne(Audio);

exports.create = catchAsync(async (req, res, next) => {
    const { body: fields, files } = req;

    if (!files || !files.audio)
        return next(new AppError("Please add an Audio file", 400));
    if (files.audio.mimetype !== "audio/mpeg")
        return next(new AppError("Invalid file format", 400));

    let newAudio = new Audio({
        ...fields,
        album: fields.album && fields.album !== "" ? fields.album : null,
    });
    newAudio.postedBy = req.user.id;

    let writestream = gridfs.openUploadStream(newAudio._id, {
        contentType: files.audio.mimetype || "binary/octet-stream",
    });
    fs.createReadStream(files.audio.tempFilePath).pipe(writestream);
    const audio = await newAudio.save();

    res.status(201).json({
        status: "success",
        data: {
            data: audio,
        },
    });
});

exports.getAudio = catchAsync(async (req, res, next) => {
    const range = req.headers["range"];
    if (range && typeof range === "string") {
        const parts = range.replace(/bytes=/, "").split("-");
        const partialstart = parts[0];
        const partialend = parts[1];

        const start = parseInt(partialstart, 10);
        const end = partialend ? parseInt(partialend, 10) : req.file.length - 1;
        const chunksize = end - start + 1;

        res.writeHead(206, {
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Range":
                "bytes " + start + "-" + end + "/" + req.file.length,
            "Content-Type": req.file.contentType,
        });

        let downloadStream = gridfs.openDownloadStream(req.file._id, {
            start,
            end: end + 1,
        });
        downloadStream.pipe(res);
        downloadStream.on("error", () => {
            res.sendStatus(404);
        });
        downloadStream.on("end", () => {
            res.end();
        });
    } else {
        res.header("Content-Length", req.file.length);
        res.header("Content-Type", req.file.contentType);

        let downloadStream = gridfs.openDownloadStream(req.file._id);
        downloadStream.pipe(res);
        downloadStream.on("error", () => {
            res.sendStatus(404);
        });
        downloadStream.on("end", () => {
            res.end();
        });
    }
});

exports.audioByID = catchAsync(async (req, res, next) => {
    let audio = await Audio.findById(req.params.audioId);
    if (!audio) return next(new AppError("Audio not found", 404));
    req.audio = audio;

    let files = await gridfs.find({ filename: audio._id }).toArray();
    if (!files[0]) return next(new AppError("No audio found", 404));
    req.file = files[0];

    req.params.id = req.params.audioId;
    req.body = extend(audio, req.body);

    next();
});

exports.audioByArtist = factory.byArtist(Audio);

exports.deleteFile = (req, res, next) => {
    if (!req.audio.channel) return next(new AppError("Channel Not Found", 404));

    if (req.audio.channel._id.toString() !== req.params.channelId)
        return next(new AppError("Unauthorized user", 401));
    gridfs.delete(req.file._id);
    next();
};

exports.isOwner = (req, res, next) => {
    let channelId = request.getChannel(req);

    if (!req.audio.channel) return next(new AppError("Channel Not Found", 404));

    if (req.audio.channel._id.toString() !== channelId)
        return next(new AppError("Unauthorized user", 401));

    next();
};

exports.userIsOwner = catchAsync(async (req, res, next) => {
    let audioId = request.getAudio(req);
    const audio = await Audio.findById(audioId);

    if (audio.channel.user._id.toString() !== req.user.id)
        return next(new AppError("Unauthorized user", 401));
    next();
});

exports.incrementListens = catchAsync(async (req, res, next) => {
    let audio = await Audio.findById(req.params.id);
    if (!audio) return next(new AppError("Audio not found", 404));
    await audio.incrementListens();

    next();
});

exports.addToAlbum = catchAsync(async (req, res, next) => {
    const album = req.body.album || req.params.album;
    const audio = req.body.audio || req.params.audio;

    const updatedAudio = await Audio.findByIdAndUpdate(
        audio,
        {
            album,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        status: "success",
        data: updatedAudio,
    });
});

exports.aliasPopular = (req, res, next) => {
    req.query.limit = "9";
    req.query.sort = "-views";
    next();
};

exports.aliasByUser = (req, res, next) => {
    req.query.channel = {};

    req.query.channel["or"] = req.channels.map(({ _id }) => _id).join(",");
    next();
};

exports.aliasByChannel = (req, res, next) => {
    req.query.channel = request.getChannel(req);
    next();
};

exports.aliasRecommended = (req, res, next) => {
    req.query.listens = {};
    req.query.reports = {};

    req.query.listens["gte"] = 3;
    req.query.reports["ne"] = 0;

    req.query.sort = "listens, createdAt";
    next();
};

exports.genres = (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: allGenres.map((genre, id) => ({
            id,
            ...genre,
        })),
    });
};

exports.reportAudio = factory.report(Audio);
