// --- Calendar Logic ---
const monthYear = document.getElementById('month-year');
const daysContainer = document.getElementById('days');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear  = today.getFullYear();

// Format: "YYYY-MM-DD" => "2025-06-22"
function getDateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// Load saved comments from localStorage
function getComments() {
  return JSON.parse(localStorage.getItem('calendarComments') || '{}');
}

function saveComment(key, comment) {
  const comments = getComments();
  comments[key] = comment;
  localStorage.setItem('calendarComments', JSON.stringify(comments));
}

function renderCalendar(month, year) {
  monthYear.textContent = `${monthNames[month]} ${year}`;
  daysContainer.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  const comments = getComments();

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.classList.add('blank');
    daysContainer.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayEl = document.createElement('div');
    dayEl.textContent = d;

    const key = getDateKey(year, month, d);
    if (comments[key]) {
      dayEl.classList.add('has-comment');
    }

    if (
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add('today');
    }

    dayEl.addEventListener('click', () => {
      const existing = comments[key] || "";
      const userInput = prompt(`Enter your goal for ${key}:`, existing);
      if (userInput !== null) {
        saveComment(key, userInput.trim());
        renderCalendar(currentMonth, currentYear); // Refresh to show color
      }
    });

    daysContainer.appendChild(dayEl);
  }
}

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);

// --- Goal Tracker Logic (unchanged) ---
function addGoal() {
  const input = document.getElementById("goalInput");
  const value = input.value.trim();
  if (value === "") return;

  const li = document.createElement("li");
  li.textContent = value;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "❌";
  removeBtn.onclick = () => li.remove();

  li.appendChild(removeBtn);
  li.onclick = () => li.classList.toggle("done");

  document.getElementById("goalList").appendChild(li);
  input.value = "";
}

 
