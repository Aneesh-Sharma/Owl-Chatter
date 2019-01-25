import React from 'react';
import logoSrc from '../../assets/Images/logo.jpg';
import singUplogoSrc from '../../assets/Images/signupIcon.png';
import classes from './Logo.css';
const logo = (props)=>{
return(
	<div className={props.logo?classes.Logo:classes.SingUpLogo}>
		<img src={props.logo?logoSrc:singUplogoSrc}/>
	</div>
	);
}
export default logo;