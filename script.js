
// array in which todos will be saved in the form of objects
var todos = [];

// constructor function for todos
function Todo(id, name, status){
  this.id = id;
  this.name = name;
  this.status = false;
}

//function in which the added items are pushed in array
function addNewTodoWithName(name){
  var id = (new Date()).getTime();
  var t = new Todo(id, name);
  todos.push(t);
  saveTodos();
}

// for locally storing arrays
function saveTodos(){
  var str = JSON.stringify(todos);
  localStorage.setItem("todos",str);
}

// for getting the stored items 
function getTodos(){
  var str = localStorage.getItem("todos");
  todos = JSON.parse(str);
  if(!todos){
    todos = [];
  }
}

// onload it will be callled
getTodos();
listElement();





// for refreshing list items
function listElement() {
  
    for (var i = 0;i<todos.length;i++){
      var todo = todos[i];
      var todoName = todo.name;
      var todoStatus = todo.status;
      var todoId = todo.id;
      var li = document.createElement("li");
      var li_todo_name = document.createTextNode(todoName);
      li.appendChild(li_todo_name);
      
      
        document.getElementById("myUL").appendChild(li);
      

        document.getElementById("myInput").value = "";
        // for checkbox in li
        var checkbox = document.createElement("input");
          checkbox.setAttribute("class", "checkbox");
          checkbox.setAttribute("type","checkbox");
          checkbox.setAttribute("id", todoId);
          // checkoing status 
          if(todoStatus === true){
            checkbox.checked = true;
          }else{
            checkbox.checked =false;
          }
          // for delete button 
        var  spanDelete = document.createElement("span");
          spanDelete.setAttribute("id", todoId);
          spanDelete.setAttribute("class", "delete");
          spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

          spanDelete.onclick = deleteItem;
          checkbox.onchange = itemStatus;

        li.appendChild(checkbox);
        li.appendChild(spanDelete);
        
    } 
}


//for adding new list item

function addnewelement(){
    for (var i = 0;i<todos.length;i++){
      var todo = todos[i];
      var todoName = todo.name;
      var todoStatus = todo.status;
      var todoId = todo.id;
    }
    //for li tag
    var li = document.createElement("li");
    var li_todo_name = document.createTextNode(todoName);
      li.appendChild(li_todo_name);
      document.getElementById("myUL").appendChild(li);
      document.getElementById("myInput").value = "";
     //for checkbox in li
    var checkbox = document.createElement("input");
      checkbox.setAttribute("type","checkbox");
      checkbox.setAttribute("class", "checkbox");
      checkbox.setAttribute("id", todoId);
      checkbox.onchange = itemStatus;

    // for delete button in li
    var  spanDelete = document.createElement("span");
      spanDelete.setAttribute("id", todoId);
      spanDelete.setAttribute("class", "delete");
      spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";
      spanDelete.onclick = deleteItem;

    li.appendChild(checkbox);
    li.appendChild(spanDelete);
    
}

// checking and changing the status of the list item w.r.t id

function itemStatus(e){
  var id = e.target.id;
  console.log("change status of an item with an id- " + id);
  for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            if(todos[i].status === false){
              todos[i].status = true;
              saveTodos();
            }else{
              todos[i].status = false;
              saveTodos();
            }
        }  
  }
}
    // for deleting an item from list with respect to id
function deleteItem(e) {
    var id = e.target.id;
    console.log("delete an item: " + id);
    
    // find and remove the item in the array
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }   
    }

    saveTodos();

    // find and remove the item in the page
    var li = e.target.parentElement;
    var ul = document.getElementById("myUL");
    ul.removeChild(li);
} 


document.getElementById('addBtn').addEventListener('click',function(){
      var name = document.getElementById("myInput").value;
      if(name === ""){
        alert("please enter something");
      }else{
        addNewTodoWithName(name);
        addnewelement();
      }      
});
