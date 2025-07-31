// TIMER
let timer;
let totalSeconds = 0;

function startTimer() {
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  totalSeconds = minutes * 60 + seconds;

  clearInterval(timer);
  timer = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timer);
      alert("⏰ Time's up!");
    } else {
      totalSeconds--;
      displayTime();
    }
  }, 1000);
}

function displayTime() {
  const min = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const sec = String(totalSeconds % 60).padStart(2, "0");
  document.getElementById("time").innerText = `${min}:${sec}`;
}

function resetTimer() {
  clearInterval(timer);
  totalSeconds = 0;
  document.getElementById("time").innerText = "00:00";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}

// TOOL LOADER
function loadTool() {
  const tool = document.getElementById("tool-select").value;
  const container = document.getElementById("tool-container");
  container.innerHTML = "";

  if (tool === "molarity") {
    container.innerHTML = `
      <h3>Molarity Calculator</h3>
      <input type="number" id="mol" placeholder="Moles (mol)">
      <input type="number" id="vol" placeholder="Volume (L)">
      <button onclick="calcMolarity()">Calculate</button>
      <button onclick="resetTool()">Reset</button>
      <p id="molarity-result"></p>
    `;
  } else if (tool === "dilution") {
    container.innerHTML = `
      <h3>Dilution Calculator (C1V1 = C2V2)</h3>
      <input type="number" id="c1" placeholder="C1">
      <input type="number" id="v1" placeholder="V1">
      <input type="number" id="c2" placeholder="C2">
      <button onclick="calcDilution()">Calculate V2</button>
      <button onclick="resetTool()">Reset</button>
      <p id="dilution-result"></p>
    `;
  } else if (tool === "temperature") {
    container.innerHTML = `
      <h3>Temperature Converter</h3>
      <input type="number" id="tempInput" placeholder="Enter Temperature">
      <select id="tempUnit">
        <option value="CtoF">Celsius to Fahrenheit</option>
        <option value="FtoC">Fahrenheit to Celsius</option>
      </select>
      <button onclick="convertTemp()">Convert</button>
      <button onclick="resetTool()">Reset</button>
      <p id="temp-result"></p>
    `;
  }
}

// TOOL LOGIC
function calcMolarity() {
  const mol = parseFloat(document.getElementById("mol").value);
  const vol = parseFloat(document.getElementById("vol").value);
  if (!mol || !vol) return alert("Please enter valid values.");
  const result = mol / vol;
  document.getElementById("molarity-result").innerText = `Molarity: ${result.toFixed(3)} M`;
}

function calcDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const c2 = parseFloat(document.getElementById("c2").value);
  if (!c1 || !v1 || !c2) return alert("Please enter valid values.");
  const v2 = (c1 * v1) / c2;
  document.getElementById("dilution-result").innerText = `V2 = ${v2.toFixed(2)} units`;
}

function convertTemp() {
  const temp = parseFloat(document.getElementById("tempInput").value);
  const type = document.getElementById("tempUnit").value;
  if (isNaN(temp)) return alert("Enter a valid temperature!");

  let result;
  if (type === "CtoF") result = (temp * 9/5) + 32;
  else result = (temp - 32) * 5/9;

  document.getElementById("temp-result").innerText = `Converted: ${result.toFixed(2)}°`;
}

function resetTool() {
  loadTool(); // reloads the tool UI
}
