const todoListİnputElement = document.querySelector(".todoList");
const todoListFormElement = document.querySelector(".TodoForm");


function handleKeyDown(event) {
    if (event.keyCode === 13) {
        var inputElement = document.getElementById("inputText");
        var inputText = inputElement.value;
        console.log(inputText);
        var listItem = document.createElement("li");
        listItem.textContent = inputText;
        todoListİnputElement.appendChild(listItem);
        inputElement.value = "";
    }
    
  }









































// const todoListElement = document.querySelector('.todoList');
// const todoFormElement = document.querySelector('#TodoForm');
// const todoInputElement = document.querySelector('[name="Todo"]');


// const createTodoListHtml = todo => {
//     // her todoitem yazıldıgında li elementi olusturulacak
//     let todoItem = document.createElement('li');
//     // her todoRemoveBtn yazıldıgında button elementi olusturulacak
//     let todoRemoveBtn = document.createElement('button');
//     // button içerisime x yazdırılıyor
//     todoRemoveBtn.innerText = 'X';
//     // her label yazıldığında label elementi oluşturulacak 
//     let label = document.createElement('label');
//     // label elementını todo ya ekliyor
//     label.innerText = todo;
//     // her changeInput yazıldığında input elementi oluşturulacak 
    
//     let changeInput = document.createElement('input');
//     // changeInput un tipi text olarak belirleniyor
//     changeInput.type = 'text';
//     // changeInput elementını todo ya ekliyor
//     changeInput.value = todo;
    
//     // changeInput elementi tetiklendiğinde olanlar 
    
//     changeInput.addEventListener('keydown', function(e) {
//         // eğer tetikleyen elemen enter ise olacaklar
//         if(e.key === 'Enter') {
//             // tıklanınlan elementin ................
//             this.previousSibling.innerText = this.value;
//             // tıklanınlan elementin bir üstündeki elementin onEdit classını sil
//             this.parentElement.classList.remove('onEdit');
//         }
//     });
    
//     // label elementine çift tıklandığıda olacaklar
    
//     label.addEventListener('dblclick', function() {
//         // tıklanınlan elementin bir üstündeki elemente onEdit classını ekle
//         this.parentElement.classList.add('onEdit');
//         // tıklanılan elemente odaklanılmasını sağlar
//         this.nextSibling.focus();
//         // tıklanılan elementi seçmemizi sağlar
//         this.nextSibling.select();
//         // this.previousSibling.checked = this.previousSibling.checked ? false : true;
//     });
    
//     // buton elemnetine tıklandıgında olacaklar
    
//     todoRemoveBtn.addEventListener('click', function() {
//         // this.parentElement.remove();
//         // todo item içerisindeki bütün elemenleri siler
//         todoItem.remove();
//     });
    
//     todoItem.innerHTML = `<input type="checkbox">`;
//     todoItem.appendChild(label);
//     todoItem.appendChild(changeInput);
//     todoItem.appendChild(todoRemoveBtn);
    
//     return todoItem;
//     };
