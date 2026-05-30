"use client";

import { useState } from "react";

const tools = {
  claude: { name: "Claude Pro", color: "#C96442", bg: "#FFF5F0", initials: "CL" },
  chatgpt: { name: "ChatGPT Free", color: "#19A37F", bg: "#F0FDF9", initials: "GP" },
  perplexity: { name: "Perplexity Pro", color: "#5B4FE8", bg: "#F3F1FF", initials: "PX" },
  gemini: { name: "Gemini Pro", color: "#1A73E8", bg: "#EEF4FF", initials: "GM" },
  copilot: { name: "MS Copilot", color: "#0078D4", bg: "#EBF4FF", initials: "CO" },
};

const playbook = [
  {
    phase: "01",
    label: "Reconnaissance",
    tagline: "Before you think — find out what's actually true",
    tool: "perplexity",
    icon: "🔭",
    triggers: [
      "You need current data, news, or market info",
      "You're starting research from scratch",
      "You need sources and citations fast",
      "Fact-checking a claim before acting on it",
    ],
    howTo: [
      "Be specific — paste your exact question",
      "Ask for sources, not just answers",
      "Use Pro Search for deeper digs",
      "Copy key findings before moving on",
    ],
    avoid: "Don't use for synthesis, strategy, or final decisions — it's a scout, not a general.",
  },
  {
    phase: "02",
    label: "Deep Analysis",
    tagline: "When you need to actually think through something hard",
    tool: "claude",
    icon: "🧠",
    triggers: [
      "Analyzing a document, PDF, or long text",
      "Complex multi-part reasoning problems",
      "Writing that needs nuance and precision",
      "You need coherent thinking sustained over many steps",
      "Evaluating options with trade-offs",
    ],
    howTo: [
      "Give full context upfront — don't trickle info",
      "Use a new thread per distinct task",
      "Ask for structured output (pros/cons, frameworks)",
      "Paste your Perplexity findings here for synthesis",
    ],
    avoid: "Don't let threads run too long — context degrades. Reset when shifting topics.",
  },
  {
    phase: "03",
    label: "Strategic Thinking",
    tagline: "Turn analysis into a plan worth executing",
    tool: "chatgpt",
    icon: "♟️",
    triggers: [
      "You need a decision framework or prioritization",
      "Planning a project, pitch, or initiative",
      "You want to stress-test your thinking conversationally",
      "Brainstorming or generating options to evaluate",
      "Coaching yourself through a problem",
    ],
    howTo: [
      "Share your Claude analysis as context",
      "Ask 'what am I missing?' and 'what would you push back on?'",
      "Use it like a strategic sparring partner",
      "Iterate conversationally — don't over-prompt",
    ],
    avoid: "Don't use for deep document work or long synthesis — that's Claude's lane.",
  },
  {
    phase: "04",
    label: "Massive Context / Multimodal",
    tagline: "When the problem is too big to fit anywhere else",
    tool: "gemini",
    icon: "🔬",
    triggers: [
      "You need to load and compare multiple large documents",
      "Audio, video, or image analysis",
      "Cross-referencing a huge body of material",
      "Google Workspace-integrated tasks",
    ],
    howTo: [
      "Upload everything relevant at once",
      "Ask focused questions — don't just say 'summarize'",
      "Cross-check key conclusions with Claude",
      "Use for breadth, not final judgment",
    ],
    avoid: "Don't trust Gemini as the sole truth engine — cross-check nuanced conclusions.",
  },
  {
    phase: "05",
    label: "Red Team Loop",
    tagline: "Before you commit — stress test your work",
    tool: "claude",
    icon: "⚔️",
    triggers: [
      "You've built a plan or draft and want to pressure-test it",
      "High-stakes decision before you act",
      "You suspect you might have blind spots",
      "A deliverable needs to be bulletproof",
    ],
    howTo: [
      "Paste your plan into Claude",
      "Prompt: 'What are the weakest assumptions here?'",
      "Then paste into ChatGPT: 'What would a strong critic say?'",
      "Use Gemini for a final big-picture sanity check",
    ],
    avoid: "Don't skip this step on anything consequential — most mistakes happen pre-delivery.",
  },
  {
    phase: "06",
    label: "Execution & Delivery",
    tagline: "Turn output into a finished, shareable artifact",
    tool: "copilot",
    icon: "📤",
    triggers: [
      "Creating a PowerPoint, Excel model, or Word doc",
      "Drafting professional emails in Outlook",
      "Anything inside the Microsoft 365 ecosystem",
      "Polishing deliverables for clients or stakeholders",
    ],
    howTo: [
      "Bring your Claude/ChatGPT output as the content skeleton",
      "Let Copilot handle formatting, structure, and templates",
      "Use inline in Office apps — don't copy-paste unnecessarily",
      "Always review before sending — Copilot can over-format",
    ],
    avoid: "Don't use Copilot for thinking — it's a finisher, not a thinker.",
  },
];

