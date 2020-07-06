import React from "react";
import Feedback from "../Base/component/Feedback";

const Empty = ({ children }) => {
    return (
        <main>
            {children}
            <Feedback />
        </main>
    );
};

export default Empty;
