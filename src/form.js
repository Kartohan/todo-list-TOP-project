const form = document.createElement('form');

class text {
    constructor(name){
        this.name = name;
    }
    create(){
        const box = document.createElement('div');
        box.classList.add('input-box');
        const label = document.createElement('label');
        label.setAttribute('for',`${this.name}`);
        label.textContent = `${this.name}`;
        const input = document.createElement('input');
        input.setAttribute('type',`text`);
        input.setAttribute('name',`${this.name}`);
        input.setAttribute('id',`${this.name}`);
        box.append(label,input);
        form.append(box);
    }
}

class date {
    constructor(name){
        this.name = name;
    }
    create(){
        const box = document.createElement('div');
        box.classList.add('input-box');
        const label = document.createElement('label');
        label.setAttribute('for',`${this.name}`);
        label.textContent = `${this.name}`;
        const input = document.createElement('input');
        input.setAttribute('type',`datetime-local`);
        input.setAttribute('name',`${this.name}`);
        input.setAttribute('id',`${this.name}`);
        box.append(label,input);
        form.append(box);
    }
}

class select {
    constructor(name, ...options){
        this.name = name;
        this.options = options;
    }
    create(){
        const box = document.createElement('div');
        box.classList.add('input-box');
        const label = document.createElement('label');
        label.setAttribute('for',`${this.name}`);
        label.textContent = `${this.name}`;
        const select = document.createElement('select');
        select.setAttribute('name',`${this.name}`);
        select.setAttribute('id',`${this.name}`);
        for (let i = 0; i < this.options.length; i++) {
            const option = document.createElement('option');
            option.value = this.options[i];
            option.textContent = this.options[i];
            select.append(option);
        }
        box.append(label, select);
        form.append(box);
    }
}

class btn {
    constructor(name){
        this.name = name;
    }
    create(){
        const box = document.createElement('div');
        box.classList.add('input-box');
        const btn = document.createElement('button');
        btn.setAttribute('type',`submit`);
        btn.textContent = 'Add Task';
        box.append(btn);
        form.append(box);
    }
}

function createInputs(inputs) {
    inputs.forEach(input => {
        input.create();
    })
}

let input = [
    new text('Title'),
    new text('Description'),
    new date('Date'),
    new select('Priority', 'High', 'Medium', 'Low'),
    new select('Project'),
    new btn('Add Task')
];

createInputs(input);


export { form };