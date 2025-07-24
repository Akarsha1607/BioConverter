<script>
  // Timer setup
  function startTimer() {
    const timerElement = document.getElementById("timer");
    let seconds = 0;

    setInterval(() => {
      seconds++;
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      timerElement.textContent = `⏱️ Time spent: ${mins}m ${secs}s`;
    }, 1000);
  }

  window.onload = startTimer;

  // Example: Molarity Calculator
  function calculateMolarity() {
    const moles = parseFloat(document.getElementById("mol-moles").value);
    const volume = parseFloat(document.getElementById("mol-volume").value);
    const result = moles / volume;
    document.getElementById("mol-result").textContent = `Molarity: ${result.toFixed(4)} mol/L`;
  }

  // Example: Dilution Calculator
  function calculateDilution() {
    const c1 = parseFloat(document.getElementById("dil-c1").value);
    const v1 = parseFloat(document.getElementById("dil-v1").value);
    const c2 = parseFloat(document.getElementById("dil-c2").value);
    const v2 = (c1 * v1) / c2;
    document.getElementById("dil-v2").textContent = `Required Volume: ${v2.toFixed(2)} L`;
  }

  // Add similar JS functions for other calculators:
  // - µL ↔ mg
  // - Protein/DNA mass ↔ mol
  // - pH to H+
  // - ng/µL ↔ nM
  // - Absorbance ↔ Concentration
  // - Mass ↔ Volume ↔ Concentration
  // - Temperature Conversion

  // Example: pH to H+ Calculator
  function calculateHPlus() {
    const pH = parseFloat(document.getElementById("ph-value").value);
    const hConcentration = Math.pow(10, -pH);
    document.getElementById("hplus-result").textContent = `[H⁺] = ${hConcentration.toExponential(2)} mol/L`;
  }

  // You can continue adding the rest here similarly
</script>

