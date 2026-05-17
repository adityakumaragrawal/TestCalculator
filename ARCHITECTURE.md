# AURA_ENGINE — Architecture Handoff
### CLAUDE_ARCHITECT_AGENT · Layer 1 Complete
---

## What Was Built

```
src/
├── app.js                              ✅ Core engine
├── utils/helpers.js                    ✅ Utility belt
└── modules/
    ├── age/age.js                      ✅ Age Calculator
    ├── time/time.js                    ✅ Time Converter
    └── destinations/destinations.js   ✅ Destination Ideas
```

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        app.js                           │
│                                                         │
│  APP_STATE (sealed)    AURA_BUS (pub/sub)               │
│  AURA_ROUTER (hash)    AURA_THEME (dark/light)          │
│                                                         │
│  activateModule(key)   → lazy import → lifecycle        │
└──────────┬──────────────────────────────────────────────┘
           │ dynamic import (lazy, cached)
     ┌─────┴──────┐
     │            │
  Module A     Module B …
  (age.js)    (time.js)
     │
     └── utils/helpers.js  (pure functions, no state)
```

---

## APP_STATE Contract

```js
const APP_STATE = Object.seal({
  currentTheme:    "dark",          // "dark" | "light"
  currentModule:   null,            // "age" | "time" | "destinations"
  currentTimezone: "Asia/Kolkata",  // IANA tz string
  appVersion:      "1.0.0",
});
```
> `Object.seal()` — keys are frozen. Values are mutable. No new keys allowed.

---

## Event Bus — AURA_BUS

All cross-module communication goes through the bus. No module imports another module.

| Event | Emitted by | Payload |
|---|---|---|
| `app:ready` | app.js boot | `appVersion` |
| `module:activated` | activateModule() | `moduleKey` |
| `module:deactivated` | activateModule() | `moduleKey` |
| `module:error` | any module | `{ module, message }` |
| `theme:changed` | AURA_THEME | `"dark" \| "light"` |
| `timezone:changed` | time.js | `ianaString` |
| `age:calculated` | age.js | `{ age, stats }` |
| `time:converted` | time.js | `ConversionResult` |
| `destinations:filtered` | destinations.js | `{ count, filters }` |
| `destinations:selected` | destinations.js | `DestinationRecord` |

**Subscribe example (for GPT/Gemini layers):**
```js
import { AURA_BUS } from "./app.js";
AURA_BUS.on("age:calculated", ({ age, stats }) => { /* update UI */ });
```

---

## Module Lifecycle Contract

Every module **must** export these five members:

```js
export default {
  moduleConfig,        // Object.freeze({ id, label, icon, ...domIds })
  moduleState,         // Object.seal({ initialized, ...mutableState })
  initializeModule(),  // called ONCE — build indices, one-time setup
  renderModule(),      // called on every activation — idempotent DOM write
  bindModuleEvents(),  // attach listeners; collect teardown handles
  teardownModule(),    // remove all listeners, cancel timers/rAF
}
```

**Activation sequence (app.js orchestrates):**
```
1. activateModule("age")
2.   → teardownModule() on previous module
3.   → lazy import age.js  (skipped if cached)
4.   → initializeModule()  (skipped if already initialized)
5.   → renderModule()
6.   → bindModuleEvents()
```

---

## Shared DOM IDs (FROZEN — do not rename)

```
id="age-result"              ← age module result area
id="time-input"              ← time module datetime input
id="destination-container"   ← destinations card grid
```

Additional IDs used by modules (GPT layer must honour):

| Module | ID | Role |
|---|---|---|
| age | `age-input` | date input |
| age | `age-calculate-btn` | trigger button |
| time | `time-from-select` | from TZ select |
| time | `time-to-select` | to TZ select |
| time | `time-result` | output area |
| time | `time-swap-btn` | swap button |
| time | `time-live-clock` | live clock display |
| destinations | `destination-search` | search input |
| destinations | `destination-category` | category filter |
| destinations | `destination-sort` | sort select |

---

## Data Object Shape (per spec §12)

```ts
interface DestinationRecord {
  id:          string;   // "d01" … "d15"
  type:        string;   // "beach" | "city" | "mountain" | "desert" | "cultural"
  title:       string;
  description: string;
  image:       string;   // filename under assets/destinations/
  category:    string;   // "tropical" | "urban" | "adventure" | "cultural" | "coastal"
}
```

---

## Key Algorithms

### calculateAge — O(1), integer arithmetic
Calendar subtraction with borrow propagation. No `Date.parse` float drift.
Derived stats (weeks, months, next birthday) computed in one pass.

### convertTimezone — O(1), DST-correct
Delegates entirely to `Intl.DateTimeFormat`. No manual offset tables.
Handles all DST transitions automatically.

### filterDestinations — O(n log n)
Single filter pass + one in-place sort. No intermediate arrays.
Composable: category AND query filters evaluated in one predicate.

### Destination index — O(1) lookup
`Map<id, DestinationRecord>` built once at `initializeModule()`.
Card click uses event delegation (1 listener on container, not N on cards).

### Live clock — rAF-driven, no drift
`requestAnimationFrame` loop compares `getSeconds()` — updates DOM only on
second boundary. Cancels cleanly in `teardownModule()`.

---

## Utils Public API (helpers.js)

```js
// DOM
getEl(id, root?)           // throws if missing — fails loudly
getEls(ids[])              // batch selector → frozen map
setHTML(el, html)          // basic XSS guard (strips <script>)

