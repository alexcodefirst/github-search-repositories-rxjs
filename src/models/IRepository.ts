import { IOwner } from './IOwner';

export interface IRepository {
    full_name: string;
    description: string;
    language: string;
    html_url: string;
    owner: IOwner;
}