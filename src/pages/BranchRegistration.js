import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import {ajaxCall} from '../scripts/ajaxCall';
import swal from 'sweetalert';
import $ from 'jquery';
import RI from '../components/RoundedImages';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import ReactCardFlip from 'react-card-flip';


export default class BranchRegistration extends Component {
    state={
        Email:'',
        Password:'',
        Company:'',
        BranchName:'',
        City:'',
        Address:'',
        PhoneNum:'',
        Description:'',
        BranchCodeFromDB:'',
        Links:[],
        DataArea:[],
        DataCompany:[],
        DataLinks: [],
        numOfParameters : 0,
        parametersCode : [],
        isFlippedLink:false,
    }


    componentDidMount() {
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Area', "", this.successGetAreas, this.errorGetAreas);
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Company', "", this.successGetCompany, this.errorGetCompany);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Link", "", this.successGetLink, this.errorGetLink);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Parameter", "", this.successGetParameters, this.errorGetParameters);
        $("#pForm").submit(this.f1);
      }

      f1=()=>{
          return false;
      }

       successGetAreas=(data)=> {
        console.log("im in success");
        this.setState({DataArea:data});
    }

     errorGetAreas=(err)=> {
        console.log(err);
    }

     successGetCompany=(data)=> {
        console.log("im in success");
        this.setState({DataCompany:data});
    }

     errorGetCompany=(err)=> {
        console.log(err);
    }

    successGetLink=(data)=>{
        console.log(data);
        this.setState({DataLinks:data});
    }

    errorGetLink=(err)=>{
        console.log(err);
    }

    successGetParameters=(data)=>{
        this.setState({numOfParameters:data.length});
        let param=[];
            for (let i = 0; i < this.state.numOfParameters; i++) {
                param[i] = data[i].Pcode;
            }
        this.setState({parametersCode:param})
    }

    errorGetParameters=(err)=>{
        console.log(err);
    }

    validate = ()=>{
        const { Email, Password } = this.state;
        let e = this.validateEmail(Email);
        let p = this.validatePassword(Password);
        if(!e)
            swal("הוכנס אימייל לא חוקי");
        if(!p)
            swal ("אורך הסיסמה המינימלי הוא 6 תווים")    
        if(e === true && p === true && this.validateDetails()=== true)
        ajaxCall('Get', 'http://proj.ruppin.ac.il/igroup7/proj/api/User/getUser', "email=" + Email, this.successGetUser, this.errorGetUser);
    }

    validateEmail(Email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(Email);
      }

    validatePassword=(Password)=>{
        if (Password.length >=6)
        return true;
        else
        return false;
    }

    validateDetails=()=>
    {
        if(this.state.Company ==='')
            {
                swal('בחר חברה');
                return false
            }

        if(this.state.BranchName ==='')
        {
            swal('הזן שם סניף');
            return false
        }

        if(this.state.City ==='')
        {
            swal('בחר עיר');
            return false
        }

        if(this.state.Address ==='')
        {
            swal('הזן כתובת');
            return false
        }

        if(this.state.PhoneNum ==='')
        {
            swal('הזן מספר טלפון');
            return false
        }
        else return true;
        
    }

    successGetUser=(data)=>{
        console.log(data);
        console.log("success");
        if (data.length > 0)
            alert("האימייל כבר קיים במערכת");
        else
            this.SignInBranch();
    }

    errorGetUser=(err)=>{
        console.log(err);
    }


     SignInBranch=()=> {
        const {Email, Password, Company, BranchName, City, Address, PhoneNum, Description} = this.state;
        let branch = {
            Name: BranchName,
            Address: Address,
            PhoneNo: PhoneNum,
            Email: Email,
            Description: Description,
            CompanyNo: Company,
            Password: Password,
            AreaCode: City
        }
        console.log(branch);
        ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/Branch", JSON.stringify(branch), this.successSignInBranch, this.errorSignInBranch);
    }

     successSignInBranch=(data)=> {
         swal("success");
        console.log(data);
        this.setState({BranchCodeFromDB : data.BranchCode})
        localStorage["userDetails"] = JSON.stringify(data);
        this.insertBranchParameters();

    }

