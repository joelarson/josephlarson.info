import React from 'react';
import { connect } from 'react-redux';

// import * as actionCreators from '../actions';
import Projects from '../components/Projects';


function ProjectsContainer({ state, actions }) {
    return <Projects state={state} {...actions} />;
}

ProjectsContainer.propTypes = {
    state: React.PropTypes.object.isRequired,
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
            // onBlahBlah: () => dispatch(actionCreators.blahBlah()),
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer);
