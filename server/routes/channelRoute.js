const express = require("express");
const router = express.Router();

const authController = require("./../controllers/authController");
const channelController = require("./../controllers/channelController");

router.use(authController.protect);

router
    .route("/byUser/:id")
    .get(channelController.aliasByUser, channelController.get);

router
    .route("/")
    .get(channelController.get)
    .post(channelController.createNewChannel);

router
    .route("/:id")
    .get(channelController.getOne)
    .patch(
        channelController.isOwner,
        channelController.parseChannel,
        channelController.update
    )
    .delete(
        channelController.isOwner,
        channelController.parseChannel,
        channelController.delete
    );

router.route("/report/:id").post(channelController.reportChannel);

module.exports = router;
