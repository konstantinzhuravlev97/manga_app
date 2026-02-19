import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import characters from '../reducers/characters';
import manga from '../reducers/manga';

const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
};

const store = createStore(
                        combineReducers({characters, manga}),
                        compose(
                            applyMiddleware(thunk, stringMiddleware),
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                        )
                    );

export default store;