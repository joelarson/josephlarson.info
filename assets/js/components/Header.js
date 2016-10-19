import React from 'react';
import { Link } from 'react-router';

const Header = ({ state, onToggleNav, onFilterButtonClick, onCategoryChange }) => (
    <header className="main-header">
        <h1 onClick={onToggleNav} className={state.site.navVisible ? 'open' : ''} >
            {state.site.sections[state.site.section].title}
        </h1>
        <nav className={state.site.navVisible ? 'main active' : 'main'}>
            <Link to="/">Activity</Link>
            <Link to="/projects/">Projects</Link>
            <Link to="/thoughts/">Thoughts</Link>
            <Link to="/about-me/">About Me</Link>
        </nav>
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
    onToggleNav: React.PropTypes.func.isRequired,
    onFilterButtonClick: React.PropTypes.func.isRequired,
    onCategoryChange: React.PropTypes.func.isRequired,
};


export default Header;
