import React from 'react';
// import * as moment from 'moment';

import Project from './Project';


const Main = ({ state, onFilterButtonClick, onCategoryChange }) => {
    let projects = state.projects;
    if (state.category) {
        console.log('cat');
        projects = projects.filter(project => project.categories.indexOf(state.category) > -1);
    }
    return (
        <div>
            <header className="main-header">
                <button className="menu-btn" />
                <h1>{state.title}</h1>
                <button
                    className={(() => {
                        const classes = ['filter-btn'];
                        if (state.category) classes.push('active');
                        if (state.filtersVisible) classes.push('open');
                        return classes.join(' ');
                    })()}
                    title="Filter by category..."
                    onClick={onFilterButtonClick}
                />
                <ul className={(() => {
                    const classes = ['filters'];
                    if (state.filtersVisible) classes.push('active');
                    return classes.join(' ');
                })()}>
                    <li
                        onClick={() => onCategoryChange(null)}
                        className={state.category ? '' : 'active'}
                    >All</li>
                    <li
                        onClick={() => onCategoryChange('music')}
                        className={state.category === 'music' ? 'active' : ''}
                    >Music</li>
                    <li
                        onClick={() => onCategoryChange('code')}
                        className={state.category === 'code' ? 'active' : ''}
                    >Code</li>
                    <li
                        onClick={() => onCategoryChange('design')}
                        className={state.category === 'design' ? 'active' : ''}
                    >Design</li>
                </ul>
            </header>
            <section className="projects">
                {projects.map(project => (
                    <Project key={project.timestamp} state={project} />
                ))}
            </section>
        </div>
    );
};

Main.propTypes = {
    state: React.PropTypes.object.isRequired,
    onFilterButtonClick: React.PropTypes.func.isRequired,
    onCategoryChange: React.PropTypes.func.isRequired,
};


export default Main;
