import S from '../styles/index.js';
import { stories } from '../data/stories.js';

export default function StorySetup({ onStart }) {
  return (
    <div>
      <div style={{ ...S.card, marginBottom: "1rem" }}>
        <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem" }}>📖 Tryb historii — uzupełnianie tekstu</div>
        <div style={{ fontSize: "0.8rem", color: "#9896A0", lineHeight: 1.6 }}>Wypełniasz luki w dłuższych tekstach. Każda historia skupia się na jednym lub dwóch czasach w naturalnym kontekście.</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "0.7rem" }}>
        {stories.map(s => {
          const gapCount = s.segments.filter(seg => typeof seg === "object").length;
          return (
            <button key={s.id} onClick={() => onStart(s)}
              style={{ textAlign: "left", background: `${s.color}0C`, border: `1px solid ${s.color}35`, borderRadius: "12px", padding: "1.1rem", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#F0EDE4" }}>{s.title}</div>
                  <div style={{ fontSize: "0.7rem", color: s.color, marginTop: "0.1rem" }}>{s.focus}</div>
                </div>
                <span style={{ ...S.levelBadge(s.level), marginBottom: 0 }}>{s.level}</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#9896A0" }}>{gapCount} luk do uzupełnienia</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
