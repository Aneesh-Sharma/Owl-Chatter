import React from 'react';
import classes from './receiver.css'
const receiver=(props)=>{
	return(<div className={classes.bubble}>
		{props.val}
	</div>);
}
export default receiver;