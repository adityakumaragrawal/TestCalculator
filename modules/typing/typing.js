/**
 * ASSISTWE Cyber Typing Engine v4.2 — High Performance Premium Terminal Sandbox
 * Architecture: Added Bottom Quick-Reset Control, Unlocked Audio Synths, & Line-Wrap Fluidity
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const typingModule = {
  _state: {
    textPools: {
      easy: [
        "the quick brown fox jumps over the lazy dog",
        "web design requires clear layout structures and balanced asset configurations",
        "keep state variables immutable to prevent volatile memory leak distribution"
      ],
      medium: [
        "The integration of asynchronous operations within microservice clusters requires a detailed implementation of message brokers.",
        "High-performance client-side rendering engines depend heavily on hardware acceleration matrices and optimal thread distribution profiles."
      ],
      hard: [
        "Error: [Line 42] Failed to compile matrix transformation pipeline; reference pointer 0x7FFA2B41 is null or undefined parsing configurations.",
        "System.log('Initialize secure handshake sequence... ID: #8849-ZX'); crypto.verifyToken(saltString, hashMatrix[i]);"
      ],
      insane: [
        "function computeEngine(matrix, delta) { return matrix.map((row, i) => row.filter(val => val !== null).reduce((a, b) => a * b + (delta ** 2), 0)); }",
        "const querySelector = async (req, res) => { const { authorization } = req.headers; if(!authorization) throw new Error('Unassigned Security Tier'); };"
      ],
      code: [
        "import { getEl } from '../../utils/helpers.js';",
        "const styleEl = document.createElement('style'); styleEl.id = 'ax-typing-styles';",
        "ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.filter = filterString; ctx.drawImage(img, offsetX, offsetY);"
      ]
    },
    
    selectedMode: "medium",
    selectedDuration: 30,
    timeLeft: 30,
    isActive: false,
    isFocusMode: false,
    timerInterval: null,

    // Audio Unlocking Anchor
    audioCtx: null,

    currentText: "",
    inputIndex: 0,
    
    totalKeystrokes: 0,
    correctChars: 0,
    incorrectChars: 0,
    backspaceCount: 0,
    missedChars: 0,
    
    currentWpm: 0,
    averageWpm: 0,
    peakWpm: 0,
    
    wpmHistory: [],
    streak: 0,
    bestStreak: 0,

    opponents: [
      { name: "Alpha_Bot 🤖", speed: 64, progress: 0 },
      { name: "Cyber_Stryder ⚡", speed: 81, progress: 0 },
      { name: "You 👤", speed: 0, progress: 0 }
    ]
  },

  _injectGlobalStyles() {
    if (document.getElementById("ax-typing-styles")) return;
    
    const styleEl = document.createElement("style");
    styleEl.id = "ax-typing-styles";
    styleEl.innerHTML = `
      .ax-typing-layout {
        display: flex; flex-direction: column; gap: 20px; width: 100%; box-sizing: border-box;
      }
      .typing-main-workspace {
        display: grid; grid-template-columns: 1fr 320px; gap: 20px; width: 100%; align-items: start;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      @media(max-width: 1024px) { .typing-main-workspace { grid-template-columns: 1fr; } }

      /* Immersive Fullscreen Focus Mode */
      .ax-typing-layout.focus-engaged .typing-main-workspace {
        grid-template-columns: 1fr; max-width: 900px; margin: 20px auto;
      }
      .ax-typing-layout.focus-engaged .right-sidebar-analytics,
      .ax-typing-layout.focus-engaged .v-keyboard-matrix-parent,
      .ax-typing-layout.focus-engaged .typing-control-topbar {
        display: none !important;
      }
      .ax-typing-layout.focus-engaged .typing-terminal-box {
        padding: 45px 35px; background: #03060c; border: 1px solid rgba(84, 218, 244, 0.15);
        box-shadow: 0 0 50px rgba(84, 218, 244, 0.03);
      }
      .ax-typing-layout.focus-engaged .typing-scroller-view {
        font-size: 1.45rem; line-height: 1.8;
      }

      /* Control Ribbon Adjustments */
      .typing-control-topbar {
        display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;
        background: rgba(13, 20, 35, 0.4); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 8px;
      }
      .settings-bar-left { display: flex; align-items: center; gap: 16px; }

      /* Scoreboard Elements Refined */
      .typing-stats-row {
        display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; width: 100%;
      }
      @media(max-width: 640px) { .typing-stats-row { grid-template-columns: repeat(2, 1fr); } }
      
      .typer-stat-node {
        background: rgba(13, 20, 35, 0.5); border: 1px solid rgba(255, 255, 255, 0.03);
        border-radius: 8px; padding: 12px 16px; display: flex; flex-direction: column; gap: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .typer-stat-lbl { font-size: 0.68rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
      .typer-stat-val { font-family: monospace; font-size: 1.45rem; font-weight: 800; color: #54daf4; }

      /* Clean Typography Terminal Area */
      .typing-terminal-box {
        background: rgba(6, 10, 18, 0.6); border: 1px solid rgba(255, 255, 255, 0.04); border-radius: 12px;
        padding: 26px; position: relative; box-shadow: inset 0 4px 16px rgba(0,0,0,0.8), 0 8px 24px rgba(0,0,0,0.2);
        cursor: text; min-height: 150px; display: flex; align-items: center;
      }
      .typing-scroller-view {
        width: 100%; font-family: 'Courier New', monospace; font-size: 1.25rem;
        line-height: 1.7; letter-spacing: 0.02em; white-space: pre-wrap; word-break: break-word; user-select: none;
      }

      /* Focus Escape Button Overlay */
      .focus-exit-anchor {
        position: absolute; top: -45px; right: 0; background: rgba(255, 51, 102, 0.1);
        border: 1px solid rgba(255, 51, 102, 0.2); color: #ff3366; padding: 6px 14px;
        font-size: 0.72rem; font-weight: 700; border-radius: 6px; cursor: pointer; display: none;
        transition: all 0.2s;
      }
      .focus-exit-anchor:hover { background: #ff3366; color: #fff; box-shadow: 0 0 12px rgba(255,51,102,0.4); }
      .ax-typing-layout.focus-engaged .focus-exit-anchor { display: block; }

      /* RGB Laser Character System */
      .tc-unvisited { color: #4b5563; }
      .tc-correct {
        color: #00ffcc; text-shadow: 0 0 12px rgba(0, 255, 204, 0.5);
        animation: active-rgb-flow 3s infinite alternate ease-in-out;
      }
      .tc-incorrect { 
        color: #ff3366; background: rgba(255, 51, 102, 0.15); 
        text-shadow: 0 0 8px rgba(255, 51, 102, 0.4); text-decoration: underline; border-radius: 3px;
      }
      .tc-current { 
        color: #fff; background: rgba(84, 218, 244, 0.22); 
        border-left: 2px solid #54daf4; animation: dynamic-caret 0.6s infinite alternate; 
      }

      /* Blueprint Mechanical Keyboard Map */
      .v-keyboard-matrix {
        display: grid; grid-template-columns: repeat(10, 1fr); gap: 5px;
        background: rgba(4, 6, 12, 0.4); padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.02);
      }
      .v-key-cap {
        background: #0f172a; border: 1px solid #1e293b; color: #475569; font-family: monospace;
        font-size: 0.75rem; font-weight: 700; padding: 8px 0; text-align: center; border-radius: 5px; transition: all 0.08s ease;
      }
      .v-key-cap.active-press {
        background: #54daf4 !important; color: #020617 !important;
        box-shadow: 0 0 12px rgba(84, 218, 244, 0.6); transform: scale(0.9);
      }

      /* Bottom Quick-Reset Button Blueprint */
      .bottom-reset-matrix-btn {
        width: 100%; padding: 12px; font-family: monospace; font-size: 0.8rem; font-weight: 700;
        letter-spacing: 0.08em; text-transform: uppercase; color: #ff3366; background: rgba(255, 51, 102, 0.05);
        border: 1px dashed rgba(255, 51, 102, 0.25); border-radius: 8px; cursor: pointer; transition: all 0.2s ease-in-out;
        display: flex; align-items: center; justify-content: center; gap: 8px;
      }
      .bottom-reset-matrix-btn:hover {
        background: rgba(255, 51, 102, 0.12); border-color: rgba(255, 51, 102, 0.5);
        color: #fff; box-shadow: 0 0 16px rgba(255, 51, 102, 0.15);
      }
      .bottom-reset-matrix-btn:active { transform: scale(0.99); }

      /* Racing Track Infrastructure */
      .lanes-wrapper { display: flex; flex-direction: column; gap: 12px; }
      .race-lane { background: rgba(13, 20, 35, 0.4); border-radius: 8px; padding: 10px; border: 1px solid rgba(255,255,255,0.02); }
      .race-runner-meta { display: flex; justify-content: space-between; font-size: 0.7rem; margin-bottom: 6px; color: #94a3b8; font-weight: 600; }
      .race-progress-track { width: 100%; height: 4px; background: #1e293b; border-radius: 2px; overflow: hidden; }
      .race-progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #1d4ed8, #54daf4); transition: width 0.15s ease; }

      /* Modals Overlays */
      .results-overlay-shell {
        position: absolute; inset: 0; background: rgba(4, 7, 13, 0.98); z-index: 20;
        display: flex; flex-direction: column; padding: 26px; border-radius: 12px;
        animation: modal-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
      .results-analytics-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 14px; }
      .r-card { background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.03); padding: 12px; border-radius: 8px; text-align: center; }
      .r-val { font-size: 1.45rem; font-weight: 800; color: #00ffcc; font-family: monospace; }
      .r-lbl { font-size: 0.65rem; color: #64748b; text-transform: uppercase; margin-top: 2px; font-weight: 600; }

      @keyframes dynamic-caret { from { background-color: rgba(84, 218, 244, 0.4); } to { background-color: rgba(84, 218, 244, 0.02); } }
      @keyframes modal-slide-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes active-rgb-flow { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(15deg); } }
    `;
    document.head.appendChild(styleEl);
  },

  _initAudioContext() {
    if (!this._state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this._state.audioCtx = new AudioContext();
      }
    }
    if (this._state.audioCtx && this._state.audioCtx.state === "suspended") {
      this._state.audioCtx.resume();
    }
  },

  _triggerAudioSynth(type) {
    this._initAudioContext();
    if (!this._state.audioCtx || this._state.audioCtx.state === "suspended") return;

    try {
      const ctx = this._state.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(580, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start(); osc.stop(ctx.currentTime + 0.05);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(125, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start(); osc.stop(ctx.currentTime + 0.1);
      } else if (type === "complete") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
      }
    } catch(e) { console.warn("Synth system caught exception:", e); }
  },

  renderModule() {
    const container = getEl("typing-container");
    if (!container) return;

    this._injectGlobalStyles();
    this._selectActiveStringSource();

    container.innerHTML = `
      <div id="typing-lifecycle-root" class="ax-typing-layout">
        
        <div class="typing-control-topbar" style="padding: 12px 18px;">
          <div class="settings-bar-left">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="ax-field-label" style="margin:0; font-size:0.72rem;">DIFFICULTY:</span>
              <select id="t-config-mode" class="ax-select-element-core" style="padding: 5px 26px 5px 10px; font-size:0.75rem; min-width:140px;">
                <option value="easy">Easy</option>
                <option value="medium" selected>Medium</option>
                <option value="hard">Hard Mode</option>
                <option value="insane">Insane Mode</option>
                <option value="code">Code Mode</option>
              </select>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <span class="ax-field-label" style="margin:0; font-size:0.72rem;">DURATION:</span>
              <select id="t-config-time" class="ax-select-element-core" style="padding: 5px 26px 5px 10px; font-size:0.75rem; min-width:90px;">
                <option value="15">15s Blitz</option>
                <option value="30" selected>30s Frame</option>
                <option value="60">60s Sprint</option>
              </select>
            </div>
          </div>

          <div style="display:flex; gap:12px;">
            <button id="t-focus-toggle" class="ax-action-btn-primary" style="padding: 6px 16px; font-size:0.72rem; font-weight:700; background:rgba(84,218,244,0.06); border-color:rgba(84,218,244,0.2); color:#54daf4;">FOCUS MODE 👁</button>
            <button id="t-btn-reset" class="ax-action-btn-primary" style="padding: 6px 16px; font-size:0.72rem; background:#1e293b; border-color:#334155;">FLUSH STREAM 🔄</button>
          </div>
        </div>

        <div class="typing-stats-row">
          <div class="typer-stat-node"><span class="typer-stat-lbl">Live WPM</span><div id="lm-wpm" class="typer-stat-val">0</div></div>
          <div class="typer-stat-node"><span class="typer-stat-lbl">Peak WPM</span><div id="lm-peak-wpm" class="typer-stat-val" style="color:#00ffcc;">0</div></div>
          <div class="typer-stat-node"><span class="typer-stat-lbl">Accuracy</span><div id="lm-acc" class="typer-stat-val">100%</div></div>
          <div class="typer-stat-node"><span class="typer-stat-lbl">Time Left</span><div id="lm-time" class="typer-stat-val" style="color:#ffaa00;">30s</div></div>
          <div class="typer-stat-node"><span class="typer-stat-lbl">Combo Streak</span><div id="lm-streak" class="typer-stat-val" style="color:#00ffcc;">0 🔥</div></div>
        </div>

        <div class="typing-main-workspace">
          
          <div style="display:flex; flex-direction:column; gap:16px; position:relative;">
            <button id="t-focus-exit" class="focus-exit-anchor">EXIT FOCUS MODE ✕</button>
            
            <div class="typing-terminal-box">
              <div id="t-results-overlay" class="results-overlay-shell" style="display:none;"></div>
              <input type="text" id="t-hidden-input" style="position:absolute; opacity:0; pointer-events:none; left:-9999px;" autocomplete="off" autocapitalize="none" spellcheck="false">
              <div id="t-scroller-target" class="typing-scroller-view"></div>
            </div>

            <div class="ax-glass-card v-keyboard-matrix-parent" style="padding:14px; display:flex; flex-direction:column; gap:14px;">
              <div class="v-keyboard-matrix">
                ${["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L",";","Z","X","C","V","B","N","M",",",".","SPC"].map(k => `
                  <div class="v-key-cap" id="vk-${k === ";" ? "semi" : k === "," ? "comma" : k === "." ? "dot" : k.toLowerCase()}">${k}</div>
                `).join('')}
              </div>
              
              <button id="t-btn-bottom-reset" class="bottom-reset-matrix-btn">
                <span>🔄 RESET TERMINAL MATRIX</span>
              </button>
            </div>
          </div>

          <div class="right-sidebar-analytics" style="display:flex; flex-direction:column; gap:16px;">
            <div class="ax-glass-card" style="padding:16px;">
              <div class="ax-card-header" style="margin-top:0; font-size:0.75rem; letter-spacing:0.04em;">Multiplayer Simulation Server</div>
              <div class="lanes-wrapper" id="t-race-lanes"></div>
            </div>

            <div class="ax-glass-card" style="flex-grow:1; display:flex; flex-direction:column; padding:16px;">
              <div class="ax-card-header" style="margin-top:0; font-size:0.75rem; letter-spacing:0.04em;">Realtime Velocity Stream</div>
              <div style="width:100%; height:110px; background:#04060b; border-radius:6px; border:1px solid rgba(255,255,255,0.02); overflow:hidden; position:relative; margin-top:auto;">
                <canvas id="t-telemetry-canvas" style="width:100%; height:100%; display:block;"></canvas>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;

    this._compileCharacterMatrixDisplay();
    this._generateMockRacingLanes();
    this._initializeCanvasGraphContext();
  },

  bindModuleEvents() {
    const hiddenCapture = getEl("t-hidden-input");
    const terminalBox = document.querySelector(".typing-terminal-box");
    const focusBtn = getEl("t-focus-toggle");
    const focusExitBtn = getEl("t-focus-exit");

    const forceFocusAndUnlockAudio = () => {
      this._initAudioContext();
      hiddenCapture?.focus();
    };

    terminalBox?.addEventListener("click", forceFocusAndUnlockAudio);

    const toggleFocusModeLogic = (e) => {
      e.stopPropagation();
      this._state.isFocusMode = !this._state.isFocusMode;
      const frame = getEl("typing-lifecycle-root");
      
      if (this._state.isFocusMode) {
        frame?.classList.add("focus-engaged");
      } else {
        frame?.classList.remove("focus-engaged");
      }
      forceFocusAndUnlockAudio();
    };

    focusBtn?.addEventListener("click", toggleFocusModeLogic);
    focusExitBtn?.addEventListener("click", toggleFocusModeLogic);

    hiddenCapture?.addEventListener("keydown", (e) => {
      let keyChar = e.key.toLowerCase();
      if (e.key === " ") keyChar = "spc";
      if (e.key === ";") keyChar = "semi";
      if (e.key === ",") keyChar = "comma";
      if (e.key === ".") keyChar = "dot";
      
      const el = getEl(`vk-${keyChar}`);
      if (el) {
        el.classList.add("active-press");
        setTimeout(() => el.classList.remove("active-press"), 80);
      }

      if (e.key === "Backspace") {
        this._state.backspaceCount++;
      }
    });

    hiddenCapture?.addEventListener("input", (e) => this._processEngineKeystrokeStream(e));

    getEl("t-config-mode")?.addEventListener("change", (e) => {
      this._state.selectedMode = e.target.value;
      this._resetTestingPipeline();
    });

    getEl("t-config-time")?.addEventListener("change", (e) => {
      this._state.selectedDuration = parseInt(e.target.value);
      this._resetTestingPipeline();
    });

    // Reset Event Routing Map (Top Ribbon and Dedicated Under-Keyboard Button)
    getEl("t-btn-reset")?.addEventListener("click", () => this._resetTestingPipeline());
    getEl("t-btn-bottom-reset")?.addEventListener("click", () => this._resetTestingPipeline());
  },

  _selectActiveStringSource() {
    const activePool = this._state.textPools[this._state.selectedMode];
    this._state.currentText = activePool[Math.floor(Math.random() * activePool.length)];
  },

  _compileCharacterMatrixDisplay() {
    const target = getEl("t-scroller-target");
    if (!target) return;

    const characters = this._state.currentText.split("");
    const inputVal = getEl("t-hidden-input")?.value || "";
    let compiledHTML = "";

    for (let i = 0; i < characters.length; i++) {
      let cssClass = "tc-unvisited";
      if (i < this._state.inputIndex) {
        cssClass = (inputVal[i] === characters[i]) ? "tc-correct" : "tc-incorrect";
      } else if (i === this._state.inputIndex) {
        cssClass = "tc-current";
      }
      compiledHTML += `<span class="${cssClass}">${characters[i]}</span>`;
    }
    target.innerHTML = compiledHTML;
  },

  _processEngineKeystrokeStream(e) {
    const currentInputValue = e.target.value;
    
    if (!this._state.isActive && currentInputValue.length === 1) {
      this._engageTimerStreams();
    }

    this._state.totalKeystrokes = currentInputValue.length;
    
    if (currentInputValue.length > this._state.inputIndex) {
      const standardLatestChar = currentInputValue[currentInputValue.length - 1];
      const standardTargetChar = this._state.currentText[currentInputValue.length - 1];
      
      if (standardLatestChar === standardTargetChar) {
        this._state.streak++;
        if (this._state.streak > this._state.bestStreak) this._state.bestStreak = this._state.streak;
        this._triggerAudioSynth("correct");
      } else {
        this._state.streak = 0;
        this._triggerAudioSynth("error");
      }
    } else {
      this._state.streak = 0;
    }

    this._state.inputIndex = currentInputValue.length;

    let operationalErrors = 0;
    let mathematicallyCorrectChars = 0;
    for (let i = 0; i < currentInputValue.length; i++) {
      if (currentInputValue[i] === this._state.currentText[i]) {
        mathematicallyCorrectChars++;
      } else {
        operationalErrors++;
      }
    }
    
    this._state.incorrectChars = operationalErrors;
    this._state.correctChars = mathematicallyCorrectChars;
    this._state.missedChars = Math.max(0, this._state.currentText.length - this._state.inputIndex);

    if (currentInputValue.length >= this._state.currentText.length) {
      this._terminateTestingCycle();
    }

    this._executeLiveCalculations();
    this._compileCharacterMatrixDisplay();
  },

  _executeLiveCalculations() {
    const rawElapsedSeconds = this._state.selectedDuration - this._state.timeLeft;
    const computedMinutesFactor = rawElapsedSeconds > 0 ? (rawElapsedSeconds / 60) : (1 / 60);

    this._state.currentWpm = Math.round((this._state.correctChars / 5) / computedMinutesFactor);
    if (this._state.currentWpm > this._state.peakWpm) this._state.peakWpm = this._state.currentWpm;

    this._state.accuracy = this._state.totalKeystrokes > 0
      ? Math.round((this._state.correctChars / this._state.totalKeystrokes) * 100)
      : 100;

    if (getEl("lm-wpm")) getEl("lm-wpm").innerText = this._state.currentWpm;
    if (getEl("lm-peak-wpm")) getEl("lm-peak-wpm").innerText = this._state.peakWpm;
    if (getEl("lm-acc")) getEl("lm-acc").innerText = `${this._state.accuracy}%`;
    if (getEl("lm-streak")) getEl("lm-streak").innerText = `${this._state.streak} 🔥`;

    this._updateMultiplayerPositions();
  },

  _engageTimerStreams() {
    this._state.isActive = true;
    this._state.wpmHistory = [0];

    this._state.timerInterval = setInterval(() => {
      this._state.timeLeft--;
      if (getEl("lm-time")) getEl("lm-time").innerText = `${this._state.timeLeft}s`;

      this._executeLiveCalculations();
      this._state.wpmHistory.push(this._state.currentWpm);
      this._plotTelemetryCanvasGraph();

      if (this._state.timeLeft <= 0) {
        this._terminateTestingCycle();
      }
    }, 1000);
  },

  _terminateTestingCycle() {
    clearInterval(this._state.timerInterval);
    this._state.isActive = false;
    getEl("t-hidden-input")?.setAttribute("disabled", "true");
    this._triggerAudioSynth("complete");

    const totalSamples = this._state.wpmHistory.length;
    const sumWpm = this._state.wpmHistory.reduce((acc, val) => acc + val, 0);
    this._state.averageWpm = totalSamples > 0 ? Math.round(sumWpm / totalSamples) : this._state.currentWpm;

    this._compileAndDisplayResultsModal();
  },

  _generateMockRacingLanes() {
    const lanesWrapper = getEl("t-race-lanes");
    if (!lanesWrapper) return;

    lanesWrapper.innerHTML = this._state.opponents.map((runner, i) => `
      <div class="race-lane">
        <div class="race-runner-meta">
          <span>${runner.name}</span>
          <span id="lane-speed-${i}">${runner.speed} WPM</span>
        </div>
        <div class="race-progress-track">
          <div class="race-progress-fill" id="lane-fill-${i}"></div>
        </div>
      </div>
    `).join('');
  },

  _updateMultiplayerPositions() {
    const totalLength = this._state.currentText.length || 1;
    const hostProgress = (this._state.inputIndex / totalLength) * 100;
    
    this._state.opponents[2].speed = this._state.currentWpm;
    this._state.opponents[2].progress = hostProgress;

    const timeRatio = (this._state.selectedDuration - this._state.timeLeft) / this._state.selectedDuration;
    
    this._state.opponents.forEach((runner, idx) => {
      if (idx !== 2) { 
        runner.progress = Math.min((runner.speed * 5 * timeRatio / totalLength) * 100, 100);
      }
      const fillEl = getEl(`lane-fill-${idx}`);
      const speedEl = getEl(`lane-speed-${idx}`);
      if (fillEl) fillEl.style.width = `${runner.progress}%`;
      if (speedEl) speedEl.innerText = `${runner.speed} WPM`;
    });
  },

  _initializeCanvasGraphContext() {
    this._plotTelemetryCanvasGraph();
  },

  _plotTelemetryCanvasGraph() {
    const canvas = getEl("t-telemetry-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    for (let i = 20; i < canvas.height; i += 20) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    const data = this._state.wpmHistory;
    if (data.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = "#54daf4";
    ctx.lineWidth = 2;
    
    const maxWpmVal = Math.max(...data, 100);
    const sliceX = canvas.width / (data.length - 1);

    for (let i = 0; i < data.length; i++) {
      const coordX = i * sliceX;
      const coordY = canvas.height - (data[i] / maxWpmVal * (canvas.height - 15)) - 5;
      
      if (i === 0) ctx.moveTo(coordX, coordY);
      else ctx.lineTo(coordX, coordY);
    }
    ctx.stroke();

    ctx.lineTo((data.length - 1) * sliceX, canvas.height);
    ctx.lineTo(0, canvas.height);
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, "rgba(84, 218, 244, 0.08)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fill();
  },

  _compileAndDisplayResultsModal() {
    const overlay = getEl("t-results-overlay");
    if (!overlay) return;

    const standings = [...this._state.opponents].sort((a, b) => b.progress - a.progress);
    const computedRank = standings.findIndex(r => r.name.includes("You")) + 1;

    if (this._state.isFocusMode) {
      this._state.isFocusMode = false;
      getEl("typing-lifecycle-root")?.classList.remove("focus-engaged");
    }

    overlay.innerHTML = `
      <div class="ax-card-topbar" style="margin-bottom:12px;">
        <div class="ax-meta-title" style="color:#00ffcc;">📊 TELEMETRY CORE PROCESSING SYSTEM REPORT</div>
      </div>

      <div class="results-analytics-grid">
        <div class="r-card"><div class="r-val">${this._state.currentWpm}</div><div class="r-lbl">Terminal WPM</div></div>
        <div class="r-card"><div class="r-val">${this._state.averageWpm}</div><div class="r-lbl">Avg WPM</div></div>
        <div class="r-card"><div class="r-val">${this._state.peakWpm}</div><div class="r-lbl">Peak Speed</div></div>
        <div class="r-card"><div class="r-val">${this._state.accuracy}%</div><div class="r-lbl">Accuracy Matrix</div></div>
        <div class="r-card"><div class="r-val">${this._state.bestStreak}</div><div class="r-lbl">Max Streak</div></div>
        <div class="r-card"><div class="r-val">#${computedRank}</div><div class="r-lbl">Server Place</div></div>
      </div>

      <div style="background:rgba(4,6,12,0.6); border:1px solid rgba(255,255,255,0.03); border-radius:8px; padding:12px; font-size:0.72rem; color:#94a3b8; display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div style="color:#00ffcc;">✔ Correct Matrix Chars: <b>${this._state.correctChars}</b></div>
        <div style="color:#ff3366;">❌ Erroneous Gaps Captured: <b>${this._state.incorrectChars}</b></div>
        <div>⌫ System Backspaces: <b>${this._state.backspaceCount}</b></div>
        <div>⚠️ Missing Input Chains: <b>${this._state.missedChars}</b></div>
        <div style="grid-column: span 2; border-top: 1px solid rgba(255,255,255,0.04); padding-top:8px; text-align:center; color:#54daf4; font-weight:600;">
          Consistency Factor Stability: <b>${Math.max(5, 100 - (this._state.backspaceCount * 2))}%</b>
        </div>
      </div>

      <button id="t-close-results" class="ax-action-btn-primary" style="margin-top:auto; padding:10px 0; font-size:0.75rem;">Re-compile Terminal Module Core 💾</button>
    `;

    overlay.style.display = "flex";

    getEl("t-close-results")?.addEventListener("click", () => {
      overlay.style.display = "none";
      this._resetTestingPipeline();
    });
  },

  _resetTestingPipeline() {
    clearInterval(this._state.timerInterval);
    this._state.isActive = false;
    this._state.timeLeft = this._state.selectedDuration;
    this._state.inputIndex = 0;
    this._state.totalKeystrokes = 0;
    this._state.correctChars = 0;
    this._state.incorrectChars = 0;
    this._state.backspaceCount = 0;
    this._state.missedChars = 0;
    this._state.peakWpm = 0;
    this._state.currentWpm = 0;
    this._state.averageWpm = 0;
    this._state.streak = 0;
    this._state.bestStreak = 0;
    this._state.wpmHistory = [0];

    this._selectActiveStringSource();

    const input = getEl("t-hidden-input");
    if (input) {
      input.removeAttribute("disabled");
      input.value = "";
    }

    if (getEl("lm-wpm")) getEl("lm-wpm").innerText = "0";
    if (getEl("lm-peak-wpm")) getEl("lm-peak-wpm").innerText = "0";
    if (getEl("lm-acc")) getEl("lm-acc").innerText = "100%";
    if (getEl("lm-time")) getEl("lm-time").innerText = `${this._state.timeLeft}s`;
    if (getEl("lm-streak")) getEl("lm-streak").innerText = "0 🔥";

    this._compileCharacterMatrixDisplay();
    this._generateMockRacingLanes();
    this._plotTelemetryCanvasGraph();
  }
};

export default typingModule;