class todo {
    constructor( title, des, date, priority ){
        this.title = title;
        this.des = des;
        this.date = date;
        this.priority = priority;
        this.checklist = new Array();
        this.id = 0;
    }

    set addChecklist(list) {
        this.checklist.push(list);
    }

    set addNotes(note) {
        this.note = note;
    }

    set changeTitle(title) {
        this.title = title;
    }

    set changeDes(des) {
        this.des = des;
    }

    set changeDate(date) {
        this.date = date;
    }

    set changePriority(priority) {
        this.priority = priority;
    }

    set setId(id) {
        this.id = id;
    }

    get getchecklist() {
        return this.checklist;
    }

    get getnotes() {
        return this.notes;
    }

    get gettitle() {
        return this.title;
    }

    get getdes() {
        return this.des;
    }

    get getdata() {
        return this.data;
    }
    
    get getpriority() {
        return this.priority;
    }

    get thisId() {
        return this.id;
    }
}

export { todo };