/**
 * NEXUS_FLOW — Advanced Interdisciplinary Scientific Processing Sub-Module
 * ────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const destinationsModule = {
  // Exact Mathematical Expressions for Standard Angles (Degrees)
  _trigExactMatrix: {
    0: { sin: "0", cos: "1", tan: "0" },
    30: { sin: "1/2", cos: "√3/2", tan: "1/√3" },
    45: { sin: "1/√2", cos: "1/√2", tan: "1" },
    60: { sin: "√3/2", cos: "1/2", tan: "√3" },
    90: { sin: "1", cos: "0", tan: "Undefined (∞)" },
    120: { sin: "√3/2", cos: "-1/2", tan: "-√3" },
    135: { sin: "1/√2", cos: "-1/√2", tan: "-1" },
    150: { sin: "1/2", cos: "-√3/2", tan: "-1/√3" },
    180: { sin: "0", cos: "-1", tan: "0" },
    270: { sin: "-1", cos: "0", tan: "Undefined (-∞)" },
    360: { sin: "0", cos: "1", tan: "0" }
  },

  // Key Physical/Chemical Constants for native computations
  _scientificConstants: {
    gasConstantR: 8.31446, // J/(mol·K)
    avogadro: 6.02214076e23
  },

  _abbreviateNumber(num) {
    const abs = Math.abs(num);
    if (abs >= 1e12) return (num / 1e12).toFixed(2).replace(/\.?0+$/, "") + "T";
    if (abs >= 1e9) return (num / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
    if (abs >= 1e6) return (num / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (abs >= 1e3) return (num / 1e3).toFixed(2).replace(/\.?0+$/, "") + "K";
    return num.toFixed(4).replace(/\.?0+$/, "");
  },

  renderModule() {
    const container = getEl("destinations-container");
    if (!container) return;

    container.innerHTML = `
      <div class="input-group" style="margin-bottom: 16px;">
        <label>Select Tool Operational Core</label>
        <select id="destinations-sub-mode" style="width: 100%; font-weight: 700;">
          <option value="trig" selected>Exact Analytical Trigonometry (Fraction, Root & Decimal)</option>
          <option value="roi">Quantitative ROI & Financial Capital Yield Analyzer</option>
          <option value="chemistry">Chemistry: Ideal Gas Law & Gas State Matrix</option>
          <option value="linguistics">Linguistics: Core Text Metrics & Structural Engine</option>
        </select>
      </div>

      <div id="sub-panel-trig" class="sub-panel">
        <div class="input-group">
          <label>Angle Value Input</label>
          <input type="number" id="trig-angle-input" value="45" step="any">
        </div>
        <div class="input-group" style="margin-top: 12px;">
          <label>Angle Measure System</label>
          <select id="trig-unit-system" style="width: 100%;">
            <option value="deg" selected>Degrees (°)</option>
            <option value="rad">Radians (rad)</option>
          </select>
        </div>
      </div>

      <div id="sub-panel-roi" class="sub-panel" style="display: none;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="input-group">
            <label>Initial Capital Principal (Investment)</label>
            <input type="number" id="roi-principal" value="10000" step="any">
          </div>
          <div class="input-group">
            <label>Final Value Accumulated (Return)</label>
            <input type="number" id="roi-return" value="15000" step="any">
          </div>
        </div>
      </div>

      <div id="sub-panel-chemistry" class="sub-panel" style="display: none;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="input-group">
            <label>Pressure (P in Pascals)</label>
            <input type="number" id="chem-pressure" value="101325" step="any">
          </div>
          <div class="input-group">
            <label>Volume (V in m³)</label>
            <input type="number" id="chem-volume" value="0.0224" step="any">
          </div>
        </div>
        <div class="input-group" style="margin-top: 12px;">
          <label>Temperature (T in Kelvin)</label>
          <input type="number" id="chem-temperature" value="273.15" step="any">
        </div>
      </div>

      <div id="sub-panel-linguistics" class="sub-panel" style="display: none;">
        <div class="input-group">
          <label>Input Text String Block</label>
          <textarea id="linguistics-text-input" style="width: 100%; height: 80px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 8px; border-radius: 4px; resize: vertical;">Nexus Flow processing engine initialization successful.</textarea>
        </div>
      </div>

      <button id="calculate-trigger" class="execution-btn" style="margin-top: 16px;">Compute Operational Framework</button>

      <div class="market-pair-profile-row" style="margin-top: 16px;">
        <div class="currency-profile-block">
          <span class="meta-label">Domain Metric Source</span>
          <div class="currency-large-display">
            <span class="display-currency-label" id="label-origin-view">θ Angle</span>
          </div>
        </div>
        
        <div class="market-vector-container">
          <div class="vector-pulse-bead"></div>
          <div class="market-vector-arrow">&rarr;</div>
        </div>

        <div class="currency-profile-block text-right">
          <span class="meta-label">Output Framework Target</span>
          <div class="currency-large-display style-right">
            <span class="display-currency-label" id="label-target-view">f(θ) Analytical Map</span>
          </div>
        </div>
      </div>

      <div class="output-display-card" style="margin-top: 16px;">
        <div class="output-value-string" id="output-string-context">Evaluation Matrix Result:</div>
        <div class="output-primary-result" id="output-calc-target">-</div>
        
        <div id="extended-math-outputs" class="meta-details-grid" style="display: grid; margin-top: 14px; grid-template-columns: 1fr 1fr; gap: 10px;">
          <div class="meta-detail-item" style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 4px;">
            <label id="ext-label-left" style="font-size:0.75rem; color:#888; display:block; margin-bottom:4px;">cos(θ) Rational Map</label>
            <div id="ext-val-left" style="font-weight:700; color:#fff;">-</div>
          </div>
          <div class="meta-detail-item" style="background: rgba(255,255,255,0.03); padding: 8px; border-radius: 4px;">
            <label id="ext-label-right" style="font-size:0.75rem; color:#888; display:block; margin-bottom:4px;">tan(θ) Vector Tangent</label>
            <div id="ext-val-right" style="font-weight:700; color:#fff;">-</div>
          </div>
        </div>
      </div>


    `;

    this._setupSubModePanels();
  },

  _setupSubModePanels() {
    const modeSelect = getEl("destinations-sub-mode");
    modeSelect?.addEventListener("change", (e) => {
      const mode = e.target.value;
      getEl("sub-panel-trig").style.display = mode === "trig" ? "block" : "none";
      getEl("sub-panel-roi").style.display = mode === "roi" ? "block" : "none";
      getEl("sub-panel-chemistry").style.display = mode === "chemistry" ? "block" : "none";
      getEl("sub-panel-linguistics").style.display = mode === "linguistics" ? "block" : "none";
      this._updateVisualLabels();
    });
  },

  _updateVisualLabels() {
    const mode = getEl("destinations-sub-mode").value;
    const originLabel = getEl("label-origin-view");
    const targetLabel = getEl("label-target-view");

    if (mode === "trig") {
      originLabel.textContent = "θ Angle";
      targetLabel.textContent = "f(θ) Analytical Map";
    } else if (mode === "roi") {
      originLabel.textContent = "Principal Matrix";
      targetLabel.textContent = "Return Metrics";
    } else if (mode === "chemistry") {
      originLabel.textContent = "State Vector Inputs";
      targetLabel.textContent = "Molar Amount Output";
    } else if (mode === "linguistics") {
      originLabel.textContent = "Raw Text Block";
      targetLabel.textContent = "Syntactic Metrics";
    }
  },

  bindModuleEvents() {
    const trigger = getEl("calculate-trigger");
    trigger?.addEventListener("click", () => this._executeSelectedCalculation());
    this._executeSelectedCalculation();
  },

  _executeSelectedCalculation() {
    const mode = getEl("destinations-sub-mode").value;
    this._updateVisualLabels();

    if (mode === "trig") {
      this._executeTrigCalculation();
    } else if (mode === "roi") {
      this._executeRoiCalculation();
    } else if (mode === "chemistry") {
      this._executeChemistryCalculation();
    } else if (mode === "linguistics") {
      this._executeLinguisticsCalculation();
    }
  },

  _executeTrigCalculation() {
    const angleInput = parseFloat(getEl("trig-angle-input").value) || 0;
    const system = getEl("trig-unit-system").value;
    
    let deg = angleInput;
    if (system === "rad") {
      deg = angleInput * (180 / Math.PI);
    }

    const normalizedDeg = Math.abs(deg % 360);
    const rad = deg * (Math.PI / 180);

    const sVal = Math.sin(rad);
    const cVal = Math.cos(rad);
    const tVal = Math.abs(cVal) > 1e-10 ? Math.tan(rad) : NaN;

    let exactSin = this._trigExactMatrix[normalizedDeg]?.sin || sVal.toFixed(4);
    let exactCos = this._trigExactMatrix[normalizedDeg]?.cos || cVal.toFixed(4);
    let exactTan = this._trigExactMatrix[normalizedDeg]?.tan || (isNaN(tVal) ? "Undefined" : tVal.toFixed(4));

    getEl("output-string-context").textContent = `Trigonometric Processing System Matrix for ${angleInput}${system === "deg" ? "°" : " rad"}:`;
    getEl("output-calc-target").innerHTML = `sin(θ) = ${exactSin} <span style="font-size:1.1rem; color:#888; font-weight:400;">(${sVal.toFixed(4)})</span>`;
    
    getEl("ext-label-left").textContent = "cos(θ) Rational Map";
    getEl("ext-val-left").innerHTML = `${exactCos} <span style="font-weight:400; color:#888;">(${cVal.toFixed(4)})</span>`;
    
    getEl("ext-label-right").textContent = "tan(θ) Vector Tangent";
    getEl("ext-val-right").innerHTML = `${exactTan} <span style="font-weight:400; color:#888;">(${isNaN(tVal) ? "∞" : tVal.toFixed(4)})</span>`;
  },

  _executeRoiCalculation() {
    const principal = parseFloat(getEl("roi-principal").value) || 0;
    const current = parseFloat(getEl("roi-return").value) || 0;

    if (principal === 0) {
      getEl("output-calc-target").textContent = "Invalid Principal Input Base";
      return;
    }

    const netGain = current - principal;
    const roiPercentage = (netGain / principal) * 100;
    const investmentMultiplier = current / principal;

    getEl("output-string-context").textContent = "Quantitative Financial Analytics Summary Engine Matrix:";
    getEl("output-calc-target").innerHTML = `${roiPercentage.toFixed(2)}% <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">ROI Percentage Rate</span>`;

    getEl("ext-label-left").textContent = "Net Gain Absolute Spread Value";
    getEl("ext-val-left").textContent = `${netGain >= 0 ? "+" : ""}${this._abbreviateNumber(netGain)}`;

    getEl("ext-label-right").textContent = "Capital Multiple Factor Performance Vector";
    getEl("ext-val-right").textContent = `${investmentMultiplier.toFixed(3)}x`;
  },

  _executeChemistryCalculation() {
    const pressure = parseFloat(getEl("chem-pressure").value) || 0;
    const volume = parseFloat(getEl("chem-volume").value) || 0;
    const temperature = parseFloat(getEl("chem-temperature").value) || 0;

    if (temperature <= 0) {
      getEl("output-calc-target").textContent = "Absolute Temperature must be > 0 K";
      return;
    }

    // Ideal Gas Equation: n = PV / RT
    const moles = (pressure * volume) / (this._scientificConstants.gasConstantR * temperature);
    const molecules = moles * this._scientificConstants.avogadro;

    getEl("output-string-context").textContent = "Computed Chemical Amount of Ideal Substance System (n):";
    getEl("output-calc-target").innerHTML = `${moles.toFixed(5)} <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">moles</span>`;

    getEl("ext-label-left").textContent = "Total Particle/Molecule Count";
    getEl("ext-val-left").textContent = molecules.toExponential(4);

    getEl("ext-label-right").textContent = "Ideal R Constant Applied";
    getEl("ext-val-right").textContent = `${this._scientificConstants.gasConstantR} J/(mol·K)`;
  },

  _executeLinguisticsCalculation() {
    const text = getEl("linguistics-text-input").value || "";

    const charCount = text.length;
    const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;

    getEl("output-string-context").textContent = "Linguistic Text Metric Matrix Structure Metrics:";
    getEl("output-calc-target").innerHTML = `${wordCount} <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">Total Words</span>`;

    getEl("ext-label-left").textContent = "Character Count (With Spaces)";
    getEl("ext-val-left").textContent = charCount;

    getEl("ext-label-right").textContent = "Sentence Boundary Assertions";
    getEl("ext-val-right").textContent = sentenceCount;
  }
};

export default destinationsModule;