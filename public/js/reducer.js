
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

export  { reducer };