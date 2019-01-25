import * as actionTypes from './actionTypes.js';
import axios from 'axios';
import firebase from '../../Firebase';

export const usersListStart=()=>{
	return{
		type:actionTypes.USER_LIST_START
	};
};

export const usersListSuccess=(usersData)=>{
	return{
		type:actionTypes.USER_LIST_SUCCESS,
		userList:usersData
	};
};

export const usersListFail=(error)=>{
	return{
		type:actionTypes.USER_LIST_FAIL,
		error:error
	};
};

export const usersList=()=>{
	return dispatch=>{
		dispatch(usersListStart());
		let messages = firebase.database().ref('userNames');
		messages.on('value', function(snapshot) {
			let userslist=snapshot.val();
			dispatch(usersListSuccess(userslist));
		});
	}
};