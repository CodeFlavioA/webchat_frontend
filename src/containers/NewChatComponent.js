import React, { Component } from 'react'
import HeaderMessage from '../components/HeaderMessage';
import {connect} from 'react-redux'

class NewChatComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            'searchList':this.props.users
        }
    }
    filter = (evt)=>{
        let query = evt.target.value; 
        this.setState({
            'searchList': this.props.users.filter((item)=>{
                if(item.name.toLowerCase().includes(query.toLowerCase())){
                    return true; 
                }
            })
        })
    }

    sendNewChat = (token, id)=>{
        let Form = new FormData(); 
        Form.append('token',token); 
    }

    newHeaderChat = (e)=>{
        e.preventDefault(); 
        let id_user = (e.target.getAttribute('data-id')); 
        if(id_user !== null){
            console.log(id_user)
            this.sendNewChat(this.props.token,id_user); 
        }
        
    }

    render(){
        const closeBox = (evt)=>{
            this.props.dispatch({
                type:'LIST_USERS_ACTIVE'
            })
        }
        return(
        <div className="box-for-users">
            <div className="search-users">
                <input type="text" name="" onChange={this.filter} placeholder='Search a user' id=""/>
                <div className="close">
                    <input type="button" onClick={closeBox} value='x'/>
                </div>
            </div>
            <div className="list-for-users">
                {this.state.searchList.map((item)=>
                    <HeaderMessage
                        key={item.id}
                        id_header={item.id}
                        click={this.newHeaderChat.bind(this)}
                        active={false}
                        extraClass='no-padding no-margin'
                        name={item.name}
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