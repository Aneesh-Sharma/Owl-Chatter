import React from 'react';
import classes from './user.css';

const user=(props)=>{
	const userClasses=[classes.UserBox];
	if(props.selected){
		userClasses.push(classes.Selected);
	}
	return (<div className={userClasses.join(' ')} onClick={()=>{props.setReceiver(props.id)}}>
		{props.name}
		</div>);
}
export default user;