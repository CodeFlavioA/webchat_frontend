import React from 'react'

const HeaderMessage = (props) => {
    let styleSelect = {
        border: '2px solid green',
    }
    return(
        <div className={'message-header ' + props.active+ ' '+ props.extraClass} data-id={props.id_header} onClick={props.click}>
            <div className="image-m">
                <img src={props.urlImage} style={ props.mark ? styleSelect:null } alt="" data-id={props.id_header}/>
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
