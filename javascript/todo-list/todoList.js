// Get the elements
const addTodoButton = document.querySelector(".js-add-button");
const inputElement = document.querySelector(".js-name-input");
const dateInputElement = document.querySelector(".js-due-date-input");
const colorButtons = document.querySelectorAll(".theme");
const footer = document.querySelector("footer");

// Themes
const themeColors = {
  lightblue : 'rgb(0, 191, 255)',
  lightgreen : 'rgb(0, 245, 0)',
  'rgb(233, 233, 144)' : 'rgb(207, 207, 10)',
  'rgb(228, 186, 228)' : 'rgb(199, 58, 199)'
}

// Local Storage

const todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    name: "Put your todo list above ☝️",
    dueDate: "",
    done: false,
  },
  {
    name: "Do it and check them ✔️",
    dueDate: "",
    done: false,
  },
  {
    name: "YOU RULE IT!! 🏆",
    dueDate: "",
    done: true,
  },
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate, done } = todoObject;
    const html = `

    <div>
      <input type="checkbox" id="i${index}" name="${index}" value="${name}"
       ${done === true ? "checked" : ""}
      >
      <label for="i${index}">${name}</label>
    </div>
    <div>${dueDate}</div>
    <button class="delete-todo-button js-delete-todo-button">
        <img src="./images/delete.png" alt="delete">
    </button> 
      `;
    todoListHTML += html;
  });

  document.querySelector(".js-todo-list").innerHTML = todoListHTML;

  document
    .querySelectorAll(".js-delete-todo-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });

    document.querySelectorAll(`input[type="checkbox"]`).forEach((checkbox) => {
      checkbox.addEventListener("change", handleCheck);
    });
}

addTodoButton.addEventListener("click", addTodo);

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const name = inputElement.value;
  console.log(name);

  if (name === "") {
    alert("Todo name is required!");
    return;
  }

  const dueDate = dateInputElement.value;
  console.log(dueDate);

  todoList.push({
    // é a mesma coisa que
    //name: name,
    //dueDate: dueDate,
    name,
    dueDate,
    done: false,
  });

  inputElement.value = "";

  saveLocalStorage(todoList);
  renderTodoList();
}

function saveLocalStorage(todoList) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function handleCheck() {
  // takes the i from the id
  let index = this.id.substring(1, this.id.length);
  console.log(index);
  todoList[index].done = !todoList[index].done;
  console.log(todoList[index].done);
  saveLocalStorage(todoList);
}

colorButtons.forEach((button) => {
  button.addEventListener("click", changeBackground);
});

function changeBackground() {
  color = this.dataset.color;
  highlightColor = themeColors[color];
  document.body.style.backgroundColor = color;
  addTodoButton.style.backgroundColor = highlightColor;
  footer.style.backgroundColor = highlightColor;
}
