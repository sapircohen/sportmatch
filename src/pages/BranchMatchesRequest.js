import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import {ajaxCall} from '../scripts/ajaxCall';
import swal from 'sweetalert';
import $ from 'jquery';
import RI from '../components/RoundedImages';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export default class BranchMatchesRequest extends Component {
    state={
        BrnachCode: JSON.parse(localStorage["userDetails"]).BranchCode,
        TrainerData:[],
    }

    componentDidMount() {
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Trainer", "", this.successGetTrainer, this.errorGetTrainer);
        $("#pForm").submit(this.f1);
      }

      f1=()=>{
          return false;
      }

      successGetTrainer=(data)=> {
        console.log("im in success");
        console.log(data);
        this.setState({TrainerData:data});
    }

    errorGetTrainer=(err)=> {
        console.log(err);
    }


    render() {
        const trainerlist = this.state.TrainerData.map(trainer =>
            <div class="TrainerFrame">
            <p>שם פרטי: {trainer.FirstName}</p> 

            </div>
                       
             ) 

        return (
                <Form id="pForm" style={{textAlign:'right'}} dir="rtl">
                {trainerlist}
                <h3>12334</h3>
                </Form>

        )
    }
}
