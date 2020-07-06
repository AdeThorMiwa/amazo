const express = require("express");

const audioController = require("./../controllers/audioController");
const authController = require("./../controllers/authController");
const channelController = require("./../controllers/channelController");
const albumController = require("./../controllers/albumController");

const router = express.Router();

router.route("/popular").get(audioController.aliasPopular, audioController.get);
router
    .route("/recommended")
    .get(audioController.aliasRecommended, audioController.get);

router
    .route("/audio/:audioId")
    .get(audioController.incrementListens, audioController.getAudio);

router.route("/genres").get(audioController.genres);

router
    .route("/")
    .get(audioController.get)
    .post(
        authController.protect,
        channelController.isOwner,
        albumController.ownByChannel,
        audioController.create
    );

// router.use(authController.protect);

router
    .route("/byUser/:id")
    .get(
        channelController.getUserChannels,
        audioController.aliasByUser,
        audioController.get
    );
router
    .route("/byChannel/:channelId")
    .get(audioController.aliasByChannel, audioController.get);

router.route("/byArtist/:id").get(audioController.audioByArtist);

router.route("/report/:id").post(audioController.reportAudio);

router
    .route("/:audioId")
    .get(audioController.getOne)
    .patch(audioController.isOwner, audioController.update);

router
    .route("/:audioId/:channelId")
    .delete(audioController.deleteFile, audioController.delete);

router.param("audioId", audioController.audioByID);

module.exports = router;
