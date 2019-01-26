import * as actionTypes from './actionTypes.js';
import axios from 'axios';
import firebase from '../../Firebase';

export const messageSendStart=()=>{
	return{
		type:actionTypes.MESSAGE_SEND_START
	};
};

export const messageSendSuccess=()=>{
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

export const messageFetchStart=()=>{
	return{
		type:actionTypes.MESSAGE_FETCH_START
	};
};

export const messageFetchSuccess=(messageData)=>{
	return{
		type:actionTypes.MESSAGE_FETCH_SUCCESS,
		messageData:messageData
	};
};

export const messageFetchFail=(error)=>{
	return{
		type:actionTypes.MESSAGE_FETCH_FAIL,
		error:error
	};
};

export const messageFetch=(receiver,sender)=>{
	return dispatch=>{
		dispatch(messageFetchStart());
		let dest=null;
		if(receiver.localeCompare(sender)<0){
			dest=receiver+'_'+sender;
		}else{
			dest=sender+'_'+receiver;
		}

		let message= firebase.database().ref('messages/'+ dest+'/');
		message.on('value', function(snapshot) {
			let messageData=snapshot.val();
			dispatch(messageFetchSuccess(messageData));
			console.log(messageData);
		});

	};
};