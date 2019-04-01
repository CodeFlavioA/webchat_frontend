import React from 'react'

const HeaderPrivateChat = (props)=>{
    let members = null; 
    if(props.group){
        members = props.members.map(item=>item + ', ');
    }
    let input_name = (
        <div className="input-edit-name">
            <input ref={props.refName} type="text" defaultValue={props.name} />
        </div>
    )

    let button_edit = (
        <div className="button-edit-name">
            <button onClick={props.onEdit} >
                <i class="fas fa-edit    "></i>
            </button>
        </div>
    )
    return(
        <div className="header-message-side">
            <div className="header-text">
                <h4>{props.name}</h4>
                <h5> <small>
                    {members}
                </small> </h5>
            </div>
            <div className="buttons-actions-group">
                {props.group ? button_edit:null}
                {(props.editing && props.group) ? input_name:null}
            </div>
        </div>
    )
}

export default HeaderPrivateChat; 