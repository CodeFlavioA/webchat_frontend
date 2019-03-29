import React, {Component} from 'react'

class ChatApp extends Component{
    render(){
        return (
            <div className="container-root-chat">
                {this.props.children}
            </div>
        )
    }
}

export default ChatApp; 