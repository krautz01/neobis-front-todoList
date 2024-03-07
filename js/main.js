const addTaskInput = document.getElementById("addTaskInput");
const todoList = document.getElementById("todoList");

let tasks = []; // массив для хранения задач

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem.apply("tasks"));
}

tasks.forEach(function (task) {
  const cssClass = task.done
    ? "todoList_item_text--done"
    : "todoList_item_text";

  const taskHTML = `<li class="todoList_item" id="${task.id}">
      <input type="radio" data-action="done"/>
      <p class="${cssClass}">${task.text}</p>
           <span class="todoList_item_buttons">
              <button class="todoList_item_button_edit" data-action="edit">Edit</button>
              <button class="todoList_item_button_delete" data-action="delete">Delete</button>
           </span>
           </li>
        `;
  todoList.insertAdjacentElement("beforeend", taskHTML);
});

todoList.addEventListener("click", deleteTask);
todoList.addEventListener("click", doneTask);

function addTask() {
  const taskText = addTaskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);
  console.log(tasks);

  const cssClass = newTask.done
    ? "todoList_item_text--done"
    : "todoList_item_text";

  const taskHTML = `<li class="todoList_item" id="${newTask.id}">
      <input type="radio" data-action="done"/>
      <p class="${cssClass}">${newTask.text}</p>
           <span class="todoList_item_buttons">
              <button class="todoList_item_button_edit" data-action="edit">Edit</button>
              <button class="todoList_item_button_delete" data-action="delete">Delete</button>
           </span>
           </li>
        `;
  todoList.insertAdjacentElement("beforeend", taskHTML);

  saveToLocalStorage();
  addTaskInput.value = "";
  addTaskInput.focus();
}

function deleteTask(event) {
  if (event.target.dataset.action !== "delete") {
    return;
  }

  const parentNode = event.target.closest("li");
  const id = Number(parentNode.id);

  tasks = tasks.filter((task) => task.id !== id);

  if (event.target.dataset.action === "delete") {
    parentNode.remove();
  }
  saveToLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest("li");
  const id = Number(parentNode.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  const taskTitle = parentNode.querySelector(".todoList_item_text");
  taskTitle.classList.toggle("todoList_item_text--done");
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
