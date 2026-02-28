function analyze() {
  const text = document.getElementById("input").value.toLowerCase();
  const result = document.getElementById("result");

  if (!text) {
    result.innerText = "You didn't even type anything. Suspicious.";
    return;
  }

