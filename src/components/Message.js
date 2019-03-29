import React from 'react'

const Message = (props) => {
    let classNamePosition = props.own ? 'from-me':'from-other';
    return(
        <div className={"message " + classNamePosition}>
            <div className="profile-image">
                <img src={props.urlImage} alt=""/>
            </div>
            <div className="message-text">
                <p>{props.message}</p>
            </div>
        </div>
    );
}

export default Message; 