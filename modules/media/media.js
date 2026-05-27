/**
 * ASSISTWE Media Studio Module — Advanced Raster Pipeline Engine
 * Architecture: Isolated Single-Zone Event System & Native Matrix Operations
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const mediaModule = {
  _state: {
    uploadedImageSrc: null,
    fileName: "studio_export",
    targetFormat: "png",
    customWidth: 1080,
    customHeight: 1080,
    selectedSizePreset: "custom",
    isAspectLocked: true,
    
    // Core Matrix Modifiers
    brightnessValue: 100,
    contrastValue: 100,
    saturationValue: 100,
    blurValue: 0,
    isAutoBrightnessActive: false,
    fitMode: "fill", // "fill" (crop) or "contain" (letterbox)

    // Source Metadata
    originalWidth: 0,
    originalHeight: 0,
    originalAspectRatio: 1
  },

  _sizePresets: {
    custom: { label: "Custom Constraints", w: 1080, h: 1080 },
    insta_post: { label: "Instagram Square (1:1)", w: 1080, h: 1080 },
    insta_story: { label: "Instagram Story (9:16)", w: 1080, h: 1920 },
    fb_cover: { label: "Facebook Cover Banner", w: 820, h: 312 },
    yt_thumb: { label: "YouTube Thumbnail (16:9)", w: 1280, h: 720 },
    print_a4: { label: "A4 Standard Print (300DPI)", w: 2480, h: 3508 },
    print_letter: { label: "US Letter Print (300DPI)", w: 2550, h: 3300 }
  },

  _injectGlobalStyles() {
    if (document.getElementById("ax-studio-styles")) return;
    
    const styleEl = document.createElement("style");
    styleEl.id = "ax-studio-styles";
    styleEl.innerHTML = `
      .ax-studio-frame {
        width: 100%; display: flex; flex-direction: column; gap: 16px;
        animation: ax_studio_reveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        color: #fff; box-sizing: border-box;
      }
      .ax-drop-zone {
        border: 2px dashed rgba(84, 218, 244, 0.2); background: rgba(4, 6, 10, 0.4);
        border-radius: 12px; padding: 32px; text-align: center; cursor: pointer;
        transition: all 0.2s ease; display: flex; flex-direction: column; align-items: center; gap: 8px;
        position: relative;
      }
      .ax-drop-zone.dragover { border-color: #54daf4; background: rgba(84, 218, 244, 0.08); }
      
      .ax-studio-preview-box {
        width: 100%; min-height: 280px; background: #030508; border-radius: 8px;
        display: flex; align-items: center; justify-content: center; overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.02); position: relative; box-shadow: inset 0 3px 8px rgba(0,0,0,0.8);
      }
      .ax-studio-preview-box canvas {
        max-width: 100%; max-height: 420px; object-fit: contain; box-shadow: 0 12px 24px rgba(0,0,0,0.5);
      }
      .ax-action-btn-primary {
        background: #1d4ed8; border: 1px solid #2563eb; color: #fff; border-radius: 8px;
        padding: 12px 24px; font-weight: 800; cursor: pointer; text-transform: uppercase;
        letter-spacing: 0.05em; font-size: 0.8rem; text-align: center; width: 100%;
        box-shadow: 0 4px 14px rgba(29, 78, 216, 0.4); transition: all 0.15s ease;
      }
      .ax-action-btn-primary:hover { background: #2563eb; transform: translateY(-1px); }
      .ax-action-btn-primary:disabled { background: #1e293b; border-color: #334155; color: #64748b; cursor: not-allowed; box-shadow: none; }
      
      .studio-range-group { margin-bottom: 10px; }
      .studio-range-label { display: flex; justify-content: space-between; margin-bottom: 4px; }
      
      .ax-reset-indicator {
        position: absolute; top: 8px; right: 8px; background: rgba(239, 68, 68, 0.2);
        color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4); padding: 2px 8px;
        border-radius: 4px; font-size: 0.65rem; cursor: pointer; transition: all 0.2s;
      }
      .ax-reset-indicator:hover { background: rgba(239, 68, 68, 0.4); color: #fff; }

      @keyframes ax_studio_reveal { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
    `;
    document.head.appendChild(styleEl);
  },

  renderModule() {
    const container = getEl("media-container");
    if (!container) return;

    this._injectGlobalStyles();

    container.innerHTML = `
      <div class="ax-studio-frame">
        
        <div class="ax-glass-card ax-header-gloss">
          <div class="ax-card-topbar">
            <div class="ax-meta-title">
              <span class="ax-glow-indicator"></span> MULTIFORMAT MEDIA PIPELINE & PHOTO STUDIO
            </div>
          </div>
          
          <input type="file" id="studio-file-loader" accept="image/jpeg, image/png, image/webp" style="display: none;">
          <div id="studio-drop-wrapper" class="ax-drop-zone">
            <div id="studio-upload-prompt" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <span style="font-size: 0.85rem; font-weight: 700; color: #cbd5e1;">Drop media assets here or click to open system files</span>
              <span style="font-size: 0.7rem; color: #475569;">Supports raw JPEG, PNG, or WEBP packages</span>
            </div>
          </div>
        </div>

        <div class="ax-columns-grid">
          
          <div class="ax-glass-card">
            <div class="ax-card-header">Transform Engine Options</div>

            <div class="ax-twin-counters">
              <div>
                <label class="ax-field-label">Target Layout Profile</label>
                <div class="ax-custom-select-container">
                  <select id="studio-size-preset" class="ax-select-element-core">
                    ${Object.entries(this._sizePresets).map(([key, val]) => `
                      <option value="${key}" ${this._state.selectedSizePreset === key ? 'selected' : ''}>${val.label}</option>
                    `).join('')}
                  </select>
                  <div class="ax-select-caret-vector">▼</div>
                </div>
              </div>
              
              <div>
                <label class="ax-field-label">Output Matrix Target</label>
                <div class="ax-custom-select-container">
                  <select id="studio-export-format" class="ax-select-element-core">
                    <option value="png">PNG (Lossless Format)</option>
                    <option value="jpeg">JPEG (Compressed Standard)</option>
                    <option value="webp">WEBP (Advanced Cloud Web)</option>
                    <option value="pdf">PDF Document Export</option>
                  </select>
                  <div class="ax-select-caret-vector">▼</div>
                </div>
              </div>
            </div>

            <div class="ax-twin-counters" style="margin-top: 4px;">
              <div>
                <label class="ax-field-label">Width (Pixels)</label>
                <input type="number" id="studio-pixel-width" value="${this._state.customWidth}" class="ax-sub-matrix-field" style="height: 36px; padding: 0 12px !important;">
              </div>
              <div>
                <label class="ax-field-label">Height (Pixels)</label>
                <input type="number" id="studio-pixel-height" value="${this._state.customHeight}" class="ax-sub-matrix-field" style="height: 36px; padding: 0 12px !important;">
              </div>
            </div>

            <div class="ax-twin-counters" style="margin-top: 4px;">
              <div>
                <label class="ax-field-label">Scale Fitting Policy</label>
                <div class="ax-custom-select-container">
                  <select id="studio-fit-mode" class="ax-select-element-core">
                    <option value="fill">Fill & Clip Dimensions</option>
                    <option value="contain">Fit & Letterbox (Preserve Outer)</option>
                  </select>
                  <div class="ax-select-caret-vector">▼</div>
                </div>
              </div>
              <div>
                <label class="ax-field-label">Output Filename</label>
                <input type="text" id="studio-filename-string" value="${this._state.fileName}" class="ax-sub-matrix-field" style="height: 36px; padding: 0 12px !important;" placeholder="studio_export">
              </div>
            </div>

            <div class="ax-switch-stack-panel" style="margin-top: 8px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <div class="ax-switch-row">
                <div class="ax-toggle-base">
                  <input type="checkbox" id="studio-toggle-aspect" ${this._state.isAspectLocked ? 'checked' : ''} class="ax-toggle-input">
                  <label for="studio-toggle-aspect" class="ax-toggle-runway"></label>
                </div>
                <label for="studio-toggle-aspect" class="ax-toggle-label-text">Lock original image aspect ratio matrix</label>
              </div>

              <div class="ax-switch-row">
                <div class="ax-toggle-base">
                  <input type="checkbox" id="studio-toggle-autobright" ${this._state.isAutoBrightnessActive ? 'checked' : ''} class="ax-toggle-input">
                  <label for="studio-toggle-autobright" class="ax-toggle-runway"></label>
                </div>
                <label for="studio-toggle-autobright" class="ax-toggle-label-text">Enable Automated Smart Brightness Balance</label>
              </div>
            </div>

            <div id="manual-controls-rack" style="margin-top: 12px;">
              <div class="studio-range-group" id="brightness-slider-wrapper">
                <div class="studio-range-label"><span class="ax-field-label">Exposure / Brightness</span><span id="val-bright" class="ax-field-label">100%</span></div>
                <input type="range" id="studio-brightness-slider" min="50" max="200" value="100" style="width: 100%; accent-color: #54daf4; cursor: pointer;">
              </div>

              <div class="studio-range-group">
                <div class="studio-range-label"><span class="ax-field-label">Contrast Matrix</span><span id="val-contrast" class="ax-field-label">100%</span></div>
                <input type="range" id="studio-contrast-slider" min="50" max="150" value="100" style="width: 100%; accent-color: #54daf4; cursor: pointer;">
              </div>

              <div class="studio-range-group">
                <div class="studio-range-label"><span class="ax-field-label">Color Saturation</span><span id="val-sat" class="ax-field-label">100%</span></div>
                <input type="range" id="studio-saturation-slider" min="0" max="200" value="100" style="width: 100%; accent-color: #54daf4; cursor: pointer;">
              </div>

              <div class="studio-range-group">
                <div class="studio-range-label"><span class="ax-field-label">Hardware Box Blur</span><span id="val-blur" class="ax-field-label">0px</span></div>
                <input type="range" id="studio-blur-slider" min="0" max="15" value="0" style="width: 100%; accent-color: #54daf4; cursor: pointer;">
              </div>
            </div>
          </div>

          <div class="ax-glass-card">
            <div class="ax-card-header">Live Render Pipeline Feed</div>
            
            <div class="ax-studio-preview-box">
              <div id="studio-empty-preview-notice" style="font-size: 0.72rem; color: #475569; text-align: center; padding: 40px;">
                Pipeline Idle.<br>Please load an image to construct processing channels.
              </div>
              <canvas id="studio-rendering-canvas" style="display: none;"></canvas>
            </div>

            <button type="button" id="studio-compile-trigger" class="ax-action-btn-primary" style="margin-top: auto;" disabled>
              Compile and Export Media 💾
            </button>
          </div>
        </div>

      </div>
    `;
  },

  bindModuleEvents() {
    const dropWrapper = getEl("studio-drop-wrapper");
    const fileLoader = getEl("studio-file-loader");

    dropWrapper?.addEventListener("click", () => fileLoader?.click());

    dropWrapper?.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropWrapper.classList.add("dragover");
    });

    dropWrapper?.addEventListener("dragleave", () => {
      dropWrapper.classList.remove("dragover");
    });

    dropWrapper?.addEventListener("drop", (e) => {
      e.preventDefault();
      dropWrapper.classList.remove("dragover");
      if (e.dataTransfer?.files?.length) {
        this._processLoadedFile(e.dataTransfer.files[0]);
      }
    });

    fileLoader?.addEventListener("change", (e) => {
      if (e.target.files?.length) {
        this._processLoadedFile(e.target.files[0]);
      }
    });

    getEl("studio-size-preset")?.addEventListener("change", (e) => {
      this._state.selectedSizePreset = e.target.value;
      const selected = this._sizePresets[e.target.value];
      if (selected && e.target.value !== "custom") {
        this._state.customWidth = selected.w;
        this._state.customHeight = selected.h;
        if (getEl("studio-pixel-width")) getEl("studio-pixel-width").value = selected.w;
        if (getEl("studio-pixel-height")) getEl("studio-pixel-height").value = selected.h;
        
        if (this._state.uploadedImageSrc && this._state.isAspectLocked) {
          this._recalculateDimensionsViaLock("width");
        }
      }
      this._updatePipelineRender();
    });

    getEl("studio-fit-mode")?.addEventListener("change", (e) => {
      this._state.fitMode = e.target.value;
      this._updatePipelineRender();
    });

    getEl("studio-export-format")?.addEventListener("change", (e) => {
      this._state.targetFormat = e.target.value;
    });

    getEl("studio-pixel-width")?.addEventListener("input", (e) => {
      this._state.selectedSizePreset = "custom";
      if (getEl("studio-size-preset")) getEl("studio-size-preset").value = "custom";
      this._state.customWidth = parseInt(e.target.value) || 1080;
      if (this._state.isAspectLocked && this._state.uploadedImageSrc) {
        this._recalculateDimensionsViaLock("width");
      }
      this._updatePipelineRender();
    });

    getEl("studio-pixel-height")?.addEventListener("input", (e) => {
      this._state.selectedSizePreset = "custom";
      if (getEl("studio-size-preset")) getEl("studio-size-preset").value = "custom";
      this._state.customHeight = parseInt(e.target.value) || 1080;
      if (this._state.isAspectLocked && this._state.uploadedImageSrc) {
        this._recalculateDimensionsViaLock("height");
      }
      this._updatePipelineRender();
    });

    getEl("studio-toggle-aspect")?.addEventListener("change", (e) => {
      this._state.isAspectLocked = e.target.checked;
      if (this._state.isAspectLocked && this._state.uploadedImageSrc) {
        this._recalculateDimensionsViaLock("width");
        this._updatePipelineRender();
      }
    });

    getEl("studio-toggle-autobright")?.addEventListener("change", (e) => {
      this._state.isAutoBrightnessActive = e.target.checked;
      const bWrapper = getEl("brightness-slider-wrapper");
      if (bWrapper) bWrapper.style.display = e.target.checked ? "none" : "block";
      this._updatePipelineRender();
    });

    // FIXED Slider Matrix listeners updates the state variable immediately
    getEl("studio-brightness-slider")?.addEventListener("input", (e) => {
      this._state.brightnessValue = parseInt(e.target.value);
      const textVal = getEl("val-bright");
      if (textVal) textVal.innerText = `${this._state.brightnessValue}%`;
      this._updatePipelineRender();
    });

    getEl("studio-contrast-slider")?.addEventListener("input", (e) => {
      this._state.contrastValue = parseInt(e.target.value);
      const textVal = getEl("val-contrast");
      if (textVal) textVal.innerText = `${this._state.contrastValue}%`;
      this._updatePipelineRender();
    });

    getEl("studio-saturation-slider")?.addEventListener("input", (e) => {
      this._state.saturationValue = parseInt(e.target.value);
      const textVal = getEl("val-sat");
      if (textVal) textVal.innerText = `${this._state.saturationValue}%`;
      this._updatePipelineRender();
    });

    getEl("studio-blur-slider")?.addEventListener("input", (e) => {
      this._state.blurValue = parseInt(e.target.value);
      const textVal = getEl("val-blur");
      if (textVal) textVal.innerText = `${this._state.blurValue}px`;
      this._updatePipelineRender();
    });

    getEl("studio-filename-string")?.addEventListener("input", (e) => {
      this._state.fileName = e.target.value.trim() || "studio_export";
    });

    getEl("studio-compile-trigger")?.addEventListener("click", () => this._exportFinalOutputData());
  },

  _processLoadedFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        this._state.uploadedImageSrc = event.target.result;
        this._state.originalWidth = img.width;
        this._state.originalHeight = img.height;
        this._state.originalAspectRatio = img.width / img.height;
        
        getEl("studio-empty-preview-notice").style.display = "none";
        getEl("studio-rendering-canvas").style.display = "block";
        getEl("studio-compile-trigger").removeAttribute("disabled");

        // Append UI Reset Button safely inside upload panel area
        const wrapper = getEl("studio-drop-wrapper");
        if (wrapper && !getEl("studio-clear-btn")) {
          const resetBtn = document.createElement("div");
          resetBtn.id = "studio-clear-btn";
          resetBtn.className = "ax-reset-indicator";
          resetBtn.innerText = "CLEAR ASSET ✕";
          resetBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this._resetModuleState();
          });
          wrapper.appendChild(resetBtn);
        }

        getEl("studio-upload-prompt").innerHTML = `
          <span style="font-size: 0.82rem; font-weight: 700; color: #54daf4;">✔ Loaded: ${file.name}</span>
          <span style="font-size: 0.68rem; color: #64748b;">Source Matrix: ${img.width}px × ${img.height}px</span>
        `;

        if (this._state.selectedSizePreset === "custom") {
          this._state.customWidth = img.width;
          this._state.customHeight = img.height;
          if (getEl("studio-pixel-width")) getEl("studio-pixel-width").value = img.width;
          if (getEl("studio-pixel-height")) getEl("studio-pixel-height").value = img.height;
        } else if (this._state.isAspectLocked) {
          this._recalculateDimensionsViaLock("width");
        }

        this._updatePipelineRender();
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  },

  _recalculateDimensionsViaLock(changedDimension) {
    const wInput = getEl("studio-pixel-width");
    const hInput = getEl("studio-pixel-height");
    if (changedDimension === "width") {
      this._state.customHeight = Math.round(this._state.customWidth / this._state.originalAspectRatio);
      if (hInput) hInput.value = this._state.customHeight;
    } else {
      this._state.customWidth = Math.round(this._state.customHeight * this._state.originalAspectRatio);
      if (wInput) wInput.value = this._state.customWidth;
    }
  },

  _updatePipelineRender() {
    if (!this._state.uploadedImageSrc) return;

    const canvas = getEl("studio-rendering-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = this._state.customWidth;
      canvas.height = this._state.customHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // FIXED: Build CSS hardware filters mapping string
      let filterString = `contrast(${this._state.contrastValue}%) saturate(${this._state.saturationValue}%)`;
      if (this._state.blurValue > 0) filterString += ` blur(${this._state.blurValue}px)`;
      
      // Calculate automated brightness adjustments
      let targetBrightness = this._state.brightnessValue;
      if (this._state.isAutoBrightnessActive) {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = 40; tempCanvas.height = 40;
        tempCtx.drawImage(img, 0, 0, 40, 40);
        const data = tempCtx.getImageData(0, 0, 40, 40).data;
        let luminanceSum = 0;
        for (let i = 0; i < data.length; i += 4) {
          luminanceSum += (0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]);
        }
        const avgLuminance = luminanceSum / 1600;
        targetBrightness = avgLuminance < 110 ? 135 : (avgLuminance > 160 ? 82 : 100);
      }
      filterString += ` brightness(${targetBrightness}%)`;
      
      // CRITICAL FIXED LINE: Apply matrix properties *before* calling drawImage pipelines
      ctx.filter = filterString;

      // Handle Scale Policy Layout Models
      if (this._state.fitMode === "contain") {
        const ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
        const targetW = img.width * ratio;
        const targetH = img.height * ratio;
        const offsetX = (canvas.width - targetW) / 2;
        const offsetY = (canvas.height - targetH) / 2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, targetW, targetH);
      } else {
        const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
        const targetW = img.width * ratio;
        const targetH = img.height * ratio;
        const offsetX = (canvas.width - targetW) / 2;
        const offsetY = (canvas.height - targetH) / 2;
        ctx.drawImage(img, offsetX, offsetY, targetW, targetH);
      }
      
      ctx.filter = "none"; // Clean engine cache registers immediately
    };
    img.src = this._state.uploadedImageSrc;
  },

  _exportFinalOutputData() {
    if (!this._state.uploadedImageSrc) return;

    const canvas = getEl("studio-rendering-canvas");
    const filename = this._state.fileName;
    const triggerBtn = getEl("studio-compile-trigger");

    triggerBtn.innerText = "Processing Render... ⌛";
    triggerBtn.setAttribute("disabled", "true");

    setTimeout(() => {
      if (this._state.targetFormat === "pdf") {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "l" : "p",
          unit: "px",
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${filename}.pdf`);
      } else {
        const mimeTypes = { png: "image/png", jpeg: "image/jpeg", webp: "image/webp" };
        const downloadLink = document.createElement("a");
        downloadLink.download = `${filename}.${this._state.targetFormat}`;
        downloadLink.href = canvas.toDataURL(mimeTypes[this._state.targetFormat], 0.92);
        downloadLink.click();
      }
      triggerBtn.innerText = "Compile and Export Media 💾";
      triggerBtn.removeAttribute("disabled");
    }, 450);
  },

  _resetModuleState() {
    this._state.uploadedImageSrc = null;
    getEl("studio-clear-btn")?.remove();
    getEl("studio-rendering-canvas").style.display = "none";
    getEl("studio-empty-preview-notice").style.display = "block";
    getEl("studio-compile-trigger").setAttribute("disabled", "true");
    getEl("studio-file-loader").value = "";
    getEl("studio-upload-prompt").innerHTML = `
      <span style="font-size: 0.85rem; font-weight: 700; color: #cbd5e1;">Drop media assets here or click to open system files</span>
      <span style="font-size: 0.7rem; color: #475569;">Supports raw JPEG, PNG, or WEBP packages</span>
    `;
  }
};

export default mediaModule;