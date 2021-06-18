import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { charactersReducer, IState as ICharactersState } from './characters/reducers/reducer';
import { comicsReducer, IState as IComicsState } from './comics/reducers/reducer';
import rootSaga from './rootSaga';

export interface IStore {
    characters: ICharactersState;
    comicses: IComicsState;
}

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    characters: charactersReducer,
    comicses: comicsReducer,
});

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;