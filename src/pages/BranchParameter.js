import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import swal from 'sweetalert';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {ajaxCall} from '../scripts/ajaxCall';
import $ from 'jquery';
import RangeSlider from 'react-bootstrap-range-slider';


export default class BranchParameter extends Component {
    state={
        BranchCode: JSON.parse(localStorage["userDetails"]).BranchCode,
        numParameters:0,
        arrParameters:[],
        arrBranchParameters:[],
        parametersWeigt:[],
        parametersCode: []
    }

    componentDidMount() {
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Parameter", "", this.successGetParameters, this.errorGetParameters);
        $("#pForm").submit(this.f1);
        $("#btn").click(this.SaveParameter);
      }

      f1=()=>{
          return false;
      }
    successGetParameters=(data)=>{
        this.setState({numParameters:data.length, arrParameters:data});
        console.log(data.length);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter/GetBranchParameter", "branchCode=" +this.state.BranchCode, this.successGetBranchParameter, this.errorGetBranchParameter);
    }

    errorGetParameters=(err)=>{
        console.log(err);
    }

    successGetBranchParameter=(data)=>{
        this.setState({arrBranchParameters:data});
        this.BuildParametersForms();
    }

    errorGetBranchParameter=(err)=>{
        console.log(err);
    }

     BuildParametersForms=()=> {
        let arrForm = "";
        let placeholder = "";
        let l = 0;
        let index=0;
        let arrCode=[];
        let param = this.state.arrParameters;
        console.log("arrBranchParameters :" + JSON.stringify(this.state.arrBranchParameters));
        console.log("arrParameters :" + JSON.stringify(this.state.arrParameters));

        for (l in this.state.arrBranchParameters) 
        {
            placeholder = `משקל נוכחי : ${this.state.arrBranchParameters[l].ParameterWeight}`;
            arrForm += `<div class="form-group" align="right">
                            <label for="${param[l].Pcode}">${param[l].Pname}</label>
                            <Input type="number" class="form-control" id="${param[l].Pcode}" placeholder="${placeholder}" style="direction: rtl;" required min="0" max="100">
                        </div>`;

            index += 1;
            arrCode[index] = param[l].Pcode;
            console.log("input id: " + this.state.arrParameters[l].Pcode);
        }
        this.setState({parametersCode:arrCode});
        $('#param').append(arrForm);
    }
    
    SaveParameter=()=> {
        let parameters=[];
        let param = this.state.parametersWeigt;
        console.log("numParameters: " + this.state.numParameters);
        console.log("in save");
        for (let i = 1; i <= this.state.numParameters; i++) {
            //insert the user value to arr
            param[i] = document.getElementById(this.state.parametersCode[i]).value;
            console.log(this.state.parametersWeigt[i]);
        }
        this.setState({parametersWeigt:param});
        if (this.checkValid() === true) {
            for (let j = 1; j <= this.state.numParameters; j++) {
                let branchParameter = {
                    BranchCode: this.state.BranchCode,
                    ParameterCode: this.state.parametersCode[j],
                    ParameterWeight: this.state.parametersWeigt[j]
                }
                console.log(JSON.stringify(branchParameter));
                parameters.push(branchParameter);

            }
            ajaxCall("PUT", "http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter", JSON.stringify(parameters), this.successUpdateBranchParameter, this.errorUpdatetBranchParameter);
            console.log("good!");
        }

        return false;
    }
    successUpdateBranchParameter=(data)=> {
        console.log(data);
        swal("Good job!", "success", "success");
        this.props.history.push("/BranchIndex");
    }

    errorUpdatetBranchParameter=(err)=> {
        console.log(err);
    }

    checkValid=()=> {
        let sum = 0;
        for (let i = 1; i <= this.state.numParameters; i++) {
            sum += Number(this.state.parametersWeigt[i]);
        }
        console.log(sum);
        if (sum != 100) {
            swal("כל הערכים צריכים להשלים ל100");
            return false;
        }
        return true;
    }

    render() {
        return (
                <Form id="PForm" style={{textAlign:'right'}} dir="rtl">
                <h3>משקלי קריטריונים</h3>
                <p align="center">הכנס משקל כל קריטריון כך שסך כל הקריטריונים ישלימו ל100</p>
                <div id="param">

                </div>
                <button id='btn' type="submit" className="btn btn-primary btn-block">שמור</button>
                </Form>
        )
    }
}
