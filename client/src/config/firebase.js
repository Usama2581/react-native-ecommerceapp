import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyChHY6KC7q-f-UwfwvF3ox4TvYIqRyfrlQ",
    authDomain: "ecommercern-3733b.firebaseapp.com",
    projectId: "ecommercern-3733b",
    storageBucket: "ecommercern-3733b.appspot.com",
    messagingSenderId: "558472382084",
    appId: "1:558472382084:web:beb20bf1b7adf0325ee4d1",
    measurementId: "G-L968K7C6EW"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

async function uploadImage(picture) {
    // console.log('firebase', picture);
  
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = async function () {
        const blob = xhr.response;
  
        const ref = firebase.storage().ref().child(`Pictures/Image1${Math.random()}`);
  
        const snapshot = ref.put(blob);
  
        snapshot.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("");
          },
          (error) => {
            console.log(error);
            blob.close();
            reject(error);
          },
          async () => {
            const downloadUrl = await snapshot.snapshot.ref.getDownloadURL();
            // console.log("Download URL: ", downloadUrl);
            blob.close();
            resolve(downloadUrl);
          }
        );
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", picture, true);
      xhr.send(null);
    });
  }


export {
    firebase,
    app,
    uploadImage
}