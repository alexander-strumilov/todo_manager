const data = [],
    addTaskBtn = document.querySelector('.task-block__btn_add'),
    taskInput = document.querySelector('.task-block__input-value'),
    taskList = document.querySelector('.task-list'),
    taskWrap = document.querySelector('.task-block'),
    taskElement = {
        li: 'li',
        liClass: 'task-list__item',
        liAttr: 'data-index',
        span: 'span',
        spanClass: 'task-list__item-close',
        create: function (value, i) {
            let li = document.createElement(this.li),
                span = document.createElement(this.span);
            span.classList.add(this.spanClass);
            span.innerHTML = '&#10008;'
            li.classList.add(this.liClass);
            li.setAttribute(this.liAttr, i)
            li.innerHTML = `Задача: <span>«${value}»</span>.`,
            li.appendChild(span);
            return li;
        }
    }

init();

function init() {
    if (localStorage.getItem('tasks')) {
        const initData = JSON.parse(localStorage.getItem('tasks'));
        let i = 0;
        while (i < initData.length) {
            data.push(initData[i]);
            let element = taskElement.create(data[i].value, i);
            taskList.appendChild(element);
            if (!data[i].visible) {
                element.classList.add('task-list__item_done');
            }
            i++;
        }
    }
}
// Добавить задачу
function addTask(val) {
    if (val !== "") {
        let element = taskElement.create(val, data.length);
        taskList.appendChild(element);
        data.push({
            'value': val,
            'visible': true
        });
        taskInput.value = ''
        updateStorage();
    }
}
// Удалить или вычеркнуть задачу
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
            data[i].visible = !data[i].visible;
            if (tasks[i].classList.contains('task-list__item_done')) {
                tasks[i].classList.remove('task-list__item_done');
            } else {
                tasks[i].classList.add('task-list__item_done');
            }
        }
    }
    updateStorage();
}
// Обновить хранилище
function updateStorage() {
    localStorage.setItem('tasks', JSON.stringify(data));
}

// Обработчики
addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});
taskList.addEventListener('click', removeTask)