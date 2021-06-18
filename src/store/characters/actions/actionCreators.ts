import { createAction } from '@reduxjs/toolkit';

import { ICharacter } from '../../../pages/SearchPage/interfaces';
import { CharactersActionTypes as types } from './actionTypes';

export interface IFetchPayload {
    params: any;
}

export interface IFetchCharacters {
    type: types.FETCH_CHARACTERS;
    payload: IFetchPayload
}

export interface IFetchCharactersStart {
    type: types.FETCH_CHARACTERS_START;
}

export interface ISuccessPayload {
    characters: ICharacter[];
    total: number;
}

export interface IFetchCharactersSuccess {
    type: types.FETCH_CHARACTERS_SUCCESS;
    payload: ISuccessPayload
}

export interface IFetchCharactersError {
    type: types.FETCH_CHARACTERS_ERROR;
    error: string;
}

export const fetchCharacters = createAction(types.FETCH_CHARACTERS, function prepare(params: any) {
    return {
        payload:
            params,
    }
})
export const fetchCharactersStart = createAction(types.FETCH_CHARACTERS_START);
export const fetchCharactersSuccess = createAction(types.FETCH_CHARACTERS_SUCCESS, function prepare(characters: ICharacter[], total: number) {
    return {
        payload: {
            characters,
            total,
        }
    }
});
export const fetchCharactersError = createAction<string>(types.FETCH_CHARACTERS_START);

export type TCharacterActions = IFetchCharacters | IFetchCharactersStart | IFetchCharactersSuccess | IFetchCharactersError;