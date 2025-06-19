const form = document.getElementById('goal-form');
const input = document.getElementById('goal-input');
const list = document.getElementById('goal-list');

let goals = JSON.parse(localStorage.getItem('goals')) || [];

function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

function renderGoals() {
  list.innerHTML = '';
  goals.forEach((goal, index) => {
    const li = document.createElement('li');
    li.className = goal.done ? 'done' : '';
    li.innerHTML = `
      <span onclick="toggleGoal(${index})">${goal.text}</span>
      <button class="delete-btn" onclick="deleteGoal(${index})">✕</button>
    `;
    list.appendChild(li);
  });
}

function addGoal(text) {
  goals.push({ text, done: false });
  saveGoals();
  renderGoals();
}

function toggleGoal(index) {
  goals[index].done = !goals[index].done;
  saveGoals();
  renderGoals();
}

function deleteGoal(index) {
  goals.splice(index, 1);
  saveGoals();
  renderGoals();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim()) {
    addGoal(input.value.trim());
    input.value = '';
  }
});

renderGoals();
