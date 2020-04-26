import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import swal from 'sweetalert';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {ajaxCall} from '../scripts/ajaxCall';
import $ from 'jquery';
import RangeSlider from 'react-bootstrap-range-slider';


export default class TrainerQualification extends Component {
    state={
        BranchCode: JSON.parse(localStorage["userDetails"]).TrainerCode,
        numOfQualification: 1,
        DataQual:[],
        DataPop:[],


    }

    componentDidMount() {
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Qualification", "", this.successGetQualification, this.errorGetQualification);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Population", "", this.successGetPopulation, this.errorGetPopulation);
        $("#pForm").submit(this.f1);
      }

      f1=()=>{
          return false;
      }
  
       successGetQualification=(data)=> {
        this.setState({DataQual:data});
        let arrNames = "<option value =''>בחר סוג שיעור</option>";
        for (let k in data) {
            arrNames += `<option value = ${data[k].TypeCode}>${data[k].TypeName} </option>`;
        }
        $(`#Qualification${this.state.numOfQualification}`).append(arrNames);
    }

     errorGetQualification=(err)=> {
        console.log(err);
    }
     successGetPopulation=(data)=> {
         this.setState({DataPop:data});
        let arrNames = "<option value =''>בחר אוכלוסיית יעד</option>";
        for (let k in data) {
            arrNames += `<option value = ${data[k].Code}>${data[k].PName} </option>`;
        }
        $(`#pop${this.state.numOfQualification}`).append(arrNames);
    }

     errorGetPopulation=(err)=> {
        console.log(err);
    }


     AddQualification=()=> {
         let num = this.state.numOfQualification;
         num ++;
         this.setState({numOfQualification:num});
         let arrQualification = `<div class="solid">
            </br>
            <div class="form-group" align="right">
                <select id="Qualification${num}" required></select>
                <label for="exampleInputEmail1"> סוג שיעור </label>
            </div> 
            <div class="form-group" align="right">
                <select id="pop${num}" required></select>
                <label for="exampleInputEmail1"> אוכלוסיית יעד </label>
            </div>
            <div class="form-group" align="right">
                <input type="date" id="bdate${num}" name="bdate" style="direction: rtl;">
                <label for="exampleInputEmail1"> החל מתאריך </label>
            </div>
            <div class="form-group" align="right">
                <input type="file" id="doc${num}" size="50">
                <label for="exampleInputEmail1"> הוסף תעודה </label>
            </div>
            </br>

        </div>`;
        $('#add').append(arrQualification);
    }

     InsertQualification=()=> {
        let arrQualifictionToInsert = [];
        let qualificationTypeCode;
        let fromDate;
        let populationCode;
        let docPath;
        let trainerCode = this.state.trainerCode;
        let num = this.state.numOfQualification;
        for (let i = 0; i < num; i++) {
            qualificationTypeCode = document.getElementById(`Qualification${num}`).value;
            fromDate = new Date(document.getElementById(`bdate${num}`).value).toISOString().substr(0, 10);
            populationCode = document.getElementById(`pop${num}`).value;
            docPath = document.getElementById(`doc${num}`).value;
            console.log(docPath);
            let qualification = {
                TrainerCode: trainerCode,
                QualificationTypeCode : qualificationTypeCode,
                PopulationCode: populationCode,
                DocumentPath: docPath,
                FromDate: fromDate
               
            }
            console.log(JSON.stringify(qualification));
            arrQualifictionToInsert.push(qualification);       
        }
        console.log(JSON.stringify(arrQualifictionToInsert));

        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/TrainerQualification", JSON.stringify(arrQualifictionToInsert), this.successInsertQualification, this.errorInsertQualification);

    }

     successInsertQualification=(data)=> {
        swal("הרשמה בוצעה בהצלחה");
        //window.location.href = 'IndexTrainer.html';

    }
     errorInsertQualification=(err)=> {
        console.log(err);
    }

    render() {
        return (
                <Form id="PForm" style={{textAlign:'right'}} dir="rtl">
                    <div>
                    <br/>

                    <div>
                    <select id="Qualification1" required></select>
                    <p> סוג שיעור </p>
                    </div>
                    </div>
                    <select id="pop1" required></select>
                    <p> אוכלוסיית יעד </p>    
                    <div>
                    <div>
                    <input type="date" id="bdate1" name="bdate" style="direction: rtl;"/>
                    <p > החל מתאריך </p>
                    </div>
                    <div>
                    <input type="file" id="doc1" size="50"/>
                    <p> הוסף תעודה </p>
                    </div>               
                    </div>

                    <div id="add">

                    </div>
            <ButtonF type="submit" id="submit" action={this.InsertQualification()} className="btn btn-primary" text="הבא"/>
            <ButtonF type="button" id="add" action={this.AddQualification()} className="btn btn-primary" text="הוסף הכשרה"/> 
            </Form>
        )
    }
}
