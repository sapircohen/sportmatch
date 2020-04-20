import React, { Component } from "react";
import {Form} from 'react-bootstrap';
import {ajaxCall} from '../scripts/ajaxCall';
import RI from '../components/RoundedImages';
import swal from 'sweetalert';
import Input from '../components/Input';
import $ from 'jquery';

export default class Login extends Component {
  state={
    email:'',
    password:''
}

componentDidMount() {
    $("#pForm").submit(this.f1);
  }

  f1=()=>{
      return false;
  }

validate = ()=>{
    const { email, password } = this.state;
    console.log(email,password)
    let e = this.validateEmail(email);
    let p = this.validatePassword(password);
    if(!e)
            swal("הוכנס אימייל לא חוקי");
    if(!p)
            swal ("אורך הסיסמה המינימלי הוא 6 תווים")    
    if(e==true &&p==true)
    {
        ajaxCall('Get', 'http://proj.ruppin.ac.il/igroup7/proj/api/User/getUser', "email=" + email, this.successGetUser, this.errorGetUser);
    }       
}

validateEmail=(email)=> {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

validatePassword=(password)=>{
    if (password.length >=6)
    return true;
    else
    return false;
}

handleClick(e) {
    e.preventDefault();
  }

  successGetUser=(data)=>{
    console.log(data);
    console.log("success");
    if (data.length < 1)
        swal("האימייל לא קיים במערכת");
    else
        this.checkPassword(data);
}

errorGetUser=(err)=>{
    console.log(err);
}

 checkPassword=(data)=> {
    const {password } = this.state;
    console.log(password);
    console.log(data[0].Password)
    if (password == data[0].Password)
        this.checkType(data);
    else
        swal("הסיסמה שהוזנה אינה נכונה")
}

 checkType=(data) =>{
    let userDetail = {
        BranchCode: data[0].Code,
        Email: data[0].Email,
        Type: data[0].Type
    }
    localStorage["userDetails"] = JSON.stringify(userDetail);
    if (data[0].Type == 'Branch')
    {
        console.log('Branch'); 
        this.props.history.push("/BranchIndex");
    }
    else
        console.log('Trainer');
}

trainerRegistration=()=>{
    this.props.history.push("/TrainerReg");
}

branchRegistration=()=>{
    this.props.history.push("/BranchReg");
}


    render() {
        return (
            <Form id="pForm" dir="rtl">
                <h3>כניסת מנויים</h3>
                
                <Input req={true} setInput={(e)=>this.setState({email:e.target.value})} title="אימייל" type="text" placeholder="הכנס שם משתמש" />
               
                <Input req={true} setInput={(e)=>this.setState({password:e.target.value})} title="סיסמה" type="password" placeholder="הכנס סיסמה" />
               
                <button type="submit" className="btn btn-primary btn-block" onClick={this.validate} onSubmit={(e)=>this.handleClick}>התחבר</button>
                
                <p className="forgot-password text-right">
                    שכחת <a href="#">סיסמה?</a>
                </p><br/> 

              <div className="row">
                <div className="form-group" style={{float:'right',width: "50%",padding: "5px"}}>
                <RI action={this.trainerRegistration} image={'images/trainer.jpg'}width="120" height="120" size="8"/>
                    <label>הרשם כמאמן</label>
                </div>

                <div className="form-group" style={{float:'right',width: "50%",padding: "5px"}} >
                <RI action={this.branchRegistration} image={'images/gym.jpg'} width="120" height="120" size="8"/>
                    <label>הרשם כמועדון</label>
                </div>
                </div>
                
            </Form>
        );
    }
}