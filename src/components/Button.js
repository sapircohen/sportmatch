import React from 'react';
import {Button} from 'react-bootstrap';

const ButtonF = (props)=>{
    return(
        <Button type={props.type} onClick={props.action} variant="outline-info">{props.text}</Button>
    );
}

export default ButtonF;