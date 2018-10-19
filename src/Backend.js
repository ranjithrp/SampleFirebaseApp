import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
        apiKey: "AIzaSyAVLvCnu0aAod-wF_LnPT23o7P0ZPwrB7M",
        authDomain: "testproject-13814.firebaseapp.com",
        databaseURL: "https://testproject-13814.firebaseio.com",
        projectId: "testproject-13814",
        storageBucket: "testproject-13814.appspot.com",
        messagingSenderId: "54075429555"
    });

  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  signInWithEmail(email, password, callback) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
        callback();
      } else {
        firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
          alert(error.message);
        });
      }
    });
  }

  signUpWithEmail(email,password) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        alert(error.message);
        
    });
  }
  // retrieve the messages from the Backend
  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('oldmessages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }
  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();