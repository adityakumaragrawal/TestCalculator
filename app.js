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
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this._startLifecycle());
    } else {
      this._startLifecycle();
    }
  },

  _startLifecycle() {
    this._renderAllModules();
    this._bindGlobalNavigation();
    this._initializeDefaultState();
  },

  _renderAllModules() {
    Object.keys(this.modules).forEach(key => {
      try {
        if (this.modules[key] && typeof this.modules[key].renderModule === "function") {
          this.modules[key].renderModule();
        }
      } catch (error) {
        console.error(`Render failure in module [${key}]:`, error);
      }

      try {
        if (this.modules[key] && typeof this.modules[key].bindModuleEvents === "function") {
          this.modules[key].bindModuleEvents();
        }
      } catch (error) {
        console.error(`Event binding failure in module [${key}]:`, error);
      }
    });
  },

  _bindGlobalNavigation() {
    const tabTriggers = document.querySelectorAll(".nav-tab-trigger");
    
    tabTriggers.forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        const selectedModule = e.currentTarget.getAttribute("data-module");
        if (!selectedModule || !this.modules[selectedModule]) return;

        tabTriggers.forEach(t => t.classList.remove("active"));
        e.currentTarget.classList.add("active");

        const panels = document.querySelectorAll(".module-view-panel");
        panels.forEach(p => {
          p.classList.remove("active");
          p.style.display = "none";
        });

        const activePanel = getEl(`${selectedModule}-container`);
        if (activePanel) {
          activePanel.classList.add("active");
          activePanel.style.display = "flex";
        }
      });
    });
  },

  _initializeDefaultState() {
    const activeTrigger = document.querySelector(".nav-tab-trigger.active");
    if (activeTrigger) {
      const activeModule = activeTrigger.getAttribute("data-module");
      const activePanel = getEl(`${activeModule}-container`);
      if (activePanel) {
        activePanel.classList.add("active");
        activePanel.style.display = "flex";
      }
    }
  }
};

appCore.init();
