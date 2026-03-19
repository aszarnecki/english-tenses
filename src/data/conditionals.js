export const conditionals = [
  {
    id: "zero-conditional",
    name: "Zero Conditional",
    emoji: "🌍",
    color: "#E8C84B",
    level: "A2",
    structure: "If + Present Simple,  Present Simple",
    use: "Ogólne prawdy, prawa natury, instrukcje — coś jest zawsze prawdziwe",
    example: { if: "If you heat water to 100°C,", main: "it boils." },
    positive: [
      "If you heat water to 100°C, it boils.",
      "If you mix red and blue, you get purple.",
      "Plants die if they don't get water.",
    ],
    negative: [
      "If you don't eat, you get hungry.",
      "If it doesn't rain, the plants don't grow.",
    ],
    question: [
      "What happens if you press this button?",
      "Does it hurt if you touch it?",
    ],
    tip: "Zero Conditional = ZAWSZE prawda. Można zastąpić 'if' słowem 'when/whenever'. ❌ If you will heat → ✅ If you heat. Nigdy 'will' po 'if'!",
  },
  {
    id: "first-conditional",
    name: "First Conditional",
    emoji: "🔮",
    color: "#5BAD6F",
    level: "B1",
    structure: "If + Present Simple,  will + infinitive",
    use: "Realne, możliwe sytuacje w przyszłości — coś może się naprawdę wydarzyć",
    example: { if: "If it rains tomorrow,", main: "I'll take an umbrella." },
    positive: [
      "If it rains tomorrow, I'll take an umbrella.",
      "If you study hard, you will pass the exam.",
      "I'll call you if I'm late.",
    ],
    negative: [
      "If you don't hurry, we'll miss the train.",
      "She won't be happy if you forget her birthday.",
    ],
    question: [
      "Will you come if I invite you?",
      "What will you do if you miss the flight?",
    ],
    tip: "Po 'if' NIGDY nie używaj 'will': ❌ If it will rain → ✅ If it rains. Zdanie 'if' może stać na końcu bez przecinka: 'I'll help you if you ask.'",
  },
  {
    id: "second-conditional",
    name: "Second Conditional",
    emoji: "💭",
    color: "#5B8EE6",
    level: "B1",
    structure: "If + Past Simple,  would + infinitive",
    use: "Nierealne lub mało prawdopodobne sytuacje teraźniejsze/przyszłe; porady (If I were you…)",
    example: { if: "If I had more money,", main: "I would travel the world." },
    positive: [
      "If I had more money, I would travel the world.",
      "If she lived closer, we would meet more often.",
      "I would buy a car if I had enough savings.",
    ],
    negative: [
      "If I were you, I wouldn't accept that offer.",
      "He wouldn't do that if he knew the truth.",
    ],
    question: [
      "What would you do if you won the lottery?",
      "Where would you live if you could choose any city?",
    ],
    tip: "'If I were you' — stosuj WERE dla wszystkich osób w formalnym angielskim (nie 'was'). ❌ If I would have → ✅ If I had. 'Would' NIE stoi po 'if'.",
  },
  {
    id: "third-conditional",
    name: "Third Conditional",
    emoji: "⏳",
    color: "#9B6FBF",
    level: "B2",
    structure: "If + Past Perfect,  would have + V3",
    use: "Nierealne sytuacje w przeszłości — żale, wyrzuty, alternatywne scenariusze",
    example: { if: "If I had studied harder,", main: "I would have passed the exam." },
    positive: [
      "If I had studied harder, I would have passed the exam.",
      "She would have got the job if she had prepared better.",
      "If we had left earlier, we would have caught the train.",
    ],
    negative: [
      "If you hadn't been late, we wouldn't have missed the flight.",
      "I wouldn't have said that if I had known the truth.",
    ],
    question: [
      "Would you have taken the job if they had offered it?",
      "What would have happened if you hadn't called?",
    ],
    tip: "Skrót: If I'd studied… I'd have passed. ❌ If I would have studied → ✅ If I had studied. Trzeci tryb = przeszłość, której NIE MOŻNA zmienić — żal lub regret.",
  },
  {
    id: "mixed-conditional",
    name: "Mixed Conditional",
    emoji: "🔀",
    color: "#4DAFAA",
    level: "C1",
    structure: "Typ 1: If + Past Perfect,  would + infinitive\nTyp 2: If + Past Simple,  would have + V3",
    use: "Mieszanie przeszłości z teraźniejszością — skutek w innym czasie niż warunek",
    example: { if: "If I had studied medicine,", main: "I would be a doctor now." },
    positive: [
      "If I had studied medicine, I would be a doctor now.  [przeszły warunek → teraźniejszy skutek]",
      "If she had taken the job in Paris, she would be living there now.",
      "If I weren't so tired, I would have come to the party.  [teraźniejszy stan → przeszły skutek]",
    ],
    negative: [
      "If he hadn't moved abroad, he wouldn't be speaking such good English now.",
      "If I weren't allergic to cats, I would have adopted one.",
    ],
    question: [
      "Would you be happier if you had made a different choice back then?",
    ],
    tip: "Typ 1 (najczęstszy): przeszła decyzja → skutek teraźniejszy: 'If I had taken that job, I would be rich now.' Typ 2: teraźniejsza cecha → przeszły skutek: 'If I were braver, I would have spoken up.'",
  },
];

