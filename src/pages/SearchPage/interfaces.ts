import { RouteComponentProps } from 'react-router';
import { Location, Search } from 'history';

export interface IProps extends RouteComponentProps<Location<Search>>, IMapStateToProps, IMapDispatchToProps {}

export interface IThumbnail {
    extension: string;
    path: string;
}

export interface ICharacter {
    id: number;
    name: string;
    thumbnail: IThumbnail;
}
export interface IOrder {
    order: string;
    title: string;
}

export interface IState {
    searchQuery: string;
    ordering: IOrder;
    page: number;
}

export interface IMapStateToProps {
    characters: ICharacter[];
    total: number;
    isLoading: boolean;
}

export interface IMapDispatchToProps {
    fetchCharacters: (params: any) => void;
}