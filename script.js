function focusMode() {
  const goal = document.getElementById("goal").value;
  const distractions = document.getElementById("distractions").value.split("\n");
  const focusView = document.getElementById("focusView");

  if (!goal) return;

  document.querySelector(".container").classList.add("fade");

  focusView.classList.remove("hidden");
  focusView.innerHTML = `
    ⭐ NORTH STAR ⭐
    <br><br>
    ${goal}
    <br><br>
    <small>Ignore:</small>
    <br>
    ${distractions.filter(d => d).map(d => "• " + d).join("<br>")}
  `;
}

function resetMode() {
  document.querySelector(".container").classList.remove("fade");
  document.getElementById("focusView").classList.add("hidden");
}
