import React, { Component } from 'react';
import firebase from './Firebase.js';
import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth.js';
import {connect} from 'react-redux';
import {Route,Switch,Redirect,withRouter} from 'react-router-dom';
import * as actions from './store/actions/index.js';
import Logout from './containers/Auth/LogOut/LogOut.js'
import Messenger from './containers/Messenger/Messenger.js';

class App extends Component {
  startIt=()=>{
    let messages = firebase.database().ref('messages');
    messages.on('value', function(snapshot) {
      let talks=snapshot.val();
      talks.map(talk=>(console.log(talk)));
    });
  }
  componentDidMount(){
   this.props.onauthCheckState();
 }
 render() {
  let  routes=null,authRedirect=null;
  if(!this.props.isauth){
    authRedirect=<Redirect to="/auth"/>
  }

  routes=(<Switch>
    <Route path="/auth" component={Auth}/>
    <Route path="/messenger" component={Messenger}/>
    <Route path="/logout" component={Logout}/>
    </Switch>);
  return (
    <div style={{'height':'100%'}}>
    <Layout auth={this.props.isauth}>
    {authRedirect}
    {routes}
    </Layout>
    </div>
    );
}
}
const mapStatetoProps=state=>{
  return{
    isauth:state.auth.token!=null,
  };
};
const mapDispatchtoProps=dispatch=>{
  return{
    onauthCheckState:()=>dispatch(actions.authCheckState())
  };
}
export default withRouter(connect(mapStatetoProps,mapDispatchtoProps)(App));
