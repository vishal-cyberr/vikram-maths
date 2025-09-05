let currentUser = null;
let score = 0;

// Load database from localStorage
let users = JSON.parse(localStorage.getItem("quizUsers")) || [];

function updateTable() {
  let table = document.getElementById("userTable");
  // Clear table except header
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Roll</th>
      <th>Class</th>
      <th>Score</th>
    </tr>`;
  users.forEach(u => {
    let row = `<tr>
      <td>${u.id}</td>
      <td>${u.roll}</td>
      <td>${u.className}</td>
      <td>${u.score}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

updateTable();

function startQuiz() {
  let id = document.getElementById("userId").value.trim();
  let roll = document.getElementById("roll").value.trim();
  let className = document.getElementById("class").value.trim();

  if (!id || !roll || !className) {
    alert("Please fill all fields!");
    return;
  }

  currentUser = { id, roll, className, score: 0 };
  score = 0;

  document.getElementById("userForm").style.display = "none";
  document.getElementById("quizBox").style.display = "block";
}

function checkAnswer() {
  let answer = document.getElementById("answer").value.toLowerCase().trim();
  let image = document.getElementById("quizImage");
  let message = document.getElementById("message");

  if (answer === "lion") {
    image.classList.remove("blurred");
    image.classList.add("clear");
    message.style.color = "green";
    message.innerText = "🎉 Correct! It's a Lion!";
    score += 10;
    document.getElementById("score").innerText = score;

    // Save user score
    currentUser.score = score;
    users.push(currentUser);
    localStorage.setItem("quizUsers", JSON.stringify(users));
    updateTable();
  } else {
    message.style.color = "red";
    message.innerText = "❌ Oops! Try again!";
  }
}
