import React from 'react'
import HeaderProfile from '../components/HeaderListUser'
import Chats from './ChatContainer'
import { connect } from 'react-redux';
import Axios from 'axios';

class usersSide extends React.Component{

    searchUsers = (evt)=>{
        let value = evt.target.value; 
        //First load and search changes on forntend
        this.goForUsers(this.props.token, '*'); 
    }

    goForUsers=(token, value)=>{
        
        
    }
    render(){
        return (
            <div className="container-userlist">
                <HeaderProfile 
                    onchange={this.searchUsers.bind(this)}
                    urlImage='https://lorempixel.com/80/80'
                    name={this.props.name}
                    avatar={this.props.avatar}
                />
                <Chats/>
            </div>
        )
    }

}

const mapToProps = (store)=>{
    return{
        name: store.user.name,
        avatar: store.user.avatar,
        token: store.user.token,
    }
}

export default connect(mapToProps)(usersSide); 
