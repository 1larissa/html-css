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



// renderList();

// function addTodo() {
//     let inputElement = document.querySelector('.js-name-input');
//     let name = inputElement.value;
//     let inputDateElement = document.querySelector('.js-due-date-input');
//     let dueDate = inputDateElement.value;

//     todoList.push({
//         // name: name,
//         // dueDate: dueDate
//         // ou
//         name,
//         dueDate
//     });
//     inputElement.value = '';

//     renderList();

// }
// function renderList() {

//     let todoListHTML = '';

//     todoList.forEach((todoObject) => {
//         console.log('for each');
//         const { name, dueDate } = todoObject;
//         const html = `
//             <div>${name}</div>
//              <div>${dueDate}</div>
//                 <button class="delete-todo-button js-delete-todo-button">Delete</button>
//         `;
//         todoListHTML += html;
//     });

//     document.querySelector('.js-todo-list').innerHTML = todoListHTML;

//     document.querySelector('.js-add-button').addEventListener('click', () => {
//         addTodo();
//     });

//     document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
//         deleteButton.addEventListener('click', () => {
//             todoList.splice(index, 1);
//             renderList();
//         });
//     })
// }

// function saveLocalStorageTodoList(object) {

//     localStorage.setItem('todoList', JSON.stringify(object));
// }
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
}

document.querySelector(".js-add-button").addEventListener("click", () => {
  addTodo();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const inputElement = document.querySelector(".js-name-input");
  const name = inputElement.value;
  console.log(name);

  if (name === "") {
    alert("Todo name is required!");
    return;
  }

  const dateInputElement = document.querySelector(".js-due-date-input");
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
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheck);
  });
}

function saveLocalStorage(todoList) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);  

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', handleCheck);
});

function handleCheck(){
  // takes the i from the id
  let index = (this.id).substring(1, this.id.length);
  console.log(index);
  todoList[index].done = !todoList[index].done;
  console.log(todoList[index].done); 
  saveLocalStorage(todoList);
}