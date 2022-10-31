const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
    todos.forEach(todo => {
        addTodo(todo);
    })
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }
        if(todoText){
            const todoEl = document.createElement('li');

            if(todo && todo.completed){
                todoEl.classList.add('completed');
            }
            
            
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                todoEl.classList.add('mobile-el');
                todoEl.innerHTML = 
                `
                <p class="text">${todoText}</p> <span class="close">X</span>
                `;
            }else{
                todoEl.innerHTML = 
                `
                <p class="text">${todoText}</p>
                `;
            }
    
            todoEl.addEventListener('click', (e) => {
                todoEl.classList.toggle('completed');
                updateLS();
                if(e.target == todoEl.querySelector('.close')){
                    e.target.parentNode.remove();
                    updateLS();
                }
            })
    
            todoEl.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                
                if(e.target.parentNode != todosUL){
                    e.target.parentNode.remove();
                }else{
                    e.target.remove();
                }

                updateLS();
            })
    
            todosUL.appendChild(todoEl);
            
            input.value = '';
    
            updateLS();
        }
}

function updateLS() {
    const todoEl = document.querySelectorAll('li');

    const todo = []; 

    todoEl.forEach(noteEl => {
        const nodeText = noteEl.querySelector('.text');
        todo.push({
            text: nodeText.innerHTML,
            completed: noteEl.classList.contains('completed'),
            nodeText,
        });
    })
    localStorage.setItem('todos', JSON.stringify(todo))
}


document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
})


document.onkeydown = function(e) {
    if(e.keyCode == 123) {
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    return false;
    }
    }