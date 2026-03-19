export function todayStr() { return new Date().toISOString().slice(0, 10); }

export async function safeGet(key) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
}

export async function safeSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

export async function bumpStreak() {
  const streak = (await safeGet('p-streak')) || { lastDate: null, count: 0 };
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastDate === today) return;
  streak.count = streak.lastDate === yesterday ? streak.count + 1 : 1;
  streak.lastDate = today;
  await safeSet('p-streak', streak);
}

export async function saveExerciseResult(tenseId, correct) {
  if (!tenseId) return;
  const stats = (await safeGet('pt-stats')) || {};
  if (!stats[tenseId]) stats[tenseId] = { correct: 0, total: 0 };
  stats[tenseId].total++;
  if (correct) stats[tenseId].correct++;
  await safeSet('pt-stats', stats);
  await bumpStreak();
}

export async function saveFlashcardResult(cardId, know) {
  const stats = (await safeGet('pf-stats')) || {};
  if (!stats[cardId]) stats[cardId] = { know: 0, retry: 0 };
  if (know) stats[cardId].know++; else stats[cardId].retry++;
  await safeSet('pf-stats', stats);
  await bumpStreak();
}

export async function saveSession(session) {
  const sessions = (await safeGet('p-sessions')) || [];
  sessions.unshift({ ...session, date: todayStr() });
  if (sessions.length > 50) sessions.splice(50);
  await safeSet('p-sessions', sessions);
}

export async function loadProgress() {
  const [tenseStats, fcStats, sessions, streak] = await Promise.all([
    safeGet('pt-stats'), safeGet('pf-stats'), safeGet('p-sessions'), safeGet('p-streak'),
  ]);
  return { tenseStats: tenseStats || {}, fcStats: fcStats || {}, sessions: sessions || [], streak: streak || { lastDate: null, count: 0 } };
}
