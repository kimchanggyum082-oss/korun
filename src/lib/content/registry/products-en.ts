/**
 * English defaults for the products group — the EN counterpart of the data-file
 * Korean defaults, keyed by content key (MCell's `content-en.ts` model).
 * Keys absent here fall back to the Korean default. Media keys are
 * language-neutral and intentionally omitted, as are copy keys whose data-file
 * value is already English (galleryLabel, spec model names).
 */
export const PRODUCTS_EN: Record<string, string> = {
  // ── Page / block titles (Korean defaults in the data file) ──
  "products.21.navTitle": "Valve Gate Systems",
  "products.21.block.0.title": "Valve Gate Systems",
  "products.21.block.0.application.0.title": "Valve System of Applications",
  "products.21.block.0.application.1.title":
    "KODE-Valve Systems Nozzle Series Selection",
  "products.21.block.0.application.2.title":
    "KODE-Valve Systems Nozzle Tip Types",
  "products.22.navTitle": "Open Gate Systems",
  "products.22.block.0.title": "Open Gate Systems",
  "products.22.block.0.application.0.title": "Open System of Applications",
  "products.22.block.0.application.1.title":
    "KODE-Open Systems Nozzle Series Selection",
  "products.22.block.0.application.2.title":
    "KODE-Open Systems Nozzle Tip Types",
  "products.23.navTitle": "Single Nozzle",
  "products.23.block.0.title": "Single Valve Nozzles",
  "products.23.block.0.application.0.title":
    "KOSI-Single Valve Nozzle of Applications",
  "products.23.block.1.application.0.title":
    "KODE-Single Open Nozzle of Applications",
  "products.24.navTitle": "Time & Temperature Controllers",
  "products.24.block.0.title": "Time & Temperature Controllers",

  // ── 21 · Valve Gate Systems ──
  "products.21.description":
    "KORUN Valve Gate Systems open and close the gate. Using pneumatic pressure, they are widely applied to automotive, electronics, medical, logistics and construction material products.",
  "products.21.block.0.eyebrow":
    "A valve gate system that opens and closes the gate",
  "products.21.block.0.introTitle": "KORUN Valve Gate Systems",
  "products.21.block.0.introText":
    "By opening and closing the gate using pneumatic pressure, they are widely and diversely applied to everything from automotive, electronics and medical products to logistics and construction materials. The Hot Half System receives, machines, assembles, tests and delivers hot-runner related base plates as standard.",
  "products.21.block.0.tags":
    "Versatile applications\nClean gate marks\nDurable construction\nStable temperature control\nUser-friendly design",

  // ── 22 · Open Gate Systems ──
  "products.22.description":
    "KORUN Open Gate Systems are reliably applied across a wide range of products. From ultra-small to large products, they are designed with uniform thermal balance.",
  "products.22.block.0.eyebrow":
    "KORUN Open Gate Systems reliably applied across a wide range of products",
  "products.22.block.0.introTitle": "KORUN Open Gate Systems",
  "products.22.block.0.introText":
    "KORUN Open Gate Systems are reliably applied across a wide range of products, and are technically designed with uniform thermal balance from ultra-small to large products for diverse applications. The Hot Half System receives, machines, assembles, tests and delivers hot-runner related base plates as standard.",
  "products.22.block.0.tags":
    "Versatile applications\nDurable construction\nStable temperature control\nUser-friendly design",

  // ── 23 · Single Nozzle ──
  "products.23.description":
    "KORUN single valve nozzles with long life and stability, and single open nozzles adaptable to various resin types.",
  "products.23.block.0.eyebrow": "Long-lasting, stable single valve nozzles",
  "products.23.block.0.introTitle": "Single Valve Nozzles",
  "products.23.block.0.introText":
    "No separate air piping is required, and the cylinder is mounted externally for long O-ring life. The dual-cylinder structure provides stable piston thrust. A 3-zone heater delivers a uniform heat distribution. (Excellent for high-temperature injection resins.) The convenient assembly/disassembly structure makes maintenance easy.",
  "products.23.block.0.tags":
    "Versatile applications\nDurable construction\nStable temperature control\nUser-friendly design",
  "products.23.block.1.introTitle": "Single Open Nozzles",
  "products.23.block.1.introText":
    "There is no resin solidification at the existing nozzle head, they can be applied variously according to resin type, and they are designed with a structure that is easy to disassemble and assemble. From household goods to automotive parts, KORUN's advanced technology leads to cost savings for customers. KORUN's single nozzles can resolve our customers' difficulties.",
  "products.23.block.1.tags":
    "Versatile applications\nDurable construction\nStable temperature control\nAdaptable to various resin types",

  // ── 24 · Time & Temperature Controllers ──
  "products.24.description":
    "The KOTC-860 temperature controller with precise temperature control via a new PID algorithm, and the KOTS-800 sequence injection timer.",
  "products.24.block.0.eyebrow":
    "A system with precise temperature control via a new PID algorithm",
  "products.24.block.0.introTitle": "Temperature Controllers",
  "products.24.block.0.introBullets":
    "Precise temperature control with a new PID algorithm\nProtection against over-voltage input (wiring-error prevention) and various error detection functions\nTemperature correction (deviation and slope correction)\nBuilt-in triac damage-prevention algorithm\nProtection against power wiring errors, heater shorts, over-voltage/over-current, etc.\nCartridge-type mounted units ensure no impact on system operation when replacement is needed",
  "products.24.block.0.tags":
    "Precise temperature control\nVarious error detection\nUser-friendly design",
  "products.24.block.0.spec.row.0.label": "Input power",
  "products.24.block.0.spec.row.0.values":
    "3-phase 3-wire+E (4-wire) 220VAC 50/60Hz ±10%\n3-phase 4-wire+E (5-wire) 380VAC 50/60Hz ±10%",
  "products.24.block.0.spec.row.1.label": "Accuracy",
  "products.24.block.0.spec.row.1.values":
    "±0.3°C range 30~400°C (option 30~500°C)",
  "products.24.block.0.spec.row.2.label": "Control method",
  "products.24.block.0.spec.row.2.values":
    "Auto-tuning PID or manual PID control",
  "products.24.block.0.spec.row.3.label": "Thermocouple input",
  "products.24.block.0.spec.row.3.values": "Grounded or ungrounded type",
  "products.24.block.0.spec.row.4.label": "Thermocouple type",
  "products.24.block.0.spec.row.4.values": "IC (J) or CA (K) type",
  "products.24.block.0.spec.row.5.label": "Heater output",
  "products.24.block.0.spec.row.5.values": "240VAC, 15A per zone",
  "products.24.block.0.spec.row.6.label": "Number of zones",
  "products.24.block.0.spec.row.6.values": "1~60 zones (available on request)",
  "products.24.block.0.spec.row.7.label": "Alarm",
  "products.24.block.0.spec.row.7.values":
    "Heater open/short alarm\nFuse open notification\nTemperature upper/lower limit alarm\nThe Best Hot Runner Controller\nCurrent upper/lower limit alarm\nThermocouple open, short and reverse-connection alarm",
  "products.24.block.1.introTitle": "Sequence Injection Timer",
  "products.24.block.1.introBullets":
    "Output voltage selection: choose from DC 24V, AC 110V or AC 220V\nOperation mode: A/B/C modes can be applied according to the user environment\nInput signal: Free voltage (automatically detects and recognizes the molding machine's output power)",
  "products.24.block.1.tags":
    "Free voltage input\nA/B/C operation modes\nOutput voltage selection",
  "products.24.block.1.spec.row.0.label": "Main power",
  "products.24.block.1.spec.row.0.values":
    "Single-phase AC 90~250V (50/60Hz), automatic input power detection",
  "products.24.block.1.spec.row.1.label": "Injection signal input support",
  "products.24.block.1.spec.row.1.values": "DC 24V / AC 110V / AC 220V",
  "products.24.block.1.spec.row.2.label": "Solenoid valve power",
  "products.24.block.1.spec.row.2.values": "DC 24V, AC 220V",
  "products.24.block.1.spec.row.3.label": "Solenoid valve capacity",
  "products.24.block.1.spec.row.3.values":
    "DC24V & AC220V / Total 2A (TS-800)\nDC24V & AC 220V / Each 1.2A (TS-801)",
  "products.24.block.1.spec.row.4.label": "Operating environment",
  "products.24.block.1.spec.row.4.values": "-10~50°C",
  "products.24.block.1.spec.row.5.label": "Time range",
  "products.24.block.1.spec.row.5.values": "9.99/99.9/999",
  "products.24.block.1.spec.row.6.label": "Mode",
  "products.24.block.1.spec.row.6.values": "A/B/C mode",
  "products.24.block.1.spec.row.7.label": "Number of gates",
  "products.24.block.1.spec.row.7.values":
    "TS-800 & 801: 4/6/8/12/18/24 gates\nTS-780: 8 gates\nTS-910: 1~16 gates (option 40 gates)",
};
