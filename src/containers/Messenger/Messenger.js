import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './Messenger.css';
import UserList from '../../components/UserList/UserList.js';
import * as actions from '../../store/actions/index.js';
import TextBox from './TextBox/TextBox.js';
import MessageBox from './MessageBox/MessageBox.js';
import Aux from '../../hoc/Auxilary.js';
import Spinner from '../../components/UI/spinner/spinner.js';

class Messenger extends Component {

	render(){
		let userList=(<UserList 
			selected={this.props.receiver}
			users={this.props.users} 
			userId={this.props.userId} 
			setReceiver={this.props.setReceiver}/>);
		
		if(this.props.loading){
			userList=<Spinner/>
		}
		return(<Aux>
			<div className={classes.UserList}>
			{userList}
			</div>
			<div className={classes.MessegeBox}>
			<MessageBox receiver={this.props.receiver} sender={this.props.userId}/>
			</div>
			<div className={classes.TextBox}>
			<TextBox receiver={this.props.receiver}/>
			</div>
			</Aux>);
	}
}
const mapStatetoProps=state=>{
	return{
		loading:state.users.loading,
		error:state.users.error,
		users:state.users.users,
		userId:state.auth.userId,
		receiver:state.users.receiver
	};
};
const mapDispatchtoProps=dispatch=>{
	return{
		getUsersList:()=>dispatch(actions.usersList()),
		setReceiver:(id)=>dispatch(actions.setReceiver(id))
	};
};
export default connect(mapStatetoProps,mapDispatchtoProps)(Messenger);
