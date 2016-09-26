import React from 'react';
import { Provider } from 'react-redux';

import MainContainer from '../containers/MainContainer';


const App = ({ store }) => (
    <Provider store={store}>
        <MainContainer state={store.getState()} />
    </Provider>
);
App.propTypes = { store: React.PropTypes.object.isRequired };


export default App;
