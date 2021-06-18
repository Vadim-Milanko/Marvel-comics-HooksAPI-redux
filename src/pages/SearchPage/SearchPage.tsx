import React, { useState, useEffect, useCallback } from 'react';
import queryString from 'query-string';
import { omit } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import { IProps, ICharacter } from './interfaces';
import { queryNameStartsWith, queryOrderBy, queryOffset, queryPage, LIMIT, QUERY_ORDER_BY, STANDART_MEDIUM, ASC_ORDER, DESC_ORDER, ORDER_BY } from './constants';
import Header from '../../components/Header/Header';
import Character from './components/Character/Character';
import Spinner from '../../components/Spinner/Spinner';
import SearchBar from './components/SearchBar/SearchBar';
import Pagination from '@atlaskit/pagination';
import { getQueryParams } from '../../utils';
import { fetchCharacters } from '../../store/characters/actions/actionCreators';
import { IStore } from '../../store/store';

import './style.scss';

const SearchPage: React.FC<IProps> = (props: IProps): JSX.Element => {
    const [searchQuery, setSearchQuery] = useState('');
    const characters = useSelector<IStore, ICharacter[]>(state => state.characters.characters);
    const total = useSelector<IStore, number>(state => state.characters.total);
    const isLoading = useSelector<IStore, boolean>(state => state.characters.isLoading);
    const dispatch = useDispatch();

    const apiFetchCharacters = (): void => {
        const { location } = props;

        const queryParams = getQueryParams(location.search);
        const name = queryParams.nameStartsWith as string;
        const pageFromUrl = queryParams[queryPage] || 1;
        const currentOffset = LIMIT * (pageFromUrl - 1);

        dispatch(fetchCharacters({ params: { ...omit(queryParams, [queryPage]), [queryOffset]: currentOffset } }));
        setSearchQuery(name || '');
    }

    useEffect(() => {
        apiFetchCharacters();
    }, []);

    useEffect(() => {
        window.addEventListener("popstate", apiFetchCharacters);

        return () => {
            window.removeEventListener("popstate", apiFetchCharacters);
        };
    }, []);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value)
    }

    const searchCharacters = useCallback((): void => {
        const { history, location } = props;
        const queryParams = getQueryParams(location.search);
        const name = queryParams.nameStartsWith as string;

        const newQueryParams = { ...queryParams, [queryNameStartsWith]: searchQuery };

        dispatch(fetchCharacters({ params: { ...omit(newQueryParams, [queryPage]), [queryOffset]: 0 } }));

        const queryStringURL = queryString.stringify({ ...newQueryParams, [queryPage]: 1 });

        if (name !== searchQuery) {
            history.push(`${history.location.pathname}?${queryStringURL}`);
        } else {
            history.replace(`${history.location.pathname}?${queryStringURL}`);
        }
    }, [searchQuery]);

    const changeOrder = (): void => {
        const { history, location } = props;
        const queryParams = getQueryParams(location.search);

        const order = queryParams[queryOrderBy] || QUERY_ORDER_BY.ASC;
        const newOrder = order === QUERY_ORDER_BY.ASC ? DESC_ORDER : ASC_ORDER;
        const newQueryParams = { ...queryParams, [queryOrderBy]: newOrder.order };

        dispatch(fetchCharacters({ params: omit(newQueryParams, [queryPage]) }));

        const queryStringURL = queryString.stringify(newQueryParams);

        history.push(`${location.pathname}?${queryStringURL}`);
    }

    const getPages = (total: number): number[] => {
        const pageCount = Math.ceil(total / LIMIT);
        const pages = [];

        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }

        return pages;
    }

    const onChangePagination = (pageNumber: number): void => {
        const { history, location } = props;

        const offset = LIMIT * (pageNumber - 1);
        const queryParams = getQueryParams(location.search);

        const newQueryParams = { ...queryParams, [queryOffset]: offset };

        dispatch(fetchCharacters({ params: omit(newQueryParams, [queryPage]) }));

        const queryStringURL = queryString.stringify(omit({ ...newQueryParams, [queryPage]: pageNumber }, ['limit', 'apikey', 'offset']));

        history.push(`${location.pathname}?${queryStringURL}`);
    }

    const getTitleOrderBy = () => {
        const queryParams = getQueryParams(location.search);
        let titleOrderBy = queryParams[queryOrderBy] || ORDER_BY.ASC;

        if (typeof queryParams[queryOrderBy] !== 'undefined') {
            titleOrderBy = queryParams[queryOrderBy] === QUERY_ORDER_BY.DESC ? ORDER_BY.DESC : ORDER_BY.ASC;
        }

        return titleOrderBy;
    }

    const queryPageParams = getQueryParams(location.search);
    const currentPage = queryPageParams[queryPage] || 1;

    return (
        <div className='search-page-wrapper'>
            <Header />
            <SearchBar
                searchQuery={searchQuery}
                title={getTitleOrderBy()}
                onInputChange={onInputChange}
                changeOrder={changeOrder}
                searchHeroes={searchCharacters} />
            <h2 className='list-title'>List of Character</h2>
            <>
                {
                    characters.map(character => {
                        const { thumbnail } = character;
                        const { extension, path } = thumbnail;
                        const imgSize = STANDART_MEDIUM;
                        const imgUrl = `${path}/${imgSize}.${extension}`;

                        return (
                            <Character
                                key={character.id}
                                id={character.id}
                                name={character.name}
                                imgUrl={imgUrl} />
                        )
                    })
                }
            </>
            <Spinner isLoading={isLoading} />
            <div className='pagination'>
                <Pagination
                    max={10}
                    pages={getPages(total)}
                    selectedIndex={currentPage === 0 ? currentPage : currentPage - 1}
                    onChange={(event: React.SyntheticEvent<any, Event>, page: number) => {
                        onChangePagination(page);
                    }} />
            </div>
        </div>
    )
}

export default SearchPage;