import { useState } from "react";
import S from '../styles/index.js';
import { tenses, LEVELS } from '../data/tenses.js';
import { confusingPairs } from '../data/confusingPairs.js';
import { allExercises, TYPE_LABELS, TYPE_COLORS, TYPE_ICONS } from '../data/exercises.js';
import { shuffle } from '../utils/helpers.js';
import StoryPlayer from './StoryPlayer.jsx';
import StorySetup from './StorySetup.jsx';

export default function QuizSetup({ onStart }) {
  const [mode, setMode] = useState("standard");
  const [selTypes, setSelTypes] = useState(Object.keys(TYPE_LABELS));
  const [selTenses, setSelTenses] = useState(tenses.map(t => t.id));
  const [selLevels, setSelLevels] = useState(Object.keys(LEVELS));
  const [count, setCount] = useState(15);
  const [selPairs, setSelPairs] = useState(confusingPairs.map(p => p.id));
  const [pairsCount, setPairsCount] = useState(15);
  const [storyState, setStoryState] = useState("list");
  const [activeStory, setActiveStory] = useState(null);
  const toggleType = t => setSelTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleTense = t => setSelTenses(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleLevel = l => setSelLevels(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  const togglePair = id => setSelPairs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const validTenses = tenses.filter(t => selLevels.includes(t.level)).map(t => t.id);
  const available = allExercises.filter(e => selTypes.includes(e.type) && selTenses.includes(e.tenseId) && validTenses.includes(e.tenseId)).length;
  const pairsAvailable = confusingPairs.filter(p => selPairs.includes(p.id)).reduce((a, p) => a + p.exercises.length, 0);
  if (mode === "story" && storyState === "playing" && activeStory) {
    return <StoryPlayer story={activeStory} onFinish={() => { setStoryState("list"); setActiveStory(null); }} />;
  }
  return (
    <div style={S.quizWrap}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {[{ id: "standard", label: "📚 Standardowy" }, { id: "pairs", label: "⚡ Mylące pary" }, { id: "story", label: "📖 Historia" }].map(m => (
          <button key={m.id} style={{ ...S.navBtn(mode === m.id), borderRadius: "8px", padding: "0.6rem 1.2rem", fontSize: "0.82rem" }} onClick={() => setMode(m.id)}>{m.label}</button>
        ))}
      </div>
      {mode === "standard" && (
        <div style={S.card}>
          <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem" }}>⚙️ Skonfiguruj sesję ćwiczeń</div>
          <div style={S.sLabel}>Poziom trudności</div>
          <div style={S.filterBar}>{Object.entries(LEVELS).map(([k, v]) => (<button key={k} style={S.filterBtn(selLevels.includes(k), v.color)} onClick={() => toggleLevel(k)}><strong>{k}</strong> · {v.desc}</button>))}</div>
          <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Typy zadań</div>
          <div style={S.filterBar}>{Object.entries(TYPE_LABELS).map(([k, v]) => (<button key={k} style={S.filterBtn(selTypes.includes(k), TYPE_COLORS[k])} onClick={() => toggleType(k)}>{TYPE_ICONS[k]} {v}</button>))}</div>
          <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Czasy gramatyczne</div>
          <div style={S.filterBar}>{tenses.map(t => (<button key={t.id} style={S.filterBtn(selTenses.includes(t.id) && validTenses.includes(t.id), t.color)} onClick={() => toggleTense(t.id)} disabled={!validTenses.includes(t.id)}>{t.emoji} {t.name} <span style={{ ...S.levelBadge(t.level), marginLeft: "0.3rem", padding: "0.05rem 0.3rem" }}>{t.level}</span></button>))}</div>
          <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Liczba pytań: <span style={{ color: "#E8B84B" }}>{Math.min(count, available)}</span><span style={{ color: "#9896A0" }}> / dostępnych: {available}</span></div>
          <input type="range" min={5} max={Math.max(5, Math.min(60, available))} step={5} value={Math.min(count, available)} onChange={e => setCount(+e.target.value)} style={{ width: "100%", accentColor: "#E8B84B", marginBottom: "1.2rem" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={S.restartBtn} disabled={available === 0} onClick={() => onStart(shuffle(allExercises.filter(e => selTypes.includes(e.type) && selTenses.includes(e.tenseId) && validTenses.includes(e.tenseId))).slice(0, Math.min(count, available)))}>Rozpocznij sesję →</button>
          </div>
        </div>
      )}
      {mode === "pairs" && (
        <div>
          <div style={S.card}>
            <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem" }}>⚡ Tryb porównawczy — mylące pary</div>
            <div style={{ fontSize: "0.8rem", color: "#9896A0", marginBottom: "1.2rem" }}>Ćwiczenia skupione na najczęściej mylonych parach.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
              {confusingPairs.map(p => (
                <button key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", padding: "0.8rem 1rem", border: `1px solid ${selPairs.includes(p.id) ? p.color + "60" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", background: selPairs.includes(p.id) ? `${p.color}12` : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "left", width: "100%" }} onClick={() => togglePair(p.id)}>
                  <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: selPairs.includes(p.id) ? p.color : "#F0EDE4" }}>{p.name}</div>
                    <div style={{ fontSize: "0.74rem", color: "#9896A0", fontStyle: "italic" }}>{p.desc}</div>
                  </div>
                  <span style={{ color: selPairs.includes(p.id) ? p.color : "#555" }}>{selPairs.includes(p.id) ? "✓" : "○"}</span>
                </button>
              ))}
            </div>
            <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Liczba pytań: <span style={{ color: "#E8B84B" }}>{Math.min(pairsCount, pairsAvailable)}</span><span style={{ color: "#9896A0" }}> / dostępnych: {pairsAvailable}</span></div>
            <input type="range" min={5} max={Math.max(5, Math.min(60, pairsAvailable))} step={5} value={Math.min(pairsCount, pairsAvailable)} onChange={e => setPairsCount(+e.target.value)} style={{ width: "100%", accentColor: "#E8B84B", marginBottom: "1.2rem" }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={S.restartBtn} disabled={pairsAvailable === 0} onClick={() => onStart(shuffle(confusingPairs.filter(p => selPairs.includes(p.id)).flatMap(p => p.exercises.map(ex => ({ ...ex, pairId: p.id })))).slice(0, Math.min(pairsCount, pairsAvailable)))}>Rozpocznij →</button>
            </div>
          </div>
        </div>
      )}
      {mode === "story" && storyState === "list" && (
        <StorySetup onStart={s => { setActiveStory(s); setStoryState("playing"); }} />
      )}
    </div>
  );
}
