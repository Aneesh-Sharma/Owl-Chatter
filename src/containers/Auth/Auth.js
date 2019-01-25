import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input.js';
import Logo from '../../components/Logo/Logo.js';
import {connect} from 'react-redux';
import {Redirect,withRouter} from 'react-router-dom';
import * as actions from '../../store/actions/index.js';

//import Spinner from '../../components/UI/spinner/spinner.js';
//import {Redirect} from 'react-router';

class Auth extends Component {
	state={
		controls:{
			name:{ 
				elementType:'input',
				elementConfig:{
					type:'text',
					placeholder:'Your Name'
				},
				value:'',
				rules:{
					required:true
				},
				touch:false,
				valid:false
			},
			email:{ 
				elementType:'input',
				elementConfig:{
					type:'email',
					placeholder:'Your Email'
				},
				value:'',
				rules:{
					required:true
				},
				touch:false,
				valid:false
			},
			password:{ 
				elementType:'input',
				elementConfig:{
					type:'password',
					placeholder:'Your password'
				},
				value:'',
				rules:{
					required:true,
					minLength:6
				},
				touch:false,
				valid:false
			}
		},
		isSignUp:true	
	}
	checkValid=(value,rules)=>{
		let isValid=true;
		if(rules.required){
			isValid=value.trim()!==''&&isValid;
		}
		if(rules.minLength){
			isValid=value.length>=rules.minLength&&isValid;
		}
		return isValid;
	}
	
	inputChangeHandler=(event,identifier)=>{	
		let newcontrols={...this.state.controls};
		let newControlsInput={...newcontrols[identifier]};
		newControlsInput['value']=event.target.value;
		newControlsInput['touch']=true;
		newControlsInput['valid']=this.checkValid(event.target.value,newcontrols[identifier].rules);
		newcontrols[identifier]=newControlsInput;
		this.setState({controls:newcontrols});
	}
	switchAuthMode=()=>{
		this.setState(prev=>{
			return({isSignUp:!prev.isSignUp});
		});
	}
	submitHandler=(event)=>{
		event.preventDefault();
		this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,
			this.state.controls.name.value,this.state.isSignUp);
	}

	render(){
		const formElementArray=[];
		for(let key in this.state.controls){
			formElementArray.push({
				id:key,
				config:this.state.controls[key]
			});
		}

		let contactData=(<form onSubmit={this.submitHandler}>
			{formElementArray.map(formElement=>(
				formElement.id==='name'&&!this.state.isSignUp?null:
				<Input 
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				touch={formElement.config.touch}
				shouldValidate={formElement.config.rules}
				changed={(event)=>{this.inputChangeHandler(event,formElement.id)}}/>
				))}
			<span style={{'fontSize':'19px'}}><Button> {this.state.isSignUp?'Sign Up':'Sign In'}</Button></span>
			</form>	
			);
		let errorMessage=null;
		if(this.props.error){
			errorMessage=<p>{this.props.error.message}</p>
		}
		let authRedirect=null;
		if(this.props.isauth){
			authRedirect=<Redirect to={'/messenger'}/>
		}
		
		return(<div className={classes.AuthData}>
			{authRedirect}
			<Logo/>
			<span style={{'fontWeight':'bold'}}>{errorMessage}</span>
			{contactData}
			<Button type='Danger' click={this.switchAuthMode}>Switch to {this.state.isSignUp?'Sign In':'Sign Up'}</Button>
			</div>);
	}
}
const mapStatetoProps=state=>{
	return{
		loading:state.auth.loading,
		error:state.auth.error,
		isauth:state.auth.token!=null,
	};
};
const mapDispatchtoProps=dispatch=>{
	return{
		onAuth:(email,pass,name,isSignUp)=>dispatch(actions.auth(email,pass,name,isSignUp)),
	};
};

export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(Auth));