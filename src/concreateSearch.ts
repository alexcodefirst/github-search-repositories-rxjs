import { fromEvent, Observable } from 'rxjs';
import $ from 'jquery';
import { ajax } from 'rxjs/ajax';
import { ISearchRepositoriesResult } from './models/ISearchRepositoriesResult';
import { IRepository } from './models/IRepository';
import { render } from './helpers/HtmlHelper';

export const sourceStream$ = fromEvent(document.getElementById('token') as HTMLInputElement, 'keyup');

export const request$ = (event: Event): Observable<ISearchRepositoriesResult> => {
    const baseUrl: string = 'https://api.github.com/search/repositories?';
    const params: object = {
        'sort': 'stars',
        'order': 'desc',
        'q': (event.target as HTMLInputElement).value
    };
    const request: string = baseUrl.concat($.param(params));
    return ajax.getJSON(request);
};

export const showRepositories = (response: ISearchRepositoriesResult): void => {
    if (response.items.length) {
        let content: string = '';
        response.items.forEach((repository: IRepository) => {
            content +=
                `<a class="item" href="${repository.html_url}" target="_blank">
                        <p>${repository.full_name}</p>
                        <img src="${repository.owner.avatar_url}">
                        <p>${repository.language}</p>
                        <i>${repository.description}</i>
                    </a>`;
        });
        render(content);
    } else {
        render(`<h1>Ooops.. Repositories weren't found</h1>`);
    }
};