const quickRef = [
  { signal: "I need to research something", tool: "perplexity" },
  { signal: "I need to read/analyze a document", tool: "claude" },
  { signal: "I need to write something precise", tool: "claude" },
  { signal: "I need to make a decision", tool: "chatgpt" },
  { signal: "I need to plan something", tool: "chatgpt" },
  { signal: "I need to process something huge", tool: "gemini" },
  { signal: "I need to challenge my own thinking", tool: "claude" },
  { signal: "I need a slide deck or spreadsheet", tool: "copilot" },
  { signal: "I need to draft a professional email", tool: "copilot" },
  { signal: "I need current facts or sources", tool: "perplexity" },
];

const ToolBadge = ({ toolKey, size = "sm" }) => {
  const t = tools[toolKey];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? 5 : 8,
        background: t.bg,
        color: t.color,
        border: `1.5px solid ${t.color}22`,
        borderRadius: 999,
        padding: size === "sm" ? "3px 10px 3px 6px" : "5px 14px 5px 8px",
        fontFamily: "'DM Mono', monospace",
        fontSize: size === "sm" ? 11 : 13,
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: size === "sm" ? 18 : 22,
          height: size === "sm" ? 18 : 22,
          borderRadius: "50%",
          background: t.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size === "sm" ? 9 : 10,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {t.initials}
      </span>
      {t.name}
    </span>
  );
};

