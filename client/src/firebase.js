import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

//TODO replace these with environemt variables when repo public
const app = firebase.initializeApp({
    apiKey: "AIzaSyDqRTPVxnozbD5GBacGS76CmsdWAlE4p9g",
    authDomain: "custos-ae3f4.firebaseapp.com",
    databaseURL: "https://custos-ae3f4.firebaseio.com",
    projectId: "custos-ae3f4",
    storageBucket: "custos-ae3f4.appspot.com",
    messagingSenderId: "704724607664",
    appId: "1:704724607664:web:a1029a2f4a612b473bd175",
    measurementId: "G-BEE7BT4TFF"
});

export const auth = app.auth();
export const db = app.database();
export default app;