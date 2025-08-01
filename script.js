// === Tool Definitions ===
const tools = {
  molarity: {
    name: "Molarity Calculator",
    icon: "flask-conical",
    description: "Calculate molarity (mol/L) from mass, volume, and molecular weight.",
    inputs: ["Mass (g)", "Volume (L)", "Molecular Weight (g/mol)"],
    calculate: ([mass, volume, mw]) => (+mass / (+volume * +mw)).toFixed(4),
    unit: "M"
  },
  dilution: {
    name: "Dilution Calculator",
    icon: "droplet",
    description: "Use C1V1 = C2V2 to calculate dilution volumes or concentrations.",
    inputs: ["Initial Concentration (C1)", "Initial Volume (V1)", "Final Concentration (C2)"],
    calculate: ([c1, v1, c2]) => ((c1 * v1) / c2).toFixed(2),
    unit: "Final Volume (V2)"
  },
  serialDilution: {
    name: "Serial Dilution Calculator",
    icon: "repeat",
    description: "Calculate concentrations across serial dilution steps.",
    inputs: ["Initial Concentration", "Dilution Factor", "Number of Steps"],
    calculate: ([initConc, factor, steps]) => {
      let result = "";
      let current = +initConc;
      for (let i = 0; i < +steps; i++) {
        current /= +factor;
        result += `Step ${i + 1}: ${current.toExponential(3)}<br/>`;
      }
      return result;
    },
    unit: "Concentration"
  },
  pH: {
    name: "pH Calculator",
    icon: "beaker",
    description: "Convert H⁺ concentration to pH value.",
    inputs: ["[H⁺] (mol/L)"],
    calculate: ([h]) => (-Math.log10(+h)).toFixed(2),
    unit: "pH"
  },
  temperature: {
    name: "Temperature Converter",
    icon: "thermometer",
    description: "Convert between Celsius, Fahrenheit, and Kelvin.",
    inputs: ["Temperature", "From (°C/°F/K)", "To (°C/°F/K)"],
    calculate: ([value, from, to]) => {
      value = parseFloat(value);
      const conversions = {
        "C→F": (v) => (v * 9 / 5) + 32,
        "C→K": (v) => v + 273.15,
        "F→C": (v) => (v - 32) * 5 / 9,
        "F→K": (v) => ((v - 32) * 5 / 9) + 273.15,
        "K→C": (v) => v - 273.15,
        "K→F": (v) => ((v - 273.15) * 9 / 5) + 32
      };
      if (from === to) return value.toFixed(2);
      return conversions[`${from}→${to}`](value).toFixed(2);
    },
    unit: "Converted Temperature"
  },
  dna: {
    name: "DNA Concentration Converter",
    icon: "dna",
    description: "Convert DNA ng/μL to molarity based on length (bp).",
    inputs: ["Concentration (ng/μL)", "Length (bp)"],
    calculate: ([conc, bp]) => ((+conc * 1e-9) / (+bp * 660) * 1e6).toExponential(3),
    unit: "μM"
  },
  rna: {
    name: "RNA Concentration Converter",
    icon: "dna",
    description: "Convert RNA ng/μL to molarity based on length (nt).",
    inputs: ["Concentration (ng/μL)", "Length (nt)"],
    calculate: ([conc, nt]) => ((+conc * 1e-9) / (+nt * 340) * 1e6).toExponential(3),
    unit: "μM"
  },
  protein: {
    name: "Protein Concentration Converter",
    icon: "dumbbell",
    description: "Convert protein ng/μL to μM based on molecular weight.",
    inputs: ["Concentration (ng/μL)", "MW (kDa)"],
    calculate: ([conc, mw]) => ((+conc * 1e-9) / (+mw * 1000) * 1e6).toFixed(2),
    unit: "μM"
  },
  od600: {
    name: "OD600 Calculator",
    icon: "circle",
    description: "Estimate cell count from OD600 reading.",
    inputs: ["OD600", "Conversion Factor (e.g., 8x10⁸)"],
    calculate: ([od, factor]) => (+od * +factor).toExponential(2),
    unit: "cells/mL"
  },
  bufferDilution: {
    name: "Buffer Dilution Calculator",
    icon: "pipette",
    description: "Calculate volume of stock buffer needed to prepare a diluted solution.",
    inputs: ["Stock Concentration (x)", "Final Concentration (x)", "Final Volume (mL)"],
    calculate: ([stock, final, volume]) => ((+final * +volume) / +stock).toFixed(2),
    unit: "mL of Stock"
  },
// script.js

document.addEventListener("DOMContentLoaded", function () {
  const toolSelector = document.getElementById("tool");
  const calculator = document.getElementById("calculator");
  const toolInfo = document.getElementById("tool-info");

  toolSelector.addEventListener("change", function () {
    loadTool(this.value);
  });

  function loadTool(tool) {
    calculator.innerHTML = "";
    toolInfo.innerHTML = "";
    switch (tool) {
      case "molarity":
        toolInfo.innerHTML = "<p>Calculate molarity (mol/L) using mass, volume, and molar mass.</p>";
        calculator.innerHTML = `
          <label>Mass (g): <input type="number" id="mass"></label>
          <label>Volume (L): <input type="number" id="volume"></label>
          <label>Molar Mass (g/mol): <input type="number" id="molarMass"></label>
          <button onclick="calcMolarity()">Calculate</button>
          <p id="result"></p>
        `;
        break;
      case "dilution":
        toolInfo.innerHTML = "<p>Calculate final concentration or volume using C1V1 = C2V2.</p>";
        calculator.innerHTML = `
          <label>C1 (initial conc): <input type="number" id="c1"></label>
          <label>V1 (initial vol): <input type="number" id="v1"></label>
          <label>C2 (final conc): <input type="number" id="c2"></label>
          <button onclick="calcDilution()">Calculate V2</button>
          <p id="result"></p>
        `;
        break;
      case "serial":
        toolInfo.innerHTML = "<p>Perform serial dilution calculations.</p>";
        calculator.innerHTML = `
          <label>Initial Conc: <input type="number" id="serialStart"></label>
          <label>Dilution Factor: <input type="number" id="dilFactor"></label>
          <label>Steps: <input type="number" id="steps"></label>
          <button onclick="calcSerial()">Calculate</button>
          <ul id="result"></ul>
        `;
        break;
      case "ph":
        toolInfo.innerHTML = "<p>Calculate pH from hydrogen ion concentration.</p>";
        calculator.innerHTML = `
          <label>[H<sup>+</sup>] (mol/L): <input type="number" id="hplus" step="any"></label>
          <button onclick="calcPH()">Calculate pH</button>
          <p id="result"></p>
        `;
        break;
      case "temp":
        toolInfo.innerHTML = "<p>Convert between °C, °F, and K.</p>";
        calculator.innerHTML = `
          <label>From: <select id="fromTemp">
            <option value="C">°C</option>
            <option value="F">°F</option>
            <option value="K">K</option>
          </select></label>
          <label>To: <select id="toTemp">
            <option value="C">°C</option>
            <option value="F">°F</option>
            <option value="K">K</option>
          </select></label>
          <label>Value: <input type="number" id="tempVal"></label>
          <button onclick="convertTemp()">Convert</button>
          <p id="result"></p>
        `;
        break;
      case "timer":
        toolInfo.innerHTML = "<p>Set a countdown timer with sound notification.</p>";
        calculator.innerHTML = `
          <label>Hours: <input type="number" id="hours" value="0"></label>
          <label>Minutes: <input type="number" id="minutes" value="0"></label>
          <label>Seconds: <input type="number" id="seconds" value="0"></label>
          <button onclick="startTimer()">Start Timer</button>
          <p id="timerDisplay"></p>
        `;
        break;
      default:
        toolInfo.innerHTML = "<p>Select a tool to get started.</p>";
    }
  }

  loadTool(toolSelector.value); // Load initial tool on page load
});

function calcMolarity() {
  const m = parseFloat(document.getElementById("mass").value);
  const v = parseFloat(document.getElementById("volume").value);
  const mm = parseFloat(document.getElementById("molarMass").value);
  const molarity = m / (mm * v);
  document.getElementById("result").textContent = `Molarity = ${molarity.toFixed(4)} mol/L`;
}

function calcDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const c2 = parseFloat(document.getElementById("c2").value);
  const v2 = (c1 * v1) / c2;
  document.getElementById("result").textContent = `Required V2 = ${v2.toFixed(4)} units`;
}

