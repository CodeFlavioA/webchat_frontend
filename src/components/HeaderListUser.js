import React from 'react'

const HeaderListUser = (props)=>{
    return (
        <div className="header-userlist">
        <div className="profile-data">
            <img srcset={props.avatar} alt=""/>
            <p>{props.name}</p>
        </div>
            <div className="search-user-component">
                <input type="text" placeholder='Search chats'name="" onChange={props.onchange} id="input-search-user"/>
            </div>
        </div>
    );
}

export default HeaderListUser; 