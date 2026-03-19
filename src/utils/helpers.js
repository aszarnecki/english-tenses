export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalize(s) {
  return s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, " ");
}

export function isCorrect(ex, userInput) {
  const n = normalize(userInput);
  if (normalize(ex.answer) === n) return true;
  if (ex.altAnswers && ex.altAnswers.some(a => normalize(a) === n)) return true;
  return false;
}
