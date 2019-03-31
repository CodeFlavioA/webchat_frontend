import React, { Component } from 'react'
import HeaderMessage from '../components/HeaderMessage'
import {connect} from 'react-redux'
import '../apis/connectApi'
import Axios from "axios";
import Pusher from 'pusher-js'


class ChatContainer extends Component {
    constructor(props){
        super(props); 
        this.getMessages = this.getMessages.bind(this)
        this.state={
            'header_active':null, 
            'query':'',
        }
    }

    onClickHeader = (evt)=>{
        evt.preventDefault(); 
        let id_header = (evt.target.getAttribute('data-id')); 
        this.setState({
            'header_active':id_header, 
        })
        console.log(evt.target)
        let token = this.props.token;
        this.props.dispatch({
            type: 'NEW_CHAT_ACTIVE',
            payload: id_header, 
        })
        this.getMessages(token, id_header)
    }
    componentDidMount = () => {
        Pusher.logToConsole = true;
        var pusher = new Pusher('afd3371eb6832adcdd07', {
        cluster: 'us2',
        forceTLS: true
        });

       
        let {token,email} = this.props; 
        let channel = pusher.subscribe(email);
        
        channel.bind('my-event', async (data) => {
            let headerActive = this.props.chatActive; 
            console.log(data.id_header, headerActive)
            if(data.type==='NEW_MESSAGE'){
                if(data.id_header === headerActive){
                    this.getMessages(token,data.id_header);
                }else{
                    alert('Tienes un nuevo mensaje de: ' + data.name); 
                }
                this.getHeaders(token);
            }else if(data.type ==='NEW_HEADER'){
                await this.getHeaders(this.props.token)
            }

        });
    }
    getMessages = (token,header)=>{
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
    
        Axios.post('http://localhost:8000/api/chat/headers/', form)
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
    filter(val){
        return this.props.headers.filter((item)=>{
            if(item.name.toLowerCase().includes(val.toLowerCase())){
                return true; 
            }
            return false; 
        })
    }

    queryChar = (evt) => {
        let string = evt.target.value; 
        this.setState({
            query: string, 
        })
    }
      
    render = () => {
        return(
            <div className="div-users-and-input">
                <div className="search-user-component">
                    <input type="text" 
                    // ref={props.refInput} 
                    placeholder='Search chats'name="" 
                    onChange={this.queryChar} id="input-search-user"
                    />
                </div>
                <div className="list-chat">
                    {this.filter(this.state.query).map(item=>{
                        return(
                            <HeaderMessage 
                            key={item.id_header} 
                            name={item.name} 
                            id_header={item.id_header} 
                            message={item.last_message}
                            click={this.onClickHeader.bind(this)}
                            urlImage={item.avatar}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}

const mapToProps = (state)=>{
    return{
        'token': state.user.token, 
        'email': state.user.email, 
        'headers': state.headers, 
        'chatActive': parseInt(state.chatActive),
    }
}

export default connect(mapToProps)(ChatContainer); 