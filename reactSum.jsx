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
            break;
        case 'y': return state.set('y',action.value)
            .set('z',state.get('x') + action.value);
            break;
    }
};

// COMPONENTS
const Numbox1 = ({value}) => ( <input type="number"
                              value={value}
                              onChange={e => dispatch(sumX(e.target.value))}/>
                             );

const Numbox2 = ({value})  => ( <input type="number"
                          value={value}
                          onChange={e => dispatch(sumY(e.target.value))}/>
                         );

const Output = ({result}) => ( <p> result </p>);

/*
let Adder = React.createClass ({
    render: function () {
        console.log(this);
        console.log("==CONTEXT==");
        console.log(this.context);
        console.log("==PROPS==");
        console.log(this.props);
        const { dispatch, s } = this.props;
        return (<div>
                  <Numbox1 value={s.x}/>
                  <Numbox2 value={s.y}/>
                  <Output result={s.z}/>
                </div>);
    }
});
*/
const Adder = (props,context) => {
    console.log("==CONTEXT==");
    console.log(context);
    console.log("==PROPS==");
    console.log(props);
    const { dispatch, s } = props;
    return (<div>
            <Numbox1 value={s.x}/>
            <Numbox2 value={s.y}/>
            <Output result={s.z}/>
            </div>);
};

// Connect the adder to the store
ReactRedux.connect(s => s)(Adder);

ReactDom.render(<ReactRedux.Provider store={Redux.createStore(adder)}>
                <Adder/>
                </ReactRedux.Provider>,
    document.getElementById('app'));

