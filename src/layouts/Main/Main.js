import React from "react";
import { BaseLayout } from "..";
import { MainWrapper } from "../../components";

const Main = ({ children }) => {
    return (
        <BaseLayout>
            <MainWrapper>{children}</MainWrapper>
        </BaseLayout>
    );
};

export default Main;
