import axios from 'axios';

import { ICharacter } from '../pages/SearchPage/interfaces';
import { IComics } from '../pages/ComicsPage/iterfaces'
import { BASE_URL, CHARACTERS, LIMIT, API_KEY } from '../pages/SearchPage/constants';
import { COMICS_BASE_URL, COMICS } from '../pages/ComicsPage/constants';

const CHARACTERS_URL = `${BASE_URL}/${CHARACTERS}`;

export interface IFetchCharactersResponse {
    limit: number;
    offset: number;
    results: ICharacter[];
    total: number;
}

export interface IFetchComicsResponse {
    results: IComics[];
}

interface IApi {
    fetchCharacters(requestParams?: any): Promise<IFetchCharactersResponse>;
    fetchComics(url: string, requestParams?: any): Promise<IFetchComicsResponse>;
}

class Api implements IApi {

    async fetchCharacters(requestParams: any): Promise<IFetchCharactersResponse> {
        let response;

        try {
            response = await axios.get(CHARACTERS_URL, { ...requestParams, params: { ...requestParams.params, limit: LIMIT, apikey: API_KEY } });
        } catch (error) {
            console.log(error);
        }

        return response?.data?.data;
    }

    async fetchComics(characterId: string, requestParams: any): Promise<IFetchComicsResponse> {
        let response;
        const COMICS_URL = `${COMICS_BASE_URL}/${characterId}/${COMICS}`;

        try {
            response = await axios.get(COMICS_URL, requestParams);
        } catch (error) {
            console.log(error);
        }

        return response?.data?.data;
    }
}

const api = new Api();

export default api;