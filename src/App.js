import React, { Component } from 'react';
import firebase from './Firebase.js';
import Layout from './components/Layout/Layout';

class App extends Component {
  startIt=()=>{
    let messages = firebase.database().ref('messages');
    messages.on('value', function(snapshot) {
      let talks=snapshot.val();
      talks.map(talk=>(console.log(talk)));
    });
  }
  
  render() {
    this.startIt();
    return (
      <div>
      <Layout>
      <p> Hello I am chater</p>
      <p>lets create some Single page App</p>
      </Layout>
      </div>
      );
  }
}

export default App;
