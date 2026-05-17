/**
 * NEXUS_FLOW — Common Logic Abstraction Elements (utils/helpers.js)
 * ────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

/**
 * Returns reference targeting specific DOM ID element
 * @param {string} targetId 
 * @returns {HTMLElement|null}
 */
export function getEl(targetId) {
  return document.getElementById(targetId);
}

/**
 * Sanitizes and safely injects markup content string into targeted element container
 * @param {HTMLElement|null} element 
 * @param {string} inputHtmlString 
 */
export function setHTML(element, inputHtmlString) {
  if (!element) return;
  element.innerHTML = inputHtmlString;
}