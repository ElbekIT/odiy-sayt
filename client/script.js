let currentRiddle = 0;
let riddles = [];

fetch('/riddles.json')
  .then(res => res.json())
  .then(data => {
    riddles = data;
    loadRiddle();
  });

function loadRiddle() {
  document.getElementById("riddleText").innerText = riddles[currentRiddle].question;
  document.getElementById("userAnswer").value = "";
  document.getElementById("result").innerText = "";
}

function submitAnswer() {
  const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
  fetch('/.netlify/functions/checkAnswer', {
    method: 'POST',
    body: JSON.stringify({
      riddleId: riddles[currentRiddle].id,
      userAnswer
    })
  })
  .then(res => res.json())
  .then(result => {
    document.getElementById("result").innerText = result.correct
      ? "✅ To‘g‘ri!"
      : `❌ Noto‘g‘ri. To‘g‘ri javob: ${result.correctAnswer}`;
    currentRiddle++;
    if (currentRiddle < riddles.length) {
      setTimeout(loadRiddle, 2000);
    } else {
      document.getElementById("riddleBox").innerHTML = "<h2>🎉 Barcha topishmoqlar tugadi!</h2>";
    }
  });
}
