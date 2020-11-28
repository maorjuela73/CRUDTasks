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
    document.getElementById("cardSection").innerHTML='';
    readTask();
}

function readTask() {
    document.getElementById("cardSection").innerHTML+=`
            <h4 class="mt-2" style="color:#FFFFFF">Task lists</h4>
        `;
    var task = firebase.database().ref("tasks/")
    task.on("child_added",function(data){
        var taskValue = data.val();
        console.log(taskValue);
        
        document.getElementById("cardSection").innerHTML+=`               
            <div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">
                    ${taskValue.task}
                </h5>
                <p class="card-text">
                    ${taskValue.description}
                </p>
                
                <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask(${taskValue.id}, '${taskValue.task}','${taskValue.description}')">
                    <i class="fas fa-pen-nib"></i> Edit Task
                </button>
                <button type="submit" class="btn btn-danger float-right" onclick="deleteTask(${taskValue.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>`
    });
}

function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form">
        <div class="form-group">
            <label>Task</label>
            <input type="text" class="form-control" id="task" placeholder="Ingresa el nombre de la tarea">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" id="description" placeholder="Ingresa la descripción de la tarea">
        </div>

        <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> Agregar</button>
        <button id="button2" class="btn btn-success" style="display: none;">Actualizar</button>
        <button id="button3" class="btn btn-danger"  style="display: none;">Cancelar</button>
    </form>
    `;

    document.getElementById("form").addEventListener("submit",(e)=>{
        var task = document.getElementById("task").value;
        var description = document.getElementById("description").value;
        e.preventDefault();
        createTask(task,description);
        form.reset();
    });
}

function updateTask(id, name, description){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4" id="form2">
        <div class="form-group">
            <label>Task</label>
            <input type="text" class="form-control" id="task" placeholder="Ingresa el nombre de la tarea">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" id="description" placeholder="Ingresa la descripción de la tarea">
        </div>

        <button type="submit" id="button1" class="btn btn-primary" style="display: none;"><i class="fas fa-plus"></i> Agregar</button>
        <button type="submit" id="button2" class="btn btn-success" style="display: inline-block;"><i class="fas fa-sync-alt"></i> Actualizar</button>
        <button id="button3" class="btn btn-danger"  style="display: inline-block;"><i class="fas fa-ban"></i> Cancelar</button>
    </form>
    `;
    document.getElementById("form2").addEventListener("submit", (e)=>{
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
        reset();    
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
        updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
    });
    document.getElementById("task").value=name;
    document.getElementById("description").value=description;
}

function updateTask2(id, name, description){
    var taskUpdated={
        task:name,
        id:id,
        description:description
    }
    let db = firebase.database().ref("tasks/"+id);
    db.set(taskUpdated);

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
}

function deleteTask(id){
    console.log(`Trying to delete ${id}`);
    var task=firebase.database().ref("tasks/"+id);
    task.remove();
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
}
