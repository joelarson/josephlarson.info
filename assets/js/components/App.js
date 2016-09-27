import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from '../routes';


const App = ({ store }) => {
    const history = syncHistoryWithStore(browserHistory, store);

    return (
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    );
};
App.propTypes = {
    store: React.PropTypes.object.isRequired,
};


export default App;
