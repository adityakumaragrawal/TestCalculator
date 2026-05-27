/**
 * NEXUS_FLOW — Comprehensive Physics, Engineering, Thermodynamics & Pure Mathematics Processing Engine
 * ───────────────────────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const unitModule = {
  renderModule() {
    const container = getEl("unit-container");
    if (!container) return;

    container.innerHTML = `
      <div class="input-row-vertical" style="display: flex; flex-direction: column; gap: 16px;">
        
        <div class="input-group">
          <label>Operational Domain</label>
          <select id="unit-operational-mode" style="width: 100%; font-weight: 700;">
            <option value="scalar" selected>Scalar Dimensional Analysis (Standard Physics & Chem)</option>
            <option value="vector">Vector Mechanics & Vector Law Engine (IIT-JEE / NEET)</option>
            <option value="math_adv">Advanced Pure Mathematics (Calculus, Trigo, Mappings, Polynomials)</option>
            <option value="physics_core">Core Physics Frameworks (Optics, Gravitation, Electricity)</option>
            <option value="thermo_chem">Thermodynamics & Chemical Spontaneity Matrix</option>
            <option value="data_finance">Data Storage Metrics & Financial Engineering (Compound/Simple)</option>
          </select>
        </div>

        <div id="unit-scalar-panel" class="input-row-vertical" style="display: flex; flex-direction: column; gap: 16px;">
          <div class="input-group">
            <label>Academic Core Category</label>
            <select id="unit-category" style="width: 100%;">
              <option value="energy" selected>Physics: Energy / Work / Thermodynamics (J, eV, cal, erg, MeV)</option>
              <option value="pressure">Physics/Chem: Pressure Systems (Pa, atm, bar, torr, mmHg, psi)</option>
              <option value="amount">Chemistry: Stoichiometry & Substance (mol, mmol, kmol, atoms, molecules)</option>
              <option value="temperature">Physics/Chem: Gas Laws / Thermal Scale (°C, K, °F, R)</option>
              <option value="power">Physics: Power & Radiant Flux (W, kW, MW, hp, erg/s, eV/s)</option>
              <option value="electrostatics">Physics: Charge & Potential (C, e, statC, V, statV)</option>
              <option value="magnetic">Physics: Magnetism / Induction (T, G, Wb, Mx)</option>
              <option value="atomic">Modern Physics: Mass-Energy Equivalents (kg, amu, MeV/c², g)</option>
            </select>
          </div>
          <div class="input-group">
            <label>Input Magnitude Value</label>
            <input type="number" id="unit-input-value" value="1" step="any" style="width: 100%;">
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="input-group">
              <label>From Source Unit</label>
              <select id="unit-source" style="width: 100%;"></select>
            </div>
            <div class="input-group">
              <label>To Target Unit</label>
              <select id="unit-target" style="width: 100%;"></select>
            </div>
          </div>
        </div>

        <div id="unit-vector-panel" class="input-row-vertical" style="display: none; flex-direction: column; gap: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; border-left: 3px solid #38bdf8; padding-left: 10px;">
            <div class="input-group">
              <label>Vector A Magnitude (|A|)</label>
              <input type="number" id="vector-mag-a" value="3" step="any" style="width: 100%;">
            </div>
            <div class="input-group">
              <label>Vector B Magnitude (|B|)</label>
              <input type="number" id="vector-mag-b" value="4" step="any" style="width: 100%;">
            </div>
          </div>
          <div class="input-group">
            <label>Angle Between Vectors (θ in Degrees)</label>
            <input type="number" id="vector-theta" value="90" step="any" style="width: 100%;">
          </div>
          <div class="input-group">
            <label>Vector Operation / Law Base</label>
            <select id="vector-operation" style="width: 100%;">
              <option value="addition" selected>Parallelogram Law of Vector Addition (R = A + B)</option>
              <option value="subtraction">Vector Subtraction Law (R = A - B)</option>
              <option value="dot">Scalar Dot Product (A · B = |A||B|cosθ)</option>
              <option value="cross">Vector Cross Product Magnitude (|A × B| = |A||B|sinθ)</option>
            </select>
          </div>
        </div>

        <div id="unit-math-panel" class="input-row-vertical" style="display: none; flex-direction: column; gap: 16px;">
          <div class="input-group">
            <label>Mathematical Target Sub-Domain</label>
            <select id="math-sub-mode" style="width: 100%;">
              <option value="calculus_limit" selected>Calculus: Real-Time Numeric Limit Approximation & Logarithms</option>
              <option value="trig_forward">Trigonometric Function Processor & Property Identities</option>
              <option value="trig_inverse">Inverse Trigonometric Principal Mappings & Multi-Value Solutions</option>
              <option value="matrix_det">Linear Algebra: 3x3 Determinant Evaluation Matrix</option>
              <option value="complex_ops">Complex Number Field Arithmetic Engine</option>
              <option value="quadratic_ineq">Polynomial Algebra: Quadratic Roots & Analytic Inequalities</option>
            </select>
          </div>
          <div id="math-dynamic-inputs" style="display: flex; flex-direction: column; gap: 12px;"></div>
        </div>

        <div id="unit-physics-panel" class="input-row-vertical" style="display: none; flex-direction: column; gap: 16px;">
          <div class="input-group">
            <label>Physics Theoretical Solver Target</label>
            <select id="physics-sub-mode" style="width: 100%;">
              <option value="optics_lens" selected>Optics: Gaussian Thin Lens & Focal Power Formula</option>
              <option value="optics_mirror">Optics: Mirror Form Equating Reflection & Magnification</option>
              <option value="gravitation">Gravitation: Newton's Universal Law of Gravitational Attraction</option>
              <option value="electrodynamics">Electrodynamics: Ohm's Law, Resistivity & Current Density</option>
            </select>
          </div>
          <div id="physics-dynamic-inputs" style="display: flex; flex-direction: column; gap: 12px;"></div>
        </div>

        <div id="unit-thermo-panel" class="input-row-vertical" style="display: none; flex-direction: column; gap: 16px;">
          <div class="input-group">
            <label>Thermodynamic System Solver</label>
            <select id="thermo-sub-mode" style="width: 100%;">
              <option value="gibbs_spontaneity" selected>Gibbs Free Energy Matrix & Spontaneity Condition (ΔG = ΔH - TΔS)</option>
              <option value="gas_laws">Ideal Gas State Equating & Thermodynamic Work Matrix</option>
            </select>
          </div>
          <div id="thermo-dynamic-inputs" style="display: flex; flex-direction: column; gap: 12px;"></div>
        </div>

        <div id="unit-finance-panel" class="input-row-vertical" style="display: none; flex-direction: column; gap: 16px;">
          <div class="input-group">
            <label>Analytical Class Mode</label>
            <select id="finance-sub-mode" style="width: 100%;">
              <option value="data_storage" selected>Computer Science: Data Storage Bitrate Scaling (KB, MB, GB, TB)</option>
              <option value="finance_interest">Quantitative Finance: Capital Interest Accrual (SI / CI)</option>
            </select>
          </div>
          <div id="finance-dynamic-inputs" style="display: flex; flex-direction: column; gap: 12px;"></div>
        </div>

      </div>

      <button id="unit-calculate-trigger" class="execution-btn" style="margin-top: 14px; width: 100%;">Compute Analytical Metrics</button>

      <div class="market-pair-profile-row" style="margin-top: 16px; margin-bottom: 16px;">
        <div class="currency-profile-block">
          <span class="meta-label">Domain Matrix Source</span>
          <div class="currency-large-display">
            <span class="display-currency-label" id="unit-label-origin">-</span>
          </div>
        </div>
        
        <div class="market-vector-container">
          <div class="vector-pulse-bead"></div>
          <div class="market-vector-arrow">&rarr;</div>
        </div>

        <div class="currency-profile-block text-right">
          <span class="meta-label">Output Framework Target</span>
          <div class="currency-large-display style-right">
            <span class="display-currency-label" id="unit-label-target">-</span>
          </div>
        </div>
      </div>

      <div class="output-display-card" style="display: flex; flex-direction: column; gap: 18px; padding: 22px;">
        <div>
          <div class="output-value-string" id="unit-string-context" style="margin-bottom: 8px;">Dimensional Analysis Evaluation Metrics:</div>
          <div class="output-primary-result" id="unit-calc-target" style="font-size: 2.1rem; line-height: 1.3; font-weight: 800; letter-spacing: -0.5px; word-break: break-word;">-</div>
        </div>
        
        <div class="meta-details-grid" id="unit-metadata-container">
          <div class="meta-detail-item">
            <label id="unit-meta-left-title">Scientific Clean Format</label>
            <div id="unit-meta-scientific" class="value-container">-</div>
          </div>
          
          <div class="meta-detail-item">
            <label id="unit-meta-right-title">SI Standard Metric Equivalent</label>
            <div id="unit-meta-si" class="value-container iso-theme">-</div>
          </div>
        </div>
      </div>
    `;

    this._setupUnitDropdowns();
    this._bindInterfaceSwitches();
    this._handleSubModeLayouts();
  },

  _unitMetrics: {
    energy: {
      units: [
        { id: "J", label: "Joule (J) [SI Unit Base]", factor: 1 },
        { id: "eV", label: "Electronvolt (eV)", factor: 1.602176634e-19 },
        { id: "MeV", label: "Megaelectronvolt (MeV)", factor: 1.602176634e-13 },
        { id: "cal", label: "Thermodynamic Calorie (cal)", factor: 4.184 },
        { id: "kcal", label: "Kilocalorie (kcal / Cal)", factor: 4184 },
        { id: "erg", label: "CGS System: Erg (erg)", factor: 1e-7 },
        { id: "kWh", label: "Kilowatt-hour (kWh)", factor: 3600000 },
        { id: "Btu", label: "British Thermal Unit (Btu)", factor: 1055.06 }
      ],
      siLabel: "J"
    },
    pressure: {
      units: [
        { id: "Pa", label: "Pascal (Pa) / N/m² [SI Base]", factor: 1 },
        { id: "atm", label: "Standard Atmosphere (atm)", factor: 101325 },
        { id: "bar", label: "Bar (bar)", factor: 100000 },
        { id: "torr", label: "Torr (torr / mmHg)", factor: 133.322368 },
        { id: "psi", label: "Pounds per Sq Inch (psi)", factor: 6894.76 }
      ],
      siLabel: "Pa"
    },
    amount: {
      units: [
        { id: "mol", label: "Mole (mol) [SI Base]", factor: 1 },
        { id: "mmol", label: "Millimole (mmol)", factor: 1e-3 },
        { id: "kmol", label: "Kilomole (kmol)", factor: 1e3 },
        { id: "atoms", label: "Elementary Atoms Count", factor: 1 / 6.02214076e23 },
        { id: "molecules", label: "Molecular Entities Count", factor: 1 / 6.02214076e23 }
      ],
      siLabel: "mol"
    },
    temperature: {
      units: [
        { id: "C", label: "Celsius (°C)", factor: 1 },
        { id: "K", label: "Kelvin (K) [SI Base]", factor: 1 },
        { id: "F", label: "Fahrenheit (°F)", factor: 1 },
        { id: "R", label: "Rankine (°R)", factor: 1 }
      ],
      siLabel: "K"
    },
    power: {
      units: [
        { id: "W", label: "Watt (W) / J/s [SI Base]", factor: 1 },
        { id: "kW", label: "Kilowatt (kW)", factor: 1000 },
        { id: "MW", label: "Megawatt (MW)", factor: 1000000 },
        { id: "hp", label: "Imperial Horsepower (hp)", factor: 745.7 },
        { id: "erg_s", label: "CGS Vector Force: erg/s", factor: 1e-7 },
        { id: "eV_s", label: "Atomic Level: eV/s", factor: 1.602176634e-19 }
      ],
      siLabel: "W"
    },
    electrostatics: {
      units: [
        { id: "C", label: "Coulomb (C) [SI Base]", factor: 1 },
        { id: "e", label: "Elementary Electronic Charge (e)", factor: 1.602176634e-19 },
        { id: "statC", label: "CGS Fr / statCoulomb (statC)", factor: 3.33564e-10 },
        { id: "V", label: "Volt (V) [SI Potential Base]", factor: 1 },
        { id: "statV", label: "CGS Statvolt (statV)", factor: 299.792458 }
      ],
      siLabel: "C"
    },
    magnetic: {
      units: [
        { id: "T", label: "Tesla (T) [SI Field Base]", factor: 1 },
        { id: "G", label: "Gauss (G) [CGS Field Base]", factor: 1e-4 },
        { id: "Wb", label: "Weber (Wb) [SI Flux Base]", factor: 1 },
        { id: "Mx", label: "Maxwell (Mx) [CGS Flux Base]", factor: 1e-8 }
      ],
      siLabel: "T"
    },
    atomic: {
      units: [
        { id: "kg", label: "Kilogram (kg) [SI Base]", factor: 1 },
        { id: "g", label: "Gram (g)", factor: 1e-3 },
        { id: "amu", label: "Unified Atomic Mass Unit (amu/u)", factor: 1.6605390666e-27 },
        { id: "MeV_c2", label: "Relativistic Mass Energy: MeV/c²", factor: 1.78266192e-30 }
      ],
      siLabel: "kg"
    }
  },

  _formatScientificSuperscript(num, fractionDigits = 4) {
    if (num === 0) return "0";
    const expStr = num.toExponential(fractionDigits); 
    const segments = expStr.split("e");
    if (segments.length !== 2) return expStr;

    let base = segments[0];
    let exponent = segments[1];

    exponent = exponent.replace("+", "");
    if (exponent.startsWith("-")) {
      exponent = "-" + exponent.slice(1).replace(/^0+/, "");
    } else {
      exponent = exponent.replace(/^0+/, "");
    }
    if (exponent === "" || exponent === "-") exponent = "0";

    return `${base} &times; 10<sup>${exponent}</sup>`;
  },

  _setupUnitDropdowns() {
    const category = getEl("unit-category").value;
    const srcSelect = getEl("unit-source");
    const tgtSelect = getEl("unit-target");
    if (!srcSelect || !tgtSelect) return;

    const optionsHtml = this._unitMetrics[category].units
      .map(u => `<option value="${u.id}">${u.label}</option>`)
      .join("");

    srcSelect.innerHTML = optionsHtml;
    tgtSelect.innerHTML = optionsHtml;

    if (srcSelect.options.length > 1) {
      tgtSelect.selectedIndex = 1;
    }
  },

  _bindInterfaceSwitches() {
    getEl("unit-operational-mode")?.addEventListener("change", (e) => {
      const mode = e.target.value;
      
      getEl("unit-scalar-panel").style.display = "none";
      getEl("unit-vector-panel").style.display = "none";
      getEl("unit-math-panel").style.display = "none";
      getEl("unit-physics-panel").style.display = "none";
      getEl("unit-thermo-panel").style.display = "none";
      getEl("unit-finance-panel").style.display = "none";

      if (mode === "vector") {
        getEl("unit-vector-panel").style.display = "flex";
        getEl("unit-meta-left-title").textContent = "Resultant Direction Matrix";
        getEl("unit-meta-right-title").textContent = "Alternative Geometry";
      } else if (mode === "math_adv") {
        getEl("unit-math-panel").style.display = "flex";
        this._handleSubModeLayouts();
      } else if (mode === "physics_core") {
        getEl("unit-physics-panel").style.display = "flex";
        this._handleSubModeLayouts();
      } else if (mode === "thermo_chem") {
        getEl("unit-thermo-panel").style.display = "flex";
        this._handleSubModeLayouts();
      } else if (mode === "data_finance") {
        getEl("unit-finance-panel").style.display = "flex";
        this._handleSubModeLayouts();
      } else {
        getEl("unit-scalar-panel").style.display = "flex";
        getEl("unit-meta-left-title").textContent = "Scientific Clean Format";
        getEl("unit-meta-right-title").textContent = "SI Standard Metric Equivalent";
        this._setupUnitDropdowns();
      }
      this._executeUnitCalculation();
    });

    getEl("unit-category")?.addEventListener("change", () => {
      this._setupUnitDropdowns();
      this._executeUnitCalculation();
    });

    getEl("math-sub-mode")?.addEventListener("change", () => {
      this._handleSubModeLayouts();
      this._executeUnitCalculation();
    });

    getEl("physics-sub-mode")?.addEventListener("change", () => {
      this._handleSubModeLayouts();
      this._executeUnitCalculation();
    });

    getEl("thermo-sub-mode")?.addEventListener("change", () => {
      this._handleSubModeLayouts();
      this._executeUnitCalculation();
    });

    getEl("finance-sub-mode")?.addEventListener("change", () => {
      this._handleSubModeLayouts();
      this._executeUnitCalculation();
    });
  },

  _handleSubModeLayouts() {
    const mode = getEl("unit-operational-mode").value;

    if (mode === "math_adv") {
      const subMode = getEl("math-sub-mode").value;
      const targetDiv = getEl("math-dynamic-inputs");
      getEl("unit-meta-left-title").textContent = "Auxiliary Transform Metric";
      getEl("unit-meta-right-title").textContent = "Boundary Extrema / Property";

      if (subMode === "calculus_limit") {
        targetDiv.innerHTML = `
          <div class="input-group"><label>Target Function Form Expression</label><select id="calc-func-expr" style="width:100%;"><option value="sin_x_x">f(x) = sin(x) / x</option><option value="inv_exp">f(x) = (1 + x)^(1/x)</option><option value="log_limit">f(x) = ln(1 + x) / x</option><option value="log_complex">f(x) = log_b(x) [Properties Base]</option></select></div>
          <div class="input-group"><label>Approach Singularity Evaluation Point (x → c) or Argument Value</label><input type="number" id="calc-limit-point" value="0" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Logarithmic Base Parameter (Used only for log_b(x))</label><input type="number" id="calc-log-base" value="10" step="any" style="width:100%;"></div>
        `;
      } else if (subMode === "trig_forward") {
        targetDiv.innerHTML = `
          <div class="input-group"><label>Operator Map</label><select id="trig-fwd-op" style="width:100%;"><option value="sin">Sine [sin(x)]</option><option value="cos">Cosine [cos(x)]</option><option value="tan">Tangent [tan(x)]</option><option value="properties">Trigo System Identity Properties [sin²x, cos²x, tan²x]</option></select></div>
          <div class="input-group"><label>Input Domain Angular Value (x)</label><input type="number" id="trig-fwd-val" value="45" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Input Domain Interpretation Metric</label><select id="trig-fwd-unit" style="width:100%;"><option value="deg" selected>Degrees (°)</option><option value="rad">Radians (rad)</option></select></div>
        `;
      } else if (subMode === "trig_inverse") {
        targetDiv.innerHTML = `
          <div class="input-group"><label>Inverse Operator Map</label><select id="trig-inv-op" style="width:100%;"><option value="asin">Arcsine [sin⁻¹(x)]</option><option value="acos">Arccosine [cos⁻¹(x)]</option><option value="atan">Arctangent [tan⁻¹(x)]</option></select></div>
          <div class="input-group"><label>Scalar Value (x ∈ [-1, 1] for sin/cos)</label><input type="number" id="trig-inv-val" value="0.5" step="any" style="width:100%;"></div>
        `;
      } else if (subMode === "matrix_det") {
        targetDiv.innerHTML = `
          <label style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Row Vector Array Configuration Elements</label>
          <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px;">
            <input type="number" id="mat-00" value="1" placeholder="a11"><input type="number" id="mat-01" value="2" placeholder="a12"><input type="number" id="mat-02" value="3" placeholder="a13">
            <input type="number" id="mat-10" value="0" placeholder="a21"><input type="number" id="mat-11" value="1" placeholder="a22"><input type="number" id="mat-12" value="4" placeholder="a23">
            <input type="number" id="mat-20" value="5" placeholder="a31"><input type="number" id="mat-21" value="6" placeholder="a32"><input type="number" id="mat-22" value="0" placeholder="a33">
          </div>
        `;
      } else if (subMode === "complex_ops") {
        targetDiv.innerHTML = `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;"><div class="input-group"><label>Real part Z1</label><input type="number" id="comp-r1" value="3"></div><div class="input-group"><label>Imaginary Z1</label><input type="number" id="comp-i1" value="4"></div></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;"><div class="input-group"><label>Real part Z2</label><input type="number" id="comp-r2" value="1"></div><div class="input-group"><label>Imaginary Z2</label><input type="number" id="comp-i2" value="-2"></div></div>
          <div class="input-group"><label>Complex Operator Field</label><select id="comp-op" style="width:100%;"><option value="add">Addition (Z1 + Z2)</option><option value="sub">Subtraction (Z1 - Z2)</option><option value="mul">Multiplication (Z1 * Z2)</option><option value="div">Division (Z1 / Z2)</option></select></div>
        `;
      } else if (subMode === "quadratic_ineq") {
        targetDiv.innerHTML = `
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
            <div class="input-group"><label>Coef a</label><input type="number" id="quad-a" value="1"></div>
            <div class="input-group"><label>Coef b</label><input type="number" id="quad-b" value="-5"></div>
            <div class="input-group"><label>Coef c</label><input type="number" id="quad-c" value="6"></div>
          </div>
          <div class="input-group"><label>Inelastic Inequality Condition Evaluation Target</label>
          <select id="quad-ineq-type" style="width:100%;"><option value="gt">ax² + bx + c > 0</option><option value="lt">ax² + bx + c &lt; 0</option></select></div>
        `;
      }
    }

    if (mode === "physics_core") {
      const subMode = getEl("physics-sub-mode").value;
      const targetDiv = getEl("physics-dynamic-inputs");
      getEl("unit-meta-left-title").textContent = "System Optical Transverse Power";
      getEl("unit-meta-right-title").textContent = "Field Tensor Metric Conversion";

      if (subMode === "optics_lens" || subMode === "optics_mirror") {
        targetDiv.innerHTML = `
          <div class="input-group"><label>Focal Length Definition (f in cm) [Positive=Convex, Negative=Concave]</label><input type="number" id="optic-f" value="15" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Object Position Coordinate Distance (u in cm) [Real objects typically negative]</label><input type="number" id="optic-u" value="-30" step="any" style="width:100%;"></div>
        `;
      } else if (subMode === "gravitation") {
        getEl("unit-meta-left-title").textContent = "Logarithmic Force Scale";
        getEl("unit-meta-right-title").textContent = "Normalized G Scalar Result";
        targetDiv.innerHTML = `
          <div class="input-group"><label>Mass Element Alpha (m1 in kg)</label><input type="number" id="grav-m1" value="5.972e24" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Mass Element Beta (m2 in kg)</label><input type="number" id="grav-m2" value="7.348e22" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Inter-Centroid Distance Radius (r in meters)</label><input type="number" id="grav-r" value="3.844e8" step="any" style="width:100%;"></div>
        `;
      } else if (subMode === "electrodynamics") {
        getEl("unit-meta-left-title").textContent = "Conductivity Value (σ)";
        getEl("unit-meta-right-title").textContent = "Power Dissipation Matrix (P)";
        targetDiv.innerHTML = `
          <div class="input-group"><label>Potential Difference Scalar (V in Volts)</label><input type="number" id="elec-v" value="12" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Bulk Total Resistance Metric (R in Ohms)</label><input type="number" id="elec-r" value="4" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Cross Section Vector Area (A in m²)</label><input type="number" id="elec-area" value="1e-6" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Conductor Length Element (L in meters)</label><input type="number" id="elec-len" value="2" step="any" style="width:100%;"></div>
        `;
      }
    }

    if (mode === "thermo_chem") {
      const subMode = getEl("thermo-sub-mode").value;
      const targetDiv = getEl("thermo-dynamic-inputs");
      getEl("unit-meta-left-title").textContent = "Reaction Spontaneity State";
      getEl("unit-meta-right-title").textContent = "Equilibrium System Constant (K)";

      if (subMode === "gibbs_spontaneity") {
        targetDiv.innerHTML = `
          <div class="input-group"><label>Enthalpy Modification Delta (ΔH in kJ/mol)</label><input type="number" id="thermo-dh" value="-92.22" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Entropy Modification Delta (ΔS in J/mol·K)</label><input type="number" id="thermo-ds" value="-198.75" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Absolute Operational Temperature (T in Kelvin)</label><input type="number" id="thermo-t" value="298.15" step="any" style="width:100%;"></div>
        `;
      } else if (subMode === "gas_laws") {
        getEl("unit-meta-left-title").textContent = "System Work Expansion (W)";
        getEl("unit-meta-right-title").textContent = "Total Moles Equivalent Quantity";
        targetDiv.innerHTML = `
          <div class="input-group"><label>Pressure Scalar Vector (P in Pa)</label><input type="number" id="gas-p" value="101325" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Initial Boundary Volume (V1 in m³)</label><input type="number" id="gas-v1" value="0.0224" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Final Reached Volume (V2 in m³)</label><input type="number" id="gas-v2" value="0.0448" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Absolute System Temperature (T in Kelvin)</label><input type="number" id="gas-t" value="273.15" step="any" style="width:100%;"></div>
        `;
      }
    }

    if (mode === "data_finance") {
      const subMode = getEl("finance-sub-mode").value;
      const targetDiv = getEl("finance-dynamic-inputs");
      getEl("unit-meta-left-title").textContent = "Binary Base 2 Scaling";
      getEl("unit-meta-right-title").textContent = "Decimal Base 10 Structural Scaling";

      if (subMode === "data_storage") {
        targetDiv.innerHTML = `
          <div class="input-group"><label>Magnitude Quantity</label><input type="number" id="data-val" value="1" step="any" style="width:100%;"></div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div class="input-group"><label>Source Scale Base</label><select id="data-src" style="width:100%;"><option value="KB">Kilobyte (KB)</option><option value="MB">Megabyte (MB)</option><option value="GB" selected>Gigabyte (GB)</option><option value="TB">Terabyte (TB)</option></select></div>
            <div class="input-group"><label>Target Scale Base</label><select id="data-tgt" style="width:100%;"><option value="KB">Kilobyte (KB)</option><option value="MB" selected>Megabyte (MB)</option><option value="GB">Gigabyte (GB)</option><option value="TB">Terabyte (TB)</option></select></div>
          </div>
        `;
      } else if (subMode === "finance_interest") {
        getEl("unit-meta-left-title").textContent = "Simple Interest Component Yield";
        getEl("unit-meta-right-title").textContent = "Compound Net Delta Interest Margin";
        targetDiv.innerHTML = `
          <div class="input-group"><label>Principal Capital (P)</label><input type="number" id="fin-p" value="10000" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Annualized Nominal Rate (R %)</label><input type="number" id="fin-r" value="8" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Temporal Duration Axis (T in Years)</label><input type="number" id="fin-t" value="5" step="any" style="width:100%;"></div>
          <div class="input-group"><label>Annual Compounding Frequency Matrix (n)</label><input type="number" id="fin-n" value="1" step="any" style="width:100%;"></div>
        `;
      }
    }
  },

  bindModuleEvents() {
    const trigger = getEl("unit-calculate-trigger");
    trigger?.addEventListener("click", () => this._executeUnitCalculation());
    this._executeUnitCalculation();
  },

  _executeUnitCalculation() {
    const mode = getEl("unit-operational-mode").value;

    if (mode === "vector") {
      this._calculateVectorMetrics();
    } else if (mode === "math_adv") {
      this._calculateAdvancedMathMetrics();
    } else if (mode === "physics_core") {
      this._calculateCorePhysicsMetrics();
    } else if (mode === "thermo_chem") {
      this._calculateThermodynamicsMetrics();
    } else if (mode === "data_finance") {
      this._calculateDataFinanceMetrics();
    } else {
      this._calculateScalarMetrics();
    }
  },

  _calculateScalarMetrics() {
    const category = getEl("unit-category").value;
    const inputVal = parseFloat(getEl("unit-input-value").value);
    const srcId = getEl("unit-source").value;
    const tgtId = getEl("unit-target").value;

    const resultDisplay = getEl("unit-calc-target");
    const stringDisplay = getEl("unit-string-context");
    const metaScientific = getEl("unit-meta-scientific");
    const metaSi = getEl("unit-meta-si");

    if (isNaN(inputVal)) {
      resultDisplay.textContent = "Invalid Entry Scalar Metric";
      return;
    }

    getEl("unit-label-origin").textContent = srcId;
    getEl("unit-label-target").textContent = tgtId;

    let valueInSI = 0;
    let finalValue = 0;

    const currentMetric = this._unitMetrics[category];
    const srcUnit = currentMetric.units.find(u => u.id === srcId);
    const tgtUnit = currentMetric.units.find(u => u.id === tgtId);

    if (category === "temperature") {
      if (srcId === "C") valueInSI = inputVal + 273.15;
      else if (srcId === "F") valueInSI = (inputVal - 32) * 5 / 9 + 273.15;
      else if (srcId === "R") valueInSI = inputVal * 5 / 9;
      else valueInSI = inputVal;

      if (tgtId === "C") finalValue = valueInSI - 273.15;
      else if (tgtId === "F") finalValue = (valueInSI - 273.15) * 9 / 5 + 32;
      else if (tgtId === "R") finalValue = valueInSI * 9 / 5;
      else finalValue = valueInSI;
    } else {
      valueInSI = inputVal * srcUnit.factor;
      finalValue = valueInSI / tgtUnit.factor;
    }

    let displayOutput = "";
    if (Math.abs(finalValue) < 1e-3 || Math.abs(finalValue) > 1e5) {
      displayOutput = this._formatScientificSuperscript(finalValue, 5);
    } else {
      displayOutput = Number(finalValue.toFixed(6)).toString();
    }

    stringDisplay.innerHTML = `Scalar dimensional transformation matrix execution metrics:`;
    resultDisplay.innerHTML = `${displayOutput} <span style="color: #38bdf8; background-color: rgba(14, 165, 233, 0.15); padding: 2px 8px; border-radius: 6px; font-weight: 800; border: 1px solid rgba(14, 165, 233, 0.25); font-size:1.4rem;">${tgtId}</span>`;

    metaScientific.innerHTML = `<span class="badge-highlight" style="font-weight:800; background-color:#a855f7; color:#fff; padding:2px 6px; border-radius:4px; font-size:0.75rem; margin-right:6px;">POW</span>${this._formatScientificSuperscript(finalValue, 6)}`;
    
    let siUnitFormatString = "";
    if (Math.abs(valueInSI) < 1e-3 || Math.abs(valueInSI) > 1e5) {
      siUnitFormatString = this._formatScientificSuperscript(valueInSI, 4);
    } else {
      siUnitFormatString = Number(valueInSI.toFixed(6)).toString();
    }
    metaSi.innerHTML = `<span class="badge-success" style="font-weight:800; background-color:#22c55e; color:#fff; padding:2px 6px; border-radius:4px; font-size:0.75rem; margin-right:6px;">SI</span>${siUnitFormatString} ${currentMetric.siLabel}`;
  },

  _calculateVectorMetrics() {
    const magA = parseFloat(getEl("vector-mag-a").value);
    const magB = parseFloat(getEl("vector-mag-b").value);
    const thetaDeg = parseFloat(getEl("vector-theta").value);
    const operation = getEl("vector-operation").value;

    const resultDisplay = getEl("unit-calc-target");
    const stringDisplay = getEl("unit-string-context");
    const metaLeft = getEl("unit-meta-scientific");
    const metaRight = getEl("unit-meta-si");

    if (isNaN(magA) || !isFinite(magA) || isNaN(magB) || !isFinite(magB) || isNaN(thetaDeg) || !isFinite(thetaDeg)) {
      resultDisplay.textContent = "Invalid Vector Fields Input";
      return;
    }

    getEl("unit-label-origin").textContent = "VEC A";
    getEl("unit-label-target").textContent = "VEC B";

    const thetaRad = (thetaDeg * Math.PI) / 180;
    const cosTheta = Math.cos(thetaRad);
    const sinTheta = Math.sin(thetaRad);

    if (operation === "addition") {
      const resultantSq = (magA * magA) + (magB * magB) + (2 * magA * magB * cosTheta);
      const resultant = Math.sqrt(Math.max(0, resultantSq));
      const denominator = magA + (magB * cosTheta);
      let alphaDeg = Math.abs(denominator) > 1e-9 ? (Math.atan2(magB * sinTheta, denominator) * 180) / Math.PI : 90;

      stringDisplay.innerHTML = `Resultant Magnitude Analysis via Vector Addition Law:`;
      resultDisplay.innerHTML = `${Number(resultant.toFixed(5))} <span style="color: #a855f7; background-color: rgba(168, 85, 247, 0.15); padding: 2px 8px; border-radius: 6px; font-weight: 800; border: 1px solid rgba(168, 85, 247, 0.25); font-size:1.2rem;">|R| Units</span>`;
      metaLeft.innerHTML = `<span class="badge-highlight" style="background-color:#38bdf8;">&alpha; w.r.t A</span> ${alphaDeg.toFixed(2)}&deg;`;
      metaRight.innerHTML = `<span class="badge-success" style="background-color:#10b981;">R² Value</span> ${Number(resultantSq.toFixed(4))}`;
    } else if (operation === "subtraction") {
      const resultantSq = (magA * magA) + (magB * magB) - (2 * magA * magB * cosTheta);
      const resultant = Math.sqrt(Math.max(0, resultantSq));
      const denominator = magA - (magB * cosTheta);
      let alphaDeg = Math.abs(denominator) > 1e-9 ? (Math.atan2(-magB * sinTheta, denominator) * 180) / Math.PI : 0;

      stringDisplay.innerHTML = `Resultant Vector Delta Magnitude (|A - B|):`;
      resultDisplay.innerHTML = `${Number(resultant.toFixed(5))} <span style="color: #f43f5e; background-color: rgba(244, 63, 94, 0.15); padding: 2px 8px; border-radius: 6px; font-weight: 800; border: 1px solid rgba(244, 63, 94, 0.25); font-size:1.2rem;">|&Delta;V| Units</span>`;
      metaLeft.innerHTML = `<span class="badge-highlight" style="background-color:#e11d48;">&alpha; Orientation</span> ${alphaDeg.toFixed(2)}&deg;`;
      metaRight.innerHTML = `<span class="badge-success">Diff Scalar</span> ${Number((magA - magB).toFixed(4))}`;
    } else if (operation === "dot") {
      const dotProduct = magA * magB * cosTheta;
      stringDisplay.innerHTML = `Scalar Dot Product Vector Evaluation Projection (A &middot; B):`;
      resultDisplay.innerHTML = `${Number(dotProduct.toFixed(5))} <span style="color: #22c55e; background-color: rgba(34, 197, 94, 0.15); padding: 2px 8px; border-radius: 6px; font-weight: 800; border: 1px solid rgba(34, 197, 94, 0.25); font-size:1.2rem;">Scalar Units</span>`;
      metaLeft.innerHTML = `<span class="badge-highlight" style="background-color:#eab308;">cos(&theta;)</span> ${cosTheta.toFixed(4)}`;
      metaRight.innerHTML = `<span class="badge-success">Orthogonal?</span> ${Math.abs(dotProduct) < 1e-7 ? "YES" : "NO"}`;
    } else if (operation === "cross") {
      const crossProductMag = magA * magB * sinTheta;
      stringDisplay.innerHTML = `Vector Cross Product Area Magnitude Template (|A &times; B|):`;
      resultDisplay.innerHTML = `${Number(crossProductMag.toFixed(5))} <span style="color: #38bdf8; background-color: rgba(14, 165, 233, 0.15); padding: 2px 8px; border-radius: 6px; font-weight: 800; border: 1px solid rgba(14, 165, 233, 0.25); font-size:1.2rem;">|N| Area Units</span>`;
      metaLeft.innerHTML = `<span class="badge-highlight" style="background-color:#6366f1;">sin(&theta;)</span> ${sinTheta.toFixed(4)}`;
      metaRight.innerHTML = `<span class="badge-success">Max Area Matrix</span> ${(magA * magB).toFixed(2)}`;
    }
  },

  _calculateAdvancedMathMetrics() {
    const subMode = getEl("math-sub-mode").value;
    const resultDisplay = getEl("unit-calc-target");
    const stringDisplay = getEl("unit-string-context");
    const metaLeft = getEl("unit-meta-scientific");
    const metaRight = getEl("unit-meta-si");

    getEl("unit-label-origin").textContent = "MATH IN";
    getEl("unit-label-target").textContent = "ANALYSIS";

    if (subMode === "calculus_limit") {
      const funcType = getEl("calc-func-expr").value;
      const c = parseFloat(getEl("calc-limit-point").value);
      
      if (funcType === "log_complex") {
        const base = parseFloat(getEl("calc-log-base").value);
        if (c <= 0 || base <= 0 || base === 1) {
          resultDisplay.textContent = "Logarithm Domain Violation error";
          return;
        }
        const valNatural = Math.log(c);
        const valBase = Math.log(c) / Math.log(base);

        stringDisplay.innerHTML = `Logarithmic Field Properties Conversion Engine:`;
        resultDisplay.innerHTML = `log<sub>${base}</sub>(${c}) = ${valBase.toFixed(6)}`;
        metaLeft.innerHTML = `ln(x) [Base e]: ${valNatural.toFixed(5)}`;
        metaRight.innerHTML = `log₁₀(x) [Base 10]: ${(Math.log(c) / Math.LN10).toFixed(5)}`;
        return;
      }

      let approxL = 0;
      let dx = 1e-7;
      let evalPoint = c === 0 ? dx : c + dx;

      if (funcType === "sin_x_x") {
        approxL = Math.sin(evalPoint) / evalPoint;
      } else if (funcType === "inv_exp") {
        approxL = Math.pow(1 + evalPoint, 1 / evalPoint);
      } else if (funcType === "log_limit") {
        approxL = Math.log(1 + evalPoint) / evalPoint;
      }

      stringDisplay.innerHTML = `Numerical Approximation Analysis of Singular Function Limit:`;
      resultDisplay.innerHTML = `${approxL.toFixed(7)}`;
      metaLeft.innerHTML = `Delta Step (Δx): ${dx}`;
      metaRight.innerHTML = `Asymptote Value: ${approxL.toFixed(2)}`;

    } else if (subMode === "trig_forward") {
      const op = getEl("trig-fwd-op").value;
      let val = parseFloat(getEl("trig-fwd-val").value);
      const unit = getEl("trig-fwd-unit").value;

      if (unit === "deg") val = (val * Math.PI) / 180;

      if (op === "properties") {
        const s2 = Math.pow(Math.sin(val), 2);
        const c2 = Math.pow(Math.cos(val), 2);
        const t2 = Math.pow(Math.tan(val), 2);
        stringDisplay.innerHTML = `Trigonometric Base Square Pythagorean Identity Metrics:`;
        resultDisplay.innerHTML = `sin²x+cos²x = ${(s2 + c2).toFixed(2)}`;
        metaLeft.innerHTML = `sin²(x): ${s2.toFixed(4)}`;
        metaRight.innerHTML = `sec²(x)-tan²(x): ${(1 / c2 - t2).toFixed(2)}`;
      } else {
        let out = 0;
        if (op === "sin") out = Math.sin(val);
        else if (op === "cos") out = Math.cos(val);
        else if (op === "tan") out = Math.tan(val);

        stringDisplay.innerHTML = `Forward Trigonometric Function Matrix Evaluation Value:`;
        resultDisplay.innerHTML = `${out.toFixed(6)}`;
        metaLeft.innerHTML = `Input (Rad): ${val.toFixed(5)}`;
        metaRight.innerHTML = `Square Form: ${(out * out).toFixed(4)}`;
      }

    } else if (subMode === "trig_inverse") {
      const op = getEl("trig-inv-op").value;
      const val = parseFloat(getEl("trig-inv-val").value);

      if ((op === "asin" || op === "acos") && (val < -1 || val > 1)) {
        resultDisplay.textContent = "Domain Error [-1,1]";
        return;
      }

      let rad = 0;
      if (op === "asin") rad = Math.asin(val);
      else if (op === "acos") rad = Math.acos(val);
      else if (op === "atan") rad = Math.atan(val);

      let deg = (rad * 180) / Math.PI;

      stringDisplay.innerHTML = `Principal Domain Value Mapping of Inverse Trigonometric Operator:`;
      resultDisplay.innerHTML = `${deg.toFixed(4)}&deg;`;
      metaLeft.innerHTML = `Radians: ${rad.toFixed(5)} rad`;
      metaRight.innerHTML = `General Sol nπ Matrix: Properties Match`;

    } else if (subMode === "matrix_det") {
      const m00 = parseFloat(getEl("mat-00").value); const m01 = parseFloat(getEl("mat-01").value); const m02 = parseFloat(getEl("mat-02").value);
      const m10 = parseFloat(getEl("mat-10").value); const m11 = parseFloat(getEl("mat-11").value); const m12 = parseFloat(getEl("mat-12").value);
      const m20 = parseFloat(getEl("mat-20").value); const m21 = parseFloat(getEl("mat-21").value); const m22 = parseFloat(getEl("mat-22").value);

      const det = m00 * (m11 * m22 - m12 * m21) - m01 * (m10 * m22 - m12 * m20) + m02 * (m10 * m21 - m11 * m20);

      stringDisplay.innerHTML = `3x3 Structural Spatial Linear Determinant [det(A)]:`;
      resultDisplay.innerHTML = `${Number(det.toFixed(5))}`;
      metaLeft.innerHTML = `Trace Metric Element: ${(m00 + m11 + m22)}`;
      metaRight.innerHTML = `Invertible? ${det !== 0 ? "YES" : "NO"}`;

    } else if (subMode === "complex_ops") {
      const r1 = parseFloat(getEl("comp-r1").value); const i1 = parseFloat(getEl("comp-i1").value);
      const r2 = parseFloat(getEl("comp-r2").value); const i2 = parseFloat(getEl("comp-i2").value);
      const op = getEl("comp-op").value;

      let outR = 0, outI = 0;

      if (op === "add") { outR = r1 + r2; outI = i1 + i2; }
      else if (op === "sub") { outR = r1 - r2; outI = i1 - i2; }
      else if (op === "mul") { outR = (r1 * r2) - (i1 * i2); outI = (r1 * i2) + (i1 * r2); }
      else if (op === "div") {
        const den = (r2 * r2) + (i2 * i2);
        if (den === 0) { resultDisplay.textContent = "Division By Zero Field"; return; }
        outR = ((r1 * r2) + (i1 * i2)) / den;
        outI = ((i1 * r2) - (r1 * i2)) / den;
      }

      const sign = outI >= 0 ? "+" : "-";
      stringDisplay.innerHTML = `Arithmetic Output Framework over Complex Field Structure:`;
      resultDisplay.innerHTML = `${outR.toFixed(4)} ${sign} ${Math.abs(outI).toFixed(4)}i`;
      metaLeft.innerHTML = `Modulus |Z|: ${Math.sqrt(outR*outR + outI*outI).toFixed(4)}`;
      metaRight.innerHTML = `Argument Phase: ${Math.atan2(outI, outR).toFixed(4)} rad`;

    } else if (subMode === "quadratic_ineq") {
      const a = parseFloat(getEl("quad-a").value);
      const b = parseFloat(getEl("quad-b").value);
      const c = parseFloat(getEl("quad-c").value);
      const ineq = getEl("quad-ineq-type").value;

      if (a === 0) { resultDisplay.textContent = "Coefficient 'a' Cannot Be Zero"; return; }

      const disc = (b * b) - (4 * a * c);
      let rootsOutput = "";
      let r1 = 0, r2 = 0;

      if (disc >= 0) {
        r1 = (-b + Math.sqrt(disc)) / (2 * a);
        r2 = (-b - Math.sqrt(disc)) / (2 * a);
        const lower = Math.min(r1, r2);
        const higher = Math.max(r1, r2);
        
        rootsOutput = `Roots: x₁=${lower.toFixed(3)}, x₂=${higher.toFixed(3)}`;

        if (ineq === "gt") {
          metaRight.innerHTML = a > 0 ? `Interval: (-∞, ${lower.toFixed(2)}) ∪ (${higher.toFixed(2)}, ∞)` : `Interval: (${lower.toFixed(2)}, ${higher.toFixed(2)})`;
        } else {
          metaRight.innerHTML = a > 0 ? `Interval: (${lower.toFixed(2)}, ${higher.toFixed(2)})` : `Interval: (-∞, ${lower.toFixed(2)}) ∪ (${higher.toFixed(2)}, ∞)`;
        }
      } else {
        const real = -b / (2 * a);
        const imag = Math.sqrt(-disc) / (2 * a);
        rootsOutput = `Complex Roots: ${real.toFixed(3)} &plusmn; ${imag.toFixed(3)}i`;
        
        if (ineq === "gt") {
          metaRight.innerHTML = a > 0 ? "Interval: All Real Numbers (-∞, ∞)" : "Interval: No Solution (Ø)";
        } else {
          metaRight.innerHTML = a > 0 ? "Interval: No Solution (Ø)" : "Interval: All Real Numbers (-∞, ∞)";
        }
      }

      stringDisplay.innerHTML = `Quadratic Polynomial Roots & Continuous Inequality Solution Range:`;
      resultDisplay.innerHTML = rootsOutput;
      metaLeft.innerHTML = `Discriminant (D): ${disc.toFixed(2)}`;
    }
  },

  _calculateCorePhysicsMetrics() {
    const subMode = getEl("physics-sub-mode").value;
    const resultDisplay = getEl("unit-calc-target");
    const stringDisplay = getEl("unit-string-context");
    const metaLeft = getEl("unit-meta-scientific");
    const metaRight = getEl("unit-meta-si");

    if (subMode === "optics_lens" || subMode === "optics_mirror") {
      const f = parseFloat(getEl("optic-f").value);
      const u = parseFloat(getEl("optic-u").value);

      if (f === 0 || u === 0 || u === f) {
        resultDisplay.textContent = "Singularity Error Pattern Detected";
        return;
      }

      getEl("unit-label-origin").textContent = "POS U";
      getEl("unit-label-target").textContent = "IMG V";

      let v = 0;
      let m = 0;

      if (subMode === "optics_lens") {
        v = (f * u) / (u + f);
        m = v / u;
        stringDisplay.innerHTML = `Gaussian Thin Lens Equation Conjugate Matrix Calculations:`;
      } else {
        v = (f * u) / (u - f);
        m = -(v / u);
        stringDisplay.innerHTML = `Spherical Mirror Geometrical Reflection Ray Configuration Matrix:`;
      }

      resultDisplay.innerHTML = `${v.toFixed(4)} <span style="font-size:1.1rem; color:#38bdf8;">cm</span>`;
      metaLeft.innerHTML = `Magnification (m): ${m.toFixed(4)}`;
      metaRight.innerHTML = `Focal Power (P): ${(100 / f).toFixed(2)} Dioptres`;

    } else if (subMode === "gravitation") {
      const m1 = parseFloat(getEl("grav-m1").value);
      const m2 = parseFloat(getEl("grav-m2").value);
      const r = parseFloat(getEl("grav-r").value);

      if (r === 0) { resultDisplay.textContent = "Radius Attenuation Error"; return; }

      getEl("unit-label-origin").textContent = "MASS M1/M2";
      getEl("unit-label-target").textContent = "FORCE F";

      const G = 6.67430e-11;
      const force = G * ((m1 * m2) / (r * r));

      stringDisplay.innerHTML = `Newtonian Attraction Gravitational Field Mechanics Vector Matrix:`;
      resultDisplay.innerHTML = `${this._formatScientificSuperscript(force, 5)} <span style="font-size:1.1rem; color:#38bdf8;">N</span>`;
      metaLeft.innerHTML = `Log10 Scalar: ${Math.log10(force).toFixed(2)}`;
      metaRight.innerHTML = `Field g1 Acceleration: ${(G * m1 / (r * r)).toExponential(3)} m/s²`;

    } else if (subMode === "electrodynamics") {
      const v = parseFloat(getEl("elec-v").value);
      const r = parseFloat(getEl("elec-r").value);
      const area = parseFloat(getEl("elec-area").value);
      const len = parseFloat(getEl("elec-len").value);

      if (r === 0 || area === 0 || len === 0) {
        resultDisplay.textContent = "Boundary Dimensional Structural Defect";
        return;
      }

      getEl("unit-label-origin").textContent = "POT V";
      getEl("unit-label-target").textContent = "CURR I";

      const current = v / r;
      const resistivity = (r * area) / len;
      const conductivity = 1 / resistivity;
      const power = (v * v) / r;

      stringDisplay.innerHTML = `Electrodynamic Vector Loop Parameters & Ohm's Current Density:`;
      resultDisplay.innerHTML = `${current.toFixed(4)} <span style="font-size:1.1rem; color:#38bdf8;">Amperes [A]</span>`;
      metaLeft.innerHTML = `Conductivity (&sigma;): ${conductivity.toExponential(4)} S/m`;
      metaRight.innerHTML = `Dissipated Wattage: ${power.toFixed(2)} W`;
    }
  },

  _calculateThermodynamicsMetrics() {
    const subMode = getEl("thermo-sub-mode").value;
    const resultDisplay = getEl("unit-calc-target");
    const stringDisplay = getEl("unit-string-context");
    const metaLeft = getEl("unit-meta-scientific");
    const metaRight = getEl("unit-meta-si");

    getEl("unit-label-origin").textContent = "THERMO IN";
    getEl("unit-label-target").textContent = "SYS OUT";

    if (subMode === "gibbs_spontaneity") {
      const dH = parseFloat(getEl("thermo-dh").value); 
      const dS = parseFloat(getEl("thermo-ds").value); 
      const T = parseFloat(getEl("thermo-t").value);

      if (T < 0) { resultDisplay.textContent = "Temperature Below Absolute Zero"; return; }

      const dG = dH - T * (dS / 1000);
      
      let spontaneity = "";
      if (dG < 0) spontaneity = "SPONTANEOUS (ΔG < 0)";
      else if (dG === 0) spontaneity = "EQUILIBRIUM (ΔG = 0)";
      else spontaneity = "NON-SPONTANEOUS (ΔG > 0)";

      const R_gas = 8.314462618; 
      const dG_joules = dG * 1000;
      const kExponent = -dG_joules / (R_gas * T);
      let K_val = Math.exp(kExponent);

      stringDisplay.innerHTML = `Gibbs Free Energy Spontaneity Matrix State Criteria Result:`;
      resultDisplay.innerHTML = `${dG.toFixed(3)} <span style="font-size:1.1rem; color:#f43f5e;">kJ/mol</span>`;
      metaLeft.innerHTML = `State: <span style="font-weight:bold; color:#38bdf8;">${spontaneity}</span>`;
      metaRight.innerHTML = `K Constant: ${K_val > 1e5 || K_val < 1e-3 ? K_val.toExponential(4) : K_val.toFixed(4)}`;

    } else if (subMode === "gas_laws") {
      const P = parseFloat(getEl("gas-p").value);
      const V1 = parseFloat(getEl("gas-v1").value);
      const V2 = parseFloat(getEl("gas-v2").value);
      const T = parseFloat(getEl("gas-t").value);

      if (T <= 0) { resultDisplay.textContent = "Absolute Thermal Field Constraint Violated"; return; }

      const work = P * (V2 - V1);
      
      const R_gas = 8.314462618;
      const n = (P * V1) / (R_gas * T);

      stringDisplay.innerHTML = `Gas Boundary Structural Isobaric Expansion Mechanical Work Engine:`;
      resultDisplay.innerHTML = `${work.toFixed(2)} <span style="font-size:1.1rem; color:#22c55e;">Joules</span>`;
      metaLeft.innerHTML = `Volume Delta (ΔV): ${(V2 - V1).toFixed(4)} m³`;
      metaRight.innerHTML = `Substance Moles (n): ${n.toFixed(4)} mol`;
    }
  },

  _calculateDataFinanceMetrics() {
    const subMode = getEl("finance-sub-mode").value;
    const resultDisplay = getEl("unit-calc-target");
    const stringDisplay = getEl("unit-string-context");
    const metaLeft = getEl("unit-meta-scientific");
    const metaRight = getEl("unit-meta-si");

    if (subMode === "data_storage") {
      const val = parseFloat(getEl("data-val").value);
      const src = getEl("data-src").value;
      const tgt = getEl("data-tgt").value;

      getEl("unit-label-origin").textContent = src;
      getEl("unit-label-target").textContent = tgt;

      const scales = { "KB": 1, "MB": 2, "GB": 3, "TB": 4 };
      const diff = scales[src] - scales[tgt];
      
      const outBinary = val * Math.pow(1024, diff);
      const outDecimal = val * Math.pow(1000, diff);

      stringDisplay.innerHTML = `Data Metric Scale Factor Space Allocation Translation:`;
      resultDisplay.innerHTML = `${outBinary.toLocaleString(undefined, {maximumFractionDigits:4})} <span style="font-size:1.2rem; color:#a855f7;">${tgt} (Bi)</span>`;
      metaLeft.innerHTML = `Base 2 Size: ${outBinary.toExponential(4)}`;
      metaRight.innerHTML = `Base 10 Size: ${outDecimal.toExponential(4)}`;

    } else if (subMode === "finance_interest") {
      const p = parseFloat(getEl("fin-p").value);
      const r = parseFloat(getEl("fin-r").value) / 100;
      const t = parseFloat(getEl("fin-t").value);
      const n = parseFloat(getEl("fin-n").value);

      getEl("unit-label-origin").textContent = "CAPITAL P";
      getEl("unit-label-target").textContent = "YIELD A";

      const siComponent = p * r * t;
      const ciTotal = p * Math.pow(1 + (r / n), n * t);
      const ciComponent = ciTotal - p;

      stringDisplay.innerHTML = `Quantitative Structural Capital Matrix Compounding Accumulation [A]:`;
      resultDisplay.innerHTML = `${ciTotal.toFixed(2)} <span style="font-size:1.1rem; color:#22c55e;">Fiat</span>`;
      metaLeft.innerHTML = `SI Generated: ${siComponent.toFixed(2)}`;
      metaRight.innerHTML = `Net Interest Variance Δ: ${(ciComponent - siComponent).toFixed(2)}`;
    }
  }
};

export default unitModule;