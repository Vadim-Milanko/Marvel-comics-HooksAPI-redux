import { createAction } from '@reduxjs/toolkit';
import { IComics } from "../../../pages/ComicsPage/iterfaces";
import { ComicsActionTypes as types } from "./actionTypes";

export interface IFetchPayload {
    characterId: string;
    params: any;
}

export interface IFetchComics {
    type: types.FETCH_COMICS;
    payload: IFetchPayload;
}

export interface IFetchComicsStart {
    type: types.FETCH_COMICS_START;
}

export interface IFetchComicsSuccess {
    type: types.FETCH_COMICS_SUCCESS;
    payload: IComics[];
}

export interface IFetchComicsError {
    type: types.FETCH_COMICS_ERROR;
    error: string;
}

export const fetchComics = createAction(types.FETCH_COMICS, function prepare(characterId: string, params: any) {
    return {
        payload: {
            characterId,
            params,
        }
    }
})
export const fetchComicsStart = createAction(types.FETCH_COMICS_START);
export const fetchComicsSuccess = createAction<IComics[]>(types.FETCH_COMICS_SUCCESS);
export const fetchComicsError = createAction<string>(types.FETCH_COMICS_ERROR);