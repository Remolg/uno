const todoListElement = document.querySelector(".todoList");
const todoFormElement = document.querySelector(".TodoForm");
const todoInputElement = document.querySelector('[name="todo"]');


todoInputElement.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {
    event.preventDefault();
    var value = todoInputElement.value.trim();

    if (value !== "") {
      var listItem = document.createElement("li");
      var listInput = document.createElement("input");
      listInput.type = "checkbox";
      var listText = document.createElement("p");
      listText.textContent = value;
      var listRemoveButton = document.createElement("button");
      var listStar = document.createElement("span");
      listStar.innerHTML = "★";
      listRemoveButton.innerHTML = "Sil";

      listRemoveButton.addEventListener("click", function () {
        listItem.remove();
      })

      listItem.appendChild(listInput);
      listItem.appendChild(listText);
      listItem.appendChild(listRemoveButton);
      listItem.appendChild(listStar);
      todoListElement.appendChild(listItem);
      todoInputElement.value = " ";
    }
  }
})

