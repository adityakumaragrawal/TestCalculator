/**
 * NEXUS_FLOW — Age Metric Calculation Sub-Module (Calculates Up To Present Day)
 * ────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const ageModule = {
  renderModule() {
    const container = getEl("age-container");
    if (!container) return;

    container.innerHTML = `
      <div class="input-group">
        <label>Date of Birth</label>
        <input type="date" id="age-birth-date" value="2000-01-01">
      </div>

      <button id="age-calculate-trigger" class="execution-btn">Analyze Chronological Delta</button>

      <div class="market-pair-profile-row">
        <div class="currency-profile-block">
          <span class="meta-label">Temporal Start</span>
          <div class="currency-large-display">
            <span class="display-currency-label" id="age-label-origin">Birth Origin</span>
          </div>
        </div>
        
        <div class="market-vector-container">
          <div class="vector-pulse-bead"></div>
          <div class="market-vector-arrow">&rarr;</div>
        </div>

        <div class="currency-profile-block text-right">
          <span class="meta-label">Current / Present</span>
          <div class="currency-large-display style-right">
            <span class="display-currency-label" id="age-label-target">Till Now</span>
          </div>
        </div>
      </div>

      <div class="output-display-card">
        <div class="output-value-string" id="age-string-context">Calculated Lifespan Vector Matrix</div>
        <div class="output-primary-result" id="age-calc-target">0 <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">Years Old</span></div>
      </div>
    `;
  },

  bindModuleEvents() {
    const trigger = getEl("age-calculate-trigger");
    trigger?.addEventListener("click", () => this._executeAgeCalculation());
    
    this._executeAgeCalculation();
  },

  _executeAgeCalculation() {
    const birthInput = getEl("age-birth-date");
    const resultDisplay = getEl("age-calc-target");
    const stringDisplay = getEl("age-string-context");

    if (!birthInput || !resultDisplay || !stringDisplay) return;

    const birthDate = new Date(birthInput.value);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      resultDisplay.innerHTML = `0 <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">Years Old</span>`;
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    stringDisplay.textContent = `Your Age Calulated as per YOUR DOB:`;
    
    if (years < 0) {
      resultDisplay.innerHTML = `Not Born <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">Yet</span>`;
    } else {
      resultDisplay.innerHTML = `${years}y ${months}m ${days}d <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">Calculated Matrix</span>`;
    }
  }
};

export default ageModule;