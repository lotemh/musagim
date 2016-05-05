/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _reducer = __webpack_require__(2);

	var _app = __webpack_require__(3);

	var store;

	function getData(dataId) {
	    $.ajax({
	        url: 'data/' + dataId + '.json',
	        dataType: 'json',
	        type: 'GET',
	        success: function (result) {
	            initStore(result.data);
	        }.bind(this),
	        error: function (xhr, status, err) {
	            console.error("", status, err.toString());
	        }.bind(this)
	    });
	}

	(function () {
	    var dataId = location.search.replace("?id=", '');
	    getData(dataId);
	})();

	function initStore(data) {
	    var defaultState = {
	        data: data,
	        used: []
	    };
	    store = Redux.createStore(_reducer.reducer, defaultState);
	    store.subscribe(render);
	    render();
	}

	function render() {
	    ReactDOM.render(React.createElement(_app.App, { store: store }), document.getElementById("root"));
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function reducer(state, action) {
	    if (typeof state.key === 'undefined') {
	        return nextDataReducer(state);
	    }
	    switch (action.type) {
	        case 'SHOW_DEFINITION':
	            return _.defaults({ definition: 'label' }, state);
	        case 'NEXT':
	            return nextDataReducer(state);
	        default:
	            return state;
	    }
	}

	function nextDataReducer(state) {
	    var item, used, randomIndex, data;
	    used = state.used || [];
	    data = state.data;
	    if (data.length === 0) {
	        data = used;
	        used = [];
	    }
	    randomIndex = getRandomIndex(data.length);
	    var removed = data.slice(randomIndex, randomIndex + 1);
	    item = removed[0];
	    return {
	        data: data.slice(0, randomIndex).concat(data.slice(randomIndex + 1, data.length)),
	        used: used.concat(removed),
	        key: item.key,
	        value: item.value,
	        definition: 'button'
	    };
	}

	function getRandomIndex(arrLength) {
	    return Math.floor(Math.random() * arrLength);
	}

	exports.reducer = reducer;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.App = undefined;

	var _definition = __webpack_require__(4);

	var App = React.createClass({
	    displayName: "App",

	    render: function render() {
	        return React.createElement(
	            "div",
	            { className: "App" },
	            React.createElement(
	                "div",
	                { className: "menu" },
	                React.createElement(
	                    "h1",
	                    null,
	                    "Test is Coming"
	                )
	            ),
	            React.createElement(
	                "div",
	                { className: "musagContainer" },
	                React.createElement(_definition.Definition, { store: this.props.store })
	            )
	        );
	    }
	});

	exports.App = App;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Definition = undefined;

	var _Musag = __webpack_require__(5);

	var _dataLabel = __webpack_require__(6);

	var Definition = React.createClass({
	    displayName: "Definition",

	    showDefinition: function showDefinition() {
	        this.props.store.dispatch({ type: "SHOW_DEFINITION" });
	    },
	    nextDefinition: function nextDefinition() {
	        this.props.store.dispatch({ type: "NEXT" });
	    },
	    render: function render() {
	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "div",
	                { className: "definitionLabel" },
	                "Define the next term:"
	            ),
	            React.createElement(
	                "div",
	                { id: "defineContainer", className: this.props.store.getState().definition },
	                React.createElement(
	                    "span",
	                    { className: "definitionButton" },
	                    React.createElement(
	                        "button",
	                        { onClick: this.showDefinition },
	                        " Show Definition"
	                    )
	                ),
	                React.createElement(_dataLabel.DataLabel, { data: this.props.store.getState().value }),
	                React.createElement(_Musag.Musag, { data: this.props.store.getState().key })
	            ),
	            React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "button",
	                    { className: "btn", onClick: this.nextDefinition },
	                    "Next"
	                )
	            )
	        );
	    }
	});

	exports.Definition = Definition;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Musag = React.createClass({
	    displayName: "Musag",

	    render: function render() {
	        return React.createElement(
	            "span",
	            null,
	            this.props.data
	        );
	    }
	});

	exports.Musag = Musag;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var DataLabel = React.createClass({
	    displayName: "DataLabel",

	    render: function render() {
	        return React.createElement(
	            "label",
	            null,
	            this.props.data
	        );
	    }
	});

	exports.DataLabel = DataLabel;

/***/ }
/******/ ]);