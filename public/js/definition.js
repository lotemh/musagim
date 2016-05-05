import { Musag } from "./Musag";
import { DataLabel } from "./dataLabel";

var Definition = React.createClass({
    showDefinition: function(){
        this.props.store.dispatch({type: "SHOW_DEFINITION"});
    },
    nextDefinition: function(){
        this.props.store.dispatch({type: "NEXT"});
    },
    render: function(){
        return (
            <div>
                <div className="definitionLabel">Define the next term:</div>
                <div id="defineContainer" className={this.props.store.getState().definition}>
                    <span className="definitionButton">
                        <button onClick={this.showDefinition}> Show Definition</button>
                    </span>

                    <DataLabel data={this.props.store.getState().value}/>
                    <Musag data={this.props.store.getState().key}/>
                </div>
                <div>
                    <button className="btn" onClick={this.nextDefinition}>Next</button>
                </div>
            </div>
        );
    }
});

export { Definition };