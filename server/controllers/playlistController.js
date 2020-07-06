const Playlist = require("./../models/playlistModel");
const factory = require("./../factory/DBFactory");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

exports.get = factory.getAll(Playlist);

exports.create = factory.createOne(Playlist);

exports.getOne = factory.getOne(Playlist);

exports.update = factory.updateOne(Playlist);

exports.delete = factory.deleteOne(Playlist);

exports.isOwner = catchAsync(async (req, res, next) => {
    const playlist = await Playlist.findById(req.params.id);

    if (playlist.user._id.toString() !== req.user.id)
        return next(new AppError("Unauthorized user", 401));

    next();
});

exports.getAudios = catchAsync(async (req, res, next) => {
    const { audios } = await Playlist.findById(req.params.id).populate(
        "audios"
    );
    res.status(200).json({
        status: "success",
        data: audios,
    });
});

exports.addToPlaylist = catchAsync(async (req, res, next) => {
    const audioId = req.params.audio;
    if (!audioId) return next(new AppError("No audio specified", 400));

    const playlist = await Playlist.findById(req.params.playlist);
    if (playlist.user._id.toString() !== req.user.id)
        return next(new AppError("Unauthorized access", 401));

    let audios = playlist.audios;

    if (audios.includes(audioId))
        return next(new AppError("Audio already added to playlist", 400));

    await playlist.updateOne({ $push: { audios: audioId } });

    res.status(200).json({
        status: "success",
        data: {
            ...playlist._doc,
            audios: [...playlist._doc.audios, audioId],
        },
    });
});

exports.reportPlaylist = factory.report(Playlist);

exports.aliasUser = (req, res, next) => {
    req.query.user = req.params.userId;
    next();
};
