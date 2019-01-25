import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input.js';
import Aux from '../../../hoc/Auxilary.js';
import classes from './TextBox.css';
import {connect} from 'react-redux';
import sendButton from '../../../assets/Images/send.png';
import * as actions from '../../../store/actions/index.js';
class TextBox extends Component {
	state={
		message:{ 
			elementType:'input',
			elementConfig:{
				type:'text',
				placeholder:'Type a message'
			},
			value:''
		}
	}
	inputChangeHandler=(event)=>{	
		let newMessage={...this.state.message};
		newMessage['value']=event.target.value;
		this.setState({message:newMessage});
	}
	resetTextBox=()=>{
		let newMessage={...this.state.message};
		newMessage['value']='';
		this.setState({message:newMessage});
	}
	submitHandler=(event)=>{
		event.preventDefault();
		this.props.onMessageSend(this.props.receiver,this.props.userId,this.state.message.value);
		this.resetTextBox();
	}
	render(){
		let textBox=(<form onSubmit={this.submitHandler}>
			<Input 
			elementType={this.state.message.elementType}
			elementConfig={this.state.message.elementConfig}
			value={this.state.message.value}
			changed={(event)=>{this.inputChangeHandler(event)}}/>
			</form>
			);
		return(
			<Aux>
			<div className={classes.TextBox}>
			{textBox}
			</div>
			<div className={classes.Button}>
			<img src={sendButton} onClick={this.submitHandler}/>
			</div>
			</Aux>

			);
	}
}

const mapStatetoProps=state=>{
	return{
		userId:state.auth.userId,
	};
};

const mapDispatchtoProps=dispatch=>{
	return{
		onMessageSend:(receiver,sender,text)=>dispatch(actions.messageSend(receiver,sender,text)),
	};
};


export default connect(mapStatetoProps,mapDispatchtoProps)(TextBox);