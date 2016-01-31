var store;

function reducer(state, action){
    if (typeof state.key === 'undefined'){
        return nextDataReducer(state);
    }
    switch (action.type){
        case 'SHOW_DEFINITION':
            return  _.defaults({definition: 'label'}, state);
        case 'NEXT':
           return nextDataReducer(state);
        default:
            return state;
    }
}

function nextDataReducer(state){
    var item, used, randomIndex, data;
    used = state.used || [];
    data = state.data;
    if (data.length === 0){
        data = used;
        used = [];
    }
    randomIndex = getRandomIndex(data.length);
    var removed = data.slice(randomIndex,randomIndex + 1);
    item = removed[0];
    return {
        data: data.slice(0, randomIndex).concat(data.slice(randomIndex+1, data.length)),
        used: used.concat(removed),
        key: item.key,
        value: item.value,
        definition: 'button'
    };
}

function getRandomIndex(arrLength){
    return Math.floor(Math.random()*arrLength);
}

function getData(dataId){
    $.ajax({
        url: 'data?id=' + dataId,
        dataType: 'json',
        type: 'GET',
        success: function(result){
            initStore(result.data);
        }.bind(this),
        error: function(xhr, status, err){
            console.error("", status, err.toString());
        }.bind(this)
    });
}

(function() {
    var dataId = location.search.replace("?id=", '');
    getData(dataId);
}());


function initStore(data){
    var defaultState = {
        data: data,
        used: []
    };
    store = Redux.createStore(reducer, defaultState);
    store.subscribe(render);
    render();
}

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

                    <DataLabel data={store.getState().value}/>
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
                    <Definition/>
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
