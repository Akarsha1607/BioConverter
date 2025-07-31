const container = document.getElementById("calculator-container");
const toolSelect = document.getElementById("tool");

toolSelect.addEventListener("change", loadTool);
window.onload = loadTool;

function loadTool() {
  const tool = toolSelect.value;
  container.innerHTML = "";

  const tools = {
    molarity: () => {
      container.innerHTML = `
        <h2>Molarity Calculator</h2>
        <input type="number" id="moles" placeholder="Moles of solute">
        <input type="number" id="volume" placeholder="Volume in Liters">
        <button onclick="calcMolarity()">Calculate</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    dilution: () => {
      container.innerHTML = `
        <h2>Dilution Calculator (C1V1 = C2V2)</h2>
        <input type="number" id="c1" placeholder="Initial concentration (C1)">
        <input type="number" id="v1" placeholder="Initial volume (V1)">
        <input type="number" id="c2" placeholder="Final concentration (C2)">
        <button onclick="calcDilution()">Calculate V2</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    ph: () => {
      container.innerHTML = `
        <h2>pH Calculator</h2>
        <input type="number" id="hplus" placeholder="[H⁺] in mol/L">
        <button onclick="calcPH()">Calculate pH</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    temperature: () => {
      container.innerHTML = `
        <h2>Temperature Converter</h2>
        <input type="number" id="tempInput" placeholder="Enter temperature">
        <select id="tempUnit">
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
          <option value="K">Kelvin</option>
        </select>
        <button onclick="convertTemp()">Convert</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    dna: () => {
      container.innerHTML = `
        <h2>DNA Concentration Converter</h2>
        <input type="number" id="ng" placeholder="Concentration in ng/μL">
        <button onclick="convertDNA()">Convert to nM</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    serial: () => {
      container.innerHTML = `
        <h2>Serial Dilution Calculator</h2>
        <input type="number" id="stock" placeholder="Stock concentration">
        <input type="number" id="dilution" placeholder="Dilution factor (e.g., 10)">
        <input type="number" id="steps" placeholder="Number of steps">
        <button onclick="serialDilution()">Calculate</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    volume: () => {
      container.innerHTML = `
        <h2>µL ↔ mL Converter</h2>
        <input type="number" id="ulval" placeholder="Enter value">
        <select id="ulUnit">
          <option value="ul">µL to mL</option>
          <option value="ml">mL to µL</option>
        </select>
        <button onclick="convertVolume()">Convert</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    massmolvol: () => {
      container.innerHTML = `
        <h2>Mass ↔ Moles ↔ Volume</h2>
        <input type="number" id="mass" placeholder="Mass (g)">
        <input type="number" id="molarmass" placeholder="Molar Mass (g/mol)">
        <button onclick="calcMoles()">Convert</button>
        <button onclick="loadTool()">Reset</button>
        <div class="result" id="result"></div>`;
    },
    timer: () => {
      container.innerHTML = `
        <h2>Set Timer</h2>
        <input type="number" id="minutes" placeholder="Minutes">
        <input type="number" id="seconds" placeholder="Seconds">
        <button onclick="startTimer()">Start</button>
        <button onclick="pauseTimer()">Pause</button>
        <button onclick="resetTimer()">Reset</button>
        <div class="result" id="timerDisplay">00:00</div>
        <audio id="alarm" src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"></audio>`;
    }
  };

  tools[tool]();
}

// Calculator logic
function calcMolarity() {
  const moles = parseFloat(document.getElementById("moles").value);
  const volume = parseFloat(document.getElementById("volume").value);
  const result = (moles / volume).toFixed(3);
  document.getElementById("result").textContent = `Molarity = ${result} mol/L`;
}

function calcDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const c2 = parseFloat(document.getElementById("c2").value);
  const v2 = (c1 * v1) / c2;
  document.getElementById("result").textContent = `Required volume V2 = ${v2.toFixed(2)} L`;
}

function calcPH() {
  const h = parseFloat(document.getElementById("hplus").value);
  const ph = -Math.log10(h);
  document.getElementById("result").textContent = `pH = ${ph.toFixed(2)}`;
}

function convertTemp() {
  const t = parseFloat(document.getElementById("tempInput").value);
  const unit = document.getElementById("tempUnit").value;
  let c, f, k;

  if (unit === "C") {
    c = t;
    f = (t * 9/5) + 32;
    k = t + 273.15;
  } else if (unit === "F") {
    c = (t - 32) * 5/9;
    f = t;
    k = c + 273.15;
  } else {
    k = t;
    c = t - 273.15;
    f = (c * 9/5) + 32;
  }

  document.getElementById("result").innerHTML =
    `Celsius: ${c.toFixed(2)} °C<br>Fahrenheit: ${f.toFixed(2)} °F<br>Kelvin: ${k.toFixed(2)} K`;
}

function convertDNA() {
  const ng = parseFloat(document.getElementById("ng").value);
  const nm = (ng / 660) * 1000;
  document.getElementById("result").textContent = `${nm.toFixed(2)} nM`;
}

function serialDilution() {
  const stock = parseFloat(document.getElementById("stock").value);
  const factor = parseFloat(document.getElementById("dilution").value);
  const steps = parseInt(document.getElementById("steps").value);
  let output = "";

  for (let i = 1; i <= steps; i++) {
    output += `Tube ${i}: ${(stock / Math.pow(factor, i)).toFixed(4)}<br>`;
  }

  document.getElementById("result").innerHTML = output;
}

function convertVolume() {
  const val = parseFloat(document.getElementById("ulval").value);
  const unit = document.getElementById("ulUnit").value;
  const result = unit === "ul" ? (val / 1000) : (val * 1000);
  const label = unit === "ul" ? "mL" : "µL";
  document.getElementById("result").textContent = `${result.toFixed(3)} ${label}`;
}

function calcMoles() {
  const mass = parseFloat(document.getElementById("mass").value);
  const mm = parseFloat(document.getElementById("molarmass").value);
  const moles = (mass / mm).toFixed(3);
  document.getElementById("result").textContent = `Moles = ${moles}`;
}

// Timer Logic
let timerInterval;
let timeLeft = 0;

function startTimer() {
  const min = parseInt(document.getElementById("minutes").value) || 0;
  const sec = parseInt(document.getElementById("seconds").value) || 0;
  timeLeft = (min * 60) + sec;

  clearInterval(timerInterval);
  updateDisplay();

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("alarm").play();
    } else {
      timeLeft--;
      updateDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = 0;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("timerDisplay");
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
