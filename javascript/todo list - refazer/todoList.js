// const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
//     name: 'make lunch',
//     dueDate: '2022-03-12'
// },
// {
//     name: 'make janta',
//     dueDate: '2022-03-12'
// }];

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

const todoList = [{
    name: 'make dinner',
    dueDate: '2022-12-22'
  }, {
    name: 'wash dishes',
    dueDate: '2022-12-22'
  }];
  
  renderTodoList();
  
  function renderTodoList() {
    let todoListHTML = '';
  
    todoList.forEach((todoObject, index) => {
      const { name, dueDate } = todoObject;
      const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button> 
      `;
      todoListHTML += html;
    });
  
    document.querySelector('.js-todo-list')
      .innerHTML = todoListHTML;
  
    document.querySelectorAll('.js-delete-todo-button')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
          todoList.splice(index, 1);
          renderTodoList();
        });
      });
  }
  
  document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
      addTodo();
    });
  
  function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
  
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
  
    todoList.push({
      //name: name,
      //dueDate: dueDate,
      name,
      dueDate
    });
  
    inputElement.value = '';
  
    renderTodoList();
  }