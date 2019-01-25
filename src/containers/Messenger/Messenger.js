import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './Messenger.css';
import UserList from '../../components/UserList/UserList.js';
import {Route,Switch,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index.js';
import TextBox from './TextBox/TextBox.js';
import Aux from '../../hoc/Auxilary.js';

class Messenger extends Component {
    state={
    	receiver:null
    }
	componentDidMount(){
		this.props.getUsersList();
	}
	setReceiver=(id)=>{
		this.setState({receiver:id});
	}
	render(){
		return(<Aux>
			<div className={classes.UserList}>
			<UserList 
			selected={this.state.receiver}
			users={this.props.users} 
			userId={this.props.userId} 
			setReceiver={this.setReceiver}/>
			</div>
			<div className={classes.MessegeBox}>
			chat Here
			</div>
			<div className={classes.TextBox}>
			<TextBox receiver={this.state.receiver}/>
			</div>
			</Aux>);
	}
}
const mapStatetoProps=state=>{
	return{
		loading:state.users.loading,
		error:state.users.error,
		users:state.users.users,
		userId:state.auth.userId
	};
};
const mapDispatchtoProps=dispatch=>{
	return{
		getUsersList:()=>dispatch(actions.usersList())
	};
};
export default connect(mapStatetoProps,mapDispatchtoProps)(Messenger);
