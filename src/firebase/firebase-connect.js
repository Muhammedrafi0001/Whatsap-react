import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDogazhMoa0-XOS_5BZBdzq3xEIY1qSBLU",
  authDomain: "whatsapp-clone-fffb5.firebaseapp.com",
  projectId: "whatsapp-clone-fffb5",
  storageBucket: "whatsapp-clone-fffb5.appspot.com",
  messagingSenderId: "296359674984",
  appId: "1:296359674984:web:b374a26c409eeb034ae7dd"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth= firebase.auth()
const provider =new firebase.auth.GoogleAuthProvider()
export { db, auth,provider}
