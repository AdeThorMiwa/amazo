const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const audioRouter = require("./routes/audioRoute");
const userRouter = require("./routes/userRoutes");
const channelRouter = require("./routes/channelRoute");
const albumRouter = require("./routes/albumRoute");
const artistRouter = require("./routes/artistRoute");
const playlistRouter = require("./routes/playlistRoute");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.enable("trust proxy");

// MIDDLEWARES
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(
    fileupload({
        useTempFiles: true,
    })
);

// ROUTES
// API ROUTES
app.use("/api/v1/audios", audioRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/channels", channelRouter);
app.use("/api/v1/albums", albumRouter);
app.use("/api/v1/artists", artistRouter);
app.use("/api/v1/playlists", playlistRouter);

app.use(globalErrorHandler);

app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`,
    });
});

module.exports = app;
