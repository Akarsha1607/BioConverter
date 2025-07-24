// script.js

function toggleCalculator(id) {
  const content = document.getElementById(id);
  if (content.style.display === "none" || !content.style.display) {
    content.style.display = "block";
  } else {
    content.style.display = "none";
  }
}

// Timer logic
let timer;
let isRunning = false;
let startTime;

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - (timer || 0);
    timer = setInterval(updateTimer, 10);
    isRunning = true;
  }
}

function pauseTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("timerDisplay").textContent = "00:00:00";
  timer = null;
}

function updateTimer() {
  const currentTime = Date.now() - startTime;
  const date = new Date(currentTime);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}:${milliseconds}`;
}

// Calculator logic

function calculateMolarity() {
  const mol = parseFloat(document.getElementById("mol").value);
  const volume = parseFloat(document.getElementById("volume").value);
  if (!isNaN(mol) && !isNaN(volume) && volume !== 0) {
    const molarity = mol / volume;
    document.getElementById("molarityResult").textContent = `Molarity = ${molarity.toFixed(2)} mol/L`;
  } else {
    document.getElementById("molarityResult").textContent = "Please enter valid inputs.";
  }
}

function calculateDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const v2 = parseFloat(document.getElementById("v2").value);
  if (!isNaN(c1) && !isNaN(v1) && !isNaN(v2) && v2 !== 0) {
    const c2 = (c1 * v1) / v2;
    document.getElementById("dilutionResult").textContent = `Required C2 = ${c2.toFixed(2)}`;
  } else {
    document.getElementById("dilutionResult").textContent = "Please enter valid inputs.";
  }
}

function calculateMicroliterToMg() {
  const microliters = parseFloat(document.getElementById("microliters").value);
  const density = parseFloat(document.getElementById("density").value);
  if (!isNaN(microliters) && !isNaN(density)) {
    const mg = microliters * density;
    document.getElementById("mgResult").textContent = `${mg.toFixed(2)} mg`;
  } else {
    document.getElementById("mgResult").textContent = "Please enter valid inputs.";
  }
}

function calculateMassToMol() {
  const mass = parseFloat(document.getElementById("mass").value);
  const mw = parseFloat(document.getElementById("mw").value);
  if (!isNaN(mass) && !isNaN(mw) && mw !== 0) {
    const mol = mass / mw;
    document.getElementById("molResult").textContent = `${mol.toFixed(4)} mol`;
  } else {
    document.getElementById("molResult").textContent = "Please enter valid inputs.";
  }
}

function convertTemperature() {
  const input = parseFloat(document.getElementById("tempInput").value);
  const unit = document.getElementById("tempUnit").value;
  let result = "";
  if (!isNaN(input)) {
    switch(unit) {
      case 'C':
        result = `${input}°C = ${(input * 9/5 + 32).toFixed(2)}°F, ${(input + 273.15).toFixed(2)}K`;
        break;
      case 'F':
        result = `${input}°F = ${((input - 32) * 5/9).toFixed(2)}°C, ${(((input - 32) * 5/9) + 273.15).toFixed(2)}K`;
        break;
      case 'K':
        result = `${input}K = ${(input - 273.15).toFixed(2)}°C, ${((input - 273.15) * 9/5 + 32).toFixed(2)}°F`;
        break;
    }
    document.getElementById("tempResult").textContent = result;
  } else {
    document.getElementById("tempResult").textContent = "Please enter a valid number.";
  }
}

function calculatePHtoH() {
  const pH = parseFloat(document.getElementById("pHvalue").value);
  if (!isNaN(pH)) {
    const hConcentration = Math.pow(10, -pH);
    document.getElementById("pHResult").textContent = `[H⁺] = ${hConcentration.toExponential(2)} mol/L`;
  } else {
    document.getElementById("pHResult").textContent = "Please enter a valid pH value.";
  }
}

function convertDNAconc() {
  const conc = parseFloat(document.getElementById("conc").value);
  if (!isNaN(conc)) {
    const converted = conc * 1000;
    document.getElementById("dnaResult").textContent = `${converted} nM`;
  } else {
    document.getElementById("dnaResult").textContent = "Please enter a valid concentration.";
  }
}

function calculateSerialDilution() {
  const stockConc = parseFloat(document.getElementById("stockConc").value);
  const dilutionFactor = parseFloat(document.getElementById("dilutionFactor").value);
  const numSteps = parseInt(document.getElementById("numSteps").value);
  if (!isNaN(stockConc) && !isNaN(dilutionFactor) && !isNaN(numSteps)) {
    let results = "";
    for (let i = 0; i < numSteps; i++) {
      const conc = stockConc / Math.pow(dilutionFactor, i + 1);
      results += `Step ${i + 1}: ${conc.toExponential(2)}\n`;
    }
    document.getElementById("serialDilutionResult").textContent = results;
  } else {
    document.getElementById("serialDilutionResult").textContent = "Please enter valid inputs.";
  }
}



