function createBox(title,des,date,priority, project, todoId) {
    const box = document.createElement('div');
    box.classList.add('todo-box');
    box.dataset.id = todoId;
    const h2 = document.createElement('h2');
    h2.classList.add('title');
    h2.textContent = title;
    const h3 = document.createElement('h3');
    h3.classList.add('description');
    h3.textContent = des;
    const time = document.createElement('p');
    time.classList.add('date');
    time.textContent = date;
    const prio = document.createElement('p');
    prio.classList.add('priority');
    prio.textContent = 'Priority: ' + priority;
    const proj = document.createElement('p');
    proj.classList.add('project');
    proj.textContent = 'Project: ' + project;
    const check = document.createElement('button');
    check.classList.add('check');
    check.textContent = 'Mark Complete';
    const del = document.createElement('button');
    del.classList.add('delete');
    del.textContent = 'Delete';
    box.append(h2,h3,time,prio,proj,check,del);
    return box;
}

export { createBox }