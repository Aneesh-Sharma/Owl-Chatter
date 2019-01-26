import React from 'react';
import classes from './SlideDrawer.css';
import Aux from '../../../hoc/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
const slideDrawer=(props)=>{
	let AddClasses=[classes.SlideDrawer,classes.Close];
	if(props.show){
		AddClasses=[classes.SlideDrawer,classes.Open];
	}
return (
	<Aux>
		<div className={AddClasses.join(' ')}>
		<p>hello i am here</p>
		</div>
		</Aux>
	);
}


export default slideDrawer;