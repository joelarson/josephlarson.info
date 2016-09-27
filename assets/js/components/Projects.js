import React from 'react';
import { Link } from 'react-router';

const Projects = ({ state }) => {
    let projects = state.site.sections.projects.items;
    if (state.site.category) {
        projects = projects.filter(
            project => project.categories.indexOf(state.site.category) > -1
        );
    }

    return (
        <section className="projects">
            {projects.map(project => (
                <article key={project.timestamp} className="project">
                    <header>
                        <h1><Link to="/">{project.title}</Link></h1>
                        <ul className="categories">
                            {project.categories.map(category => (
                                <li key={category} className={`category-${category}`}>
                                    <a
                                        href={`/categories/${category}/`}
                                        title={category}
                                    >{category}</a>
                                </li>
                            ))}
                        </ul>
                    </header>
                    <div className="subtext">
                        <div className="source">{project.source}</div>
                        <div className="version">{project.version}</div>
                    </div>
                    <ul className="tags">
                        {project.tags.map(
                            tag => <li key={tag}><a href={`/tags/${tag}/`}>#{tag}</a></li>
                        )}
                    </ul>
                </article>
            ))}
        </section>
    );
};

Projects.propTypes = {
    state: React.PropTypes.object.isRequired,
};


export default Projects;
