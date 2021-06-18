import { fork } from 'redux-saga/effects';

import { watchFetchCharacters } from './characters/sagas';
import { watchFetchComics } from './comics/sagas';

function* rootSaga() {
    yield fork(watchFetchCharacters);
    yield fork(watchFetchComics);
}

export default rootSaga;