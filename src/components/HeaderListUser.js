import React from 'react'

const HeaderListUser = (props)=>{
    return (
        <div className="header-userlist">
        <div className="profile-data">
            <img src={props.avatar} alt=""/>
            <p>{props.name}</p>
        </div>
            
        </div>
    );
}

export default HeaderListUser; 