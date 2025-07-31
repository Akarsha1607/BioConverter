let timer;
let remainingTime = 0;

function startTimer() {
  clearInterval(timer);
  const h = parseInt(document.getElementById('hours').value) || 0;
  const m = parseInt(document.getElementById('minutes').value) || 0;
  const s = parseInt(document.getElementById('seconds').value) || 0;
  remainingTime = h * 3600 + m * 60 + s;

  if (remainingTime <= 0) return;

  updateDisplay();
  timer = setInterval(() => {
    remainingTime--;
    updateDisplay();
    if (remainingTime <= 0) {
      clearInterval(timer);
      document.getElementById('alarmSound').play();
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  remainingTime = 0;
  updateDisplay();
}

function updateDisplay() {
  const hrs = String(Math.floor(remainingTime / 3600)).padStart(2, '0');
  const mins = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, '0');
  const secs = String(remainingTime % 60).padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${hrs}:${mins}:${secs}`;
}

function showTool() {
  const tool = document.getElementById('toolSelector').value;
  const container = document.getElementById('toolContainer');
  container.innerHTML = '';

  if (!tool) return;

  const html = {
    molarity: `
      <h3>Molarity Calculator</h3>
      <input placeholder="Mass (g)" id="mass"><br>
      <input placeholder="Volume (L)" id="volume"><br>
      <input placeholder="Molar Mass (g/mol)" id="mm"><br>
      <button onclick="calcMolarity()">Calculate</button>
      <p id="molarityResult"></p>
    `,
    ph: `
      <h3>pH Calculator</h3>
      <input placeholder="H⁺ Concentration (mol/L)" id="hconc"><br>
      <button onclick="calcPH()">Calculate</button>
      <p id="phResult"></p>
    `,
    dna: `
      <h3>ng/μL → nM</h3>
      <input placeholder="ng/μL" id="dna_ng"><br>
      <input placeholder="bp Length" id="dna_len"><br>
      <button onclick="calcDNA()">Convert</button>
      <p id="dnaResult"></p>
    `,
    nm: `
      <h3>nM → ng/μL</h3>
      <input placeholder="nM" id="dna_nm"><br>
      <input placeholder="bp Length" id="dna_len2"><br>
      <button onclick="calcNM()">Convert</button>
      <p id="nmResult"></p>
    `,
    dilution: `
      <h3>Dilution Calculator</h3>
      <input placeholder="C1" id="c1">
      <input placeholder="V1" id="v1">
      <input placeholder="C2" id="c2">
      <button onclick="calcDilution()">Calculate V2</button>
      <p id="dilutionResult"></p>
    `,
    temperature: `
      <h3>Temperature Converter</h3>
      <input placeholder="Celsius" id="celsius">
      <button onclick="convTemp()">Convert</button>
      <p id="tempResult"></p>
    `,
    serial: `
      <h3>Serial Dilution</h3>
      <input placeholder="Start Conc." id="sConc">
      <input placeholder="Dilution Factor" id="dFactor">
      <input placeholder="Steps" id="sSteps">
      <button onclick="serialDil()">Go</button>
      <p id="serialResult"></p>
    `,
    mass: `
      <h3>Mass ⇌ Moles</h3>
      <input placeholder="Mass (g)" id="massInput">
      <input placeholder="Molar Mass" id="molMass">
      <button onclick="massToMoles()">Convert</button>
      <p id="massResult"></p>
    `,
    volume: `
      <h3>Volume ⇌ Concentration</h3>
      <input placeholder="Moles" id="vmole">
      <input placeholder="Volume (L)" id="vvol">
      <button onclick="volConc()">Convert</button>
      <p id="volumeResult"></p>
    `
  };
  container.innerHTML = html[tool];
}

// Tool logic functions
function calcMolarity() {
  const mass = parseFloat(document.getElementById("mass").value);
  const vol = parseFloat(document.getElementById("volume").value);
  const mm = parseFloat(document.getElementById("mm").value);
  const result = (mass / mm) / vol;
  document.getElementById("molarityResult").innerText = `Molarity: ${result.toFixed(2)} M`;
}

function calcPH() {
  const h = parseFloat(document.getElementById("hconc").value);
  const result = -Math.log10(h);
  document.getElementById("phResult").innerText = `pH: ${result.toFixed(2)}`;
}

function calcDNA() {
  const ng = parseFloat(document.getElementById("dna_ng").value);
  const len = parseInt(document.getElementById("dna_len").value);
  const result = (ng / (len * 660)) * 1e6;
  document.getElementById("dnaResult").innerText = `nM: ${result.toFixed(2)}`;
}

function calcNM() {
  const nm = parseFloat(document.getElementById("dna_nm").value);
  const len = parseInt(document.getElementById("dna_len2").value);
  const result = (nm * len * 660) / 1e6;
  document.getElementById("nmResult").innerText = `ng/μL: ${result.toFixed(2)}`;
}

function calcDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const c2 = parseFloat(document.getElementById("c2").value);
  const v2 = (c1 * v1) / c2;
  document.getElementById("dilutionResult").innerText = `V2: ${v2.toFixed(2)} L`;
}

function convTemp() {
  const c = parseFloat(document.getElementById("celsius").value);
  const f = (c * 9/5) + 32;
  document.getElementById("tempResult").innerText = `${f.toFixed(1)} °F`;
}

function serialDil() {
  const start = parseFloat(document.getElementById("sConc").value);
  const factor = parseFloat(document.getElementById("dFactor").value);
  const steps = parseInt(document.getElementById("sSteps").value);
  let result = "";
  for (let i = 0; i <= steps; i++) {
    result += `Step ${i}: ${start / Math.pow(factor, i)}<br>`;
  }
  document.getElementById("serialResult").innerHTML = result;
}

function massToMoles() {
  const m = parseFloat(document.getElementById("massInput").value);
  const mm = parseFloat(document.getElementById("molMass").value);
  const result = m / mm;
  document.getElementById("massResult").innerText = `${result.toFixed(3)} mol`;
}

function volConc() {
  const mol = parseFloat(document.getElementById("vmole").value);
  const vol = parseFloat(document.getElementById("vvol").value);
  const result = mol / vol;
  document.getElementById("volumeResult").innerText = `${result.toFixed(2)} M`;
}