export default function Playbook() {
  const [active, setActive] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#F7F6F2",
        minHeight: "100vh",
        padding: "0 0 80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1A1A18",
          padding: "48px 32px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Daily Operating System
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700,
            color: "#F5F3ED",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          AI Toolkit Playbook
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginTop: 12, marginBottom: 24 }}>
          Route any task to the right tool — every time
        </p>
        {/* Tool legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {Object.entries(tools).map(([k]) => (
            <ToolBadge key={k} toolKey={k} />
          ))}
        </div>
      </div>

      {/* Phase cards */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 0" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "#999",
            textTransform: "up
cat > app/page.jsx << 'EOF'
"use client";

import { useState } from "react";

const tools = {
  claude: { name: "Claude Pro", color: "#C96442", bg: "#FFF5F0", initials: "CL" },
  chatgpt: { name: "ChatGPT Free", color: "#19A37F", bg: "#F0FDF9", initials: "GP" },
  perplexity: { name: "Perplexity Pro", color: "#5B4FE8", bg: "#F3F1FF", initials: "PX" },
  gemini: { name: "Gemini Pro", color: "#1A73E8", bg: "#EEF4FF", initials: "GM" },
  copilot: { name: "MS Copilot", color: "#0078D4", bg: "#EBF4FF", initials: "CO" },
};

const playbook = [
  {
    phase: "01",
    label: "Reconnaissance",
    tagline: "Before you think — find out what's actually true",
    tool: "perplexity",
    icon: "🔭",
    triggers: [
      "You need current data, news, or market info",
      "You're starting research from scratch",
      "You need sources and citations fast",
      "Fact-checking a claim before acting on it",
    ],
    howTo: [
      "Be specific — paste your exact question",
      "Ask for sources, not just answers",
      "Use Pro Search for deeper digs",
      "Copy key findings before moving on",
    ],
    avoid: "Don't use for synthesis, strategy, or final decisions — it's a scout, not a general.",
  },
  {
    phase: "02",
    label: "Deep Analysis",
    tagline: "When you need to actually think through something hard",
    tool: "claude",
    icon: "🧠",
    triggers: [
      "Analyzing a document, PDF, or long text",
      "Complex multi-part reasoning problems",
      "Writing that needs nuance and precision",
      "You need coherent thinking sustained over many steps",
      "Evaluating options with trade-offs",
    ],
    howTo: [
      "Give full context upfront — don't trickle info",
      "Use a new thread per distinct task",
      "Ask for structured output (pros/cons, frameworks)",
      "Paste your Perplexity findings here for synthesis",
    ],
    avoid: "Don't let threads run too long — context degrades. Reset when shifting topics.",
  },
  {
    phase: "03",
    label: "Strategic Thinking",
    tagline: "Turn analysis into a plan worth executing",
    tool: "chatgpt",
    icon: "♟️",
    triggers: [
      "You need a decision framework or prioritization",
      "Planning a project, pitch, or initiative",
      "You want to stress-test your thinking conversationally",
      "Brainstorming or generating options to evaluate",
      "Coaching yourself through a problem",
    ],
    howTo: [
      "Share your Claude analysis as context",
      "Ask 'what am I missing?' and 'what would you push back on?'",
      "Use it like a strategic sparring partner",
      "Iterate conversationally — don't over-prompt",
    ],
    avoid: "Don't use for deep document work or long synthesis — that's Claude's lane.",
  },
  {
    phase: "04",
    label: "Massive Context / Multimodal",
    tagline: "When the problem is too big to fit anywhere else",
    tool: "gemini",
    icon: "🔬",
    triggers: [
      "You need to load and compare multiple large documents",
      "Audio, video, or image analysis",
      "Cross-referencing a huge body of material",
      "Google Workspace-integrated tasks",
    ],
    howTo: [
      "Upload everything relevant at once",
      "Ask focused questions — don't just say 'summarize'",
      "Cross-check key conclusions with Claude",
      "Use for breadth, not final judgment",
    ],
    avoid: "Don't trust Gemini as the sole truth engine — cross-check nuanced conclusions.",
  },
  {
    phase: "05",
    label: "Red Team Loop",
    tagline: "Before you commit — stress test your work",
    tool: "claude",
    icon: "⚔️",
    triggers: [
      "You've built a plan or draft and want to pressure-test it",
      "High-stakes decision before you act",
      "You suspect you might have blind spots",
      "A deliverable needs to be bulletproof",
    ],
    howTo: [
      "Paste your plan into Claude",
      "Prompt: 'What are the weakest assumptions here?'",
      "Then paste into ChatGPT: 'What would a strong critic say?'",
      "Use Gemini for a final big-picture sanity check",
    ],
    avoid: "Don't skip this step on anything consequential — most mistakes happen pre-delivery.",
  },
  {
    phase: "06",
    label: "Execution & Delivery",
    tagline: "Turn output into a finished, shareable artifact",
    tool: "copilot",
    icon: "📤",
    triggers: [
      "Creating a PowerPoint, Excel model, or Word doc",
      "Drafting professional emails in Outlook",
      "Anything inside the Microsoft 365 ecosystem",
      "Polishing deliverables for clients or stakeholders",
    ],
    howTo: [
      "Bring your Claude/ChatGPT output as the content skeleton",
      "Let Copilot handle formatting, structure, and templates",
      "Use inline in Office apps — don't copy-paste unnecessarily",
      "Always review before sending — Copilot can over-format",
    ],
    avoid: "Don't use Copilot for thinking — it's a finisher, not a thinker.",
  },
];

const quickRef = [
  { signal: "I need to research something", tool: "perplexity" },
  { signal: "I need to read/analyze a document", tool: "claude" },
  { signal: "I need to write something precise", tool: "claude" },
  { signal: "I need to make a decision", tool: "chatgpt" },
  { signal: "I need to plan something", tool: "chatgpt" },
  { signal: "I need to process something huge", tool: "gemini" },
  { signal: "I need to challenge my own thinking", tool: "claude" },
  { signal: "I need a slide deck or spreadsheet", tool: "copilot" },
  { signal: "I need to draft a professional email", tool: "copilot" },
  { signal: "I need current facts or sources", tool: "perplexity" },
];

const ToolBadge = ({ toolKey, size = "sm" }) => {
  const t = tools[toolKey];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? 5 : 8,
        background: t.bg,
        color: t.color,
        border: `1.5px solid ${t.color}22`,
        borderRadius: 999,
        padding: size === "sm" ? "3px 10px 3px 6px" : "5px 14px 5px 8px",
        fontFamily: "'DM Mono', monospace",
        fontSize: size === "sm" ? 11 : 13,
        fontWeight: 600,
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: size === "sm" ? 18 : 22,
          height: size === "sm" ? 18 : 22,
          borderRadius: "50%",
          background: t.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size === "sm" ? 9 : 10,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {t.initials}
      </span>
      {t.name}
    </span>
  );
};

