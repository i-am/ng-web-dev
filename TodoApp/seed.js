var StatusEnums = {
    ACTIVE: "ACTIVE",
    COMPLETE: "COMPLETE",
    DELETED: "DELETED"
};

var todos = {
    1: {title: "learn javascript", status: StatusEnums.ACTIVE},
    2: {title: "git tutorial", status: StatusEnums.ACTIVE},
    3: {title: "Interactive git", status: StatusEnums.ACTIVE}
};

var next_todo_id = 4;

module.exports = {
    StatusEnums: StatusEnums,
    todos: todos,
    next_todo_id: next_todo_id
};