import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import UserList from '../../components/UserList/UserList.js';
import * as actions from '../../store/actions/index.js';
import Toolbar from '../Navigational/Toolbar/Toolbar';
import {connect} from 'react-redux';
class Layout extends Component {
	state={
		showList:true,
		receiver:null
	}

	componentDidMount(){
		this.props.getUsersList();
	}

	toggleList=()=>{
		 var width = parseInt(window.innerWidth);
		if(this.props.isAuth&&width<500){
			this.setState({showList:!this.state.showList});
		}
	}

	selectReceiver=(id)=>{
		this.props.setReceiver(id);
		this.toggleList();
		this.props.getMessage(id,this.props.userId);
	}

	render(){
		return (
			<Aux>
			<Toolbar {...this.props} click={this.toggleList}/>
			<main className={classes.Context}>
			{this.state.showList?this.props.children:<UserList 
				selected={this.props.receiver}
				users={this.props.users} 
				userId={this.props.userId} 
				setReceiver={this.selectReceiver}/>}
				</main>	
				</Aux>
				);	
	}
	
}

const mapStatetoProps=state=>{
	return{
		isAuth:state.auth.userId!==null,
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
		setReceiver:(id)=>dispatch(actions.setReceiver(id)),
		getMessage:(receiver,sender)=>dispatch(actions.messageFetch(receiver,sender))
	};
};
export default connect(mapStatetoProps,mapDispatchtoProps)(Layout);
