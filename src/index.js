import './style.css';
import { project, todo } from './projects.js';

const projectListContainer = document.querySelector('.project-list');
const todoBlock = document.querySelector('.todo');
const todoListContaier = document.querySelector('.todo-list')
const addProjectForm = document.querySelector('.project-add-form');
const projectAddInput = document.querySelector('.project-add-input');
const todoAddForm = document.querySelector('.todo-add-form');
const todoAddTitleInput = document.getElementById('title');
const todoAddDesInput = document.getElementById('des');
const todoAddDateInput = document.getElementById('date');
const todoAddPriorityInput = document.getElementById('priority');
const todoTemplate = document.querySelector('.task-template');
const projectTitle = document.querySelector('.project-title');
const changeTemplate = document.querySelector('.change-template');

const projList = new Array();
let selectedListId = Date.now().toString();

todoAddForm.addEventListener('submit', e => {
    e.preventDefault();
    let todoItem = new todo(todoAddTitleInput.value, todoAddDesInput.value, todoAddDateInput.value, todoAddPriorityInput.value);
    let proj = projList.find(proj => proj.id === selectedListId);
    proj.todolist.push(todoItem);
    todoAddTitleInput.value = '';
    todoAddDesInput.value = '';
    todoAddDateInput.value = '';
    todoAddPriorityInput.value = 'High';
    let selectedProj = projList.find(proj => proj.id === selectedListId);
    modal.classList.toggle("show-modal");
    renderTodo(selectedProj);
})

addProjectForm.addEventListener('submit', e => {
    e.preventDefault();
    if (projectAddInput.value == null || projectAddInput.value === '') {
        return
    } else {
        let item = new project(projectAddInput.value);
        projList.push(item);
        projectAddInput.value = '';
    }
    render();
})

projectListContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedListId = e.target.dataset.projectid;
    }
    let selectedProj = projList.find(proj => proj.id === selectedListId)
    render();
    renderTodo(selectedProj);
})

todoListContaier.addEventListener('click', e => {
    let selectedProj = projList.find(proj => proj.id === selectedListId);
    if (e.target.className === 'delete') {
        let proj = selectedProj.todolist.filter(todo => todo.id !== e.path[2].dataset.id);
        selectedProj.todolist = proj;
        renderTodo(selectedProj);
    } else if (e.target.className === 'priority') {
        let selectedTodo = selectedProj.todolist.find(todo => todo.id === e.path[2].dataset.id);
        switch (selectedTodo.priority) {
            case 'High': selectedTodo.priority = 'Low';
            break;
            case 'Medium': selectedTodo.priority = 'High';
            break;
            case 'Low': selectedTodo.priority = 'Medium';
            break;
        }
        renderTodo(selectedProj);
    } else if (e.target.className === 'check') {
        let selectedTodo = selectedProj.todolist.find(todo => todo.id === e.path[2].dataset.id);
        if (selectedTodo.complete === false) {
            selectedTodo.complete = true;
        } else {
            selectedTodo.complete = false;
        }
        renderTodo(selectedProj);
    } else if (e.target.className === 'change') {
        let selectedTodo = selectedProj.todolist.find(todo => todo.id === e.path[2].dataset.id);
        selectedTodo.change = true;
        renderTodo(selectedProj);
    } else if (e.target.className === 'change-btn') {
        let selectedTodo = selectedProj.todolist.find(todo => todo.id === e.path[2].dataset.id);
        const selectedTask = document.querySelector(`[data-id='${selectedTodo.id}']`);
        const changeTitle = selectedTask.querySelector('#change-title');
        const changeDes = selectedTask.querySelector('#change-des');
        const changeDate = selectedTask.querySelector('#change-date');
        selectedTodo.name = changeTitle.value;
        selectedTodo.des = changeDes.value;
        selectedTodo.date = changeDate.value;
        selectedTodo.change = false;
        renderTodo(selectedProj);
    }
})


function renderTodo(selectedList) {
    clearElement(todoListContaier);
    projectTitle.innerText = selectedList.name;
    selectedList.todolist.forEach(todo => {
        if (todo.change === false) {
        const todoEl = document.importNode(todoTemplate.content, true);
        const container = todoEl.querySelector('.task');
        const todoTitle = todoEl.querySelector('.todo-title');
        const todoDes = todoEl.querySelector('.todo-des');
        const todoDate = todoEl.querySelector('.todo-date');
        const todoPriorityBtn = todoEl.querySelector('.priority');
        const todoCheckBtn = todoEl.querySelector('.check');
        todoTitle.innerText = todo.name;
        todoDes.innerText = todo.des;
        todoDate.innerText = todo.date;
        container.dataset.id = todo.id;
        todoPriorityBtn.innerText = `Priority: ${todo.priority}`;
        if (todo.complete === true) {
            container.classList.add('done');
            todoCheckBtn.innerText = 'Mark uncomplete';
        }
        todoListContaier.append(todoEl);
    } else if (todo.change === true) {
        const changeEl = document.importNode(changeTemplate.content, true);
        const inputTitle = changeEl.getElementById('change-title');
        const inputDes = changeEl.getElementById('change-des');
        const inputDate = changeEl.getElementById('change-date');
        const container = changeEl.querySelector('.task');
        container.dataset.id = todo.id;
        inputTitle.value = todo.name;
        inputDes.value = todo.des;
        inputDate.value = todo.date;
        todoListContaier.append(changeEl);
    }
    })
}

function render() {
    clearElement(projectListContainer);
    projList.forEach(proj => {
        if (proj.id === selectedListId) {
            let li = createLi(proj.id, proj.name);
            li.classList.add('active-list')
            projectListContainer.append(li);
        } else {
            let li = createLi(proj.id, proj.name);
            projectListContainer.append(li);
        }
        if (selectedListId == null || selectedListId === '') {
            todoBlock.style.display = 'none';
        } else {
            todoBlock.style.display = 'flex';
        }
    })
}

function createLi(id, text) {
    const li = document.createElement('li');
    li.dataset.projectid = id;
    li.innerText = text;
    return li;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

projList.push(new project('default'));
projList[0].todolist.push(new todo('My first Todo', 'Description', new Date(), 'High'));
render();
renderTodo(projList.find(list => list.id === selectedListId))


const modal = document.querySelector(".todo-inputs");
const trigger = document.querySelector(".add-todo-button");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);