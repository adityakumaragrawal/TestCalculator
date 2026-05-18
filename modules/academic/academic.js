/**
 * ASSISTWE Academic Module — High-Performance Gradient Matrix Engine
 * Architecture: Isolated Single-Zone Event System & Seamless Realtime Formatting Compilers
 */

"use strict";

const getEl = (id) => document.getElementById(id);

const academicModule = {
  _state: {
    text: "Birdflop Matrix",
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isStrikethrough: false,
    colors: ["#FF007F", "#FF758C", "#FF7EB3"],
    previewBg: "dark",
    sliderValue: 0.5,
    curveType: "linear",
    formatType: "essentials",
    colorSpace: "rgb",
    charsPerColor: 1,
    prefixSuffix: "/nick $t",
    stripWhitespaceTags: true,
    forceLowercase: false
  },

  _presets: {
    cyber: ["#FF007F", "#7B2CBF", "#240046"],
    frost: ["#00F2FE", "#4FACFE", "#0A1128"],
    sunset: ["#FF416C", "#FF8C00"],
    neon: ["#00FF87", "#60EFFF"],
    magma: ["#FF3300", "#FF9900", "#FFFF00"],
    amethyst: ["#9D4EDD", "#5A189A", "#240046"],
    forest: ["#11998E", "#38EF7D"],
    bubblegum: ["#FF007F", "#FF758C", "#FF7EB3"]
  },

  _injectGlobalStyles() {
    if (document.getElementById("ax-academic-styles")) return;
    
    const styleEl = document.createElement("style");
    styleEl.id = "ax-academic-styles";
    styleEl.innerHTML = `
      :root {
        --shell-width: 1200px;
      }
      .ax-workspace-frame {
        width: var(--shell-width); max-width: 100%; display: flex; flex-direction: column; gap: 16px;
        animation: ax_reveal 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        user-select: none; color: #fff; box-sizing: border-box; margin: 0 auto;
      }

      .ax-glass-card {
        background: linear-gradient(145deg, rgba(13, 18, 30, 0.9) 0%, rgba(7, 10, 17, 0.96) 100%);
        border: 1px solid rgba(255, 255, 255, 0.04);
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 16px;
        box-shadow: inset 0 1px 1px rgba(255,255,255,0.06), 0 24px 48px rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
        position: relative; box-sizing: border-box;
      }
      
      .ax-header-gloss::before {
        content: ''; position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
        background: linear-gradient(90deg, transparent, rgba(84, 218, 244, 0.3), transparent);
      }

      .ax-card-topbar { display: flex; justify-content: space-between; align-items: center; width: 100%; }
      .ax-meta-title { font-weight: 800; font-size: 0.7rem; color: #7f8ea4; letter-spacing: 0.08em; display: flex; align-items: center; gap: 8px; }
      .ax-glow-indicator { width: 6px; height: 6px; background: #54daf4; border-radius: 50%; box-shadow: 0 0 8px #54daf4; }

      .ax-input-wrapper-glow { width: 100%; position: relative; }
      .ax-premium-core-input {
        width: 100%; background: linear-gradient(180deg, rgba(5, 7, 12, 0.9) 0%, rgba(10, 14, 24, 0.95) 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.03) !important; border-top: 1px solid rgba(255, 255, 255, 0.07) !important;
        border-radius: 10px; padding: 16px 20px !important; color: #54daf4; font-size: 1.8rem; font-weight: 900; outline: none; box-sizing: border-box;
        box-shadow: inset 0 4px 8px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.02); letter-spacing: 0.5px;
      }

      .ax-slider-envelope { padding: 4px 0; width: 100%; }
      .ax-slider-trackway {
        height: 10px; border-radius: 999px; background: #05070c; position: relative; cursor: pointer; box-shadow: inset 0 2px 5px rgba(0,0,0,0.8);
      }
      .ax-slider-thumb-marker {
        position: absolute; left: 50%; top: -3px; width: 16px; height: 16px; background: #ffffff; border-radius: 50%; transform: translateX(-50%);
        box-shadow: 0 0 14px #54daf4, 0 3px 6px rgba(0,0,0,0.6); pointer-events: none; transform-origin: center; will-change: left;
      }

      .ax-columns-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%; }
      .ax-card-header { font-weight: 800; font-size: 0.82rem; color: #f1f5f9; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 14px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
      .ax-field-label { display: block; font-size: 0.68rem; color: #57657a; margin-bottom: 6px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; }

      .ax-preset-row-matrix { display: flex; gap: 6px; flex-wrap: wrap; }
      .ax-preset-chip { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 6px; padding: 8px 12px; font-size: 0.72rem; color: #94a3b8; font-weight: 700; cursor: pointer; transition: all 0.2s ease; }
      .ax-preset-chip:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(255,255,255,0.12); color: #fff; }

      .ax-twin-counters { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; width: 100%; }
      .ax-counter-pill { display: flex; align-items: center; background: rgba(4, 6, 10, 0.8); border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.03); box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); overflow: hidden; height: 36px; }
      .ax-counter-trigger { background: transparent; border: none; color: #475569; width: 36px; height: 100%; cursor: pointer; font-weight: bold; font-size: 1rem; }
      .ax-counter-trigger:hover { color: #54daf4; background: rgba(255,255,255,0.02); }
      .ax-counter-display { width: 100%; background: transparent; border: none !important; color: #fff; text-align: center; font-weight: 800; outline: none; font-size: 0.85rem; padding: 0 !important; }

      .ax-action-grid-rack { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; width: 100%; }
      .ax-action-pill-btn { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.04); color: #8a99ad; border-radius: 8px; padding: 9px 6px; cursor: pointer; font-size: 0.72rem; font-weight: 700; text-align: center; }
      .ax-action-pill-btn:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.15); color: #fff; transform: translateY(-1px); }

      .ax-custom-select-container { position: relative; display: flex; align-items: center; width: 100%; height: 36px; }
      .ax-select-element-core { width: 100%; height: 100%; padding: 0 32px 0 12px !important; font-size: 0.78rem !important; font-weight: 700; color: #cbd5e1 !important; appearance: none !important; -webkit-appearance: none !important; border: none !important; outline: none !important; cursor: pointer; background: linear-gradient(180deg, rgba(12, 17, 28, 0.95) 0%, rgba(6, 9, 15, 0.98) 100%) !important; border-radius: 8px !important; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4) !important; }
      .ax-select-caret-vector { position: absolute; right: 12px; pointer-events: none; font-size: 0.55rem; color: #475569; }
      .ax-sub-matrix-field { width: 100%; background: rgba(4, 6, 10, 0.8) !important; border: 1px solid rgba(255, 255, 255, 0.03) !important; border-radius: 8px !important; padding: 10px 14px !important; color: #fff !important; font-family: monospace; font-size: 0.8rem !important; outline: none; box-sizing: border-box; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); }

      .ax-node-scroll-chamber { display: flex; flex-direction: column; gap: 6px; max-height: 172px; overflow-y: auto; padding-right: 2px; }
      .ax-color-row-capsule { display: flex; align-items: center; gap: 10px; background: rgba(4, 6, 10, 0.4); padding: 6px 12px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.02); }
      .ax-palette-box { position: relative; width: 18px; height: 18px; border-radius: 4px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.15); flex-shrink: 0; }
      .ax-hex-text-box { width: 100%; background: transparent; border: none !important; color: #94a3b8; font-family: monospace; outline: none; font-size: 0.8rem; font-weight: 700; padding: 0 !important; }
      .ax-row-purge-trigger { background: transparent; border: none; color: #64748b; cursor: pointer; font-size: 0.75rem; }
      .ax-row-purge-trigger:hover { color: #ef4444; }

      .ax-toolbar-pill { display: flex; gap: 4px; background: rgba(4, 6, 10, 0.9); padding: 4px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03); width: max-content; }
      .ax-tool-btn { 
        background: transparent; border: none; color: #475569; padding: 6px 14px; font-weight: 900; 
        cursor: pointer !important; pointer-events: auto !important; font-size: 0.8rem; border-radius: 6px; 
        transition: all 0.1s ease; position: relative; z-index: 30;
      }
      .ax-tool-btn:hover { color: #94a3b8; background: rgba(255,255,255,0.02); }
      .ax-tool-btn.active-tool { background: #1d4ed8 !important; color: #ffffff !important; font-weight: 900 !important; box-shadow: 0 0 10px rgba(29, 78, 216, 0.6); }

      .ax-code-matrix-terminal { width: 100%; height: 76px; background: rgba(4, 6, 10, 0.8); border: 1px solid rgba(255, 255, 255, 0.02); border-radius: 8px; padding: 12px; color: #a4b5cd; font-family: monospace; font-size: 0.75rem; resize: none; outline: none; line-height: 1.5; word-break: break-all; box-sizing: border-box; }

      .ax-switch-stack-panel { display: flex; flex-direction: column; gap: 8px; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 12px; }
      .ax-switch-row { display: flex; align-items: center; gap: 10px; }
      .ax-toggle-base { position: relative; width: 30px; height: 16px; flex-shrink: 0; }
      .ax-toggle-input { opacity: 0; width: 0; height: 0; }
      .ax-toggle-runway { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.02); transition: .2s; border-radius: 20px; border: 1px solid rgba(255,255,255,0.05); }
      .ax-toggle-runway::after { content: ''; position: absolute; width: 10px; height: 10px; border-radius: 50%; background-color: #334155; top: 2px; left: 2px; transition: .2s; }
      .ax-toggle-input:checked + .ax-toggle-runway { background-color: #1d4ed8; border-color: #2563eb; }
      .ax-toggle-input:checked + .ax-toggle-runway::after { transform: translateX(14px); background-color: #fff; }
      .ax-toggle-label-text { font-size: 0.72rem; font-weight: 600; color: #64748b; cursor: pointer; }

      .ax-preview-canvas { font-size: 2.2rem; min-height: 100px; display: flex; align-items: center; justify-content: center; padding: 20px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.03); box-sizing: border-box; }
      
      .preview-bg-dark { background-color: #030508; box-shadow: inset 0 3px 8px rgba(0,0,0,0.8); }
      .preview-bg-light { background-color: #f8fafc; border-color: #e2e8f0; }
      .preview-bg-trans { background-color: #05070c; background-image: linear-gradient(45deg, #020305 25%, transparent 25%), linear-gradient(-45deg, #020305 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #020305 75%), linear-gradient(-45deg, transparent 75%, #020305 75%); background-size: 16px 16px; }

      .ax-bg-view-btn { background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 4px; padding: 5px 10px; cursor: pointer; font-size: 0.7rem; color: #64748b; font-weight: 700; }
      .ax-bg-view-btn.active { background: #1d4ed8; border-color: #2563eb; color: #fff; }
      .ax-highlight-border { border-color: rgba(84, 218, 244, 0.2); color: #54daf4 !important; font-weight: 800; }
      .ax-preset-chip:active, .ax-action-pill-btn:active, .ax-tool-btn:active { transform: scale(0.97); }
      .ax-pulse-green { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; display: inline-block; box-shadow: 0 0 8px #22c55e; }

      @keyframes ax_reveal { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      @media (max-width: 950px) { .ax-columns-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(styleEl);
  },

  renderModule() {
    const container = getEl("academic-container") || document.body;
    if (!container) return;

    this._injectGlobalStyles();

    container.innerHTML = `
      <div class="ax-workspace-frame">
        
        <div class="ax-glass-card ax-header-gloss">
          <div class="ax-card-topbar">
            <div class="ax-meta-title">
              <span class="ax-glow-indicator"></span> VECTOR STRING LAYER CONFIGURATOR
            </div>
          </div>
          
          <div class="ax-input-wrapper-glow">
            <input type="text" id="grad-text-string" value="${this._state.text}" class="ax-premium-core-input" placeholder="Type data array string...">
          </div>
          
          <div class="ax-slider-envelope">
            <div id="gradient-slider-track" class="ax-slider-trackway">
              <div id="slider-thumb-marker" class="ax-slider-thumb-marker"></div>
            </div>
          </div>
        </div>

        <div class="ax-columns-grid">
          
          <div class="ax-glass-card" id="left-controls-panel">
            <div class="ax-card-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Spectrum Vector Matrix Stops
            </div>

            <div class="ax-twin-counters">
              <div>
                <label class="ax-field-label">Geometric Easing Curve</label>
                <div class="ax-custom-select-container">
                  <select id="bf-curve-geometry" class="ax-select-element-core">
                    <option value="linear" ${this._state.curveType === 'linear' ? 'selected' : ''}>Standard Linear Space</option>
                    <option value="ease-in" ${this._state.curveType === 'ease-in' ? 'selected' : ''}>Quadratic Ease-In Accel</option>
                    <option value="ease-out" ${this._state.curveType === 'ease-out' ? 'selected' : ''}>Quadratic Ease-Out Decel</option>
                    <option value="bezier" ${this._state.curveType === 'bezier' ? 'selected' : ''}>Cubic-Bezier Blend Curve</option>
                  </select>
                  <div class="ax-select-caret-vector">▼</div>
                </div>
              </div>
              
              <div>
                <label class="ax-field-label">Characters / Stop</label>
                <div class="ax-counter-pill">
                  <button type="button" id="btn-chars-minus" class="ax-counter-trigger">−</button>
                  <input type="number" id="input-chars-per-color" value="${this._state.charsPerColor}" min="1" class="ax-counter-display">
                  <button type="button" id="btn-chars-plus" class="ax-counter-trigger">+</button>
                </div>
              </div>
            </div>
            
            <div class="ax-twin-counters" style="margin-top: 4px;">
              <div>
                <label class="ax-field-label">Array Nodes Length</label>
                <div class="ax-counter-pill">
                  <button type="button" id="btn-amount-minus" class="ax-counter-trigger">−</button>
                  <input type="number" id="input-color-amount" value="${this._state.colors.length}" min="2" max="10" class="ax-counter-display" readonly>
                  <button type="button" id="btn-amount-plus" class="ax-counter-trigger">+</button>
                </div>
              </div>
              <div>
                <label class="ax-field-label">Macro Theme Arrays</label>
                <div class="ax-preset-row-matrix">
                  <button type="button" class="ax-preset-chip" data-preset="cyber" title="Cyberpunk">Cyber</button>
                  <button type="button" class="ax-preset-chip" data-preset="frost" title="Midnight Frost">Frost</button>
                  <button type="button" class="ax-preset-chip" data-preset="sunset" title="Sunset Horizon">Sunset</button>
                  <button type="button" class="ax-preset-chip" data-preset="neon" title="Toxic Neon">Neon</button>
                </div>
              </div>
            </div>

            <div style="margin-top: 12px;">
              <label class="ax-field-label">Quick Realtime Text Modifiers</label>
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 6px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #94a3b8; cursor: pointer;">
                  <input type="checkbox" id="mod-bold-btn" ${this._state.isBold ? 'checked' : ''}> Bold Style
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #94a3b8; cursor: pointer;">
                  <input type="checkbox" id="mod-italic-btn" ${this._state.isItalic ? 'checked' : ''}> Italic Style
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #94a3b8; cursor: pointer;">
                  <input type="checkbox" id="mod-underline-btn" ${this._state.isUnderline ? 'checked' : ''}> Underline Style
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: #94a3b8; cursor: pointer;">
                  <input type="checkbox" id="mod-strike-btn" ${this._state.isStrikethrough ? 'checked' : ''}> Strikethrough Style
                </label>
              </div>
            </div>

            <div style="margin-top: 12px;">
              <label class="ax-field-label">Extended Spectral Themes</label>
              <div class="ax-preset-row-matrix">
                <button type="button" class="ax-preset-chip" data-preset="magma" title="Lava Magma Core">🔥 Magma</button>
                <button type="button" class="ax-preset-chip" data-preset="amethyst" title="Amethyst Rift">🔮 Amethyst</button>
                <button type="button" class="ax-preset-chip" data-preset="forest" title="Abyssal Canopy">🌿 Forest</button>
                <button type="button" class="ax-preset-chip" data-preset="bubblegum" title="Hyper Bubblegum">🍬 Candy</button>
              </div>
            </div>

            <div class="ax-action-grid-rack" style="margin-top: 8px;">
              <button type="button" id="btn-action-randomize" class="ax-action-pill-btn">🎲 Random</button>
              <button type="button" id="btn-action-invert" class="ax-action-pill-btn">⇄ Invert</button>
              <button type="button" id="btn-action-shuffle" class="ax-action-pill-btn">🔀 Mix</button>
              <button type="button" id="btn-action-clear-nodes" class="ax-action-pill-btn" style="color: #ef4444;">🧹 Clean</button>
            </div>

            <div id="dynamic-color-rows-container" class="ax-node-scroll-chamber" style="margin-top: 8px;">
            </div>
          </div>

          <div class="ax-glass-card">
            <div class="ax-card-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
              Technical Compilation Terminal
            </div>
            
            <textarea id="bf-raw-output-box" readonly class="ax-code-matrix-terminal" placeholder="Compilation active..."></textarea>

            <div class="ax-twin-counters" style="margin-top: 4px;">
              <div>
                <label class="ax-field-label">Target Syntax Profile</label>
                <div class="ax-custom-select-container">
                  <select id="grad-format-selector" class="ax-select-element-core">
                    <option value="essentials" ${this._state.formatType === 'essentials' ? 'selected' : ''}>EssentialsX Engine (&#38;#rrggbb)</option>
                    <option value="legacy" ${this._state.formatType === 'legacy' ? 'selected' : ''}>Legacy Core (&amp;x&amp;r&amp;r...)</option>
                    <option value="minimessage" ${this._state.formatType === 'minimessage' ? 'selected' : ''}>MiniMessage Engine (&lt;#rrggbb&gt;)</option>
                    <option value="cmi" ${this._state.formatType === 'cmi' ? 'selected' : ''}>CMI Global System ({#rrggbb})</option>
                    <option value="standard" ${this._state.formatType === 'standard' ? 'selected' : ''}>Raw Hex System (#rrggbb)</option>
                  </select>
                  <div class="ax-select-caret-vector">▼</div>
                </div>
              </div>
              
              <div>
                <label class="ax-field-label">Color Space Matrix</label>
                <div class="ax-custom-select-container">
                  <select id="bf-gradient-type" class="ax-select-element-core">
                    <option value="rgb" ${this._state.colorSpace === 'rgb' ? 'selected' : ''}>Linear RGB Matrix</option>
                    <option value="hsv" ${this._state.colorSpace === 'hsv' ? 'selected' : ''}>Cylindrical HSV Map</option>
                  </select>
                  <div class="ax-select-caret-vector">▼</div>
                </div>
              </div>
            </div>

            <div>
              <label class="ax-field-label">Wrap Interpolation Syntax Template Prefix</label>
              <input type="text" id="bf-prefix-suffix" value="${this._state.prefixSuffix}" class="ax-sub-matrix-field">
            </div>

            <div class="ax-switch-stack-panel">
              <div class="ax-switch-row">
                <div class="ax-toggle-base">
                  <input type="checkbox" id="toggle-trim" ${this._state.stripWhitespaceTags ? 'checked' : ''} class="ax-toggle-input">
                  <label for="toggle-trim" class="ax-toggle-runway"></label>
                </div>
                <label for="toggle-trim" class="ax-toggle-label-text">Strip formatting tags out of structural whitespace gaps</label>
              </div>

              <div class="ax-switch-row">
                <div class="ax-toggle-base">
                  <input type="checkbox" id="toggle-lowercase" ${this._state.forceLowercase ? 'checked' : ''} class="ax-toggle-input">
                  <label for="toggle-lowercase" class="ax-toggle-runway"></label>
                </div>
                <label for="toggle-lowercase" class="ax-toggle-label-text">Force lowercase formatting on output strings</label>
              </div>
            </div>
          </div>
        </div>

        <div class="ax-glass-card" style="gap: 12px; margin-top: 2px;">
          <div class="ax-card-topbar">
            <div class="ax-meta-title" style="font-size: 0.68rem; color: #64748b;">
              <span class="ax-pulse-green"></span> VECTOR RASTER GRAPHICAL RECONSTRUCTION MONITOR
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" id="btn-preview-bg-dark" class="ax-bg-view-btn">Matrix Dark</button>
              <button type="button" id="btn-preview-bg-light" class="ax-bg-view-btn">Studio Light</button>
              <button type="button" id="btn-preview-bg-trans" class="ax-bg-view-btn">Alpha Layer</button>
              <div style="width: 1px; height: 14px; background: rgba(255,255,255,0.06); margin: 0 4px;"></div>
              <button type="button" id="btn-preview-copy-shortcut" class="ax-action-pill-btn ax-highlight-border">
                Export Encoded Array 📋
              </button>
            </div>
          </div>
          <div id="live-gradient-preview-container" class="ax-preview-canvas">
            <div id="live-gradient-preview"></div>
          </div>
        </div>

      </div>
    `;

    this._renderColorRows();
    this._syncBackgroundUI(this._state.previewBg);
    this.bindModuleEvents();
  },

  _renderColorRows() {
    const targetDiv = getEl("dynamic-color-rows-container");
    if (!targetDiv) return;

    let rowsHTML = "";
    this._state.colors.forEach((color, index) => {
      rowsHTML += `
        <div class="ax-color-row-capsule" data-index="${index}">
          <div class="ax-palette-box" style="background: ${color};">
            <input type="color" id="grad-color-${index}" value="${color}" style="position:absolute;top:-8px;left:-8px;width:36px;height:36px;border:none;cursor:pointer;" data-index="${index}">
          </div>
          <span style="font-size: 0.75rem; color: #334155; font-family: monospace; font-weight: 900;">#</span>
          <input type="text" id="grad-hex-${index}" value="${color.replace("#", "").toUpperCase()}" class="ax-hex-text-box" data-index="${index}" maxlength="6">
          <button type="button" class="ax-row-purge-trigger btn-row-trash" data-index="${index}">✕</button>
        </div>
      `;
    });

    targetDiv.innerHTML = rowsHTML;

    this._bindRowListeners();
    this._updateTrackGradientBackground();
    this._processActiveCalculations();
  },

  _bindRowListeners() {
    this._state.colors.forEach((_, index) => {
      const picker = getEl(`grad-color-${index}`);
      const hexField = getEl(`grad-hex-${index}`);

      picker?.addEventListener("input", (e) => {
        const val = e.target.value.toUpperCase();
        this._state.colors[index] = val;
        if (hexField) hexField.value = val.replace("#", "");
        if (picker.parentElement) picker.parentElement.style.background = val;
        this._updateTrackGradientBackground();
        this._processActiveCalculations();
      });

      hexField?.addEventListener("input", (e) => {
        let val = e.target.value.trim();
        if (val.length === 6) {
          const fullHex = "#" + val;
          this._state.colors[index] = fullHex.toUpperCase();
          if (picker) picker.value = fullHex;
          if (picker?.parentElement) picker.parentElement.style.background = fullHex;
          this._updateTrackGradientBackground();
          this._processActiveCalculations();
        }
      });
    });

    document.querySelectorAll(".btn-row-trash").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetIdx = parseInt(e.currentTarget.getAttribute("data-index"));
        if (this._state.colors.length > 2) {
          this._state.colors.splice(targetIdx, 1);
          const amountInput = getEl("input-color-amount");
          if (amountInput) amountInput.value = this._state.colors.length;
          this._renderColorRows();
        }
      });
    });
  },

  _updateTrackGradientBackground() {
    const track = getEl("gradient-slider-track");
    const thumb = getEl("slider-thumb-marker");
    if (track && this._state.colors.length > 0) {
      track.style.setProperty('background', `linear-gradient(90deg, ${this._state.colors.join(", ")})`, 'important');
    }
    if (thumb) {
      thumb.style.left = `${this._state.sliderValue * 100}%`;
    }
  },

  _syncToolbarUI() {
    // Left empty since browser natively syncs checkboxes
  },

  _syncBackgroundUI(chosen) {
    this._state.previewBg = chosen;
    ["dark", "light", "trans"].forEach(t => {
      getEl(`btn-preview-bg-${t}`)?.classList.remove("active");
    });
    getEl(`btn-preview-bg-${chosen}`)?.classList.add("active");
    
    const containerBlock = getEl("live-gradient-preview-container");
    if (containerBlock) {
      containerBlock.className = `ax-preview-canvas preview-bg-${chosen}`;
    }
  },

  bindModuleEvents() {
    getEl("grad-text-string")?.addEventListener("input", (e) => {
      this._state.text = e.target.value;
      this._processActiveCalculations();
    });

    // --- TEXT MODIFIER STANDARD HTML CHECKBOXES ---
    getEl("mod-bold-btn")?.addEventListener("change", (e) => {
      this._state.isBold = e.target.checked;
      this._processActiveCalculations();
    });
    getEl("mod-italic-btn")?.addEventListener("change", (e) => {
      this._state.isItalic = e.target.checked;
      this._processActiveCalculations();
    });
    getEl("mod-underline-btn")?.addEventListener("change", (e) => {
      this._state.isUnderline = e.target.checked;
      this._processActiveCalculations();
    });
    getEl("mod-strike-btn")?.addEventListener("change", (e) => {
      this._state.isStrikethrough = e.target.checked;
      this._processActiveCalculations();
    });

    const charInput = getEl("input-chars-per-color");
    getEl("btn-chars-minus")?.addEventListener("click", () => {
      if (charInput && parseInt(charInput.value) > 1) {
        this._state.charsPerColor = parseInt(charInput.value) - 1;
        charInput.value = this._state.charsPerColor;
        this._processActiveCalculations();
      }
    });
    getEl("btn-chars-plus")?.addEventListener("click", () => {
      if (charInput) {
        this._state.charsPerColor = parseInt(charInput.value) + 1;
        charInput.value = this._state.charsPerColor;
        this._processActiveCalculations();
      }
    });
    charInput?.addEventListener("change", (e) => {
      this._state.charsPerColor = Math.max(1, parseInt(e.target.value) || 1);
      this._processActiveCalculations();
    });

    const amountInput = getEl("input-color-amount");
    getEl("btn-amount-minus")?.addEventListener("click", () => {
      if (amountInput && this._state.colors.length > 2) {
        this._state.colors.pop();
        amountInput.value = this._state.colors.length;
        this._renderColorRows();
      }
    });
    getEl("btn-amount-plus")?.addEventListener("click", () => {
      if (amountInput && this._state.colors.length < 10) {
        const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase();
        this._state.colors.push(randomHex);
        amountInput.value = this._state.colors.length;
        this._renderColorRows();
      }
    });

    getEl("btn-action-randomize")?.addEventListener("click", () => {
      this._state.colors = this._state.colors.map(() => 
        "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0").toUpperCase()
      );
      this._renderColorRows();
    });
    getEl("btn-action-invert")?.addEventListener("click", () => {
      this._state.colors.reverse();
      this._renderColorRows();
    });
    getEl("btn-action-shuffle")?.addEventListener("click", () => {
      this._state.colors.sort(() => Math.random() - 0.5);
      this._renderColorRows();
    });
    getEl("btn-action-clear-nodes")?.addEventListener("click", () => {
      this._state.colors = ["#FFFFFF", "#000000"];
      if (amountInput) amountInput.value = 2;
      this._renderColorRows();
    });

    document.querySelectorAll(".ax-preset-chip").forEach(chip => {
      chip.addEventListener("click", (e) => {
        const targetPreset = e.currentTarget.getAttribute("data-preset");
        if (this._presets[targetPreset]) {
          this._state.colors = [...this._presets[targetPreset]];
          if (amountInput) amountInput.value = this._state.colors.length;
          this._renderColorRows();
        }
      });
    });

    getEl("grad-format-selector")?.addEventListener("change", (e) => {
      this._state.formatType = e.target.value;
      this._processActiveCalculations();
    });
    getEl("bf-gradient-type")?.addEventListener("change", (e) => {
      this._state.colorSpace = e.target.value;
      this._processActiveCalculations();
    });
    getEl("bf-curve-geometry")?.addEventListener("change", (e) => {
      this._state.curveType = e.target.value;
      this._processActiveCalculations();
    });
    getEl("bf-prefix-suffix")?.addEventListener("input", (e) => {
      this._state.prefixSuffix = e.target.value;
      this._processActiveCalculations();
    });
    getEl("toggle-trim")?.addEventListener("change", (e) => {
      this._state.stripWhitespaceTags = e.target.checked;
      this._processActiveCalculations();
    });
    getEl("toggle-lowercase")?.addEventListener("change", (e) => {
      this._state.forceLowercase = e.target.checked;
      this._processActiveCalculations();
    });

    getEl("btn-preview-bg-dark")?.addEventListener("click", () => this._syncBackgroundUI("dark"));
    getEl("btn-preview-bg-light")?.addEventListener("click", () => this._syncBackgroundUI("light"));
    getEl("btn-preview-bg-trans")?.addEventListener("click", () => this._syncBackgroundUI("trans"));

    getEl("btn-preview-copy-shortcut")?.addEventListener("click", () => {
      const outputBox = getEl("bf-raw-output-box");
      if (outputBox) {
        outputBox.select();
        document.execCommand("copy");
        const btnShortcut = getEl("btn-preview-copy-shortcut");
        if (btnShortcut) {
          btnShortcut.innerHTML = "Copied Array Matrices! ✓";
          setTimeout(() => btnShortcut.innerHTML = "Export Encoded Array 📋", 1500);
        }
      }
    });

    const track = getEl("gradient-slider-track");
    const thumb = getEl("slider-thumb-marker");
    const updateSliderUI = (clientX) => {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      this._state.sliderValue = pct;
      if (thumb) thumb.style.left = `${pct * 100}%`;
      this._processActiveCalculations();
    };

    track?.addEventListener("mousedown", (e) => {
      updateSliderUI(e.clientX);
      const onMouseMove = (moveEvent) => updateSliderUI(moveEvent.clientX);
      const onMouseUp = () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
  },

  _applyCurveGeometry(ratio, type) {
    if (type === "ease-in") return ratio * ratio;
    if (type === "ease-out") return ratio * (2 - ratio);
    if (type === "bezier") return ratio * ratio * (3 - 2 * ratio);
    return ratio;
  },

  _interpolateColors(colorArray, steps, spaceType, curveType) {
    const parseHex = (h) => h.replace("#", "").match(/.{2}/g).map(x => parseInt(x, 16));
    
    const rgb2hsv = ([r, g, b]) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
      let h = 0, s = max === 0 ? 0 : d / max, v = max;
      if (max !== min) {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [h, s, v];
    };

    const hsv2rgb = ([h, s, v]) => {
      let r, g, b, i = Math.floor(h * 6), f = h * 6 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = p; break;
        case 5: r = v; g = p; b = q; break;
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    };

    const result = [];
    if (steps <= 1) return [parseHex(colorArray[0])];

    for (let i = 0; i < steps; i++) {
      let linearRatio = i / (steps - 1);
      let curvedRatio = this._applyCurveGeometry(linearRatio, curveType);

      const pivot = this._state.sliderValue;
      if (pivot !== 0.5) {
        if (curvedRatio < pivot) {
          curvedRatio = 0.5 * (curvedRatio / pivot);
        } else {
          curvedRatio = 0.5 + 0.5 * ((curvedRatio - pivot) / (1 - pivot));
        }
      }

      const segment = (colorArray.length - 1) * curvedRatio;
      const idx = Math.floor(segment);
      const ratio = segment - idx;

      if (idx >= colorArray.length - 1) {
        result.push(parseHex(colorArray[colorArray.length - 1]));
        continue;
      }

      const c1 = parseHex(colorArray[idx]);
      const c2 = parseHex(colorArray[idx + 1]);

      if (spaceType === "hsv") {
        const hsv1 = rgb2hsv(c1), hsv2 = rgb2hsv(c2);
        let h1 = hsv1[0], h2 = hsv2[0];
        if (Math.abs(h2 - h1) > 0.5) {
          if (h2 > h1) h1 += 1; else h2 += 1;
        }
        const h = (h1 + ratio * (h2 - h1)) % 1;
        const s = hsv1[1] + ratio * (hsv2[1] - hsv1[1]);
        const v = hsv1[2] + ratio * (hsv2[2] - hsv1[2]);
        result.push(hsv2rgb([h, s, v]));
      } else {
        const r = Math.round(c1[0] + ratio * (c2[0] - c1[0]));
        const g = Math.round(c1[1] + ratio * (c2[1] - c1[1]));
        const b = Math.round(c1[2] + ratio * (c2[2] - c1[2]));
        result.push([r, g, b]);
      }
    }
    return result;
  },

  _processActiveCalculations() {
    const inputEl = getEl("grad-text-string");
    const txt = inputEl ? inputEl.value : (this._state.text || "");
    this._state.text = txt; 

    const outputBox = getEl("bf-raw-output-box");
    const previewBlock = getEl("live-gradient-preview");

    if (!txt) {
      if (outputBox) outputBox.value = "";
      if (previewBlock) previewBlock.innerHTML = "";
      return;
    }

    const groupingFactor = this._state.charsPerColor || 1;
    const computedTotalSteps = Math.ceil(txt.length / groupingFactor);
    const stepRGBs = this._interpolateColors(this._state.colors, computedTotalSteps, this._state.colorSpace, this._state.curveType);
    
    let compiledStringCode = "";
    let htmlPreviewSpanBlock = "";

    let inlineStyles = "";
    inlineStyles += this._state.isBold ? "font-weight:900;" : "font-weight:normal;";
    inlineStyles += this._state.isItalic ? "font-style:italic;" : "font-style:normal;";
    
    if (this._state.isUnderline && this._state.isStrikethrough) {
      inlineStyles += "text-decoration:underline line-through;";
    } else if (this._state.isUnderline) {
      inlineStyles += "text-decoration:underline;";
    } else if (this._state.isStrikethrough) {
      inlineStyles += "text-decoration:line-through;";
    } else {
      inlineStyles += "text-decoration:none;";
    }

    let mcModifiers = "";
    if (this._state.isBold) mcModifiers += "&l";
    if (this._state.isItalic) mcModifiers += "&o";
    if (this._state.isUnderline) mcModifiers += "&n";
    if (this._state.isStrikethrough) mcModifiers += "&m";

    for (let i = 0; i < txt.length; i++) {
      const colorIndex = Math.min(Math.floor(i / groupingFactor), stepRGBs.length - 1);
      const rgb = stepRGBs[colorIndex];
      let curHex = rgb.map(x => x.toString(16).padStart(2, "0")).join("");
      curHex = this._state.forceLowercase ? curHex.toLowerCase() : curHex.toUpperCase();

      htmlPreviewSpanBlock += `<span style="color:#${curHex};${inlineStyles}">${txt[i] === " " ? "&nbsp;" : txt[i]}</span>`;

      if (this._state.stripWhitespaceTags && txt[i] === " ") {
        compiledStringCode += " ";
      } else {
        switch(this._state.formatType) {
          case "essentials":
            compiledStringCode += `&#${curHex}${mcModifiers}${txt[i]}`;
            break;
          case "legacy":
            const chars = curHex.split("");
            compiledStringCode += `&x&${chars[0]}&${chars[1]}&${chars[2]}&${chars[3]}&${chars[4]}&${chars[5]}${mcModifiers}${txt[i]}`;
            break;
          case "minimessage":
            let mmTag = `<#${curHex}>`;
            if (this._state.isBold) mmTag += "<b>";
            if (this._state.isItalic) mmTag += "<i>";
            if (this._state.isUnderline) mmTag += "<u>";
            if (this._state.isStrikethrough) mmTag += "<st>";
            mmTag += txt[i];
            if (this._state.isStrikethrough) mmTag += "</st>";
            if (this._state.isUnderline) mmTag += "</u>";
            if (this._state.isItalic) mmTag += "</i>";
            if (this._state.isBold) mmTag += "</b>";
            compiledStringCode += mmTag;
            break;
          case "cmi":
            compiledStringCode += `{#${curHex}}${mcModifiers}${txt[i]}`;
            break;
          default:
            compiledStringCode += `#${curHex}${mcModifiers}${txt[i]}`;
        }
      }
    }

    const wrapper = this._state.prefixSuffix;
    if (wrapper.includes("$t")) {
      compiledStringCode = wrapper.replace("$t", compiledStringCode);
    } else if (wrapper) {
      compiledStringCode = wrapper + " " + compiledStringCode;
    }

    if (outputBox) outputBox.value = compiledStringCode;
    if (previewBlock) previewBlock.innerHTML = htmlPreviewSpanBlock;
  }
};

export default academicModule;