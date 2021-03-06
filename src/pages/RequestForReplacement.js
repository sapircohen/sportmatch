import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import swal from 'sweetalert';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import {ajaxCall} from '../scripts/ajaxCall';
import $ from 'jquery';
import RangeSlider from 'react-bootstrap-range-slider';


export default class RequestForReplacement extends Component {
    state={
        PublishDateTime: new Date().toISOString(),
        ContactName:'',
        BrnachCode: JSON.parse(localStorage["userDetails"]).BranchCode,
        ClassTypeCode:'',
        City:'',
        FromHour:'',
        ToHour:'',
        ReplacementDate:'',
        ClassDescription:'',
        Comments:'',
        DifficultyLevelCode:'',
        MaxPrice:0,
        LanguageCode:'',
        PopulationCode:'',
        DataQual:[],
        DataDiffLevel:[],
        DataLang:[],
        DataPop:[]
    }

    componentDidMount() {
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Qualification', "", this.successGetQualification, this.errorGetQualification);
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/DifficultyLevel', "", this.successGetDifficultyLevel, this.errorGetDifficultyLevel);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Language", "", this.successGetLanguage, this.errorGetLanguage);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Population", "", this.successGetPopulation, this.errorGetPopulation);
        $("#pForm").submit(this.f1);
      }

      f1=()=>{
          return false;
      }

      successGetQualification=(data)=> {
        this.setState({DataQual:data});
      }

    errorGetQualification=(err)=> {
        console.log(err);
    }

    successGetDifficultyLevel=(data)=> {
        this.setState({DataDiffLevel:data});
    }

    errorGetDifficultyLevel=(err)=> {
        console.log(err);
    }

    successGetLanguage=(data)=> {
        this.setState({DataLang:data});
    }

    errorGetLanguage=(err)=> {
        console.log(err);
    }

    successGetPopulation=(data)=> {
        this.setState({DataPop:data});
    }

    errorGetPopulation=(err)=> {
        console.log(err);
    }

    validate=()=>{
        if(this.validateHours() && this.validateReplacementDate())
            this.Request();
    }


    Request=()=> {
        const {PublishDateTime, ContactName, BrnachCode, ClassTypeCode, FromHour, ToHour, ReplacementDate, ClassDescription, Comments, DifficultyLevelCode, MaxPrice, LanguageCode, PopulationCode} = this.state;

        let request = {
            PublishDateTime: PublishDateTime,
            ContactName: ContactName,
            BranchCode: BrnachCode, 
            ClassTypeCode: ClassTypeCode,
            FromHour: FromHour,
            ToHour: ToHour,
            ReplacementDate: ReplacementDate,
            ClassDescription: ClassDescription,
            Comments: Comments,
            DifficultyLevelCode: DifficultyLevelCode,
            MaxPrice: MaxPrice,
            LanguageCode: LanguageCode,
            PopulationCode: PopulationCode
        }
        console.log(request);
        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/RequestForReplacement", JSON.stringify(request), this.successPostRequest, this.errorPostRequest);
    }

    successPostRequest=(data)=> {
        swal("good job");
        this.props.history.push("/BranchMatches");
    }

    errorPostRequest=(err)=> {
        console.log(err);
    }

    validateHours=()=>{
        if(this.state.FromHour<this.state.ToHour)
        return true;
        else
    {
        swal("שעות ההחלפה אינן תקינות");
        return false;
    }
        
    }

    validateReplacementDate=()=>{
        let todayDate = new Date().toISOString().substr(0, 10);
        if(this.state.ReplacementDate>=todayDate)
        return true;
        else
        {
            swal("תאריך ההחלפה לא תקין");
            return false;
        } 
    }

    render() {
        const qualList = this.state.DataQual.map(val => <button onClick={(e)=>this.setState({ClassTypeCode:val.TypeCode})} style={{margin:'2px', backgroundColor: this.state.ClassTypeCode===(val.TypeCode) ? 'lightblue': ''}} value = {val.TypeCode} key = {val.TypeCode}>{val.TypeName} </button> )
        const diffList = this.state.DataDiffLevel.map(val => <button onClick={(e)=>this.setState({DifficultyLevelCode:val.LevelCode})} style={{margin:'2px', backgroundColor: this.state.DifficultyLevelCode===(val.LevelCode) ? 'lightblue': ''}} value = {val.LevelCode} key = {val.LevelCode}>{val.LevelName} </button> )
        const langList = this.state.DataLang.map(val => <button onClick={(e)=>this.setState({LanguageCode:val.LanCode})} style={{margin:'2px', backgroundColor: this.state.LanguageCode===(val.LanCode) ? 'lightblue': ''}} value = {val.LanCode} key = {val.LanCode}>{val.LanName} </button> )
        const popList = this.state.DataPop.map(val => <button onClick={(e)=>this.setState({PopulationCode:val.Code})} style={{margin:'2px', backgroundColor: this.state.PopulationCode===(val.Code) ? 'lightblue': ''}} value = {val.Code} key = {val.Code}>{val.PName} </button> )
        return (
                <Form id="pForm" style={{textAlign:'right'}} dir="rtl" >
                <h3>הודעת החלפה</h3>

                <Input req={true} setInput={(e)=>this.setState({ContactName:e.target.value})} title="שם איש קשר" type="text" placeholder="הכנס שם איש קשר" />
                
                <div>
                <p>סוג שיעור</p>
                {qualList}
                </div>

                <Input req={true} setInput={(e)=>this.setState({FromHour:e.target.value})} title="משעה" type="time"  min="00:00" max="23:00" />

                <Input req={true} setInput={(e)=>this.setState({ToHour:e.target.value})} title="עד שעה" type="time"  min="00:00" max="23:00" />

                <Input req={true} setInput={(e)=>this.setState({ReplacementDate:e.target.value})} title="תאריך ההחלפה" type="date" />

                <Input req={true} setInput={(e)=>this.setState({ClassDescription:e.target.value})} title="תיאור השיעור" type="text" placeholder="הכנס תיאור שיעור" />

                <Input setInput={(e)=>this.setState({Comments:e.target.value})} title="הערות נוספות" type="text" placeholder="הכנס הערות" />

                <div>
                <p>רמת קושי</p>
                {diffList}
                </div>

                <Input setInput={(e)=>this.setState({MaxPrice:e.target.value})} title="מחיר לשעה" type="number" placeholder="הכנס מחיר לשעה" min="0"/>

                <div>
                <p>שפת השיעור</p>
                {langList}
                </div>

                <div>
                <p>אוכלוסיית יעד</p>
                {popList}
                </div><br/>



                <button type="submit" className="btn btn-primary btn-block" onClick={this.validate}>מצא מאמנים מתאימים</button>
                </Form>
        )
    }
}
{/* <div>
                <label>שכר לשעה</label>
                <RangeSlider
                value={this.state.MaxPrice.value}
                onChange={(e)=>this.setState({MaxPrice:e.target.value})}
                />
                </div> */}