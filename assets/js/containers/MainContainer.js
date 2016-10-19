import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';
import Main from '../components/Main';


class MainContainer extends Component {
    componentDidMount() {
        // can't safely dispatch actions until after component mounts
        // this.props.dispatch(actionCreators.initCalendar());
    }

    render() {
        // set document title based on section
        const { state } = this.props;
        document.title = `${state.site.sections[state.site.section].title} | Joseph Larson`;
        return (
            <Main state={this.props.state} {...this.props.actions}>
                {this.props.children}
            </Main>
        );
    }
}

MainContainer.propTypes = {
    state: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { state };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: {
            onToggleNav: () => dispatch(actionCreators.toggleNav()),
            onFilterButtonClick: () => dispatch(actionCreators.toggleFiltersVisibility()),
            onCategoryChange: category => dispatch(actionCreators.setCategory(category)),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
