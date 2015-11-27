var React = require('react');
// Provides render
var ReactDom = require('react-dom');
var Redux = require('redux');
// Provides Immutable Map
var Immutable = require('immutable');
// Provides connect() and <Provide>
var ReactRedux =  require('react-redux');

// ACTIONS
function sumX (n) {
 return {type: 'x', value: parseInt(n)};
}

function sumY (n) {
 return {type: 'y', value: parseInt(n)};
}

// REDUCER
function adder (state = Immutable.Map({ x: 0, y: 0, z: 0}), action) {
    switch (action.type) {
        case 'x': return state.set('x',action.value)
                              .set('z',action.value + state.get('y'));
                  break;
        case 'y': return state.set('y',action.value)
                              .set('z',state.get('x') + action.value);
                  break;
    }
}

// STORE
var store = Redux.createStore(adder);

// COMPONENTS
var Numbox1 = React.createClass ({
    render: function() {
        return ( <input type="number"
                  value={this.props.value}
                  onChange={e => dispatch(sumX(e.target.value))}/>
               );
    }
});

var Numbox2 = React.createClass ({
    render: function() {
        return (<input type="number"
                value={this.props.value}
                onChange={e => dispatch(sumY(e.target.value))}/>
               );
    }
});

var Output = React.createClass ({
    render: function () {
        return <p> {this.props.result} </p>;
    }
});

var Adder = React.createClass ({
    render: function () {
        console.log(this.props);
        const { dispatch, s } = this.props;
        return (<div>
                 <Numbox1 value={s.x}/>
                 <Numbox2 value={s.y}/>
                 <Output result={s.z}/>
                </div>);
    }
});

// Connect the adder to the store
ReactRedux.connect(s => s)(Adder);

ReactDom.render(
     <ReactRedux.Provider store={store}>
         <Adder/>
     </ReactRedux.Provider>,
     document.getElementById('app'));

