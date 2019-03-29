import React from 'react'

const FloatingButton = (props)=>{
    return(
        <div className="button-floating" onClick={props.action}>
            <p>
                {props.value}
            </p>
        </div>
    )
}

export default FloatingButton; 

