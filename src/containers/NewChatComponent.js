import React, { Component } from 'react'
import HeaderMessage from '../components/HeaderMessage';
import {connect} from 'react-redux'
import Axios from 'axios';

class NewChatComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchList:this.props.users,
            creatingChat: false, 
            vectorGroup: [],
        }
        
    }
    filter = (evt)=>{
        let query = evt.target.value; 
        this.setState({
            'searchList': this.props.users.filter((item)=>{
                if(item.name.toLowerCase().includes(query.toLowerCase())){
                    return true; 
                }
                return false; 
            })
        })
    }

    sendNewChat = (token, id)=>{
        let Form = new FormData(); 
        Form.append('token',token); 
        Form.append('idUserToTalk',id); 
        Axios.post('http://localhost:8000/api/chat/create/',Form)
        .then(r=>r).then(json=>{
            this.props.dispatch({
                type:'ADD_NEW_HEADER',
                payload:json.data.data
            })
        });
    }

    newHeaderChat = (e)=>{
        e.preventDefault();
        let id_user = (e.target.getAttribute('data-id')); 
        let vectorGroup = this.state.vectorGroup.push(parseInt(id_user));
        if(this.state.creatingChat){
            this.setState({
                ...vectorGroup
            })
            return false; 
        }
        if(id_user !== null){
            this.props.dispatch({
                type:'LIST_USERS_ACTIVE'
            })
            this.sendNewChat(this.props.token,id_user); 
        }
    }

    toggleCreatingChat = (evt) => {
        evt.preventDefault(); 
        this.setState({
            creatingChat: !this.state.creatingChat
        })
        if(this.state.creatingChat){
            alert('Estas creando un chat grupal'); 
        }
    }

    render(){
        const closeBox = (evt)=>{
            if(this.state.creatingChat){
                alert('Se agregaran estas personas a tu grupo: ' + this.state.vectorGroup)
            }
            this.props.dispatch({
                type:'LIST_USERS_ACTIVE'
            })
        }
        const willBeOnGroup = (id) =>{
            return this.state.vectorGroup.includes(id); 
        }
        return(
        <div className="box-for-users">
            <div className="search-users">
                <input type="text" name="" onChange={this.filter} placeholder='Search a user' id=""/>

                <div className="buttons-actions">
                    <button onClick={this.toggleCreatingChat}>
                        <i class="fas fa-users"></i>
                    </button>
                </div>

                <div className="close">
                    <input type="button" onClick={closeBox} value={this.state.creatingChat ? 'Ok':'X'}/>
                </div>
            </div>
            <div className="list-for-users">
                {this.state.searchList.map((item)=>
                    <HeaderMessage
                        key={item.id}
                        mark = {willBeOnGroup(item.id)}
                        id_header={item.id}
                        click={this.newHeaderChat.bind(this)}
                        active={false}
                        extraClass='no-padding no-margin'
                        name={item.name}
                        urlImage={item.avatar}
                    />
                )}
            </div>
        </div>
        )
    }
}

const mapToProps = (store)=>{
    return{
        'users': store.nameUsers, 
        'token': store.user.token, 
    }
}

export default connect(mapToProps)(NewChatComponent); 