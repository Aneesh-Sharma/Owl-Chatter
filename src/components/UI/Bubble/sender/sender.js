import React from 'react';
import classes from './sender.css'
const sender=(props)=>{
	return(<div className={classes.bubble}>
		{props.val}
	</div>);
}
export default sender;