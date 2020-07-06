import { createSelector } from "reselect";

const auth = (state) => state.auth;

export const selectUser = createSelector([auth], (auth) => auth.user);

export const selectAuthenticated = createSelector(
    [auth],
    (auth) => auth.authenticated
);

export const selectUserId = createSelector(
    [selectUser],
    (user) => user && user._id
);

export const selectLoading = createSelector([auth], (auth) => auth.loading);
export const selectError = createSelector([auth], (auth) => auth.error);
