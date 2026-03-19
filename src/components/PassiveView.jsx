import { useState } from "react";
import S from '../styles/index.js';
import { passiveTenses, passiveExercises } from '../data/passive.js';
import { TYPE_LABELS, TYPE_COLORS, TYPE_ICONS } from '../data/exercises.js';
import { shuffle } from '../utils/helpers.js';
import { saveExerciseResult, saveSession } from '../utils/storage.js';
import ExerciseCard from './ExerciseCard.jsx';

export default function PassiveView() {
  const [expanded, setExpanded] = useState(null);
  const [quizState, setQuizState] = useState("setup");
  const [selTenses, setSelTenses] = useState(passiveTenses.map(t => t.id));
  const [count, setCount] = useState(12);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  function toggleTense(id) { setSelTenses(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); }
  const available = passiveExercises.filter(e => selTenses.includes(e.tenseId)).length;
  function startQuiz(qs) { setQuestions(qs); setQIdx(0); setScore(0); setResults([]); setStreak(0); setQuizState("playing"); }
  function handleResult(correct) {
    if (correct) { setScore(s => s + 1); setStreak(s => s + 1); } else setStreak(0);
    setResults(r => [...r, correct]);
    if (questions[qIdx]) saveExerciseResult(questions[qIdx].tenseId, correct);
  }
  function handleNext() { if (qIdx + 1 >= questions.length) { setQuizState("done"); saveSession({ score, total: questions.length, mode: "passive" }); } else setQIdx(i => i + 1); }
  const wrongCount = results.filter(r => !r).length;
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "1rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "1.1rem" }}>🔵</span>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0" }}>Strona Bierna — Teoria i przykłady</span>
        </div>
        <div style={S.tip}>
          <span style={S.tipLabel}>💡 Kiedy używamy strony biernej?</span>
          Kiedy ważniejszy jest <strong>wynik</strong> lub <strong>fakt</strong> niż osoba wykonująca czynność. Kiedy sprawca jest <strong>nieznany, oczywisty lub nieważny</strong>. Ogólna zasada: <strong>be + V3</strong>.
        </div>
        <div style={{ marginTop: "1rem" }}>
          {passiveTenses.map(t => {
            const open = expanded === t.id;
            return (
              <div key={t.id} style={S.tenseCard(t.color, open)} onClick={() => setExpanded(open ? null : t.id)}>
                <div style={S.cardHeader}>
                  <div style={S.dot(t.color)} />
                  <span style={{ fontSize: "1.1rem" }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={S.cardTitle}>{t.name}</span>
                      <span style={{ ...S.levelBadge(t.level), marginBottom: 0 }}>{t.level}</span>
                    </div>
                    <div style={S.cardUse}>{t.use}</div>
                  </div>
                  <span style={S.chevron(open)}>▼</span>
                </div>
                {open && (
                  <div style={S.cardBody} onClick={e => e.stopPropagation()}>
                    <div style={S.structure(t.color)}>{t.structure}</div>
                    <div style={{ marginBottom: "0.6rem" }}>
                      <div style={S.sLabel}>Przykład (strona czynna → bierna)</div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ ...S.exBox("negative"), flex: 1 }}>Active: {t.active}</div>
                        <span style={{ color: "#9896A0" }}>→</span>
                        <div style={{ ...S.exBox("positive"), flex: 1 }}>Passive: {t.passive}</div>
                      </div>
                    </div>
                    {[["✅ Twierdzące", t.positive, "positive"], ["❌ Przeczące", t.negative, "negative"], ["❓ Pytania", t.question, "question"]].map(([label, items, type]) => (
                      <div key={label} style={{ marginBottom: "0.8rem" }}>
                        <div style={S.sLabel}>{label}</div>
                        {items.map((s, i) => <div key={i} style={S.exBox(type)}>{s}</div>)}
                      </div>
                    ))}
                    <div style={S.tip}><span style={S.tipLabel}>💡 Wskazówka</span>{t.tip}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0", marginBottom: "1rem" }}>🧠 Ćwiczenia — Strona Bierna</div>
        {quizState === "setup" && (
          <div style={S.card}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "1rem" }}>⚙️ Wybierz formy bierne do ćwiczenia</div>
            <div style={S.filterBar}>
              {passiveTenses.map(t => (
                <button key={t.id} style={S.filterBtn(selTenses.includes(t.id), t.color)} onClick={() => toggleTense(t.id)}>
                  {t.emoji} {t.name.replace("Passive", "").trim()}
                  <span style={{ ...S.levelBadge(t.level), marginLeft: "0.3rem", padding: "0.05rem 0.3rem", marginBottom: 0 }}>{t.level}</span>
                </button>
              ))}
            </div>
            <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Liczba pytań: <span style={{ color: "#E8B84B" }}>{Math.min(count, available)}</span><span style={{ color: "#9896A0" }}> / dostępnych: {available}</span></div>
            <input type="range" min={4} max={Math.max(4, Math.min(40, available))} step={4} value={Math.min(count, available)} onChange={e => setCount(+e.target.value)} style={{ width: "100%", accentColor: "#E8B84B", marginBottom: "1.2rem" }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={S.restartBtn} disabled={available === 0} onClick={() => startQuiz(shuffle(passiveExercises.filter(e => selTenses.includes(e.tenseId))).slice(0, Math.min(count, available)))}>Rozpocznij →</button>
            </div>
          </div>
        )}
        {quizState === "playing" && (
          <>
            <div style={S.progressRow}>
              <span style={{ fontSize: "0.75rem", color: "#9896A0" }}>{qIdx + 1}/{questions.length}</span>
              <div style={S.progressBar}><div style={S.progressFill((qIdx / questions.length) * 100)} /></div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "#5BAD6F" }}>✓ {score}</span>
                {streak >= 2 && <span style={S.streakBadge(streak)}>{streak >= 5 ? "🔥" : "⚡"} {streak}</span>}
              </div>
            </div>
            <ExerciseCard key={qIdx} ex={questions[qIdx]} onResult={handleResult} onNext={handleNext} isLast={qIdx + 1 >= questions.length} />
            <div style={{ textAlign: "center" }}>
              <button style={{ background: "none", border: "none", color: "#9896A0", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline", fontFamily: "Georgia,serif" }} onClick={() => { if (window.confirm("Zakończyć?")) setQuizState("setup"); }}>Zakończ sesję</button>
            </div>
          </>
        )}
        {quizState === "done" && (
          <div style={S.scoreBox}>
            <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>{score / questions.length >= 0.9 ? "🏆" : score / questions.length >= 0.7 ? "🎯" : "📚"}</div>
            <div style={S.scoreBig}>{score}/{questions.length}</div>
            <div style={{ color: "#9896A0", fontSize: "0.85rem", marginTop: "0.3rem" }}>{score === questions.length ? "Perfekcyjnie! Strona bierna opanowana." : score / questions.length >= 0.7 ? "Świetnie!" : "Wróć do teorii i spróbuj ponownie."}</div>
            {wrongCount > 0 && (
              <div style={{ marginTop: "1rem", display: "inline-block", padding: "0.8rem 1.2rem", background: "rgba(224,107,92,0.08)", border: "1px solid rgba(224,107,92,0.25)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.8rem", color: "#E88B80", marginBottom: "0.5rem" }}>✗ {wrongCount} błędy — powtórz!</div>
                <button style={{ ...S.restartBtn, background: "rgba(224,107,92,0.18)", border: "1px solid rgba(224,107,92,0.45)", color: "#E88B80", fontSize: "0.8rem", padding: "0.5rem 1rem" }} onClick={() => startQuiz(shuffle(questions.filter((q, i) => !results[i])))}>🔁 Powtórz błędy ({wrongCount})</button>
              </div>
            )}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.2rem", flexWrap: "wrap" }}>
              <button style={S.restartBtn} onClick={() => setQuizState("setup")}>⚙️ Nowa sesja</button>
              <button style={{ ...S.restartBtn, background: "rgba(91,173,111,0.14)", border: "1px solid rgba(91,173,111,0.4)", color: "#8ECC9E" }} onClick={() => startQuiz(shuffle(questions))}>↺ Powtórz te same</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
