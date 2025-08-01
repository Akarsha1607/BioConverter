// Tool descriptions and calculator logic
const tools = {
  molarity: { desc: "Calculate molarity using moles and volume.", formula: (mol, vol) => mol / vol },
  dilution: { desc: "C1V1 = C2V2. Calculate missing concentration or volume.", formula: (C1, V1, C2, V2) => (C1 * V1 === C2 * V2) },
  ph: { desc: "Calculate pH from H+ concentration.", formula: (h) => -Math.log10(h) },
  temperature: { desc: "Convert °C to °F.", formula: (c) => (c * 9/5 + 32) },
  dna: { desc: "Convert ng/µL to nM using length.", formula: (ng, bp) => (ng * 1000000) / (bp * 660 * 1e9) },
  serial: { desc: "Create serial dilution steps.", formula: (start, factor, steps) => Array.from({length: steps}, (_, i) => start / Math.pow(factor, i)) },
  unit: { desc: "Convert between mg, µg, ng etc.", formula: (val, from, to) => val * (10 ** (from - to)) },
  cell: { desc: "Estimate cell count using OD.", formula: (od) => od * 8e8 },
  protein: { desc: "Convert absorbance to protein conc.", formula: (abs, coeff) => abs / coeff },
};

function showCalculator(tool) {
  const info = document.getElementById("tool-info");
  const calc = document.getElementById("calculator");
  info.style.display = "none";
  calc.innerHTML = "";

  if (!tool || !tools[tool]) return;

  info.innerHTML = `<strong>Info:</strong> ${tools[tool].desc} <button onclick="this.parentElement.style.display='none'">×</button>`;
  info.style.display = "block";

  // Simple UI inputs — can be extended for each tool
  const inputUI = `
    <form onsubmit="event.preventDefault(); runCalculator('${tool}')">
      <input type="number" id="input1" placeholder="Input 1" required />
      <input type="number" id="input2" placeholder="Input 2 (if needed)" />
      <button type="submit">Calculate</button>
    </form>
    <p id="result"></p>
  `;
  calc.innerHTML = inputUI;
}

function runCalculator(tool) {
  const input1 = parseFloat(document.getElementById("input1").value);
  const input2 = parseFloat(document.getElementById("input2").value);
  const result = document.getElementById("result");

  try {
    let output;
    if (tool === "ph") {
      output = tools[tool].formula(input1).toFixed(2);
    } else if (tool === "temperature") {
      output = tools[tool].formula(input1).toFixed(2) + " °F";
    } else {
      output = tools[tool].formula(input1, input2);
    }
    result.textContent = "Result: " + output;
  } catch (e) {
    result.textContent = "Error: Invalid input";
  }
}

// Timer Logic
let timerCount = 0;

function addTimer() {
  const container = document.getElementById("timers");
  const id = `timer${++timerCount}`;
  const timer = document.createElement("div");
  timer.className = "timer-card";
  timer.innerHTML = `
    <h3>Timer ${timerCount}</h3>
    <input type="number" placeholder="Hours" id="${id}-h" min="0" />
    <input type="number" placeholder="Minutes" id="${id}-m" min="0" />
    <input type="number" placeholder="Seconds" id="${id}-s" min="0" />
    <div class="timer-countdown" id="${id}-display">00:00:00</div>
    <div class="timer-controls">
      <button onclick="startTimer('${id}')">Start</button>
      <button onclick="stopTimer('${id}')">Stop</button>
      <button onclick="deleteTimer('${id}')">Delete</button>
    </div>
  `;
  container.appendChild(timer);
}

const timerIntervals = {};

function startTimer(id) {
  const h = +document.getElementById(`${id}-h`).value || 0;
  const m = +document.getElementById(`${id}-m`).value || 0;
  const s = +document.getElementById(`${id}-s`).value || 0;
  let total = h * 3600 + m * 60 + s;

  if (total <= 0) return;

  const display = document.getElementById(`${id}-display`);

  clearInterval(timerIntervals[id]);
  timerIntervals[id] = setInterval(() => {
    if (total <= 0) {
      clearInterval(timerIntervals[id]);
      display.textContent = "00:00:00";
      beep();
      alert("Time's up for Timer " + id.replace("timer", ""));
    } else {
      const hrs = String(Math.floor(total / 3600)).padStart(2, "0");
      const mins = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
      const secs = String(total % 60).padStart(2, "0");
      display.textContent = `${hrs}:${mins}:${secs}`;
      total--;
    }
  }, 1000);
}

function stopTimer(id) {
  clearInterval(timerIntervals[id]);
}

function deleteTimer(id) {
  stopTimer(id);
  const timer = document.getElementById(id).parentElement;
  timer.remove();
}

function beep() {
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg");
  audio.play();
}
