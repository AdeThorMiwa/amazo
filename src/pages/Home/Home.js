import React from "react";
import { AudioCategory } from "../../components";
import { Fragment } from "react";
import { homeCategories } from "../../constants/categories";

const Home = () => {
    return (
        <Fragment>
            {homeCategories.map((cat, i) => (
                <AudioCategory
                    key={i}
                    title={cat.title.split("-").join(" ")}
                    {...cat}
                />
            ))}
        </Fragment>
    );
};

export default Home;
