class project {
    constructor(name) {
        this.name = name;
        this.id = Date.now().toString();
        this.todolist = new Array();
    }
}

class todo {
    constructor(name, des, date, priority) {
        this.name = name;
        this.des = des;
        this.date = date;
        this.priority = priority;
        this.complete = false;
        this.id = Date.now().toString();
    }
}

export { project, todo }