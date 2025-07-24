// MASS & VOLUME CONVERTER
function convertMassVolume() {
    const input = parseFloat(document.getElementById("massInput").value);
    const fromUnit = document.getElementById("massFrom").value;
    const toUnit = document.getElementById("massTo").value;

    let result = input;

    // Convert to g first
    if (fromUnit === "mg") result /= 1000;
    else if (fromUnit === "kg") result *= 1000;

    // Convert from g to target
    if (toUnit === "mg") result *= 1000;
    else if (toUnit === "kg") result /= 1000;

    document.getElementById("massResult").innerText = `${result.toFixed(4)} ${toUnit}`;
}

// MOLARITY CALCULATOR
function calculateMolarity() {
    const moles = parseFloat(document.getElementById("molMoles").value);
    const volume = parseFloat(document.getElementById("molVolume").value);
    const molarity = moles / volume;
    document.getElementById("molResult").innerText = `Molarity: ${molarity.toFixed(4)} mol/L`;
}

// DNA/RNA OD260 CALCULATOR
function calcDNA() {
    const od = parseFloat(document.getElementById("odInput").value);
    const type = document.getElementById("dnaType").value;
    let factor = 50;

    if (type === "RNA") factor = 40;
    else if (type === "ssDNA") factor = 33;

    const concentration = od * factor;
    document.getElementById("odResult").innerText = `Concentration: ${concentration.toFixed(2)} µg/mL`;
}

// TEMPERATURE CONVERTER
function convertTemp() {
    const value = parseFloat(document.getElementById("tempInput").value);
    const from = document.getElementById("tempFrom").value;
    const to = document.getElementById("tempTo").value;
    let result = value;

    // Convert to °C
    if (from === "F") result = (value - 32) * 5 / 9;
    else if (from === "K") result = value - 273.15;

    // Convert from °C to target
    if (to === "F") result = (result * 9 / 5) + 32;
    else if (to === "K") result = result + 273.15;

    document.getElementById("tempResult").innerText = `${result.toFixed(2)} °${to}`;
}

// DILUTION CALCULATOR
function calcDilution() {
    const c1 = parseFloat(document.getElementById("c1").value);
    const v1 = parseFloat(document.getElementById("v1").value);
    const c2 = parseFloat(document.getElementById("c2").value);
    const v2 = (c1 * v1) / c2;
    document.getElementById("dilutionResult").innerText = `Required Volume (V2): ${v2.toFixed(2)} mL`;
}

// pH & H+ CALCULATOR
function calcPH() {
    const value = parseFloat(document.getElementById("phInput").value);
    const mode = document.getElementById("phMode").value;
    let result;

    if (mode === "ph") {
        result = Math.pow(10, -value);
        document.getElementById("phResult").innerText = `[H⁺] = ${result.toExponential(2)} mol/L`;
    } else {
        result = -Math.log10(value);
        document.getElementById("phResult").innerText = `pH = ${result.toFixed(2)}`;
    }
}

// MOLECULAR WEIGHT CALCULATOR (basic)
function calculateMW() {
    const formula = document.getElementById("mwFormula").value;
    // Very basic mass lookup
    const masses = {
        H: 1.008, C: 12.01, N: 14.01, O: 16.00, S: 32.07, P: 30.97, Cl: 35.45, Na: 22.99, K: 39.10, Ca: 40.08
    };
    const matches = formula.match(/([A-Z][a-z]*)(\d*)/g);
    let mw = 0;

    if (matches) {
        matches.forEach(m => {
            const [, el, count] = m.match(/([A-Z][a-z]*)(\d*)/) || [];
            if (masses[el]) mw += masses[el] * (parseInt(count) || 1);
        });
    }
    document.getElementById("mwResult").innerText = `Molecular Weight: ${mw.toFixed(3)} g/mol`;
}

// BUFFER DILUTION TOOL
function calcBuffer() {
    const stock = parseFloat(document.getElementById("bufferStock").value);
    const final = parseFloat(document.getElementById("bufferFinal").value);
    const vol = parseFloat(document.getElementById("bufferVol").value);

    const stockVol = (final * vol) / stock;
    const diluentVol = vol - stockVol;

    document.getElementById("bufferResult").innerText =
        `Add ${stockVol.toFixed(2)} mL of stock + ${diluentVol.toFixed(2)} mL of diluent`;
}

// PROTOCOL TIMER
let timerInterval;
function startTimer() {
    const hours = parseInt(document.getElementById("timerH").value) || 0;
    const mins = parseInt(document.getElementById("timerM").value) || 0;
    const secs = parseInt(document.getElementById("timerS").value) || 0;

    let totalSeconds = hours * 3600 + mins * 60 + secs;

    if (timerInterval) clearInterval(timerInterval);

    function updateTimerDisplay() {
        let h = Math.floor(totalSeconds / 3600);
        let m = Math.floor((totalSeconds % 3600) / 60);
        let s = totalSeconds % 60;
        document.getElementById("timerDisplay").innerText =
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        totalSeconds--;
        updateTimerDisplay();

        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Timer done!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    document.getElementById("timerDisplay").innerText = "00:00:00";
}
