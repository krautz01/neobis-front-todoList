const nAme = "John";

const addTaskInput = document.querySelector("#addTaskInput");
const todoList = document.querySelector("#todoList");
let tasks = [];
// Загрузка задач из localStorage при загрузке страницы
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
// Отображение задач при загрузке страницы
tasks.forEach(function (task) {
  const cssClass = task.done
    ? "todoList_item_text--done"
    : "todoList_item_text";
  const taskHTML = `<li class="todoList_item" id="${task.id}">
      <input type="radio" data-action="done"/>
      <p class="${cssClass}">${task.text}</p>
      <span class="todoList_item_buttons">
        <button class="todoList_item_button_edit" data-action="edit">Edit</button>
        <button class="todoList_item_button_delete" data-action="delete" data-task-id="${task.id}">Delete</button>
      </span>
    </li>`;
  todoList.insertAdjacentHTML("beforeend", taskHTML);
});
// Обработчик событий для списка задач
todoList.addEventListener("click", handleTaskAction);
// Функция обработки действий с задачей (удаление или выполнение)
function handleTaskAction(event) {
  if (event.target.dataset.action === "delete") {
    deleteTask(event);
  } else if (event.target.dataset.action === "done") {
    doneTask(event);
  }
}
// Функция добавления задачи
function addTask() {
  const taskText = addTaskInput.value;
  if (taskText === "") {
    alert("Please enter a task");
  } else {
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
    tasks.push(newTask);
    saveToLocalStorage();
    const cssClass = newTask.done
      ? "todoList_item_text--done"
      : "todoList_item_text";
    const taskHTML = `<li class="todoList_item" id="${newTask.id}">
        <input type="radio" data-action="done"/>
        <p class="${cssClass}">${newTask.text}</p>
        <span class="todoList_item_buttons">
          <button class="todoList_item_button_edit" data-action="edit">Edit</button>
          <button class="todoList_item_button_delete" data-action="delete" data-task-id="${newTask.id}">Delete</button>
        </span>
      </li>`;
    todoList.insertAdjacentHTML("beforeend", taskHTML);
    addTaskInput.value = "";
    addTaskInput.focus();
  }
}
// Функция удаления задачи
function deleteTask(event) {
  const taskId = Number(event.target.dataset.taskId);
  tasks = tasks.filter((task) => task.id !== taskId);
  saveToLocalStorage();
  const parentNode = event.target.closest("li");
  parentNode.remove();
}
// Функция выполнения
function doneTask(event) {
  const parentNode = event.target.closest("li");
  const taskId = Number(parentNode.id);
  const task = tasks.find((task) => task.id === taskId);
  task.done = !task.done;
  saveToLocalStorage();
  const taskTitle = parentNode.querySelector(".todoList_item_text");
  taskTitle.classList.toggle("todoList_item_text--done");
}
// Функция сохранения задач в localStorage
function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Обработчик события для добавления задачи
addTaskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
