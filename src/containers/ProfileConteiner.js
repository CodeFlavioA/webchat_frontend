import React from 'react'
import HeaderProfile from '../components/HeaderProfileSide'
import FloatingButton from '../components/FloatingButton'
import BoxUsers from './NewChatComponent'
import {connect} from 'react-redux'
import Axios from 'axios'; 
import { ECONNABORTED } from 'constants';

class ProfileContainer extends React.Component{
    clickToButton = (evt) => {
        evt.preventDefault(); 
        this.props.dispatch({
            type:'LIST_USERS_ACTIVE',
        })
    }

    onClickUsers = (evt)=>{
        evt.preventDefault(); 
    }

    goForAllUsers = (token,query)=>{
        let form = new FormData();
        form.append('token',token); 
        form.append('userLike',query); 
        Axios.post('http://localhost:8000/api/search/users' + '?token=' + this.props.token)
        .then(response=>response).then((json)=>{
            console.log(json.data.data); 
            this.props.dispatch(
                {type: 'NEW_LIST_USERS',payload:json.data.data}
            )
        }); 
    }

    photoHandler = (evt) => {
        evt.preventDefault(); 
        console.log(evt.target.files[0]); 
        if(evt.target.files[0]){
            let Form = new FormData() 
            Form.append('newphoto',evt.target.files[0])
            Form.append('token',this.props.token)

            Axios.post('http://localhost:8000/api/user/profile/image',Form).then(r=>r)
            .then(json=>{
                console.log(json); 
            })
        }
    }

    componentWillMount(){
        this.goForAllUsers(this.props.token,'*');
    }

    render(){
        return(
            <div className="profile-container-side">
                <HeaderProfile 
                    avatar = {this.props.avatar}
                    FileUploaded={this.photoHandler.bind(this)}
                />
                {this.props.list_active ? <BoxUsers/>:<FloatingButton value='+' action={this.clickToButton.bind(this)}/>}
            </div>
        );
    }
}

const mapToProps = (state)=>{
    return{
        'list_active': state.listusers_active,
        'token': state.user.token, 
        'avatar': state.user.avatar, 
    }
}

export default connect(mapToProps)(ProfileContainer); 