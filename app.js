const container = document.querySelector('.container');
var inputValue = document.querySelector('.input');
const add = document.querySelector('.add');


var list = document.getElementById("list");

firebase.database().ref('todos').on('child_added',function(data){
    //create li tag node
    var li = document.createElement('li')
    var liText = document.createTextNode(data.val().value)
    li.setAttribute("class", "li")
    li.appendChild(liText)

    //create delete button
    var delBtn = document.createElement('button')
    var delText = document.createTextNode("Delete")
    delBtn.setAttribute("class", "btn")
    delBtn.setAttribute('id',data.val().key)
    delBtn.setAttribute("onclick", "deleteItem(this)")
    delBtn.appendChild(delText)

    //create edit button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit")
    editBtn.setAttribute("class", "edit")
    editBtn.appendChild(editText)
    editBtn.setAttribute('id',data.val().key)
    editBtn.setAttribute("onclick","editItem(this)")

    li.appendChild(delBtn)
    li.appendChild(editBtn)

    list.appendChild(li)

    todo_item.value = ""
})

//console.log(firebase)
function addTodo() {
    var todo_item = document.getElementById("todo-item");


    var key = firebase.database().ref('todos').push().key;
    var database = firebase.database().ref('todos')
    var key = database.push().key;

    var todo = {
        value: todo_item.value,
        key: key
    }
    database.child(key).set(todo)
}

function deleteItem(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove()
}

function deleteAll() {

    firebase.database().ref('todos').remove()
    list.innerHTML = ""
}

function editItem(e) {
    var val = prompt("Enter edit value",e.parentNode.firstChild.nodeValue);
    var editTodo = {
        value: val,
        key: e.id
    }

    firebase.database().ref('todos').child(e.id).set(editTodo)
    e.parentNode.firstChild.nodeValue = val;
}