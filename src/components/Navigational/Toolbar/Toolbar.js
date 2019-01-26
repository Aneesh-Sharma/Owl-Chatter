import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import {NavLink} from 'react-router-dom';
const toolbar=(props)=>{
	return (
		<header className={classes.Toolbar}>
		<div className={classes.Logo} onClick={props.click}><Logo logo/></div>
		<div className={classes.AppName}>Chatter</div>
		{props.auth?<div className={classes.Name}>
		<NavLink 
		style={{ 'textDecoration': 'none','color':'white'}} 
		to={'/logout'}>LogOut</NavLink>
		</div>:null}
		</header>
		);
}
export default toolbar;