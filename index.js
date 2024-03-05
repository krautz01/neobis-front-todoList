const addTaskInput = document.getElementById("addTaskInput"); // получаем доступ к полю ввода
const todoList = document.getElementById("todoList"); // получаем доступ к списку задач

function addTask() {
  const task = addTaskInput.value;
  if (task === "") {
    alert("You must write something!"); // если поле ввода пустое, то выводим сообщение
  } else {
    let li = document.createElement("li"); // создаем новый элемент div
    li.classList = "todoList_item"; // добавляем класс для нового элемента
    /* li.innerHTML = addTaskInput.value; */
    todoList.appendChild(li); // добавляем новый элемент в конец списка

    let img = document.createElement("img"); // создаем новый элемент img
    img.src = "\u00d7"; // добавляем путь к картинке

    let text = document.createElement("p");
    text.innerHTML = addTaskInput.value;

    let div = document.createElement("div"); // создаем новый элемент div
    div.classList = "todoList_item_actions"; // добавляем класс для нового элемента
    div.innerHTML =
      '<button class="todoList_item_editBTN" onclick="editTask(this)">Edit</button> <button class="todoList_item_deleteBTN" onclick="deleteTask(this)">Delete</button>';
    li.appendChild(div);
  }
  addTaskInput.value = ""; //очищаем поле ввода
}
