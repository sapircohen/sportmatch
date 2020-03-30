import React from 'react';
import {Form} from 'react-bootstrap';

const Input = (props)=>{
    return(
        <Form.Group dir="rtl">
            <Form.Label>{props.title}</Form.Label>
            <Form.Control onChange={props.setInput} type={props.type} placeholder={props.placeholder} />
            <Form.Text className="text-muted">
            {props.extrainfo}
            </Form.Text>
        </Form.Group>
    );
}

export default Input;

