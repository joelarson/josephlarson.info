import React from 'react';

import Header from './Header';


const Main = ({ state, location, onFilterButtonClick, onCategoryChange, children }) => {
    let section;

    switch (location.pathname) {
        case '/':
            section = 'activity';
            break;
        case '/projects/':
            section = 'projects';
            break;
        case '/thoughts/':
            section = 'thoughts';
            break;
        default:
            section = '404';
            break;
    }

    return (
        <div>
            <Header
                state={state}
                section={section}
                onFilterButtonClick={onFilterButtonClick}
                onCategoryChange={onCategoryChange}
            />
            {children}
        </div>
    );
};

Main.propTypes = {
    state: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    onFilterButtonClick: React.PropTypes.func.isRequired,
    onCategoryChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
};


export default Main;
