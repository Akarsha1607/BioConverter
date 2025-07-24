// MOLARITY
function calculateMolarity() {
  const mass = parseFloat(document.getElementById("mass").value);
  const molarMass = parseFloat(document.getElementById("molarMass").value);
  const volume = parseFloat(document.getElementById("volume").value);
  if (mass && molarMass && volume) {
    const molarity = mass / molarMass / volume;
    document.getElementById("molarityResult").innerText = molarity.toFixed(3) + " M";
  }
}

// DILUTION
function calculateDilution() {
  const c1 = parseFloat(document.getElementById("c1").value);
  const v1 = parseFloat(document.getElementById("v1").value);
  const c2 = parseFloat(document.getElementById("c2").value);
  if (c1 && v1 && c2) {
    const v2 = (c1 * v1) / c2;
    document.getElementById("dilutionResult").innerText = "Final Volume (V2): " + v2.toFixed(2) + " L";
  }
}

// TEMPERATURE
function convertTemperature() {
  const celsius = parseFloat(document.getElementById("celsius").value);
  if (!isNaN(celsius)) {
    const fahrenheit = (celsius * 9/5) + 32;
    document.getElementById("tempResult").innerText = fahrenheit.toFixed(2) + " °F";
  }
}

// DNA: ng/uL to nM
function convertDNA() {
  const concentration = parseFloat(document.getElementById("dnaConc").value);
  const length = parseFloat(document.getElementById("dnaLength").value);
  if (concentration && length) {
    const nM = (concentration * 1e6) / (660 * length);
    document.getElementById("dnaResult").innerText = nM.toFixed(2) + " nM";
  }
}

// pH from H+ concentration
function calculatepH() {
  const hConc = parseFloat(document.getElementById("hConc").value);
  if (hConc > 0) {
    const pH = -Math.log10(hConc);
    document.getElementById("phResult").innerText = "pH = " + pH.toFixed(2);
  }
}

// Serial Dilution (10x for now)
function calculateSerialDilution() {
  const initialConc = parseFloat(document.getElementById("initialConc").value);
  const dilutions = parseInt(document.getElementById("dilutionSteps").value);
  if (initialConc && dilutions > 0) {
    let output = "";
    let conc = initialConc;
    for (let i = 1; i <= dilutions; i++) {
      conc /= 10;
      output += `Step ${i}: ${conc.toExponential(2)}<br>`;
    }
    document.getElementById("serialResult").innerHTML = output;
  }
}

// Mass to Moles
function convertToMoles() {
  const mass = parseFloat(document.getElementById("massMole").value);
  const molarMass = parseFloat(document.getElementById("molarMassMole").value);
  if (mass && molarMass) {
    const moles = mass / molarMass;
    document.getElementById("molesResult").innerText = moles.toFixed(3) + " mol";
  }
}

// Volume from Moles
function calculateVolumeFromMoles() {
  const moles = parseFloat(document.getElementById("molesVol").value);
  const molarity = parseFloat(document.getElementById("molarityVol").value);
  if (moles && molarity) {
    const volume = moles / molarity;
    document.getElementById("volumeResult").innerText = volume.toFixed(2) + " L";
  }
}

// Percent Solution
function calculatePercentSolution() {
  const solute = parseFloat(document.getElementById("solute").value);
  const solution = parseFloat(document.getElementById("solution").value);
  if (solute && solution) {
    const percent = (solute / solution) * 100;
    document.getElementById("percentResult").innerText = percent.toFixed(2) + " %";
  }
}

// TIMER
let timerInterval;
function startTimer() {
  const mins = parseInt(document.getElementById("minutes").value);
  const secs = parseInt(document.getElementById("seconds").value);
  let total = mins * 60 + secs;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const m = Math.floor(total / 60);
    const s = total % 60;
    document.getElementById("timer").innerText = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    total--;
    if (total < 0) {
      clearInterval(timerInterval);
      alert("Time's up!");
    }
  }, 1000);
}

