const studentData = {
    section1: [ // section 501
        "Michael", "Abby", "Max", "Ashlyn", "Christian", 
        "Cooper", "Isaac", "Jack", "Andrew", "Niya", "Litzie", 
        "Nathan", "Carmen", "Jacqueline", "Keaton",  "Ian",
        "Christopher", "Lane", "Grace", "Destiny", "Alim", 
        "Joshua", "Luca"
    ],
    section2: [ // section 502
        "Jesse", "Brynn", "Noah", "Logan", "Ella", "Jonathan", 
        "Savannah", "Madeline", "Jase", "Josiah", "Andrew", 
        "Nathan", "Miles", "Kimberly", "Ansel", "Kevin", "Dwayne", 
        "Ben", "David", "Kodai-Bane"
    ]
  };
  
  // DOM elements
  const sectionSelector = document.getElementById("section-selector");
  const studentContainer = document.getElementById("student-container");
  const startButton = document.getElementById("start-button");
  const resetButton = document.getElementById("reset-button");
  
  // interval timer reference
  let eliminationInterval = null;
  
  // helper to render students as bubbles
  function renderStudents(section) {
    studentContainer.innerHTML = ""; // clear previous students
    const students = studentData[section];
  
    students.forEach((student) => {
      const bubble = document.createElement("div");
      bubble.className = "student-bubble";
      bubble.textContent = student;
      studentContainer.appendChild(bubble);
    });
  
    startButton.disabled = false;
    resetButton.disabled = false;
  }
  
  sectionSelector.addEventListener("change", () => {
    renderStudents(sectionSelector.value);
  });
  
  // randomly remove student bubbles until only 5 remain
  function startElimination() {
    const studentBubbles = Array.from(studentContainer.children);
    const totalStudents = studentBubbles.length;
  
    if (totalStudents <= 5) {
      alert("Not enough students to eliminate!");
      return;
    }
  
    let remaining = totalStudents;
  
    eliminationInterval = setInterval(() => {
      if (remaining > 5) {
        const randomIndex = Math.floor(Math.random() * studentBubbles.length);
        const bubbleToHide = studentBubbles[randomIndex];
  
        if (bubbleToHide && !bubbleToHide.classList.contains("hidden")) {
          bubbleToHide.classList.add("hidden");
          studentBubbles.splice(randomIndex, 1);
          remaining--;
        }
      } else {
        // stop the interval when only 5 remain
        clearInterval(eliminationInterval);
      }
    }, 2000);
  }
  
  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    startElimination();
  });
  
  function resetStudents() {
    clearInterval(eliminationInterval);
    renderStudents(sectionSelector.value);
    startButton.disabled = false;
  }
  
  resetButton.addEventListener("click", resetStudents);
  
  renderStudents(sectionSelector.value);
  
