import { Definition } from "./definition";

var App = React.createClass({
    render: function() {
        return (
            <div className="App">
                <div className="menu">
                    <h1>Test is Coming</h1>
                </div>
                <div className="musagContainer">
                    <Definition store={this.props.store} />
                </div>
            </div>
        );
    }
});

export { App };