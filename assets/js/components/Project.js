import React from 'react';


const Project = ({ state }) => (
    <article className="project">
        <header>
            <h1><a href={state.url}>{state.title}</a></h1>
            <ul className="categories">
                {state.categories.map(category => (
                    <li key={category} className={`category-${category}`}>
                        <a href={`/categories/${category}/`} title={category}>{category}</a>
                    </li>
                ))}
            </ul>
        </header>
        <div className="subtext">
            <div className="source">{state.source}</div>
            <div className="version">{state.version}</div>
        </div>
        <ul className="tags">
            {state.tags.map(tag => <li key={tag}><a href={`/tags/${tag}/`}>#{tag}</a></li>)}
        </ul>
    </article>
);

Project.propTypes = {
    state: React.PropTypes.object.isRequired,
};


export default Project;
