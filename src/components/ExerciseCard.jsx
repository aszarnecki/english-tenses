import { useState } from "react";
import S from '../styles/index.js';
import { TYPE_LABELS, TYPE_COLORS, TYPE_ICONS } from '../data/exercises.js';
import { tenses } from '../data/tenses.js';
import { passiveTenses } from '../data/passive.js';
import { isCorrect } from '../utils/helpers.js';

export default function ExerciseCard({ ex, onResult, onNext, isLast }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const isChoiceType = ex.type === "choice" || ex.type === "identify";
  const tenseData = [...tenses, ...passiveTenses].find(t => t.id === ex.tenseId);
  function submit(val) {
    if (revealed) return;
    const correct = isChoiceType ? val === ex.answer : isCorrect(ex, val !== undefined ? val : input);
    setRevealed(true);
    if (isChoiceType) setSelected(val);
    onResult(correct, ex.tenseId);
  }
  const correct = revealed && (isChoiceType ? selected === ex.answer : isCorrect(ex, input));
  function choiceSt(opt) { if (!revealed) return null; if (opt === ex.answer) return "correct"; if (opt === selected) return "wrong"; return null; }
  return (
    <div style={S.card}>
      <div style={{ marginBottom: "0.2rem" }}>
        <span style={S.typeTag(ex.type)}>{TYPE_ICONS[ex.type]} {TYPE_LABELS[ex.type]}</span>
        {tenseData && <span style={S.tenseTagSmall(tenseData.color)}>{tenseData.emoji} {tenseData.name}</span>}
        {tenseData && tenseData.level && <span style={{ ...S.levelBadge(tenseData.level), marginLeft: "0.4rem" }}>{tenseData.level}</span>}
      </div>
      <div style={S.instruction}>{ex.instruction}</div>
      {ex.type === "gap" ? (
        <div style={S.qText}>{ex.q.split("___").map((part, i, arr) => (<span key={i}>{part}{i < arr.length - 1 && <span style={{ color: "#E8B84B", borderBottom: "1px dashed #E8B84B50", padding: "0 0.3rem" }}>{revealed ? ex.answer : "___"}</span>}</span>))}</div>
      ) : <div style={S.qText}>{ex.q}</div>}
      {isChoiceType ? (
        <div style={S.choiceGrid}>{ex.options.map(opt => (<button key={opt} style={S.choiceBtn(choiceSt(opt), selected === opt)} onClick={() => !revealed && submit(opt)}>{opt}</button>))}</div>
      ) : (
        <div style={S.inputRow}>
          <input style={S.input(revealed ? (correct ? "correct" : "wrong") : null)} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !revealed && submit()} placeholder="Wpisz odpowiedź..." disabled={revealed} autoFocus />
          {!revealed && <button style={S.checkBtn} onClick={() => submit()}>Sprawdź</button>}
        </div>
      )}
      {revealed && (<><div style={S.feedback(correct)}>{correct ? "✓ Poprawnie!" : `✗ Prawidłowa odpowiedź: „${ex.answer}"`}</div><div style={S.hintLine}>💡 {ex.hint}</div><button style={S.nextBtn} onClick={onNext}>{isLast ? "Zobacz wynik →" : "Następne →"}</button></>)}
    </div>
  );
}
