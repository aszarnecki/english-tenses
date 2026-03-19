export const reportedSpeechTopics = [
  {
    id: "reported-statements",
    name: "Reported Statements — Backshift",
    emoji: "💬",
    color: "#E8B84B",
    level: "B1",
    structure:
      "Present Simple     →  Past Simple\n" +
      "Present Continuous →  Past Continuous\n" +
      "Present Perfect    →  Past Perfect\n" +
      "Past Simple        →  Past Perfect\n" +
      "will               →  would\n" +
      "can                →  could   ·   must → had to   ·   may → might",
    use: "Przekazywanie czyjejś wypowiedzi — cofamy czas o jeden stopień wstecz",
    pairs: [
      { direct: '"I am tired."', reported: 'She said (that) she was tired.' },
      { direct: '"I am working right now."', reported: 'He said he was working.' },
      { direct: '"I have finished the report."', reported: 'She said she had finished the report.' },
      { direct: '"I went to Paris last year."', reported: 'He said he had gone to Paris the year before.' },
      { direct: '"I will call you tomorrow."', reported: 'She said she would call me the next day.' },
      { direct: '"I can drive."', reported: 'He said he could drive.' },
      { direct: '"I must leave now."', reported: 'She said she had to leave.' },
    ],
    tip: "NIE cofamy czasu gdy: (1) reporting verb jest w teraźniejszości ('She says she is tired.'), (2) raportujemy ogólną prawdę ('He said the Earth is round.'), (3) sytuacja nadal aktualna ('She said she works in Warsaw.' — nadal tam pracuje).",
  },
  {
    id: "reported-questions",
    name: "Reported Questions",
    emoji: "❓",
    color: "#5B8EE6",
    level: "B1",
    structure:
      "Tak/Nie:  asked if / whether + podmiot + orzeczenie\n" +
      "Pytajne:  asked + wh-word + podmiot + orzeczenie\n" +
      "⚠️  Brak inwersji!  Brak do/does/did!",
    use: "Przekazywanie pytań — normalny szyk zdania oznajmującego, bez pomocniczych",
    pairs: [
      { direct: '"Do you like coffee?"', reported: 'She asked if I liked coffee.' },
      { direct: '"Are you coming to the party?"', reported: 'He asked whether I was coming to the party.' },
      { direct: '"Where do you live?"', reported: 'She asked where I lived.' },
      { direct: '"What time is it?"', reported: 'He asked what time it was.' },
      { direct: '"Have you seen John?"', reported: 'She asked if I had seen John.' },
      { direct: '"Why did you leave early?"', reported: 'He asked why I had left early.' },
    ],
    tip: "❌ She asked where did I live. → ✅ She asked where I lived. Brak inwersji i brak do/does/did w pytaniach pośrednich! Tak/Nie → if lub whether (oba poprawne).",
  },
  {
    id: "reported-commands",
    name: "Reported Commands & Requests",
    emoji: "👉",
    color: "#5BAD6F",
    level: "B1",
    structure:
      "Polecenie:  told + object + to + infinitive\n" +
      "Prośba:     asked + object + to + infinitive\n" +
      "Przeczenie: told/asked + object + not to + infinitive",
    use: "Przekazywanie poleceń i próśb — told (silniejsze) lub asked (grzeczniejsze) + to-infinitive",
    pairs: [
      { direct: '"Close the door!"', reported: 'He told me to close the door.' },
      { direct: '"Please help me."', reported: 'She asked me to help her.' },
      { direct: '"Don\'t be late!"', reported: 'She told him not to be late.' },
      { direct: '"Could you open the window?"', reported: 'He asked me to open the window.' },
      { direct: '"Don\'t touch anything!"', reported: 'The teacher told us not to touch anything.' },
      { direct: '"Please wait outside."', reported: 'She asked us to wait outside.' },
    ],
    tip: "❌ She told me close the door. → ✅ She told me to close the door. Zawsze: told/asked + OBIEKT + to-infinitive. told = polecenie. asked = prośba.",
  },
  {
    id: "reporting-verbs",
    name: "Reporting Verbs",
    emoji: "🗣️",
    color: "#CF87D6",
    level: "B2",
    structure:
      "+ that:             said, told, explained, claimed, admitted, warned, promised, insisted\n" +
      "+ to-infinitive:    offered, refused, agreed, promised, threatened\n" +
      "+ -ing:             suggested, admitted, denied, recommended\n" +
      "+ object + to-inf:  told, asked, advised, warned, reminded, encouraged",
    use: "Zamiast monotonnego 'said' — różne czasowniki wyrażające intencję mówiącego",
    pairs: [
      { direct: '"Let\'s go to the cinema."', reported: 'She suggested going to the cinema.' },
      { direct: '"I\'ll help you move house."', reported: 'He offered to help me move house.' },
      { direct: '"I didn\'t take the money!"', reported: 'She denied taking the money.' },
      { direct: '"You should see a doctor."', reported: 'He advised me to see a doctor.' },
      { direct: '"Don\'t forget to call!"', reported: 'She reminded me to call.' },
      { direct: '"I won\'t apologize!"', reported: 'He refused to apologize.' },
    ],
    tip: "❌ He suggested to go → ✅ He suggested going. ❌ She denied to steal → ✅ She denied stealing. 'Suggested' i 'denied' zawsze + -ing, nigdy + to-infinitive!",
  },
  {
    id: "time-expressions",
    name: "Time & Place Expressions",
    emoji: "🕐",
    color: "#4DAFAA",
    level: "B1",
    structure:
      "now → then / at that moment\n" +
      "today → that day  ·  tonight → that night\n" +
      "yesterday → the day before / the previous day\n" +
      "tomorrow → the next day / the following day\n" +
      "last week → the week before / the previous week\n" +
      "next week → the following week / the week after\n" +
      "… ago → … before  ·  here → there  ·  this → that",
    use: "Zmiana wyrażeń czasu i miejsca przy przekazywaniu cudzych słów — gdy sytuacja już minęła",
    pairs: [
      { direct: '"I saw her yesterday."', reported: 'He said he had seen her the day before.' },
      { direct: '"I\'ll call you tomorrow."', reported: 'She said she would call me the next day.' },
      { direct: '"I live here now."', reported: 'He said he lived there then.' },
      { direct: '"I bought it two days ago."', reported: 'She said she had bought it two days before.' },
      { direct: '"I was here last week."', reported: 'He said he had been there the week before.' },
    ],
    tip: "Wyrażeń czasu NIE zmieniamy gdy sytuacja nadal aktualna lub reporting verb w teraźniejszości: 'She says she\'s coming tomorrow.' (jutro nadal jutro). Zmiana konieczna gdy raportujemy coś z przeszłości.",
  },
];

