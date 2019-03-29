import React from 'react'
import '../assets/login.css'

const LoginComponent = (props)=>{
    let emailRef, passwordRef
    const handleLogin = e => {
        e.preventDefault(); 
        props.onSubmit(emailRef, passwordRef); 
    }
    return(
        <div className="login-box">
            <div className="header-login">
                <h2>
                    Login WebChat
                </h2>
            </div>
            <div className="form-login">
                <form action="" method="post" >
                    <div className="email-input">
                        <input type="text" ref={(input)=>(emailRef = input)} name="" placeholder='Ingresa tu Email' id=""/>
                    </div>
                    <div className="password-input">
                        <input type="password" ref={(input)=>(passwordRef = input)} name="" placeholder='Password' id=""/>
                    </div>
                    <div className="submit-button">
                        <input type="button" value="Iniciar sesion" onClick={handleLogin} />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent; 