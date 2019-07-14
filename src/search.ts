import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { render } from './helpers/HtmlHelper';

export function search(sourceStream$: Observable<any>, request$: (event: Event) => Observable<any>): Observable<any> {
    return sourceStream$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(request$),
        catchError((error: Error, currentObsevable: Observable<any>) => {
            render(`<h1>Smth went wrong: ${error.message}</h1>`);
            return currentObsevable;
        }));
}
