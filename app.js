const studentData = {
  section1: [ // section 501
    'Michael', 'Abby', 'Max', 'Ashlyn', 'Christian', 
    'Cooper', 'Isaac', 'Jack', 'Andrew', 'Niya', 'Litzie', 
    'Nathan', 'Carmen', 'Jacqueline', 'Keaton',  'Ian',
    'Christopher', 'Lane', 'Grace', 'Destiny', 'Alim', 
    'Joshua', 'Luca'
  ],
  section2: [ // section 502
    'Jesse', 'Brynn', 'Noah', 'Logan', 'Ella', 'Jonathan', 
    'Savannah', 'Madeline', 'Jase', 'Josiah', 'Andrew', 
    'Nathan', 'Miles', 'Kimberly', 'Ansel', 'Kevin', 'Dwayne', 
    'Ben', 'David', 'Kodai-Bane'
  ]
};

// DOM elements
const sectionSelector = document.getElementById('section-selector');
const studentContainer = document.getElementById('student-container');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const toggleCheckboxesButton = document.getElementById('toggle-checkboxes-button');
const checkboxContainer = document.getElementById('checkbox-container');

// interval timer reference
let eliminationInterval = null;

// helper to render student bubbles
function renderStudents(section) {
  // Clear previous bubbles and checkboxes
  studentContainer.innerHTML = '';
  checkboxContainer.innerHTML = '';
  const students = studentData[section];

  students.forEach((student) => {
    const bubble = document.createElement('div');
    bubble.className = 'student-bubble';
    bubble.textContent = student;
    // set an id to easily toggle visibility based on checkbox
    bubble.id = 'bubble-' + student;
    studentContainer.appendChild(bubble);
  });

  renderStudentCheckboxes(section);

  startButton.disabled = false;
  resetButton.disabled = false;
}

// helper to render student checkboxes
function renderStudentCheckboxes(section) {
  const students = studentData[section];

  students.forEach((student) => {
    const checkboxLabel = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    checkbox.dataset.student = student;
    checkbox.addEventListener('change', () => {
      const bubble = document.getElementById('bubble-' + student);
      if (checkbox.checked) {
        bubble.classList.remove('absent');
      } else {
        bubble.classList.add('absent');
      }
    });
    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(' ' + student));
    checkboxContainer.appendChild(checkboxLabel);
  });
}

// Toggle the dropdown for student selection
toggleCheckboxesButton.addEventListener('click', () => {
  if (checkboxContainer.style.display === 'none' || checkboxContainer.style.display === '') {
    checkboxContainer.style.display = 'block';
  } else {
    checkboxContainer.style.display = 'none';
  }
});

sectionSelector.addEventListener('change', () => {
  // Reset any running elimination before re-rendering
  clearInterval(eliminationInterval);
  renderStudents(sectionSelector.value);
});

// randomly eliminate student bubbles until only 5 remain
function startElimination() {
  // Filter only bubbles that are neither eliminated nor marked absent
  let visibleBubbles = Array.from(studentContainer.children).filter(
    (bubble) => !bubble.classList.contains('eliminated') && !bubble.classList.contains('absent')
  );

  if (visibleBubbles.length <= 5) {
    alert('Not enough students to eliminate!');
    return;
  }

  eliminationInterval = setInterval(() => {
    visibleBubbles = Array.from(studentContainer.children).filter(
      (bubble) => !bubble.classList.contains('eliminated') && !bubble.classList.contains('absent')
    );

    if (visibleBubbles.length > 5) {
      const randomIndex = Math.floor(Math.random() * visibleBubbles.length);
      const bubbleToEliminate = visibleBubbles[randomIndex];
      bubbleToEliminate.classList.add('eliminated');
    } else {
      clearInterval(eliminationInterval);
    }
  }, 2000);
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  startElimination();
});

function resetStudents() {
  clearInterval(eliminationInterval);
  renderStudents(sectionSelector.value);
  startButton.disabled = false;
}

resetButton.addEventListener('click', resetStudents);

// initial render on page load
renderStudents(sectionSelector.value);
