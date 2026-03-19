import { useState, useEffect } from "react";
import { tenses, LEVELS } from './data/tenses.js';
import { allExercises, TYPE_LABELS, TYPE_COLORS, TYPE_ICONS } from './data/exercises.js';
import { passiveExercises } from './data/passive.js';
import { confusingPairs } from './data/confusingPairs.js';
import { stories } from './data/stories.js';
import { shuffle } from './utils/helpers.js';
import { bumpStreak, saveExerciseResult, saveSession, safeGet } from './utils/storage.js';
import S from './styles/index.js';
import ExerciseCard from './components/ExerciseCard.jsx';
import PassiveView from './components/PassiveView.jsx';
import FlashcardsView from './components/FlashcardsView.jsx';
import ProgressView from './components/ProgressView.jsx';
import QuizSetup from './components/QuizSetup.jsx';

export default function App() {
  const [view, setView] = useState("overview");
  const [expanded, setExpanded] = useState(null);
  const [quizState, setQuizState] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  function startQuiz(qs) { setQuestions(qs); setQIdx(0); setScore(0); setResults([]); setStreak(0); setMaxStreak(0); setQuizState("playing"); }
  function handleResult(correct, tenseId) {
    if (correct) { setScore(s => s + 1); setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; }); } else setStreak(0);
    setResults(r => [...r, correct]);
    saveExerciseResult(tenseId, correct);
  }
  function handleNext() { if (qIdx + 1 >= questions.length) setQuizState("done"); else setQIdx(i => i + 1); }
  const wrongCount = results.filter(r => !r).length;

  useEffect(() => {
    if (quizState === "done" && questions.length > 0) {
      const finalScore = results.filter(Boolean).length;
      const mode = questions[0]?.pairId ? "pairs" : "quiz";
      saveSession({ score: finalScore, total: questions.length, mode });
    }
  }, [quizState]);

  const grouped = { A2: tenses.filter(t => t.level === "A2"), B1: tenses.filter(t => t.level === "B1"), B2: tenses.filter(t => t.level === "B2"), C1: tenses.filter(t => t.level === "C1") };

  const typeBreakdown = Object.keys(TYPE_LABELS).map(type => {
    const idxs = questions.map((q, i) => q.type === type ? i : -1).filter(i => i >= 0);
    return { type, total: idxs.length, correct: idxs.filter(i => results[i]).length };
  }).filter(x => x.total > 0);

  const tabs = [{ id: "overview", label: "📋 Przegląd" }, { id: "lessons", label: "📖 Lekcje" }, { id: "passive", label: "🔵 Strona Bierna" }, { id: "flashcards", label: "🃏 Fiszki" }, { id: "progress", label: "📊 Postęp" }, { id: "quiz", label: "🧠 Ćwiczenia" }];

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>Kurs Języka Angielskiego</div>
        <h1 style={S.title}>English Tenses</h1>
        <p style={S.subtitle}>14 czasów · Strona Bierna · Fiszki · Postęp · Mylące Pary · A2–C1</p>
        <div style={S.nav}>
          {tabs.map(tab => (
            <button key={tab.id} style={S.navBtn(view === tab.id)} onClick={() => { setView(tab.id); if (tab.id === "quiz") setQuizState("setup"); }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={S.content}>

        {view === "overview" && (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {Object.entries(LEVELS).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", background: `${v.color}12`, border: `1px solid ${v.color}35`, borderRadius: "8px" }}>
                  <span style={{ ...S.levelBadge(k), marginBottom: 0 }}>{k}</span>
                  <span style={{ fontSize: "0.78rem", color: "#C8C4D0" }}>{v.desc}</span>
                  <span style={{ fontSize: "0.72rem", color: "#9896A0" }}>— {tenses.filter(t => t.level === k).length} czasy</span>
                </div>
              ))}
            </div>
            {Object.entries(grouped).map(([level, ts]) => (
              <div key={level} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.7rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ ...S.levelBadge(level), marginBottom: 0, fontSize: "0.72rem" }}>{level}</span>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0" }}>
                    {LEVELS[level].desc}
                    {level === "A2" && " — Tutaj zacznij naukę"}
                    {level === "B1" && " — Buduj solidne fundamenty"}
                    {level === "B2" && " — Rozszerz słownictwo gramatyczne"}
                    {level === "C1" && " — Zaawansowane struktury"}
                  </span>
                </div>
                <div style={S.overviewGrid}>
                  {ts.map(t => (
                    <div key={t.id} style={S.overviewCard(t.color, level === "C1")}>
                      <div style={S.levelBadge(t.level)}>{t.level} · {LEVELS[t.level].desc}</div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                        <span>{t.emoji}</span><span style={{ fontSize: "0.88rem", fontWeight: 600 }}>{t.name}</span>
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#9896A0", fontStyle: "italic", marginBottom: "0.5rem", lineHeight: 1.4 }}>{t.use}</div>
                      <div style={{ fontSize: "0.78rem", fontStyle: "italic", color: "#C8C4D0" }}>„{t.positive[0]}"</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={S.tip}>
              <span style={S.tipLabel}>💡 Sugerowana ścieżka nauki</span>
              Zacznij od <strong>A2</strong>, potem <strong>B1</strong> i <strong>B2</strong>. Czasy <strong>C1</strong> dopiero gdy B2 opanowane. Kiedy mylisz dwa czasy — skorzystaj z <strong>Mylących Par</strong> w ćwiczeniach. <strong>Stronę Bierną</strong> wprowadź równolegle z B1/B2. Tryb <strong>Historia</strong> pozwala ćwiczyć kilka czasów naraz w naturalnym kontekście.
            </div>
          </div>
        )}

        {view === "lessons" && (
          <div>
            {Object.entries(grouped).map(([level, ts]) => (
              <div key={level} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.7rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ ...S.levelBadge(level), marginBottom: 0, fontSize: "0.72rem" }}>{level}</span>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0" }}>{LEVELS[level].desc}</span>
                </div>
                {ts.map(t => {
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
                          {[["✅ Zdania twierdzące", t.positive, "positive"], ["❌ Zdania przeczące", t.negative, "negative"], ["❓ Pytania", t.question, "question"]].map(([label, items, type]) => (
                            <div key={label} style={{ marginBottom: "0.9rem" }}>
                              <div style={S.sLabel}>{label}</div>
                              {items.map((s, i) => <div key={i} style={S.exBox(type)}>{s}</div>)}
                            </div>
                          ))}
                          <div style={{ marginBottom: "0.9rem" }}>
                            <div style={S.sLabel}>🕐 Słowa-klucze</div>
                            <div style={S.signals}>{t.signals.map((s, i) => <span key={i} style={S.signal}>{s}</span>)}</div>
                          </div>
                          <div style={S.tip}><span style={S.tipLabel}>💡 Wskazówka</span>{t.tip}</div>
                          {t.dialogue && (
                            <div style={S.dialogueBox}>
                              <div style={{ ...S.sLabel, marginBottom: "0.6rem" }}>💬 Przykładowy dialog</div>
                              {t.dialogue.map((line, i) => (
                                <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                                  <span style={S.dialogueSpeaker(line.speaker === "A")}>{line.speaker}</span>
                                  <span style={S.dialogueText(line.speaker === "A")}>{line.line}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {view === "passive" && <PassiveView />}

        {view === "flashcards" && <FlashcardsView />}

        {view === "progress" && <ProgressView />}

        {view === "quiz" && (
          <div style={S.quizWrap}>
            {quizState === "setup" && <QuizSetup onStart={startQuiz} />}

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
                <div style={{ textAlign: "center", marginTop: "0.4rem" }}>
                  <button style={{ background: "none", border: "none", color: "#9896A0", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline", fontFamily: "Georgia,serif" }}
                    onClick={() => { if (window.confirm("Zakończyć sesję?")) setQuizState("setup"); }}>
                    Zakończ sesję
                  </button>
                </div>
              </>
            )}

            {quizState === "done" && (
              <div style={S.scoreBox}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.3rem" }}>{score / questions.length >= 0.9 ? "🏆" : score / questions.length >= 0.7 ? "🎯" : score / questions.length >= 0.5 ? "📈" : "📚"}</div>
                <div style={S.scoreBig}>{score}/{questions.length}</div>
                <div style={{ color: "#9896A0", fontSize: "0.88rem", marginTop: "0.4rem" }}>
                  {score === questions.length ? "Perfekcyjny wynik! Jesteś mistrzem czasów angielskich." : score / questions.length >= 0.8 ? "Świetnie! Znasz czasy angielskie bardzo dobrze." : score / questions.length >= 0.6 ? "Nieźle! Jeszcze trochę ćwiczeń i będziesz mistrzem." : "Wróć do lekcji i spróbuj ponownie. Dasz radę!"}
                </div>
                {maxStreak >= 3 && (
                  <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                    <div style={S.statCard}><div style={S.statNum("#E8B84B")}>{maxStreak}</div><div style={S.statLabel}>🔥 Max seria</div></div>
                  </div>
                )}
                {wrongCount > 0 && (
                  <div style={{ marginTop: "1.2rem", padding: "0.9rem 1.2rem", background: "rgba(224,107,92,0.08)", border: "1px solid rgba(224,107,92,0.25)", borderRadius: "10px", display: "inline-block" }}>
                    <div style={{ fontSize: "0.82rem", color: "#E88B80", marginBottom: "0.5rem" }}>✗ {wrongCount} {wrongCount === 1 ? "błędna odpowiedź" : "błędne odpowiedzi"} — warto powtórzyć!</div>
                    <button style={{ ...S.restartBtn, background: "rgba(224,107,92,0.18)", border: "1px solid rgba(224,107,92,0.45)", color: "#E88B80", fontSize: "0.82rem", padding: "0.6rem 1.2rem" }}
                      onClick={() => startQuiz(shuffle(questions.filter((q, i) => !results[i])))}>
                      🔁 Powtórz tylko błędy ({wrongCount})
                    </button>
                  </div>
                )}
                {typeBreakdown.length > 1 && (
                  <div style={S.statsGrid}>{typeBreakdown.map(({ type, total, correct }) => (
                    <div key={type} style={S.statCard}><div style={S.statNum(TYPE_COLORS[type])}>{correct}/{total}</div><div style={S.statLabel}>{TYPE_ICONS[type]} {TYPE_LABELS[type]}</div></div>
                  ))}</div>
                )}
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
                  <button style={S.restartBtn} onClick={() => setQuizState("setup")}>⚙️ Nowa sesja</button>
                  <button style={{ ...S.restartBtn, background: "rgba(91,173,111,0.14)", border: "1px solid rgba(91,173,111,0.4)", color: "#8ECC9E" }} onClick={() => startQuiz(shuffle(questions))}>↺ Powtórz te same</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