export const conditionalExercises = [
  // ── ZERO CONDITIONAL ──
  { type: "gap", tenseId: "zero-conditional", instruction: "Wpisz właściwą formę czasownika", q: "If you heat water to 100°C, it ___ (boil).", answer: "boils", hint: "Zero Conditional: If + Present Simple, Present Simple. 3. os. l. poj. → +s" },
  { type: "gap", tenseId: "zero-conditional", instruction: "Wpisz właściwą formę czasownika", q: "Plants ___ (die) if they don't get enough water.", answer: "die", hint: "Zero Conditional: oba zdania w Present Simple." },
  { type: "choice", tenseId: "zero-conditional", instruction: "Wybierz właściwą formę", q: "If you ___ sugar in water, it dissolves.", options: ["will put", "put", "would put", "had put"], answer: "put", hint: "Zero Conditional: If + Present Simple (nie will)." },
  { type: "error", tenseId: "zero-conditional", instruction: "Znajdź i popraw błąd", q: "If you will mix red and blue, you get purple.", answer: "If you mix red and blue, you get purple.", hint: "Po 'if' nigdy nie używamy 'will'. ❌ will mix → ✅ mix" },
  { type: "translate", tenseId: "zero-conditional", instruction: "Przetłumacz na angielski", q: "Jeśli nie śpisz wystarczająco, czujesz się zmęczony.", answer: "If you don't sleep enough, you feel tired.", hint: "Zero Conditional: If + Present Simple, Present Simple." },
  { type: "identify", tenseId: "zero-conditional", instruction: "Zidentyfikuj typ trybu warunkowego", q: "If you eat too much sugar, you gain weight.", options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"], answer: "Zero Conditional", hint: "Ogólna prawda biologiczna → Zero Conditional." },
  { type: "rewrite", tenseId: "zero-conditional", instruction: "Zamień 'when' na 'if' (Zero Conditional)", q: "When you press this button, the machine stops.", answer: "If you press this button, the machine stops.", hint: "Zero Conditional: 'when' i 'if' są wymienne dla ogólnych prawd." },

  // ── FIRST CONDITIONAL ──
  { type: "gap", tenseId: "first-conditional", instruction: "Wpisz właściwą formę czasownika", q: "If it ___ (rain) tomorrow, I'll stay at home.", answer: "rains", hint: "First Conditional: If + Present Simple. ❌ will rain → ✅ rains" },
  { type: "gap", tenseId: "first-conditional", instruction: "Wpisz właściwą formę czasownika", q: "We ___ (miss) the train if you don't hurry.", answer: "will miss", hint: "First Conditional: główne zdanie → will + infinitive." },
  { type: "choice", tenseId: "first-conditional", instruction: "Wybierz właściwą formę", q: "If she ___ harder, she will pass the exam.", options: ["studies", "will study", "studied", "had studied"], answer: "studies", hint: "First Conditional: If + Present Simple (nie will/would/had)." },
  { type: "error", tenseId: "first-conditional", instruction: "Znajdź i popraw błąd", q: "If you will be late, please call me.", answer: "If you are late, please call me.", hint: "Po 'if' w pierwszym trybie: Present Simple, nie 'will be'. ❌ will be → ✅ are" },
  { type: "error", tenseId: "first-conditional", instruction: "Znajdź i popraw błąd", q: "I'll help you if you will ask me.", answer: "I'll help you if you ask me.", hint: "❌ will ask → ✅ ask. 'Will' NIE stoi po 'if'." },
  { type: "translate", tenseId: "first-conditional", instruction: "Przetłumacz na angielski", q: "Jeśli nie pospieszysz się, spóźnimy się.", answer: "If you don't hurry, we'll be late.", altAnswers: ["We'll be late if you don't hurry."], hint: "First Conditional: If + Present Simple, will + infinitive." },
  { type: "translate", tenseId: "first-conditional", instruction: "Przetłumacz na angielski", q: "Zadzwonię do ciebie, jeśli skończę wcześniej.", answer: "I'll call you if I finish early.", hint: "Zdanie 'if' na końcu — bez przecinka." },
  { type: "identify", tenseId: "first-conditional", instruction: "Zidentyfikuj typ trybu warunkowego", q: "If you study every day, your English will improve.", options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"], answer: "First Conditional", hint: "Realna możliwość w przyszłości → First Conditional." },

  // ── SECOND CONDITIONAL ──
  { type: "gap", tenseId: "second-conditional", instruction: "Wpisz właściwą formę czasownika", q: "If I ___ (be) you, I would apologize.", answer: "were", hint: "Second Conditional: If I were you… (nie 'was' — użyj were dla rady)." },
  { type: "gap", tenseId: "second-conditional", instruction: "Wpisz właściwą formę czasownika", q: "What would you do if you ___ (win) the lottery?", answer: "won", hint: "Second Conditional: If + Past Simple (won, nie would win)." },
  { type: "choice", tenseId: "second-conditional", instruction: "Wybierz właściwą formę", q: "If she had more free time, she ___ take up a hobby.", options: ["will", "would", "had", "has"], answer: "would", hint: "Second Conditional: główne zdanie → would + infinitive." },
  { type: "error", tenseId: "second-conditional", instruction: "Znajdź i popraw błąd", q: "If I would have more money, I would travel.", answer: "If I had more money, I would travel.", hint: "'Would' NIE stoi po 'if'. ❌ would have → ✅ had" },
  { type: "translate", tenseId: "second-conditional", instruction: "Przetłumacz na angielski", q: "Gdybym była tobą, nie przyjęłabym tej pracy.", answer: "If I were you, I wouldn't take that job.", altAnswers: ["If I were you, I would not take that job."], hint: "'If I were you' (nie 'was'). wouldn't + infinitive." },
  { type: "translate", tenseId: "second-conditional", instruction: "Przetłumacz na angielski", q: "Gdzie byś mieszkał, gdybyś mógł wybrać dowolne miasto?", answer: "Where would you live if you could choose any city?", hint: "Second Conditional: where + would, if + Past Simple." },
  { type: "identify", tenseId: "second-conditional", instruction: "Zidentyfikuj typ trybu warunkowego", q: "If I lived in Paris, I would visit the Louvre every week.", options: ["Zero Conditional", "First Conditional", "Second Conditional", "Third Conditional"], answer: "Second Conditional", hint: "Nirealna teraźniejsza sytuacja (nie mieszkam w Paryżu) → Second Conditional." },
  { type: "rewrite", tenseId: "second-conditional", instruction: "Przetransformuj na Second Conditional", q: "I don't have a car, so I can't drive you to the airport.", answer: "If I had a car, I could drive you to the airport.", altAnswers: ["If I had a car, I would drive you to the airport."], hint: "Zmień na nierealną sytuację: If + Past Simple, would/could + infinitive." },

  // ── THIRD CONDITIONAL ──
  { type: "gap", tenseId: "third-conditional", instruction: "Wpisz właściwą formę czasownika", q: "If I ___ (study) harder, I would have passed.", answer: "had studied", hint: "Third Conditional: If + Past Perfect (had + V3)." },
  { type: "gap", tenseId: "third-conditional", instruction: "Wpisz właściwą formę czasownika", q: "She would have got the job if she ___ (prepare) better.", answer: "had prepared", hint: "Third Conditional: if + had + V3 (Past Perfect)." },
  { type: "gap", tenseId: "third-conditional", instruction: "Wpisz właściwą formę czasownika", q: "If we had left earlier, we ___ (catch) the train.", answer: "would have caught", hint: "Third Conditional: would have + V3. catch → caught." },
  { type: "choice", tenseId: "third-conditional", instruction: "Wybierz właściwą formę", q: "If you hadn't been late, we ___ missed the flight.", options: ["wouldn't have", "won't have", "wouldn't", "hadn't"], answer: "wouldn't have", hint: "Third Conditional: wouldn't have + V3." },
  { type: "error", tenseId: "third-conditional", instruction: "Znajdź i popraw błąd", q: "If I would have known, I would have helped you.", answer: "If I had known, I would have helped you.", hint: "❌ would have known → ✅ had known. Po 'if' używamy Past Perfect (had + V3)." },
  { type: "translate", tenseId: "third-conditional", instruction: "Przetłumacz na angielski", q: "Gdybyś zadzwonił wcześniej, zdążyłbym.", answer: "If you had called earlier, I would have made it.", altAnswers: ["I would have made it if you had called earlier."], hint: "Third Conditional: If + had + V3, would have + V3." },
  { type: "translate", tenseId: "third-conditional", instruction: "Przetłumacz na angielski", q: "Nie spóźnilibyśmy się, gdybyśmy wyszli wcześniej.", answer: "We wouldn't have been late if we had left earlier.", altAnswers: ["If we had left earlier, we wouldn't have been late."], hint: "wouldn't have been + V3 (been). If + had left." },
  { type: "rewrite", tenseId: "third-conditional", instruction: "Przetransformuj na Third Conditional", q: "She didn't study, so she failed the exam.", answer: "If she had studied, she wouldn't have failed the exam.", hint: "Third Conditional wyraża żal: If + had studied, wouldn't have failed." },
  { type: "identify", tenseId: "third-conditional", instruction: "Zidentyfikuj typ trybu warunkowego", q: "If she had applied for that job, she would have got it.", options: ["First Conditional", "Second Conditional", "Third Conditional", "Mixed Conditional"], answer: "Third Conditional", hint: "Nierealna przeszłość (nie aplikowała) → Third Conditional." },

  // ── MIXED CONDITIONAL ──
  { type: "gap", tenseId: "mixed-conditional", instruction: "Wpisz właściwą formę (Mixed Conditional)", q: "If I ___ (study) medicine, I would be a doctor now.", answer: "had studied", hint: "Mixed (Typ 1): przeszły warunek → If + Past Perfect. Skutek teraźniejszy → would + infinitive." },
  { type: "gap", tenseId: "mixed-conditional", instruction: "Wpisz właściwą formę (Mixed Conditional)", q: "If I weren't so tired, I ___ (come) to the party last night.", answer: "would have come", hint: "Mixed (Typ 2): teraźniejszy stan (I'm tired) → skutek w przeszłości → would have + V3." },
  { type: "choice", tenseId: "mixed-conditional", instruction: "Wybierz właściwą formę", q: "If he had taken better care of his health, he ___ still be alive today.", options: ["would", "will", "had", "would have"], answer: "would", hint: "Mixed Typ 1: przeszły warunek (hadn't taken care) → teraźniejszy skutek → would + infinitive." },
  { type: "error", tenseId: "mixed-conditional", instruction: "Znajdź i popraw błąd", q: "If I would have studied abroad, my English would be better now.", answer: "If I had studied abroad, my English would be better now.", hint: "❌ would have studied → ✅ had studied. Po 'if' w Mixed Conditional Typ 1: Past Perfect." },
  { type: "translate", tenseId: "mixed-conditional", instruction: "Przetłumacz na angielski (Mixed Conditional)", q: "Gdybym wybrał inny zawód, nie byłbym teraz tak szczęśliwy.", answer: "If I had chosen a different career, I wouldn't be so happy now.", hint: "Mixed Typ 1: If + had chosen (Past Perfect), would + be (teraźniejszość)." },
  { type: "identify", tenseId: "mixed-conditional", instruction: "Zidentyfikuj typ trybu warunkowego", q: "If she had moved to London years ago, she would be fluent in English by now.", options: ["Second Conditional", "Third Conditional", "Mixed Conditional", "First Conditional"], answer: "Mixed Conditional", hint: "Przeszły warunek (had moved) + teraźniejszy skutek (would be) = Mixed Conditional Typ 1." },
];
