/**
 * NEXUS_FLOW — app.js (Core Application Orchestrator)
 * ────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

// 1. ALL IMPORTS DECLARED AT THE ABSOLUTE TOP TO PREVENT INITIALIZATION FAULTS
import { getEl } from "./utils/helpers.js";
import timeModule from "./modules/time/time.js";
import destinationModule from "./modules/destinations/destinations.js";
import ageModule from "./modules/age/age.js";

// Global Runtime Pub-Sub Event Matrix
export const AURA_BUS = {
  _listeners: {},
  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
  },
  emit(event, data) {
    if (this._listeners[event]) {
      this._listeners[event].forEach(callback => callback(data));
    }
  }
};

const MODULES = {
  age:          ageModule,
  time:         timeModule,
  destinations: destinationModule
};

function initApplicationEngine() {
  const themeToggle = getEl("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
    });
  }

  _initMeshBackgroundFX();

  // Safeguarded loop execution across loaded engines
  Object.values(MODULES).forEach(mod => {
    if (mod && mod.initializeModule) mod.initializeModule();
  });

  _bindNavigationControls();

  // Safely mount default workspace viewport interface segment
  _switchActiveModuleWorkspace("destinations");
}

function _switchActiveModuleWorkspace(targetModuleId) {
  const viewports = {
    age:          getEl("age-container"),
    time:         getEl("time-module-El"),
    destinations: getEl("destinations-container")
  };

  Object.entries(viewports).forEach(([id, element]) => {
    if (!element) return;
    if (id === targetModuleId) {
      element.classList.remove("hidden");
      if (MODULES[id]) {
        MODULES[id].renderModule();
        MODULES[id].bindModuleEvents();
      }
    } else {
      element.classList.add("hidden");
      if (MODULES[id] && MODULES[id].teardownModule) {
        MODULES[id].teardownModule();
      }
    }
  });
}

function _bindNavigationControls() {
  const navigationButtons = document.querySelectorAll(".nav-Btn");
  navigationButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const targetModule = e.target.getAttribute("data-module");
      
      navigationButtons.forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");

      if (MODULES[targetModule]) {
        _switchActiveModuleWorkspace(targetModule);
      }
    });
  });
}

function _initMeshBackgroundFX() {
  const canvas = getEl("mesh-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  function renderFrameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = document.body.classList.contains("light-theme") 
      ? "rgba(15, 23, 42, 0.015)" 
      : "rgba(255, 255, 255, 0.02)";
      
    for (let i = 0; i < canvas.width; i += 40) {
      for (let j = 0; j < canvas.height; j += 40) {
        if (Math.random() > 0.995) {
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }
    requestAnimationFrame(renderFrameLoop);
  }
  renderFrameLoop();
}

document.addEventListener("DOMContentLoaded", initApplicationEngine);
