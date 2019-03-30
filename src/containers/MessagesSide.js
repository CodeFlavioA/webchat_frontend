import React, { Component, createRef } from 'react'

import Header from '../components/headerPrivateChat'
import Message from '../components/Message'
import FormMessage from '../components/InputMessageComponent'
import { connect } from 'react-redux';
import Axios from 'axios';
import ReactDOM from 'react-dom'


class MessageSide extends Component{
    constructor(props){
        super(props); 
        this.refDivChat = createRef()
        this.newMessage = createRef(); 
        this.state = {
            chatName: ''
        }
    }
    

    sendMessage = (id_header, message,token)=>{
        let form = new FormData(); 
        form.append('token',token)
        form.append('idChatHeader',id_header)
        form.append('plainMessage',message)

        Axios.post('http://localhost:8000/api/chat/message/send/',form).then(result=>result)
        .then((json)=>{
            if(json.data.success){
                this.props.dispatch({
                    type:'UPDATE_CONVERSATION',
                    payload: json.data.data,
                })
            }
        })
    }

    sendHandleButton = (evt)=>{
        evt.preventDefault(); 
        let message = (this.newMessage.current.value); 
        this.sendMessage(this.props.chatActive,message,this.props.token); 
        this.newMessage.current.value = ''; 
    }

    render(){
        let Messages; 
        if(this.props.conversation){
            Messages = this.props.conversation.map(i=>
                <Message
                    key = {i.id}
                    message={i.message}
                    own = {i.own}
                    urlImage='https://lorempixel.com/40/40'
                />
            )
        }
        let name; 
        for(let i = 0; i < this.props.headers.length; i++){
            let item = this.props.headers[i];   
            if(parseInt(item.id_header,10) === parseInt(this.props.chatActive,10)){
                name = item.name; 
                break; 
            }
        }
     
        
        return(
            <div  className="container-chat-conversacion">
                <Header
                name={name}
                state='Everything is OK'
                />
                <div ref={this.refDivChat} className="container-messages">
                   {Messages}
                </div>
                <FormMessage newMessageRef={this.newMessage} onSend={this.sendHandleButton.bind(this)}/>
            </div>
        );
    }
}

const mapToProps = (store)=>{
    return{
        headers: store.headers, 
        chatActive: store.chatActive, 
        conversation: store.conversation, 
        token: store.user.token, 
    }
}

export default connect(mapToProps)(MessageSide); 