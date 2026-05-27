"use strict";

/**
 * NEXUS_FLOW — Image Utility Studio
 * Complete module: Upload, Editor, Beautifier, ASCII, DevTools, Metadata
 */

const imageUtilityModule = {
  _state: {
    originalFile: null,
    originalImageData: null,
    img: null,
    tab: 'editor',
    filters: { brightness: 100, contrast: 100, saturation: 100, hue: 0, blur: 0, grayscale: 0, invert: 0 },
    beautify: { corners: 16, shadow: 20, glow: false, frame: 'none', padding: 32, theme: 'dark-studio', bg: 'gradient-1' },
    ascii: { density: 'medium', mono: false, charset: 'standard' },
    devSize: 512,
    splitView: false,
  },

  renderModule() {
    const container = document.getElementById('imageUtility-container');
    if (!container) return;
    container.innerHTML = this._html();
    this._bindEvents();
  },

  _html() {
    return `
<style>
  #iu-root { font-family: 'JetBrains Mono', 'Fira Code', monospace; background: #080c10; color: #c8d8e8; min-height: 700px; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; }
  #iu-root * { box-sizing: border-box; }
  #iu-header { display: flex; align-items: center; gap: 0; background: #0c1018; border-bottom: 1px solid #1a2535; padding: 0 20px; }
  #iu-header .logo { font-size: 0.75rem; font-weight: 700; color: #4af0b0; letter-spacing: 3px; padding: 14px 20px 14px 0; border-right: 1px solid #1a2535; margin-right: 16px; text-transform: uppercase; }
  .iu-tab { background: none; border: none; color: #5a7a9a; font-size: 0.72rem; font-family: inherit; padding: 14px 16px; cursor: pointer; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid transparent; transition: all 0.2s; }
  .iu-tab:hover { color: #c8d8e8; }
  .iu-tab.active { color: #4af0b0; border-bottom-color: #4af0b0; }
  #iu-body { display: flex; flex: 1; min-height: 620px; }
  #iu-sidebar { width: 260px; background: #0c1018; border-right: 1px solid #1a2535; overflow-y: auto; padding: 16px; flex-shrink: 0; }
  #iu-canvas-area { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #080c10; position: relative; padding: 20px; overflow: hidden; }
  .iu-section { margin-bottom: 20px; }
  .iu-section-title { font-size: 0.62rem; letter-spacing: 2px; color: #4af0b0; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid #1a2535; }
  .iu-btn { background: #111820; border: 1px solid #1e2d40; color: #c8d8e8; font-family: inherit; font-size: 0.7rem; padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: all 0.15s; width: 100%; margin-bottom: 6px; text-align: left; }
  .iu-btn:hover { background: #1a2535; border-color: #2a3d55; color: #fff; }
  .iu-btn.accent { background: #0d2416; border-color: #4af0b0; color: #4af0b0; }
  .iu-btn.accent:hover { background: #4af0b0; color: #080c10; }
  .iu-btn.danger { border-color: #f04a6a; color: #f04a6a; }
  .iu-btn.danger:hover { background: #f04a6a; color: #fff; }
  .iu-slider-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .iu-slider-row label { font-size: 0.65rem; color: #5a7a9a; width: 70px; flex-shrink: 0; }
  .iu-slider-row input[type=range] { flex: 1; -webkit-appearance: none; height: 3px; background: #1a2535; border-radius: 2px; outline: none; }
  .iu-slider-row input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #4af0b0; cursor: pointer; }
  .iu-slider-row span { font-size: 0.65rem; color: #4af0b0; width: 32px; text-align: right; }
  .iu-select { background: #111820; border: 1px solid #1e2d40; color: #c8d8e8; font-family: inherit; font-size: 0.7rem; padding: 7px 10px; border-radius: 6px; width: 100%; margin-bottom: 8px; }
  .iu-drop-zone { border: 2px dashed #1e2d40; border-radius: 10px; padding: 32px 16px; text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 10px; }
  .iu-drop-zone:hover, .iu-drop-zone.dragover { border-color: #4af0b0; background: #0d1c10; }
  .iu-drop-icon { font-size: 2rem; margin-bottom: 8px; }
  .iu-drop-text { font-size: 0.68rem; color: #5a7a9a; }
  .iu-canvas-wrapper { position: relative; max-width: 100%; max-height: 100%; }
  .iu-meta-bar { position: absolute; bottom: 0; left: 0; right: 0; background: rgba(8,12,16,0.9); padding: 8px 16px; display: flex; gap: 20px; font-size: 0.62rem; color: #5a7a9a; border-top: 1px solid #1a2535; }
  .iu-meta-item span { color: #4af0b0; }
  .iu-placeholder { text-align: center; color: #2a3d55; }
  .iu-placeholder .icon { font-size: 3rem; margin-bottom: 12px; }
  .iu-placeholder p { font-size: 0.72rem; }
  #iu-main-canvas { max-width: 100%; max-height: 520px; border-radius: 6px; display: none; }
  #iu-beautify-canvas { max-width: 100%; max-height: 520px; display: none; }
  #iu-ascii-output { font-family: 'Courier New', monospace; font-size: 6px; line-height: 1; white-space: pre; color: #4af0b0; background: #080c10; display: none; max-height: 500px; overflow: auto; padding: 10px; border-radius: 6px; }
  .iu-theme-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .iu-theme-btn { background: #111820; border: 1px solid #1e2d40; color: #c8d8e8; font-size: 0.62rem; padding: 8px 6px; border-radius: 6px; cursor: pointer; text-align: center; transition: all 0.15s; }
  .iu-theme-btn:hover { border-color: #4af0b0; }
  .iu-theme-btn.selected { border-color: #4af0b0; color: #4af0b0; background: #0d2416; }
  .iu-export-row { display: flex; gap: 6px; }
  .iu-export-row .iu-btn { flex: 1; text-align: center; }
  .iu-size-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; margin-bottom: 8px; }
  .iu-size-btn { background: #111820; border: 1px solid #1e2d40; color: #5a7a9a; font-size: 0.6rem; padding: 5px 4px; border-radius: 4px; cursor: pointer; text-align: center; transition: all 0.15s; }
  .iu-size-btn:hover { border-color: #4af0b0; color: #4af0b0; }
  .iu-size-btn.selected { border-color: #4af0b0; color: #4af0b0; background: #0d2416; }
  .iu-split-overlay { position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background: #4af0b0; pointer-events: none; }
  .iu-label { font-size: 0.62rem; color: #4af0b0; margin-bottom: 4px; display: block; }
  input[type=color] { width: 32px; height: 28px; border: 1px solid #1e2d40; border-radius: 4px; background: none; cursor: pointer; padding: 2px; }
  .iu-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .iu-toggle { position: relative; width: 32px; height: 18px; }
  .iu-toggle input { opacity: 0; width: 0; height: 0; }
  .iu-toggle-slider { position: absolute; inset: 0; background: #1a2535; border-radius: 18px; cursor: pointer; transition: 0.2s; }
  .iu-toggle-slider:before { content: ''; position: absolute; width: 12px; height: 12px; left: 3px; top: 3px; background: #5a7a9a; border-radius: 50%; transition: 0.2s; }
  .iu-toggle input:checked + .iu-toggle-slider { background: #0d2416; }
  .iu-toggle input:checked + .iu-toggle-slider:before { transform: translateX(14px); background: #4af0b0; }
  .iu-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .iu-info-card { background: #111820; border: 1px solid #1e2d40; border-radius: 8px; padding: 12px; }
  .iu-info-card .label { font-size: 0.6rem; color: #5a7a9a; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
  .iu-info-card .value { font-size: 0.8rem; color: #4af0b0; font-weight: 600; }
  .iu-progress-bar { height: 3px; background: #1a2535; border-radius: 2px; margin-top: 8px; overflow: hidden; }
  .iu-progress-fill { height: 100%; background: linear-gradient(90deg, #4af0b0, #0af); border-radius: 2px; transition: width 0.3s; }
  .iu-panel { display: none; }
  .iu-panel.active { display: block; }
</style>

<div id="iu-root">
  <div id="iu-header">
    <div class="logo">◈ NEXUS_FLOW</div>
    <button class="iu-tab active" data-tab="upload">↑ Upload</button>
    <button class="iu-tab" data-tab="editor">Editor</button>
    <button class="iu-tab" data-tab="beautify">Beautifier</button>
    <button class="iu-tab" data-tab="ascii">ASCII</button>
    <button class="iu-tab" data-tab="devtools">DevTools</button>
    <button class="iu-tab" data-tab="meta">Metadata</button>
  </div>
  <div id="iu-body">
    <div id="iu-sidebar">
      <!-- UPLOAD PANEL -->
      <div class="iu-panel active" id="panel-upload">
        <div class="iu-section">
          <div class="iu-section-title">Image Source</div>
          <div class="iu-drop-zone" id="iu-drop">
            <div class="iu-drop-icon">⬆</div>
            <div class="iu-drop-text">Drag & drop image here<br><br>or</div>
          </div>
          <button class="iu-btn accent" id="iu-browse-btn">Browse Files</button>
          <input type="file" id="iu-file-input" accept="image/*" style="display:none">
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Quick Actions</div>
          <button class="iu-btn" id="iu-reset-btn">✕ Clear Image</button>
        </div>
      </div>

      <!-- EDITOR PANEL -->
      <div class="iu-panel" id="panel-editor">
        <div class="iu-section">
          <div class="iu-section-title">Basic Adjustments</div>
          <div class="iu-slider-row"><label>Brightness</label><input type="range" id="f-brightness" min="0" max="200" value="100" step="1"><span id="v-brightness">100</span></div>
          <div class="iu-slider-row"><label>Contrast</label><input type="range" id="f-contrast" min="0" max="200" value="100" step="1"><span id="v-contrast">100</span></div>
          <div class="iu-slider-row"><label>Saturation</label><input type="range" id="f-saturation" min="0" max="200" value="100" step="1"><span id="v-saturation">100</span></div>
          <div class="iu-slider-row"><label>Hue Rotate</label><input type="range" id="f-hue" min="0" max="360" value="0" step="1"><span id="v-hue">0°</span></div>
          <div class="iu-slider-row"><label>Blur</label><input type="range" id="f-blur" min="0" max="20" value="0" step="0.5"><span id="v-blur">0</span></div>
          <div class="iu-slider-row"><label>Grayscale</label><input type="range" id="f-grayscale" min="0" max="100" value="0" step="1"><span id="v-grayscale">0%</span></div>
          <div class="iu-slider-row"><label>Invert</label><input type="range" id="f-invert" min="0" max="100" value="0" step="1"><span id="v-invert">0%</span></div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">View Mode</div>
          <div class="iu-row">
            <label class="iu-toggle"><input type="checkbox" id="iu-splitview"><span class="iu-toggle-slider"></span></label>
            <span style="font-size:0.68rem; color:#5a7a9a">Before / After Split</span>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Actions</div>
          <button class="iu-btn accent" id="iu-apply-btn">▶ Apply Filters</button>
          <button class="iu-btn" id="iu-reset-filters">↺ Reset All</button>
          <div class="iu-export-row" style="margin-top:6px">
            <button class="iu-btn" id="ed-export-png">PNG</button>
            <button class="iu-btn" id="ed-export-jpg">JPG</button>
            <button class="iu-btn" id="ed-export-webp">WEBP</button>
          </div>
        </div>
      </div>

      <!-- BEAUTIFY PANEL -->
      <div class="iu-panel" id="panel-beautify">
        <div class="iu-section">
          <div class="iu-section-title">Frame Style</div>
          <div class="iu-theme-grid" id="frame-options">
            <button class="iu-theme-btn selected" data-frame="none">None</button>
            <button class="iu-theme-btn" data-frame="browser">Browser</button>
            <button class="iu-theme-btn" data-frame="macos">macOS</button>
            <button class="iu-theme-btn" data-frame="terminal">Terminal</button>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Background Theme</div>
          <div class="iu-theme-grid" id="theme-options">
            <button class="iu-theme-btn selected" data-theme="dark-studio">Dark Studio</button>
            <button class="iu-theme-btn" data-theme="cyberpunk">Cyberpunk</button>
            <button class="iu-theme-btn" data-theme="neon">Neon</button>
            <button class="iu-theme-btn" data-theme="glass">Glass</button>
            <button class="iu-theme-btn" data-theme="minimal">Minimal</button>
            <button class="iu-theme-btn" data-theme="terminal-bg">Terminal</button>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Adjustments</div>
          <div class="iu-slider-row"><label>Padding</label><input type="range" id="b-padding" min="8" max="100" value="32" step="4"><span id="v-padding">32</span></div>
          <div class="iu-slider-row"><label>Corners</label><input type="range" id="b-corners" min="0" max="40" value="16" step="2"><span id="v-corners">16</span></div>
          <div class="iu-slider-row"><label>Shadow</label><input type="range" id="b-shadow" min="0" max="80" value="20" step="4"><span id="v-shadow">20</span></div>
          <div class="iu-row">
            <label class="iu-toggle"><input type="checkbox" id="b-glow"><span class="iu-toggle-slider"></span></label>
            <span style="font-size:0.68rem; color:#5a7a9a">Neon Glow</span>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Export</div>
          <div class="iu-export-row">
            <button class="iu-btn accent" id="beau-export-png">PNG</button>
            <button class="iu-btn" id="beau-export-jpg">JPG</button>
            <button class="iu-btn" id="beau-export-webp">WEBP</button>
          </div>
        </div>
      </div>

      <!-- ASCII PANEL -->
      <div class="iu-panel" id="panel-ascii">
        <div class="iu-section">
          <div class="iu-section-title">Character Set</div>
          <div class="iu-theme-grid" id="charset-options">
            <button class="iu-theme-btn selected" data-charset="standard">Standard</button>
            <button class="iu-theme-btn" data-charset="blocks">Unicode Blocks</button>
            <button class="iu-theme-btn" data-charset="dense">Dense</button>
            <button class="iu-theme-btn" data-charset="minimal">Minimal</button>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Options</div>
          <div class="iu-slider-row"><label>Width</label><input type="range" id="a-width" min="40" max="180" value="100" step="10"><span id="v-awidth">100</span></div>
          <div class="iu-row">
            <label class="iu-toggle"><input type="checkbox" id="a-mono"><span class="iu-toggle-slider"></span></label>
            <span style="font-size:0.68rem; color:#5a7a9a">Monochrome Mode</span>
          </div>
          <div class="iu-row">
            <label class="iu-toggle"><input type="checkbox" id="a-invert"><span class="iu-toggle-slider"></span></label>
            <span style="font-size:0.68rem; color:#5a7a9a">Invert Brightness</span>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Generate</div>
          <button class="iu-btn accent" id="ascii-gen-btn">▶ Generate ASCII Art</button>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Export</div>
          <button class="iu-btn" id="ascii-export-txt">↓ Export .TXT</button>
          <button class="iu-btn" id="ascii-export-html">↓ Export .HTML</button>
        </div>
      </div>

      <!-- DEVTOOLS PANEL -->
      <div class="iu-panel" id="panel-devtools">
        <div class="iu-section">
          <div class="iu-section-title">Export Size</div>
          <div class="iu-size-grid">
            <button class="iu-size-btn" data-size="16">16px</button>
            <button class="iu-size-btn" data-size="32">32px</button>
            <button class="iu-size-btn" data-size="64">64px</button>
            <button class="iu-size-btn" data-size="128">128px</button>
            <button class="iu-size-btn selected" data-size="512">512px</button>
            <button class="iu-size-btn" data-size="1024">1024px</button>
          </div>
          <button class="iu-btn accent" id="dev-export-asset" style="margin-top:8px">↓ Download Asset</button>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Web Assets</div>
          <button class="iu-btn" id="dev-favicon">↓ Favicon (ICO)</button>
          <button class="iu-btn" id="dev-og">↓ OG Preview (1200×630)</button>
          <button class="iu-btn" id="dev-social">↓ Social Square (1:1)</button>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Device Preview</div>
          <div class="iu-theme-grid" id="device-options">
            <button class="iu-theme-btn selected" data-device="none">Raw</button>
            <button class="iu-theme-btn" data-device="mobile">Mobile</button>
            <button class="iu-theme-btn" data-device="tablet">Tablet</button>
            <button class="iu-theme-btn" data-device="desktop">Desktop</button>
          </div>
        </div>
      </div>

      <!-- META PANEL -->
      <div class="iu-panel" id="panel-meta">
        <div class="iu-section">
          <div class="iu-section-title">File Information</div>
          <div id="meta-detail">
            <p style="font-size:0.68rem; color:#2a3d55; text-align:center; padding:20px 0;">No image loaded</p>
          </div>
        </div>
        <div class="iu-section">
          <div class="iu-section-title">Color Profile</div>
          <div id="meta-colors" style="display:flex; gap:6px; flex-wrap:wrap; margin-top:6px;"></div>
        </div>
      </div>
    </div>

    <div id="iu-canvas-area">
      <div id="iu-placeholder" class="iu-placeholder">
        <div class="icon">⬡</div>
        <p>Upload an image to begin</p>
      </div>
      <canvas id="iu-main-canvas"></canvas>
      <canvas id="iu-beautify-canvas"></canvas>
      <pre id="iu-ascii-output"></pre>
      <div id="iu-split-line" class="iu-split-overlay" style="display:none"></div>
      <div class="iu-meta-bar" id="iu-meta-bar" style="display:none">
        <div class="iu-meta-item">Dims: <span id="meta-dims">—</span></div>
        <div class="iu-meta-item">Size: <span id="meta-size">—</span></div>
        <div class="iu-meta-item">Type: <span id="meta-type">—</span></div>
        <div class="iu-meta-item">Ratio: <span id="meta-ratio">—</span></div>
      </div>
    </div>
  </div>
</div>`;
  },

  _bindEvents() {
    const s = this._state;

    // Tab switching
    document.querySelectorAll('.iu-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.iu-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.iu-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        s.tab = btn.dataset.tab;
        const panel = document.getElementById('panel-' + btn.dataset.tab);
        if (panel) panel.classList.add('active');
        this._renderCurrentTab();
      });
    });

    // Upload
    const dropZone = document.getElementById('iu-drop');
    const fileInput = document.getElementById('iu-file-input');

    document.getElementById('iu-browse-btn').onclick = () => fileInput.click();
    fileInput.onchange = (e) => { if (e.target.files[0]) this._loadImage(e.target.files[0]); };

    dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      if (e.dataTransfer.files[0]) this._loadImage(e.dataTransfer.files[0]);
    });
    dropZone.onclick = () => fileInput.click();

    document.getElementById('iu-reset-btn').onclick = () => this._clearImage();

    // Editor sliders
    ['brightness','contrast','saturation','hue','blur','grayscale','invert'].forEach(name => {
      const el = document.getElementById('f-' + name);
      if (!el) return;
      el.addEventListener('input', () => {
        s.filters[name] = parseFloat(el.value);
        const v = document.getElementById('v-' + name);
        if (v) {
          if (name === 'hue') v.textContent = el.value + '°';
          else if (name === 'blur') v.textContent = el.value;
          else if (name === 'grayscale' || name === 'invert') v.textContent = el.value + '%';
          else v.textContent = el.value;
        }
        if (s.img) this._renderEditor();
      });
    });

    document.getElementById('iu-apply-btn').onclick = () => { if (s.img) this._renderEditor(); };
    document.getElementById('iu-reset-filters').onclick = () => {
      s.filters = { brightness: 100, contrast: 100, saturation: 100, hue: 0, blur: 0, grayscale: 0, invert: 0 };
      ['brightness','contrast','saturation','hue','blur','grayscale','invert'].forEach(n => {
        const el = document.getElementById('f-' + n);
        const dv = { brightness:100, contrast:100, saturation:100, hue:0, blur:0, grayscale:0, invert:0 };
        if (el) { el.value = dv[n]; const v = document.getElementById('v-' + n); if(v) v.textContent = dv[n] + (n==='hue'?'°': n==='grayscale'||n==='invert'?'%':''); }
      });
      if (s.img) this._renderEditor();
    };

    document.getElementById('iu-splitview').onchange = (e) => {
      s.splitView = e.target.checked;
      const line = document.getElementById('iu-split-line');
      if (line) line.style.display = s.splitView ? 'block' : 'none';
      if (s.img) this._renderEditor();
    };

    // Export editor
    ['png','jpg','webp'].forEach(fmt => {
      const btn = document.getElementById('ed-export-' + fmt);
      if (btn) btn.onclick = () => this._exportCanvas('iu-main-canvas', fmt);
    });

    // Beautify sliders
    ['padding','corners','shadow'].forEach(n => {
      const el = document.getElementById('b-' + n);
      if (!el) return;
      el.addEventListener('input', () => {
        s.beautify[n] = parseInt(el.value);
        const v = document.getElementById('v-' + n);
        if (v) v.textContent = el.value;
        if (s.img) this._renderBeautify();
      });
    });

    document.getElementById('b-glow').onchange = (e) => {
      s.beautify.glow = e.target.checked;
      if (s.img) this._renderBeautify();
    };

    document.querySelectorAll('#frame-options .iu-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#frame-options .iu-theme-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        s.beautify.frame = btn.dataset.frame;
        if (s.img) this._renderBeautify();
      });
    });

    document.querySelectorAll('#theme-options .iu-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#theme-options .iu-theme-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        s.beautify.theme = btn.dataset.theme;
        if (s.img) this._renderBeautify();
      });
    });

    ['png','jpg','webp'].forEach(fmt => {
      const btn = document.getElementById('beau-export-' + fmt);
      if (btn) btn.onclick = () => this._exportCanvas('iu-beautify-canvas', fmt);
    });

    // ASCII
    document.querySelectorAll('#charset-options .iu-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#charset-options .iu-theme-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        s.ascii.charset = btn.dataset.charset;
      });
    });

    const awidth = document.getElementById('a-width');
    if (awidth) awidth.addEventListener('input', () => { document.getElementById('v-awidth').textContent = awidth.value; });

    document.getElementById('ascii-gen-btn').onclick = () => { if (s.img) this._generateAscii(); };
    document.getElementById('ascii-export-txt').onclick = () => this._exportAsciiTxt();
    document.getElementById('ascii-export-html').onclick = () => this._exportAsciiHtml();

    // DevTools sizes
    document.querySelectorAll('.iu-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.iu-size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        s.devSize = parseInt(btn.dataset.size);
      });
    });

    document.getElementById('dev-export-asset').onclick = () => this._exportResized(s.devSize, s.devSize);
    document.getElementById('dev-favicon').onclick = () => this._exportResized(32, 32, 'favicon');
    document.getElementById('dev-og').onclick = () => this._exportResized(1200, 630, 'og-image');
    document.getElementById('dev-social').onclick = () => this._exportResized(1080, 1080, 'social');

    document.querySelectorAll('#device-options .iu-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#device-options .iu-theme-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        if (s.img) this._renderDevPreview(btn.dataset.device);
      });
    });
  },

  _loadImage(file) {
    const s = this._state;
    s.originalFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        s.img = img;
        const canvas = document.getElementById('iu-main-canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0);
        s.originalImageData = canvas.getContext('2d').getImageData(0, 0, img.width, img.height);

        // Show canvas
        document.getElementById('iu-placeholder').style.display = 'none';
        document.getElementById('iu-meta-bar').style.display = 'flex';

        // Update meta bar
        const gcd = (a, b) => b ? gcd(b, a % b) : a;
        const g = gcd(img.width, img.height);
        document.getElementById('meta-dims').textContent = img.width + '×' + img.height;
        document.getElementById('meta-size').textContent = (file.size / 1024).toFixed(1) + ' KB';
        document.getElementById('meta-type').textContent = file.type.split('/')[1].toUpperCase();
        document.getElementById('meta-ratio').textContent = (img.width/g) + ':' + (img.height/g);

        // Switch to editor
        document.querySelectorAll('.iu-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.iu-panel').forEach(p => p.classList.remove('active'));
        const edTab = document.querySelector('[data-tab="editor"]');
        if (edTab) edTab.classList.add('active');
        document.getElementById('panel-editor').classList.add('active');
        s.tab = 'editor';

        this._renderEditor();
        this._updateMetaPanel(file, img);
        this._extractColors(img);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  _renderEditor() {
    const s = this._state;
    if (!s.img) return;
    const canvas = document.getElementById('iu-main-canvas');
    canvas.style.display = 'block';
    document.getElementById('iu-beautify-canvas').style.display = 'none';
    document.getElementById('iu-ascii-output').style.display = 'none';

    // Always reset canvas dimensions to force a clean state
    canvas.width = s.img.width;
    canvas.height = s.img.height;

    const ctx = canvas.getContext('2d');
    const f = s.filters;
    const filterStr = `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%) hue-rotate(${f.hue}deg) blur(${f.blur}px) grayscale(${f.grayscale}%) invert(${f.invert}%)`;

    if (s.splitView) {
      // Left half — original (no filter)
      ctx.save();
      ctx.filter = 'none';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(s.img, 0, 0);
      ctx.restore();

      // Right half — filtered, clipped
      ctx.save();
      ctx.beginPath();
      ctx.rect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
      ctx.clip();
      ctx.filter = filterStr;
      ctx.drawImage(s.img, 0, 0);
      ctx.restore();

      // Divider line
      ctx.save();
      ctx.strokeStyle = '#4af0b0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.restore();
    } else {
      // Set filter BEFORE drawImage — this is the correct order
      ctx.filter = filterStr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(s.img, 0, 0);
      ctx.filter = 'none'; // reset after draw
    }
  },

  _renderBeautify() {
    const s = this._state;
    if (!s.img) return;
    const mainCanvas = document.getElementById('iu-main-canvas');
    mainCanvas.style.display = 'none';
    document.getElementById('iu-ascii-output').style.display = 'none';
    const bCanvas = document.getElementById('iu-beautify-canvas');
    bCanvas.style.display = 'block';

    const b = s.beautify;
    const frameH = (b.frame !== 'none') ? 32 : 0;
    const W = s.img.width + b.padding * 2;
    const H = s.img.height + b.padding * 2 + frameH;
    bCanvas.width = W;
    bCanvas.height = H;
    const ctx = bCanvas.getContext('2d');

    // Background themes
    const themes = {
      'dark-studio': () => { ctx.fillStyle = '#0c1018'; ctx.fillRect(0, 0, W, H); },
      'cyberpunk': () => {
        const grd = ctx.createLinearGradient(0,0,W,H);
        grd.addColorStop(0, '#0d0221'); grd.addColorStop(0.5, '#190336'); grd.addColorStop(1, '#0d1a2e');
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#ff2079'; ctx.lineWidth = 1; ctx.globalAlpha = 0.15;
        for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
        ctx.globalAlpha = 1;
      },
      'neon': () => {
        ctx.fillStyle = '#050510'; ctx.fillRect(0, 0, W, H);
        ctx.shadowColor = '#4af0b0'; ctx.shadowBlur = 40;
        ctx.strokeStyle = '#4af0b0'; ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, W - 20, H - 20);
        ctx.shadowBlur = 0;
      },
      'glass': () => {
        const grd = ctx.createLinearGradient(0, 0, W, H);
        grd.addColorStop(0, 'rgba(255,255,255,0.15)'); grd.addColorStop(1, 'rgba(200,220,255,0.08)');
        ctx.fillStyle = '#d0e8f8'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = grd; ctx.fillRect(0, 0, W, H);
      },
      'minimal': () => { ctx.fillStyle = '#f5f5f5'; ctx.fillRect(0, 0, W, H); },
      'terminal-bg': () => {
        ctx.fillStyle = '#0d1117'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#1a2535';
        for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
      },
    };
    (themes[b.theme] || themes['dark-studio'])();

    // Frame
    if (b.frame === 'browser' || b.frame === 'macos') {
      ctx.fillStyle = b.theme === 'minimal' ? '#e8e8e8' : '#1a2535';
      this._roundRect(ctx, b.padding - 4, b.padding - 4, s.img.width + 8, frameH + 4, 6, true, false);
      const dotColors = ['#ff5f57', '#febc2e', '#28c840'];
      dotColors.forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(b.padding + 8 + i * 16, b.padding + frameH / 2, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      if (b.frame === 'browser') {
        ctx.fillStyle = b.theme === 'minimal' ? '#fff' : '#111820';
        this._roundRect(ctx, b.padding + 56, b.padding + 6, s.img.width - 64, frameH - 12, 4, true, false);
      }
    } else if (b.frame === 'terminal') {
      ctx.fillStyle = '#0c1018';
      ctx.fillRect(b.padding - 4, b.padding - 4, s.img.width + 8, frameH + 4);
      ctx.fillStyle = '#4af0b0';
      ctx.font = '11px monospace';
      ctx.fillText('▸ terminal — zsh', b.padding + 8, b.padding + frameH - 8);
    }

    // Shadow
    if (b.shadow > 0) {
      ctx.shadowColor = 'rgba(0,0,0,0.7)';
      ctx.shadowBlur = b.shadow;
      ctx.shadowOffsetX = b.shadow / 4;
      ctx.shadowOffsetY = b.shadow / 4;
    }

    // Glow
    if (b.glow) {
      ctx.shadowColor = '#4af0b0';
      ctx.shadowBlur = 30;
    }

    // Draw image
    ctx.save();
    ctx.shadowColor = b.shadow > 0 ? 'rgba(0,0,0,0.7)' : 'transparent';
    ctx.shadowBlur = b.shadow;
    ctx.shadowOffsetX = b.shadow / 4;
    ctx.shadowOffsetY = b.shadow / 4;
    if (b.glow) { ctx.shadowColor = '#4af0b0'; ctx.shadowBlur = 30; }
    if (b.corners > 0) {
      ctx.save();
      this._roundRect(ctx, b.padding, b.padding + frameH, s.img.width, s.img.height, b.corners, false, true);
      ctx.clip();
      ctx.drawImage(s.img, b.padding, b.padding + frameH);
      ctx.restore();
    } else {
      ctx.drawImage(s.img, b.padding, b.padding + frameH);
    }
    ctx.restore();
    ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0;
  },

  _roundRect(ctx, x, y, w, h, r, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  },

  _generateAscii() {
    const s = this._state;
    if (!s.img) return;
    const out = document.getElementById('iu-ascii-output');
    const charsets = {
      standard: ' .:-=+*#%@',
      blocks: ' ░▒▓█',
      dense: ' `.-\':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@',
      minimal: ' .:I',
    };
    const chars = charsets[s.ascii.charset] || charsets.standard;
    const width = parseInt(document.getElementById('a-width').value);
    const mono = document.getElementById('a-mono').checked;
    const invertMap = document.getElementById('a-invert').checked;

    const tmpCanvas = document.createElement('canvas');
    const aspect = 0.55;
    const height = Math.floor(width * (s.img.height / s.img.width) * aspect);
    tmpCanvas.width = width;
    tmpCanvas.height = height;
    const ctx = tmpCanvas.getContext('2d');
    ctx.drawImage(s.img, 0, 0, width, height);
    const data = ctx.getImageData(0, 0, width, height).data;

    let result = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const brightness = (data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114) / 255;
        let mapped = invertMap ? 1 - brightness : brightness;
        const charIdx = Math.floor(mapped * (chars.length - 1));
        result += chars[charIdx];
      }
      result += '\n';
    }

    document.getElementById('iu-main-canvas').style.display = 'none';
    document.getElementById('iu-beautify-canvas').style.display = 'none';
    out.style.display = 'block';
    out.style.color = mono ? '#888' : '#4af0b0';
    out.textContent = result;
  },

  _exportAsciiTxt() {
    const out = document.getElementById('iu-ascii-output');
    if (!out.textContent) return;
    const blob = new Blob([out.textContent], { type: 'text/plain' });
    this._download(URL.createObjectURL(blob), 'ascii-art.txt');
  },

  _exportAsciiHtml() {
    const out = document.getElementById('iu-ascii-output');
    if (!out.textContent) return;
    const html = `<!DOCTYPE html><html><head><style>body{background:#080c10;margin:0;padding:20px;} pre{font-family:monospace;font-size:6px;line-height:1;color:#4af0b0;white-space:pre;}</style></head><body><pre>${out.textContent.replace(/</g,'&lt;')}</pre></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    this._download(URL.createObjectURL(blob), 'ascii-art.html');
  },

  _exportCanvas(canvasId, format) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !this._state.img) return;
    const mime = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
    const q = format === 'jpg' ? 0.9 : undefined;
    canvas.toBlob(blob => this._download(URL.createObjectURL(blob), 'image.' + format), mime, q);
  },

  _exportResized(w, h, name) {
    if (!this._state.img) return;
    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    const ctx = tmp.getContext('2d');
    if (w === h) {
      const size = Math.min(this._state.img.width, this._state.img.height);
      const sx = (this._state.img.width - size) / 2;
      const sy = (this._state.img.height - size) / 2;
      ctx.drawImage(this._state.img, sx, sy, size, size, 0, 0, w, h);
    } else {
      ctx.drawImage(this._state.img, 0, 0, w, h);
    }
    tmp.toBlob(blob => this._download(URL.createObjectURL(blob), (name || 'asset-' + w + 'x' + h) + '.png'));
  },

  _renderDevPreview(device) {
    const s = this._state;
    if (!s.img) return;
    const canvas = document.getElementById('iu-main-canvas');
    canvas.style.display = 'block';
    document.getElementById('iu-beautify-canvas').style.display = 'none';
    document.getElementById('iu-ascii-output').style.display = 'none';

    const frames = {
      none: { W: s.img.width, H: s.img.height, ix: 0, iy: 0, iw: s.img.width, ih: s.img.height },
      mobile: { W: 320, H: 640, ix: 10, iy: 50, iw: 300, ih: 530 },
      tablet: { W: 600, H: 800, ix: 20, iy: 60, iw: 560, ih: 680 },
      desktop: { W: 900, H: 540, ix: 30, iy: 40, iw: 840, ih: 460 },
    };
    const fr = frames[device] || frames.none;
    canvas.width = fr.W; canvas.height = fr.H;
    const ctx = canvas.getContext('2d');
    ctx.filter = 'none';

    if (device !== 'none') {
      ctx.fillStyle = '#1a2535';
      this._roundRect(ctx, 0, 0, fr.W, fr.H, 16, true, false);
      ctx.fillStyle = '#080c10';
      ctx.fillRect(fr.ix, fr.iy, fr.iw, fr.ih);
    }

    ctx.drawImage(s.img, fr.ix, fr.iy, fr.iw, fr.ih);
  },

  _updateMetaPanel(file, img) {
    const container = document.getElementById('meta-detail');
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const g = gcd(img.width, img.height);
    const dpi = 72;
    const items = [
      { label: 'Width', value: img.width + ' px' },
      { label: 'Height', value: img.height + ' px' },
      { label: 'Aspect Ratio', value: (img.width/g) + ' : ' + (img.height/g) },
      { label: 'File Size', value: (file.size / 1024).toFixed(1) + ' KB' },
      { label: 'File Type', value: file.type },
      { label: 'DPI (est.)', value: dpi },
      { label: 'Color Depth', value: '32-bit RGBA' },
      { label: 'Megapixels', value: ((img.width * img.height) / 1e6).toFixed(2) + ' MP' },
    ];
    container.innerHTML = '<div class="iu-info-grid">' + items.map(i => `<div class="iu-info-card"><div class="label">${i.label}</div><div class="value">${i.value}</div></div>`).join('') + '</div>';
  },

  _extractColors(img) {
    const container = document.getElementById('meta-colors');
    const tmp = document.createElement('canvas');
    tmp.width = 50; tmp.height = 50;
    const ctx = tmp.getContext('2d');
    ctx.drawImage(img, 0, 0, 50, 50);
    const data = ctx.getImageData(0, 0, 50, 50).data;
    const colorMap = {};
    for (let i = 0; i < data.length; i += 4 * 8) {
      const r = Math.round(data[i] / 32) * 32;
      const g = Math.round(data[i+1] / 32) * 32;
      const b = Math.round(data[i+2] / 32) * 32;
      const key = `rgb(${r},${g},${b})`;
      colorMap[key] = (colorMap[key] || 0) + 1;
    }
    const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const total = sorted.reduce((s, c) => s + c[1], 0);
    container.innerHTML = sorted.map(([color, count]) => {
      const pct = Math.round(count / total * 100);
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px">
        <div style="width:28px;height:28px;border-radius:4px;background:${color};border:1px solid rgba(255,255,255,0.1)"></div>
        <span style="font-size:0.55rem;color:#5a7a9a">${pct}%</span>
      </div>`;
    }).join('');
  },

  _clearImage() {
    const s = this._state;
    s.img = null; s.originalFile = null; s.originalImageData = null;
    const c1 = document.getElementById('iu-main-canvas');
    const c2 = document.getElementById('iu-beautify-canvas');
    const asc = document.getElementById('iu-ascii-output');
    if (c1) { c1.style.display = 'none'; const ctx = c1.getContext('2d'); ctx.clearRect(0,0,c1.width,c1.height); }
    if (c2) { c2.style.display = 'none'; }
    if (asc) { asc.style.display = 'none'; asc.textContent = ''; }
    document.getElementById('iu-placeholder').style.display = 'block';
    document.getElementById('iu-meta-bar').style.display = 'none';
  },

  _renderCurrentTab() {
    const s = this._state;
    if (!s.img) return;
    if (s.tab === 'editor') this._renderEditor();
    else if (s.tab === 'beautify') this._renderBeautify();
  },

  _download(url, name) {
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  },

  destroy() {},
};

export default imageUtilityModule;