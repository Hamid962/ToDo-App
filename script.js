const input = document.querySelector(".input-box");
const list = document.querySelector(".list");
let arr = [];

window.addEventListener("load", () => {
  const array = JSON.parse(localStorage.getItem("Data")) ?? [];
  arr = array;

  array.map((value) => addToDo(value));
});

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const todoText = addToDo(this.value);

    arr.push(todoText);

    this.value = "";

    localStorage.setItem("Data", JSON.stringify(arr));
  }
});

const addToDo = function (item) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span class="todo-text">${item}</span>
    <button class="icons">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <button class="edit">Edit</button>
  `;
  list.appendChild(listItem);

  const todoText = listItem.querySelector(".todo-text");

  listItem.querySelector(".icons").addEventListener("click", function () {
    arr = arr.filter((value) => value !== item);
    localStorage.setItem("Data", JSON.stringify(arr));

    // Remove the list item from the UI
    listItem.remove();
  });

  listItem.querySelector(".edit").addEventListener("click", function () {
    // Replace the todo text with an input field
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = todoText.textContent;

    // Replace the span with the input field
    listItem.replaceChild(inputField, todoText);

    // Focus on the input field
    inputField.focus();

    // Update the todo item on Enter key press
    inputField.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        todoText.textContent = inputField.value;
        listItem.replaceChild(todoText, inputField);
      }
    });
  });

  return item;
};
