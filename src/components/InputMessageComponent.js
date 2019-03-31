import React from 'react'
import ButtonSend from '../components/ButtonDefault'

const InputMessageComponent = (props) =>{

    return(
        <div className="container-form-message">
        <div className="textarea-message">
            <textarea name="" ref={props.newMessageRef} readOnly={props.typing} id="" placeholder='Type your message...'></textarea>
        </div>
        {/* <input type="text" name="" id="" placeholder='Type your message...'/> */}
        <div className="button-send-message">
            <ButtonSend value='Send' action={props.onSend} />
        </div>
        </div>
    );     

}

export default InputMessageComponent; 