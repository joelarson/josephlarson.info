import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import MainContainer from './containers/MainContainer';
import ProjectsContainer from './containers/ProjectsContainer';
import Temp from './components/Temp';


export default (
    <Route path="/" component={MainContainer}>
        <IndexRoute component={Temp} />
        <Route path="projects/" component={ProjectsContainer} />
        <Redirect from="*" to="/" />
    </Route>
);