export default function Playbook() {
  const [active, setActive] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: "#F7F6F2",
        minHeight: "100vh",
        padding: "0 0 80px",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#1A1A18",
          padding: "48px 32px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "#888",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Daily Operating System
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 5vw, 44px)",
            fontWeight: 700,
            color: "#F5F3ED",
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          AI Toolkit Playbook
        </h1>
        <p style={{ color: "#888", fontSize: 14, marginTop: 12, marginBottom: 24 }}>
          Route any task to the right tool — every time
        </p>
        {/* Tool legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "center",
          }}
        >
          {Object.entries(tools).map(([k]) => (
            <ToolBadge key={k} toolKey={k} />
          ))}
        </div>
      </div>

      {/* Phase cards */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 16px 0" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "#999",
            textTransform: "uppercase",
            marginBottom: 16,
            paddingLeft: 4,
          }}
        >
          The 6-Phase Daily Workflow
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {playbook.map((phase, i) => {
            const isOpen = active === i;
            const t = tools[phase.tool];
            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: `1.5px solid ${isOpen ? t.color + "55" : "#E8E6DF"}`,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                  boxShadow: isOpen ? `0 4px 24px ${t.color}18` : "none",
                }}
              >
                {/* Header row */}
                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "18px 20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: 11,
                      color: t.color,
                      fontWeight: 700,
                      minWidth: 24,
                      opacity: 0.7,
                    }}
                  >
                    {phase.phase}
                  </span>
                  <span style={{ fontSize: 22 }}>{phase.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#1A1A18",
                        lineHeight: 1.2,
                      }}
                    >
                      {phase.label}
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>
                      {phase.tagline}
                    </div>
                  </div>
                  <ToolBadge toolKey={phase.tool} />
                  <span
                    style={{
                      color: "#bbb",
                      fontSize: 18,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      marginLeft: 4,
                    }}
                  >
                    ›
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div
                    style={{
                      borderTop: `1px solid ${t.color}22`,
                      padding: "20px 20px 24px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          color: t.color,
                          textTransform: "uppercase",
                          marginBottom: 10,
                          fontWeight: 700,
                        }}
                      >
                        Use When
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {phase.triggers.map((tr, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: 13,
                              color: "#444",
                              padding: "5px 0",
                              borderBottom: "1px solid #F0EDE8",
                              display: "flex",
                              gap: 8,
                              alignItems: "flex-start",
                            }}
                          >
                            <span style={{ color: t.color, marginTop: 1 }}>→</span>
                            {tr}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          color: t.color,
                          textTransform: "uppercase",
                          marginBottom: 10,
                          fontWeight: 700,
                        }}
                      >
                        How To Use It
                      </div>
                      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        {phase.howTo.map((h, j) => (
                          <li
                            key={j}
                            style={{
                              fontSize: 13,
                              color: "#444",
                              padding: "5px 0",
                              borderBottom: "1px solid #F0EDE8",
                              display: "flex",
                              gap: 8,
                              alignItems: "flex-start",
                            }}
                          >
                            <span style={{ color: "#bbb", marginTop: 1 }}>✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{
                          marginTop: 14,
                          background: "#FFF8F0",
                          border: "1px solid #FFD9B8",
                          borderRadius: 8,
                          padding: "10px 12px",
                          fontSize: 12,
                          color: "#A05020",
                        }}
                      >
                        <strong>⚠ Watch out:</strong> {phase.avoid}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Reference */}
        <div style={{ marginTop: 36 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "#999",
              textTransform: "uppercase",
              marginBottom: 16,
              paddingLeft: 4,
            }}
          >
            Quick Reference — "I need to..."
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1.5px solid #E8E6DF",
              overflow: "hidden",
            }}
          >
            {quickRef.map((r, i) => {
              const t = tools[r.tool];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 18px",
                    borderBottom: i < quickRef.length - 1 ? "1px solid #F0EDE8" : "none",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#333" }}>{r.signal}</span>
                  <ToolBadge toolKey={r.tool} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Golden rules */}
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.15em",
              color: "#999",
              textTransform: "uppercase",
              marginBottom: 16,
              paddingLeft: 4,
            }}
          >
            Golden Rules
          </div>
          <div
            style={{
              background: "#1A1A18",
              borderRadius: 16,
              padding: "24px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {[
              ["New task = New thread", "Don't let context bleed across unrelated tasks. Stale threads degrade output."],
              ["Perplexity first, think second", "Never strategize on assumptions. Ground yourself in facts before analysis."],
              ["Claude builds, ChatGPT challenges", "Use both on high-stakes work — they reason differently."],
              ["Copilot is the last mile, not the engine", "Always bring finished thinking to Copilot. Never start there."],
              ["One tool per phase", "Mixing tools within a phase creates noise. Finish one phase, then hand off."],
            ].map(([rule, desc], i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 12,
                    color: "#C96442",
                    fontWeight: 700,
                    minWidth: 20,
                    marginTop: 1,
                  }}
                >
                  {i + 1}.
                </span>
                <div>
                  <div style={{ color: "#F5F3ED", fontWeight: 600, fontSize: 14 }}>
                    {rule}
                  </div>
                  <div style={{ color: "#777", fontSize: 12, marginTop: 3 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
