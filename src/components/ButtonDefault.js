import React from 'react'

const ButtonDefault = (props)=>{
    return(
        <div className="button-default">
            <input type="button" value={props.value} onClick={props.action}/>
        </div>
    );
}

export default ButtonDefault; 