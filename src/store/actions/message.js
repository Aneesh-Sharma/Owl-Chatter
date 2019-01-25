import * as actionTypes from './actionTypes.js';
import axios from 'axios';
import firebase from '../../Firebase';

export const messageSendStart=()=>{
	return{
		type:actionTypes.MESSAGE_SEND_START
	};
};

export const messageSendSuccess=(usersData)=>{
	return{
		type:actionTypes.MESSAGE_SEND_SUCCESS
	};
};

export const messageSendFail=(error)=>{
	return{
		type:actionTypes.MESSAGE_SEND_FAIL,
		error:error
	};
};

export const messageSend=(receiver,sender,text)=>{
	return dispatch=>{
		dispatch(messageSendStart());
		let url='https://chater-f9c81.firebaseio.com/messages/';
		let dest=null;
		let messageData={
			senderId:sender,
			message:text
		};
		if(receiver.localeCompare(sender)<0){
			dest=receiver+'_'+sender;
		}else{
			dest=sender+'_'+receiver;
		}

		axios.post(url+dest+'.json',messageData)
		.then(response=>{
			dispatch(messageSendSuccess());
		})
		.catch(error=>{
			dispatch(messageSendFail(error));
		});
	};
};