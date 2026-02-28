async function analyze() {
  const input = document.getElementById("input").value.toLowerCase();
  const result = document.getElementById("result");

  if (!input) {
    result.innerText = "No goal detected.";
    return;
  }

  let score = Math.floor(Math.random() * 60) + 30;

  if (input.includes("everyday")) score -= 20;
  if (input.includes("5am")) score -= 15;

  score = Math.max(5, Math.min(score, 95));

  const response = await fetch("responses.json");
  const data = await response.json();

  const match = data.find(r => score >= r.min && score <= r.max);

  result.innerText = "Believability: " + score + "% — " + match.text;
}
