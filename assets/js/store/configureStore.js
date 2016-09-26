import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers';


function configureStore(initialState) {
    let enhancer;
    let middlewares = [
        thunkMiddleware,
    ];
    if (process.env.NODE_ENV !== 'production') {
        middlewares = [
            ...middlewares,
            // dev middlewares
            require('redux-immutable-state-invariant')(),  // eslint-disable-line
        ];

        // By default we try to read the key from ?debug_session=<key> in the address bar
        const getDebugSessionKey = () => {
            const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
            return (matches && matches.length) ? matches[1] : null;
        };

        enhancer = compose(
            // Middleware we want to use in development
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : x => x,
            // Lets you use ?debug_session=<key> to persist debug sessions
            persistState(getDebugSessionKey())
        );
    } else {
        enhancer = compose(applyMiddleware(...middlewares));
    }

    const store = createStore(rootReducer, initialState, enhancer);

    // Enable Webpack hot module replacement for reducers
    if (module.hot) module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));

    return store;
}


export default configureStore;
