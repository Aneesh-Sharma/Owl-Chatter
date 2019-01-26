import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './MessageBox.css';
import * as actions from '../../../store/actions/index.js';
import Sender from'../../../components/UI/Bubble/sender/sender.js';
import Receiver from'../../../components/UI/Bubble/receiver/receiver.js';

class MessageBox extends Component {
	state={
		receiver:null
	}
	
	componentDidUpdate(){
		if(this.state.receiver!==this.props.receiver){
			this.props.getMessage(this.props.receiver,this.props.sender);
			this.setState({receiver:this.props.receiver});
		}
		this.scrollToBottom();
	}

	scrollToBottom=()=> {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	render(){
		let messages=null;
		if(this.props.messageData){
			messages=Object.keys(this.props.messageData).map((k,index)=> { 
				return (this.props.messageData[k].senderId===this.props.sender?
					<Sender key={index} val={this.props.messageData[k].message}/>:
					<Receiver key={index} val={this.props.messageData[k].message}/>
					);
			});
		}

		return(<div className={classes.MessageBox}>
			{this.props.receiver==null?<div className={classes.pc}>WELCOME TO CHATTER</div>:null}
			{this.props.receiver==null?<div className={classes.mob}>PRESS OWL TO CHAT</div>:null}
			{messages}
			<div style={{ float:"left", clear: "both" }}
			ref={(el) => { this.messagesEnd = el; }}>
			</div>
			
			</div>);
	}
}
const mapStatetoProps=state=>{
	return{
		messageData:state.message.messageData
	};
};
const mapDispatchtoProps=dispatch=>{
	return{
		getMessage:(receiver,sender)=>dispatch(actions.messageFetch(receiver,sender))
	};
};
export default connect(mapStatetoProps,mapDispatchtoProps)(MessageBox);
