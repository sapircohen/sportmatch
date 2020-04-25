import React, { Component } from 'react';
import ButtonF from '../components/Button';
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";

class BranchIndex extends Component {

    ToCreate=()=> {
        console.log("in ToCreate");
        this.props.history.push("/RequestForReplacement");
    }
    ToParameter=()=> {
        console.log(" in ToParameter");
        this.props.history.push("/BranchParameters");

    }

    render() {
        return (
            <div>
                <h3> מסך ראשי - מנהל מכון כושר</h3>
                <div style={{margin:'2px', float:"right"}}>
                <ButtonF action={this.ToCreate} text="יצירת הודעת החלפה"/>
                </div>
                <div style={{margin:'2px', float:"right"}}>
                <ButtonF  action={this.ToParameter} text="משקלי קריטריונים"/>
                </div>
                
            </div>
        )
    }
}

export default withRouter(BranchIndex);
