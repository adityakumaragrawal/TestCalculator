/**
 * ASSISTWE Cyber Weather Environmental Sandbox v1.0
 * Architecture: Premium Glassmorphism, Simulation State Matrix, & Canvas Particle Arrays
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const weatherModule = {
  _state: {
    selectedNode: "tokyo",
    activeSimTime: "16:44",
    particleInterval: null,
    canvasCtx: null,
    particlesArray: [],
    
    // Core Mock Data Matrix
    locations: {
      tokyo: {
        name: "TOKYO-NEO // SHIBUYA",
        condition: "Acid Rain Storm",
        conditionType: "rain", // rain, snow, sun, clouds, storm
        temp: "24°C",
        tempFeel: "28°C",
        humidity: "88%",
        wind: "24 km/h",
        aqi: "142 (Poor)",
        aqiColor: "#ff3366",
        uvIndex: "1 (Low)",
        pressure: "1008 hPa",
        visibility: "4.2 km",
        alert: "ACID PRECIPITATION WARNING CAUTION ENGINE FILTERS"
      },
      reykjavik: {
        name: "REYKJAVÍK // SECTOR 7",
        condition: "Glacial Aurora Fall",
        conditionType: "snow",
        temp: "-6°C",
        tempFeel: "-13°C",
        humidity: "42%",
        wind: "48 km/h",
        aqi: "12 (Excellent)",
        aqiColor: "#00ffcc",
        uvIndex: "0 (None)",
        pressure: "992 hPa",
        visibility: "16.0 km",
        alert: null
      },
      neo_cairo: {
        name: "NEO-CAIRO // GRID 03",
        condition: "Solar Thermal Flare",
        conditionType: "sun",
        temp: "46°C",
        tempFeel: "49°C",
        humidity: "11%",
        wind: "14 km/h",
        aqi: "189 (Volatile)",
        aqiColor: "#ff9900",
        uvIndex: "11+ (Extreme)",
        pressure: "1016 hPa",
        visibility: "8.0 km",
        alert: "HIGH DENSITY HEAT-SHIELD COMPULSORY OUTDOORS"
      },
      orbit_station: {
        name: "ORBITAL ANCHOR // OLYMPUS",
        condition: "Ionizing Ion Storm",
        conditionType: "storm",
        temp: "-2°C",
        tempFeel: "-2°C",
        humidity: "0%",
        wind: "0 km/h (Vacuum)",
        aqi: "0 (Shielded)",
        aqiColor: "#54daf4",
        uvIndex: "15 (Deadly)",
        pressure: "1013 hPa",
        visibility: "Infinite",
        alert: "SOLAR RADIATION BURST INCOMING UPDATE EMP BUFFER"
      }
    }
  },

  _injectGlobalStyles() {
    if (document.getElementById("ax-weather-styles")) return;

    const styleEl = document.createElement("style");
    styleEl.id = "ax-weather-styles";
    styleEl.innerHTML = `
      .weather-lifecycle-layout {
        display: flex; flex-direction: column; gap: 20px; width: 100%; box-sizing: border-box;
      }
      
      /* Main Canvas Viewport Grid */
      .weather-workspace-grid {
        display: grid; grid-template-columns: 300px 1fr; gap: 20px; width: 100%; align-items: start;
      }
      @media(max-width: 1024px) { .weather-workspace-grid { grid-template-columns: 1fr; } }

      /* Core Aesthetic Weather Node Selector */
      .weather-node-list { display: flex; flex-direction: column; gap: 10px; }
      .weather-nav-card {
        background: rgba(13, 20, 35, 0.4); border: 1px solid rgba(255, 255, 255, 0.03);
        border-radius: 8px; padding: 14px; cursor: pointer; transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex; justify-content: space-between; align-items: center;
      }
      .weather-nav-card:hover {
        background: rgba(84, 218, 244, 0.05); border-color: rgba(84, 218, 244, 0.2);
        transform: translateX(4px);
      }
      .weather-nav-card.node-active {
        background: linear-gradient(90deg, rgba(84, 218, 244, 0.12) 0%, rgba(13, 20, 35, 0.6) 100%);
        border-color: #54daf4; box-shadow: 0 0 20px rgba(84, 218, 244, 0.05);
      }

      /* Premium Glass Simulation Box Container */
      .weather-atmosphere-box {
        position: relative; background: rgba(6, 10, 18, 0.5); border: 1px solid rgba(255, 255, 255, 0.04);
        border-radius: 12px; min-height: 440px; overflow: hidden; display: flex; flex-direction: column;
        box-shadow: inset 0 4px 24px rgba(0,0,0,0.4), 0 10px 30px rgba(0,0,0,0.3);
      }
      .weather-particle-backdrop {
        position: absolute; inset: 0; pointer-events: none; z-index: 1;
      }
      .weather-glass-overlay-content {
        position: relative; z-index: 2; padding: 30px; display: flex; flex-direction: column; height: 100%; flex-grow: 1;
        backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
      }

      /* Weather Hero Layout Elements */
      .weather-hero-flex { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; }
      .weather-temp-huge {
        font-family: monospace; font-size: 4.5rem; font-weight: 800; line-height: 1; color: #fff;
        text-shadow: 0 0 30px rgba(255,255,255,0.15); display: flex; align-items: flex-start;
      }
      
      /* Grid Matrix Nodes for Metrics Parameters */
      .weather-param-grid {
        display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-top: auto; padding-top: 24px;
      }
      .weather-param-card {
        background: rgba(4, 7, 13, 0.6); border: 1px solid rgba(255, 255, 255, 0.03); border-radius: 8px;
        padding: 12px 16px; display: flex; flex-direction: column; gap: 4px;
      }
      .w-p-lbl { font-size: 0.65rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600; }
      .w-p-val { font-family: monospace; font-size: 1.15rem; font-weight: 700; color: #54daf4; }

      /* Hazard Alert Banner Element */
      .weather-hazard-banner {
        background: rgba(255, 51, 102, 0.08); border: 1px dashed #ff3366; border-radius: 6px;
        padding: 10px 14px; font-size: 0.72rem; font-weight: 700; font-family: monospace; color: #ff3366;
        margin-top: 16px; display: flex; align-items: center; gap: 8px; animation: weather-pulse 2s infinite alternate;
      }

      /* Core Thematic Weather Glow Signifiers */
      .glow-indicator-rain { background: #54daf4; box-shadow: 0 0 10px #54daf4; }
      .glow-indicator-snow { background: #00ffcc; box-shadow: 0 0 10px #00ffcc; }
      .glow-indicator-sun { background: #ffaa00; box-shadow: 0 0 10px #ffaa00; }
      .glow-indicator-storm { background: #b026ff; box-shadow: 0 0 10px #b026ff; }

      @keyframes weather-pulse { from { opacity: 0.75; } to { opacity: 1; border-color: rgba(255, 51, 102, 0.6); } }
    `;
    document.head.appendChild(styleEl);
  },

  renderModule() {
    // FIX: Targets the dedicated weather-container instead of the shared typing-container
    const container = getEl("weather-container"); 
    if (!container) return;

    this._injectGlobalStyles();
    const activeData = this._state.locations[this._state.selectedNode];

    container.innerHTML = `
      <div class="weather-lifecycle-layout">
        
        <div class="typing-control-topbar" style="padding: 14px 20px;">
          <div class="settings-bar-left">
            <span class="ax-field-label" style="margin:0; font-size:0.75rem; color:#54daf4; letter-spacing:0.05em; font-weight:700;">ENVIRONMENTAL SIMULATION HUB // ONLINE</span>
          </div>
          <div style="font-family:monospace; font-size:0.72rem; color:#64748b;">
            MATRIX REF: <span style="color:#fff;" id="ws-clock-stamp">SEC_TRACK_0${Math.floor(Math.random()*90+10)}</span>
          </div>
        </div>

        <div class="weather-workspace-grid">
          
          <div class="weather-node-list">
            <div style="font-size:0.68rem; font-weight:700; color:#64748b; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px; padding-left:2px;">Select Vector Core</div>
            
            ${Object.entries(this._state.locations).map(([key, loc]) => `
              <div class="weather-nav-card ${this._state.selectedNode === key ? 'node-active' : ''}" data-node-key="${key}">
                <div style="display:flex; flex-direction:column; gap:2px;">
                  <span style="font-size:0.78rem; font-weight:700; color:${this._state.selectedNode === key ? '#fff' : '#94a3b8'};">${loc.name.split(" // ")[0]}</span>
                  <span style="font-size:0.65rem; color:#64748b; font-family:monospace;">${loc.condition}</span>
                </div>
                <div style="font-family:monospace; font-size:1.1rem; font-weight:800; color:${this._state.selectedNode === key ? '#54daf4' : '#475569'};">${loc.temp}</div>
              </div>
            `).join('')}
          </div>

          <div class="weather-atmosphere-box">
            <canvas id="weather-particle-engine" class="weather-particle-backdrop"></canvas>
            
            <div class="weather-glass-overlay-content">
              
              <div class="weather-hero-flex">
                <div>
                  <div style="display:flex; align-items:center; gap:8px;">
                    <div style="width:6px; height:6px; border-radius:50%;" class="glow-indicator-${activeData.conditionType}"></div>
                    <span style="font-family:monospace; font-size:0.72rem; letter-spacing:0.08em; color:#64748b;">ATMOSPHERIC PROFILE DATA STREAM</span>
                  </div>
                  <h2 style="margin:6px 0 2px 0; font-size:1.6rem; font-weight:800; color:#fff; letter-spacing:-0.01em;">${activeData.name}</h2>
                  <p style="margin:0; font-family:monospace; font-size:0.85rem; color:#54daf4; font-weight:600; text-transform:uppercase;">${activeData.condition}</p>
                </div>

                <div class="weather-temp-huge">
                  ${activeData.temp.replace("°C", "")}<span style="font-size:2rem; color:rgba(255,255,255,0.4); font-weight:400; margin-top:4px;">°C</span>
                </div>
              </div>

              ${activeData.alert ? `
                <div class="weather-hazard-banner">
                  <span>⚠️ CORE CRITICAL HARSH BIOME ALERT: ${activeData.alert}</span>
                </div>
              ` : ''}

              <div class="weather-param-grid">
                <div class="weather-param-card"><span class="w-p-lbl">Thermal Index Feel</span><span class="w-p-val">${activeData.tempFeel}</span></div>
                <div class="weather-param-card"><span class="w-p-lbl">Relative Air Density</span><span class="w-p-val">${activeData.humidity}</span></div>
                <div class="weather-param-card"><span class="w-p-lbl">Velocity Dispersion</span><span class="w-p-val">${activeData.wind}</span></div>
                <div class="weather-param-card"><span class="w-p-lbl">Atmospheric Air AQI</span><span class="w-p-val" style="color:${activeData.aqiColor};">${activeData.aqi.split(" ")[0]}</span></div>
                <div class="weather-param-card"><span class="w-p-lbl">UV Radiation Scale</span><span class="w-p-val">${activeData.uvIndex}</span></div>
                <div class="weather-param-card"><span class="w-p-lbl">Barometric Vector</span><span class="w-p-val">${activeData.pressure}</span></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    `;

    this._initializeParticleEngineLoop();
  },

  bindModuleEvents() {
    document.querySelectorAll(".weather-nav-card").forEach(card => {
      card.addEventListener("click", (e) => {
        const targetNode = e.currentTarget.getAttribute("data-node-key");
        if (targetNode && this._state.locations[targetNode]) {
          this._state.selectedNode = targetNode;
          this.renderModule();
          this.bindModuleEvents(); 
        }
      });
    });

    window.removeEventListener("resize", this._handleCanvasBoundariesResize);
    window.addEventListener("resize", this._handleCanvasBoundariesResize.bind(this));
  },

  _handleCanvasBoundariesResize() {
    const canvas = getEl("weather-particle-engine");
    if (!canvas) return;
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  },

  _initializeParticleEngineLoop() {
    const canvas = getEl("weather-particle-engine");
    if (!canvas) return;
    
    this._state.canvasCtx = canvas.getContext("2d");
    this._handleCanvasBoundariesResize();

    const ctx = this._state.canvasCtx;
    const activeType = this._state.locations[this._state.selectedNode].conditionType;
    
    this._state.particlesArray = [];
    let densityCount = 60;

    if (activeType === "sun") densityCount = 25;
    if (activeType === "storm") densityCount = 80;

    for (let i = 0; i < densityCount; i++) {
      this._state.particlesArray.push(this._createParticleBlueprint(canvas.width, canvas.height, activeType));
    }

    if (this._state.particleInterval) cancelAnimationFrame(this._state.particleInterval);

    const animate = () => {
      if (!getEl("weather-particle-engine")) return; 

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      this._state.particlesArray.forEach(p => {
        ctx.beginPath();
        
        if (activeType === "rain" || activeType === "storm") {
          ctx.strokeStyle = activeType === "storm" ? "rgba(176, 38, 255, 0.4)" : "rgba(84, 218, 244, 0.4)";
          ctx.lineWidth = p.weight / 2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + (p.speedX * 2), p.y + (p.speedY * 2));
          ctx.stroke();
        } else if (activeType === "snow") {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (activeType === "sun") {
          ctx.fillStyle = `rgba(255, 170, 0, ${p.opacity})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(100, 116, 139, 0.15)";
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width) {
          p.x = -10;
          p.y = Math.random() * canvas.height;
        } else if (p.x < -10) {
          p.x = canvas.width + 10;
        }
      });

      this._state.particleInterval = requestAnimationFrame(animate);
    };

    animate();
  },

  _createParticleBlueprint(maxWidth, maxHeight, type) {
    return {
      x: Math.random() * maxWidth,
      y: Math.random() * maxHeight,
      size: Math.random() * 3 + 1,
      speedX: type === "rain" || type === "storm" ? (Math.random() * 1 - 0.5) - 1 : (Math.random() * 1 - 0.5),
      speedY: type === "rain" ? Math.random() * 5 + 6 : type === "storm" ? Math.random() * 8 + 9 : type === "snow" ? Math.random() * 1 + 1 : (Math.random() * -0.5) - 0.2,
      weight: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    };
  }
};

export default weatherModule;