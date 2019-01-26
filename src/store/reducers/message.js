import * as actionTypes from '../actions/actionTypes.js';
import {updateObject} from '../utility.js';
const initialState={
	messageData:null,
	loading:false
};

const messageSendStart=(state,action)=>{
	return updateObject(state, {loading:true});
};

const messageSendSuccess=(state,action)=>{
		return updateObject(state, {
			loading:false,
		});
};

const messageSendFail=(state,action)=>{
	return updateObject(state,{
			loading:false
		});
};

const messageFetchStart=(state,action)=>{
	return updateObject(state, {loading:true});
};

const messageFetchSuccess=(state,action)=>{
		return updateObject(state, {
			loading:false,
			messageData:action.messageData
		});
};

const messageFetchFail=(state,action)=>{
	return updateObject(state,{
			loading:false
		});
};

const reducer=(state=initialState,action)=>{
	switch(action.type){
		case actionTypes.MESSAGE_SEND_START:return messageSendStart(state,action);
		case actionTypes.MESSAGE_SEND_SUCCESS:return messageSendSuccess(state,action);
		case actionTypes.MESSAGE_SEND_FAIL:return messageSendFail(state,action);
		case actionTypes.MESSAGE_FETCH_START:return messageFetchStart(state,action);
		case actionTypes.MESSAGE_FETCH_SUCCESS:return messageFetchSuccess(state,action);
		case actionTypes.MESSAGE_FETCH_FAIL:return messageFetchFail(state,action);
		default: return state;
	}
}

export default reducer;