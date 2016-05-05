import { reducer } from "./reducer";
import { App } from "./app";

var store;

function getData(dataId){
    $.ajax({
        url: 'data/' + dataId + '.json',
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



function render(){
    ReactDOM.render(
        <App store={store}/>,
        document.getElementById("root")
    );
}
