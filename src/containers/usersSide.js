import React, {Component} from 'react'
import HeaderProfile from '../components/HeaderListUser'
import Chats from './ChatContainer'
import { connect } from 'react-redux';

class usersSide extends Component{

    constructor(props){
        super(props); 
        this.state = {
            copyHeader:[], 
        }
    }
    componentDidMount(){
        this.setState({
            copyHeader: this.props.headers, 
        })
    }
    onchange = (evt)=>{
        let val = evt.target.value; 
        this.setState({
            copyHeader: this.props.headers.filter((item)=>{
                if(item.name.toLowerCase().includes(val.toLowerCase())){
                    return true; 
                }
                return false; 
            })
        })

    }

    render(){
        return (
            <div className="container-userlist">
                <HeaderProfile 
                    urlImage='https://lorempixel.com/80/80'
                    name={this.props.name}
                    avatar={this.props.avatar}
                    onchange = {this.onchange}
                />
                <Chats
                />
            </div>
        )
    }

}

const mapToProps = (store)=>{
    return{
        name: store.user.name,
        avatar: store.user.avatar,
        headers: store.headers, 
        token: store.user.token,
    }
}

export default connect(mapToProps)(usersSide); 
