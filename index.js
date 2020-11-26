console.log("Script index.js cargado");

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBEzliRhRyKzLTf8NKhfGAQNtVCCp5B-kw",
authDomain: "crudweb-a2063.firebaseapp.com",
databaseURL: "https://crudweb-a2063.firebaseio.com",
projectId: "crudweb-a2063",
storageBucket: "crudweb-a2063.appspot.com",
messagingSenderId: "1045304744698",
appId: "1:1045304744698:web:037c230fbc007dbd10c743"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service

var d = new Date();
var t = d.getTime();
var counter = t;

document.getElementById("form").addEventListener("submit",(e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form.reset();
});

function createTask(taskName,description) {
    counter+=1;
    var task={
        task:taskName,
        id:counter,
        description:description
    }
    var db = firebase.database().ref("tasks/"+counter);
    db.set(task);
}
