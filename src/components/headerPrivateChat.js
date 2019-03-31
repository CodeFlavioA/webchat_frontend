import React from 'react'

const HeaderPrivateChat = (props)=>{
    return(
        <div className="header-message-side">
            <div className="header-text">
                <h4>{props.name}</h4>
            </div>
        </div>
    )
}

export default HeaderPrivateChat; 