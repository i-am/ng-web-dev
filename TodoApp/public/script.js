console.log("script loaded");
const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID = "todo_list_div";

function show_todo_elements(id, todo_data_json) {
    var parent = document.getElementById(id);
    parent.innerText = todo_data_json;
}
function GetTodoAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === RESPONSE_DONE && xhr.status === STATUS_OK) {
            console.log(xhr.responseText);
            show_todo_elements(TODO_LIST_ID, xhr.responseText);
        }
    };
    xhr.send(data=null);
}