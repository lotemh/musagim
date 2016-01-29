/**
 * Created by lotem on 1/23/2016.
 */
var index;

function reducer(state, action){
    var item;

    if (typeof state === 'undefined'){
        index = 0;
        item = data[index];
        return {
            key: item.key,
            data: item.value,
            definition: 'button'
        };
    }
    switch (action.type){
        case 'SHOW_DEFINITION':
            return  _.defaults({definition: 'label'}, state);
        case 'NEXT':
            index = increaseIndex(index);
            item = data[index];
            return {
                key: item.key,
                data: item.value,
                definition: 'button'
            };
        default:
            return state;
    }
}

function increaseIndex(index){
    return (index + 1) % data.length;
}

var store = Redux.createStore(reducer);
store.subscribe(render);

var Definition = React.createClass({
    showDefinition: function(){
        store.dispatch({type: "SHOW_DEFINITION"});
    },
    nextDefinition: function(){
        store.dispatch({type: "NEXT"});
    },
    render: function(){
        return (
            <div>
                <div id="defineContainer" className={store.getState().definition}>
                    <span className="definitionButton">
                        <button onClick={this.showDefinition}> Show Definition</button>
                    </span>

                    <DataLabel data={store.getState().data}/>
                    <Musag data={store.getState().key}/>
                </div>
                <div>
                    <button className="btn" onClick={this.nextDefinition}>Next</button>
                </div>
            </div>
        );
    }
});

var Musag = React.createClass({
    render: function() {
        return (
            <span>{this.props.data}</span>
        );
    }
});

var DataLabel = React.createClass({
    render: function() {
        return (
            <label>{this.props.data}</label>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="App">
                <div className="menu">
                    <h1>Test is Coming</h1>
                </div>

                <div className="definitionLabel">Define the next term:</div>
                <div className="musagContainer">
                    <Definition data={data}/>
                </div>
            </div>
        );
    }
});

function render(){
    ReactDOM.render(
        <App />,
        document.getElementById("root")
    );
}

render();
