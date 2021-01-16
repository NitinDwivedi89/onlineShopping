var config = {
    apiKey: "AIzaSyBKMIgXLOfiuk8n1CSZ_ytZKVAP2VSbtUU",
    authDomain: "puma-akhilhind.firebaseapp.com",
    databaseURL: "https://puma-akhilhind.firebaseio.com",
    projectId: "puma-akhilhind",
    storageBucket: "",
    messagingSenderId: "246842308968"
  };
  firebase.initializeApp(config);

// var firebaseConfig = {
//   apiKey: "AIzaSyAeQmTmmE5eRjb1-eBoQ9SbkSpTU-jV3Yw",
//   authDomain: "onlineshopping-7cd44.firebaseapp.com",
//   projectId: "onlineshopping-7cd44",
//   storageBucket: "onlineshopping-7cd44.appspot.com",
//   messagingSenderId: "513326993628",
//   appId: "1:513326993628:web:ca407f17d5fd0af01f6419",
//   measurementId: "G-B6TP376N7T"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();


function setCookie(name) {
  console.log(name);
  localStorage.setItem("username", name);
  // localStorage.setId("userID",);
}