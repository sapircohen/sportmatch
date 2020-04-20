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
        BranchCode: JSON.parse(localStorage["userDetails"]).Code,
        numParameters:0,
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
            console.log(data);
            console.log("im in success");
            console.log(data[0].Pname);
            console.log("branchCode: " + this.state.BranchCode.value);
            let arrForm = "";
            let placeholder = "";
            let counter=0;
            for (let k in data) {
                placeholder = ` הכנס משקל ${data[k].Pname}`;
                arrForm += `<div class="form-group" align="right">
                                <label for="${data[k].Pcode}">${data[k].Pname}</label>
                                <input type="number" class="form-control" id="${data[k].Pcode}" placeholder="${placeholder}" style="direction: rtl;" required min="0" max="100">
                            </div>`;

                counter += 1;
                let param = this.state.parametersCode;
                param.push(data[k].Pcode);
                this.setState({parametersCode:param})
                console.log("input id: " + data[k].Pcode);
            }
            
            this.setState({numParameters:counter});
            $('#param').append(arrForm);  
    }

    errorGetParameters=(err)=>{
        console.log(err);
    }
    
    SaveParameter=()=> {
        console.log("numParameters: " + this.state.numParameters);
        console.log("in save");
        for (let i = 1; i <= this.state.numParameters; i++) {
            //insert the user value to arr
            let p = document.getElementById(this.state.parametersCode[i]).value;
            //parametersWeigt[i] = document.getElementById(parametersCode[i]).value;
            let param = this.state.parametersWeigt;
            param.push(p);
            this.setState({parametersWeigt:param})
            console.log(this.state.parametersWeigt[i]);
        }
        if (this.checkValid() === true) {
            for (let j = 1; j <= this.state.numParameters; j++) {
                let branchParameter = {
                    BranchCode: this.state.BranchCode,
                    ParameterCode: this.state.parametersCode[j],
                    ParameterWeight: this.state.parametersWeigt[j]
                }
                console.log(JSON.stringify(branchParameter));
                ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter", JSON.stringify(branchParameter), this.successInsertBranchParameter, this.errorInsertBranchParameter);

            }

            console.log("good!");
        }

        return false;
    }
    successInsertBranchParameter=(data)=> {
        console.log(data);
        swal("Good job!", "success", "success");
    }

    errorInsertBranchParameter=(err)=> {
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
