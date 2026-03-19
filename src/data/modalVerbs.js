export const modalVerbTopics = [
  {
    id: "can-could",
    name: "Can / Could",
    emoji: "💪",
    color: "#E8B84B",
    level: "A2",
    structure:
      "can  + V (base)   →  obecna umiejętność, pozwolenie, możliwość\n" +
      "could + V (base)  →  przeszła umiejętność, grzeczna prośba, hipotetyczna możliwość\n" +
      "❌  can't / couldn't + V",
    use: "Umiejętność, pozwolenie, prośby i możliwość — teraźniejsza i przeszła",
    pairs: [
      { direct: "Umiejętność (teraźniejszość)", reported: "She can speak three languages." },
      { direct: "Umiejętność (przeszłość)", reported: "When I was young, I could run very fast." },
      { direct: "Pozwolenie (nieformalne)", reported: "Can I open the window?" },
      { direct: "Grzeczna prośba (could = uprzejmiej)", reported: "Could you help me with this, please?" },
      { direct: "Możliwość / przypuszczenie", reported: "It could be dangerous — be careful." },
      { direct: "Brak umiejętności", reported: "He can't swim, so he stayed on the beach." },
      { direct: "Oferta / propozycja", reported: "I can give you a lift to the station." },
    ],
    tip: "can = teraźniejszość. could = przeszłość LUB uprzejma forma. ❌ I can to swim → ✅ I can swim. Po modalnym NIGDY 'to'! Wyjątek: have TO, ought TO.",
  },
  {
    id: "must-have-to",
    name: "Must / Have to / Mustn't / Don't have to",
    emoji: "⚠️",
    color: "#E06B5C",
    level: "B1",
    structure:
      "must      →  wewnętrzny obowiązek lub dedukcja (jestem przekonany)\n" +
      "have to   →  zewnętrzny obowiązek (przepisy, okoliczności)\n" +
      "mustn't   →  ZAKAZ (nie wolno!)\n" +
      "don't have to  →  brak konieczności (nie trzeba — ale można)",
    use: "Obowiązek, zakaz i brak konieczności — najważniejsza różnica: mustn't ≠ don't have to",
    pairs: [
      { direct: "Obowiązek wewnętrzny (sam uważam)", reported: "I must call my mum — I haven't spoken to her in weeks." },
      { direct: "Obowiązek zewnętrzny (zasady/prawo)", reported: "You have to wear a seatbelt in a car." },
      { direct: "Dedukcja (prawie pewne)", reported: "She must be tired — she's been working all day." },
      { direct: "ZAKAZ — nie wolno!", reported: "You mustn't smoke in this building." },
      { direct: "Brak konieczności — nie trzeba (ale można)", reported: "You don't have to come if you're busy." },
      { direct: "Brak konieczności (przeszłość)", reported: "We didn't have to wait long — the bus came on time." },
    ],
    tip: "❌ Mustn't ≠ don't have to! 'You mustn't do it' = ZAKAZ. 'You don't have to do it' = nie jest konieczne. To fundamentalna różnica! must → had to w przeszłości: 'I had to leave early.'",
  },
  {
    id: "should-ought-to",
    name: "Should / Ought to / Had better",
    emoji: "💡",
    color: "#5BAD6F",
    level: "B1",
    structure:
      "should     + V  →  rada, zalecenie, łagodny obowiązek\n" +
      "ought to   + V  →  jak should, bardziej formalne\n" +
      "had better + V  →  silna rada z ostrzeżeniem (lepiej… bo inaczej…)",
    use: "Rady, zalecenia i ostrzeżenia — od łagodnej sugestii po mocne ostrzeżenie",
    pairs: [
      { direct: "Rada / zalecenie", reported: "You should see a doctor about that cough." },
      { direct: "Łagodny obowiązek moralny", reported: "We should help people in need." },
      { direct: "Oczekiwanie / prawdopodobieństwo", reported: "The package should arrive tomorrow." },
      { direct: "Krytyka (nie zrobił czegoś)", reported: "You shouldn't have said that — she's upset now." },
      { direct: "Ought to (formalniej = should)", reported: "You ought to apologize to him." },
      { direct: "Had better (silna rada + implikacja)", reported: "You had better leave now or you'll miss the train." },
    ],
    tip: "should have + V3 = krytyka lub żal dotyczący przeszłości: 'You should have told me!' (= ale nie powiedziałeś). had better = silniejsze niż should, implikuje negatywne konsekwencje. Skrót: you'd better.",
  },
  {
    id: "may-might-possibility",
    name: "May / Might — Możliwość",
    emoji: "🎲",
    color: "#9B6FBF",
    level: "B1",
    structure:
      "will      →  ~100% pewne (I will be there.)\n" +
      "may       →  ~50% możliwe (It may rain.)\n" +
      "might     →  ~30% możliwe, mniej pewne (It might rain.)\n" +
      "may/might + not  →  możliwe, że nie",
    use: "Wyrażanie stopnia możliwości i niepewności — od pewności do spekulacji",
    pairs: [
      { direct: "Możliwe (neutralnie)", reported: "It may rain this afternoon — take an umbrella." },
      { direct: "Mniej pewne (wątpliwość)", reported: "She might come to the party, but I'm not sure." },
      { direct: "Możliwe, że nie", reported: "I may not be able to make it — I'll let you know." },
      { direct: "Formalne pozwolenie (may)", reported: "May I use your phone for a moment?" },
      { direct: "Spekulacja o teraźniejszości", reported: "Where's Tom? — He might be in the office." },
      { direct: "Might = bardziej niepewne", reported: "I might take a holiday next month, I haven't decided." },
    ],
    tip: "may vs might: oba wyrażają możliwość, might = mniej pewne. W formalnym angielskim 'May I?' = prośba o pozwolenie (uprzejmiej niż 'Can I?'). Skala pewności: will (100%) > should (80%) > may (50%) > might (30%) > can't (0%).",
  },
  {
    id: "modal-perfect",
    name: "Modal Perfect (modal + have + V3)",
    emoji: "🔍",
    color: "#4DAFAA",
    level: "B2",
    structure:
      "must have + V3     →  pewna dedukcja o przeszłości\n" +
      "can't have + V3    →  niemożliwe (dedukcja negatywna)\n" +
      "could have + V3    →  możliwość w przeszłości (niezrealizowana)\n" +
      "should have + V3   →  żal lub krytyka (ale nie zrobił tego)\n" +
      "might have + V3    →  niepewna możliwość w przeszłości",
    use: "Dedukcje i spekulacje o przeszłości oraz wyrażanie żalów — modal + have + V3",
    pairs: [
      { direct: "Prawie pewna dedukcja (musiał)", reported: "She must have forgotten — she never misses meetings." },
      { direct: "Niemożliwe (nie mógł)", reported: "He can't have seen us — he was in another city." },
      { direct: "Niezrealizowana możliwość (mógł, ale nie)", reported: "You could have told me! I would have helped." },
      { direct: "Żal / krytyka (powinien był, ale nie)", reported: "I should have studied more — I failed the exam." },
      { direct: "Niepewna możliwość w przeszłości", reported: "I'm not sure where she is — she might have gone home." },
      { direct: "Niezrealizowana możliwość (negatywna)", reported: "You shouldn't have waited — it was a waste of time." },
    ],
    tip: "must have = pewna dedukcja (jestem prawie pewien). can't have = dedukcja negatywna (niemożliwe). could have = była możliwość (ale nie skorzystałeś). should have = żal lub wyrzut. Wszystkie: modal + HAVE + V3 (past participle).",
  },
];

