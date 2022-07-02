import style from './style.css';
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

const projList = new Array();
let selectedListId = '';

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
        selectedListId = e.target.dataset.id;
    }
    let selectedProj = projList.find(proj => proj.id === selectedListId)
    render();
    renderTodo(selectedProj);
})

function renderTodo(selectedList) {
    clearElement(todoListContaier);
    projectTitle.innerText = selectedList.name;
    selectedList.todolist.forEach(todo => {
        const todoEl = document.importNode(todoTemplate.content, true);
        const todoTitle = todoEl.querySelector('.todo-title');
        const todoDes = todoEl.querySelector('.todo-des');
        const todoDate = todoEl.querySelector('.todo-date');
        const todoPriorityBtn = todoEl.querySelector('.priority');
        todoTitle.innerText = todo.name;
        todoDes.innerText = todo.des;
        todoDate.innerText = todo.date;
        todoPriorityBtn.innerText = `Priority: ${todo.priority}`;
        todoListContaier.append(todoEl);
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
    li.dataset.id = id;
    li.innerText = text;
    return li;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

projList.push(new project('default'));
projList[0].todolist.push(new todo('My first Todo', 'Description', '22.02.2022 21:22', 'High'));
render();


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