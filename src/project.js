import { todo } from './todo.js';

class projectsObj {
    constructor() {
        this.projects = new Array();
    }
    projectsCounter = 0;
    todosCount = 0;
    set createProject(name) {
        let proj = new project(name);
        this.projects.push(proj);
        proj.setId = this.projectsCounter;
        this.projectsCounter++;
    }
    set removeProject(id) {
        let index = this.projects.findIndex((i) => i.id === id);
        if (index === -1) {
            return
        } else {
            this.projects.splice(index, 1);
        }
    }
    makeTodo(title, des, date, priority, project) {
        let item = new todo(title, des, date, priority);
        item.setId = this.todosCount;
        this.todosCount++;
        this.projects[project].setTodo = item;
    }
    removeTodo(projectId, todoId) {
        let index = this.projects[projectId].todolist.findIndex((i) => i.id === todoId)
        if (index === -1) {
            return
        } else {
            this.projects[projectId].todolist.splice(index, 1);
        }
    }
}

class project {
    constructor(name) {
        this.name = name;
        this.todolist = new Array();
        this.id = 0;
    }

    set changeName(name) {
        this.name = name;
    }

    set setTodo(todo) {
        this.todolist.push(todo);
    }

    set setId(id) {
        this.id = id;
    }

    get getname() {
        return this.name;
    }
    
    get getTodolist() {
        return this.todolist;
    }

    get getId() {
        return this.id;
    }
}

export { projectsObj }