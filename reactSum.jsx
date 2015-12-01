const React = require('react');
// import React from 'react'
// Provides render
const ReactDom = require('react-dom');
const Redux = require('redux');
// Provides Immutable Map
const Immutable = require('immutable');
// Provides connect() and <Provide>
const ReactRedux =  require('react-redux');

// ACTIONS
const change_x = n => ({ type: 'x', value: parseInt(n)});

const change_y = n => ({ type: 'y', value: parseInt(n)});

// REDUCER

const adder = (state = Immutable.Map({ x: 0, y: 0, z: 0}), {value, type}) => {
    switch (type) {
        case 'x': return state.set('x', value)
            .set('z', value + state.get('y'));
        case 'y': return state.set('y', value)
            .set('z', state.get('x') + value);
        default: return state;
    }
};

// COMPONENTS
const Numbox = ({value, action}) =>
    <input type="number" value={value} onChange={action}/>;

const Output = ({result}) => <p> {result} </p>;

const Adder = ({state,dispatch}) =>
    <div>
       <Numbox value={state.get('x')}
               action={e => dispatch(change_x(e.target.value))}/>
       <Numbox value={state.get('y')}
               action={e => dispatch(change_y(e.target.value))}/>
       <Output result={state.get('z')}/>
    </div>;


// Connect the adder to the store
const ConnectedAdder = ReactRedux.connect(state => ({state: state}))(Adder);

ReactDom.render(
    <ReactRedux.Provider store={Redux.createStore(adder)}>
       <ConnectedAdder/>
    </ReactRedux.Provider>,
    document.getElementById('app'));