function calcSerial() {
  const start = parseFloat(document.getElementById("serialStart").value);
  const factor = parseFloat(document.getElementById("dilFactor").value);
  const steps = parseInt(document.getElementById("steps").value);
  const ul = document.getElementById("result");
  ul.innerHTML = "";
  let value = start;
  for (let i = 0; i < steps; i++) {
    const li = document.createElement("li");
    li.textContent = `Step ${i + 1}: ${value.toExponential(4)}`;
    ul.appendChild(li);
    value /= factor;
  }
}

function calcPH() {
  const h = parseFloat(document.getElementById("hplus").value);
  const ph = -Math.log10(h);
  document.getElementById("result").textContent = `pH = ${ph.toFixed(2)}`;
}

function convertTemp() {
  const from = document.getElementById("fromTemp").value;
  const to = document.getElementById("toTemp").value;
  let val = parseFloat(document.getElementById("tempVal").value);
  let result;
  if (from === to) result = val;
  else if (from === "C" && to === "F") result = val * 9 / 5 + 32;
  else if (from === "C" && to === "K") result = val + 273.15;
  else if (from === "F" && to === "C") result = (val - 32) * 5 / 9;
  else if (from === "F" && to === "K") result = (val - 32) * 5 / 9 + 273.15;
  else if (from === "K" && to === "C") result = val - 273.15;
  else if (from === "K" && to === "F") result = (val - 273.15) * 9 / 5 + 32;
  document.getElementById("result").textContent = `Converted = ${result.toFixed(2)} °${to}`;
}

function startTimer() {
  let h = parseInt(document.getElementById("hours").value);
  let m = parseInt(document.getElementById("minutes").value);
  let s = parseInt(document.getElementById("seconds").value);
  let total = h * 3600 + m * 60 + s;
  const display = document.getElementById("timerDisplay");
  const audio = document.getElementById("timer-sound");

  const timer = setInterval(() => {
    if (total <= 0) {
      clearInterval(timer);
      display.textContent = "Time's up!";
      audio.play();
      return;
    }
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    display.textContent = `${hrs}h ${mins}m ${secs}s`;
    total--;
  }, 1000);
}

