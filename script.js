function showTool() {
  const selected = document.getElementById('toolSelector').value;
  const display = document.getElementById('calculatorDisplay');
  display.innerHTML = '';

  const tools = {
    molarity: `
      <div class="calculator">
        <h3>Molarity Calculator</h3>
        <input type="number" id="mol" placeholder="Moles">
        <input type="number" id="liters" placeholder="Volume (L)">
        <button onclick="calcMolarity()">Calculate</button>
        <p id="molarityResult"></p>
      </div>`,
    dilution: `
      <div class="calculator">
        <h3>Dilution Calculator (C1V1 = C2V2)</h3>
        <input type="number" id="c1" placeholder="C1 (Initial Concentration)">
        <input type="number" id="v1" placeholder="V1 (Initial Volume)">
        <input type="number" id="c2" placeholder="C2 (Final Concentration)">
        <button onclick="calcDilution()">Calculate V2</button>
        <p id="dilutionResult"></p>
      </div>`,
    temp: `
      <div class="calculator">
        <h3>Temperature Converter</h3>
        <input type="number" id="celsius" placeholder="Celsius">
        <button onclick="convertTemp()">Convert to Fahrenheit</button>
        <p id="tempResult"></p>
      </div>`,
    dna: `
      <div class="calculator">
        <h3>DNA ng/μL to nM</h3>
        <input type="number" id="ngul" placeholder="DNA conc. (ng/μL)">
        <input type="number" id="length" placeholder="Length (bp)">
        <button onclick="calcDNA()">Convert</button>
        <p id="dnaResult"></p>
      </div>`,
    ph: `
      <div class="calculator">
        <h3>pH Calculator</h3>
        <input type="number" id="hplus" placeholder="[H⁺] (mol/L)">
        <button onclick="calcPH()">Calculate pH</button>
        <p id="phResult"></p>
      </div>`,
    serial: `
      <div class="calculator">
        <h3>Serial Dilution</h3>
        <input type="number" id="startConc" placeholder="Start Concentration">
        <input type="number" id="dilFactor" placeholder="Dilution Factor">
        <input type="number" id="steps" placeholder="Number of Steps">
        <button onclick="calcSerial()">Calculate</button>
        <p id="serialResult"></p>
      </div>`,
    mass: `
      <div class="calculator">
        <h3>Mass to Moles</h3>
        <input type="number" id="mass" placeholder="Mass (g)">
        <input type="number" id="mw" placeholder="Molecular Weight (g/mol)">
        <button onclick="calcMassToMoles()">Convert</button>
        <p id="massResult"></p>
      </div>`,
    volume: `
      <div class="calculator">
        <h3>Volume from Molarity</h3>
        <input type="number" id="mol2" placeholder="Moles">
        <input type="number" id="molar2" placeholder="Molarity (mol/L)">
        <button onclick="calcVol()">Calculate Volume</button>
        <p id="volResult"></p>
      </div>`,
    concentration: `
      <div class="calculator">
        <h3>Concentration (%) Calculator</h3>
        <input type="number" id="amountSolute" placeholder="Solute (g)">
        <input type="number" id="volumeSoln" placeholder="Solution Volume (mL)">
        <button onclick="calcConc()">Calculate %</button>
        <p id="concResult"></p>
      </div>`
  };

  display.innerHTML = tools[selected] || '';
}

function calcMolarity() {
  const mol = parseFloat(document.getElementById('mol').value);
  const vol = parseFloat(document.getElementById('liters').value);
  const result = (mol / vol).toFixed(3);
  document.getElementById('molarityResult').textContent = `Molarity = ${result} M`;
}

function calcDilution() {
  const c1 = parseFloat(document.getElementById('c1').value);
  const v1 = parseFloat(document.getElementById('v1').value);
  const c2 = parseFloat(document.getElementById('c2').value);
  const v2 = (c1 * v1) / c2;
  document.getElementById('dilutionResult').textContent = `Required V2 = ${v2.toFixed(2)} units`;
}

function convertTemp() {
  const c = parseFloat(document.getElementById('celsius').value);
  const f = (c * 9/5) + 32;
  document.getElementById('tempResult').textContent = `${c}°C = ${f.toFixed(2)}°F`;
}

function calcDNA() {
  const conc = parseFloat(document.getElementById('ngul').value);
  const len = parseFloat(document.getElementById('length').value);
  const result = (conc * 1000) / (len * 660);
  document.getElementById('dnaResult').textContent = `${result.toFixed(2)} nM`;
}

function calcPH() {
  const h = parseFloat(document.getElementById('hplus').value);
  const result = -Math.log10(h);
  document.getElementById('phResult').textContent = `pH = ${result.toFixed(2)}`;
}

function calcSerial() {
  let conc = parseFloat(document.getElementById('startConc').value);
  const factor = parseFloat(document.getElementById('dilFactor').value);
  const steps = parseInt(document.getElementById('steps').value);
  let result = 'Concentrations: ';
  for (let i = 0; i < steps; i++) {
    result += `${conc.toFixed(3)}, `;
    conc /= factor;
  }
  document.getElementById('serialResult').textContent = result.slice(0, -2);
}

function calcMassToMoles() {
  const mass = parseFloat(document.getElementById('mass').value);
  const mw = parseFloat(document.getElementById('mw').value);
  const moles = mass / mw;
  document.getElementById('massResult').textContent = `Moles = ${moles.toFixed(4)}`;
}

function calcVol() {
  const mol = parseFloat(document.getElementById('mol2').value);
  const molar = parseFloat(document.getElementById('molar2').value);
  const vol = mol / molar;
  document.getElementById('volResult').textContent = `Volume = ${vol.toFixed(3)} L`;
}

function calcConc() {
  const solute = parseFloat(document.getElementById('amountSolute').value);
  const vol = parseFloat(document.getElementById('volumeSoln').value);
  const percent = (solute / vol) * 100;
  document.getElementById('concResult').textContent = `Concentration = ${percent.toFixed(2)}%`;
}

function startTimer() {
  const min = parseInt(document.getElementById('minutes').value) || 0;
  const sec = parseInt(document.getElementById('seconds').value) || 0;
  let totalSeconds = min * 60 + sec;

  function updateDisplay() {
    const m = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const s = String(totalSeconds % 60).padStart(2, '0');
    document.getElementById('timer-display').textContent = `${m}:${s}`;
  }

  updateDisplay();
  const interval = setInterval(() => {
    totalSeconds--;
    updateDisplay();
    if (totalSeconds <= 0) clearInterval(interval);
  }, 1000);
}

