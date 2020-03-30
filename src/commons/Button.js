import React from 'react';
import {Button} from 'react-bootstrap';

const ButtonF = (props)=>{
    return(
        <Button onClick={props.login} variant="outline-info">{props.text}</Button>
    );
}

export default ButtonF;