import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Input from '../components/Input';
import ButtonF from '../components/Button';
import {ajaxCall} from '../scripts/ajaxCall';
import swal from 'sweetalert';
import $ from 'jquery';
import RI from '../components/RoundedImages';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


export default class BranchRegistration extends Component {
    state={
        Email:'a',
        Password:'a',
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
        DataLinks: []
    }


    componentDidMount() {
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Area', "", this.successGetAreas, this.errorGetAreas);
        ajaxCall("GET", 'http://proj.ruppin.ac.il/igroup7/proj/api/Company', "", this.successGetCompany, this.errorGetCompany);
        ajaxCall("GET", "http://proj.ruppin.ac.il/igroup7/proj/api/Link", "", this.successGetLink, this.errorGetLink);
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

    validate = ()=>{
        const { Email, Password } = this.state;
        let e = this.validateEmail(Email);
        let p = this.validatePassword(Password);
        if(!e)
            swal("הוכנס אימייל לא חוקי");
        if(!p)
            swal ("אורך הסיסמה המינימלי הוא 6 תווים")    
        if(e==true &&p==true)
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
        
        //insertBranchLinks();

    }

     errorSignInBranch=(err)=> {
        console.log(err);
    }

    render() {
        const areasList = this.state.DataArea.map(area => <option key = {area.AreaCode} value = {area.AreaCode}>{area.AreaName} </option> ) 
        const copmaniesList = this.state.DataCompany.map(company => <option key = {company.CompanyNo} value = {company.CompanyNo}>{company.Name} </option> )
        const linksList = this.state.DataLinks.map(link =>
            <div>
             <RI key={link.LinkCode} image={`images/${link.LinkName}.png`} width="40" height="40" size="8"/>
             <Input req={true} setInput={(e)=>this.setState({Email:e.target.value})} type="text" placeholder="הכנס קישור"/>
             </div>
             )
        return (
            <div>
                <Form id="pForm" style={{textAlign:'right'}} dir="rtl">
                <h3> הרשמת מועדון כושר</h3>
                <Input req={true} setInput={(e)=>this.setState({Email:e.target.value})} title="אימייל" type="text" placeholder="הכנס שם משתמש"/>

                <Input req={true} setInput={(e)=>this.setState({Password:e.target.value})} title="סיסמה" type="password" placeholder="הכנס סיסמה" />

                <select required id='areacode' onChange={(e)=>this.setState({City:e.target.value})}>
                <option value =''>בחר עיר</option>
                {areasList}
                </select>

                <Input setInput={(e)=>this.setState({BranchName:e.target.value})} title="שם הסניף" type="text" className="form-control" placeholder="הכנס שם סניף" />
                
                <select required id='companyno' onChange={(e)=>this.setState({Company:e.target.value})}>
                <option value =''>בחר חברה</option>
                {copmaniesList}
                </select>
                
                <Input req={true} setInput={(e)=>this.setState({Address:e.target.value})} title="כתובת הסניף" type="text" className="form-control" placeholder="הכנס כתובת סניף" />
               
                <Input req={true} setInput={(e)=>this.setState({PhoneNum:e.target.value})} title="מספר טלפון" type="text" className="form-control" placeholder="הכנס מספר טלפון" />
                
                <Input setInput={(e)=>this.setState({Description:e.target.value})} title="תיאור" type="text" className="form-control" placeholder="הכנס תיאור" />
                
                <label>קישורים</label>
                <Form.Row>
                {linksList}
                </Form.Row><br/>
               
                <button type="submit" className="btn btn-primary btn-block" onClick={this.validate}>סיום</button>
                </Form>
                </div>
        )
    }
}
