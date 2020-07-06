import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { SnackbarProvider } from "notistack";

import Routes from "./Routes";

import theme from "./theme";
import { store } from "./redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/scss/slick.scss";

import "./assets/scss/style.scss";
import { Player } from "./components";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider
                    maxSnack={1}
                    autoHideDuration={5000}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <Router>
                        <Routes />
                    </Router>
                    <Player />
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
