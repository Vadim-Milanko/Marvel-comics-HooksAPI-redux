import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../../components/Spinner/Spinner';
import { IComics, IProps } from './iterfaces';
import { API_KEY, STANDART_LARGE } from './constants';
import Comics from './components/Comics/Comics';
import { getQueryParams } from '../../utils';

import './style.scss';
import { fetchComics } from '../../store/comics/actions/actionCreators';
import { IStore } from '../../store/store';

const ComicsPage: React.FC<IProps> = (props: IProps): JSX.Element => {

    const comicses = useSelector<IStore, IComics[]>(state => state.comicses.comicses);
    const isLoading = useSelector<IStore, boolean>(state => state.comicses.isLoading);
    const dispatch = useDispatch();


    const apiFetchComicses = (): void => {
        const { location, match } = props;
        const { characterId } = match.params;

        const queryParams = getQueryParams(location.search);

        dispatch(fetchComics(characterId, { params: { ...queryParams, apikey: API_KEY } }));
    }

    useEffect(() => {
        apiFetchComicses();
    }, [])

    return (
        <div className='comics-page-wrapper'>
            <h2 className='page-title'>Hero comics</h2>
            <div>
                {
                    comicses.map(comics => {
                        const { thumbnail } = comics;
                        const { extension, path } = thumbnail;
                        const imgSize = STANDART_LARGE;
                        const imgUrl = `${path}/${imgSize}.${extension}`;

                        return (
                            <Comics
                                key={comics.id}
                                title={comics.title}
                                description={comics.description}
                                imgUrl={imgUrl} />
                        )
                    })
                }
            </div>
            <Spinner isLoading={isLoading} />
        </div>
    )
}

export default ComicsPage;