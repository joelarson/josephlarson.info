import React from 'react';
import Masonry from 'react-masonry-component';

var masonryOptions = {
    transitionDuration: 0,
    isFitWidth: true,
    gutter: 15,
    itemSelector: '#masonry .project-card',
}

var projectsLoaded = 0; // alows me to delay enter transition progressively

var Project = React.createClass({
    getInitialState: function () {
        return {
            'name': '',
            'description': '',
            'image': '',
            'date_verb': '',
            'date': '',
            'version': '',
            'link': '',
            'categories': [],
            'tags': []
        };
    },
    componentDidMount: function () {
        var index = projectsLoaded++;
        this.setState(this.props.data);
        // transition in newly mounted projects 70ms apart
        setTimeout(function () {
            React.findDOMNode(this).classList.add('enter');
        }.bind(this), index * 70);
    },
    render: function () {
        return (
            <article className="project-card">
                <header>
                    <a href={this.state.link}>
                        <img src={this.state.image} alt={this.state.name}/>
                        <h1>{this.state.name}</h1>
                        <div className="release">
                            <p className="date">{this.state.date_verb} {this.state.date}</p>
                            <p className="version">{this.state.version}</p>
                        </div>
                    </a>
                </header>
                <p className="description">{this.state.description}</p>
                <footer>
                    <div className="tags">{this.state.tags.map(function(tag) {
                        return <a key={tag} href={`/tags/${tag}`}>#{tag}</a>;
                    })}</div>
                </footer>
            </article>
        );
    }
});


var Projects = React.createClass({
    getInitialState: function () {
        return {
            category: 'all',
            projects: []
        };
    },
    componentDidMount: function () {
        var url = this.state.category == 'all' ? this.props.source : `${this.props.source}?category=${this.state.category}`;
        $.get(url, function (results) {
            this.setState({
                category: this.state.category,
                projects: results
            });
        }.bind(this));
    },
    handleCategoryChange: function (event) {
        var category = $(event.currentTarget).data('category');
        var url = category == 'all' ? this.props.source : `${this.props.source}?category=${category}`;
        $.get(url, function (results) {
            var newState = Object.assign({}, this.state, {category: category});
            this.setState({
                category: category,
                projects: results
            });
        }.bind(this));
    },
    render: function () {
        projectsLoaded = 0;
        return (
            <div>
                <Masonry id="masonry" options={masonryOptions} disableImagesLoaded={false}>
                    <div className="filters">
                        <button className={'filter' + (this.state.category == 'all' ? ' selected' : '')} data-category="all" onClick={this.handleCategoryChange}>All</button>
                        <button className={'filter' + (this.state.category == 'music' ? ' selected' : '')} data-category="music" onClick={this.handleCategoryChange}>Music</button>
                        <button className={'filter' + (this.state.category == 'code' ? ' selected' : '')} data-category="code" onClick={this.handleCategoryChange}>Code</button>
                        <button className={'filter' + (this.state.category == 'design' ? ' selected' : '')} data-category="design" onClick={this.handleCategoryChange}>Design</button>
                    </div>
                    {this.state.projects.map(function(project, i) {
                        return <Project key={project.id} index={i} data={project} />;
                    }.bind(this))}
                </Masonry>
            </div>
        );
    },
});


export default Projects;