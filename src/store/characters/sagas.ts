import { put, call, takeEvery } from 'redux-saga/effects';

import { CharactersActionTypes as types } from './actions/actionTypes';
import { fetchCharactersStart, fetchCharactersSuccess, fetchCharactersError, } from './actions/actionCreators';
import { IFetchCharacters } from '../../store/characters/actions/actionCreators';
import api from '../../api/Api';

export function* watchFetchCharacters(): Generator {
    yield takeEvery(types.FETCH_CHARACTERS, fetchCharactersAsync);
}

export function* fetchCharactersAsync(action: IFetchCharacters): Generator {
    const { payload } = action;
    
    try {
        yield put(fetchCharactersStart());
        const data: any = yield call(() => {
            return api.fetchCharacters(payload);
        });
        yield put(fetchCharactersSuccess(data.results, data.total));
    } catch (error) {
        yield put(fetchCharactersError(error));
    }
}
