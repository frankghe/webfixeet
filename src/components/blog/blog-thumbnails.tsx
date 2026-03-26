import type React from "react"

// ─────────────────────────────────────────────────────────────────────────────
// Post 1: streamlining-construction-defect-tracking
// Theme: Spreadsheet/paper → digital tablet with checklist
// ─────────────────────────────────────────────────────────────────────────────
function ThumbnailDefectTracking() {
  return (
    <svg
      viewBox="0 0 480 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-scd" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M 16 0 L 0 0 0 16"
            stroke="var(--muted-foreground)"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="480" height="270" fill="url(#grid-scd)" />

      {/* ── LEFT: Crossed-out paper/spreadsheet ── */}

      {/* Paper shadow */}
      <rect x="42" y="47" width="132" height="168" rx="5" fill="var(--muted)" fillOpacity="0.6" />
      {/* Paper body */}
      <rect
        x="40"
        y="45"
        width="132"
        height="168"
        rx="5"
        stroke="var(--foreground)"
        strokeWidth="1.8"
        fill="var(--muted)"
        fillOpacity="0.25"
      />
      {/* Paper top fold corner */}
      <path
        d="M148 45 L172 45 L172 69 Z"
        stroke="var(--foreground)"
        strokeWidth="1.2"
        fill="var(--muted)"
        fillOpacity="0.4"
      />
      <path d="M148 45 L172 69 L148 69 Z" stroke="var(--foreground)" strokeWidth="1" fill="var(--muted)" fillOpacity="0.6" />

      {/* Spreadsheet grid lines */}
      <line x1="40" y1="75" x2="172" y2="75" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="40" y1="100" x2="172" y2="100" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="40" y1="125" x2="172" y2="125" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="40" y1="150" x2="172" y2="150" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="40" y1="175" x2="172" y2="175" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.4" />

      <line x1="88" y1="45" x2="88" y2="213" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="130" y1="45" x2="130" y2="213" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Row content — text placeholders */}
      {/* Header row */}
      <rect x="50" y="61" width="28" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.5" />
      <rect x="95" y="61" width="22" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.5" />
      <rect x="137" y="61" width="18" height="5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.5" />

      {[87, 112, 137, 162, 187].map((y, i) => (
        <g key={i}>
          <rect x="50" y={y} width={20 + (i % 3) * 6} height="4" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.3" />
          <rect x="95" y={y} width={14 + (i % 2) * 8} height="4" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
          <rect x="137" y={y} width={16 + (i % 3) * 4} height="4" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
        </g>
      ))}

      {/* Big red cross-out X over the paper */}
      <line
        x1="50"
        y1="55"
        x2="162"
        y2="203"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      <line
        x1="162"
        y1="55"
        x2="50"
        y2="203"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />

      {/* "OLD WAY" label */}
      <text
        x="106"
        y="232"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="var(--muted-foreground)"
        letterSpacing="1"
        fontWeight="600"
      >
        OLD WAY
      </text>

      {/* ── CENTER: Arrow transition ── */}
      <path
        d="M188 135 C210 135 220 135 236 135"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M230 128 L238 135 L230 142"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* ── RIGHT: Digital tablet/phone with checklist ── */}

      {/* Tablet shadow */}
      <rect x="252" y="37" width="182" height="188" rx="13" fill="var(--muted)" fillOpacity="0.6" />
      {/* Tablet body */}
      <rect
        x="250"
        y="35"
        width="182"
        height="188"
        rx="13"
        stroke="var(--foreground)"
        strokeWidth="2"
        fill="var(--muted)"
        fillOpacity="0.15"
      />
      {/* Screen bezel */}
      <rect
        x="262"
        y="50"
        width="158"
        height="158"
        rx="6"
        stroke="var(--foreground)"
        strokeWidth="1"
        strokeOpacity="0.3"
        fill="var(--muted)"
        fillOpacity="0.1"
      />
      {/* Home button */}
      <rect x="319" y="229" width="44" height="8" rx="4" fill="var(--muted-foreground)" fillOpacity="0.3" />

      {/* App header bar */}
      <rect x="262" y="50" width="158" height="26" rx="6" fill="var(--muted-foreground)" fillOpacity="0.12" />
      <rect x="262" y="64" width="158" height="12" fill="var(--muted-foreground)" fillOpacity="0.12" />
      <text
        x="341"
        y="67"
        textAnchor="middle"
        fontSize="8.5"
        fontFamily="sans-serif"
        fill="var(--foreground)"
        fontWeight="700"
        letterSpacing="0.4"
      >
        Defect Tracker
      </text>

      {/* Divider */}
      <line x1="262" y1="76" x2="420" y2="76" stroke="var(--foreground)" strokeWidth="0.8" strokeOpacity="0.25" />

      {/* Checklist item 1 — done */}
      <rect x="270" y="84" width="142" height="26" rx="5" fill="var(--muted)" fillOpacity="0.35" />
      <circle cx="284" cy="97" r="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
      <polyline
        points="279,97 283,101 290,92"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="298" y="93" width="60" height="4.5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.4" />
      <rect x="298" y="100" width="38" height="3.5" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
      <rect x="366" y="91" width="36" height="13" rx="6.5" fill="var(--accent)" fillOpacity="0.18" />
      <text x="384" y="100.5" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fill="var(--accent)" fontWeight="700">
        DONE
      </text>

      {/* Checklist item 2 — in progress */}
      <rect x="270" y="118" width="142" height="26" rx="5" fill="var(--muted)" fillOpacity="0.35" />
      <circle
        cx="284"
        cy="131"
        r="8"
        stroke="var(--muted-foreground)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="16 10"
      />
      <rect x="298" y="127" width="52" height="4.5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.4" />
      <rect x="298" y="134" width="33" height="3.5" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
      <rect x="359" y="125" width="42" height="13" rx="6.5" stroke="var(--muted-foreground)" strokeWidth="0.8" fill="none" />
      <text x="380" y="134.5" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fill="var(--muted-foreground)" fontWeight="600">
        IN PROG
      </text>

      {/* Checklist item 3 — done */}
      <rect x="270" y="152" width="142" height="26" rx="5" fill="var(--muted)" fillOpacity="0.35" />
      <circle cx="284" cy="165" r="8" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.5" />
      <polyline
        points="279,165 283,169 290,160"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="298" y="161" width="56" height="4.5" rx="2" fill="var(--muted-foreground)" fillOpacity="0.4" />
      <rect x="298" y="168" width="40" height="3.5" rx="1.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
      <rect x="366" y="159" width="36" height="13" rx="6.5" fill="var(--accent)" fillOpacity="0.18" />
      <text x="384" y="168.5" textAnchor="middle" fontSize="7" fontFamily="sans-serif" fill="var(--accent)" fontWeight="700">
        DONE
      </text>

      {/* Progress bar */}
      <rect x="270" y="190" width="142" height="5" rx="2.5" fill="var(--muted-foreground)" fillOpacity="0.15" />
      <rect x="270" y="190" width="92" height="5" rx="2.5" fill="var(--accent)" fillOpacity="0.7" />
      <text x="270" y="208" fontSize="7.5" fontFamily="sans-serif" fill="var(--muted-foreground)" fontWeight="500">
        8 of 12 resolved
      </text>

      {/* Notification badge */}
      <circle cx="415" cy="42" r="7" fill="var(--accent)" />
      <text x="415" y="46" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="white" fontWeight="700">
        2
      </text>

      {/* "DIGITAL" label */}
      <text
        x="341"
        y="245"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="var(--muted-foreground)"
        letterSpacing="1"
        fontWeight="600"
      >
        DIGITAL
      </text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Post 2: reducing-repeat-visits-construction-sites
// Theme: First visit = done right. No repeat loops.
// ─────────────────────────────────────────────────────────────────────────────
function ThumbnailRepeatVisits() {
  return (
    <svg
      viewBox="0 0 480 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-rrv" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M 16 0 L 0 0 0 16"
            stroke="var(--muted-foreground)"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="480" height="270" fill="url(#grid-rrv)" />

      {/* ── Building silhouette ── */}
      <rect x="155" y="48" width="170" height="180" rx="4" fill="var(--muted)" fillOpacity="0.5" />
      <rect
        x="153"
        y="46"
        width="170"
        height="180"
        rx="4"
        stroke="var(--foreground)"
        strokeWidth="2"
      />
      {/* Building roof parapet */}
      <rect x="153" y="46" width="170" height="24" rx="4" fill="var(--muted-foreground)" fillOpacity="0.12" />
      <text
        x="238"
        y="63"
        textAnchor="middle"
        fontSize="8"
        fontFamily="sans-serif"
        fill="var(--muted-foreground)"
        letterSpacing="1"
        fontWeight="600"
      >
        SITE A
      </text>

      {/* Floor dividers */}
      <line x1="153" y1="100" x2="323" y2="100" stroke="var(--muted-foreground)" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="4 4" />
      <line x1="153" y1="148" x2="323" y2="148" stroke="var(--muted-foreground)" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="4 4" />
      <line x1="153" y1="196" x2="323" y2="196" stroke="var(--muted-foreground)" strokeWidth="0.7" strokeOpacity="0.4" strokeDasharray="4 4" />

      {/* Windows — clean grid */}
      {[168, 200, 236, 270].map((x) =>
        [74, 122, 170].map((y) => (
          <rect
            key={`w-${x}-${y}`}
            x={x}
            y={y}
            width="20"
            height="16"
            rx="2"
            stroke="var(--foreground)"
            strokeWidth="1.1"
            fillOpacity="0"
          />
        ))
      )}

      {/* Ground line */}
      <rect x="143" y="226" width="192" height="7" rx="2" fill="var(--muted-foreground)" fillOpacity="0.15" />
      <line x1="143" y1="226" x2="335" y2="226" stroke="var(--foreground)" strokeWidth="1.5" />

      {/* ── Big green checkmark badge over building ── */}
      <circle cx="323" cy="68" r="26" fill="var(--muted)" fillOpacity="0.9" stroke="var(--accent)" strokeWidth="2.5" />
      <polyline
        points="311,68 320,77 336,57"
        stroke="var(--accent)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── LEFT: Person with toolbox ── */}
      {/* Body circle bg */}
      <circle cx="92" cy="175" r="38" fill="var(--muted)" fillOpacity="0.3" stroke="var(--muted-foreground)" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Head */}
      <circle cx="92" cy="154" r="12" stroke="var(--foreground)" strokeWidth="1.5" fill="var(--muted)" fillOpacity="0.4" />
      {/* Hard hat */}
      <path
        d="M82 152 Q92 142 102 152 L103 157 L81 157 Z"
        stroke="var(--foreground)"
        strokeWidth="1.2"
        fill="var(--accent)"
        fillOpacity="0.3"
      />
      <line x1="80" y1="157" x2="104" y2="157" stroke="var(--foreground)" strokeWidth="1.2" />
      {/* Body */}
      <path
        d="M76 197 Q76 180 92 180 Q108 180 108 197"
        stroke="var(--foreground)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Arm holding toolbox */}
      <line x1="108" y1="185" x2="122" y2="192" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Toolbox */}
      <rect x="118" y="190" width="26" height="18" rx="3" stroke="var(--foreground)" strokeWidth="1.4" fill="var(--muted)" fillOpacity="0.5" />
      <rect x="124" y="186" width="14" height="6" rx="2" stroke="var(--foreground)" strokeWidth="1.2" fill="none" />
      <line x1="118" y1="199" x2="144" y2="199" stroke="var(--foreground)" strokeWidth="0.8" strokeOpacity="0.4" />
      {/* Tool cross */}
      <line x1="127" y1="202" x2="135" y2="202" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="131" y1="198" x2="131" y2="206" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />

      {/* "1st VISIT" badge */}
      <rect x="62" y="217" width="60" height="20" rx="6" fill="var(--accent)" fillOpacity="0.15" stroke="var(--accent)" strokeWidth="1.2" />
      <text x="92" y="230" textAnchor="middle" fontSize="8" fontFamily="sans-serif" fill="var(--accent)" fontWeight="700" letterSpacing="0.5">
        1ST VISIT
      </text>

      {/* ── RIGHT: Crossed-out repeat loop arrow ── */}
      {/* Loop arc */}
      <path
        d="M380 110 C415 110 430 145 415 175 C400 205 370 210 355 195"
        stroke="var(--muted-foreground)"
        strokeWidth="2"
        strokeOpacity="0.45"
        strokeDasharray="6 4"
        fill="none"
      />
      {/* Arrowhead of loop */}
      <path
        d="M347 202 L357 193 L361 205"
        stroke="var(--muted-foreground)"
        strokeWidth="1.8"
        strokeOpacity="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* "REPEAT" label */}
      <text
        x="410"
        y="155"
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="sans-serif"
        fill="var(--muted-foreground)"
        fillOpacity="0.5"
        fontWeight="600"
        letterSpacing="0.8"
      >
        REPEAT
      </text>
      {/* Big X over the loop */}
      <line
        x1="345"
        y1="100"
        x2="445"
        y2="220"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />
      <line
        x1="445"
        y1="100"
        x2="345"
        y2="220"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeOpacity="0.5"
        strokeLinecap="round"
      />

      {/* Connecting line: person → building */}
      <path
        d="M148 192 C150 192 153 192 153 192"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        strokeOpacity="0.7"
        fill="none"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Post 3: warranty-period-management-israel
// Theme: Bedek warranty timeline, building, shield guarantee, clock
// ─────────────────────────────────────────────────────────────────────────────
function ThumbnailWarrantyManagement() {
  return (
    <svg
      viewBox="0 0 480 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-wpm" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M 16 0 L 0 0 0 16"
            stroke="var(--muted-foreground)"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="480" height="270" fill="url(#grid-wpm)" />

      {/* ── CENTER: Building silhouette (smaller, left-center) ── */}
      <rect x="40" y="60" width="120" height="158" rx="4" fill="var(--muted)" fillOpacity="0.5" />
      <rect
        x="38"
        y="58"
        width="120"
        height="158"
        rx="4"
        stroke="var(--foreground)"
        strokeWidth="1.8"
      />
      {/* Roof strip */}
      <rect x="38" y="58" width="120" height="22" rx="4" fill="var(--muted-foreground)" fillOpacity="0.12" />
      <text
        x="98"
        y="74"
        textAnchor="middle"
        fontSize="7.5"
        fontFamily="sans-serif"
        fill="var(--muted-foreground)"
        letterSpacing="0.8"
        fontWeight="600"
      >
        PROJECT
      </text>

      {/* Windows */}
      {[52, 78, 108, 138].map((x) =>
        [90, 120, 150, 180].map((y) => (
          <rect
            key={`b-${x}-${y}`}
            x={x}
            y={y}
            width="15"
            height="12"
            rx="2"
            stroke="var(--foreground)"
            strokeWidth="1"
            fillOpacity="0"
          />
        ))
      )}

      {/* Ground */}
      <rect x="28" y="216" width="144" height="6" rx="2" fill="var(--muted-foreground)" fillOpacity="0.15" />
      <line x1="28" y1="216" x2="172" y2="216" stroke="var(--foreground)" strokeWidth="1.4" />

      {/* ── SHIELD / GUARANTEE symbol (right side) ── */}
      {/* Shield background glow */}
      <ellipse cx="370" cy="120" rx="55" ry="60" fill="var(--accent)" fillOpacity="0.06" />
      {/* Shield shape */}
      <path
        d="M370 68 L415 88 L415 120 Q415 152 370 168 Q325 152 325 120 L325 88 Z"
        stroke="var(--accent)"
        strokeWidth="2"
        fill="var(--accent)"
        fillOpacity="0.1"
      />
      {/* Shield inner checkmark */}
      <polyline
        points="352,118 364,130 390,104"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "BEDEK" label inside shield */}
      <text
        x="370"
        y="150"
        textAnchor="middle"
        fontSize="9"
        fontFamily="sans-serif"
        fill="var(--accent)"
        fontWeight="700"
        letterSpacing="1"
      >
        BEDEK
      </text>

      {/* ── TIMELINE / CALENDAR strip at bottom ── */}
      {/* Timeline spine */}
      <line x1="40" y1="248" x2="440" y2="248" stroke="var(--foreground)" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* Timeline start dot */}
      <circle cx="40" cy="248" r="4" fill="var(--foreground)" fillOpacity="0.6" />

      {/* Milestone: Handover */}
      <line x1="100" y1="240" x2="100" y2="256" stroke="var(--foreground)" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="100" cy="248" r="5" fill="var(--muted)" stroke="var(--foreground)" strokeWidth="1.4" />
      <text x="100" y="236" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fill="var(--muted-foreground)" fontWeight="600">
        HANDOVER
      </text>

      {/* Warranty period band */}
      <rect x="100" y="244" width="220" height="8" rx="2" fill="var(--accent)" fillOpacity="0.2" />
      <rect x="100" y="244" width="220" height="8" rx="2" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* "WARRANTY PERIOD" label over band */}
      <text x="210" y="241" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fill="var(--accent)" fontWeight="700" letterSpacing="0.8">
        WARRANTY PERIOD
      </text>

      {/* Milestone: 7-year mark */}
      <line x1="210" y1="240" x2="210" y2="256" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.7" />
      <circle cx="210" cy="248" r="5" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="1.5" />

      {/* Milestone: End */}
      <line x1="320" y1="240" x2="320" y2="256" stroke="var(--foreground)" strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="320" cy="248" r="5" fill="var(--muted)" stroke="var(--foreground)" strokeWidth="1.4" />
      <text x="320" y="262" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fill="var(--muted-foreground)" fontWeight="600">
        END
      </text>

      {/* Timeline end arrow */}
      <path d="M434 244 L440 248 L434 252" stroke="var(--foreground)" strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* ── CLOCK / HOURGLASS icon (top right) ── */}
      <circle cx="436" cy="68" r="22" fill="var(--muted)" fillOpacity="0.4" stroke="var(--foreground)" strokeWidth="1.5" />
      {/* Clock face ticks */}
      <line x1="436" y1="50" x2="436" y2="54" stroke="var(--foreground)" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="436" y1="82" x2="436" y2="86" stroke="var(--foreground)" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="418" y1="68" x2="422" y2="68" stroke="var(--foreground)" strokeWidth="1.2" strokeOpacity="0.5" />
      <line x1="450" y1="68" x2="454" y2="68" stroke="var(--foreground)" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Clock hands */}
      <line x1="436" y1="68" x2="436" y2="57" stroke="var(--foreground)" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="436" y1="68" x2="445" y2="74" stroke="var(--foreground)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="436" cy="68" r="2" fill="var(--foreground)" />

      {/* ── Connecting line: building → shield ── */}
      <path
        d="M158 137 C210 137 270 120 325 118"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        strokeOpacity="0.6"
        fill="none"
      />
      <circle cx="158" cy="137" r="3" fill="var(--accent)" fillOpacity="0.7" />

      {/* ── Connecting line: building → timeline ── */}
      <path
        d="M98 216 L100 244"
        stroke="var(--foreground)"
        strokeWidth="1"
        strokeDasharray="4 3"
        strokeOpacity="0.4"
        fill="none"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Fallback generic thumbnail
