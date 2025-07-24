function calcMolarity() {
  const mass = parseFloat(document.getElementById('mass').value);
  const molarMass = parseFloat(document.getElementById('molarMass').value);
  const volume = parseFloat(document.getElementById('volume').value);
  const result = (mass / molarMass) / volume;
  document.getElementById('molarityResult').innerText = `Molarity = ${result.toFixed(3)} M`;
}

function calcDilution() {
  const c1 = parseFloat(document.getElementById('c1').value);
  const v1 = parseFloat(document.getElementById('v1').value);
  const c2 = parseFloat(document.getElementById('c2').value);
  const v2 = (c1 * v1) / c2;
  document.getElementById('dilutionResult').innerText = `V2 = ${v2.toFixed(3)} units`;
}

function calcMg() {
  const ul = parseFloat(document.getElementById('ul').value);
  const density = parseFloat(document.getElementById('density').value);
  const mg = ul * density;
  document.getElementById('mgResult').innerText = `Mass = ${mg.toFixed(3)} mg`;
}

function convertTemp() {
  const c = parseFloat(document.getElementById('celsius').value);
  const f = (c * 9/5) + 32;
  document.getElementById('tempResult').innerText = `${c}°C = ${f.toFixed(2)}°F`;
}

function convertDNA() {
  const conc = parseFloat(document.getElementById('dnaConc').value);
  const length = parseFloat(document.getElementById('dnaLength').value);
  const nM = (conc * 1e6) / (660 * length);
  document.getElementById('dnaResult').innerText = `${nM.toFixed(2)} nM`;
}

function calcPH() {
  const h = parseFloat(document.getElementById('hConc').value);
  const ph = -Math.log10(h);
  document.getElementById('phResult').innerText = `pH = ${ph.toFixed(2)}`;
}

function serialDilution() {
  let c = parseFloat(document.getElementById('serialC').value);
  const f = parseFloat(document.getElementById('serialF').value);
  const n = parseInt(document.getElementById('serialN').value);
  let results = '';
  for (let i = 0; i < n; i++) {
    results += `Step ${i + 1}: ${c.toFixed(4)}<br>`;
    c /= f;
  }
  document.getElementById('serialResult').innerHTML = results;
}

function calcOD() {
  const od = parseFloat(document.getElementById('od').value);
  const factor = parseFloat(document.getElementById('odFactor').value);
  const conc = od * factor;
  document.getElementById('odResult').innerText = `Conc = ${conc.toFixed(2)}`;
}

function calcMolarMass() {
  const mass = parseFloat(document.getElementById('mmMass').value);
  const moles = parseFloat(document.getElementById('mmMoles').value);
  const mm = mass / moles;
  document.getElementById('mmResult').innerText = `Molar Mass = ${mm.toFixed(2)} g/mol`;
}

// Timer
let timer;
let seconds = 0;

function updateTimer() {
  const min = String(Math.floor(seconds / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  document.getElementById('timer').innerText = `${min}:${sec}`;
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      seconds++;
      updateTimer();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  seconds = 0;
  updateTimer();
}

