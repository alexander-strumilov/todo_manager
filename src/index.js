import './sass/main.scss';

import * as Modal from '../src/parts/modal.js';
import * as ElementConstructor from '../src/parts/createnode.js';
import * as PreLoader from '../src/parts/preloader.js';

const addTaskBtn = document.querySelector('.task-block__btn_add'),
    taskInput = document.querySelector('.task-block__input-value'),
    taskList = document.querySelector('.task-list'),
    clearTasksBtn = document.querySelector('.task-block__btn_clear');

const uploadSavedData = () => {
    return new Promise((resolve,reject) => {
        console.log('Loading data...');
        let savedData = JSON.parse(localStorage.getItem('tasks'));
        if (savedData !== null) {
            resolve(savedData);
        } else if (savedData === null) {
            reject(savedData);
        }
    }).then(savedData => {
        Modal.closeModal();
        setTimeout(() => {
            load(savedData);
            console.log(`Data has been loaded.`);
            console.log(savedData);
        }, 3000);
        PreLoader.showLoader();
        setTimeout(() => {
            PreLoader.hideLoader();
        }, 3000);
    }).catch(savedData => {
        console.error(`Error: Data has not been loaded. It is ${savedData}.`);
        Modal.modalWindow.innerHTML = '<h2>There is no data saved yet :(<br>Start from the beginning</h2>';
        setTimeout(() => {
            Modal.closeModal(); 
        }, 2000);
        // return false;
    })
} 

let data = [];

function createNewTaskNode(value,index) {
    let taskItem = new ElementConstructor.Component('li','task-list__item',value).element;
    let closeBtn = new ElementConstructor.Component('span','task-list__item-close','&#10008;').element;
    let checkTask = new ElementConstructor.Component('input','task-list__item-check','').element;
    checkTask.type = "checkbox";
    taskItem.appendChild(closeBtn);
    taskItem.appendChild(checkTask);
    if (!data[index].visible) {
        taskItem.classList.add('task-list__item_done');
        checkTask.checked = true;
    }
    return taskItem;
}

// Распределить сохраненные данные по списку (если они есть)
function load(loadData) {
    let i = 0;
    while (i < loadData.length) {
        data.push(loadData[i]);
        taskList.appendChild(createNewTaskNode(data[i].value,i));
        i++;
    }
}
// Добавить задачу
function addTask(val) {
    if (val !== "") {
        data.push({
            'value': val,
            'visible': true
        });
        taskList.appendChild(createNewTaskNode(val,data.length-1));
        taskInput.value = '';
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
    }
    updateStorage();
}

function checkTask(e) {
    let tasks = document.getElementsByClassName('task-list__item'),
        tasksCheck = document.getElementsByClassName('task-list__item-check'),
        target = e.target;
    for (let i = 0; i < tasksCheck.length; i++) {
        if (tasksCheck[i] == target) {
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
Modal.modalWindowBtns.addEventListener('click', (e) => {
    if (e.target.matches('button.modal-window__btn_yes')) {
        uploadSavedData();
    } else if (e.target.matches('button.modal-window__btn_no')) {
        Modal.modalWindow.innerHTML = '<h2>Okay :(<br>Start from the beginning...</h2>';
        setTimeout(() => {
            Modal.closeModal(); 
            localStorage.clear();
            taskList.innerHTML = '';
        }, 2000);
    }
});

addTaskBtn.addEventListener('click', () => {
    addTask(taskInput.value);
});

taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', checkTask);

clearTasksBtn.addEventListener('click', () => {
    localStorage.clear();
    data = [];
    taskList.innerHTML = '';
});