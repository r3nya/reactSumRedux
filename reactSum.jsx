const React = require('react');
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
const Numbox1 = ({value}, {store}) => {
    return ( <input type="number"
            value={value}
            onChange={e => {
                console.log("event value is:");
                console.log(e.target.value);
                return store.dispatch(change_x(e.target.value));}}/>
           );
};

Numbox1.contextTypes = {
    store: React.PropTypes.object
};

const Numbox2 = ({value}, {store}) => (
    <input type="number"
           value={value}
           onChange={e => store.dispatch(change_y(e.target.value))}/>
);

Numbox2.contextTypes = {
    store: React.PropTypes.object
};

const Output = ({result}) => (<p> {result} </p>);
/*
let Adder = React.createClass ({
    render: function () {
        console.log(this);
        console.log("==CONTEXT==");
        console.log(this.context);
        console.log("==PROPS==");
        console.log(this.props);
        const { dispatch, getState } = this.props.store;
        const s = getState();
        return (<div>
                  <Numbox1 value={s.x}/>
                  <Numbox2 value={s.y}/>
                  <Output result={s.z}/>
                </div>);
    }
});
*/

const Adder = ({state}) => {
        return (<div>
                  <Numbox1 value={state.get('x')}/>
                  <Numbox2 value={state.get('y')}/>
                  <Output result={state.get('z')}/>
                </div>);
};

/*
Adder.contextTypes = {
    store: React.PropTypes.object
};
*/

// Connect the adder to the store
const ConnectedAdder = ReactRedux.connect(state => ({state: state}))(Adder);

ReactDom.render(
    <ReactRedux.Provider store={Redux.createStore(adder)}>
        <ConnectedAdder/>
    </ReactRedux.Provider>,
    document.getElementById('app'));

