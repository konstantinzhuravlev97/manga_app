import { legacy_createStore as createStore, combineReducers } from 'redux';

import characters from '../reducers/characters';
import manga from '../reducers/manga';

const store = createStore(combineReducers({characters, manga}), 
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;