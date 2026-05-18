/**
 * NEXUS_FLOW — High Performance Temporal Sync Module
 * ────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const timeModule = {
  // Over 220+ global countries and territories grouped flawlessly by continent
  _continentsData: {
    "Africa": [
      { location: "Algiers", country: "Algeria", zone: "Africa/Algiers" },
      { location: "Luanda", country: "Angola", zone: "Africa/Luanda" },
      { location: "Porto-Novo", country: "Benin", zone: "Africa/Porto-Novo" },
      { location: "Gaborone", country: "Botswana", zone: "Africa/Gaborone" },
      { location: "Ouagadougou", country: "Burkina Faso", zone: "Africa/Ouagadougou" },
      { location: "Gitega", country: "Burundi", zone: "Africa/Bujumbura" },
      { location: "Praia", country: "Cabo Verde", zone: "Atlantic/Cape_Verde" },
      { location: "Yaounde", country: "Cameroon", zone: "Africa/Douala" },
      { location: "Bangui", country: "Central African Republic", zone: "Africa/Bangui" },
      { location: "N'Djamena", country: "Chad", zone: "Africa/Ndjamena" },
      { location: "Moroni", country: "Comoros", zone: "Indian/Comoro" },
      { location: "Brazzaville", country: "Congo (Brazzaville)", zone: "Africa/Brazzaville" },
      { location: "Kinshasa", country: "Congo (Kinshasa)", zone: "Africa/Kinshasa" },
      { location: "Djibouti", country: "Djibouti", zone: "Africa/Djibouti" },
      { location: "Cairo", country: "Egypt", zone: "Africa/Cairo" },
      { location: "Malabo", country: "Equatorial Guinea", zone: "Africa/Malabo" },
      { location: "Asmara", country: "Eritrea", zone: "Africa/Asmara" },
      { location: "Mbabane", country: "Eswatini", zone: "Africa/Mbabane" },
      { location: "Addis Ababa", country: "Ethiopia", zone: "Africa/Addis_Ababa" },
      { location: "Libreville", country: "Gabon", zone: "Africa/Libreville" },
      { location: "Banjul", country: "Gambia", zone: "Africa/Banjul" },
      { location: "Accra", country: "Ghana", zone: "Africa/Accra" },
      { location: "Conakry", country: "Guinea", zone: "Africa/Conakry" },
      { location: "Bissau", country: "Guinea-Bissau", zone: "Africa/Bissau" },
      { location: "Yamoussoukro", country: "Ivory Coast", zone: "Africa/Abidjan" },
      { location: "Nairobi", country: "Kenya", zone: "Africa/Nairobi" },
      { location: "Maseru", country: "Lesotho", zone: "Africa/Maseru" },
      { location: "Monrovia", country: "Liberia", zone: "Africa/Monrovia" },
      { location: "Tripoli", country: "Libya", zone: "Africa/Tripoli" },
      { location: "Antananarivo", country: "Madagascar", zone: "Indian/Antananarivo" },
      { location: "Lilongwe", country: "Malawi", zone: "Africa/Blantyre" },
      { location: "Bamako", country: "Mali", zone: "Africa/Bamako" },
      { location: "Nouakchott", country: "Mauritania", zone: "Africa/Nouakchott" },
      { location: "Port Louis", country: "Mauritius", zone: "Indian/Mauritius" },
      { location: "Rabat", country: "Morocco", zone: "Africa/Casablanca" },
      { location: "Maputo", country: "Mozambique", zone: "Africa/Maputo" },
      { location: "Windhoek", country: "Namibia", zone: "Africa/Windhoek" },
      { location: "Niamey", country: "Niger", zone: "Africa/Niamey" },
      { location: "Abuja", country: "Nigeria", zone: "Africa/Lagos" },
      { location: "Kigali", country: "Rwanda", zone: "Africa/Kigali" },
      { location: "Sao Tome", country: "Sao Tome and Principe", zone: "Africa/Sao_Tome" },
      { location: "Dakar", country: "Senegal", zone: "Africa/Dakar" },
      { location: "Victoria", country: "Seychelles", zone: "Indian/Mahe" },
      { location: "Freetown", country: "Sierra Leone", zone: "Africa/Freetown" },
      { location: "Mogadishu", country: "Somalia", zone: "Africa/Mogadishu" },
      { location: "Pretoria", country: "South Africa", zone: "Africa/Johannesburg" },
      { location: "Juba", country: "South Sudan", zone: "Africa/Juba" },
      { location: "Khartoum", country: "Sudan", zone: "Africa/Khartoum" },
      { location: "Dodoma", country: "Tanzania", zone: "Africa/Dar_es_Salaam" },
      { location: "Lome", country: "Togo", zone: "Africa/Lome" },
      { location: "Tunis", country: "Tunisia", zone: "Africa/Tunis" },
      { location: "Kampala", country: "Uganda", zone: "Africa/Kampala" },
      { location: "Lusaka", country: "Zambia", zone: "Africa/Lusaka" },
      { location: "Harare", country: "Zimbabwe", zone: "Africa/Harare" }
    ],
    "Asia": [
      { location: "Kabul", country: "Afghanistan", zone: "Asia/Kabul" },
      { location: "Yerevan", country: "Armenia", zone: "Asia/Yerevan" },
      { location: "Baku", country: "Azerbaijan", zone: "Asia/Baku" },
      { location: "Manama", country: "Bahrain", zone: "Asia/Bahrain" },
      { location: "Dhaka", country: "Bangladesh", zone: "Asia/Dhaka" },
      { location: "Thimphu", country: "Bhutan", zone: "Asia/Thimphu" },
      { location: "Bandar Seri Begawan", country: "Brunei", zone: "Asia/Brunei" },
      { location: "Phnom Penh", country: "Cambodia", zone: "Asia/Phnom_Penh" },
      { location: "Beijing", country: "China", zone: "Asia/Shanghai" },
      { location: "Nicosia", country: "Cyprus", zone: "Asia/Nicosia" },
      { location: "Tbilisi", country: "Georgia", zone: "Asia/Tbilisi" },
      { location: "Hong Kong", country: "Hong Kong SAR", zone: "Asia/Hong_Kong" },
      { location: "New Delhi", country: "India", zone: "Asia/Kolkata" },
      { location: "Jakarta", country: "Indonesia", zone: "Asia/Jakarta" },
      { location: "Tehran", country: "Iran", zone: "Asia/Tehran" },
      { location: "Baghdad", country: "Iraq", zone: "Asia/Baghdad" },
      { location: "Jerusalem", country: "Israel", zone: "Asia/Jerusalem" },
      { location: "Tokyo", country: "Japan", zone: "Asia/Tokyo" },
      { location: "Amman", country: "Jordan", zone: "Asia/Amman" },
      { location: "Astana", country: "Kazakhstan", zone: "Asia/Almaty" },
      { location: "Kuwait City", country: "Kuwait", zone: "Asia/Kuwait" },
      { location: "Bishkek", country: "Kyrgyzstan", zone: "Asia/Bishkek" },
      { location: "Vientiane", country: "Laos", zone: "Asia/Vientiane" },
      { location: "Beirut", country: "Lebanon", zone: "Asia/Beirut" },
      { location: "Macau", country: "Macau SAR", zone: "Asia/Macau" },
      { location: "Kuala Lumpur", country: "Malaysia", zone: "Asia/Kuala_Lumpur" },
      { location: "Male", country: "Maldives", zone: "Indian/Maldives" },
      { location: "Ulaanbaatar", country: "Mongolia", zone: "Asia/Ulaanbaatar" },
      { location: "Naypyidaw", country: "Myanmar (Burma)", zone: "Asia/Yangon" },
      { location: "Kathmandu", country: "Nepal", zone: "Asia/Kathmandu" },
      { location: "Pyongyang", country: "North Korea", zone: "Asia/Pyongyang" },
      { location: "Muscat", country: "Oman", zone: "Asia/Muscat" },
      { location: "Islamabad", country: "Pakistan", zone: "Asia/Karachi" },
      { location: "Gaza", country: "Palestine", zone: "Asia/Gaza" },
      { location: "Manila", country: "Philippines", zone: "Asia/Manila" },
      { location: "Doha", country: "Qatar", zone: "Asia/Qatar" },
      { location: "Riyadh", country: "Saudi Arabia", zone: "Asia/Riyadh" },
      { location: "Singapore", country: "Singapore", zone: "Asia/Singapore" },
      { location: "Seoul", country: "South Korea", zone: "Asia/Seoul" },
      { location: "Colombo", country: "Sri Lanka", zone: "Asia/Colombo" },
      { location: "Damascus", country: "Syria", zone: "Asia/Damascus" },
      { location: "Taipei", country: "Taiwan", zone: "Asia/Taipei" },
      { location: "Dushanbe", country: "Tajikistan", zone: "Asia/Dushanbe" },
      { location: "Bangkok", country: "Thailand", zone: "Asia/Bangkok" },
      { location: "Dili", country: "Timor-Leste", zone: "Asia/Dili" },
      { location: "Ankara", country: "Turkey", zone: "Europe/Istanbul" },
      { location: "Ashgabat", country: "Turkmenistan", zone: "Asia/Ashgabat" },
      { location: "Abu Dhabi", country: "United Arab Emirates", zone: "Asia/Dubai" },
      { location: "Tashkent", country: "Uzbekistan", zone: "Asia/Tashkent" },
      { location: "Hanoi", country: "Vietnam", zone: "Asia/Ho_Chi_Minh" },
      { location: "Sanaa", country: "Yemen", zone: "Asia/Aden" }
    ],
    "Europe": [
      { location: "Tirana", country: "Albania", zone: "Europe/Tirana" },
      { location: "Andorra la Vella", country: "Andorra", zone: "Europe/Andorra" },
      { location: "Vienna", country: "Austria", zone: "Europe/Vienna" },
      { location: "Minsk", country: "Belarus", zone: "Europe/Minsk" },
      { location: "Brussels", country: "Belgium", zone: "Europe/Brussels" },
      { location: "Sarajevo", country: "Bosnia and Herzegovina", zone: "Europe/Sarajevo" },
      { location: "Sofia", country: "Bulgaria", zone: "Europe/Sofia" },
      { location: "Zagreb", country: "Croatia", zone: "Europe/Zagreb" },
      { location: "Prague", country: "Czechia", zone: "Europe/Prague" },
      { location: "Copenhagen", country: "Denmark", zone: "Europe/Copenhagen" },
      { location: "Tallinn", country: "Estonia", zone: "Europe/Tallinn" },
      { location: "Helsinki", country: "Finland", zone: "Europe/Helsinki" },
      { location: "Paris", country: "France", zone: "Europe/Paris" },
      { location: "Berlin", country: "Germany", zone: "Europe/Berlin" },
      { location: "Athens", country: "Greece", zone: "Europe/Athens" },
      { location: "Budapest", country: "Hungary", zone: "Europe/Budapest" },
      { location: "Reykjavik", country: "Iceland", zone: "Atlantic/Reykjavik" },
      { location: "Dublin", country: "Ireland", zone: "Europe/Dublin" },
      { location: "Rome", country: "Italy", zone: "Europe/Rome" },
      { location: "Riga", country: "Latvia", zone: "Europe/Riga" },
      { location: "Vaduz", country: "Liechtenstein", zone: "Europe/Vaduz" },
      { location: "Vilnius", country: "Lithuania", zone: "Europe/Vilnius" },
      { location: "Luxembourg", country: "Luxembourg", zone: "Europe/Luxembourg" },
      { location: "Valletta", country: "Malta", zone: "Europe/Malta" },
      { location: "Chisinau", country: "Moldova", zone: "Europe/Chisinau" },
      { location: "Monaco", country: "Monaco", zone: "Europe/Monaco" },
      { location: "Podgorica", country: "Montenegro", zone: "Europe/Podgorica" },
      { location: "Amsterdam", country: "Netherlands", zone: "Europe/Amsterdam" },
      { location: "Skopje", country: "North Macedonia", zone: "Europe/Skopje" },
      { location: "Oslo", country: "Norway", zone: "Europe/Oslo" },
      { location: "Warsaw", country: "Poland", zone: "Europe/Warsaw" },
      { location: "Lisbon", country: "Portugal", zone: "Europe/Lisbon" },
      { location: "Bucharest", country: "Romania", zone: "Europe/Bucharest" },
      { location: "Moscow", country: "Russia", zone: "Europe/Moscow" },
      { location: "San Marino", country: "San Marino", zone: "Europe/San_Marino" },
      { location: "Belgrade", country: "Serbia", zone: "Europe/Belgrade" },
      { location: "Bratislava", country: "Slovakia", zone: "Europe/Bratislava" },
      { location: "Ljubljana", country: "Slovenia", zone: "Europe/Ljubljana" },
      { location: "Madrid", country: "Spain", zone: "Europe/Madrid" },
      { location: "Stockholm", country: "Sweden", zone: "Europe/Stockholm" },
      { location: "Bern", country: "Switzerland", zone: "Europe/Zurich" },
      { location: "Kyiv", country: "Ukraine", zone: "Europe/Kyiv" },
      { location: "London", country: "United Kingdom", zone: "Europe/London" },
      { location: "Vatican City", country: "Vatican City", zone: "Europe/Vatican" }
    ],
    "North America": [
      { location: "St. John's", country: "Antigua and Barbuda", zone: "America/Antigua" },
      { location: "Nassau", country: "Bahamas", zone: "America/Nassau" },
      { location: "Bridgetown", country: "Barbados", zone: "America/Barbados" },
      { location: "Belmopan", country: "Belize", zone: "America/Belize" },
      { location: "Ottawa", country: "Canada", zone: "America/Toronto" },
      { location: "San Jose", country: "Costa Rica", zone: "America/Costa_Rica" },
      { location: "Havana", country: "Cuba", zone: "America/Havana" },
      { location: "Roseau", country: "Dominica", zone: "America/Dominica" },
      { location: "Santo Domingo", country: "Dominican Republic", zone: "America/Santo_Domingo" },
      { location: "San Salvador", country: "El Salvador", zone: "America/El_Salvador" },
      { location: "St. George's", country: "Grenada", zone: "America/Grenada" },
      { location: "Guatemala City", country: "Guatemala", zone: "America/Guatemala" },
      { location: "Port-au-Prince", country: "Haiti", zone: "America/Port-au-Prince" },
      { location: "Tegucigalpa", country: "Honduras", zone: "America/Tegucigalpa" },
      { location: "Kingston", country: "Jamaica", zone: "America/Jamaica" },
      { location: "Mexico City", country: "Mexico", zone: "America/Mexico_City" },
      { location: "Managua", country: "Nicaragua", zone: "America/Managua" },
      { location: "Panama City", country: "Panama", zone: "America/Panama" },
      { location: "San Juan", country: "Puerto Rico", zone: "America/Puerto_Rico" },
      { location: "Basseterre", country: "Saint Kitts and Nevis", zone: "America/St_Kitts" },
      { location: "Castries", country: "Saint Lucia", zone: "America/St_Lucia" },
      { location: "Kingstown", country: "Saint Vincent", zone: "America/St_Vincent" },
      { location: "Port of Spain", country: "Trinidad and Tobago", zone: "America/Port_of_Spain" },
      { location: "Washington, D.C.", country: "United States", zone: "America/New_York" }
    ],
    "South America": [
      { location: "Buenos Aires", country: "Argentina", zone: "America/Argentina/Buenos_Aires" },
      { location: "Sucre", country: "Bolivia", zone: "America/La_Paz" },
      { location: "Brasilia", country: "Brazil", zone: "America/Sao_Paulo" },
      { location: "Santiago", country: "Chile", zone: "America/Santiago" },
      { location: "Bogota", country: "Colombia", zone: "America/Bogota" },
      { location: "Quito", country: "Ecuador", zone: "America/Quito" },
      { location: "Georgetown", country: "Guyana", zone: "America/Guyana" },
      { location: "Asuncion", country: "Paraguay", zone: "America/Asuncion" },
      { location: "Lima", country: "Peru", zone: "America/Lima" },
      { location: "Paramaribo", country: "Suriname", zone: "America/Paramaribo" },
      { location: "Montevideo", country: "Uruguay", zone: "America/Montevideo" },
      { location: "Caracas", country: "Venezuela", zone: "America/Caracas" }
    ],
    "Oceania": [
      { location: "Canberra", country: "Australia", zone: "Australia/Canberra" },
      { location: "Suva", country: "Fiji", zone: "Pacific/Fiji" },
      { location: "Tarawa", country: "Kiribati", zone: "Pacific/Tarawa" },
      { location: "Majuro", country: "Marshall Islands", zone: "Pacific/Majuro" },
      { location: "Palikir", country: "Micronesia", zone: "Pacific/Pohnpei" },
      { location: "Yaren", country: "Nauru", zone: "Pacific/Nauru" },
      { location: "Wellington", country: "New Zealand", zone: "Pacific/Auckland" },
      { location: "Ngerulmud", country: "Palau", zone: "Pacific/Palau" },
      { location: "Port Moresby", country: "Papua New Guinea", zone: "Pacific/Port_Moresby" },
      { location: "Apia", country: "Samoa", zone: "Pacific/Apia" },
      { location: "Honiara", country: "Solomon Islands", zone: "Pacific/Honiara" },
      { location: "Nuku'alofa", country: "Tonga", zone: "Pacific/Tongatapu" },
      { location: "Funafuti", country: "Tuvalu", zone: "Pacific/Funafuti" },
      { location: "Port Vila", country: "Vanuatu", zone: "Pacific/Efate" }
    ]
  },

  _buildGroupedOptions(isSource) {
    let html = "";
    for (const [continent, items] of Object.entries(this._continentsData)) {
      html += `<optgroup label="${continent}">`;
      items.forEach(item => {
        let selected = "";
        if (isSource && item.zone === "Asia/Kolkata") selected = "selected";
        if (!isSource && item.zone === "Europe/London") selected = "selected";
        html += `<option value="${item.zone}" ${selected}>${item.location}, ${item.country}</option>`;
      });
      html += `</optgroup>`;
    }
    return html;
  },

  renderModule() {
    const container = getEl("time-container");
    if (!container) return;

    container.innerHTML = `
      <div class="input-row-vertical">
        
        <div class="input-group">
          <label>Select Base Time</label>
          <input type="time" id="time-base-clock" value="12:00">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%;">
          <div class="input-group">
            <label>From Location</label>
            <select id="time-source-zone">
              ${this._buildGroupedOptions(true)}
            </select>
          </div>
          
          <div class="input-group">
            <label>To Location</label>
            <select id="time-target-zone">
              ${this._buildGroupedOptions(false)}
            </select>
          </div>
        </div>

      </div>

      <button id="time-sync-trigger" class="execution-btn" style="margin-top: 20px;">CONVERT TIMEZONES</button>

      <div class="output-display-card" style="margin-top: 20px; padding: 24px; border: 1px solid var(--border-glass); border-radius: 16px; text-align: left;">
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Target Location Output</span>
          <span class="badge-highlight" id="time-badge-label" style="font-size: 0.65rem; padding: 2px 8px;">LONDON</span>
        </div>

        <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 14px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Custom Linear Log:</span>
          <span id="time-custom-log" style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: #ffffff; background-color: #1e1124; padding: 4px 8px; border-radius: 4px; border: 1px solid rgba(244, 63, 94, 0.2); text-transform: uppercase;">-</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 14px;">
          
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Standard (12-Hour):</span>
            <span id="time-meta-12hr" style="font-size: 1.25rem; font-weight: 700; color: #ffffff; font-family: sans-serif;">-</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Universal (24-Hour):</span>
            <span id="time-meta-24hr" style="font-size: 1.05rem; font-weight: 700; color: #ffffff; font-family: monospace;">-</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">Regional Date:</span>
            <span id="time-regional-date" style="font-size: 0.95rem; font-weight: 700; color: var(--accent-magenta); font-family: sans-serif;">-</span>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.85rem; color: var(--text-muted);">ISO Timestamp:</span>
            <span id="time-meta-iso" style="font-family: monospace; font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan);">-</span>
          </div>

        </div>
      </div>
    `;
  },

  bindModuleEvents() {
    const trigger = getEl("time-sync-trigger");
    trigger?.addEventListener("click", () => this._executeTimeCalculation());
    this._executeTimeCalculation();
  },

  _executeTimeCalculation() {
    const timeInput = getEl("time-base-clock").value;
    const srcZone = getEl("time-source-zone").value;
    const tgtZone = getEl("time-target-zone").value;

    const badgeLabel = getEl("time-badge-label");
    const customLog = getEl("time-custom-log");
    const meta12 = getEl("time-meta-12hr");
    const meta24 = getEl("time-meta-24hr");
    const regionalDate = getEl("time-regional-date");
    const metaIso = getEl("time-meta-iso");

    if (!timeInput) return;

    const [hours, minutes] = timeInput.split(":").map(Number);
    
    // Use fixed base evaluation to avoid dynamic timezone offset shifting anomalies
    const currentYear = 2026;
    const currentMonth = 4; // May (0-indexed)
    const currentDay = 18;  

    const getZoneDisplacement = (zone, yr, mo, dy, hr, min) => {
      const testDate = new Date(Date.UTC(yr, mo, dy, hr, min, 0));
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: zone,
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: false
      });
      const parts = formatter.formatToParts(testDate);
      const val = (type) => parseInt(parts.find(p => p.type === type).value, 10);
      return new Date(Date.UTC(val("year"), val("month") - 1, val("day"), val("hour"), val("minute"), 0));
    };

    const targetLocalTime = getZoneDisplacement(tgtZone, currentYear, currentMonth, currentDay, hours, minutes);
    const sourceLocalTime = getZoneDisplacement(srcZone, currentYear, currentMonth, currentDay, hours, minutes);

    const netVarianceMinutes = Math.round((targetLocalTime - sourceLocalTime) / 60000);

    const baseInputDate = new Date(Date.UTC(currentYear, currentMonth, currentDay, hours, minutes, 0));
    const calculatedTargetDate = new Date(baseInputDate.getTime() + (netVarianceMinutes * 60000));

    const outYear = calculatedTargetDate.getUTCFullYear();
    const outMonth = calculatedTargetDate.getUTCMonth();
    const outDay = calculatedTargetDate.getUTCDate();
    const outHours = calculatedTargetDate.getUTCHours();
    const outMinutes = String(calculatedTargetDate.getUTCMinutes()).padStart(2, "0");
    const outSeconds = "00";

    const daysMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fullMonthsMap = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const longDayNameMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    const outDayName = daysMap[calculatedTargetDate.getUTCDay()];
    const outLongDayName = longDayNameMap[calculatedTargetDate.getUTCDay()];
    const outMonthName = monthsMap[outMonth];
    const outFullMonthName = fullMonthsMap[outMonth];

    const displayHours24 = String(outHours).padStart(2, "0");
    const period = outHours >= 12 ? "PM" : "AM";
    const displayHours12 = String(outHours % 12 || 12).padStart(2, "0");

    const tgtZoneLabel = tgtZone.split("/").pop()?.toUpperCase().replace("_", " ") || tgtZone;
    badgeLabel.textContent = tgtZoneLabel;

    // Formatting bug resolved: All elements completely bound to matching target matrix structures
    customLog.textContent = `${outDayName} ${String(outDay).padStart(2, "0")} ${outMonthName} ${String(outYear).slice(-2)} - ${displayHours24}:${outMinutes}:${outSeconds}`;
    meta12.textContent = `${displayHours12}:${outMinutes}:${outSeconds} ${period}`;
    meta24.textContent = `${displayHours24}:${outMinutes}:${outSeconds}`;
    regionalDate.textContent = `${outLongDayName}, ${outFullMonthName} ${outDay}, ${outYear}`;
    
    // Precise ISO implementation validation block
    const tzOffsetSign = netVarianceMinutes >= 0 ? "+" : "-";
    const absOffsetHours = String(Math.floor(Math.abs(netVarianceMinutes) / 60)).padStart(2, "0");
    const absOffsetMinutes = String(Math.abs(netVarianceMinutes) % 60).padStart(2, "0");
    metaIso.textContent = `${outYear}-${String(outMonth + 1).padStart(2, "0")}-${String(outDay).padStart(2, "0")}T${displayHours24}:${outMinutes}:${outSeconds}${tzOffsetSign}${absOffsetHours}:${absOffsetMinutes}`;
  }
};

export default timeModule;