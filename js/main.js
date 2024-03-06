const addTaskInput = document.getElementById("addTaskInput");
const todoList = document.getElementById("todoList");

function addTask() {
  const li = document.createElement("li");
  const task = addTaskInput.value;
  if (task === "") {
    alert("You must write something!");
  } else {
    li.classList.add("todoList_item");
    li.innerHTML = `
    <input type="radio" data-action="done"/>
    <p class="todoList_item_text">${task}</p>
         <span class="todoList_item_buttons">
            <button class="todoList_item_buttons_edit" data-action="edit">Edit</button>
            <button class="todoList_item_buttons_delete" data-action="delete">Delete</button>
         </span>
      `;
    todoList.insertAdjacentElement("beforeend", li);
    console.log(task);
  }
  addTaskInput.value = "";
  addTaskInput.focus();
}

todoList.addEventListener("click", deleteTask);
todoList.addEventListener("click", doneTask);

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    event.target.closest("li").remove();
  }
}

function doneTask(event) {
  if (event.target.dataset.action === "done") {
    console.log("ghvjhbbj7777777777777");
    event.target.nextElementSibling.classList.toggle(
      "todoList_item_text--done"
    );
  }
}
