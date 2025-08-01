// script.js
const toolSelect = document.getElementById("tool-select");
const calculatorArea = document.getElementById("calculator-area");

const tools = {
  molarity: {
    html: `Moles: <input id="mol-moles"> Volume (L): <input id="mol-volume"> <button onclick="calcMolarity()">Calculate</button> <p id="mol-result"></p>`,
    logic: () => {
      const moles = parseFloat(document.getElementById("mol-moles").value);
      const volume = parseFloat(document.getElementById("mol-volume").value);
      document.getElementById("mol-result").textContent = volume ? `Molarity: ${(moles / volume).toFixed(2)} M` : 'Invalid input';
    },
  },
  dilution: {
    html: `C1: <input id="c1"> V1: <input id="v1"> C2: <input id="c2"> V2: <input id="v2"> <button onclick="calcDilution()">Calculate</button> <p id="dilution-result"></p>`,
    logic: () => {
      const C1 = parseFloat(document.getElementById("c1").value);
      const V1 = parseFloat(document.getElementById("v1").value);
      const C2 = parseFloat(document.getElementById("c2").value);
      const V2 = parseFloat(document.getElementById("v2").value);
      let result = '';
      if (!isNaN(C1) && !isNaN(V1) && !isNaN(C2)) result = `V2 = ${(C1 * V1 / C2).toFixed(2)}`;
      else if (!isNaN(C1) && !isNaN(V1) && !isNaN(V2)) result = `C2 = ${(C1 * V1 / V2).toFixed(2)}`;
      else if (!isNaN(C2) && !isNaN(V2) && !isNaN(C1)) result = `V1 = ${(C2 * V2 / C1).toFixed(2)}`;
      else if (!isNaN(C2) && !isNaN(V2) && !isNaN(V1)) result = `C1 = ${(C2 * V2 / V1).toFixed(2)}`;
      else result = 'Enter 3 values';
      document.getElementById("dilution-result").textContent = result;
    },
  },
  ph: {
    html: `H⁺ Concentration (mol/L): <input id="hcon"> <button onclick="calcPH()">Calculate</button> <p id="ph-result"></p>`,
    logic: () => {
      const h = parseFloat(document.getElementById("hcon").value);
      document.getElementById("ph-result").textContent = h ? `pH = ${(-Math.log10(h)).toFixed(2)}` : 'Invalid input';
    },
  },
  temperature: {
    html: `Celsius: <input id="celsius"> <button onclick="calcTemp()">Convert</button> <p id="temp-result"></p>`,
    logic: () => {
      const c = parseFloat(document.getElementById("celsius").value);
      document.getElementById("temp-result").textContent = isNaN(c) ? 'Invalid input' : `Fahrenheit = ${(c * 9/5 + 32).toFixed(1)} °F`;
    },
  },
  dna: {
    html: `DNA Conc (ng/µL): <input id="dna-conc"> Length (bp): <input id="dna-len"> <button onclick="calcDNA()">Convert</button> <p id="dna-result"></p>`,
    logic: () => {
      const conc = parseFloat(document.getElementById("dna-conc").value);
      const len = parseFloat(document.getElementById("dna-len").value);
      const mw = len * 660;
      const um = conc / mw * 1e6;
      document.getElementById("dna-result").textContent = isNaN(um) ? 'Invalid input' : `DNA: ${um.toFixed(2)} µM`;
    },
  },
  rna: {
    html: `RNA Conc (ng/µL): <input id="rna-conc"> Length (nt): <input id="rna-len"> <button onclick="calcRNA()">Convert</button> <p id="rna-result"></p>`,
    logic: () => {
      const conc = parseFloat(document.getElementById("rna-conc").value);
      const len = parseFloat(document.getElementById("rna-len").value);
      const mw = len * 340;
      const um = conc / mw * 1e6;
      document.getElementById("rna-result").textContent = isNaN(um) ? 'Invalid input' : `RNA: ${um.toFixed(2)} µM`;
    },
  },
  protein: {
    html: `Protein Conc (mg/mL): <input id="prot-conc"> MW (kDa): <input id="prot-mw"> <button onclick="calcProtein()">Convert</button> <p id="prot-result"></p>`,
    logic: () => {
      const conc = parseFloat(document.getElementById("prot-conc").value);
      const mw = parseFloat(document.getElementById("prot-mw").value) * 1000;
      const um = conc / mw * 1e6;
      document.getElementById("prot-result").textContent = isNaN(um) ? 'Invalid input' : `Protein: ${um.toFixed(2)} µM`;
    },
  },
  agarose: {
    html: `Weight (g): <input id="gel-wt"> Volume (mL): <input id="gel-vol"> <button onclick="calcGel()">Calculate</button> <p id="gel-result"></p>`,
    logic: () => {
      const wt = parseFloat(document.getElementById("gel-wt").value);
      const vol = parseFloat(document.getElementById("gel-vol").value);
      const perc = wt / vol * 100;
      document.getElementById("gel-result").textContent = isNaN(perc) ? 'Invalid input' : `Gel %: ${perc.toFixed(2)}`;
    },
  },
  serial: {
    html: `Initial Conc: <input id="ser-init"> Dilution Factor: <input id="ser-df"> <button onclick="calcSerial()">Calculate</button> <p id="ser-result"></p>`,
    logic: () => {
      const init = parseFloat(document.getElementById("ser-init").value);
      const df = parseFloat(document.getElementById("ser-df").value);
      const newc = init / df;
      document.getElementById("ser-result").textContent = isNaN(newc) ? 'Invalid input' : `New Conc: ${newc.toFixed(2)}`;
    },
  },
  absorbance: {
    html: `Absorbance (A): <input id="abs-a"> E (M⁻¹cm⁻¹): <input id="abs-e"> Path (cm): <input id="abs-l"> <button onclick="calcAbs()">Calculate</button> <p id="abs-result"></p>`,
    logic: () => {
      const A = parseFloat(document.getElementById("abs-a").value);
      const E = parseFloat(document.getElementById("abs-e").value);
      const L = parseFloat(document.getElementById("abs-l").value);
      const conc = A / (E * L);
      document.getElementById("abs-result").textContent = isNaN(conc) ? 'Invalid input' : `Conc: ${conc.toExponential(2)} M`;
    },
  },
  mw: {
    html: `Moles: <input id="mw-mol"> MW (g/mol): <input id="mw-val"> <button onclick="calcMW()">Calculate</button> <p id="mw-result"></p>`,
    logic: () => {
      const mol = parseFloat(document.getElementById("mw-mol").value);
      const mw = parseFloat(document.getElementById("mw-val").value);
      const wt = mol * mw;
      document.getElementById("mw-result").textContent = isNaN(wt) ? 'Invalid input' : `Mass: ${wt.toFixed(2)} g`;
    },
  },
};