export const reportedSpeechExercises = [
  // ── REPORTED STATEMENTS ──
  { type: "gap", tenseId: "reported-statements", instruction: "Wpisz właściwą formę (backshift)", q: '"I am tired." → She said she ___ tired.', answer: "was", hint: "Present Simple → Past Simple. am → was." },
  { type: "gap", tenseId: "reported-statements", instruction: "Wpisz właściwą formę (backshift)", q: '"I have finished the project." → He told me he ___ the project.', answer: "had finished", hint: "Present Perfect → Past Perfect. have finished → had finished." },
  { type: "gap", tenseId: "reported-statements", instruction: "Wpisz właściwą formę (backshift)", q: '"I will call you." → She said she ___ call me.', answer: "would", hint: "will → would." },
  { type: "choice", tenseId: "reported-statements", instruction: "Wybierz właściwą formę (backshift)", q: '"I can swim." → He said he ___ swim.', options: ["can", "could", "would", "will"], answer: "could", hint: "can → could." },
  { type: "choice", tenseId: "reported-statements", instruction: "Wybierz właściwą formę (backshift)", q: '"I must leave now." → She said she ___ leave.', options: ["must", "should", "had to", "would"], answer: "had to", hint: "must → had to (w mowie zależnej)." },
  { type: "error", tenseId: "reported-statements", instruction: "Znajdź i popraw błąd", q: '"I am learning English." → He said he is learning English.', answer: "He said he was learning English.", hint: "Backshift: Present Continuous → Past Continuous. is learning → was learning." },
  { type: "rewrite", tenseId: "reported-statements", instruction: "Przepisz w mowie zależnej (She said…)", q: '"I am learning Spanish."', answer: "She said she was learning Spanish.", hint: "Present Continuous → Past Continuous." },
  { type: "translate", tenseId: "reported-statements", instruction: "Przetłumacz na angielski (mowa zależna)", q: "Powiedziała, że jest zmęczona.", answer: "She said she was tired.", hint: "said + that + Past Simple (backshift z Present Simple)." },
  { type: "translate", tenseId: "reported-statements", instruction: "Przetłumacz na angielski (mowa zależna)", q: "Powiedział, że skończy raport następnego dnia.", answer: "He said he would finish the report the next day.", hint: "will → would. tomorrow → the next day." },

  // ── REPORTED QUESTIONS ──
  { type: "gap", tenseId: "reported-questions", instruction: "Wpisz właściwą formę (pytanie pośrednie)", q: '"Do you like coffee?" → She asked if I ___ coffee.', answer: "liked", hint: "Backshift: do you like → I liked. Brak inwersji." },
  { type: "gap", tenseId: "reported-questions", instruction: "Wpisz właściwą formę (pytanie pośrednie)", q: '"Where do you live?" → He asked where I ___.', answer: "lived", hint: "Pytanie pośrednie: where + podmiot + orzeczenie (bez inwersji). live → lived." },
  { type: "gap", tenseId: "reported-questions", instruction: "Wpisz właściwą formę (pytanie pośrednie)", q: '"Have you seen John?" → She asked if I ___ John.', answer: "had seen", hint: "Present Perfect → Past Perfect w pytaniu pośrednim." },
  { type: "choice", tenseId: "reported-questions", instruction: "Wybierz właściwe słowo", q: '"Are you coming?" → He asked ___ I was coming.', options: ["that", "what", "if", "when"], answer: "if", altAnswers: ["whether"], hint: "Pytanie tak/nie → asked if lub whether." },
  { type: "error", tenseId: "reported-questions", instruction: "Znajdź i popraw błąd", q: '"Where do you work?" → He asked where did I work.', answer: "He asked where I worked.", hint: "Brak inwersji w pytaniach pośrednich! ❌ where did I work → ✅ where I worked." },
  { type: "rewrite", tenseId: "reported-questions", instruction: "Przepisz jako pytanie pośrednie (She asked…)", q: '"Do you speak Polish?"', answer: "She asked if I spoke Polish.", altAnswers: ["She asked whether I spoke Polish."], hint: "Tak/Nie → asked if/whether + podmiot + orzeczenie." },
  { type: "translate", tenseId: "reported-questions", instruction: "Przetłumacz na angielski (pytanie pośrednie)", q: "Zapytał, gdzie mieszkam.", answer: "He asked where I lived.", hint: "asked where + podmiot + orzeczenie (backshift: mieszkam → lived)." },
  { type: "translate", tenseId: "reported-questions", instruction: "Przetłumacz na angielski (pytanie pośrednie)", q: "Zapytała, czy skończyłem projekt.", answer: "She asked if I had finished the project.", altAnswers: ["She asked whether I had finished the project."], hint: "asked if/whether + Past Perfect (Past Simple → Past Perfect)." },

  // ── REPORTED COMMANDS ──
  { type: "gap", tenseId: "reported-commands", instruction: "Wpisz właściwą formę (polecenie/prośba)", q: '"Close the door!" → He told me ___ the door.', answer: "to close", hint: "told + object + to-infinitive." },
  { type: "gap", tenseId: "reported-commands", instruction: "Wpisz właściwą formę (polecenie/prośba)", q: '"Don\'t be late!" → She told him ___ late.', answer: "not to be", hint: "Przeczenie: told + object + not to + infinitive." },
  { type: "gap", tenseId: "reported-commands", instruction: "Wpisz właściwą formę (polecenie/prośba)", q: '"Please help me." → She asked me ___ her.', answer: "to help", hint: "asked + object + to-infinitive." },
  { type: "choice", tenseId: "reported-commands", instruction: "Wybierz właściwą formę", q: '"Stop talking!" → The teacher told us ___ talking.', options: ["stop", "to stop", "stopping", "not to stop"], answer: "to stop", hint: "told + object + to-infinitive: told us to stop." },
  { type: "error", tenseId: "reported-commands", instruction: "Znajdź i popraw błąd", q: '"Be quiet!" → She told me be quiet.', answer: "She told me to be quiet.", hint: "❌ told me be → ✅ told me to be. Zawsze: told/asked + obiekt + TO + infinitive." },
  { type: "rewrite", tenseId: "reported-commands", instruction: "Przepisz jako polecenie pośrednie (He told me…)", q: '"Don\'t open the window."', answer: "He told me not to open the window.", hint: "Przeczenie: told + me + not to + infinitive." },
  { type: "translate", tenseId: "reported-commands", instruction: "Przetłumacz na angielski", q: "Kazała mi zostać w domu.", answer: "She told me to stay at home.", hint: "told + me + to + infinitive." },
  { type: "translate", tenseId: "reported-commands", instruction: "Przetłumacz na angielski", q: "Poprosił mnie, żebym nie hałasował.", answer: "He asked me not to make noise.", hint: "asked (prośba) + me + not to + infinitive." },

  // ── REPORTING VERBS ──
  { type: "gap", tenseId: "reporting-verbs", instruction: "Wpisz właściwy reporting verb", q: '"Let\'s go to the cinema!" → She ___ going to the cinema.', answer: "suggested", hint: "suggested + -ing (nie to-infinitive!). ❌ suggested to go → ✅ suggested going." },
  { type: "gap", tenseId: "reporting-verbs", instruction: "Wpisz właściwy reporting verb", q: '"I didn\'t take the money!" → He ___ taking the money.', answer: "denied", hint: "denied + -ing. Zaprzeczenie czyjegoś działania." },
  { type: "choice", tenseId: "reporting-verbs", instruction: "Wybierz właściwy reporting verb", q: '"You should see a doctor." → She ___ me to see a doctor.', options: ["told", "advised", "suggested", "said"], answer: "advised", hint: "advised + object + to-infinitive = porada." },
  { type: "error", tenseId: "reporting-verbs", instruction: "Znajdź i popraw błąd", q: "He suggested to go for a walk.", answer: "He suggested going for a walk.", hint: "suggested + -ing, NIE to-infinitive. ❌ suggested to go → ✅ suggested going." },
  { type: "rewrite", tenseId: "reporting-verbs", instruction: "Przepisz używając podanego czasownika (refused)", q: '"I won\'t apologize!"', answer: "He refused to apologize.", hint: "refused + to-infinitive." },
  { type: "translate", tenseId: "reporting-verbs", instruction: "Przetłumacz na angielski (użyj: suggested)", q: "Zaproponowała, żebyśmy poszli na spacer.", answer: "She suggested going for a walk.", hint: "suggested + -ing." },
  { type: "translate", tenseId: "reporting-verbs", instruction: "Przetłumacz na angielski (użyj: reminded)", q: "Przypomniała mi, żebym zadzwonił.", answer: "She reminded me to call.", hint: "reminded + object + to-infinitive." },

  // ── TIME & PLACE EXPRESSIONS ──
  { type: "gap", tenseId: "time-expressions", instruction: "Wpisz właściwe wyrażenie czasu", q: '"I saw her yesterday." → He said he had seen her ___.', answer: "the day before", altAnswers: ["the previous day"], hint: "yesterday → the day before / the previous day." },
  { type: "gap", tenseId: "time-expressions", instruction: "Wpisz właściwe wyrażenie czasu", q: '"I\'ll call you tomorrow." → She said she would call me ___.', answer: "the next day", altAnswers: ["the following day"], hint: "tomorrow → the next day / the following day." },
  { type: "choice", tenseId: "time-expressions", instruction: "Wybierz właściwe wyrażenie", q: '"I was here two days ago." → She said she had been there ___.', options: ["two days ago", "two days before", "the day before", "two days later"], answer: "two days before", hint: "ago → before w mowie zależnej." },
  { type: "error", tenseId: "time-expressions", instruction: "Znajdź i popraw błąd", q: '"I live here now." → She said she lived here now.', answer: "She said she lived there then.", hint: "here → there, now → then w mowie zależnej (gdy sytuacja minęła)." },
  { type: "rewrite", tenseId: "time-expressions", instruction: "Przepisz w mowie zależnej (She said…)", q: '"I bought it today."', answer: "She said she had bought it that day.", hint: "today → that day. bought → had bought (backshift)." },
  { type: "translate", tenseId: "time-expressions", instruction: "Przetłumacz na angielski", q: "Powiedział, że zrobi to następnego dnia.", answer: "He said he would do it the next day.", hint: "will → would. jutro (w tamtym kontekście) → the next day." },
];
