const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");
const albumController = require("./../controllers/albumController");
const audioController = require("./../controllers/audioController");
const channelController = require("./../controllers/channelController");

router
    .route("/byChannel/:id")
    .get(albumController.aliasByChannel, albumController.get);

router.route("/byArtist/:id").get(albumController.albumByArtist);

router
    .route("/byUser/:id")
    .get(
        channelController.getUserChannels,
        albumController.aliasByUser,
        albumController.get
    );

router
    .route("/audios/:id")
    .get(albumController.aliasAudios, audioController.get);

router
    .route("/addToAlbum/:audio/:album")
    .get(
        authController.protect,
        albumController.isOwner,
        audioController.addToAlbum
    );

router
    .route("/")
    .get(albumController.get)
    .post(
        authController.protect,
        channelController.isOwner,
        albumController.create
    );

router
    .route("/:id")
    .get(albumController.getOne)
    .patch(
        authController.protect,
        channelController.isOwner,
        albumController.update
    );

router
    .route("/:albumId/:id")
    .delete(
        authController.protect,
        channelController.isOwner,
        albumController.parseChannel,
        albumController.delete
    );

router
    .route("/report/:id")
    .post(authController.protect, albumController.reportAlbum);

module.exports = router;
