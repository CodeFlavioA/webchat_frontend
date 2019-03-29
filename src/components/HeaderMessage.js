import React from 'react'

const HeaderMessage = (props) => {
    return(
        <div className={'message-header ' + props.active+ ' '+ props.extraClass} data-id={props.id_header} onClick={props.click}>
            <div className="image-m">
                <img src={props.urlImage} alt="" data-id={props.id_header} srcset=""/>
            </div>
            <div className="text-header-message">
                <h4 data-id={props.id_header}>
                    {props.name}
                </h4>
                <p data-id={props.id_header}>{props.message}</p>
            </div>
        </div>
    );
}

export default HeaderMessage; 
