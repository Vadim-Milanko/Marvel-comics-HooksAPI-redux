import { createReducer } from '@reduxjs/toolkit';

import { ComicsActionTypes as types } from './../../comics/actions/actionTypes';
import { IComics } from "../../../pages/ComicsPage/iterfaces";

export interface IState {
    comicses: IComics[];
    isLoading: boolean;
    error: string;
}

export const initialState: IState = {
    comicses: [],
    isLoading: false,
    error: '',
}

export const comicsReducer = createReducer(initialState, {
    [types.FETCH_COMICS_START]: (state, action) => {
        state.isLoading = true;
    },
    [types.FETCH_COMICS_SUCCESS]: (state, action) => {
        state.isLoading = false;
        state.comicses = action.payload;
    },
    [types.FETCH_COMICS_ERROR]: (state, action) => {
        state.isLoading = false;
        state.comicses = [];
        state.error = action.error;
    },
});