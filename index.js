// get HTML elements
const addBtn = document.getElementById("add-butn");
const textBox = document.getElementById("text-box");
const displayArea = document.getElementById("display-area");

// initialize an empty array for todos
let todos = [];

// retrieve todolist from local storage
if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
}

// display todolist on page load
displayTodos();

// function for adding an item to todolist
const addNewTodo = () => {
  const todoText = textBox.value; // gets text from textbox

  //check if textbox is empty
  if (todoText === "") {
    alert("You can't add an empty task!");
    return;
  }

  // add todo to array
  todos.push({ text: todoText, isEditing: false });
  todoText;

  localStorage.setItem("todos", JSON.stringify(todos)); // saves todos to local storage
  displayTodos(); // display todolist
  textBox.value = ""; // clear textbox
};

// function for deleting and editing an item on todos
const deleteAndEdit = (e) => {
  // check if delete button is clicked
  if (e.target.classList.contains("delete")) {
    // get index of todo to delete
    const index = e.target.parentElement.getAttribute("data-index");

    // remove todo from array
    todos.splice(index, 1);

    // save todos to local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    // display todolist
    displayTodos();
  }

  // check if edit button is clicked
  if (e.target.classList.contains("edit")) {
    // get index of todo to edit
    const index = e.target.parentElement.getAttribute("data-index");

    // toggle editing mode
    todos[index].isEditing = !todos[index].isEditing;

    // if isEditing is false, update label with todo text
    if (!todos[index].isEditing) {
      const label = e.target.parentElement.querySelector(".text");
      const editText = label.textContent.trim();
      todos[index].text = editText;

      // save todolist to local storage
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    // display todolist
    displayTodos();
  }
};

// event listener for add button
addBtn.addEventListener("click", addNewTodo);

// event listener for delete and edit buttons
displayArea.addEventListener("click", deleteAndEdit);

// function to display todolist
function displayTodos() {
  displayArea.innerHTML = ""; // clear display area

  // loop through todolist and display them
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];

    // create todo item
    const todoItem = document.createElement("div");
    todoItem.classList.add("lists-holder");
    todoItem.setAttribute("data-index", i);

    // create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `list-item-${i}`);
    checkbox.checked = !todo.isEditing;
    checkbox.disabled = todo.isEditing;

    // create label
    const label = document.createElement("label");
    label.setAttribute("for", `list-item-${i}`);
    label.classList.add("text");
    label.textContent = todo.text;
    label.contentEditable = true;

    // create edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = todo.isEditing ? "Save" : "Edit";

    // create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";

    // append elements to todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(label);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);

    // append todo item to display area
    displayArea.appendChild(todoItem);
  }
}