let currentUser = null;
let score = 0;

function startGame() {
  const id = document.getElementById("userId").value.trim();
  const roll = document.getElementById("rollNo").value.trim();
  const className = document.getElementById("className").value.trim();

  if (!id || !roll || !className) {
    alert("⚠️ Please fill all details!");
    return;
  }

  currentUser = { id, roll, className, score: 0 };

  document.querySelector(".user-form").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");

  loadUsers();
}

function checkAnswer() {
  let answer = document.getElementById("answer").value.toLowerCase().trim();
  let image = document.getElementById("quizImage");
  let message = document.getElementById("message");
  let scoreBoard = document.getElementById("scoreBoard");

  if (answer === "lion") {
    image.classList.remove("blurred");
    image.classList.add("clear");
    message.style.color = "green";
    message.innerText = "🎉 Correct! It's a Lion!";
    score += 10;
    scoreBoard.innerText = "⭐ Score: " + score;
    currentUser.score = score;
    saveUser();
  } else {
    message.style.color = "red";
    message.innerText = "❌ Try again!";
  }
}

function saveUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let existing = users.find(u => u.id === currentUser.id);

  if (existing) {
    existing.score = currentUser.score;
  } else {
    users.push(currentUser);
  }

  localStorage.setItem("users", JSON.stringify(users));
  loadUsers();
}

function loadUsers() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  users.forEach(user => {
    let row = `<tr>
      <td>${user.id}</td>
      <td>${user.roll}</td>
      <td>${user.className}</td>
      <td>${user.score}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}
