import React from 'react';
import classes from './UserList.css';
import User from './user/user.js'

const userList=(props)=>{
	var usersList = Object.keys(props.users).map((k,index)=> { 
		return k!==props.userId?<User key={index} 
		name={props.users[k]} 
		id={k}
		selected={k===props.selected}
		setReceiver={props.setReceiver}/>:null });
	return (<div className={classes.UserList}>
		{usersList}
		</div>);
}
export default userList;