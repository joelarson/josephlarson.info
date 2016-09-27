import React from 'react';


const Header = ({ state, section, onFilterButtonClick, onCategoryChange }) => (
    <header className="main-header">
        <button className="menu-btn" />
        <h1>{state.site.sections[section].title}</h1>
        <button
            className={(() => {
                const classes = ['filter-btn'];
                if (state.site.category) classes.push('active');
                if (state.site.filtersVisible) classes.push('open');
                return classes.join(' ');
            })()}
            title="Filter by category..."
            onClick={onFilterButtonClick}
        />
        <ul
            className={(() => {
                const classes = ['filters'];
                if (state.site.filtersVisible) classes.push('active');
                return classes.join(' ');
            })()}
        >
            <li
                onClick={() => onCategoryChange(null)}
                className={state.site.category ? '' : 'active'}
            >All</li>
            <li
                onClick={() => onCategoryChange('music')}
                className={state.site.category === 'music' ? 'active' : ''}
            >Music</li>
            <li
                onClick={() => onCategoryChange('code')}
                className={state.site.category === 'code' ? 'active' : ''}
            >Code</li>
            <li
                onClick={() => onCategoryChange('design')}
                className={state.site.category === 'design' ? 'active' : ''}
            >Design</li>
        </ul>
    </header>
);

Header.propTypes = {
    state: React.PropTypes.object.isRequired,
    section: React.PropTypes.string.isRequired,
    onFilterButtonClick: React.PropTypes.func.isRequired,
    onCategoryChange: React.PropTypes.func.isRequired,
};


export default Header;
