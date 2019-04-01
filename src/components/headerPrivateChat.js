import React from 'react'

const HeaderPrivateChat = (props)=>{
    let members = null; 
    if(props.group){
        members = props.members.map(item=>item + ', ');
    }
    return(
        <div className="header-message-side">
            <div className="header-text">
                <h4>{props.name}</h4>
                <h5> <small>
                    {members}
                </small> </h5>

            </div>
        </div>
    )
}

export default HeaderPrivateChat; 