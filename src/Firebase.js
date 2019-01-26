import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let config = {
	apiKey: "AIzaSyB078ABume3JNYEe3bTzL7nKw6h0MpWnWM",
	authDomain: "chater-f9c81.firebaseapp.com",
	databaseURL: "https://chater-f9c81.firebaseio.com",
	projectId: "chater-f9c81",
	storageBucket: "chater-f9c81.appspot.com",
	messagingSenderId: "205398059725"
};

firebase.initializeApp(config);

export default firebase;
