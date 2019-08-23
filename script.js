const addTaskBtn = document.querySelector('.task-block__btn_add'),
    data = [],
    taskInput = document.querySelector('.task-block__input-value'),
    taskList = document.querySelector('.task-list'),
    taskWrap = document.querySelector('.task-block'),
    taskElement = {
        li: 'li',
        liClass: 'task-list__item',
        liAttr: 'data-index',
        span: 'span',
        spanClass: 'task-list__item-close',
        spanContent: '\2718',
        create: function (value, i) {
            let li = document.createElement(this.li),
                span = document.createElement(this.span);
            span.classList.add(this.spanClass);
            span.innerHTML = '&#10008;'
            li.classList.add(this.liClass);
            li.setAttribute(this.liAttr, i)
            li.innerHTML = `Задача «${value}» создана.`,
                li.appendChild(span);
            taskList.appendChild(li);
        }
}

function init() {
    if (localStorage.getItem('tasks')) {
        const initData = JSON.parse(localStorage.getItem('tasks'));
        let i = 0;
        let tasks = document.querySelectorAll('.taskList li');
        while (i < initData.length) {
            data.push(initData[i]);
            taskElement.create(initData[i].value, i)
            i++;
        }
    }
}
init();

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});
taskList.addEventListener('click', removeTask)

function addTask(val) {
    taskElement.create(val, data.length)
    data.push({
        'value': val,
        'visible': true
    });
    taskInput.value = ''
    updateStorage(data);
}

function removeTask(e) {
    let tasks = document.getElementsByClassName('task-list__item'),
        tasksClose = document.getElementsByClassName('task-list__item-close'),
        target = e.target;
    for (let i = 0; i < tasksClose.length; i++) {
        if (tasksClose[i] == target && tasks[i].matches('li.task-list__item')) {
            data.splice(i, 1);
            taskList.removeChild(tasks[i])
        }
        if (tasks[i] == target && tasks[i].matches('li.task-list__item')) {
            if (tasks[i].classList.contains('task-list__item_done')) {
                tasks[i].classList.remove('task-list__item_done')
            } else {
                tasks[i].classList.add('task-list__item_done')
            }
        }
    }
    updateStorage(data);
}

function updateStorage(arg) {
    localStorage.setItem('tasks', JSON.stringify(arg));
}