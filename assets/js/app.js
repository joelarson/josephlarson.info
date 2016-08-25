import React from 'react';
import ReactDom from 'react-dom';
import * as utils from './utils';

const Sample = ({state}) => {
    return <h1>{state.text}</h1>
};

function render () {
    ReactDom.render(
        <Sample state={{text: 'Sample'}}/>,
        document.getElementById('root')
    );
}
render();
// console.log(utils.rems2px(9));
