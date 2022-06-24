import './style.css';
import { projectsObj } from './project.js';


let projects = new projectsObj();
projects.createProject = 'default';
projects.makeTodo('title', 'dsdd', '2101', 'High', 0);
projects.makeTodo('title', 'dsdd', '2101', 'High', 0);
projects.makeTodo('title', 'dsdd', '2101', 'High', 0);
projects.projects[0].todolist[0].changeTitle = 'Howdy!';
projects.projects[0].todolist[0].changeDes = 'asfafasda';

