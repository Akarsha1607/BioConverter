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
  mediaPrep: {
    name: "Media Preparation Calculator",
    icon: "test-tube-2",
    description: "Calculate how much solute to weigh for percent solutions.",
    inputs: ["Desired % (w/v)", "Final Volume (mL)"],
    calculate: ([percent, vol]) => ((+percent * +vol) / 100).toFixed(2),
    unit: "grams"
  },
  unitConverter: {
    name: "Unit Converter",
    icon: "ruler",
    description: "Convert between units like mL to µL, g to mg, etc.",
    inputs: ["Value", "From (g/mg/µL/mL)", "To (g/mg/µL/mL)"],
    calculate: ([value, from, to]) => {
      const table = {
        g: 1, mg: 1e-3, µg: 1e-6,
        mL: 1, µL: 1e-3
      };
      return ((+value * table[from]) / table[to]).toExponential(3);
    },
    unit: "Converted"
  },
  cmv: {
    name: "Conc ⇌ Mass ⇌ Volume Tool",
    icon: "scales",
    description: "Input any 2 of concentration (mg/mL), mass (mg), volume (mL) to calculate the third.",
    inputs: ["Concentration (mg/mL)", "Mass (mg)", "Volume (mL)"],
    calculate: ([conc, mass, vol]) => {
      if (!conc) return (mass / vol).toFixed(2) + " mg/mL";
      if (!mass) return (conc * vol).toFixed(2) + " mg";
      if (!vol) return (mass / conc).toFixed(2) + " mL";
      return "Leave one field empty to calculate it.";
    },
    unit: "Result"
  }
};

// === DOM Elements ===
const toolSelect = document.getElementById("tool-select");
const toolArea = document.getElementById("tool-area");
const toolDescription = document.getElementById("tool-description");

// === Populate Dropdown ===
for (let key in tools) {
  const opt = document.createElement("option");
  opt.value = key;
  opt.textContent = tools[key].name;
  toolSelect.appendChild(opt);
}

// === Load Selected Tool ===
toolSelect.addEventListener("change", () => loadTool(toolSelect.value));
function loadTool(key) {
  const tool = tools[key];
  toolArea.innerHTML = "";
  toolDescription.textContent = tool.description;

  const form = document.createElement("div");
  form.className = "tool-form";

  const inputElems = [];
  tool.inputs.forEach((label, idx) => {
    const input = document.createElement("input");
    input.placeholder = label;
    input.setAttribute("title", label);
    input.id = `input-${idx}`;
    form.appendChild(input);
    inputElems.push(input);
  });

  const result = document.createElement("p");
  result.id = "result";

  const btn = document.createElement("button");
  btn.textContent = "Calculate";
  btn.onclick = () => {
    const values = inputElems.map(inp => inp.value.trim());
    const output = tool.calculate(values);
    result.innerHTML = `<strong>Result:</strong> ${output} ${tool.unit}`;
  };

  form.appendChild(btn);
  form.appendChild(result);
  toolArea.appendChild(form);
}

// === Initial Load ===
loadTool(toolSelect.value);

// === Timer Function ===
function startTimer() {
  const h = +document.getElementById("hours").value || 0;
  const m = +document.getElementById("minutes").value || 0;
  const s = +document.getElementById("seconds").value || 0;
  const label = document.getElementById("timer-label").value || "Timer";
  const output = document.getElementById("timer-output");
  const sound = document.getElementById("timer-sound");

  let total = h * 3600 + m * 60 + s;
  if (total === 0) {
    alert("Please enter a valid time.");
    return;
  }

  const interval = setInterval(() => {
    const hh = String(Math.floor(total / 3600)).padStart(2, '0');
    const mm = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const ss = String(total % 60).padStart(2, '0');
    output.textContent = `${label}: ${hh}:${mm}:${ss}`;
    if (--total < 0) {
      clearInterval(interval);
      output.textContent = `${label} is done!`;
      sound.play();
      alert(`${label} finished!`);
    }
  }, 1000);
}
