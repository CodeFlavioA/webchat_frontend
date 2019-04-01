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
        this.newName = createRef(); 
        this.state = {
            chatName: '',
            is_editing:false, 
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

    editButton = (evt) =>{
     if(!this.state.is_editing){
         this.setState({
             is_editing: true,
         })
     }else{

        //this click have to send to backend new name 
        let Form = new FormData(); 

        Form.append('token', this.props.token)
        Form.append('id_header', this.props.chatActive)
        Form.append('title',this.newName.current.value)

        Axios.post(HOST + '/api/chat/headers/group/title/', Form).then(r=>r)
        .then(json=>{
            let data = json.data; 
            if(data.success){
                let toReduce = {
                    type: 'UPDATE_HEADER', 
                    payload: data.data, 
                }
                this.props.dispatch(toReduce); 
            }
        })

        this.setState({
            is_editing:false, 
        })
     }
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
                name={name} // Name or title 
                group = {group} //if is group
                members = {members} //Members Group
                refName = {this.newName} 
                editing = {this.state.is_editing} 
                onEdit = {this.editButton} //Action 
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