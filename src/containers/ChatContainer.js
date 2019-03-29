import React, { Component } from 'react'
import HeaderMessage from '../components/HeaderMessage'
import {connect} from 'react-redux'
import axios from 'axios'
import '../apis/connectApi'
import Axios from "axios";


class ChatContainer extends Component {
    constructor(props){
        super(props); 
    }

    onClickHeader = (evt)=>{
        evt.preventDefault(); 
        let id_header = (evt.target.getAttribute('data-id')); 
        console.log(evt.target)
        let token = this.props.token;
        this.props.dispatch({
            type: 'NEW_CHAT_ACTIVE',
            payload: id_header, 
        })
        this.getMessages(token, id_header)
    }
    getMessages(token,header){
        let form = new FormData(); 
        form.append('token',token); 
        form.append('id_header',header); 
        Axios.post('http://localhost:8000/api/chat/user/header/',form).then(r=>r)
        .then((json)=>{
            if(json.data.success){
                this.props.dispatch({
                    type:'NEW_CONVERSATION',
                    payload: json.data.data, 
                })
            }
        })
    }
    async componentWillMount(){
        await this.getHeaders(this.props.token)
    }

    getHeaders = async (token)=>{
        let form = new FormData(); 
        form.append('token', token); 
    
        let data = await Axios.post('http://localhost:8000/api/chat/headers/', form)
        .then((response)=>{
            return response; 
        }).then((json)=>{
            if(json.data.success){
                this.props.dispatch({
                    type:'ADD_HEADERS_MESSAGE',
                    payload: json.data.data,
                })
                return json.data.data; 
            }
        })
    }

    render = () => {
        console.log(this.props.headers); 
        return(
            <div className="list-chat">
                {this.props.headers.map(item=>{
                    return(
                        <HeaderMessage 
                        key={item.id_header} 
                        name={item.name} 
                        id_header={item.id_header} 
                        message={item.last_message}
                        click={this.onClickHeader.bind(this)}
                            urlImage='https://lorempixel.com/40/40'
                        />
                    )
                })}
            </div>
        )
    }
}

const mapToProps = (state)=>{
    return{
        'token': state.user.token, 
        'headers': state.headers, 
    }
}

export default connect(mapToProps)(ChatContainer); 