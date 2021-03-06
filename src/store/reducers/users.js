import * as actionTypes from '../actions/actionTypes.js';
import {updateObject} from '../utility.js';
const initialState={
	users:[],
	loading:false,
	receiver:null
};

const setReceiver=(state,action)=>{
	return updateObject(state, {receiver:action.id});
};

const usersListStart=(state,action)=>{
	return updateObject(state, {loading:true});
};

const usersListSuccess=(state,action)=>{
		return updateObject(state, {
			loading:false,
			users:action.userList
		});
};

const usersListFailed=(state,action)=>{
	return updateObject(state,{
			loading:false
		});
};

const reducer=(state=initialState,action)=>{
	switch(action.type){
		case actionTypes.USER_LIST_START:return usersListStart(state,action);
		case actionTypes.USER_LIST_SUCCESS:return usersListSuccess(state,action);
		case actionTypes.USER_LIST_FAIL:return usersListFailed(state,action);
		case actionTypes.SET_RECEIVER:return setReceiver(state,action);
		default: return state;
	}
}

export default reducer;