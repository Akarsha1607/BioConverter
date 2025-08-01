// script.js
document.getElementById('tool-select').addEventListener('change', function () {
  const selected = this.value;
  const area = document.getElementById('calculator-area');
  area.innerHTML = '';

  switch (selected) {
    case 'molarity':
      area.innerHTML = `<h3>Molarity Calculator</h3>
        <input placeholder="Moles" id="mol" type="number">
        <input placeholder="Volume (L)" id="vol" type="number">
        <button onclick="calcMolarity()">Calculate</button>
        <p id="result"></p>`;
      break;
    case 'dilution':
      area.innerHTML = `<h3>Dilution Calculator (C₁V₁=C₂V₂)</h3>
        <input placeholder="C₁" id="c1" type="number">
        <input placeholder="V₁" id="v1" type="number">
        <input placeholder="C₂" id="c2" type="number">
        <button onclick="calcV2()">Calculate V₂</button>
        <p id="result"></p>`;
      break;
    case 'ph':
      area.innerHTML = `<h3>pH Calculator</h3>
        <input placeholder="[H⁺] (mol/L)" id="hplus" type="number">
        <button onclick="calcPH()">Calculate pH</button>
        <p id="result"></p>`;
      break;
    case 'temperature':
      area.innerHTML = `<h3>Temperature Converter</h3>
        <input placeholder="Celsius" id="celsius" type="number">
        <button onclick="toFahrenheit()">Convert to Fahrenheit</button>
        <p id="result"></p>`;
      break;
    case 'dna':
      area.innerHTML = `<h3>DNA Concentration</h3>
        <input placeholder="Absorbance @260nm" id="abs" type="number">
        <input placeholder="Dilution factor" id="df" type="number">
        <button onclick="calcDNA()">Calculate ng/µL</button>
        <p id="result"></p>`;
      break;
    case 'rna':
      area.innerHTML = `<h3>RNA Concentration</h3>
        <input placeholder="Abs @260nm" id="abs" type="number">
        <input placeholder="Dilution factor" id="df" type="number">
        <button onclick="calcRNA()">Calculate ng/µL</button>
        <p id="result"></p>`;
      break;
    case 'protein':
      area.innerHTML = `<h3>Protein Concentration (Bradford)</h3>
        <input placeholder="Absorbance @595nm" id="abs" type="number">
        <input placeholder="Slope (std curve)" id="slope" type="number">
        <button onclick="calcProtein()">Calculate µg/mL</button>
        <p id="result"></p>`;
      break;
    case 'serial':
      area.innerHTML = `<h3>Serial Dilution (factor 10)</h3>
        <input placeholder="Initial conc." id="initconc" type="number">
        <input placeholder="Number of dilutions" id="dil" type="number">
        <button onclick="serialDilution()">Show</button>
        <ul id="result"></ul>`;
      break;
    case 'cell':
      area.innerHTML = `<h3>Cell Count</h3>
        <input placeholder="Avg count per square" id="count" type="number">
        <input placeholder="Dilution factor" id="dilf" type="number">
        <button onclick="calcCells()">Calculate cells/mL</button>
        <p id="result"></p>`;
      break;
    case 'buffer':
      area.innerHTML = `<h3>Buffer Preparation (Tris example)</h3>
        <input placeholder="Desired pH" id="phbuffer" type="number">
        <input placeholder="Volume (L)" id="volbuffer" type="number">
        <button onclick="bufferPrep()">Suggest Components</button>
        <p id="result"></p>`;
      break;
    case 'mass':
      area.innerHTML = `<h3>Mass ↔ Moles</h3>
        <input placeholder="Mass (g)" id="mass" type="number">
        <input placeholder="Molar mass (g/mol)" id="mm" type="number">
        <button onclick="calcMoles()">Calculate Moles</button>
        <p id="result"></p>`;
      break;
  }
});

