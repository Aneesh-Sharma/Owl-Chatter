import React from 'react';
import classes from './Toolbar.css';

const toolbar=(props)=>{
return (
		<header className={classes.Toolbar}>
			<div className={classes.Name}>Chatter</div>
		</header>
	);
}
export default toolbar;