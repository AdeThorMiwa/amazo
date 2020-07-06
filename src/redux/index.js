import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddleware();

const middleWares = [thunk, sagaMiddleware];

const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middleWares))
);

sagaMiddleware.run(rootSaga);

// const persistor = persistStore(store);

export { store };
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
