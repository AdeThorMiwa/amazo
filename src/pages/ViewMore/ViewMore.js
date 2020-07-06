import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import { AudioCard, RenderView, AudioCardSmall } from "../../components";
import Axios from "./../../utils/axios";
import { Redirect } from "react-router-dom";
import { homeCategories } from "../../constants/categories";

const getUrl = (location) => {
    const categories = [...homeCategories];
    let url = null;

    categories.forEach((cat) => {
        if (cat.title === location) url = cat.dataSrc;
    });
    return url;
};

const ViewMore = ({ match }) => {
    const dataSrc = getUrl(match.params.category);
    const [audios, setAudio] = useState([]);

    useEffect(() => {
        Axios.get(`${dataSrc}`)
            .then((res) => setAudio([...res.data.data.data]))
            .catch((e) => console.log(e.response));
    }, [dataSrc]);

    if (!dataSrc) return <Redirect to="/not-found" />;

    return (
        <Box p={1}>
            <Grid container spacing={1}>
                {audios.length &&
                    audios.map((audio, idx) => (
                        <Grid item key={idx} xs={3}>
                            <RenderView
                                playlist={audios}
                                {...audio}
                                component={AudioCard}
                                xs={AudioCardSmall}
                            />
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
};

export default ViewMore;
