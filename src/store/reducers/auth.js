import * as actionTypes from '../actions/actionTypes.js';
import {updateObject} from '../utility.js';

const initialState={
	token:null,
	userId:null,
	error:null,
	loading:false
};

const authStart=(state,action)=>{
	return updateObject(state,{error:null,loading:true});
};
const authLogout=(state,action)=>{
	return updateObject(state,{userId:null,token:null});
};

const authSuccess=(state,action)=>{
	return updateObject(state,
		{error:null,
		 loading:false,
		 token:action.token,
		 userId:action.idToken
		});
};

const authFail=(state,action)=>{
	return updateObject(state,{error:action.error,loading:false});
};

const setAuthRedirect=(state,action)=>{
	return updateObject(state,{authRedirect:action.path});
};


const reducer=(state=initialState,action)=>{
	switch(action.type){
		case actionTypes.AUTH_START: return authStart(state,action);
		case actionTypes.AUTH_SUCCESS:return authSuccess(state,action);
		case actionTypes.AUTH_FAIL:return authFail(state,action);
		case actionTypes.AUTH_LOGOUT:return authLogout(state,action);
		case actionTypes.SET_AUTH_REDIRECT:return setAuthRedirect(state,action);

		default: return state;

	}
};
export default reducer;;