import { useState } from "react";
import S from '../styles/index.js';
import { flashcardDecks, allFlashcards } from '../data/flashcards.js';
import { tenses, LEVELS } from '../data/tenses.js';
import { saveFlashcardResult } from '../utils/storage.js';
import { shuffle } from '../utils/helpers.js';

export default function FlashcardsView() {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selLevels, setSelLevels] = useState(["A2", "B1", "B2", "C1"]);
  const [queue, setQueue] = useState([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState([]);
  const [retryQueue, setRetryQueue] = useState([]);
  const [phase, setPhase] = useState("decks");

  const toggleLevel = l => setSelLevels(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);

  function startDeck(deckId) {
    const cards = shuffle(allFlashcards.filter(c => c.deckId === deckId && selLevels.includes(c.level)));
    if (cards.length === 0) return;
    setSelectedDeck(deckId);
    setQueue(cards);
    setCardIdx(0);
    setFlipped(false);
    setSessionResults([]);
    setRetryQueue([]);
    setPhase("studying");
  }

  function handleKnow() {
    saveFlashcardResult(queue[cardIdx].id, true);
    setSessionResults(r => [...r, "know"]);
    advance();
  }

  function handleRetry() {
    saveFlashcardResult(queue[cardIdx].id, false);
    setSessionResults(r => [...r, "retry"]);
    setRetryQueue(q => [...q, queue[cardIdx]]);
    advance();
  }

  function advance() {
    setFlipped(false);
    if (cardIdx + 1 >= queue.length) {
      setPhase("done");
    } else {
      setCardIdx(i => i + 1);
    }
  }

  function startRetryRound() {
    setQueue(shuffle(retryQueue));
    setCardIdx(0);
    setFlipped(false);
    setSessionResults([]);
    setRetryQueue([]);
    setPhase("studying");
  }

  const deck = flashcardDecks.find(d => d.id === selectedDeck);
  const card = queue[cardIdx];
  const knowCount = sessionResults.filter(r => r === "know").length;
  const retryCount = sessionResults.filter(r => r === "retry").length;

  const deckCounts = flashcardDecks.map(d => ({
    ...d,
    total: allFlashcards.filter(c => c.deckId === d.id && selLevels.includes(c.level)).length,
  }));

  if (phase === "studying" && card) {
    const tenseData = tenses.find(t => t.id === card.tenseId);
    const pct = (cardIdx / queue.length) * 100;
    return (
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
          <button onClick={() => setPhase("decks")} style={{ background: "none", border: "none", color: "#9896A0", cursor: "pointer", fontSize: "0.8rem", fontFamily: "Georgia,serif", textDecoration: "underline" }}>
            ← Wróć do talii
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#9896A0" }}>{cardIdx + 1}/{queue.length}</span>
            <div style={{ width: "80px", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#E8B84B,#5BAD6F)", width: `${pct}%`, transition: "width 0.3s", borderRadius: "2px" }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            <span style={{ fontSize: "0.72rem", color: "#5BAD6F" }}>✓ {knowCount}</span>
            <span style={{ fontSize: "0.72rem", color: "#E06B5C" }}>↺ {retryCount}</span>
          </div>
        </div>

        <div style={{ perspective: "1000px", marginBottom: "1rem" }}>
          <div
            onClick={() => setFlipped(f => !f)}
            style={{
              background: flipped ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${flipped ? (tenseData ? tenseData.color + "60" : "rgba(255,255,255,0.2)") : "rgba(255,255,255,0.1)"}`,
              borderRadius: "20px",
              padding: "2rem 2rem 1.5rem",
              cursor: "pointer",
              minHeight: "260px",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.25s",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ padding: "0.15rem 0.6rem", background: `${deck?.color || "#888"}18`, border: `1px solid ${deck?.color || "#888"}40`, borderRadius: "4px", fontSize: "0.68rem", color: deck?.color || "#888" }}>
                {deck?.emoji} {deck?.name}
              </span>
              {card.level && <span style={{ ...S.levelBadge(card.level), marginBottom: 0 }}>{card.level}</span>}
              {tenseData && <span style={{ padding: "0.15rem 0.6rem", background: `${tenseData.color}15`, border: `1px solid ${tenseData.color}35`, borderRadius: "4px", fontSize: "0.68rem", color: tenseData.color }}>{tenseData.emoji} {tenseData.name}</span>}
            </div>

            {!flipped ? (
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: "1.1rem", lineHeight: 1.65, whiteSpace: "pre-line", textAlign: "center", color: "#F0EDE4" }}>
                  {card.front}
                </div>
                <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.72rem", color: "#9896A0" }}>
                  kliknij, żeby obrócić
                </div>
              </div>
            ) : (
              <div style={{ flex: 1 }}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1rem", fontFamily: "'Courier New',monospace", fontSize: "0.83rem", color: "#C8C4D0", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {card.back.structure}
                </div>
                <div style={{ marginBottom: "0.8rem" }}>
                  {card.back.examples.map((ex, i) => (
                    <div key={i} style={{ padding: "0.3rem 0.7rem", fontStyle: "italic", fontSize: "0.88rem", color: "#8BAEE6", borderLeft: "2px solid #5B8EE640", marginBottom: "0.3rem" }}>
                      {ex}
                    </div>
                  ))}
                </div>
                {card.back.tip && (
                  <div style={{ background: "rgba(232,184,75,0.08)", border: "1px solid rgba(232,184,75,0.2)", borderRadius: "8px", padding: "0.6rem 0.8rem", fontSize: "0.79rem", color: "#D4B86A", lineHeight: 1.5 }}>
                    💡 {card.back.tip}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {flipped && (
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={handleRetry}
              style={{ flex: 1, maxWidth: "200px", padding: "0.9rem 1rem", background: "rgba(224,107,92,0.15)", border: "1px solid rgba(224,107,92,0.45)", borderRadius: "12px", color: "#E88B80", cursor: "pointer", fontSize: "0.88rem", fontFamily: "Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
              <span style={{ fontSize: "1.2rem" }}>↺</span>
              <span style={{ fontWeight: 600 }}>Powtórz</span>
              <span style={{ fontSize: "0.7rem", color: "#E06B5C90" }}>jeszcze nie wiem</span>
            </button>
            <button
              onClick={handleKnow}
              style={{ flex: 1, maxWidth: "200px", padding: "0.9rem 1rem", background: "rgba(91,173,111,0.15)", border: "1px solid rgba(91,173,111,0.45)", borderRadius: "12px", color: "#8ECC9E", cursor: "pointer", fontSize: "0.88rem", fontFamily: "Georgia,serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem" }}>
              <span style={{ fontSize: "1.2rem" }}>✓</span>
              <span style={{ fontWeight: 600 }}>Znam</span>
              <span style={{ fontSize: "0.7rem", color: "#5BAD6F90" }}>umiem to</span>
            </button>
          </div>
        )}

        {!flipped && (
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setFlipped(true)}
              style={{ padding: "0.75rem 2rem", background: "rgba(232,184,75,0.15)", border: "1px solid rgba(232,184,75,0.4)", borderRadius: "10px", color: "#E8B84B", cursor: "pointer", fontSize: "0.88rem", fontFamily: "Georgia,serif" }}>
              Pokaż odpowiedź
            </button>
          </div>
        )}
      </div>
    );
  }

  if (phase === "done") {
    const total = sessionResults.length;
    const pct = Math.round((knowCount / total) * 100);
    return (
      <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
        <div style={S.card}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {pct === 100 ? "🏆" : pct >= 70 ? "🎯" : pct >= 40 ? "📈" : "📚"}
          </div>
          <div style={S.scoreBig}>{knowCount}/{total}</div>
          <div style={{ color: "#9896A0", fontSize: "0.85rem", marginTop: "0.3rem", marginBottom: "1.5rem" }}>
            {pct === 100 ? "Wszystkie fiszki opanowane! Świetna robota." :
              pct >= 70 ? "Dobry wynik! Jeszcze kilka do powtórki." :
                "Wróć do tych fiszek za chwilę."}
          </div>

          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={S.statCard}>
              <div style={S.statNum("#5BAD6F")}>{knowCount}</div>
              <div style={S.statLabel}>✓ Znam</div>
            </div>
            <div style={S.statCard}>
              <div style={S.statNum("#E06B5C")}>{retryQueue.length}</div>
              <div style={S.statLabel}>↺ Do powtórki</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            {retryQueue.length > 0 && (
              <button
                onClick={startRetryRound}
                style={{ ...S.restartBtn, background: "rgba(224,107,92,0.15)", border: "1px solid rgba(224,107,92,0.4)", color: "#E88B80" }}>
                🔁 Powtórz {retryQueue.length} fiszek
              </button>
            )}
            <button onClick={() => setPhase("decks")} style={S.restartBtn}>
              ← Wróć do talii
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.7rem", color: "#9896A0", textTransform: "uppercase", letterSpacing: "0.1em", marginRight: "0.3rem" }}>Poziom:</span>
        {Object.entries(LEVELS).map(([k, v]) => (
          <button key={k} style={S.filterBtn(selLevels.includes(k), v.color)} onClick={() => toggleLevel(k)}>
            {k} · {v.desc}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.9rem" }}>
        {deckCounts.map(d => (
          <button
            key={d.id}
            disabled={d.total === 0}
            onClick={() => startDeck(d.id)}
            style={{
              textAlign: "left", background: d.total > 0 ? `${d.color}0E` : "rgba(255,255,255,0.02)",
              border: `1px solid ${d.total > 0 ? d.color + "40" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "14px", padding: "1.2rem 1.3rem", cursor: d.total > 0 ? "pointer" : "default",
              opacity: d.total > 0 ? 1 : 0.45,
              transition: "all 0.2s",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "1.5rem" }}>{d.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.92rem", fontWeight: 600, color: d.total > 0 ? "#F0EDE4" : "#666" }}>{d.name}</div>
                <div style={{ fontSize: "0.7rem", color: d.total > 0 ? d.color : "#555", marginTop: "0.1rem" }}>{d.total} {d.total === 1 ? "fiszka" : d.total < 5 ? "fiszki" : "fiszek"}</div>
              </div>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#9896A0", lineHeight: 1.4 }}>{d.desc}</div>

            <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.7rem", flexWrap: "wrap" }}>
              {["A2", "B1", "B2", "C1"].map(lv => {
                const n = allFlashcards.filter(c => c.deckId === d.id && c.level === lv && selLevels.includes(lv)).length;
                if (n === 0) return null;
                return <span key={lv} style={{ ...S.levelBadge(lv), marginBottom: 0, fontSize: "0.6rem" }}>{lv} ×{n}</span>;
              })}
            </div>
          </button>
        ))}
      </div>

      <div style={{ ...S.tip, marginTop: "1.5rem" }}>
        <span style={S.tipLabel}>💡 Jak używać fiszek</span>
        Kliknij kartę lub przycisk „Pokaż odpowiedź", żeby zobaczyć rewers. Potem oceń się szczerze: <strong>Znam</strong> (umiesz to bez zastanowienia) lub <strong>Powtórz</strong> (niepewność, błąd). Po sesji możesz od razu powtórzyć tylko fiszki, z którymi miałeś problem.
      </div>
    </div>
  );
}
