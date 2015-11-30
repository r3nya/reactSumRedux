const React = require('react');
// Provides render
const ReactDom = require('react-dom');
const Redux = require('redux');
// Provides Immutable Map
const Immutable = require('immutable');
// Provides connect() and <Provide>
const ReactRedux =  require('react-redux');

// ACTIONS
const sumX = n => ({ type: 'x', value: parseInt(n)});

const sumY = n => ({ type: 'y', value: parseInt(n)});

// REDUCER
const adder = (state = Immutable.Map({ x: 0, y: 0, z: 0}), action) => {
    switch (action.type) {
        case 'x': return state.set('x',action.value)
            .set('z',action.value + state.get('y'));
        case 'y': return state.set('y',action.value)
            .set('z',state.get('x') + action.value);
        default: return state;
    }
};

// COMPONENTS
const Numbox1 = (props, context) => ( <input type="number"
                          value={props.value}
                          onChange={e => context.store.dispatch(sumX(e.target.value))}/>
                         );

Numbox1.contextTypes = {
    store: React.PropTypes.object
};

const Numbox2 = (props, context) => ( <input type="number"
                          value={props.value}
                          onChange={e => context.store.dispatch(sumY(e.target.value))}/>
                         );

Numbox2.contextTypes = {
    store: React.PropTypes.object
};

const Output = props => ( <p> {props.result} </p>);

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

let Adder = (props, context) => {
        const { getState } = context.store;
        const s = getState();
        return (<div>
                  <Numbox1 value={s.x}/>
                  <Numbox2 value={s.y}/>
                  <Output result={s.z}/>
                </div>);
};

Adder.contextTypes = {
    store: React.PropTypes.object
};

// Connect the adder to the store
ReactRedux.connect(s => s)(Adder);

ReactDom.render(
    <ReactRedux.Provider store={Redux.createStore(adder)}>
    <Adder/>
    </ReactRedux.Provider>,
    document.getElementById('app'));

