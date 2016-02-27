import React from 'react';
import ReactDOM from 'react-dom';
import Projects from './components/Projects';


$(function() {
    setTimeout(function() {
        ReactDOM.render(
            <Projects source="/api/projects/" />,
            document.getElementById('projects')
        );
    }, 2000);
});
