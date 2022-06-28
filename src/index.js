import './style.css';
import { projectsObj } from './project.js';
import { form } from './form.js';
import { createBox } from './todo-list';

const body = document.querySelector('body');
const main = document.createElement('div');
main.classList.add('todo-main');
body.append(form)


let projects = new projectsObj();
projects.createProject = 'default';
projects.makeTodo('title', 'dsdd', '2101', 'High', 0);
projects.makeTodo('title', 'dsdd', '2101', 'High', 0);
projects.makeTodo('title', 'dsdd', '2101', 'High', 0);
projects.projects[0].todolist[0].changeTitle = 'Howdy!';
projects.projects[0].todolist[0].changeDes = 'asfafasda';


const select = document.getElementById('Project');
for (let i = 0; i < projects.projects.length; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = projects.projects[i].name;
    select.append(option);
}

form.addEventListener('submit', addTask)

function addTask(e) {
    e.preventDefault();
    const title = document.getElementById('Title');
    const des = document.getElementById('Description');
    const date = document.getElementById('Date');
    const priority = document.getElementById('Priority');
    const project = document.getElementById('Project');

    projects.makeTodo(title.value, des.value, date.value, priority.value, project.value);
    render(0);
}

function render(proj) {
    main.innerHTML = '';
   projects.projects[proj].getTodolist.forEach(todo => {
       main.append(createBox(todo.gettitle, todo.getdes, todo.getdate, todo.getpriority, projects.projects[proj].name, todo.thisId))
   })
}
render(0);
body.append(main)
