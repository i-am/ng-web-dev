console.log("script loaded");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID = "active_todo_list_div";
const TODO_TITLE = "new_todo_title";
const COMPLETE_TODO_LIST_ID = "complete_todo_list_div";
const DELETED_TODO_LIST_ID = "deleted_todo_list_div";

window.onload = function() {
    GetTodoAJAX();
    var complete_hide_link = document.getElementById("hide_completed");
    var delete_hide_link = document.getElementById("hide_deleted");
    complete_hide_link.onclick = function(e){
        e.preventDefault();
        ToggleTodosDisplay(COMPLETE_TODO_LIST_ID);
        ToggleLinkText("hide_completed");
        return true;
    };

    delete_hide_link.onclick = function(e){
        e.preventDefault();
        ToggleTodosDisplay(DELETED_TODO_LIST_ID);
        ToggleLinkText("hide_deleted");
    };
};

function ToggleLinkText(linkId)
{
    link_el = document.getElementById(linkId);
    if(link_el)
    if(link_el.innerHTML === "Hide Items")
        link_el.innerHTML = "Show Items";
    else link_el.innerHTML = "Hide Items";
}

function ToggleTodosDisplay(id) {
    hide_div = document.getElementById(id);

    for(var i=0; i<hide_div.children.length; i++)
    {
        if(hide_div.children[i].style.display !== 'none')
            hide_div.children[i].style.display = 'none';
        else hide_div.children[i].style.display = 'block';
    }
}

function show_todo_elements(todo_data_json) {
    var todos = JSON.parse(todo_data_json);
    var activeParent = document.getElementById(TODO_LIST_ID);
    var completeParent = document.getElementById(COMPLETE_TODO_LIST_ID);
    var deletedParent = document.getElementById(DELETED_TODO_LIST_ID);

    //var parent = document.getElementById(id);
    //parent.innerText = todo_data_json;
    //if(parent){
    activeParent.innerHTML = "";
    completeParent.innerHTML = "";
    deletedParent.innerHTML = "";

    Object.keys(todos).forEach(
        function(key) {

            var todo_element = createTodoElement(key, todos[key]);
            if (todos[key].status === "ACTIVE" && activeParent !== null)
                activeParent.appendChild(todo_element);

            else if (todos[key].status === "COMPLETE" && completeParent !== null)
                completeParent.appendChild(todo_element);

            else if(deletedParent !== null)
                deletedParent.appendChild(todo_element);
        }
    );
    //}
}

function createTodoElement(key, todo) {
    var todo_element = document.createElement("div");

    todo_element.setAttribute("data-id", key);
    todo_element.setAttribute("class", "todoStatus"+todo.status);

    if(todo.status !== "DELETED") {
        //checkbox
        var complete_checkbox = document.createElement("input");
        complete_checkbox.setAttribute("class", "completeCheckbox");
        complete_checkbox.type = "checkbox";
        complete_checkbox.setAttribute("onclick", "completeTodoAJAX(" + key + ")");
        if (todo.status === "COMPLETE") {
            complete_checkbox.setAttribute("checked", "true");
        }
        todo_element.appendChild(complete_checkbox);
        //todo_element.innerHTML += "<button type = 'button' class = 'close' onclick='deleteTodoAJAX(\""+key+"\")'>&times;</button>"
        var del_button = document.createElement('button');
        del_button.setAttribute('type', 'button');
        del_button.setAttribute('class', 'close');
        del_button.setAttribute('onclick', 'deleteTodoAJAX(' + key + ')');
        del_button.innerHTML = '×';
        todo_element.appendChild(del_button);
    }
    todo_element.append(todo.title);

    return todo_element;
}

function GetTodoAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === RESPONSE_DONE && xhr.status === STATUS_OK) {
            // console.log(xhr.responseText);
            show_todo_elements(xhr.responseText);
        }
    };
    xhr.send(data=null);
}

function AddTodoAJAX() {
    var title = document.getElementById(TODO_TITLE).value;
    var data = "todo_title=" + encodeURI(title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === RESPONSE_DONE && xhr.status === STATUS_OK) {
            // console.log(xhr.responseText);
            show_todo_elements(xhr.responseText);
        }
    };
    xhr.send(data);
}

function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function() {
        //code that needs to be run after response arrives

        if (xhr.readyState === RESPONSE_DONE && xhr.status === STATUS_OK) {
                // console.log(xhr.responseText);
                show_todo_elements(xhr.responseText);
            }
        };
    xhr.send(data);
}

function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_status=COMPLETE";
    xhr.onreadystatechange = function() {
        //code that needs to be run after response arrives

        if (xhr.readyState === RESPONSE_DONE && xhr.status === STATUS_OK) {
            // console.log(xhr.responseText);
            show_todo_elements(xhr.responseText);
        }
    };
    xhr.send(data);
}
