import React from 'react';
import {Form} from 'react-bootstrap';
import Input from '../commons/Input';
import ButtonF from '../commons/Button';

export default class FormOne extends React.Component{
    state={
        userName:'',
        password:''
    }
    validate = ()=>{
        alert("good")
    }
    render(){
        return(
            <Form style={{textAlign:'right'}} dir="rtl">
                <Input setInput={(e)=>this.setState({userName:e.target.value})} title="שם משתמש" type="text" placeholder="הכנס שם משתמש" />
                <Input setInput={(e)=>this.setState({password:e.target.value})} title="סיסמה" type="password" placeholder="הכנס סיסמה.." />

                <ButtonF login={this.validate} text="התחברות"/>
            </Form>
        );
    }
}