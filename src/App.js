import React, { Component } from 'react';
import ChatApp from './containers/ChatApp'
import UsersSide from './containers/usersSide'
import MessageSide from './containers/MessagesSide'
import Profile from './containers/ProfileContainer'
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
    this.state = {
      'login':true, 
    }
  }

  chatApp = (
    <ChatApp>
      <UsersSide/>
      <MessageSide/>
      <Profile/>
    </ChatApp>
  );
  Register =(nameInput , emailInput, passInput)=>{
    let name = nameInput.value; 
    let email = emailInput.value; 
    let pass = passInput.value; 
    console.log(name,email,pass); 

    let Form = new FormData() ;
    Form.append('name',name); 
    Form.append('email',email); 
    Form.append('password',pass); 

    axios.post('http://127.0.0.1:8000/api/user/reg',Form).then(r=>r)
    .then(json=>{
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
      }
    })
  } 
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
  toggleLogReg = () =>{
    this.setState({
      login: !this.state.login
    })
  }
  
  LoginComponent = () => (
    <LoginComponent
        onSubmit={this.Login.bind(this)}
        registerClick={this.toggleLogReg.bind(this)}
        registerSubmit = {this.Register.bind(this)}
        toggle = {this.state.login}
      />
  );

  render = ()=> {
    let log = this.props.isLogged
    return log ? this.chatApp:this.LoginComponent();
  }

}
const mapToProps = (state)=>{
  return{
    ...state,
  }
}
export default connect(mapToProps)(App);