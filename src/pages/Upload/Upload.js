import React, { useState } from "react";
import {
    Typography,
    TextField,
    Paper,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Chip,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";
import { SubmitButton } from "../../components";
import { useEffect } from "react";
import Axios from "./../../utils/axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserId } from "../../redux/auth/selector";
import { showSnack } from "../../redux/feedback/actions";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
        margin: "auto",
        padding: theme.spacing(4, 1),
        [theme.breakpoints.down("md")]: {
            width: "60%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "70%",
        },
        [theme.breakpoints.down("xs")]: {
            width: "92%",
        },
    },
    paper: {
        padding: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1, 0),
        maxWidth: 300,
        minWidth: "100%",

        "& > label": {
            transform: `translate(10px, 10px)`,
        },
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: "0px 2px",
        padding: 2,
        height: "fit-content",
    },
    artist: {
        "& > div": {
            padding: 10,
        },
    },
}));

function getStyles(val, arr, theme) {
    return {
        fontWeight:
            arr.indexOf(val) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const INITIAL_STATE = {
    audio: null,
    title: "",
    description: "",
    channel: "",
    album: "",
    genre: "",
};

const Upload = ({ user, showSnack }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [selectedArtists, setSelectedArtist] = useState([]);

    const [formData, setFormData] = useState(INITIAL_STATE);

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        channels: [],
        albums: [],
        genres: [],
        artists: [],
    });

    const { channels, albums, genres, artists } = data;

    useEffect(() => {
        Axios.get(`channels/byUser/${user}`)
            .then((res) =>
                setData((data) => ({
                    ...data,
                    channels: [...res.data.data.data],
                }))
            )
            .catch(showSnack);
    }, [user, showSnack]);

    useEffect(() => {
        Axios.get(`albums/byUser/${user}`)
            .then((res) =>
                setData((data) => ({
                    ...data,
                    albums: [...res.data.data.data],
                }))
            )
            .catch(showSnack);
    }, [user, showSnack]);

    useEffect(() => {
        Axios.get(`audios/genres`)
            .then((res) =>
                setData((data) => ({ ...data, genres: [...res.data.data] }))
            )
            .catch(showSnack);
    }, [user, showSnack]);

    useEffect(() => {
        Axios.get(`artists`)
            .then((res) =>
                setData((data) => ({
                    ...data,
                    artists: [...res.data.data.data],
                }))
            )
            .catch(showSnack);
    }, [user, showSnack]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const { title, description, channel, album, genre } = formData;

    const handleArtistChange = (e) => setSelectedArtist([...e.target.value]);
    const handleFileChange = (e) => {
        e.preventDefault();
        let audio;
        if (e.target.files && e.target.files.length) {
            audio = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                console.log(audio);
                setFormData({ ...formData, audio, title: audio.name });
            };
            reader.readAsDataURL(audio);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formDataObj = new FormData();
        let formDta = {
            ...formData,
            album: formData.album._id,
            artists: selectedArtists.map((artist) => artist._id),
        };
        for (let key in formDta) {
            formDataObj.append(key, formDta[key]);
        }

        try {
            const { data } = await Axios.post(`audios`, formDataObj);
            setFormData(INITIAL_STATE);
            setSelectedArtist([]);
            showSnack(data, "Upload Successful");
            setLoading(false);
        } catch (e) {
            showSnack(e);
            setLoading(false);
        }
    };

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Upload Music
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleFileChange}
                                type="file"
                                size="small"
                                color="secondary"
                                id="audio"
                                label="Audio"
                                helperText="Please select an audio file (.mp3)"
                                name="audio"
                                autoComplete="audio"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                size="small"
                                onChange={handleChange}
                                color="secondary"
                                id="title"
                                value={title}
                                label="Title"
                                helperText="Please specify the title of your music"
                                name="title"
                                autoComplete="title"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                multiline
                                rows={3}
                                value={description}
                                onChange={handleChange}
                                color="secondary"
                                id="description"
                                label="Description"
                                helperText="Please add a description of your music"
                                name="description"
                                autoComplete="description"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                select
                                size="small"
                                onChange={handleChange}
                                color="secondary"
                                id="channel"
                                label="Channel"
                                helperText="Please specify the channel music belongs to"
                                name="channel"
                                value={channel}
                            >
                                {channels.map((channel) => (
                                    <MenuItem
                                        key={channel._id}
                                        value={channel._id}
                                        className={classes.option}
                                    >
                                        {channel.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                select
                                size="small"
                                onChange={handleChange}
                                color="secondary"
                                id="album"
                                label="Album"
                                helperText="Please select an album this music belongs to (if any)"
                                name="album"
                                value={album}
                            >
                                {albums.map((album) => (
                                    <MenuItem
                                        key={album._id}
                                        value={album}
                                        className={classes.option}
                                    >
                                        {album.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl
                                variant="outlined"
                                className={classes.formControl}
                            >
                                <InputLabel htmlFor="outlined-age-native-simple">
                                    Artist(s)
                                </InputLabel>
                                <Select
                                    multiple
                                    className={classes.artist}
                                    value={selectedArtists}
                                    fullWidth
                                    onChange={handleArtistChange}
                                    label="Artist(s)"
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value._id}
                                                    label={value.name}
                                                    className={classes.chip}
                                                />
                                            ))}
                                        </div>
                                    )}
                                    inputProps={{
                                        name: "artists",
                                        id: "outlined-age-native-simple",
                                    }}
                                >
                                    <MenuItem aria-label="None" value="" />
                                    {artists.map((artist) => (
                                        <MenuItem
                                            key={artist._id}
                                            style={getStyles(
                                                artist._id,
                                                selectedArtists,
                                                theme
                                            )}
                                            value={artist}
                                        >
                                            {`${
                                                artist.stageName.length &&
                                                `${artist.stageName[0]}, `
                                            }${artist.name}`}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                select
                                size="small"
                                onChange={handleChange}
                                color="secondary"
                                id="genre"
                                label="Genre"
                                helperText="Please specify the genre of this music"
                                name="genre"
                                value={genre}
                            >
                                {genres.map((genre) => (
                                    <MenuItem
                                        key={genre.id}
                                        value={genre.value}
                                        className={classes.option}
                                    >
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <SubmitButton
                                variant="contained"
                                loading={loading}
                                color="secondary"
                            >
                                Upload
                            </SubmitButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    showSnack: (bundle, msg, type) => dispatch(showSnack(bundle, msg, type)),
});

const mapStateToProps = createStructuredSelector({
    user: selectUserId,
});

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
