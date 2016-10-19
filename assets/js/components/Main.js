import React from 'react';

import Header from './Header';


const Main = ({
    state,
    onToggleNav, onFilterButtonClick, onCategoryChange,
    children,
}) => (
    <div>
        <Header
            state={state}
            onToggleNav={onToggleNav}
            onFilterButtonClick={onFilterButtonClick}
            onCategoryChange={onCategoryChange}
        />
        {children}
    </div>
);

Main.propTypes = {
    state: React.PropTypes.object.isRequired,
    onToggleNav: React.PropTypes.func.isRequired,
    onFilterButtonClick: React.PropTypes.func.isRequired,
    onCategoryChange: React.PropTypes.func.isRequired,
    children: React.PropTypes.element.isRequired,
};


export default Main;
