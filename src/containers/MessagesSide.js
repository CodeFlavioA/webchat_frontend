import React, { Component, createRef } from 'react'

import Header from '../components/headerPrivateChat'
import Message from '../components/Message'
import FormMessage from '../components/InputMessageComponent'
import { connect } from 'react-redux';
import Axios from 'axios';
import HOST from '../apis/host'


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

        Axios.post(HOST + '/api/chat/message/send/',form).then(result=>result)
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
                    urlImage={i.avatar}
                />
            )
        }
        let name,group,members; 
        group = false; 
        for(let i = 0; i < this.props.headers.length; i++){
            let item = this.props.headers[i];   
            if(parseInt(item.id_header,10) === parseInt(this.props.chatActive,10)){
                if(item.group){
                    group = true; 
                    members = item.recipents; 
                }
                name = item.name; 
                break; 
            }
        }
     
        const selectChat = (
            <div className="empty_chat">
                <div className="text">
                    Choose a conversaction or start one
                </div>
            </div>
        )
        return(
            <div  className="container-chat-conversacion">
                <Header
                name={name}
                users={this.props.users}
                members = {members} 
                group = {group}
                />
                <div ref={this.refDivChat} className="container-messages">
                   {this.props.chatActive === 0 ? selectChat:Messages}
                </div>
                <FormMessage 
                newMessageRef={this.newMessage} 
                onSend={this.sendHandleButton.bind(this)}
                typing= {this.props.chatActive === 0}
                />
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
        users: store.nameUsers, 
    }
}

export default connect(mapToProps)(MessageSide); 