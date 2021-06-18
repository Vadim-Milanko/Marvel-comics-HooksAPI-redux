import { RouteComponentProps } from 'react-router';

export interface IParams {
    characterId: string;
}

export interface IProps extends RouteComponentProps<IParams>, IMapStateToProps, IMapDispatchToProps { }

export interface IThumbnail {
    extension: string;
    path: string;
}

export interface IComics {
    id: number;
    title: string;
    description: string;
    thumbnail: IThumbnail;
}

export interface IState {
    comicses: IComics[];
    isLoading: boolean,
}


export interface IMapStateToProps {
    comicses: IComics[];
    isLoading: boolean;
}

export interface IMapDispatchToProps {
    fetchComics: (characterId: string, params: any) => void;
}