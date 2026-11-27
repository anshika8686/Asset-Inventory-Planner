
const rawAssetConfig = {
  "Circuit Breaker": [
    ["SF6 gas density / pressure", "per mfr", "Gas leakage", false, "manufacturer", "Above alarm setpoint", "At or below alarm setpoint", "At or below lockout setpoint", "Only the alarm/lockout structure is sourced. Numeric setpoints are manufacturer-specific and must be entered per asset.", "Density-monitor description in US patent 9991064."],

    ["SF6 moisture / dew point", "deg C frost point", "Insulation degradation / dielectric strength", true, "secondary", "Frost point below -5", "Not provided in source", "Frost point above -5", "Historic CIGRE frost-point limit. May not suit all ambient conditions.", "CIGRE SF6 Measurement Guide - Scribd."],

    ["Partial discharge (PD)", "pC", "Dielectric discharge", false, "none", "", "", "", "Not found.", "No verified numerical threshold found."],

    ["Contact temperature / hotspot", "deg C", "Thermal overload", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Contact resistance", "uOhm", "Contact deterioration", false, "manufacturer", "", "", "", "Manufacturer-specific. Manuals list the test; no values seen.", "No verified numerical threshold found."],

    ["Operating time / mechanism vibration", "ms", "Mechanical degradation", false, "manufacturer", "", "", "", "Manufacturer-specific. No values seen.", "No verified numerical threshold found."]
  ],

  "Power Cable": [
    [
      "Tan delta: standard deviation at U0 (PE/XLPE/TRXLPE)",
      "1e-3", "Insulation degradation", true, "secondary",
      "< 0.1", "0.1 to 0.5", "> 0.5",
      "IEEE 400.2-2013, service-aged PE-based insulation, tested at 0.1 Hz. Use the worst category across the three tan delta features.",
      "Jicable 2019, paper C1-6, citing IEEE Std 400.2-2013.",
      [
        { condition: "Normal", min: null, max: 0.1 },
        { condition: "Caution", min: 0.1, max: 0.5 },
        { condition: "Critical", min: 0.5, max: null }
      ]
    ],

    [
      "Tan delta: tip-up (1.5U0 - 0.5U0) (PE/XLPE/TRXLPE)",
      "1e-3", "Insulation degradation", true, "secondary",
      "< 5", "5 to 80", "> 80",
      "Same IEEE 400.2-2013 basis as above.",
      "Jicable 2019, paper C1-6.",
      [
        { condition: "Normal", min: null, max: 5 },
        { condition: "Caution", min: 5, max: 80 },
        { condition: "Critical", min: 80, max: null }
      ]
    ],

    [
      "Tan delta: value at U0 (PE/XLPE/TRXLPE)",
      "1e-3", "Insulation degradation", true, "secondary",
      "< 4", "4 to 50", "> 50",
      "Same IEEE 400.2-2013 basis as above.",
      "Jicable 2019, paper C1-6.",
      [
        { condition: "Normal", min: null, max: 4 },
        { condition: "Caution", min: 4, max: 50 },
        { condition: "Critical", min: 50, max: null }
      ]
    ],

    [
      "Tan delta: standard deviation at U0 (EPR / filled)",
      "1e-3", "Insulation degradation", true, "secondary",
      "< 0.1", "0.1 to 0.8", "> 0.8",
      "Mineral-filled insulation (EPR). Excerpt only; verify against IEEE 400.2.",
      "NEETRAC (Georgia Tech) CDFI brochure.",
      [
        { condition: "Normal", min: null, max: 0.1 },
        { condition: "Caution", min: 0.1, max: 0.8 },
        { condition: "Critical", min: 0.8, max: null }
      ]
    ],

    [
      "Tan delta: tip-up (EPR / filled)",
      "1e-3", "Insulation degradation", true, "secondary",
      "< 2.0", "2.0 to 40.0", "> 40.0",
      "Mineral-filled insulation (EPR). Excerpt only; verify against IEEE 400.2.",
      "NEETRAC (Georgia Tech) CDFI brochure.",
      [
        { condition: "Normal", min: null, max: 2.0 },
        { condition: "Caution", min: 2.0, max: 40.0 },
        { condition: "Critical", min: 40.0, max: null }
      ]
    ],

    ["Tan delta (PILC)", "1e-3", "Insulation degradation", false, "none", "", "", "", "PILC criteria not retrieved.", "No verified numerical threshold found."],

    ["Conductor temperature", "deg C", "Overheating", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Joint / termination hotspot temperature", "deg C", "Overheating", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Partial discharge magnitude", "pC", "Insulation degradation", false, "none", "", "", "", "Not found.", "No verified numerical threshold found."],

    ["PD inception / extinction voltage (PDIV / PDEV)", "kV", "Insulation degradation", false, "none", "", "", "", "Not found.", "No verified numerical threshold found."],

    ["Sheath current", "A", "Cable failure / sheath fault", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."]
  ],

  "Transformer": [
    ["Dissolved Gas Analysis (H2, CH4, C2H6, C2H4, C2H2, CO, CO2)", "ppm", "Electrical / thermal stress", false, "secondary", "Status 1 (probably normal)", "Status 2 (possibly abnormal)", "Status 3 (probably abnormal)", "IEEE C57.104-2019 uses four tables per gas. Cut-off values vary by gas, age and type and were not obtained. Engineer assessment is required.", "Hosseini & Stewart, ISH 2023, IEEE C57.104-2019 DGA methodology."],

    ["Bushing tan delta / power factor (C1)", "%", "Electrical stress (bushing insulation)", true, "secondary", "<= 0.5", "Not provided in source", "> 0.5", "Acceptance limit for oil-impregnated paper bushings. Not confirmed for other bushing types.", "Transformers Magazine 7(3), 2020."],

    ["Bushing capacitance change vs benchmark", "%", "Electrical / mechanical stress", true, "secondary", "Below chosen action limit", "Not provided in source", "At or above action limit (most users: 5-10 %)", "Field practice, not a standard limit. Engineer selects a value within 5-10 %.", "Transformers Magazine 7(3), 2020."],

    ["Oil breakdown voltage", "kV", "Electrical stress", false, "none", "", "", "", "IEC 60422 and IEEE C57.106 cover this test; limit tables not accessible in open sources.", "No verified numerical threshold found."],

    ["Oil moisture content", "ppm", "Insulation degradation", false, "none", "", "", "", "Limit tables not accessible in open sources.", "No verified numerical threshold found."],

    ["Oil acidity", "mg KOH/g", "Oil ageing", false, "none", "", "", "", "Limit tables not accessible in open sources.", "No verified numerical threshold found."],

    ["Winding hotspot temperature", "deg C", "Thermal stress", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Partial discharge", "pC", "Electrical stress", false, "none", "", "", "", "Not found.", "No verified numerical threshold found."],

    ["OLTC condition (motor current, vibration, acoustic)", "various", "Mechanical stress", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."]
  ],

  "Rotating Machine": [
    [
      "Vibration velocity - Group 1 rigid (>300 kW or shaft height >=315 mm)",
      "mm/s RMS", "Mechanical abnormality", true, "secondary",
      "< 4.5 (zones A,B)", "4.5 to 7.1 (zone C)", "> 7.1 (zone D)",
      "ISO 20816-3, RMS velocity on bearing housing, 10-1000 Hz. Vendor summary used; verify against the purchased standard.",
      "Fabrico, ISO 20816 vibration severity zones.",
      [
        { condition: "Normal", min: null, max: 4.5 },
        { condition: "Caution", min: 4.5, max: 7.1 },
        { condition: "Critical", min: 7.1, max: null }
      ]
    ],

    [
      "Vibration velocity - Group 2 rigid (15-300 kW or shaft height 160-315 mm)",
      "mm/s RMS", "Mechanical abnormality", true, "secondary",
      "< 2.8", "2.8 to 4.5", "> 4.5",
      "ISO 20816-3. Vendor summary used; verify against the purchased standard.",
      "Fabrico, ISO 20816 vibration severity zones.",
      [
        { condition: "Normal", min: null, max: 2.8 },
        { condition: "Caution", min: 2.8, max: 4.5 },
        { condition: "Critical", min: 4.5, max: null }
      ]
    ],

    [
      "Vibration velocity - Group 1 flexible support",
      "mm/s RMS", "Mechanical abnormality", true, "secondary",
      "< 7.1", "7.1 to 11.0", "> 11.0",
      "ISO 20816-3. Vendor summary used; verify against the purchased standard.",
      "Fabrico, ISO 20816 vibration severity zones.",
      [
        { condition: "Normal", min: null, max: 7.1 },
        { condition: "Caution", min: 7.1, max: 11.0 },
        { condition: "Critical", min: 11.0, max: null }
      ]
    ],

    [
      "Vibration velocity - Group 2 flexible support",
      "mm/s RMS", "Mechanical abnormality", true, "secondary",
      "< 4.5", "4.5 to 7.1", "> 7.1",
      "ISO 20816-3. Vendor summary used; verify against the purchased standard.",
      "Fabrico, ISO 20816 vibration severity zones.",
      [
        { condition: "Normal", min: null, max: 4.5 },
        { condition: "Caution", min: 4.5, max: 7.1 },
        { condition: "Critical", min: 7.1, max: null }
      ]
    ],

    ["Winding temperature rise (resistance method)", "K above 40 deg C ambient", "Thermal abnormality", true, "secondary", "Rise within class limit: A 60, B 80, F 105, H 125", "Not provided in source", "Rise above class limit", "Service factor 1.0, low-voltage random-wound machines, 40 deg C ambient. Record insulation class per asset. High-voltage machines not covered.", "NEMA, NEMA motor standards vs IEC motor standards."],

    ["Bearing temperature", "deg C", "Mechanical / thermal abnormality", false, "none", "", "", "", "Not found.", "No verified numerical threshold found."],

    ["Partial discharge", "pC", "Electrical abnormality", false, "none", "", "", "", "No universal numerical limit found.", "No verified numerical threshold found."],

    ["Motor current", "A", "Electrical abnormality", false, "none", "", "", "", "Not found.", "No verified numerical threshold found."]
  ],

  "Switchgear": [
    ["SF6 gas density / pressure", "per mfr", "Gas leakage", false, "manufacturer", "Above alarm setpoint", "At or below alarm setpoint", "At or below lockout setpoint", "Only the alarm/lockout structure is sourced. Numeric setpoints are manufacturer-specific and must be entered per asset.", "Density-monitor description in US patent 9991064."],

    ["SF6 moisture / dew point", "deg C frost point", "Insulation degradation / dielectric strength", true, "secondary", "Frost point below -5", "Not provided in source", "Frost point above -5", "Historic CIGRE frost-point limit. May not suit all ambient conditions.", "CIGRE SF6 Measurement Guide - Scribd."],

    ["Busbar / connection hotspot temperature", "deg C", "Thermal stress", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Breaker contact temperature", "deg C", "Thermal stress", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Bushing capacitance / tan delta", "% / pF", "Electrical stress", false, "none", "", "", "", "Transformer-bushing criterion not confirmed for switchgear, so not carried over.", "No verified numerical threshold found."],

    ["Partial discharge", "pC", "Electrical stress", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Arc detection", "-", "Electrical / thermal stress", false, "none", "", "", "", "Not yet searched.", "Not yet searched in first research pass."],

    ["Breaker operating time", "ms", "Mechanical stress", false, "manufacturer", "", "", "", "Manufacturer-specific. No values seen.", "No verified numerical threshold found."]
  ]
};


// Determine the assessment mode.

function getAssessmentMode(numericThresholds, sourceType) {
  if (numericThresholds.length > 0) {
    return "criterion-available";
  }

  if (sourceType === "manufacturer") {
    return "engineer-supplied";
  }

  return "not-assessed";
}


// Convert each row into a parameter object.

function createParameter(row) {
  const [
    parameter,
    unit,
    faultIndicated,
    verified,
    sourceType,
    normal,
    caution,
    critical,
    basisAndApplicability,
    source,
    numericThresholds = []
  ] = row;

  return {
    parameter,
    unit,
    faultIndicated,

    assessmentMode: getAssessmentMode(
      numericThresholds,
      sourceType
    ),

    numericThresholds,
    basisAndApplicability,
    source
  };
}


// Create the final asset configuration.

const assetConfig = Object.fromEntries(
  Object.entries(rawAssetConfig).map(([assetType, rows]) => [
    assetType,
    rows.map(createParameter)
  ])
);

module.exports = assetConfig;
