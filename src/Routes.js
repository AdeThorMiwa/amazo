import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";
import {
    Homepage,
    ExplorePage,
    SignInPage,
    SignUpPage,
    AudioDetailPage,
    UploadPage,
    ViewMorePage,
    AlbumDetailPage,
} from "./pages";
import { MainLayout, EmptyLayout, FullLayout } from "./layouts";

const NotFound = () => {
    return <div> Not found</div>;
};

const Routes = () => {
    return (
        <Switch>
            <RouteWithLayout
                component={Homepage}
                exact
                path="/"
                layout={MainLayout}
            />
            <RouteWithLayout
                component={ExplorePage}
                exact
                path="/explore"
                layout={MainLayout}
            />
            <RouteWithLayout
                component={AudioDetailPage}
                exact
                path="/audio/:audio"
                layout={FullLayout}
            />
            <RouteWithLayout
                component={AlbumDetailPage}
                exact
                path="/album/:album"
                layout={FullLayout}
            />
            <RouteWithLayout
                component={UploadPage}
                exact
                path="/upload-music"
                layout={MainLayout}
            />
            <RouteWithLayout
                component={SignInPage}
                exact
                path="/sign-in"
                layout={EmptyLayout}
            />
            <RouteWithLayout
                component={SignUpPage}
                exact
                path="/sign-up"
                layout={EmptyLayout}
            />
            <RouteWithLayout
                exact
                path="/not-found"
                layout={MainLayout}
                component={NotFound}
            />
            <RouteWithLayout
                component={ViewMorePage}
                exact
                path="/:category"
                layout={MainLayout}
            />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
