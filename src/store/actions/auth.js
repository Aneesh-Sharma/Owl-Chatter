import * as actionTypes from './actionTypes.js';
import axios from 'axios';
import firebase from '../../Firebase';

export const authStart=()=>{
	return{
		type:actionTypes.AUTH_START
	};
};

export const authSuccess=(authData)=>{
	return{
		type:actionTypes.AUTH_SUCCESS,
		idToken:authData.localId,
		token:authData.idToken
	};
};

export const authFail=(error)=>{
	return{
		type:actionTypes.AUTH_FAIL,
		error:error
	};
};

export const checkAuthTimeout=(expiresIn)=>{
	return dispatch=>{
		setTimeout(()=>{
			dispatch(logOut());
		},expiresIn*1000);
	}
};

export const logOut=()=>{
	localStorage.removeItem('token');
	localStorage.removeItem('expiresDate');
	localStorage.removeItem('userId');
	return{
		type:actionTypes.AUTH_LOGOUT,
	};
};

export const setAuthRedirect=(path)=>{
	return{
		type:actionTypes.SET_AUTH_REDIRECT,
		path:path
	};
};

export const setUserNames=(userId,name)=>{
	return dispatch=>{
		firebase.database().ref('userNames/' + userId).set(name);
	};
};


export const auth=(email,password,name,isSignUp)=>{
	return dispatch=>{
		dispatch(authStart());
		const authData={
			email:email,
			password:password,
			returnSecureToken:true
		}
		let url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB078ABume3JNYEe3bTzL7nKw6h0MpWnWM';
		if(!isSignUp){
			url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB078ABume3JNYEe3bTzL7nKw6h0MpWnWM';
		}
		axios.post(url,authData)
		.then(response=>{
			let expiresIn=new Date(new Date().getTime()+response.data.expiresIn*1000);
			localStorage.setItem('token',response.data.idToken);
			localStorage.setItem('expiresDate',expiresIn);
			localStorage.setItem('userId',response.data.localId);
			if(isSignUp){
				dispatch(setUserNames(response.data.localId,name));
			}
			dispatch(authSuccess(response.data));
			dispatch(checkAuthTimeout(response.data.expiresIn));
		})
		.catch(error=>{dispatch(authFail(error.response.data.error))});
	};
};

export const authCheckState=(path)=>{
	return dispatch=>{
		const token=localStorage.getItem('token');
		if(!token){
			dispatch(logOut());
		}else{
			const expirationDate=new Date(localStorage.getItem('expiresDate'));
			if(expirationDate <= new Date()){
				dispatch(logOut());
			}else{
				dispatch(authSuccess({localId:localStorage.getItem('userId'), idToken:localStorage.getItem('token')}));
				dispatch(checkAuthTimeout((expirationDate.getTime()- new Date().getTime())/1000));
			}
		}
	};
};

