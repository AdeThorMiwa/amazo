const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");
const playlistController = require("./../controllers/playlistController");
const audioController = require("./../controllers/audioController");

router.use(authController.protect);

router.route("/").get(playlistController.get).post(playlistController.create);
router.route("/report/:id").post(playlistController.reportPlaylist);

router
    .route("/byUser/:userId")
    .get(playlistController.aliasUser, playlistController.get);

router.route("/:id/audios").get(playlistController.getAudios);

router
    .route("/addToPlaylist/:playlist/:audio")
    .patch(audioController.userIsOwner, playlistController.addToPlaylist);

router
    .route("/:id")
    .get(playlistController.getOne)
    .patch(playlistController.update)
    .delete(playlistController.delete);

router.param("id", playlistController.isOwner);

module.exports = router;
