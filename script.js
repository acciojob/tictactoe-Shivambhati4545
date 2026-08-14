document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  const player1Input = document.getElementById("player-1");
  const player2Input = document.getElementById("player-2");
  const setupForm = document.getElementById("setup-form");
  const gameView = document.getElementById("game-view");
  const messageDiv = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  let p1Name = "";
  let p2Name = "";
  let currentPlayer = "";
  let currentSymbol = "x";
  let boardState = Array(9).fill(null);
  let gameActive = true;

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]            // Diagonals
  ];
  submitBtn.addEventListener("click", () => {
    p1Name = player1Input.value.trim();
    p2Name = player2Input.value.trim();

    if (!p1Name || !p2Name) {
      alert("Please enter names for both players!");
      return;
    }
    currentPlayer = p1Name;
    currentSymbol = "x";

    setupForm.style.display = "none";
    gameView.style.display = "block";
    messageDiv.textContent = `${currentPlayer}, you're up`;
  });
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!gameActive || boardState[index] !== null) return;
      boardState[index] = currentSymbol;
      cell.textContent = currentSymbol;
      const winCombo = checkWin();
      if (winCombo) {
        gameActive = false;
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        winCombo.forEach(i => cells[i].classList.add("winning-cell"));
        return;
      }
      if (boardState.every(cell => cell !== null)) {
        gameActive = false;
        messageDiv.textContent = "It's a draw!";
        return;
      }
      // Switch Turns
      if (currentSymbol === "x") {
        currentSymbol = "o";
        currentPlayer = p2Name;
      } else {
        currentSymbol = "x";
        currentPlayer = p1Name;
      }
      messageDiv.textContent = ${currentPlayer}, you're up;
    });
  });
  function checkWin() {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return combo;
      }
    }
    return null;
  }
});