import React from 'react'
import { connect } from 'react-redux';

const HeaderProfileList = (props)=>{
    return(
        <div className="header-profile-list">
            <div className="big-img-profile">
                <img src={props.avatar} alt="" srcset=""/>
                <div className="input-profile-file">
                <label htmlFor="newProfilePicture">+</label>
                    <input type="file" accept="image/*" name="newPhotos" onChange={props.FileUploaded} id="newProfilePicture"/>
                </div>
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