// ─────────────────────────────────────────────────────────────────────────────
function ThumbnailFallback() {
  return (
    <svg
      viewBox="0 0 480 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid-fb" width="16" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M 16 0 L 0 0 0 16"
            stroke="var(--muted-foreground)"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="480" height="270" fill="url(#grid-fb)" />
      <rect x="160" y="85" width="160" height="100" rx="8" fill="var(--muted)" fillOpacity="0.4" stroke="var(--foreground)" strokeWidth="1.5" />
      <rect x="185" y="105" width="110" height="8" rx="3" fill="var(--muted-foreground)" fillOpacity="0.35" />
      <rect x="185" y="120" width="80" height="6" rx="2.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
      <rect x="185" y="132" width="95" height="6" rx="2.5" fill="var(--muted-foreground)" fillOpacity="0.25" />
      <rect x="185" y="155" width="50" height="14" rx="6" fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1" />
      <text x="210" y="165" textAnchor="middle" fontSize="7.5" fontFamily="sans-serif" fill="var(--accent)" fontWeight="700">
        READ MORE
      </text>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mapping function
// ─────────────────────────────────────────────────────────────────────────────
const thumbnailMap: Record<string, React.ReactNode> = {
  "streamlining-construction-defect-tracking": <ThumbnailDefectTracking />,
  "reducing-repeat-visits-construction-sites": <ThumbnailRepeatVisits />,
  "warranty-period-management-israel": <ThumbnailWarrantyManagement />,
}

export function getBlogThumbnail(slug: string): React.ReactNode {
  return thumbnailMap[slug] ?? <ThumbnailFallback />
}
