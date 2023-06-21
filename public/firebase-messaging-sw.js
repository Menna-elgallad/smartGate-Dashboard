importScripts(
  "https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyC48neMUl09HETdLdVCofKV-KQvUDBhWXU",
  authDomain: "car-plate-detect.firebaseapp.com",
  projectId: "car-plate-detect",
  storageBucket: "car-plate-detect.appspot.com",
  messagingSenderId: "944256968583",
  databaseURL: "https://car-plate-detect-default-rtdb.firebaseio.com/",
  appId: "1:944256968583:web:8cbc0f236538cc0bebd522",
};

const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
console.log(firebaseConfig);
messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(
    payload.notification.title,
    payload.notification
  );
});
