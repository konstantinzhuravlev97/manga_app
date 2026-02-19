import { configureStore } from '@reduxjs/toolkit';

import characters from '../components/charList/charactersSlice';
import manga from '../components/mangaList/mangaSlice';


const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
};

// const store = createStore(
//                         combineReducers({characters, manga}),
//                         compose(
//                             applyMiddleware(thunk, stringMiddleware),
//                             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                         )
//                     );

const store = configureStore({
    reducer: {characters, manga},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;