function calcMolarity() {
  let mol = +document.getElementById('mol').value;
  let vol = +document.getElementById('vol').value;
  document.getElementById('result').innerText = `Molarity = ${(mol / vol).toFixed(2)} M`;
}
function calcV2() {
  let c1 = +document.getElementById('c1').value;
  let v1 = +document.getElementById('v1').value;
  let c2 = +document.getElementById('c2').value;
  let v2 = (c1 * v1) / c2;
  document.getElementById('result').innerText = `V₂ = ${v2.toFixed(2)} units`;
}
function calcPH() {
  let h = +document.getElementById('hplus').value;
  document.getElementById('result').innerText = `pH = ${(-Math.log10(h)).toFixed(2)}`;
}
function toFahrenheit() {
  let c = +document.getElementById('celsius').value;
  document.getElementById('result').innerText = `${(c * 9 / 5 + 32).toFixed(2)} °F`;
}
function calcDNA() {
  let abs = +document.getElementById('abs').value;
  let df = +document.getElementById('df').value;
  document.getElementById('result').innerText = `${(abs * 50 * df).toFixed(2)} ng/µL`;
}
function calcRNA() {
  let abs = +document.getElementById('abs').value;
  let df = +document.getElementById('df').value;
  document.getElementById('result').innerText = `${(abs * 40 * df).toFixed(2)} ng/µL`;
}
function calcProtein() {
  let abs = +document.getElementById('abs').value;
  let slope = +document.getElementById('slope').value;
  document.getElementById('result').innerText = `${(abs / slope).toFixed(2)} µg/mL`;
}
function serialDilution() {
  let c = +document.getElementById('initconc').value;
  let d = +document.getElementById('dil').value;
  let res = '';
  for (let i = 0; i <= d; i++) {
    res += `<li>Tube ${i + 1}: ${c.toExponential(2)}</li>`;
    c /= 10;
  }
  document.getElementById('result').innerHTML = res;
}
function calcCells() {
  let count = +document.getElementById('count').value;
  let df = +document.getElementById('dilf').value;
  document.getElementById('result').innerText = `${count * df * 10000} cells/mL`;
}
function bufferPrep() {
  let ph = +document.getElementById('phbuffer').value;
  let vol = +document.getElementById('volbuffer').value;
  document.getElementById('result').innerText = `Prepare ${vol} L buffer with Tris base and adjust pH to ${ph} using HCl/NaOH.`;
}
function calcMoles() {
  let m = +document.getElementById('mass').value;
  let mm = +document.getElementById('mm').value;
  document.getElementById('result').innerText = `${(m / mm).toFixed(4)} mol`;
}

// Timer Logic
let timers = [];

document.getElementById('timer-form').addEventListener('submit', function (e) {
  e.preventDefault();
  let label = document.getElementById('label').value;
  let hrs = +document.getElementById('hours').value || 0;
  let mins = +document.getElementById('minutes').value || 0;
  let secs = +document.getElementById('seconds').value || 0;
  let duration = hrs * 3600 + mins * 60 + secs;
  if (duration <= 0) return;

  const id = Date.now();
  timers.push({ id, label, remaining: duration });
  updateTimers();
});

function updateTimers() {
  const list = document.getElementById('timer-list');
  list.innerHTML = '';
  timers.forEach(timer => {
    const div = document.createElement('div');
    div.className = 'timer-card';
    div.innerHTML = `
      <div><span class="timer-label">${timer.label}</span><br>
      <span class="timer-remaining" id="t-${timer.id}">${formatTime(timer.remaining)}</span></div>
      <button class="delete-btn" onclick="deleteTimer(${timer.id})">X</button>`;
    list.appendChild(div);
  });
}

function deleteTimer(id) {
  timers = timers.filter(t => t.id !== id);
  updateTimers();
}

function formatTime(s) {
  let h = Math.floor(s / 3600);
  let m = Math.floor((s % 3600) / 60);
  let sec = s % 60;
  return `${h}h ${m}m ${sec}s`;
}

setInterval(() => {
  timers.forEach(t => {
    if (t.remaining > 0) {
      t.remaining--;
      document.getElementById(`t-${t.id}`).textContent = formatTime(t.remaining);
    } else {
      if (document.getElementById(`t-${t.id}`)) {
        document.getElementById(`t-${t.id}`).textContent = '⏰ Done!';
        playSound();
      }
    }
  });
}, 1000);

function playSound() {
  let beep = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
  beep.play();
}
