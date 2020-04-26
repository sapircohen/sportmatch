import React from 'react';
import RI from "react-rounded-image";

const RoundedImg = (props)=>{
    return(
      <div onClick={props.action}>
        <RI 
        image={props.image}
        roundedColor={props.color}
          imageWidth={props.width}
          imageHeight={props.height}
          roundedSize={props.size}
        />
        </div>
    );
}

export default RoundedImg;

//"#66A5CC"