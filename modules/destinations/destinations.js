/**
 * NEXUS_FLOW — Global Fiat Currency Sub-Module (220+ Organized via Continent Optgroups + K M B T Suffixes)
 * ────────────────────────────────────────────────────────────────────────────────
 */

"use strict";

import { getEl } from "../../utils/helpers.js";

const destinationsModule = {
  // Decentralized Unified Scaling Conversion Factors (Base Relative Matrix 1.00 USD)
  _usdExchangeRates: {
    // ASIA
    USD: 1.0000, INR: 83.4542, HKD: 7.8156, JPY: 155.6520, CNY: 7.2241, KRW: 1354.1200, SGD: 1.3465, IDR: 15985.0000, MYR: 4.6850, PHP: 57.8500, THB: 36.3200, VND: 25420.0000, ILS: 3.7120, AED: 3.6728, SAR: 3.7504, BDT: 117.2500, BHD: 0.3760, BND: 1.3465, BTN: 83.4542, KHR: 4095.0000, IRR: 42087.5000, IQD: 1310.0000, JOD: 0.7090, KZT: 442.1500, KWD: 0.3072, KGS: 88.3200, LAK: 21450.0000, LBP: 89500.0000, MOP: 8.0500, MVR: 15.4200, MNT: 3450.0000, MMK: 2100.0000, NPR: 133.5400, OMR: 0.3845, PKR: 278.3500, QAR: 3.6400, LKR: 302.1200, SYP: 13000.0000, TWD: 32.2800, TJS: 10.9200, TMT: 3.5000, UZS: 12650.0000, YER: 250.2500, AFN: 70.8200, AMD: 388.2500, AZN: 1.7000, GEL: 2.7200,
    // EUROPE
    EUR: 0.9215, GBP: 0.7892, CHF: 0.9084, SEK: 10.7431, NOK: 10.7142, RUB: 91.1245, TRY: 32.2215, ALL: 93.2500, BAM: 1.8020, BGN: 1.8022, BYN: 3.2600, CZK: 22.8200, DKK: 6.8745, HUF: 358.4500, ISK: 138.6500, MDL: 17.6800, MKD: 56.6500, PLN: 3.9450, RON: 4.5820, RSD: 107.8500, UAH: 39.8500, GIP: 0.7892, JEP: 0.7892, GGP: 0.7892, IMP: 0.7892,
    // AMERICAS
    CAD: 1.3621, MXN: 16.6841, BRL: 5.1232, ARS: 885.5000, AWG: 1.7900, BSD: 1.0000, BBD: 2.0000, BZD: 2.0000, BMD: 1.0000, BOB: 6.9100, CLF: 0.0340, CLP: 922.5000, COP: 3845.0000, CRC: 516.2000, CUP: 24.0000, DOP: 59.1200, XCD: 2.7000, SVC: 8.7500, FKP: 0.7892, GTQ: 7.7800, GYD: 211.4500, HTG: 132.5000, HNL: 24.7200, JMD: 156.4500, ANG: 1.7900, NIO: 36.7800, PAB: 1.0000, PYG: 7510.0000, PEN: 3.7320, SHP: 0.7892, SRD: 31.2500, TTD: 6.7800, UYU: 38.6500, VES: 36.5800, KYD: 0.8333,
    // AFRICA
    ZAR: 18.1450, EGP: 47.1500, DZD: 134.2500, AOA: 832.5000, BWP: 13.6200, BIF: 2875.0000, XAF: 604.4500, CVE: 101.6000, KMF: 453.3500, CDF: 2795.0000, DJF: 177.7200, ERN: 15.0000, ETB: 57.2500, GMD: 67.8500, GHS: 14.2500, GNF: 8612.0000, XOF: 604.4500, KES: 131.5000, LSL: 18.1450, LRD: 194.2000, LYD: 4.8400, MGA: 4520.0000, MWK: 1735.0000, MRU: 39.6500, MUR: 46.2500, MAD: 10.0200, MZN: 63.8500, NAD: 18.1450, NGN: 1485.0000, RWF: 1310.0000, SCR: 13.5500, SLL: 22450.0000, SOS: 571.5000, SDG: 601.5000, SZL: 18.1450, TZS: 2595.0000, TND: 3.1220, UGX: 3785.0000, ZMW: 26.8500, ZWG: 13.4200,
    // OCEANIA
    AUD: 1.5034, NZD: 1.6342, FJD: 2.2400, XPF: 110.0000, PGK: 3.8800, SBD: 8.4800, TOP: 2.3600, TVD: 1.5034, VUV: 119.5000, WST: 2.7300
  },

  _abbreviateNumber(num) {
    const abs = Math.abs(num);
    if (abs >= 1e12) return (num / 1e12).toFixed(2).replace(/\.?0+$/, "") + "T";
    if (abs >= 1e9) return (num / 1e9).toFixed(2).replace(/\.?0+$/, "") + "B";
    if (abs >= 1e6) return (num / 1e6).toFixed(2).replace(/\.?0+$/, "") + "M";
    if (abs >= 1e3) return (num / 1e3).toFixed(2).replace(/\.?0+$/, "") + "K";
    return num.toFixed(4).replace(/\.?0+$/, "");
  },

  renderModule() {
    const container = getEl("destinations-container");
    if (!container) return;

    const fullCategorizedOptions = `
      <optgroup label="Asia & Middle East">
        <option value="INR" selected>INR — Indian Rupee (India)</option>
        <option value="USD">USD — United States Dollar (Timor-Leste)</option>
        <option value="HKD">HKD — Hong Kong Dollar (Hong Kong)</option>
        <option value="JPY">JPY — Japanese Yen (Japan)</option>
        <option value="CNY">CNY — Chinese Yuan Renminbi (China)</option>
        <option value="KRW">KRW — South Korean Won (South Korea)</option>
        <option value="SGD">SGD — Singapore Dollar (Singapore)</option>
        <option value="IDR">IDR — Indonesian Rupiah (Indonesia)</option>
        <option value="MYR">MYR — Malaysian Ringgit (Malaysia)</option>
        <option value="PHP">PHP — Philippine Peso (Philippines)</option>
        <option value="THB">THB — Thai Baht (Thailand)</option>
        <option value="VND">VND — Vietnamese Dong (Vietnam)</option>
        <option value="ILS">ILS — Israeli New Shekel (Israel / Palestine)</option>
        <option value="AED">AED — United Arab Emirates Dirham (UAE)</option>
        <option value="SAR">SAR — Saudi Arabian Riyal (Saudi Arabia)</option>
        <option value="AFN">AFN — Afghan Afghani (Afghanistan)</option>
        <option value="AMD">AMD — Armenian Dram (Armenia)</option>
        <option value="AZN">AZN — Azerbaijani Manat (Azerbaijan)</option>
        <option value="BDT">BDT — Bangladeshi Taka (Bangladesh)</option>
        <option value="BHD">BHD — Bahraini Dinar (Bahrain)</option>
        <option value="BND">BND — Brunei Dollar (Brunei)</option>
        <option value="BTN">BTN — Bhutanese Ngultrum (Bhutan)</option>
        <option value="GEL">GEL — Georgian Lari (Georgia)</option>
        <option value="KHR">KHR — Cambodian Riel (Cambodia)</option>
        <option value="IRR">IRR — Iranian Rial (Iran)</option>
        <option value="IQD">IQD — Iraqi Dinar (Iraq)</option>
        <option value="JOD">JOD — Jordanian Dinar (Jordan)</option>
        <option value="KZT">KZT — Kazakhstani Tenge (Kazakhstan)</option>
        <option value="KWD">KWD — Kuwaiti Dinar (Kuwait)</option>
        <option value="KGS">KGS — Kyrgyzstani Som (Kyrgyzstan)</option>
        <option value="LAK">LAK — Lao Kip (Laos)</option>
        <option value="LBP">LBP — Lebanese Pound (Lebanon)</option>
        <option value="MOP">MOP — Macanese Pataca (Macau)</option>
        <option value="MVR">MVR — Maldivian Rufiyaa (Maldives)</option>
        <option value="MNT">MNT — Mongolian Tughrik (Mongolia)</option>
        <option value="MMK">MMK — Myanmar Kyat (Myanmar)</option>
        <option value="NPR">NPR — Nepalese Rupee (Nepal)</option>
        <option value="OMR">OMR — Omani Rial (Oman)</option>
        <option value="PKR">PKR — Pakistani Rupee (Pakistan)</option>
        <option value="QAR">QAR — Qatari Riyal (Qatar)</option>
        <option value="LKR">LKR — Sri Lankan Rupee (Sri Lanka)</option>
        <option value="SYP">SYP — Syrian Pound (Syria)</option>
        <option value="TWD">TWD — New Taiwan Dollar (Taiwan)</option>
        <option value="TJS">TJS — Tajikistani Somoni (Tajikistan)</option>
        <option value="TMT">TMT — Turkmenistani Manat (Turkmenistan)</option>
        <option value="UZS">UZS — Uzbekistani Som (Uzbekistan)</option>
        <option value="YER">YER — Yemeni Rial (Yemen)</option>
      </optgroup>

      <optgroup label="Europe">
        <option value="EUR">EUR — Euro (Eurozone Countries)</option>
        <option value="GBP">GBP — British Pound Sterling (United Kingdom)</option>
        <option value="CHF">CHF — Swiss Franc (Switzerland / Liechtenstein)</option>
        <option value="SEK">SEK — Swedish Krona (Sweden)</option>
        <option value="NOK">NOK — Norwegian Krone (Norway / Svalbard)</option>
        <option value="RUB">RUB — Russian Ruble (Russia)</option>
        <option value="TRY">TRY — Turkish Lira (Turkey)</option>
        <option value="ALL">ALL — Albanian Lek (Albania)</option>
        <option value="BAM">BAM — Bosnia Convertible Mark (Bosnia & Herzegovina)</option>
        <option value="BGN">BGN — Bulgarian Lev (Bulgaria)</option>
        <option value="BYN">BYN — Belarusian Ruble (Belarus)</option>
        <option value="CZK">CZK — Czech Koruna (Czech Republic)</option>
        <option value="DKK">DKK — Danish Krone (Denmark / Greenland)</option>
        <option value="HUF">HUF — Hungarian Forint (Hungary)</option>
        <option value="ISK">ISK — Icelandic Króna (Iceland)</option>
        <option value="MDL">MDL — Moldovan Leu (Moldova)</option>
        <option value="MKD">MKD — Macedonian Denar (North Macedonia)</option>
        <option value="PLN">PLN — Polish Zloty (Poland)</option>
        <option value="RON">RON — Romanian Leu (Romania)</option>
        <option value="RSD">RSD — Serbian Dinar (Serbia)</option>
        <option value="UAH">UAH — Ukrainian Hryvnia (Ukraine)</option>
        <option value="GIP">GIP — Gibraltar Pound (Gibraltar)</option>
        <option value="JEP">JEP — Jersey Pound (Jersey)</option>
        <option value="GGP">GGP — Guernsey Pound (Guernsey)</option>
        <option value="IMP">IMP — Manx Pound (Isle of Man)</option>
      </optgroup>

      <optgroup label="Americas (North, Central, South)">
        <option value="USD">USD — United States Dollar (USA / Ecuador / El Salvador)</option>
        <option value="CAD">CAD — Canadian Dollar (Canada)</option>
        <option value="MXN">MXN — Mexican Peso (Mexico)</option>
        <option value="BRL">BRL — Brazilian Real (Brazil)</option>
        <option value="ARS">ARS — Argentine Peso (Argentina)</option>
        <option value="AWG">AWG — Aruban Florin (Aruba)</option>
        <option value="BSD">BSD — Bahamian Dollar (Bahamas)</option>
        <option value="BBD">BBD — Barbadian Dollar (Barbados)</option>
        <option value="BZD">BZD — Belize Dollar (Belize)</option>
        <option value="BMD">BMD — Bermudian Dollar (Bermuda)</option>
        <option value="BOB">BOB — Bolivian Boliviano (Bolivia)</option>
        <option value="CLF">CLF — Unidad de Fomento (Chile Funds)</option>
        <option value="CLP">CLP — Chilean Peso (Chile)</option>
        <option value="COP">COP — Colombian Peso (Colombia)</option>
        <option value="CRC">CRC — Costa Rican Colón (Costa Rica)</option>
        <option value="CUP">CUP — Cuban Peso (Cuba)</option>
        <option value="DOP">DOP — Dominican Peso (Dominican Republic)</option>
        <option value="XCD">XCD — East Caribbean Dollar (Antigua / Dominica / Grenada / St. Lucia)</option>
        <option value="SVC">SVC — El Salvador Colón (El Salvador)</option>
        <option value="FKP">FKP — Falkland Islands Pound (Falkland Islands)</option>
        <option value="GTQ">GTQ — Guatemalan Quetzal (Guatemala)</option>
        <option value="GYD">GYD — Guyanese Dollar (Guyana)</option>
        <option value="HTG">HTG — Haitian Gourde (Haiti)</option>
        <option value="HNL">HNL — Honduran Lempira (Honduras)</option>
        <option value="JMD">JMD — Jamaican Dollar (Jamaica)</option>
        <option value="ANG">ANG — Netherlands Antillean Guilder (Curaçao / Sint Maarten)</option>
        <option value="NIO">NIO — Nicaraguan Córdoba (Nicaragua)</option>
        <option value="PAB">PAB — Panamanian Balboa (Panama)</option>
        <option value="PYG">PYG — Paraguayan Guaraní (Paraguay)</option>
        <option value="PEN">PEN — Peruvian Sol (Peru)</option>
        <option value="SRD">SRD — Surinamese Dollar (Suriname)</option>
        <option value="TTD">TTD — Trinidad and Tobago Dollar (Trinidad & Tobago)</option>
        <option value="UYU">UYU — Uruguayan Peso (Uruguay)</option>
        <option value="VES">VES — Venezuelan Bolívar Soberano (Venezuela)</option>
        <option value="KYD">KYD — Cayman Islands Dollar (Cayman Islands)</option>
      </optgroup>

      <optgroup label="Africa">
        <option value="ZAR">ZAR — South African Rand (South Africa / Lesotho / Namibia)</option>
        <option value="EGP">EGP — Egyptian Pound (Egypt)</option>
        <option value="DZD">DZD — Algerian Dinar (Algeria)</option>
        <option value="AOA">AOA — Angolan Kwanza (Angola)</option>
        <option value="BWP">BWP — Botswana Pula (Botswana)</option>
        <option value="BIF">BIF — Burundian Franc (Burundi)</option>
        <option value="XAF">XAF — Central African CFA Franc BEAC (Cameroon / Chad / Gabon / Congo)</option>
        <option value="CVE">CVE — Cape Verdean Escudo (Cape Verde)</option>
        <option value="KMF">KMF — Comorian Franc (Comoros)</option>
        <option value="CDF">CDF — Congolese Franc (DR Congo)</option>
        <option value="DJF">DJF — Djiboutian Franc (Djibouti)</option>
        <option value="ERN">ERN — Eritrean Nakfa (Eritrea)</option>
        <option value="ETB">ETB — Ethiopian Birr (Ethiopia)</option>
        <option value="GMD">GMD — Gambian Dalasi (Gambia)</option>
        <option value="GHS">GHS — Ghanaian Cedi (Ghana)</option>
        <option value="GNF">GNF — Guinean Franc (Guinea)</option>
        <option value="XOF">XOF — West African CFA Franc BCEAO (Benin / Ivory Coast / Senegal / Togo)</option>
        <option value="KES">KES — Kenyan Shilling (Kenya)</option>
        <option value="LSL">LSL — Lesotho Loti (Lesotho)</option>
        <option value="LRD">LRD — Liberian Dollar (Liberia)</option>
        <option value="LYD">LYD — Libyan Dinar (Libya)</option>
        <option value="MGA">MGA — Malagasy Ariary (Madagascar)</option>
        <option value="MWK">MWK — Malawian Kwacha (Malawi)</option>
        <option value="MRU">MRU — Mauritanian Ouguiya (Mauritania)</option>
        <option value="MUR">MUR — Mauritian Rupee (Mauritius)</option>
        <option value="MAD">MAD — Moroccan Dirham (Morocco / Western Sahara)</option>
        <option value="MZN">MZN — Mozambican Metical (Mozambique)</option>
        <option value="NAD">NAD — Namibian Dollar (Namibia)</option>
        <option value="NGN">NGN — Nigerian Naira (Nigeria)</option>
        <option value="RWF">RWF — Rwandan Franc (Rwanda)</option>
        <option value="SCR">SCR — Seychellois Rupee (Seychelles)</option>
        <option value="SLL">SLL — Sierra Leonean Leone (Sierra Leone)</option>
        <option value="SOS">SOS — Somali Shilling (Somalia)</option>
        <option value="SDG">SDG — Sudanese Pound (Sudan)</option>
        <option value="SZL">SZL — Swazi Lilangeni (Eswatini)</option>
        <option value="TZS">TZS — Tanzanian Shilling (Tanzania)</option>
        <option value="TND">TND — Tunisian Dinar (Tunisia)</option>
        <option value="UGX">UGX — Ugandan Shilling (Uganda)</option>
        <option value="ZMW">ZMW — Zambian Kwacha (Zambia)</option>
        <option value="ZWG">ZWG — Zimbabwe Gold (Zimbabwe)</option>
      </optgroup>

      <optgroup label="Oceania">
        <option value="AUD">AUD — Australian Dollar (Australia / Nauru / Tuvalu)</option>
        <option value="NZD">NZD — New Zealand Dollar (New Zealand / Cook Islands)</option>
        <option value="FJD">FJD — Fijian Dollar (Fiji)</option>
        <option value="XPF">XPF — CFP Franc (French Polynesia / New Caledonia)</option>
        <option value="PGK">PGK — Papua New Guinea Kina (Papua New Guinea)</option>
        <option value="SBD">SBD — Solomon Islands Dollar (Solomon Islands)</option>
        <option value="TOP">TOP — Tongan Paʻanga (Tonga)</option>
        <option value="VUV">VUV — Vanuatu Vatu (Vanuatu)</option>
        <option value="WST">WST — Samoan Tālā (Samoa)</option>
      </optgroup>
    `;

    container.innerHTML = `
      <div class="input-group">
        <label>Value Amount</label>
        <input type="number" id="convert-amount" value="1" min="0" step="any">
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; width: 100%;">
        <div class="input-group">
          <label>Source Currency</label>
          <select id="source-currency">${fullCategorizedOptions}</select>
        </div>

        <div class="input-group">
          <label>Target Currency</label>
          <select id="target-currency">${fullCategorizedOptions}</select>
        </div>
      </div>

      <button id="calculate-trigger" class="execution-btn">Calculate Exchange Rate</button>

      <div class="market-pair-profile-row">
        <div class="currency-profile-block">
          <span class="meta-label">Selected Source</span>
          <div class="currency-large-display">
            <span class="display-currency-label" id="label-origin-view">Indian Rupee</span>
          </div>
        </div>
        
        <div class="market-vector-container">
          <div class="vector-pulse-bead"></div>
          <div class="market-vector-arrow">&rarr;</div>
        </div>

        <div class="currency-profile-block text-right">
          <span class="meta-label">Targeted Destiny</span>
          <div class="currency-large-display style-right">
            <span class="display-currency-label" id="label-target-view">United States Dollar</span>
          </div>
        </div>
      </div>

      <div class="output-display-card">
        <div class="output-value-string" id="output-string-context">1 INR =</div>
        <div class="output-primary-result" id="output-calc-target">0.0120 <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">USD</span></div>
      </div>
    `;

    const srcSelect = getEl("source-currency");
    const tgtSelect = getEl("target-currency");
    if (srcSelect && tgtSelect) {
      srcSelect.value = "INR";
      tgtSelect.value = "USD";
    }
  },

  bindModuleEvents() {
    const trigger = getEl("calculate-trigger");
    trigger?.addEventListener("click", () => this._executeExchangeCalculation());
    this._executeExchangeCalculation();
  },

  _executeExchangeCalculation() {
    const amountInput = getEl("convert-amount");
    const srcSelect = getEl("source-currency");
    const tgtSelect = getEl("target-currency");
    const resultDisplay = getEl("output-calc-target");
    const stringDisplay = getEl("output-string-context");

    if (!amountInput || !srcSelect || !tgtSelect || !resultDisplay || !stringDisplay) return;

    const amount = parseFloat(amountInput.value) || 0;
    const src = srcSelect.value;
    const tgt = tgtSelect.value;

    getEl("label-origin-view").textContent = srcSelect.options[srcSelect.selectedIndex].text.split(" — ")[1]?.split(" (")[0] || src;
    getEl("label-target-view").textContent = tgtSelect.options[tgtSelect.selectedIndex].text.split(" — ")[1]?.split(" (")[0] || tgt;

    const rateInUSD = this._usdExchangeRates[src];
    const rateTargetUSD = this._usdExchangeRates[tgt];
    
    let totalValue = amount;
    if (src !== tgt && rateInUSD && rateTargetUSD) {
      totalValue = amount * (rateTargetUSD / rateInUSD);
    }

    const abbreviatedIn = this._abbreviateNumber(amount);
    const abbreviatedOut = this._abbreviateNumber(totalValue);

    stringDisplay.textContent = `${abbreviatedIn} ${src} =`;
    resultDisplay.innerHTML = `${abbreviatedOut} <span style="font-size: 1.2rem; font-weight:600; color: var(--text-muted);">${tgt}</span>`;
  }
};

export default destinationsModule;