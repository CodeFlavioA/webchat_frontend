import React, { Component } from 'react';
import ChatApp from './containers/ChatApp'
import UsersSide from './containers/usersSide'
import MessageSide from './containers/MessagesSide'
import Profile from './containers/ProfileConteiner'
import LoginComponent from './components/loginComponent'; 
import { connect } from 'react-redux';
import './assets/chat.css'
import './App.css';
import axios from 'axios'; 

class App extends Component {
  
  constructor(props){
    super(props);
    this._emailLogin =  React.createRef()
    this._passwordLogin =  React.createRef()
  }

  chatApp = (
    <ChatApp>
      <UsersSide/>
      <MessageSide/>
      <Profile/>
    </ChatApp>
  );
  Login = (e,p) =>{
   let email = e.value; 
   let password = p.value; 

    let form = new FormData(); 
    form.append('email', email); 
    form.append('password',password); 

    axios.post('http://127.0.0.1:8000/api/user/login',form)
          .then(result =>result).then((json)=>{
            if(json.data.success){
              let user = {
                name: json.data.data.name, 
                token:json.data.data.auth_token, 
                email: json.data.data.email, 
                id_server: json.data.data.id, 
                avatar: json.data.data.avatar,
              }
              let payload = {
                type: 'USR_LOGGED',
                payload: {
                  isLogged: true, 
                  user: user, 
                }
              }
              this.props.dispatch(payload); 
            }else{
              alert('Credenciales incorrectas')
            }
          })
  }
  LoginComponent = (
    <LoginComponent
        onSubmit={this.Login.bind(this)}
      />
  );

  render = ()=> {
    let log = this.props.isLogged
    return log ? this.chatApp:this.LoginComponent;
  }

}
const mapToProps = (state)=>{
  return{
    ...state, 
  }
}
export default connect(mapToProps)(App);