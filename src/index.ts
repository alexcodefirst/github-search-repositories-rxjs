import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinct, map, mergeMap, catchError, switchMap, onErrorResumeNext } from 'rxjs/operators';
import $ from 'jquery';
import './styles.css';
import { ajax } from 'rxjs/ajax';
import { ISearchRepositoriesResult } from './models/ISearchRepositoriesResult';
import { IRepository } from './models/IRepository';

const inputStream$: Observable<IRepository[]> =
    fromEvent(document.getElementById('tokenInput') as HTMLInputElement, 'keyup').pipe(
        distinct(),
        debounceTime(500),
        switchMap((event: Event): Observable<ISearchRepositoriesResult> => {

            const baseUrl: string = 'https://api.github.com/search/repositories?';
            const params: object = {
                'sort': 'stars',
                'order': 'desc',
                'q': (event.target as HTMLInputElement).value
            };
            const request: string = baseUrl.concat($.param(params));

            return ajax.getJSON(request);
        }),
        catchError((error: string): Observable<ISearchRepositoriesResult> => {
            render(`<h1>Smth went wrong: ${error}</h1>`);
            return of({ items: [] } as ISearchRepositoriesResult);
        }),
        map((response: ISearchRepositoriesResult): IRepository[] => {
            return response.items;
        })
    );

    inputStream$.subscribe((repositories: IRepository[]): void => {

        if (repositories.length) {

            let content: string = '';

            repositories.forEach((repository: IRepository) => {
                content +=
                    `<a class="item" href="${repository.html_url}" target="_blank">
                        <p>${repository.full_name}</p>
                        <img src="${repository.owner.avatar_url}">
                        <p>${repository.language}</p>
                        <i>${repository.description}</i>
                    </a>`;
            });

            render(content);
        }
    });

    const render = (content: string): void => {
        $('.container').empty();
        $('.container').append(content);
    };