     errorSignInBranch=(err)=> {
        console.log(err);
    }

     insertBranchParameters=()=> {
        let parameterWeight = 100 / this.state.numOfParameters;
        for (var j = 0; j <this.state.numOfParameters; j++) {
            let branchParameter = {
                BranchCode: this.state.BranchCodeFromDB,
                ParameterCode: this.state.parametersCode[j],
                ParameterWeight: parameterWeight
            }
            console.log(JSON.stringify(branchParameter));
            ajaxCall("POST", "http://proj.ruppin.ac.il/igroup7/proj/api/BranchParameter", JSON.stringify(branchParameter), this.successInsertBranchParameter, this.errorInsertBranchParameter);

        }
    }

    successInsertBranchParameter=(data)=> {
        console.log("success Insert Branch Parameters");
        this.props.history.push("/BranchIndex");
    }
    errorInsertBranchParameter=(err)=> {
        console.log("error Insert Branch Parameters");
    }

    render() {
        //const areasList = this.state.DataArea.map(area => <option key = {area.AreaCode} value = {area.AreaCode}>{area.AreaName} </option> ) 
        const areasList = this.state.DataArea.map(val => <button onClick={(e)=>this.setState({City:val.AreaCode})} style={{margin:'2px', backgroundColor: this.state.City===(val.AreaCode) ? 'lightblue': ''}} value = {val.AreaCode} key = {val.AreaCode}>{val.AreaName} </button> )
        //const copmaniesList = this.state.DataCompany.map(company => <option key = {company.CompanyNo} value = {company.CompanyNo}>{company.Name} </option> )
        const copmaniesList = this.state.DataCompany.map(val => <button onClick={(e)=>this.setState({Company:val.CompanyNo})} style={{margin:'2px', backgroundColor: this.state.Company===(val.CompanyNo) ? 'lightblue': ''}} value = {val.CompanyNo} key = {val.CompanyNo}>{val.Name} </button> )
        const linksList = this.state.DataLinks.map(link => <RI key={link.LinkCode} action={(e)=>this.setState({isFlippedLink:true})} image={`images/${link.LinkName}.png`} width="60" height="60" size="8" color="#66A5CC"/>)

        return (
            <div>
                <Form id="pForm" style={{textAlign:'right'}} dir="rtl">
                <h3> הרשמת מועדון כושר</h3>
                <Input setInput={(e)=>this.setState({Email:e.target.value})} title="אימייל" type="text" placeholder="הכנס שם משתמש"/>

                <Input setInput={(e)=>this.setState({Password:e.target.value})} title="סיסמה" type="password" placeholder="הכנס סיסמה" />

            <div>
            <p>בחר עיר</p>
            {areasList}
            </div>
                

                <Input setInput={(e)=>this.setState({BranchName:e.target.value})} title="שם הסניף" type="text" className="form-control" placeholder="הכנס שם סניף" />
                
            <div>
                <p>בחר חברה</p>
                {copmaniesList}
            </div>
                
                
                <Input setInput={(e)=>this.setState({Address:e.target.value})} title="כתובת הסניף" type="text" className="form-control" placeholder="הכנס כתובת סניף" />
               
                <Input  setInput={(e)=>this.setState({PhoneNum:e.target.value})} title="מספר טלפון" type="text" className="form-control" placeholder="הכנס מספר טלפון" />
                
                <Input setInput={(e)=>this.setState({Description:e.target.value})} title="תיאור" type="text" className="form-control" placeholder="הכנס תיאור" />
                
                <label>קישורים</label><br/>
                <ReactCardFlip isFlipped={this.state.isFlippedLink}>
                <div>
                    <Form.Row>
                    {linksList}
                </Form.Row>
                </div>
                <div>
                    <Input type="text" placeholder="הכנס כתובת" />
                    <ButtonF  className="btn btn-primary btn-block" action={(e)=>this.setState({isFlippedLink:false})} text="אישור"/><br/>
                </div>

                </ReactCardFlip><br/>
               
                <button type="submit" className="btn btn-primary btn-block" onClick={this.validate}>סיום</button>
                </Form>
                </div>
        )
    }
}
