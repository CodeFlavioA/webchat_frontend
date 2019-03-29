import React from 'react'
import { connect } from 'react-redux';

const HeaderProfileList = (props)=>{
    return(
        <div className="header-profile-list">
            <div className="big-img-profile">
                <img src="https://lorempixel.com/200/200" alt="" srcset=""/>
            </div>
            <div className="fullname-text">
                <h4>{props.name} </h4>
                <p>Status: This is my status</p>
            </div>
        </div>
    );
}

const mapToProps = (store) =>{
    return{
        name: store.user.name, 
    }
}
export default connect(mapToProps)(HeaderProfileList); 