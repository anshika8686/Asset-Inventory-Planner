//UNSTRUCTURED INFO=>STRUCTURED INFO
const rawAssetConfig = {
  "Circuit Breaker": [
    ["SF6 gas density / pressure", "per mfr", "Gas leakage", false, "manufacturer", "Above alarm setpoint", "At or below alarm setpoint", "At or below lockout setpoint", "Only the alarm/lockout structure is sourced. Numeric setpoints are manufacturer-specific and must be entered per asset.", "Density-monitor description in US patent 9991064 (alarm/lockout states; levels vary by application) - image-ppubs.uspto.gov (patent 9991064)"],

    ["SF6 moisture / dew point", "deg C frost point", "Insulation degradation / dielectric strength", true, "secondary", "Frost point below -5", "Not provided in source", "Frost point above -5", "Historic CIGRE frost-point limit; the guide says it may not suit all ambient conditions. Direction (drier is better) is the analyst's reading. A 500 ppmv factory limit appears in one 150 kV GIS case study - manufacturer-specific, not used here.", "CIGRE SF6 Measurement Guide (copy on Scribd; brochure number unconfirmed) - scribd.com/document/391173122/723-web"],

    ["Partial discharge (PD)", "pC", "Dielectric discharge", false, "none", "", "", "", "Not found", "No verified numerical threshold found in the reviewed documentation."],

    ["Contact temperature / hotspot", "deg C", "Thermal overload", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Contact resistance", "uOhm", "Contact deterioration", false, "manufacturer", "", "", "", "Manufacturer-specific. Manuals list the test; no values seen.", "No verified numerical threshold found in the reviewed documentation."],

    ["Operating time / mechanism vibration", "ms", "Mechanical degradation", false, "manufacturer", "", "", "", "Manufacturer-specific. No values seen.", "No verified numerical threshold found in the reviewed documentation."]
  ],

  "Power Cable": [
    ["Tan delta: standard deviation at U0 (PE/XLPE/TRXLPE)", "1e-3", "Insulation degradation", true, "secondary", "< 0.1", "0.1 to 0.5", "> 0.5", "IEEE 400.2-2013, service-aged PE-based insulation, tested at 0.1 Hz. Source labels: no action required / further study advised / action required. Use WORST category across the three tan delta features.", "Jicable 2019, paper C1-6 (VLF tan delta), citing IEEE Std 400.2-2013 - jicable.org/TOUT_JICABLE_FIRST_PAGE/2019/2019-C1-6_page1.pdf"],

    ["Tan delta: tip-up (1.5U0 - 0.5U0) (PE/XLPE/TRXLPE)", "1e-3", "Insulation degradation", true, "secondary", "< 5", "5 to 80", "> 80", "Same as above.", "Jicable 2019, paper C1-6 (VLF tan delta), citing IEEE Std 400.2-2013 - jicable.org/TOUT_JICABLE_FIRST_PAGE/2019/2019-C1-6_page1.pdf"],

    ["Tan delta: value at U0 (PE/XLPE/TRXLPE)", "1e-3", "Insulation degradation", true, "secondary", "< 4", "4 to 50", "> 50", "Same as above.", "Jicable 2019, paper C1-6 (VLF tan delta), citing IEEE Std 400.2-2013 - jicable.org/TOUT_JICABLE_FIRST_PAGE/2019/2019-C1-6_page1.pdf"],

    ["Tan delta: standard deviation at U0 (EPR / filled)", "1e-3", "Insulation degradation", true, "secondary", "< 0.1", "0.1 to 0.8", "> 0.8", "Mineral-filled insulation (EPR). Excerpt only - verify against IEEE 400.2.", "NEETRAC (Georgia Tech) CDFI brochure - neetrac.gatech.edu/files/2023/09/15-Brochures_with-Copyright.pdf (excerpt only; verify vs IEEE 400.2)"],

    ["Tan delta: tip-up (EPR / filled)", "1e-3", "Insulation degradation", true, "secondary", "< 2.0", "2.0 to 40.0", "> 40.0", "Mineral-filled insulation (EPR). Excerpt only - verify against IEEE 400.2.", "NEETRAC (Georgia Tech) CDFI brochure - neetrac.gatech.edu/files/2023/09/15-Brochures_with-Copyright.pdf (excerpt only; verify vs IEEE 400.2)"],

    ["Tan delta (PILC)", "1e-3", "Insulation degradation", false, "none", "", "", "", "PILC criteria not retrieved.", "No verified numerical threshold found in the reviewed documentation."],

    ["Conductor temperature", "deg C", "Overheating", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Joint / termination hotspot temperature", "deg C", "Overheating", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Partial discharge magnitude", "pC", "Insulation degradation", false, "none", "", "", "", "Not found", "No verified numerical threshold found in the reviewed documentation."],

    ["PD inception / extinction voltage (PDIV / PDEV)", "kV", "Insulation degradation", false, "none", "", "", "", "Not found", "No verified numerical threshold found in the reviewed documentation."],

    ["Sheath current", "A", "Cable failure / sheath fault", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."]
  ],

  "Transformer": [
    ["Dissolved Gas Analysis (H2, CH4, C2H6, C2H4, C2H2, CO, CO2)", "ppm", "Electrical / thermal stress", false, "secondary", "Status 1 ('probably normal')", "Status 2 ('possibly abnormal')", "Status 3 ('probably abnormal')", "IEEE C57.104-2019 uses 4 tables per gas: 90th pct level, 95th pct level, change vs previous sample, annualised rate. Worst gas sets overall status. Cut-off ppm values vary by gas, age and type and were NOT obtained - enter as engineer-supplied. Applies to mineral-oil transformers; Table 1 assumes no history and large transformers.", "Hosseini & Stewart, ISH 2023, 'Propagating uncertainty using IEEE Std C57.104-2019 DGA methodology' - strathprints.strath.ac.uk/89756"],

    ["Bushing tan delta / power factor (C1)", "%", "Electrical stress (bushing insulation)", true, "secondary", "<= 0.5", "Not provided in source", "> 0.5", "Acceptance limit for oil-impregnated paper bushings (IEEE C57.19.01-2017). Not confirmed for other bushing types.", "Transformers Magazine 7(3), 2020, 'Refining bushing power factor and capacitance analysis through statistics' - hrcak.srce.hr/file/352112"],

    ["Bushing capacitance change vs benchmark", "%", "Electrical / mechanical stress", true, "secondary", "Below chosen action limit", "Not provided in source", "At or above action limit (most users: 5-10 %)", "Field practice, not a standard limit. Engineer selects a value within 5-10 %.", "Transformers Magazine 7(3), 2020, 'Refining bushing power factor and capacitance analysis through statistics' - hrcak.srce.hr/file/352112"],

    ["Oil breakdown voltage", "kV", "Electrical stress", false, "none", "", "", "", "IEC 60422 and IEEE C57.106 cover this test; limit tables not accessible in open sources.", "No verified numerical threshold found in the reviewed documentation."],

    ["Oil moisture content", "ppm", "Insulation degradation", false, "none", "", "", "", "Limit tables not accessible in open sources.", "No verified numerical threshold found in the reviewed documentation."],

    ["Oil acidity", "mg KOH/g", "Oil ageing", false, "none", "", "", "", "Limit tables not accessible in open sources.", "No verified numerical threshold found in the reviewed documentation."],

    ["Winding hotspot temperature", "deg C", "Thermal stress", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Partial discharge", "pC", "Electrical stress", false, "none", "", "", "", "Not found", "No verified numerical threshold found in the reviewed documentation."],

    ["OLTC condition (motor current, vibration, acoustic)", "various", "Mechanical stress", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."]
  ],

  "Rotating Machine": [
    ["Vibration velocity - Group 1 rigid (>300 kW or shaft height >=315 mm)", "mm/s RMS", "Mechanical abnormality", true, "secondary", "< 4.5 (zones A,B)", "4.5 to 7.1 (zone C)", "> 7.1 (zone D)", "ISO 20816-3, RMS velocity on bearing housing, 10-1000 Hz. Zones A/B = unrestricted operation, C = limited-period operation, D = damage likely. Primary standard paywalled; vendor summary used. Another vendor page gave conflicting numbers and was not used - verify against the purchased standard.", "Fabrico, 'ISO 20816 vibration severity zones' (vendor summary of ISO 20816-3) - fabrico.io/blog/iso-20816-vibration-severity-zones/"],

    ["Vibration velocity - Group 2 rigid (15-300 kW or shaft height 160-315 mm)", "mm/s RMS", "Mechanical abnormality", true, "secondary", "< 2.8", "2.8 to 4.5", "> 4.5", "ISO 20816-3, RMS velocity on bearing housing, 10-1000 Hz. Zones A/B = unrestricted operation, C = limited-period operation, D = damage likely. Primary standard paywalled; vendor summary used. Another vendor page gave conflicting numbers and was not used - verify against the purchased standard.", "Fabrico, 'ISO 20816 vibration severity zones' (vendor summary of ISO 20816-3) - fabrico.io/blog/iso-20816-vibration-severity-zones/"],

    ["Vibration velocity - Group 1 flexible support", "mm/s RMS", "Mechanical abnormality", true, "secondary", "< 7.1", "7.1 to 11.0", "> 11.0", "ISO 20816-3, RMS velocity on bearing housing, 10-1000 Hz. Zones A/B = unrestricted operation, C = limited-period operation, D = damage likely. Primary standard paywalled; vendor summary used. Another vendor page gave conflicting numbers and was not used - verify against the purchased standard.", "Fabrico, 'ISO 20816 vibration severity zones' (vendor summary of ISO 20816-3) - fabrico.io/blog/iso-20816-vibration-severity-zones/"],

    ["Vibration velocity - Group 2 flexible support", "mm/s RMS", "Mechanical abnormality", true, "secondary", "< 4.5", "4.5 to 7.1", "> 7.1", "ISO 20816-3, RMS velocity on bearing housing, 10-1000 Hz. Zones A/B = unrestricted operation, C = limited-period operation, D = damage likely. Primary standard paywalled; vendor summary used. Another vendor page gave conflicting numbers and was not used - verify against the purchased standard.", "Fabrico, 'ISO 20816 vibration severity zones' (vendor summary of ISO 20816-3) - fabrico.io/blog/iso-20816-vibration-severity-zones/"],

    ["Winding temperature rise (resistance method)", "K above 40 deg C ambient", "Thermal abnormality", true, "secondary", "Rise within class limit: A 60, B 80, F 105, H 125", "Not provided in source", "Rise above class limit", "Service factor 1.0, low-voltage random-wound machines, 40 deg C ambient. IEC thermal classes 105/130/155/180 deg C. Record insulation class per asset. High-voltage machines not covered.", "NEMA, 'NEMA motor standards vs IEC motor standards' - nema.org/docs/default-source/motor-and-generator-guides-and-resources-library/8-nema-motor-standards-vs-iec-motor-standards-v2.pdf"],

    ["Bearing temperature", "deg C", "Mechanical / thermal abnormality", false, "none", "", "", "", "Not found", "No verified numerical threshold found in the reviewed documentation."],

    ["Partial discharge", "pC", "Electrical abnormality", false, "none", "", "", "", "No universal numerical limit found", "No verified numerical threshold found in the reviewed documentation."],

    ["Motor current", "A", "Electrical abnormality", false, "none", "", "", "", "Not found", "No verified numerical threshold found in the reviewed documentation."]
  ],

  "Switchgear": [
    ["SF6 gas density / pressure", "per mfr", "Gas leakage", false, "manufacturer", "Above alarm setpoint", "At or below alarm setpoint", "At or below lockout setpoint", "Only the alarm/lockout structure is sourced. Numeric setpoints are manufacturer-specific and must be entered per asset.", "Density-monitor description in US patent 9991064 (alarm/lockout states; levels vary by application) - image-ppubs.uspto.gov (patent 9991064)"],

    ["SF6 moisture / dew point", "deg C frost point", "Insulation degradation / dielectric strength", true, "secondary", "Frost point below -5", "Not provided in source", "Frost point above -5", "Historic CIGRE frost-point limit; the guide says it may not suit all ambient conditions. Direction (drier is better) is the analyst's reading. A 500 ppmv factory limit appears in one 150 kV GIS case study - manufacturer-specific, not used here.", "CIGRE SF6 Measurement Guide (copy on Scribd; brochure number unconfirmed) - scribd.com/document/391173122/723-web"],

    ["Busbar / connection hotspot temperature", "deg C", "Thermal stress", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Breaker contact temperature", "deg C", "Thermal stress", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Bushing capacitance / tan delta", "% / pF", "Electrical stress", false, "none", "", "", "", "Transformer-bushing criterion not confirmed for switchgear, so not carried over.", "No verified numerical threshold found in the reviewed documentation."],

    ["Partial discharge", "pC", "Electrical stress", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Arc detection", "-", "Electrical / thermal stress", false, "none", "", "", "", "Not yet searched", "Not yet searched in first research pass."],

    ["Breaker operating time", "ms", "Mechanical stress", false, "manufacturer", "", "", "", "Manufacturer-specific. No values seen.", "No verified numerical threshold found in the reviewed documentation."]
  ]
};


// Convert the compact data into objects used by the application.

function getAssessmentMode(verified, sourceType) {
  if (verified) return "verified";

  if (sourceType === "manufacturer") {
    return "manufacture-specific";
  }

  return "not-assessed";
}

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
    source
  ] = row;

  const bands = [
    ["Normal", normal],
    ["Caution", caution],
    ["Critical", critical]
  ]
    .filter(([, sourceLabel]) => sourceLabel && sourceLabel !== "-")
    .map(([appCategory, sourceLabel]) => ({
      appCategory,
      sourceLabel
    }));

  return {
    parameter,
    unit,
    faultIndicated,
    assessmentMode: getAssessmentMode(verified, sourceType),
    verified,
    sourceType,
    bands,
    basisAndApplicability,
    source
  };
}

const assetConfig = Object.fromEntries(
  Object.entries(rawAssetConfig).map(([assetType, rows]) => [
    assetType,
    rows.map(createParameter)
  ])
);
// every array->structured obejct

module.exports = assetConfig;
