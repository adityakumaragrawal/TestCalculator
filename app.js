/**
 * NEXUS_FLOW — Core Framework Life Cycle Manager
 */

"use strict";

import { getEl } from "./utils/helpers.js";
// Ensure these paths are 100% correct relative to app.js
import destinationsModule from "./modules/destinations/destinations.js";
import academicModule from "./modules/academic/academic.js"; 
import mediaModule from "./modules/media/media.js";
import typingModule from "./modules/typing/typing.js";
import timeModule from "./modules/time/time.js";
import ageModule from "./modules/age/age.js";
import unitModule from "./modules/unit/unit.js";
import weatherModule from "./modules/weather/weather.js";
import imageUtilityModule from "./modules/imageUtility/imageUtility.js";

const appCore = {
  modules: {
    destinations: destinationsModule,
    academic: academicModule,
    media: mediaModule,
    typing: typingModule,
    time: timeModule,
    age: ageModule,
    unit: unitModule,
    weather: weatherModule,
    imageUtility: imageUtilityModule, // Key must match data-module="imageUtility"
  },

  init() {
    console.log("Nexus Flow Initializing...");
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this._startLifecycle());
    } else {
      this._startLifecycle();
    }
  },

  _startLifecycle() {
    this._bindGlobalNavigation();
    this._initializeDefaultState();
  },

  switchModule(moduleKey, triggerElement) {
    console.log("Switching to:", moduleKey);
    
    // 1. Validation
    const targetModule = this.modules[moduleKey];
    if (!targetModule) {
      console.error(`ERROR: Module '${moduleKey}' not found in appCore.modules!`);
      return;
    }

    // 2. Destroy Others
    Object.keys(this.modules).forEach(key => {
      if (key !== moduleKey && typeof this.modules[key]?.destroy === "function") {
        this.modules[key].destroy();
      }
    });

    // 3. UI Update
    document.querySelectorAll(".nav-tab-trigger").forEach(t => t.classList.remove("active"));
    triggerElement.classList.add("active");
    
    document.querySelectorAll(".module-view-panel").forEach(p => {
      p.classList.remove("active");
      p.style.display = "none";
    });

    const activePanel = document.getElementById(`${moduleKey}-container`);
    if (!activePanel) {
      console.error(`ERROR: Cannot find element with ID: ${moduleKey}-container`);
      return;
    }

    activePanel.classList.add("active");
    activePanel.style.display = "flex";
    
    // 4. Render
    try {
      if (typeof targetModule.renderModule === "function") targetModule.renderModule();
      if (typeof targetModule.bindModuleEvents === "function") targetModule.bindModuleEvents();
    } catch (err) {
      console.error(`Render error in ${moduleKey}:`, err);
    }
  },

  _bindGlobalNavigation() {
    document.querySelectorAll(".nav-tab-trigger").forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        const modKey = e.currentTarget.getAttribute("data-module");
        this.switchModule(modKey, e.currentTarget);
      });
    });
  },

  _initializeDefaultState() {
    const activeTrigger = document.querySelector(".nav-tab-trigger.active");
    if (activeTrigger) {
      this.switchModule(activeTrigger.getAttribute("data-module"), activeTrigger);
    }
  }
};

appCore.init();