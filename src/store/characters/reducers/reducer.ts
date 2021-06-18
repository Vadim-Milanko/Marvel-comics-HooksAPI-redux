import { createReducer } from '@reduxjs/toolkit';

import { ICharacter } from './../../../pages/SearchPage/interfaces';
import { CharactersActionTypes as types } from './../actions/actionTypes';


export interface IState {
    characters: ICharacter[];
    total: number;
    isLoading: boolean;
    error: string;
}

export const initialState: IState = {
    characters: [],
    total: 0,
    isLoading: false,
    error: '',
}

export const charactersReducer = createReducer(initialState, {
    [types.FETCH_CHARACTERS_START]: (state, action) => {
        state.isLoading = true;
    },
    [types.FETCH_CHARACTERS_SUCCESS]: (state, action) => {
        state.isLoading = false;
        state.characters = action.payload.characters;
        state.total = action.payload.total;
    },
    [types.FETCH_CHARACTERS_ERROR]: (state, action) => {
        state.isLoading = false;
        state.characters = [];
        state.total = 0;
        state.error = action.error;
    },
});