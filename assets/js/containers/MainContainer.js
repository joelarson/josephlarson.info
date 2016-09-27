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
        return (
            <Main state={this.props.state} location={this.props.location} {...this.props.actions}>
                {this.props.children}
            </Main>
        );
    }
}

MainContainer.propTypes = {
    state: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    children: React.PropTypes.element.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state, { location }) {
    return { state, location };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        actions: {
            onFilterButtonClick: () => dispatch(actionCreators.toggleFiltersVisibility()),
            onCategoryChange: category => dispatch(actionCreators.setCategory(category)),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
