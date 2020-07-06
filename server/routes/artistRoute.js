const express = require("express");
const router = express.Router();

const artistController = require("./../controllers/artistController");

router.route("/").get(artistController.get).post(artistController.create);

router
    .route("/:id")
    .get(artistController.getOne)
    .patch(artistController.update)
    .delete(artistController.delete);

module.exports = router;
