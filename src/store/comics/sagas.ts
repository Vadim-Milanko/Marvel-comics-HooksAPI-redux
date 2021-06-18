import { put, call, takeEvery } from 'redux-saga/effects';

import { ComicsActionTypes as types } from './../comics/actions/actionTypes';
import { fetchComicsStart, fetchComicsSuccess, fetchComicsError, IFetchComics } from './actions/actionCreators';
import api from '../../api/Api';

export function* watchFetchComics(): Generator {
    yield takeEvery(types.FETCH_COMICS, fetchComicsAsync);
}

export function* fetchComicsAsync(action: IFetchComics): Generator {
    const { characterId, params } = action.payload;

    try {
        yield put(fetchComicsStart());

        const data: any = yield call(() => {
            return api.fetchComics(characterId, params);
        });

        yield put(fetchComicsSuccess(data.results));
    } catch (error) {
        yield put(fetchComicsError(error))
    }
}