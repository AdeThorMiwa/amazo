const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
    },
    stageName: {
        type: Array,
        required: [true, "Please provide at least one stage name"],
    },
    description: String,
    genre: [String],
});

// TODO: select only first stageName

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
