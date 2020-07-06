import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@material-ui/core";
import Slider from "react-slick";
import { useStyles } from "./style";
import { sliderSetting } from "./settings";
import RenderView from "../RenderView/RenderView";
import { AudioCardSmall, AudioCard } from "..";
import { Link } from "react-router-dom";
import Axios from "../../utils/axios";

const AudioCategory = ({ title, dataSrc = "audios" }) => {
    const classes = useStyles();

    const [audios, setAudio] = useState([]);

    useEffect(() => {
        Axios.get(`${dataSrc}`)
            .then((res) => setAudio([...res.data.data.data]))
            .catch(console.log);
    }, [dataSrc]);

    return (
        <Box className={classes.root}>
            <Typography variant="h2" className={classes.title}>
                {title.split("-").join(" ")}
                <Link to={`/${title}`}>
                    <Button color="secondary">See All</Button>
                </Link>
            </Typography>
            <Slider {...sliderSetting}>
                {audios.length &&
                    audios.map((audio, idx) => (
                        <RenderView
                            key={idx}
                            playlist={audios}
                            {...audio}
                            component={AudioCard}
                            xs={AudioCardSmall}
                        />
                    ))}
            </Slider>
        </Box>
    );
};

export default AudioCategory;