export const modalVerbExercises = [
  // ── CAN / COULD ──
  { type: "gap", tenseId: "can-could", instruction: "Wpisz can lub could", q: "When I was a child, I ___ climb trees very fast.", answer: "could", hint: "could = umiejętność w PRZESZŁOŚCI." },
  { type: "gap", tenseId: "can-could", instruction: "Wpisz can lub could", q: "___ you help me move this table, please?", answer: "Could", hint: "Could = uprzejma prośba (grzeczniejsze niż can).", altAnswers: ["could"] },
  { type: "choice", tenseId: "can-could", instruction: "Wybierz właściwą formę", q: "She ___ speak French and Italian fluently.", options: ["can", "could", "might", "should"], answer: "can", hint: "can = obecna umiejętność." },
  { type: "error", tenseId: "can-could", instruction: "Znajdź i popraw błąd", q: "I can to swim, but I can't to dive.", answer: "I can swim, but I can't dive.", hint: "Po modalnym NIGDY 'to'. ❌ can to swim → ✅ can swim." },
  { type: "translate", tenseId: "can-could", instruction: "Przetłumacz na angielski", q: "Czy mógłbyś otworzyć okno? Jest tu bardzo gorąco.", answer: "Could you open the window? It's very hot in here.", hint: "could + you + infinitive = uprzejma prośba." },
  { type: "translate", tenseId: "can-could", instruction: "Przetłumacz na angielski", q: "Ona nie umie jeździć na rowerze.", answer: "She can't ride a bike.", altAnswers: ["She cannot ride a bike."], hint: "can't = brak umiejętności (teraźniejszość)." },
  { type: "identify", tenseId: "can-could", instruction: "Jakie znaczenie ma 'could' w tym zdaniu?", q: "It could rain later — bring a jacket.", options: ["przeszła umiejętność", "grzeczna prośba", "hipotetyczna możliwość", "pozwolenie"], answer: "hipotetyczna możliwość", hint: "could + bezokolicznik o przyszłości = możliwość/przypuszczenie." },

  // ── MUST / HAVE TO ──
  { type: "gap", tenseId: "must-have-to", instruction: "Wpisz must, have to, mustn't lub don't have to", q: "You ___ touch that wire — it's dangerous!", answer: "mustn't", hint: "mustn't = ZAKAZ. Nie wolno tego dotykać." },
  { type: "gap", tenseId: "must-have-to", instruction: "Wpisz must, have to, mustn't lub don't have to", q: "It's Sunday — you ___ get up early.", answer: "don't have to", hint: "don't have to = brak konieczności (nie trzeba, ale można)." },
  { type: "choice", tenseId: "must-have-to", instruction: "Wybierz właściwą formę", q: "You ___ wear a helmet when cycling — it's the law.", options: ["mustn't", "don't have to", "have to", "could"], answer: "have to", hint: "have to = zewnętrzny obowiązek (prawo, przepisy)." },
  { type: "choice", tenseId: "must-have-to", instruction: "Wybierz właściwą formę", q: "She ___ be tired — she's been working for 12 hours.", options: ["has to", "must", "should", "can"], answer: "must", hint: "must = dedukcja, jestem prawie pewien." },
  { type: "error", tenseId: "must-have-to", instruction: "Znajdź i popraw błąd", q: "You mustn't to bring food into the library.", answer: "You mustn't bring food into the library.", hint: "Po mustn't BRAK 'to'. ❌ mustn't to bring → ✅ mustn't bring." },
  { type: "translate", tenseId: "must-have-to", instruction: "Przetłumacz na angielski", q: "Nie musisz tu przychodzić jutro — biuro jest zamknięte.", answer: "You don't have to come here tomorrow — the office is closed.", hint: "don't have to = brak konieczności (nie trzeba)." },
  { type: "translate", tenseId: "must-have-to", instruction: "Przetłumacz na angielski", q: "Nie wolno tu palić.", answer: "You mustn't smoke here.", altAnswers: ["Smoking is not allowed here."], hint: "mustn't = zakaz." },
  { type: "rewrite", tenseId: "must-have-to", instruction: "Przepisz używając 'had to' (przeszłość)", q: "I must leave early today.", answer: "I had to leave early.", hint: "must → had to w przeszłości (nie 'musted')." },

  // ── SHOULD / OUGHT TO ──
  { type: "gap", tenseId: "should-ought-to", instruction: "Wpisz should lub shouldn't", q: "You look pale. You ___ see a doctor.", answer: "should", hint: "should = rada/zalecenie." },
  { type: "gap", tenseId: "should-ought-to", instruction: "Wpisz właściwą formę (krytyka o przeszłości)", q: "You ___ (tell) me earlier — I could have helped!", answer: "should have told", hint: "should have + V3 = krytyka lub żal dotyczący przeszłości." },
  { type: "choice", tenseId: "should-ought-to", instruction: "Wybierz właściwą formę", q: "You ___ leave now or you'll miss the last train.", options: ["should", "had better", "ought", "could"], answer: "had better", hint: "had better = silna rada z implikacją negatywnych konsekwencji." },
  { type: "error", tenseId: "should-ought-to", instruction: "Znajdź i popraw błąd", q: "You should to apologize to her immediately.", answer: "You should apologize to her immediately.", hint: "Po should BRAK 'to'. ❌ should to apologize → ✅ should apologize." },
  { type: "translate", tenseId: "should-ought-to", instruction: "Przetłumacz na angielski", q: "Powinieneś był sprawdzić trasę przed wyjazdem.", answer: "You should have checked the route before leaving.", hint: "should have + V3 = żal/krytyka o przeszłości." },
  { type: "translate", tenseId: "should-ought-to", instruction: "Przetłumacz na angielski", q: "Lepiej idź spać — jutro masz egzamin.", answer: "You had better go to sleep — you have an exam tomorrow.", altAnswers: ["You'd better go to sleep — you have an exam tomorrow."], hint: "had better = silna rada. Skrót: you'd better." },
  { type: "identify", tenseId: "should-ought-to", instruction: "Jakie znaczenie ma 'should' w tym zdaniu?", q: "The results should be ready by Friday.", options: ["rada", "żal o przeszłości", "oczekiwanie/prawdopodobieństwo", "zakaz"], answer: "oczekiwanie/prawdopodobieństwo", hint: "should = spodziewamy się, że tak będzie." },

  // ── MAY / MIGHT ──
  { type: "gap", tenseId: "may-might-possibility", instruction: "Wpisz may lub might", q: "Take an umbrella — it ___ rain later.", answer: "might", altAnswers: ["may"], hint: "may/might = możliwość w przyszłości. might = mniej pewne." },
  { type: "gap", tenseId: "may-might-possibility", instruction: "Wpisz may lub might", q: "___ I use your charger for a moment?", answer: "May", altAnswers: ["may"], hint: "May I…? = formalna prośba o pozwolenie." },
  { type: "choice", tenseId: "may-might-possibility", instruction: "Wybierz właściwą formę (mniej pewna możliwość)", q: "I'm not sure — she ___ be at home or she ___ have gone out.", options: ["will / will", "may / may", "might / might", "should / should"], answer: "might / might", hint: "might = niepewna możliwość (mniej pewne niż may)." },
  { type: "error", tenseId: "may-might-possibility", instruction: "Znajdź i popraw błąd", q: "He might to be in a meeting right now.", answer: "He might be in a meeting right now.", hint: "Po might BRAK 'to'. ❌ might to be → ✅ might be." },
  { type: "translate", tenseId: "may-might-possibility", instruction: "Przetłumacz na angielski", q: "Możliwe, że jutro przyjdę na spotkanie, ale jeszcze nie wiem.", answer: "I might come to the meeting tomorrow, but I'm not sure yet.", altAnswers: ["I may come to the meeting tomorrow, but I'm not sure yet."], hint: "might = możliwość z wątpliwością." },
  { type: "translate", tenseId: "may-might-possibility", instruction: "Przetłumacz na angielski", q: "Czy mogę zadać pytanie?", answer: "May I ask a question?", altAnswers: ["Can I ask a question?"], hint: "May I…? = formalne pozwolenie." },

  // ── MODAL PERFECT ──
  { type: "gap", tenseId: "modal-perfect", instruction: "Wpisz właściwą formę (modal perfect)", q: "She's not answering — she ___ (leave) already.", answer: "must have left", hint: "must have + V3 = prawie pewna dedukcja o przeszłości." },
  { type: "gap", tenseId: "modal-perfect", instruction: "Wpisz właściwą formę (modal perfect)", q: "I ___ (tell) her the truth — now she's angry with me.", answer: "shouldn't have told", hint: "shouldn't have + V3 = żal / krytyka — nie powinienem był." },
  { type: "choice", tenseId: "modal-perfect", instruction: "Wybierz właściwą formę", q: "He ___ the meeting — he was abroad that week.", options: ["can't have attended", "must have attended", "should have attended", "might have attended"], answer: "can't have attended", hint: "can't have + V3 = niemożliwa dedukcja o przeszłości." },
  { type: "choice", tenseId: "modal-perfect", instruction: "Wybierz właściwą formę", q: "You ___ called me — I was waiting for two hours!", answer: "could have called", options: ["must have called", "could have called", "can't have called", "might called"], hint: "could have + V3 = była możliwość (ale jej nie wykorzystałeś)." },
  { type: "error", tenseId: "modal-perfect", instruction: "Znajdź i popraw błąd", q: "She must have forgot her keys — they're on the table.", answer: "She must have forgotten her keys — they're on the table.", hint: "V3 of forget = forgotten (nie forgot). must have + V3." },
  { type: "translate", tenseId: "modal-perfect", instruction: "Przetłumacz na angielski", q: "On musiał zapomnieć o spotkaniu — nigdy się nie spóźnia.", answer: "He must have forgotten about the meeting — he's never late.", hint: "must have + V3 (forgotten) = prawie pewna dedukcja." },
  { type: "translate", tenseId: "modal-perfect", instruction: "Przetłumacz na angielski", q: "Powinieneś był wziąć parasol — jesteś cały mokry.", answer: "You should have taken an umbrella — you're soaking wet.", hint: "should have + V3 = żal/wyrzut o przeszłości." },
  { type: "rewrite", tenseId: "modal-perfect", instruction: "Wyraź dedukcję za pomocą 'must have' lub 'can't have'", q: "I'm sure she didn't see us — she was looking the other way.", answer: "She can't have seen us — she was looking the other way.", hint: "can't have + V3 = niemożliwe, żeby to zrobiła." },
];
