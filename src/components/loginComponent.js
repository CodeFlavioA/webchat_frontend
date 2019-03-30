import React from 'react'
import '../assets/login.css'

const LoginComponent = (props)=>{
    let emailRef, passwordRef, nameRef; 

    const handleLogin = e => {
        e.preventDefault(); 
        props.onSubmit(emailRef, passwordRef); 
    }

    const handleRegister = e =>{
        e.preventDefault(); 
        props.registerSubmit(nameRef,emailRef,passwordRef)
    }

    const loginForm = (
        <form action="" method="post" >
        <div className="email-input">
            <label htmlFor="">Email</label><br></br>
            <input type="text" ref={(input)=>(emailRef = input)} name="" placeholder='Ingresa tu Email' id=""/>
        </div>
        <div className="password-input">
        <label htmlFor="">Password: </label><br></br>
            <input type="password" ref={(input)=>(passwordRef = input)} name="" placeholder='Password' id=""/>
        </div>
        <div className="submit-button">
            <input type="button" value="Iniciar sesion" onClick={handleLogin} />
        </div>
    </form>
    );
    const registerForm = (
        <form action="" method="post" >
            <div className="name-input">
                <label htmlFor="">Name</label><br></br>
                <input type="text" ref={(input)=>(nameRef = input)} name="" placeholder='Ingresa tu Email' id=""/>
            </div>
            <div className="email-input">
                <label htmlFor="">Email</label><br></br>
                <input type="text" ref={(input)=>(emailRef = input)} name="" placeholder='Ingresa tu Email' id=""/>
            </div>
            <div className="password-input">
            <label htmlFor="">Password: </label><br></br>
                <input type="password" ref={(input)=>(passwordRef = input)} name="" placeholder='Password' id=""/>
            </div>
            <div className="submit-button">
                <input type="button" value={props.toggle ?'Iniciar':'Registrarse'} onClick= { handleRegister} />
            </div>
        </form>
    );

    console.log(props.toggle)
    return(
        <div className="login-box">
            <div className="header-login">
                <h2>
                    {props.toggle ? 'Login':'Register'}
                </h2>
            </div>
            <div className="form-login">
              {props.toggle ? loginForm:registerForm}
            </div>
            <div className="info" onClick={props.registerClick}>
                ¿No tienes cuenta? 
                <br/>
                Registrate aquí
            </div>
        </div>
    );
}

export default LoginComponent; 