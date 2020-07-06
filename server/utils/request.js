exports.getChannel = (req) => {
    if (req.channel) return req.channel._id.toString();
    if (req.body.channel && typeof req.body.channel === "string")
        return req.body.channel;
    if (req.body.channel && typeof req.body.channel === "object")
        return req.body.channel._id.toString();
    if (req.params.channelId) return req.params.channelId;
    if (req.body.channelId) return req.body.channelId;
    return undefined;
};

exports.getAlbum = (req) => {
    if (req.body.album) return req.body.album;
    if (req.params.albumId) return req.params.albumId;
    if (req.params.album) return req.params.album;
    return undefined;
};

exports.getAudio = (req) => {
    if (req.body.audio) return req.body.audio;
    if (req.params.audioId) return req.params.audioId;
    if (req.params.audio) return req.params.audio;
    return undefined;
};
