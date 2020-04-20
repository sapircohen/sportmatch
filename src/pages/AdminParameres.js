import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import swal from 'sweetalert';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import {ajaxCall} from '../scripts/ajaxCall';
import $ from 'jquery';


export default class AdminParameres extends Component {

    state={
        parameterName:"",
        Continents:""
    }


    componentDidMount() {
        document.getElementById("show").style.visibility = 'hidden';
        $("#parameterForm").submit(this.f1);
        $("#btn").click(this.InsertParameter);
        $("#showParameter").click(this.f2);
      }

      f1=()=>{
          return false;
      }
     f2=()=>{
        this.ShowParameter();
        return false;
    }
    ShowParameter=()=>{
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/GetParameter/", "", this.successGetParameter, this.errorGetParameter);
    }
    InsertParameter=()=>{
        let parameter = {
            Pname: this.parameterName.value
        }
        console.log(JSON.stringify(parameter));
        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/Parameter", JSON.stringify(parameter), this.successInsertParameter, this.errorInsertParameter);
    }
    successInsertParameter=(data)=>{
        console.log(data);
        swal("Good job!", "success", "success");
    }
    errorInsertParameter=(err)=>{
        console.log(err);
    }
    successGetParameter=(data)=>{
        console.log(data);
        document.getElementById("show").style.visibility = 'visible';
        this.setState({Continents: data})
        console.log(data);
        try {
            let tbl = $('#Parameter_Table').DataTable({
                data: data,
                pageLength: 5,
                columns: [
                    { data: "ParameterCode" },
                    { data: "ParameterName" }
                ],
            });

        }
        catch (err) {
            alert(err);
        }
    }
    errorGetParameter=(err)=>{
        console.log("error " + err);
    }


    render() {
        return (
        <div>
        <Form id="parameterForm">
            <label for="Pname">שם הפרמטר</label><br/>
            <Input setInput={(e)=>this.setState({parameterName:e.target.value})} type="text" id="name" placeholder="הזן את שם הפרמטר"/><br/>
            <ButtonF id="btn" type="submit" action={this.validate} text="הוסף פרמטר"/>
            <ButtonF id="showParameter" action={this.validate} text="הצג פרמטרים"/>
        </Form>
        <div id="show">
        <Form id="Form">
            <table id="Parameter_Table" style={{width:"100%"}}>
                <thead>
                    <tr>
                        <th>קוד פרמטר</th>
                        <th>שם פרמטר</th>

                    </tr>
                </thead>
            </table>
        </Form>
    </div>
    </div>
        );
     }
    }
