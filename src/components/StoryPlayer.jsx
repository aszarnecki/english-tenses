import { useState } from "react";
import S from '../styles/index.js';
import { normalize, isCorrect } from '../utils/helpers.js';
import { saveExerciseResult } from '../utils/storage.js';

export default function StoryPlayer({ story, onFinish }) {
  const gaps = story.segments.filter(s => typeof s === "object");
  const [gapIdx, setGapIdx] = useState(0);
  const [input, setInput] = useState("");
  const [gapResults, setGapResults] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const currentGap = gaps[gapIdx];
  const correct = revealed && (normalize(input) === normalize(currentGap.answer) || (currentGap.altAnswers && currentGap.altAnswers.some(a => normalize(a) === normalize(input))));
  function submit() {
    if (!input.trim() || revealed) return;
    setRevealed(true);
    const ok = normalize(input) === normalize(currentGap.answer) || (currentGap.altAnswers && currentGap.altAnswers.some(a => normalize(a) === normalize(input)));
    setGapResults(r => [...r, { input, answer: currentGap.answer, correct: ok }]);
    saveExerciseResult(story.id, ok);
  }
  function next() {
    if (gapIdx + 1 >= gaps.length) { setDone(true); return; }
    setGapIdx(i => i + 1); setInput(""); setRevealed(false);
  }
  function renderText() {
    let gapCount = 0;
    return story.segments.map((seg, i) => {
      if (typeof seg === "string") return <span key={i}>{seg}</span>;
      const idx = gapCount++;
      const result = gapResults[idx];
      const isActive = idx === gapIdx && !done;
      let content, color, bg;
      if (done || result) {
        const r = result || { answer: gaps[idx].answer, correct: true };
        content = r.answer; color = r.correct ? "#8ECC9E" : "#E88B80"; bg = r.correct ? "rgba(91,173,111,0.12)" : "rgba(224,107,92,0.12)";
      } else if (isActive) {
        content = input || "(…)"; color = "#E8B84B"; bg = "rgba(232,184,75,0.12)";
      } else {
        content = "___"; color = "#9896A0"; bg = "rgba(255,255,255,0.04)";
      }
      return <span key={i} style={{ display: "inline-block", background: bg, color, borderRadius: "4px", padding: "0 0.3rem", fontWeight: isActive ? 700 : 400, border: isActive ? "1px solid rgba(232,184,75,0.4)" : "1px solid transparent", transition: "all 0.2s" }}>{content}</span>;
    });
  }
  const score = gapResults.filter(r => r.correct).length;
  if (done) {
    return (
      <div style={S.card}>
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>{score === gaps.length ? "🏆" : score >= gaps.length * 0.7 ? "🎯" : "📚"}</div>
          <div style={S.scoreBig}>{score}/{gaps.length}</div>
          <div style={{ color: "#9896A0", fontSize: "0.85rem", marginTop: "0.3rem" }}>{score === gaps.length ? "Perfekcyjnie!" : score >= gaps.length * 0.7 ? "Świetnie!" : "Wróć do lekcji i spróbuj jeszcze raz."}</div>
        </div>
        <div style={{ marginBottom: "1.2rem" }}>
          <div style={S.sLabel}>Kompletny tekst</div>
          <div style={{ fontSize: "0.95rem", lineHeight: 2, background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "1rem 1.2rem", border: "1px solid rgba(255,255,255,0.07)" }}>{renderText()}</div>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
          <button style={S.restartBtn} onClick={onFinish}>← Wróć do wyboru historii</button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div style={S.progressRow}>
        <span style={{ fontSize: "0.75rem", color: "#9896A0" }}>Luka {gapIdx + 1}/{gaps.length}</span>
        <div style={S.progressBar}><div style={S.progressFill((gapIdx / gaps.length) * 100)} /></div>
        <span style={{ fontSize: "0.75rem", color: "#5BAD6F" }}>✓ {score}</span>
      </div>
      <div style={{ ...S.card, marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.8rem" }}>
          <span style={{ fontSize: "1.3rem" }}>{story.emoji}</span>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 600 }}>{story.title}</div>
            <div style={{ fontSize: "0.72rem", color: story.color }}>{story.focus}</div>
          </div>
          <span style={{ ...S.levelBadge(story.level), marginBottom: 0, marginLeft: "auto" }}>{story.level}</span>
        </div>
        <div style={{ fontSize: "0.95rem", lineHeight: 2.1 }}>{renderText()}</div>
      </div>
      <div style={S.card}>
        <div style={S.instruction}>Uzupełnij bieżącą lukę — ({currentGap.verb})</div>
        <div style={S.inputRow}>
          <input style={S.input(revealed ? (correct ? "correct" : "wrong") : null)} value={input}
            onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !revealed && submit()}
            placeholder="Wpisz formę czasownika..." disabled={revealed} autoFocus />
          {!revealed && <button style={S.checkBtn} onClick={submit}>Sprawdź</button>}
        </div>
        {revealed && (<><div style={S.feedback(correct)}>{correct ? "✓ Poprawnie!" : `✗ Prawidłowa odpowiedź: „${currentGap.answer}"`}</div><div style={S.hintLine}>💡 {currentGap.hint}</div><button style={S.nextBtn} onClick={next}>{gapIdx + 1 >= gaps.length ? "Zakończ historię →" : "Następna luka →"}</button></>)}
      </div>
    </div>
  );
}
