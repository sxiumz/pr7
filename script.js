const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [
  { id: 1, text: 'Вивчити HTML', done: true },
  { id: 2, text: 'Вивчити CSS', done: true },
  { id: 3, text: 'Вивчити JavaScript', done: false },
];

let nextId = 4;

function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
  localStorage.setItem('nextId', String(nextId));
}

function loadFromStorage() {
  const saved = localStorage.getItem('todos');
  const savedId = localStorage.getItem('nextId');
  if (saved) {
    todos = JSON.parse(saved);
    nextId = savedId ? Number(savedId) : todos.length + 1;
  }
}

function newTodo() {
  const text = prompt('Введіть нову справу:');
  if (!text || text.trim() === '') return; 
  const todo = { id: nextId++, text: text.trim(), done: false };
  todos.push(todo);
  saveToStorage();
  render(todos);
  updateCounter(todos);
}

function renderTodo(todo) {
  const checkedAttr = todo.done ? 'checked' : '';
  const textClass = todo.done
    ? 'text-success text-decoration-line-through'
    : '';
  return `
    <li class="list-group-item" data-id="${todo.id}">
      <input
        type="checkbox"
        class="form-check-input me-2"
        id="todo-${todo.id}"
        ${checkedAttr}
        onchange="checkTodo(${todo.id})"
      />
      <label for="todo-${todo.id}">
        <span class="${textClass}">${todo.text}</span>
      </label>
      <button
        class="btn btn-danger btn-sm float-end"
        onclick="deleteTodo(${todo.id})"
      >delete</button>
    </li>`;
}

function render(todosArr) {
  const html = todosArr.map(renderTodo).join('');
  list.innerHTML = html;
}
function updateCounter(todosArr) {
  itemCountSpan.textContent = todosArr.length;
  const unchecked = todosArr.filter(t => !t.done).length;
  uncheckedCountSpan.textContent = unchecked;
}
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveToStorage();
  render(todos);
  updateCounter(todos);
}
function checkTodo(id) {
  todos = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  saveToStorage();
  render(todos);
  updateCounter(todos);
}
loadFromStorage();
render(todos);
updateCounter(todos);