/**
 * Created by lotem on 1/23/2016.
 */

var key = "";
var keys = [];
var shown = [];

function showDefinition(){
    var definitionElement = getDefinitionLabel();
    definitionElement.innerHTML = data[key];
    showButton(definitionElement);
    hideButton(getDefinitionButton());
}

function hideButton(button){
    button.setAttribute("class", 'hidden');
}

function showButton(element){
    element.setAttribute("class", 'definition');
}

function getDefinitionButton(){
    return document.querySelector("#defineContainer button");
}

function getDefinitionLabel(){
    return document.querySelector("#definition");
}

function getDefinitionKeyElement(){
    return document.querySelector("#musag");
}

function nextDefinition(){
    getDefinitionKeyElement().innerHTML = getDefinitionKey();
    showButton(getDefinitionButton());
    hideButton(getDefinitionLabel());
}

function getDefinitionKey(){
    if (keys.length === 0){
        keys = shown;
        shown = [];
    }
    key = keys.pop();
    shown.push(key);
    return key;
}

window.onload = function(){
    for (var k in data){
        keys.push(k);
    }
    nextDefinition();
};
