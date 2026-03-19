import { useState, useEffect } from "react";
import S from '../styles/index.js';
import { tenses } from '../data/tenses.js';
import { flashcardDecks, allFlashcards } from '../data/flashcards.js';
import { loadProgress } from '../utils/storage.js';

export default function ProgressView() {
  const [data, setData] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => { loadProgress().then(setData); }, []);

  async function clearAll() {
    try {
      ['pt-stats','pf-stats','p-sessions','p-streak'].forEach(k => localStorage.removeItem(k));
    } catch { /* ignore */ }
    setData({ tenseStats: {}, fcStats: {}, sessions: [], streak: { lastDate: null, count: 0 } });
    setConfirmClear(false);
  }

  if (!data) return (
    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#9896A0" }}>
      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>⏳</div>
      Ładowanie danych postępu...
    </div>
  );

  const { tenseStats, fcStats, sessions, streak } = data;
  const totalCorrect = Object.values(tenseStats).reduce((a, s) => a + s.correct, 0);
  const totalAnswered = Object.values(tenseStats).reduce((a, s) => a + s.total, 0);
  const overallAcc = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null;

  function accColor(acc) {
    if (acc >= 0.8) return "#5BAD6F";
    if (acc >= 0.6) return "#E8B84B";
    return "#E06B5C";
  }

  const tenseRows = tenses
    .map(t => ({ ...t, stat: tenseStats[t.id] || null }))
    .filter(t => t.stat && t.stat.total > 0)
    .sort((a, b) => (a.stat.correct / a.stat.total) - (b.stat.correct / b.stat.total));

  const untouched = tenses.filter(t => !tenseStats[t.id] || tenseStats[t.id].total === 0);

  const deckRows = flashcardDecks.map(d => {
    const cards = allFlashcards.filter(c => c.deckId === d.id);
    const seen = cards.filter(c => fcStats[c.id]);
    const known = cards.filter(c => { const s = fcStats[c.id]; return s && s.know >= s.retry; });
    return { ...d, known: known.length, seen: seen.length, total: cards.length };
  }).filter(d => d.seen > 0);

  const noData = totalAnswered === 0 && sessions.length === 0 && Object.keys(fcStats).length === 0;

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(145px,1fr))", gap: "0.7rem", marginBottom: "1.5rem" }}>
        <div style={S.statCard}>
          <div style={{ fontSize: "1.6rem", marginBottom: "0.2rem" }}>{streak.count >= 7 ? "🔥" : streak.count >= 3 ? "⚡" : "💤"}</div>
          <div style={S.statNum(streak.count >= 7 ? "#E8B84B" : streak.count >= 3 ? "#5BAD6F" : "#9896A0")}>{streak.count}</div>
          <div style={S.statLabel}>{streak.count === 1 ? "Dzień z rzędu" : "Dni z rzędu"}</div>
        </div>
        {overallAcc !== null && (
          <div style={S.statCard}>
            <div style={{ fontSize: "1.6rem", marginBottom: "0.2rem" }}>🎯</div>
            <div style={S.statNum(accColor(overallAcc / 100))}>{overallAcc}%</div>
            <div style={S.statLabel}>Skuteczność</div>
          </div>
        )}
        <div style={S.statCard}>
          <div style={{ fontSize: "1.6rem", marginBottom: "0.2rem" }}>✏️</div>
          <div style={S.statNum("#5B8EE6")}>{totalAnswered}</div>
          <div style={S.statLabel}>Ćwiczeń</div>
        </div>
        <div style={S.statCard}>
          <div style={{ fontSize: "1.6rem", marginBottom: "0.2rem" }}>🃏</div>
          <div style={S.statNum("#CF87D6")}>{Object.keys(fcStats).length}</div>
          <div style={S.statLabel}>Fiszek ocenionych</div>
        </div>
        <div style={S.statCard}>
          <div style={{ fontSize: "1.6rem", marginBottom: "0.2rem" }}>📚</div>
          <div style={S.statNum("#4DAFAA")}>{sessions.length}</div>
          <div style={S.statLabel}>Sesji</div>
        </div>
      </div>

      {noData && (
        <div style={{ ...S.tip, textAlign: "center", padding: "2.5rem 1.5rem", marginBottom: "1rem" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>📊</div>
          <div style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.4rem" }}>Brak danych do pokazania</div>
          <div style={{ color: "#9896A0", fontSize: "0.82rem" }}>Zrób kilka ćwiczeń lub przejrzyj fiszki — tutaj pojawi się Twój postęp.</div>
        </div>
      )}

      {tenseRows.length > 0 && (
        <div style={{ ...S.card, marginBottom: "1rem" }}>
          <div style={{ ...S.sLabel, marginBottom: "1rem" }}>📊 Opanowanie czasów <span style={{ color: "#9896A0", fontWeight: 400 }}>— od najsłabszego</span></div>
          {tenseRows.map(t => {
            const acc = t.stat.correct / t.stat.total;
            const pct = Math.round(acc * 100);
            return (
              <div key={t.id} style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span style={{ fontSize: "0.88rem" }}>{t.emoji}</span>
                    <span style={{ fontSize: "0.82rem" }}>{t.name}</span>
                    <span style={{ ...S.levelBadge(t.level), marginBottom: 0, fontSize: "0.58rem" }}>{t.level}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <span style={{ fontSize: "0.7rem", color: "#9896A0" }}>{t.stat.correct}/{t.stat.total}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: accColor(acc), minWidth: "38px", textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: "7px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${accColor(acc)}CC, ${accColor(acc)})`, borderRadius: "4px", transition: "width 0.6s ease" }} />
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: "1.2rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {[["#5BAD6F","≥80% Dobrze"], ["#E8B84B","60–79% Ćwicz"], ["#E06B5C","<60% Do poprawy"]].map(([c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                <span style={{ fontSize: "0.7rem", color: "#9896A0" }}>{l}</span>
              </div>
            ))}
          </div>

          {untouched.length > 0 && (
            <div style={{ marginTop: "1rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ ...S.sLabel, marginBottom: "0.5rem" }}>⬜ Jeszcze nie ćwiczone</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {untouched.map(t => (
                  <span key={t.id} style={{ padding: "0.2rem 0.6rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "4px", fontSize: "0.75rem", color: "#9896A0" }}>
                    {t.emoji} {t.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {deckRows.length > 0 && (
        <div style={{ ...S.card, marginBottom: "1rem" }}>
          <div style={{ ...S.sLabel, marginBottom: "1rem" }}>🃏 Opanowanie fiszek</div>
          {deckRows.map(d => {
            const pct = Math.round((d.known / d.total) * 100);
            return (
              <div key={d.id} style={{ marginBottom: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.3rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <span>{d.emoji}</span>
                    <span style={{ fontSize: "0.82rem" }}>{d.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                    <span style={{ fontSize: "0.7rem", color: "#9896A0" }}>{d.known}/{d.total} znanych</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: d.color, minWidth: "38px", textAlign: "right" }}>{pct}%</span>
                  </div>
                </div>
                <div style={{ height: "7px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${d.color}CC,${d.color})`, borderRadius: "4px", transition: "width 0.6s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {sessions.length > 0 && (
        <div style={{ ...S.card, marginBottom: "1rem" }}>
          <div style={{ ...S.sLabel, marginBottom: "0.8rem" }}>🕐 Ostatnie sesje</div>
          {sessions.slice(0, 12).map((s, i) => {
            const acc = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0;
            const modeLabel = s.mode === "flashcards" ? "🃏 Fiszki" : s.mode === "pairs" ? "⚡ Pary" : s.mode === "story" ? "📖 Historia" : s.mode === "passive" ? "🔵 Strona bierna" : "🧠 Quiz";
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: i < Math.min(sessions.length, 12) - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "#9896A0", fontFamily: "monospace" }}>{s.date}</span>
                  <span style={{ fontSize: "0.78rem", color: "#C8C4D0" }}>{modeLabel}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "#9896A0" }}>{s.score}/{s.total}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <div style={{ width: "40px", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${acc}%`, background: accColor(acc / 100), borderRadius: "2px" }} />
                    </div>
                    <span style={{ fontSize: "0.82rem", fontWeight: 700, color: accColor(acc / 100), minWidth: "36px", textAlign: "right" }}>{acc}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ textAlign: "center", padding: "0.5rem 0 1rem" }}>
        {!confirmClear ? (
          <button onClick={() => setConfirmClear(true)}
            style={{ background: "none", border: "none", color: "#9896A0", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline", fontFamily: "Georgia,serif" }}>
            Usuń wszystkie dane postępu
          </button>
        ) : (
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.82rem", color: "#E88B80" }}>Na pewno usunąć cały postęp?</span>
            <button onClick={clearAll} style={{ ...S.restartBtn, background: "rgba(224,107,92,0.18)", border: "1px solid rgba(224,107,92,0.45)", color: "#E88B80", fontSize: "0.8rem", padding: "0.4rem 1rem" }}>Tak, usuń</button>
            <button onClick={() => setConfirmClear(false)} style={{ ...S.restartBtn, fontSize: "0.8rem", padding: "0.4rem 1rem" }}>Anuluj</button>
          </div>
        )}
      </div>
    </div>
  );
}