// Date/Time
calculateAge(birthdate, refDate?)
convertTimezone(input, fromTZ, toTZ)
getTimezoneOffsetDiff(tzA, tzB, at?)

// Data
filterDestinations(data, { category, query, sortBy })
groupBy(arr, key)          // → Map (insertion-order preserved)
memoize(fn)                // Map-backed, JSON key
debounce(fn, wait?)        // 300ms default

// Validation
validateBirthdate(value)   // → { valid, error? }
isValidTimezone(tz)        // → boolean
```

---

## Merge Order (per spec §13)

| Layer | Agent | Responsibility |
|---|---|---|
| **1 — Architecture** | CLAUDE_ARCHITECT_AGENT | ✅ This layer — logic, state, algorithms |
| **2 — Functionality** | GPT Agent | HTML shell, form wiring, modal logic |
| **3 — Styling** | Gemini Agent | CSS variables, glassmorphism, animations |

### GPT Agent Instructions
- Honour all DOM IDs in the table above
- Subscribe to AURA_BUS events for reactive UI updates
- Call `AURA_ROUTER.navigate(key)` for nav links
- Call `AURA_THEME.toggleTheme()` for theme toggle
- Do NOT re-implement calculateAge, convertTimezone, or filterDestinations
- Import from `../../utils/helpers.js` for any new logic needs

### Gemini Agent Instructions
- All colours via CSS variables on `:root` / `[data-theme="dark"]`
- Class names follow BEM: `block__element--modifier`
- Do NOT add `style=""` attributes inline
- Animate via CSS transitions/keyframes on class toggles
- Target `.destination-card`, `.age-result__*`, `.time-result__*` for styling

---

## Naming Conventions (enforced)

| Context | Convention | Example |
|---|---|---|
| JS variables/functions | camelCase | `moduleState`, `calculateAge()` |
| HTML IDs | kebab-case | `age-result`, `time-input` |
| CSS properties | variables | `var(--color-primary)` |
| DOM element refs | El/Btn/Input/Card/Container/Modal suffix | `resultEl`, `swapBtn` |
| Functions | verb + subject | `renderDestinationCards()`, `bindModuleEvents()` |
| Engine names | SCREAMING_SNAKE | `AURA_ENGINE`, `AURA_BUS`, `APP_STATE` |