// Dropdown change
toolSelect.addEventListener("change", () => {
  const tool = tools[toolSelect.value];
  if (tool) {
    calculatorArea.innerHTML = `<div>${tool.html}</div>`;
  }
});

// Hook logic
window.calcMolarity = tools.molarity.logic;
window.calcDilution = tools.dilution.logic;
window.calcPH = tools.ph.logic;
window.calcTemp = tools.temperature.logic;
window.calcDNA = tools.dna.logic;
window.calcRNA = tools.rna.logic;
window.calcProtein = tools.protein.logic;
window.calcGel = tools.agarose.logic;
window.calcSerial = tools.serial.logic;
window.calcAbs = tools.absorbance.logic;
window.calcMW = tools.mw.logic;

// Timer Logic
const timerForm = document.getElementById("timer-form");
const timerList = document.getElementById("timer-list");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function createTimer(label, seconds) {
  const card = document.createElement("div");
  card.className = "timer-card";
  card.innerHTML = `<span class="timer-label">${label}</span><span class="timer-remaining">${formatTime(seconds)}</span><button class="delete-btn">✖</button>`;

  const timeSpan = card.querySelector(".timer-remaining");
  const delBtn = card.querySelector(".delete-btn");
  timerList.appendChild(card);

  const interval = setInterval(() => {
    seconds--;
    timeSpan.textContent = formatTime(seconds);
    if (seconds <= 0) {
      clearInterval(interval);
      timeSpan.textContent = "⏰ Done!";
      alert(`${label} timer finished!`);
    }
  }, 1000);

  delBtn.onclick = () => {
    clearInterval(interval);
    card.remove();
  };
}

timerForm.onsubmit = (e) => {
  e.preventDefault();
  const label = document.getElementById("label").value || "Timer";
  const mins = parseInt(document.getElementById("minutes").value);
  const secs = parseInt(document.getElementById("seconds").value);
  const total = (isNaN(mins) ? 0 : mins * 60) + (isNaN(secs) ? 0 : secs);
  if (total > 0) createTimer(label, total);
  timerForm.reset();
};
