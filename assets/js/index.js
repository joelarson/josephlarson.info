import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import App from './components/App';
import data from './data';


const store = configureStore(data);

function render() {
    ReactDom.render(
        <AppContainer>
            <App store={store} />
        </AppContainer>,
        document.getElementById('root')
    );
}

// initial render
render();

// hot reload react components
if (module.hot) module.hot.accept('./components/App', render);
