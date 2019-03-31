import React, {Component} from 'react'
import {connect} from 'react-redux'

class ChatApp extends Component{
    

    render(){
        return (
            <div className="container-root-chat">
                {this.props.children}
            </div>
        )
    }
}

const mapToProps = (state)=>{
    return{
        email: state.user.email,
    }
}

export default connect(mapToProps)(ChatApp); 