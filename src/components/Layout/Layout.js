import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigational/Toolbar/Toolbar';
const layout=(props)=>{
	return (
		<Aux>
		<Toolbar/>
		<main className={classes.Context}>
		{props.children}
		</main>	
		</Aux>
		);
}
export default layout;