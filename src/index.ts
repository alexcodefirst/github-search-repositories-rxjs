import './styles.css';
import { search } from './search';
import { sourceStream$, request$, showRepositories } from './concreateSearch';

search(sourceStream$, request$).subscribe(showRepositories);