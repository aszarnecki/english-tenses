import { useState, useEffect } from "react";

const LEVELS = {
  A2: { label: "A2", color: "#5BAD6F", desc: "Podstawowy" },
  B1: { label: "B1", color: "#5B8EE6", desc: "Średnio-zaawansowany" },
  B2: { label: "B2", color: "#E8B84B", desc: "Wyższy średni" },
  C1: { label: "C1", color: "#E06B5C", desc: "Zaawansowany" },
};

const tenses = [
  { id: "present-simple", name: "Present Simple", emoji: "☀️", color: "#E8B84B", level: "A2", structure: "Subject + V (base) / V + -s/-es (he/she/it)", use: "Fakty, nawyki, rutyny, prawdy ogólne", positive: ["I work every day.", "She reads books.", "They play football."], negative: ["I don't work on Sundays.", "He doesn't like coffee."], question: ["Do you work here?", "Does she speak French?"], signals: ["always", "usually", "often", "sometimes", "never", "every day"], tip: "Pamiętaj o -s/-es dla he/she/it! → She works, He goes, She watches", dialogue: [{ speaker: "A", line: "Where do you work?" }, { speaker: "B", line: "I work at a hospital. I'm a nurse." }, { speaker: "A", line: "Do you like your job?" }, { speaker: "B", line: "Yes, I do! I usually start at 7am, but sometimes I work night shifts." }] },
  { id: "past-simple", name: "Past Simple", emoji: "⏮️", color: "#E06B5C", level: "A2", structure: "Subject + V2 (past form) / did + V (base)", use: "Zakończone czynności w przeszłości — wiemy kiedy", positive: ["I worked yesterday.", "She went to Paris last year.", "They played chess."], negative: ["I didn't work yesterday.", "He didn't go to school."], question: ["Did you work yesterday?", "Where did she go?"], signals: ["yesterday", "last week/year", "ago", "in 2010", "when I was young"], tip: "Czasowniki nieregularne: go→went, have→had, see→saw, make→made. Warto nauczyć się na pamięć!", dialogue: [{ speaker: "A", line: "Did you have a good weekend?" }, { speaker: "B", line: "Yes! We went to Kraków on Saturday." }, { speaker: "A", line: "Really? What did you do there?" }, { speaker: "B", line: "We visited the old town and ate at a great restaurant. It was fantastic!" }] },
  { id: "future-will", name: "Future Simple (will)", emoji: "🚀", color: "#5BAD6F", level: "A2", structure: "Subject + will + V (base)", use: "Spontaniczne decyzje, przepowiednie, obietnice, fakty o przyszłości", positive: ["I will call you later.", "She will be a doctor.", "It will rain tomorrow."], negative: ["I won't be late.", "He won't come.", "They won't agree."], question: ["Will you help me?", "Will she come?"], signals: ["tomorrow", "soon", "in the future", "I think", "probably", "I promise", "I'm sure"], tip: "WILL = spontaniczna decyzja. 'I'll have a coffee, please.' Porównaj z going to — zaplanowane z wyprzedzeniem.", dialogue: [{ speaker: "A", line: "The printer is broken again." }, { speaker: "B", line: "Don't worry, I'll fix it." }, { speaker: "A", line: "Are you sure? It looks complicated." }, { speaker: "B", line: "I promise, it won't take long. I think it will be fine in ten minutes." }] },
  { id: "future-going-to", name: "Future (going to)", emoji: "📅", color: "#CF87D6", level: "A2", structure: "Subject + am/is/are + going to + V (base)", use: "Zaplanowane zamiary, przewidywania oparte na dowodach", positive: ["I'm going to study tonight.", "She's going to travel next year.", "Look — it's going to rain!"], negative: ["I'm not going to give up.", "He isn't going to come."], question: ["Are you going to apply?", "What are you going to do?"], signals: ["tonight", "next week/month/year", "soon", "I plan to", "I intend to"], tip: "Widzisz ciemne chmury → 'It's going to rain.' (dowód przed oczami). Opinia bez dowodów → 'It will probably rain.'", dialogue: [{ speaker: "A", line: "What are you going to do this summer?" }, { speaker: "B", line: "I'm going to visit my family in Gdańsk. I've already booked the tickets." }, { speaker: "A", line: "That sounds great! Are you going to stay long?" }, { speaker: "B", line: "About two weeks. We're going to rent a cottage by the sea." }] },
  { id: "present-continuous", name: "Present Continuous", emoji: "🔄", color: "#5B8EE6", level: "B1", structure: "Subject + am/is/are + V-ing", use: "Czynności dziejące się teraz, tymczasowe plany w najbliższej przyszłości", positive: ["I am working right now.", "She is reading.", "They are playing."], negative: ["I'm not working today.", "He isn't listening."], question: ["Are you working now?", "Is she coming?"], signals: ["now", "right now", "at the moment", "currently", "today", "this week", "Look!"], tip: "Czasowniki stanowe NIE tworzą continuous: know, love, want, need, hate, believe, understand. ❌ I am knowing → ✅ I know", dialogue: [{ speaker: "A", line: "Hey, what are you doing? You look busy." }, { speaker: "B", line: "I'm preparing for tomorrow's presentation. I'm still working on the slides." }, { speaker: "A", line: "Is Jan helping you?" }, { speaker: "B", line: "No, he's not coming in today. He's working from home this week." }] },
  { id: "present-perfect", name: "Present Perfect", emoji: "🔗", color: "#7C5CBF", level: "B1", structure: "Subject + have/has + V3 (past participle)", use: "Doświadczenia życiowe, czynności z przeszłości mające skutek teraz", positive: ["I have visited Paris.", "She has finished her work.", "They have eaten."], negative: ["I haven't seen that film.", "He hasn't called yet."], question: ["Have you ever been to Japan?", "Has she arrived?"], signals: ["ever", "never", "just", "already", "yet", "recently", "since", "for"], tip: "'I went' = wiemy kiedy → Past Simple. 'I have been' = życiowe doświadczenie, bez konkretnego czasu → Present Perfect.", dialogue: [{ speaker: "A", line: "Have you ever tried sushi?" }, { speaker: "B", line: "Yes, I have! I've eaten it many times. Have you?" }, { speaker: "A", line: "No, I haven't. I've never been brave enough." }, { speaker: "B", line: "You should try it! I've just found a great restaurant — it's opened recently." }] },
  { id: "past-continuous", name: "Past Continuous", emoji: "📽️", color: "#4DAFAA", level: "B1", structure: "Subject + was/were + V-ing", use: "Czynność trwająca w określonym momencie w przeszłości, tło dla innej czynności", positive: ["I was working at 8pm.", "She was reading when I called.", "They were sleeping."], negative: ["I wasn't sleeping.", "They weren't watching TV."], question: ["Were you working at noon?", "What were you doing?"], signals: ["while", "when", "at that moment", "all day", "at 8 o'clock yesterday"], tip: "'I was watching TV when the phone rang.' → was/were + -ing = tło, Past Simple = przerywające zdarzenie.", dialogue: [{ speaker: "A", line: "What were you doing when the storm started?" }, { speaker: "B", line: "I was walking home from work. It was terrible!" }, { speaker: "A", line: "Were you carrying an umbrella?" }, { speaker: "B", line: "No, I wasn't! I was listening to music and not paying attention to the clouds." }] },
  { id: "used-to", name: "Used to / Would", emoji: "🕰️", color: "#A0B060", level: "B1", structure: "Subject + used to + V (base)  /  Subject + would + V (base)", use: "Dawne nawyki i stany — rzeczy, które kiedyś robiłeś regularnie, ale już nie robisz", positive: ["I used to smoke.", "We would walk to school every day.", "She used to have long hair."], negative: ["I didn't use to like vegetables.", "He didn't use to exercise."], question: ["Did you use to live here?", "Did she use to play tennis?"], signals: ["when I was young", "as a child", "in the past", "back then", "no longer", "anymore"], tip: "'Used to' = dawny stan LUB nawyk. 'Would' = tylko dawny nawyk (nie stan). ✅ 'I used to live there' ❌ 'I would live there' (stan).", dialogue: [{ speaker: "A", line: "You look so different! Did you use to have short hair?" }, { speaker: "B", line: "Yes! I used to have very short hair. I also used to wear glasses." }, { speaker: "A", line: "And what about sport? You seem very fit." }, { speaker: "B", line: "I didn't use to exercise at all. I would just sit at home every evening. Things change!" }] },
  { id: "present-perfect-continuous", name: "Present Perfect Continuous", emoji: "⏳", color: "#E8945A", level: "B2", structure: "Subject + have/has + been + V-ing", use: "Czynność trwająca od pewnego momentu do teraz, nacisk na czas trwania lub skutki widoczne teraz", positive: ["I have been working for 3 hours.", "She has been crying — her eyes are red.", "They have been studying all day."], negative: ["I haven't been sleeping well lately.", "He hasn't been eating much."], question: ["How long have you been waiting?", "Has she been running?"], signals: ["for (+ okres)", "since (+ punkt w czasie)", "how long", "all day/morning", "lately", "recently"], tip: "PP vs PPC: 'I have read 50 pages' (wynik — ile?) vs 'I have been reading for 2 hours' (czas trwania — jak długo?). 'How long?' → PPC.", dialogue: [{ speaker: "A", line: "You look exhausted! What's happened?" }, { speaker: "B", line: "I've been working on this report since 6am. I haven't been sleeping well either." }, { speaker: "A", line: "How long have you been sitting here?" }, { speaker: "B", line: "About five hours. My back has been hurting for the last hour too. I need a break." }] },
  { id: "past-perfect", name: "Past Perfect", emoji: "⏪", color: "#D4836A", level: "B2", structure: "Subject + had + V3 (past participle)", use: "Czynność, która nastąpiła PRZED inną czynnością w przeszłości", positive: ["I had finished before she arrived.", "She had already eaten.", "They had left."], negative: ["He hadn't seen the film.", "We hadn't met before."], question: ["Had you eaten before the meeting?", "Had she left?"], signals: ["before", "after", "already", "by the time", "when (+ past simple)", "never…before"], tip: "Past Perfect = 'przeszłość w przeszłości'. Dwa zdarzenia w przeszłości — to wcześniejsze dostaje had + V3.", dialogue: [{ speaker: "A", line: "Why were you so tired at the meeting yesterday?" }, { speaker: "B", line: "Because I hadn't slept at all. I had been working until 3am." }, { speaker: "A", line: "Had you prepared everything by the time the meeting started?" }, { speaker: "B", line: "Just barely! The report had only been finished ten minutes before we sat down." }] },
  { id: "future-continuous", name: "Future Continuous", emoji: "🌊", color: "#60B8C0", level: "B2", structure: "Subject + will be + V-ing", use: "Czynność trwająca w określonym momencie w przyszłości; grzeczne pytania o plany", positive: ["I will be working at 8pm tomorrow.", "She will be sleeping when you arrive.", "This time next week I'll be lying on the beach!"], negative: ["I won't be using the car tomorrow.", "They won't be attending the meeting."], question: ["Will you be working on Sunday?", "Will she be joining us?"], signals: ["at this time tomorrow", "this time next week/year", "at 8pm tomorrow", "when you arrive (future)"], tip: "Future Continuous jest też uprzejmym sposobem pytania o plany: 'Will you be using the printer?' (vs bezpośrednie 'Will you use it?').", dialogue: [{ speaker: "A", line: "Will you be coming to the party on Saturday?" }, { speaker: "B", line: "I'm not sure. I'll be visiting my parents this weekend." }, { speaker: "A", line: "What time will you be getting back?" }, { speaker: "B", line: "Probably late evening. This time tomorrow I'll be driving back on the motorway!" }] },
  { id: "past-perfect-continuous", name: "Past Perfect Continuous", emoji: "🎞️", color: "#C07090", level: "C1", structure: "Subject + had been + V-ing", use: "Czynność trwająca przez pewien czas PRZED inną czynnością w przeszłości — nacisk na czas trwania", positive: ["She had been crying — her eyes were red.", "I had been waiting for an hour when he finally arrived.", "They had been arguing before the silence fell."], negative: ["He hadn't been sleeping well before he got sick.", "We hadn't been working long when the power went out."], question: ["How long had you been waiting?", "Had she been studying before the exam?"], signals: ["for (+ czas) before…", "since… when…", "how long had…", "already (+ czas trwania)"], tip: "PP vs PPC w przeszłości: 'He was tired because he had worked all day' (wynik) vs 'had been working all day' (nacisk na ciągłość i wysiłek).", dialogue: [{ speaker: "A", line: "Why was she so upset when you arrived?" }, { speaker: "B", line: "She had been waiting for over two hours. The train had been delayed." }, { speaker: "A", line: "Had she been trying to contact you?" }, { speaker: "B", line: "Yes, she had been calling and texting me, but my phone had died. It was a mess." }] },
  { id: "future-perfect", name: "Future Perfect", emoji: "✅", color: "#8080D0", level: "C1", structure: "Subject + will have + V3 (past participle)", use: "Czynność zakończona PRZED określonym momentem w przyszłości", positive: ["I will have finished by 6pm.", "She will have graduated by next year.", "By 2030, he will have lived here for 20 years."], negative: ["I won't have finished the project by Friday.", "They won't have arrived by the time we leave."], question: ["Will you have finished by then?", "Will she have left by 9am?"], signals: ["by (+ czas)", "by the time…", "before (+ czas przyszły)", "by then", "by next year"], tip: "Słowo-klucz to 'by' = 'do (godziny/daty)'. 'I will have finished by 6pm' → do 18:00 wynik jest gotowy.", dialogue: [{ speaker: "A", line: "Will you have finished the project by Friday?" }, { speaker: "B", line: "I hope so. By Thursday I will have written the main report." }, { speaker: "A", line: "And what about the presentation?" }, { speaker: "B", line: "I won't have prepared it by Friday — I'll need the weekend. By Monday it will all be done." }] },
  { id: "future-perfect-continuous", name: "Future Perfect Continuous", emoji: "♾️", color: "#B060A0", level: "C1", structure: "Subject + will have been + V-ing", use: "Czynność trwająca PRZEZ pewien czas aż do określonego momentu w przyszłości — nacisk na czas trwania", positive: ["By July, I will have been working here for 10 years.", "She will have been studying for 6 hours by midnight.", "They will have been dating for a year next month."], negative: ["By then, I won't have been living here long.", "He won't have been waiting long."], question: ["How long will you have been working there by December?", "Will she have been studying long enough?"], signals: ["by… for…", "by the time… (+ czas trwania)", "for (+ okres) by (+ punkt w czasie)"], tip: "FPC łączy Future Perfect z akcentem na czas trwania. Typowa struktura: 'By [moment], I will have been [czynność] for [jak długo].'", dialogue: [{ speaker: "A", line: "This project is taking forever." }, { speaker: "B", line: "I know. By the time we finish, we will have been working on it for three years." }, { speaker: "A", line: "That's crazy. Will you have been leading the team that whole time?" }, { speaker: "B", line: "Yes. By December, I will have been managing this department for a decade. Time flies." }] },
];

// ─── PASSIVE VOICE DATA ────────────────────────────────────────────────────
const passiveTenses = [
  { id: "passive-present-simple", name: "Present Simple Passive", emoji: "🟡", color: "#E8B84B", level: "B1", structure: "Subject + is/are + V3", active: "Someone cleans the office every day.", passive: "The office is cleaned every day.", use: "Fakty, rutyny — kto wykonuje czynność jest nieznany lub nieważny", positive: ["The office is cleaned every day.", "Emails are sent automatically.", "English is spoken here."], negative: ["The door isn't locked at night.", "These products aren't made in Poland."], question: ["Is this building used regularly?", "Are the reports checked?"], tip: "Zamieniaj gdy sprawca jest nieznany lub oczywisty. 'The window was broken' — nie wiemy kto." },
  { id: "passive-past-simple", name: "Past Simple Passive", emoji: "🔴", color: "#E06B5C", level: "B1", structure: "Subject + was/were + V3", active: "Someone built this bridge in 1905.", passive: "This bridge was built in 1905.", use: "Zakończone czynności w przeszłości, sprawca nieznany lub nieważny", positive: ["This bridge was built in 1905.", "The letters were delivered yesterday.", "She was promoted last year."], negative: ["The documents weren't signed.", "The match wasn't cancelled."], question: ["Was the car repaired?", "Were the results announced?"], tip: "Często w tekstach historycznych i naukowych: 'Penicillin was discovered in 1928.' — kto ją odkrył jest wtórne." },
  { id: "passive-present-continuous", name: "Present Continuous Passive", emoji: "🔵", color: "#5B8EE6", level: "B2", structure: "Subject + is/are being + V3", active: "They are repairing the road right now.", passive: "The road is being repaired right now.", use: "Czynności trwające teraz, które dzieją się z podmiotem", positive: ["The road is being repaired right now.", "A new system is being tested.", "The patients are being examined."], negative: ["The building isn't being used at the moment.", "The project isn't being discussed."], question: ["Is the report being prepared?", "Are the new employees being trained?"], tip: "am/is/are + being + V3. Najczęściej w kontekście bieżących prac lub procesów." },
  { id: "passive-present-perfect", name: "Present Perfect Passive", emoji: "🟣", color: "#7C5CBF", level: "B2", structure: "Subject + has/have been + V3", active: "Someone has stolen my wallet.", passive: "My wallet has been stolen.", use: "Czynności zakończone z widocznym skutkiem teraz — bez informacji kto je wykonał", positive: ["My wallet has been stolen.", "The project has been completed.", "Three new laws have been passed."], negative: ["The form hasn't been filled in yet.", "No decision has been made."], question: ["Has the report been submitted?", "Have the results been published?"], tip: "Klasyczne użycie: wiadomości i raporty. 'Two people have been arrested.' — kto aresztował jest oczywiste lub nieważne." },
  { id: "passive-future", name: "Future Passive (will)", emoji: "🟢", color: "#5BAD6F", level: "B2", structure: "Subject + will be + V3", active: "They will announce the results tomorrow.", passive: "The results will be announced tomorrow.", use: "Zapowiedzi, plany, przewidywania — czynność dotknie podmiotu", positive: ["The results will be announced tomorrow.", "New offices will be opened next year.", "You will be contacted soon."], negative: ["The event won't be cancelled.", "No changes will be made."], question: ["Will the contract be signed?", "Will passengers be informed?"], tip: "Często w oficjalnych komunikatach: 'The station will be closed for repairs.' Pasywne brzmi bardziej formalnie." },
  { id: "passive-modal", name: "Modal Passive", emoji: "⚙️", color: "#4DAFAA", level: "B2", structure: "Subject + modal + be + V3", active: "You must submit the form by Friday.", passive: "The form must be submitted by Friday.", use: "Obowiązki, możliwości, zalecenia — kto ma coś zrobić jest nieważne", positive: ["The form must be submitted by Friday.", "This medicine should be kept in the fridge.", "The system can be upgraded easily.", "The report might be delayed."], negative: ["The data shouldn't be shared.", "The file can't be opened without a password."], question: ["Can this be fixed?", "Should the contract be reviewed?"], tip: "modal + be + V3 (bez zmiany modalnego). 'can be done', 'must be signed', 'should be checked', 'might be cancelled'." },
  { id: "passive-past-perfect", name: "Past Perfect Passive", emoji: "⏪", color: "#D4836A", level: "C1", structure: "Subject + had been + V3", active: "Someone had already repaired the machine before we arrived.", passive: "The machine had already been repaired before we arrived.", use: "Czynność zakończona (w stronie biernej) przed inną czynnością w przeszłości", positive: ["The machine had already been repaired before we arrived.", "By the time he applied, all positions had been filled.", "The letter had been sent before she changed her mind."], negative: ["The report hadn't been approved when the meeting started.", "No decision had been made yet."], question: ["Had the contract been signed before the deadline?", "Had the witnesses been interviewed?"], tip: "had been + V3 = strona bierna Past Perfect. Rzadsze, ale ważne w tekstach prawniczych, historycznych i reportażach." },
];

const passiveExercises = [
  { type: "gap", tenseId: "passive-present-simple", instruction: "Wpisz właściwą formę (strona bierna)", q: "The office ___ (clean) every day.", answer: "is cleaned", hint: "Rutyna → Present Simple Passive: is/are + V3" },
  { type: "gap", tenseId: "passive-present-simple", instruction: "Wpisz właściwą formę (strona bierna)", q: "These products ___ (not / make) in Poland.", answer: "aren't made", hint: "Forma przecząca: aren't + V3", altAnswers: ["are not made"] },
  { type: "gap", tenseId: "passive-past-simple", instruction: "Wpisz właściwą formę (strona bierna)", q: "This bridge ___ (build) in 1905.", answer: "was built", hint: "Zakończona czynność historyczna → Past Simple Passive: was/were + V3" },
  { type: "gap", tenseId: "passive-past-simple", instruction: "Wpisz właściwą formę (strona bierna)", q: "The documents ___ (not / sign) yesterday.", answer: "weren't signed", hint: "Forma przecząca l. mn.: weren't + V3", altAnswers: ["were not signed"] },
  { type: "gap", tenseId: "passive-present-continuous", instruction: "Wpisz właściwą formę (strona bierna)", q: "The road ___ (repair) right now.", answer: "is being repaired", hint: "Czynność trwająca teraz → Present Continuous Passive: is/are being + V3" },
  { type: "gap", tenseId: "passive-present-continuous", instruction: "Wpisz właściwą formę (strona bierna)", q: "A new system ___ (test) at the moment.", answer: "is being tested", hint: "is being + V3 (bieżący proces)" },
  { type: "gap", tenseId: "passive-present-perfect", instruction: "Wpisz właściwą formę (strona bierna)", q: "My wallet ___ (steal).", answer: "has been stolen", hint: "Skutek widoczny teraz → Present Perfect Passive: has/have been + V3" },
  { type: "gap", tenseId: "passive-present-perfect", instruction: "Wpisz właściwą formę (strona bierna)", q: "Three people ___ (arrest) in connection with the robbery.", answer: "have been arrested", hint: "l. mn. → have been + V3" },
  { type: "gap", tenseId: "passive-future", instruction: "Wpisz właściwą formę (strona bierna)", q: "The results ___ (announce) tomorrow.", answer: "will be announced", hint: "Przyszła czynność w stronie biernej → will be + V3" },
  { type: "gap", tenseId: "passive-future", instruction: "Wpisz właściwą formę (strona bierna)", q: "You ___ (contact) shortly.", answer: "will be contacted", hint: "will be + V3 — formalny styl" },
  { type: "gap", tenseId: "passive-modal", instruction: "Wpisz właściwą formę (strona bierna)", q: "The form ___ (must / submit) by Friday.", answer: "must be submitted", hint: "modal + be + V3 (bez zmiany modalnego)" },
  { type: "gap", tenseId: "passive-modal", instruction: "Wpisz właściwą formę (strona bierna)", q: "This medicine ___ (should / keep) in the fridge.", answer: "should be kept", hint: "should be + V3 (keep → kept)" },
  { type: "gap", tenseId: "passive-past-perfect", instruction: "Wpisz właściwą formę (strona bierna)", q: "By the time he applied, all positions ___ (fill).", answer: "had been filled", hint: "Zakończone PRZED inną przeszłą czynnością → had been + V3" },
  { type: "rewrite", tenseId: "passive-present-simple", instruction: "Zamień na stronę bierną", q: "Someone cleans the office every day.", answer: "The office is cleaned every day.", hint: "Podmiot ← obiekt, czasownik → is/are + V3" },
  { type: "rewrite", tenseId: "passive-past-simple", instruction: "Zamień na stronę bierną", q: "Shakespeare wrote Hamlet.", answer: "Hamlet was written by Shakespeare.", hint: "Obiekt → podmiot; was/were + V3 + by + sprawca" },
  { type: "rewrite", tenseId: "passive-present-perfect", instruction: "Zamień na stronę bierną", q: "Someone has stolen my car.", answer: "My car has been stolen.", hint: "has/have been + V3; sprawcę pomijamy gdy nieznany" },
  { type: "rewrite", tenseId: "passive-future", instruction: "Zamień na stronę bierną", q: "They will announce the results tomorrow.", answer: "The results will be announced tomorrow.", hint: "will be + V3" },
  { type: "rewrite", tenseId: "passive-modal", instruction: "Zamień na stronę bierną", q: "You must submit the report by Monday.", answer: "The report must be submitted by Monday.", hint: "modal + be + V3" },
  { type: "choice", tenseId: "passive-present-simple", instruction: "Wybierz właściwą formę", q: "English ___ all over the world.", options: ["speaks", "is spoken", "has spoken", "was spoken"], answer: "is spoken", hint: "Fakt ogólny w stronie biernej → is/are + V3" },
  { type: "choice", tenseId: "passive-past-simple", instruction: "Wybierz właściwą formę", q: "Penicillin ___ in 1928.", options: ["discovers", "was discovered", "has been discovered", "is discovered"], answer: "was discovered", hint: "Zakończona czynność historyczna → Past Simple Passive" },
  { type: "choice", tenseId: "passive-present-perfect", instruction: "Wybierz właściwą formę", q: "The suspect ___ but later released.", options: ["arrested", "was arrested", "has been arrested", "is arrested"], answer: "has been arrested", hint: "Skutek obecny w chwili mówienia → Present Perfect Passive" },
  { type: "choice", tenseId: "passive-modal", instruction: "Wybierz właściwą formę", q: "The contract ___ before the meeting.", options: ["should review", "should be review", "should be reviewed", "should reviewed"], answer: "should be reviewed", hint: "modal + be + V3 (review → reviewed)" },
  { type: "error", tenseId: "passive-present-simple", instruction: "Znajdź i popraw błąd (strona bierna)", q: "The report is write every month.", answer: "The report is written every month.", hint: "V3 formy: write → written (nie: write)" },
  { type: "error", tenseId: "passive-past-simple", instruction: "Znajdź i popraw błąd (strona bierna)", q: "The building was build in 1890.", answer: "The building was built in 1890.", hint: "build → built (forma nieregularna V3)" },
  { type: "error", tenseId: "passive-modal", instruction: "Znajdź i popraw błąd (strona bierna)", q: "The door must been locked.", answer: "The door must be locked.", hint: "Po modal zawsze: be + V3 (nie: been)" },
  { type: "identify", tenseId: "passive-present-simple", instruction: "Zidentyfikuj formę bierną", q: "These cars are manufactured in Germany.", options: ["Active Present Simple", "Passive Present Simple", "Passive Past Simple", "Passive Present Perfect"], answer: "Passive Present Simple", hint: "are + V3 (manufactured) → Present Simple Passive" },
  { type: "identify", tenseId: "passive-past-simple", instruction: "Zidentyfikuj formę bierną", q: "The letter was delivered this morning.", options: ["Passive Present Simple", "Passive Past Simple", "Passive Present Perfect", "Active Past Simple"], answer: "Passive Past Simple", hint: "was + V3 (delivered) → Past Simple Passive" },
  { type: "identify", tenseId: "passive-present-perfect", instruction: "Zidentyfikuj formę bierną", q: "All tickets have been sold.", options: ["Passive Present Simple", "Passive Past Simple", "Passive Present Perfect", "Passive Future"], answer: "Passive Present Perfect", hint: "have been + V3 (sold) → Present Perfect Passive" },
  { type: "translate", tenseId: "passive-present-simple", instruction: "Przetłumacz na angielski (strona bierna)", q: "Angielski jest uczony w wielu szkołach.", answer: "English is taught in many schools.", hint: "Fakt ogólny → Present Simple Passive: is + V3" },
  { type: "translate", tenseId: "passive-past-simple", instruction: "Przetłumacz na angielski (strona bierna)", q: "Ten zamek zbudowano w XV wieku.", answer: "This castle was built in the 15th century.", altAnswers: ["This castle was built in the fifteenth century."], hint: "Czynność historyczna → Past Simple Passive: was + V3" },
  { type: "translate", tenseId: "passive-present-perfect", instruction: "Przetłumacz na angielski (strona bierna)", q: "Mój rower został skradziony.", answer: "My bike has been stolen.", hint: "Skutek teraz (nie ma roweru) → Present Perfect Passive: has been + V3" },
  { type: "translate", tenseId: "passive-future", instruction: "Przetłumacz na angielski (strona bierna)", q: "Wyniki zostaną ogłoszone w piątek.", answer: "The results will be announced on Friday.", hint: "Przyszłość bierna → will be + V3" },
  { type: "translate", tenseId: "passive-modal", instruction: "Przetłumacz na angielski (strona bierna)", q: "Formularz należy wypełnić przed spotkaniem.", answer: "The form must be filled in before the meeting.", altAnswers: ["The form should be filled in before the meeting.", "The form has to be filled in before the meeting."], hint: "modal + be + V3" },
];

// ─── EXERCISES ────────────────────────────────────────────────────────────
const TYPE_LABELS = { gap: "Uzupełnij lukę", choice: "Wybór wielokrotny", error: "Popraw błąd", identify: "Rozpoznaj czas", translate: "Tłumaczenie", rewrite: "Przepisz zdanie" };
const TYPE_COLORS = { gap: "#E8B84B", choice: "#5B8EE6", error: "#E06B5C", identify: "#7C5CBF", translate: "#4DAFAA", rewrite: "#CF87D6" };
const TYPE_ICONS = { gap: "✏️", choice: "🔘", error: "🔍", identify: "🏷️", translate: "🌐", rewrite: "🔄" };

const allExercises = [
  { type: "gap", tenseId: "present-simple", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (work) every day.", answer: "works", hint: "Rutyna, 3. osoba l. poj. → +s" },
  { type: "gap", tenseId: "present-simple", instruction: "Wpisz właściwą formę czasownika", q: "Water ___ (boil) at 100°C.", answer: "boils", hint: "Fakt naukowy = Present Simple" },
  { type: "gap", tenseId: "present-simple", instruction: "Wpisz właściwą formę czasownika", q: "They ___ (not / watch) TV in the morning.", answer: "don't watch", hint: "Forma przecząca l. mn.: don't + bezokolicznik" },
  { type: "choice", tenseId: "present-simple", instruction: "Wybierz poprawną odpowiedź", q: "My brother ___ in Warsaw.", options: ["live", "lives", "is living", "lived"], answer: "lives", hint: "3. osoba l. poj. → lives" },
  { type: "error", tenseId: "present-simple", instruction: "Znajdź i popraw błąd w zdaniu", q: "She don't like coffee.", answer: "She doesn't like coffee.", hint: "3. osoba l. poj. → doesn't (nie: don't)" },
  { type: "identify", tenseId: "present-simple", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "The sun rises in the east.", options: ["Present Simple", "Present Continuous", "Present Perfect", "Past Simple"], answer: "Present Simple", hint: "Fakt ogólny/zawsze prawdziwy → Present Simple" },
  { type: "translate", tenseId: "present-simple", instruction: "Przetłumacz na angielski", q: "Ona gra na gitarze każdego wieczoru.", answer: "She plays the guitar every evening.", hint: "Nawyk → Present Simple; she → plays (+s)" },
  { type: "rewrite", tenseId: "present-simple", instruction: "Przepisz zdanie w formie pytającej", q: "She works in a hospital.", answer: "Does she work in a hospital?", hint: "Does + she + bezokolicznik (bez -s)?" },
  { type: "gap", tenseId: "past-simple", instruction: "Wpisz właściwą formę czasownika", q: "We ___ (visit) London last summer.", answer: "visited", hint: "Konkretny czas w przeszłości → Past Simple" },
  { type: "gap", tenseId: "past-simple", instruction: "Wpisz właściwą formę czasownika", q: "He ___ (not / go) to school yesterday.", answer: "didn't go", hint: "Forma przecząca: didn't + bezokolicznik", altAnswers: ["did not go"] },
  { type: "gap", tenseId: "past-simple", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (buy) a new car two weeks ago.", answer: "bought", hint: "buy → bought (nieregularny)" },
  { type: "choice", tenseId: "past-simple", instruction: "Wybierz poprawną odpowiedź", q: "Shakespeare ___ many plays.", options: ["writes", "has written", "write", "wrote"], answer: "wrote", hint: "Osoba nieżyjąca + skończona czynność → Past Simple" },
  { type: "error", tenseId: "past-simple", instruction: "Znajdź i popraw błąd w zdaniu", q: "He didn't went to school.", answer: "He didn't go to school.", hint: "Po 'didn't' zawsze bezokolicznik (go, nie went)" },
  { type: "identify", tenseId: "past-simple", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "We went to the cinema last Friday.", options: ["Present Perfect", "Past Continuous", "Past Simple", "Past Perfect"], answer: "Past Simple", hint: "'last Friday' = konkretny czas → Past Simple" },
  { type: "translate", tenseId: "past-simple", instruction: "Przetłumacz na angielski", q: "Wczoraj nie poszłam do pracy.", answer: "I didn't go to work yesterday.", hint: "Yesterday + przecząca → didn't + bezokolicznik" },
  { type: "rewrite", tenseId: "past-simple", instruction: "Przepisz zdanie w formie pytającej", q: "She spoke to the manager.", answer: "Did she speak to the manager?", hint: "Did + podmiot + bezokolicznik?" },
  { type: "gap", tenseId: "future-will", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (call) you tomorrow, I promise!", answer: "will call", hint: "Obietnica → will" },
  { type: "gap", tenseId: "future-will", instruction: "Wpisz właściwą formę czasownika", q: "I think it ___ (rain) later.", answer: "will rain", hint: "Przepowiednia bez dowodów → will" },
  { type: "choice", tenseId: "future-will", instruction: "Wybierz poprawną odpowiedź", q: "— I'm cold. — I ___ close the window for you.", options: ["close", "am going to close", "will close", "closed"], answer: "will close", hint: "Spontaniczna decyzja w momencie mówienia → will" },
  { type: "error", tenseId: "future-will", instruction: "Znajdź i popraw błąd w zdaniu", q: "I will to call you later.", answer: "I will call you later.", hint: "Po 'will' NIE ma 'to' — zawsze podstawowa forma" },
  { type: "translate", tenseId: "future-will", instruction: "Przetłumacz na angielski", q: "Myślę, że ona zda ten egzamin.", answer: "I think she will pass the exam.", hint: "Opinia o przyszłości (I think) → will" },
  { type: "gap", tenseId: "future-going-to", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (travel) to Japan next month. She bought the ticket.", answer: "is going to travel", hint: "Zaplanowany wyjazd z dowodem → going to" },
  { type: "gap", tenseId: "future-going-to", instruction: "Wpisz właściwą formę czasownika", q: "Look at those clouds! It ___ (rain).", answer: "is going to rain", hint: "Widzisz dowód → going to" },
  { type: "choice", tenseId: "future-going-to", instruction: "Wybierz poprawną odpowiedź", q: "She has bought paint. She ___ redecorate her room.", options: ["will redecorate", "is going to redecorate", "redecorates", "has redecorated"], answer: "is going to redecorate", hint: "Ma już farbę — dowód na plan → going to" },
  { type: "error", tenseId: "future-going-to", instruction: "Znajdź i popraw błąd w zdaniu", q: "She is go to study medicine.", answer: "She is going to study medicine.", hint: "Struktura: is going to (nie: is go to)" },
  { type: "translate", tenseId: "future-going-to", instruction: "Przetłumacz na angielski", q: "Zamierzamy kupić nowy samochód.", answer: "We are going to buy a new car.", altAnswers: ["We're going to buy a new car."], hint: "Zamierzać coś zrobić → going to" },
  { type: "gap", tenseId: "present-continuous", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (read) a book right now.", answer: "am reading", hint: "Teraz, w tej chwili → am/is/are + -ing" },
  { type: "gap", tenseId: "present-continuous", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (not / listen) to music at the moment.", answer: "isn't listening", hint: "Forma przecząca: isn't + -ing", altAnswers: ["is not listening"] },
  { type: "choice", tenseId: "present-continuous", instruction: "Wybierz poprawną odpowiedź", q: "Listen! Someone ___ at the door.", options: ["knock", "knocks", "is knocking", "knocked"], answer: "is knocking", hint: "Słyszysz to teraz → Present Continuous" },
  { type: "error", tenseId: "present-continuous", instruction: "Znajdź i popraw błąd w zdaniu", q: "I am know the answer.", answer: "I know the answer.", hint: "know = czasownik stanowy — NIE używamy z -ing!" },
  { type: "translate", tenseId: "present-continuous", instruction: "Przetłumacz na angielski", q: "Właśnie teraz piszę raport.", answer: "I am writing a report right now.", altAnswers: ["I'm writing a report right now."], hint: "right now → Present Continuous" },
  { type: "gap", tenseId: "present-perfect", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (never / try) sushi.", answer: "have never tried", hint: "Doświadczenie życiowe + never" },
  { type: "gap", tenseId: "present-perfect", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (just / finish) her homework.", answer: "has just finished", hint: "'just' → Present Perfect, 3. os. l. poj." },
  { type: "gap", tenseId: "present-perfect", instruction: "Wpisz właściwą formę czasownika", q: "They ___ (not / arrive) yet.", answer: "haven't arrived", hint: "'yet' w zdaniach przeczących → Present Perfect", altAnswers: ["have not arrived"] },
  { type: "choice", tenseId: "present-perfect", instruction: "Wybierz poprawną odpowiedź", q: "I ___ my keys. I can't find them!", options: ["lose", "lost", "have lost", "was losing"], answer: "have lost", hint: "Skutek widoczny teraz → Present Perfect" },
  { type: "error", tenseId: "present-perfect", instruction: "Znajdź i popraw błąd w zdaniu", q: "I have seen that film yesterday.", answer: "I saw that film yesterday.", hint: "'Yesterday' = konkretny czas → Past Simple (nie Present Perfect)" },
  { type: "translate", tenseId: "present-perfect", instruction: "Przetłumacz na angielski", q: "Czy kiedykolwiek byłeś w Australii?", answer: "Have you ever been to Australia?", hint: "ever = kiedykolwiek → Present Perfect; been (nie: went)" },
  { type: "gap", tenseId: "past-continuous", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (sleep) when I called her.", answer: "was sleeping", hint: "Czynność trwająca gdy nastąpiło przerwanie" },
  { type: "gap", tenseId: "past-continuous", instruction: "Wpisz właściwą formę czasownika", q: "While I ___ (cook), the fire alarm went off.", answer: "was cooking", hint: "'While' + czynność w tle → Past Continuous" },
  { type: "choice", tenseId: "past-continuous", instruction: "Wybierz poprawną odpowiedź", q: "While I ___ dinner, the phone rang.", options: ["cook", "cooked", "was cooking", "had cooked"], answer: "was cooking", hint: "Czynność w tle ('while') → Past Continuous" },
  { type: "error", tenseId: "past-continuous", instruction: "Znajdź i popraw błąd w zdaniu", q: "They was playing football when it started to rain.", answer: "They were playing football when it started to rain.", hint: "They (l. mn.) → were (nie: was)" },
  { type: "translate", tenseId: "past-continuous", instruction: "Przetłumacz na angielski", q: "O godzinie 8 rano słuchałem muzyki.", answer: "I was listening to music at 8 a.m.", altAnswers: ["At 8 a.m. I was listening to music.", "I was listening to music at 8am."], hint: "Konkretna godzina w przeszłości → Past Continuous" },
  { type: "gap", tenseId: "used-to", instruction: "Wpisz właściwą formę", q: "I ___ (use to / smoke) but I quit five years ago.", answer: "used to smoke", hint: "Dawny nawyk → used to + bezokolicznik" },
  { type: "gap", tenseId: "used-to", instruction: "Wpisz właściwą formę", q: "We ___ (not / use to / go) on holiday abroad.", answer: "didn't use to go", hint: "Forma przecząca: didn't use to + bezokolicznik", altAnswers: ["did not use to go"] },
  { type: "choice", tenseId: "used-to", instruction: "Wybierz poprawną odpowiedź", q: "He ___ be very shy as a child, but now he's very outgoing.", options: ["used to", "was used to", "is used to", "would to"], answer: "used to", hint: "Dawny stan (nie nawyk) → used to (nie: would)" },
  { type: "error", tenseId: "used-to", instruction: "Znajdź i popraw błąd w zdaniu", q: "I use to play tennis every Saturday.", answer: "I used to play tennis every Saturday.", hint: "Czas przeszły → used to (nie: use to)" },
  { type: "translate", tenseId: "used-to", instruction: "Przetłumacz na angielski", q: "Kiedyś mieszkałem w małym miasteczku.", answer: "I used to live in a small town.", hint: "Dawny stan → used to live" },
  { type: "gap", tenseId: "present-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (work) on this project for three weeks.", answer: "have been working", hint: "Czynność trwająca od 3 tygodni → have been + -ing" },
  { type: "gap", tenseId: "present-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "She looks exhausted. She ___ (study) all night.", answer: "has been studying", hint: "Skutek widoczny teraz → PPC, 3. os." },
  { type: "choice", tenseId: "present-perfect-continuous", instruction: "Wybierz poprawną odpowiedź", q: "My hands are dirty because I ___ in the garden.", options: ["work", "have worked", "have been working", "worked"], answer: "have been working", hint: "Widoczny skutek ciągłej czynności → PPC" },
  { type: "error", tenseId: "present-perfect-continuous", instruction: "Znajdź i popraw błąd w zdaniu", q: "She has been knowing him for years.", answer: "She has known him for years.", hint: "know = czasownik stanowy — NIE używamy z -ing, nawet w PPC" },
  { type: "translate", tenseId: "present-perfect-continuous", instruction: "Przetłumacz na angielski", q: "Czekam tu od godziny!", answer: "I have been waiting here for an hour!", altAnswers: ["I've been waiting here for an hour!"], hint: "od godziny = for an hour → PPC" },
  { type: "gap", tenseId: "past-perfect", instruction: "Wpisz właściwą formę czasownika", q: "He ___ (already / leave) before we arrived.", answer: "had already left", hint: "Czynność wcześniejsza od innej przeszłej → Past Perfect" },
  { type: "gap", tenseId: "past-perfect", instruction: "Wpisz właściwą formę czasownika", q: "She was crying because she ___ (lose) her wallet.", answer: "had lost", hint: "Powód płaczu = wydarzenie wcześniejsze → Past Perfect" },
  { type: "choice", tenseId: "past-perfect", instruction: "Wybierz poprawną odpowiedź", q: "When we arrived, the film ___.", options: ["already started", "has already started", "had already started", "already starts"], answer: "had already started", hint: "Film rozpoczął się PRZED naszym przybyciem → Past Perfect" },
  { type: "error", tenseId: "past-perfect", instruction: "Znajdź i popraw błąd w zdaniu", q: "When I arrived, she already left.", answer: "When I arrived, she had already left.", hint: "Czynność wcześniejsza → Past Perfect (had left)" },
  { type: "translate", tenseId: "past-perfect", instruction: "Przetłumacz na angielski", q: "Zanim dotarliśmy na lotnisko, samolot już odleciał.", answer: "By the time we reached the airport, the plane had already taken off.", altAnswers: ["Before we reached the airport, the plane had already taken off."], hint: "odleciał PRZED przybyciem → Past Perfect" },
  { type: "gap", tenseId: "future-continuous", instruction: "Wpisz właściwą formę czasownika", q: "This time tomorrow I ___ (fly) to New York.", answer: "will be flying", hint: "Czynność trwająca w konkretnym momencie w przyszłości → will be + -ing" },
  { type: "gap", tenseId: "future-continuous", instruction: "Wpisz właściwą formę czasownika", q: "Don't call at 8pm — I ___ (have) dinner.", answer: "will be having", hint: "O tej porze będę w trakcie kolacji → will be + -ing" },
  { type: "translate", tenseId: "future-continuous", instruction: "Przetłumacz na angielski", q: "O tej porze jutro będę leżał na plaży.", answer: "This time tomorrow I will be lying on the beach.", altAnswers: ["This time tomorrow, I'll be lying on the beach."], hint: "o tej porze jutro → Future Continuous" },
  { type: "gap", tenseId: "past-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "She was exhausted because she ___ (run) for an hour.", answer: "had been running", hint: "Czynność trwająca przez pewien czas PRZED inną przeszłą → had been + -ing" },
  { type: "gap", tenseId: "past-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "His eyes were red because he ___ (cry).", answer: "had been crying", hint: "Widoczny skutek ciągłej czynności w przeszłości" },
  { type: "translate", tenseId: "past-perfect-continuous", instruction: "Przetłumacz na angielski", q: "Czekał godzinę, zanim autobus w końcu przyjechał.", answer: "He had been waiting for an hour when the bus finally arrived.", altAnswers: ["He had been waiting for an hour before the bus finally arrived."], hint: "Czekał przez godzinę PRZED przyjazdem autobusu → had been waiting" },
  { type: "gap", tenseId: "future-perfect", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (finish) this report by 6pm.", answer: "will have finished", hint: "Czynność zakończona PRZED 18:00 → will have + V3" },
  { type: "gap", tenseId: "future-perfect", instruction: "Wpisz właściwą formę czasownika", q: "They ___ (not / finish) the construction by March.", answer: "won't have finished", hint: "Forma przecząca: won't have + V3", altAnswers: ["will not have finished"] },
  { type: "error", tenseId: "future-perfect", instruction: "Znajdź i popraw błąd w zdaniu", q: "By Monday, I will finish the project.", answer: "By Monday, I will have finished the project.", hint: "'by' + moment w przyszłości → Future Perfect" },
  { type: "translate", tenseId: "future-perfect", instruction: "Przetłumacz na angielski", q: "Do piątku skończę ten raport.", answer: "I will have finished this report by Friday.", altAnswers: ["By Friday I will have finished this report.", "I'll have finished this report by Friday."], hint: "do piątku = by Friday → Future Perfect" },
  { type: "gap", tenseId: "future-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "By July, I ___ (work) here for ten years.", answer: "will have been working", hint: "Czas trwania aż do przyszłego punktu → will have been + -ing" },
  { type: "translate", tenseId: "future-perfect-continuous", instruction: "Przetłumacz na angielski", q: "Do grudnia będę pracował w tej firmie od 5 lat.", answer: "By December, I will have been working at this company for 5 years.", altAnswers: ["By December I'll have been working here for 5 years."], hint: "do grudnia (punkt) + od 5 lat (czas trwania) → Future Perfect Continuous" },

  // ── PRESENT SIMPLE extra ──
  { type: "gap", tenseId: "present-simple", instruction: "Wpisz właściwą formę czasownika", q: "The sun ___ (rise) in the east and ___ (set) in the west.", answer: "rises / sets", hint: "Fakty naturalne → Present Simple 3. os. l. poj." },
  { type: "gap", tenseId: "present-simple", instruction: "Wpisz właściwą formę czasownika", q: "How often ___ she ___ (go) to the gym?", answer: "does / go", hint: "Pytanie o częstotliwość → does + bezokolicznik" },
  { type: "gap", tenseId: "present-simple", instruction: "Wpisz właściwą formę czasownika", q: "My cats ___ (love) sleeping in sunny spots.", answer: "love", hint: "l. mn. → bez zmian" },
  { type: "choice", tenseId: "present-simple", instruction: "Wybierz poprawną odpowiedź", q: "The conference ___ on the 15th of every month.", options: ["take place", "takes place", "is taking place", "took place"], answer: "takes place", hint: "Regularny harmonogram → Present Simple 3. os. l. poj." },
  { type: "choice", tenseId: "present-simple", instruction: "Wybierz poprawną odpowiedź", q: "___ your sister ___ near here?", options: ["Do / live", "Does / lives", "Does / live", "Is / live"], answer: "Does / live", hint: "Pytanie 3. os. l. poj.: Does + podmiot + bezokolicznik?" },
  { type: "error", tenseId: "present-simple", instruction: "Znajdź i popraw błąd", q: "She always forget her keys.", answer: "She always forgets her keys.", hint: "3. os. l. poj. + always → forgets" },
  { type: "rewrite", tenseId: "present-simple", instruction: "Przepisz zdanie w formie przeczącej", q: "They eat meat.", answer: "They don't eat meat.", altAnswers: ["They do not eat meat."], hint: "l. mn. przecząca: don't + bezokolicznik" },
  { type: "rewrite", tenseId: "present-simple", instruction: "Przepisz zdanie w formie pytającej", q: "He drives to work every day.", answer: "Does he drive to work every day?", hint: "Does + he + bezokolicznik (bez -s)?" },
  { type: "translate", tenseId: "present-simple", instruction: "Przetłumacz na angielski", q: "Czy oni pracują w weekendy?", answer: "Do they work at weekends?", altAnswers: ["Do they work on weekends?"], hint: "Pytanie l. mn. → Do + podmiot + bezokolicznik?" },
  { type: "identify", tenseId: "present-simple", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "Oil floats on water.", options: ["Present Simple", "Present Continuous", "Present Perfect", "Past Simple"], answer: "Present Simple", hint: "Fakt naukowy → Present Simple" },

  // ── PAST SIMPLE extra ──
  { type: "gap", tenseId: "past-simple", instruction: "Wpisz właściwą formę czasownika", q: "She ___ (teach) English for three years before she moved to Spain.", answer: "taught", hint: "teach → taught (nieregularny); przed przeprowadzką = zamknięty okres" },
  { type: "gap", tenseId: "past-simple", instruction: "Wpisz właściwą formę czasownika", q: "They ___ (build) this cathedral in the 14th century.", answer: "built", hint: "build → built (nieregularny); historyczny fakt" },
  { type: "gap", tenseId: "past-simple", instruction: "Wpisz właściwą formę czasownika", q: "___ you ___ (enjoy) the concert last night?", answer: "Did / enjoy", hint: "Pytanie Past Simple: Did + podmiot + bezokolicznik?" },
  { type: "choice", tenseId: "past-simple", instruction: "Wybierz poprawną odpowiedź", q: "How much ___ the tickets ___?", options: ["did / cost", "did / costed", "does / cost", "were / cost"], answer: "did / cost", hint: "cost → cost (bez zmian); pytanie Past Simple" },
  { type: "error", tenseId: "past-simple", instruction: "Znajdź i popraw błąd", q: "We enjoyed very much the party last Saturday.", answer: "We enjoyed the party very much last Saturday.", hint: "Szyk zdania: podmiot + orzeczenie + dopełnienie + przysłówek" },
  { type: "rewrite", tenseId: "past-simple", instruction: "Przepisz zdanie w formie pytającej", q: "They won the championship in 2022.", answer: "Did they win the championship in 2022?", hint: "Did + podmiot + bezokolicznik?" },
  { type: "translate", tenseId: "past-simple", instruction: "Przetłumacz na angielski", q: "Kiedy zaczęłaś uczyć się angielskiego?", answer: "When did you start learning English?", hint: "Pytanie o czas → When did you + bezokolicznik?" },
  { type: "identify", tenseId: "past-simple", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "Edison invented the light bulb.", options: ["Present Perfect", "Past Simple", "Past Continuous", "Past Perfect"], answer: "Past Simple", hint: "Historyczny wynalazek osoby nieżyjącej → Past Simple" },

  // ── FUTURE WILL extra ──
  { type: "gap", tenseId: "future-will", instruction: "Wpisz właściwą formę czasownika", q: "If you study hard, you ___ (pass) the exam.", answer: "will pass", hint: "Wynik warunkowy w przyszłości → will" },
  { type: "gap", tenseId: "future-will", instruction: "Wpisz właściwą formę czasownika", q: "— There's someone at the door. — I ___ (get) it.", answer: "will get", hint: "Spontaniczna decyzja w odpowiedzi → will" },
  { type: "choice", tenseId: "future-will", instruction: "Wybierz poprawną odpowiedź", q: "I'm sure she ___ a wonderful doctor one day.", options: ["is", "is going to be", "will be", "has been"], answer: "will be", hint: "Przepowiednia/opinia → will be" },
  { type: "error", tenseId: "future-will", instruction: "Znajdź i popraw błąd", q: "I think it wills rain tomorrow.", answer: "I think it will rain tomorrow.", hint: "will się nie odmienia — zawsze 'will', nigdy 'wills'" },
  { type: "rewrite", tenseId: "future-will", instruction: "Przepisz zdanie w formie pytającej", q: "She will help us.", answer: "Will she help us?", hint: "Will + podmiot + bezokolicznik?" },
  { type: "translate", tenseId: "future-will", instruction: "Przetłumacz na angielski", q: "Chyba nie zdążę na pociąg.", answer: "I probably won't make it to the train.", altAnswers: ["I probably won't catch the train.", "I don't think I'll make it to the train."], hint: "Prawdopodobnie NIE → probably won't" },

  // ── FUTURE GOING TO extra ──
  { type: "gap", tenseId: "future-going-to", instruction: "Wpisz właściwą formę czasownika", q: "Careful! You ___ (fall) — the floor is slippery.", answer: "are going to fall", hint: "Widzisz zagrożenie → going to" },
  { type: "gap", tenseId: "future-going-to", instruction: "Wpisz właściwą formę czasownika", q: "We ___ (not / move) next year. We changed our minds.", answer: "aren't going to move", altAnswers: ["are not going to move"], hint: "Zmiana planu → aren't going to" },
  { type: "choice", tenseId: "future-going-to", instruction: "Wybierz poprawną odpowiedź", q: "Look at the score! Our team ___ lose this match.", options: ["will", "is going to", "is", "would"], answer: "is going to", hint: "Wynik na tablicy = dowód → going to" },
  { type: "rewrite", tenseId: "future-going-to", instruction: "Przepisz zdanie w formie przeczącej", q: "He is going to resign.", answer: "He isn't going to resign.", altAnswers: ["He is not going to resign."], hint: "isn't / is not going to + bezokolicznik" },
  { type: "translate", tenseId: "future-going-to", instruction: "Przetłumacz na angielski", q: "Ona ma zamiar zdawać egzamin w czerwcu.", answer: "She is going to take the exam in June.", altAnswers: ["She's going to take the exam in June."], hint: "Zamiar → is going to take" },

  // ── PRESENT CONTINUOUS extra ──
  { type: "gap", tenseId: "present-continuous", instruction: "Wpisz właściwą formę czasownika", q: "The company ___ (expand) rapidly this year.", answer: "is expanding", hint: "Tymczasowy trend → Present Continuous" },
  { type: "gap", tenseId: "present-continuous", instruction: "Wpisz właściwą formę czasownika", q: "You ___ (get) better at English every day!", answer: "are getting", hint: "Stopniowa zmiana → Present Continuous" },
  { type: "choice", tenseId: "present-continuous", instruction: "Wybierz poprawną odpowiedź", q: "Shh! The director ___ the final scene.", options: ["shoots", "is shooting", "shot", "has shot"], answer: "is shooting", hint: "W tej chwili kręci scenę → Present Continuous" },
  { type: "error", tenseId: "present-continuous", instruction: "Znajdź i popraw błąd", q: "I am wanting a coffee right now.", answer: "I want a coffee right now.", hint: "want = czasownik stanowy → NIE używamy z -ing" },
  { type: "rewrite", tenseId: "present-continuous", instruction: "Przepisz zdanie w formie pytającej", q: "They are discussing the proposal.", answer: "Are they discussing the proposal?", hint: "Are + podmiot + -ing?" },
  { type: "translate", tenseId: "present-continuous", instruction: "Przetłumacz na angielski", q: "Spotykam się z Anną w sobotę. (zaplanowane)", answer: "I am meeting Anna on Saturday.", altAnswers: ["I'm meeting Anna on Saturday."], hint: "Zaplanowane spotkanie w bliskiej przyszłości → Present Continuous" },
  { type: "identify", tenseId: "present-continuous", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "More and more people are working from home.", options: ["Present Simple", "Present Continuous", "Present Perfect", "Future (going to)"], answer: "Present Continuous", hint: "Rosnący trend → Present Continuous" },

  // ── PRESENT PERFECT extra ──
  { type: "gap", tenseId: "present-perfect", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (know) her since we were children.", answer: "have known", hint: "'since' z czasownikiem stanowym → Present Perfect (nie PPC)" },
  { type: "gap", tenseId: "present-perfect", instruction: "Wpisz właściwą formę czasownika", q: "___ the postman ___ (come) yet?", answer: "Has / come", hint: "'yet' w pytaniu → Present Perfect" },
  { type: "gap", tenseId: "present-perfect", instruction: "Wpisz właściwą formę czasownika", q: "This is the most interesting book I ___ (ever / read).", answer: "have ever read", hint: "Superlative + ever → Present Perfect" },
  { type: "choice", tenseId: "present-perfect", instruction: "Wybierz poprawną odpowiedź", q: "She ___ in three different countries so far.", options: ["lived", "has lived", "is living", "had lived"], answer: "has lived", hint: "'so far' = do tej pory → Present Perfect" },
  { type: "error", tenseId: "present-perfect", instruction: "Znajdź i popraw błąd", q: "Has she left the office yet? Yes, she leaved.", answer: "Has she left the office yet? Yes, she has (left).", hint: "leave → left (V2/V3); odpowiedź krótka: 'Yes, she has'" },
  { type: "rewrite", tenseId: "present-perfect", instruction: "Przepisz zdanie w formie przeczącej", q: "He has told her the truth.", answer: "He hasn't told her the truth.", altAnswers: ["He has not told her the truth."], hint: "hasn't / has not + V3" },
  { type: "translate", tenseId: "present-perfect", instruction: "Przetłumacz na angielski", q: "Właśnie skończyłam czytać tę książkę.", answer: "I have just finished reading this book.", altAnswers: ["I've just finished reading this book."], hint: "właśnie = just → Present Perfect" },
  { type: "identify", tenseId: "present-perfect", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "He has recently changed jobs.", options: ["Past Simple", "Present Perfect", "Present Perfect Continuous", "Past Perfect"], answer: "Present Perfect", hint: "'recently' → Present Perfect" },

  // ── PAST CONTINUOUS extra ──
  { type: "gap", tenseId: "past-continuous", instruction: "Wpisz właściwą formę czasownika", q: "The children ___ (play) in the garden all afternoon.", answer: "were playing", hint: "Cały czas trwało → Past Continuous" },
  { type: "gap", tenseId: "past-continuous", instruction: "Wpisz właściwą formę czasownika", q: "I ___ (not / pay) attention when the teacher explained it.", answer: "wasn't paying", altAnswers: ["was not paying"], hint: "wasn't + -ing" },
  { type: "choice", tenseId: "past-continuous", instruction: "Wybierz poprawną odpowiedź", q: "It ___ heavily when we left the house.", options: ["rained", "was raining", "has rained", "had rained"], answer: "was raining", hint: "Trwający deszcz gdy wychodziliśmy → Past Continuous" },
  { type: "error", tenseId: "past-continuous", instruction: "Znajdź i popraw błąd", q: "She was knowing the answer all along.", answer: "She knew the answer all along.", hint: "know = czasownik stanowy → Past Simple, nie Past Continuous" },
  { type: "translate", tenseId: "past-continuous", instruction: "Przetłumacz na angielski", q: "Co robiłeś, kiedy zadzwoniłem?", answer: "What were you doing when I called?", hint: "Pytanie o trwającą czynność → Past Continuous" },

  // ── USED TO extra ──
  { type: "gap", tenseId: "used-to", instruction: "Wpisz właściwą formę", q: "People ___ (use to / believe) that the Earth was flat.", answer: "used to believe", hint: "Dawne (błędne) przekonanie → used to believe" },
  { type: "gap", tenseId: "used-to", instruction: "Wpisz właściwą formę", q: "___ you ___ (use to / have) a bicycle when you were young?", answer: "Did / use to have", hint: "Pytanie o dawny stan: Did + podmiot + use to + bezokolicznik?" },
  { type: "choice", tenseId: "used-to", instruction: "Wybierz poprawną odpowiedź", q: "My sister and I ___ fight constantly as kids, but now we get on well.", options: ["used to", "would", "both A and B", "were used to"], answer: "both A and B", hint: "Powtarzający się nawyk (kłótnie) → zarówno 'used to' jak i 'would'" },
  { type: "error", tenseId: "used-to", instruction: "Znajdź i popraw błąd", q: "He didn't used to like jazz.", answer: "He didn't use to like jazz.", hint: "Po 'didn't' → use to (bez -d), nie used to" },
  { type: "translate", tenseId: "used-to", instruction: "Przetłumacz na angielski", q: "Byłem kiedyś bardzo nieśmiały, ale teraz jestem spokojniejszy.", answer: "I used to be very shy, but now I am calmer.", altAnswers: ["I used to be very shy, but now I'm calmer."], hint: "Dawny stan (już nie taki) → used to be" },

  // ── PRESENT PERFECT CONTINUOUS extra ──
  { type: "gap", tenseId: "present-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "Your eyes are red. ___ you ___ (cry)?", answer: "Have / been crying", hint: "Widoczny ślad → Present Perfect Continuous" },
  { type: "gap", tenseId: "present-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "The ground is wet. It ___ (rain) again.", answer: "has been raining", hint: "Skutek widoczny teraz + ciągłość → PPC" },
  { type: "gap", tenseId: "present-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "He ___ (not / sleep) well since he changed jobs.", answer: "hasn't been sleeping", altAnswers: ["has not been sleeping"], hint: "'since' + ciągły problem → PPC przecząca" },
  { type: "choice", tenseId: "present-perfect-continuous", instruction: "Wybierz poprawną odpowiedź", q: "She ___ yoga for five years and says it changed her life.", options: ["practises", "has practised", "has been practising", "practised"], answer: "has been practising", hint: "Regularna czynność przez pięć lat (nadal trwa) → PPC" },
  { type: "error", tenseId: "present-perfect-continuous", instruction: "Znajdź i popraw błąd", q: "I have been understanding this grammar since I read the book.", answer: "I have understood this grammar since I read the book.", hint: "understand = czasownik stanowy → Present Perfect (nie PPC)" },
  { type: "translate", tenseId: "present-perfect-continuous", instruction: "Przetłumacz na angielski", q: "On rozmawiał przez telefon od godziny.", answer: "He has been talking on the phone for an hour.", hint: "od godziny = for an hour → PPC" },
  { type: "rewrite", tenseId: "present-perfect-continuous", instruction: "Przepisz zdanie w formie pytającej", q: "They have been arguing all morning.", answer: "Have they been arguing all morning?", hint: "Have + podmiot + been + -ing?" },

  // ── PAST PERFECT extra ──
  { type: "gap", tenseId: "past-perfect", instruction: "Wpisz właściwą formę czasownika", q: "I felt sick because I ___ (eat) too much.", answer: "had eaten", hint: "Przyczyna choroby (wcześniejsza) → Past Perfect" },
  { type: "gap", tenseId: "past-perfect", instruction: "Wpisz właściwą formę czasownika", q: "She ___ never ___ (fly) before, so she was nervous.", answer: "had / never flown", altAnswers: ["had never flown"], hint: "Nigdy wcześniej nie leciała → Past Perfect + never" },
  { type: "choice", tenseId: "past-perfect", instruction: "Wybierz poprawną odpowiedź", q: "He apologised for something he ___ the day before.", options: ["said", "has said", "had said", "was saying"], answer: "had said", hint: "Powiedział DZIEŃ WCZEŚNIEJ → Past Perfect" },
  { type: "error", tenseId: "past-perfect", instruction: "Znajdź i popraw błąd", q: "After she had left, I realised I forgotten my keys.", answer: "After she had left, I realised I had forgotten my keys.", hint: "Uświadomienie w przeszłości + zapomnienie wcześniej → Past Perfect: had forgotten" },
  { type: "rewrite", tenseId: "past-perfect", instruction: "Przepisz zdanie używając Past Perfect", q: "First she finished work. Then she went home.", answer: "After she had finished work, she went home.", altAnswers: ["She went home after she had finished work.", "When she had finished work, she went home."], hint: "Czynność wcześniejsza → Past Perfect" },
  { type: "translate", tenseId: "past-perfect", instruction: "Przetłumacz na angielski", q: "Nigdy wcześniej nie widziałem tak pięknego zachodu słońca.", answer: "I had never seen such a beautiful sunset before.", hint: "Przed tamtym momentem = nigdy wcześniej → Past Perfect" },
  { type: "identify", tenseId: "past-perfect", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "She couldn't find her passport — she had left it at home.", options: ["Past Simple", "Past Continuous", "Present Perfect", "Past Perfect"], answer: "Past Perfect", hint: "Zostawienie paszportu było PRZED szukaniem → Past Perfect" },

  // ── FUTURE CONTINUOUS extra ──
  { type: "gap", tenseId: "future-continuous", instruction: "Wpisz właściwą formę czasownika", q: "At 3pm on Friday I ___ (present) our findings to the board.", answer: "will be presenting", hint: "O tej godzinie prezentacja TRWA → Future Continuous" },
  { type: "gap", tenseId: "future-continuous", instruction: "Wpisz właściwą formę czasownika", q: "___ you ___ (use) the projector tomorrow? I need to borrow it.", answer: "Will / be using", hint: "Grzeczne pytanie o plany → Will you be + -ing?" },
  { type: "choice", tenseId: "future-continuous", instruction: "Wybierz poprawną odpowiedź", q: "By the time you read this, I ___ already ___ on a beach.", options: ["will / lie", "will / be lying", "am going / to lie", "will have / lain"], answer: "will / be lying", hint: "W momencie czytania czynność TRWA → Future Continuous" },
  { type: "error", tenseId: "future-continuous", instruction: "Znajdź i popraw błąd", q: "This time next week, she will working in New York.", answer: "This time next week, she will be working in New York.", hint: "Future Continuous: will BE + -ing (brakuje 'be')" },
  { type: "translate", tenseId: "future-continuous", instruction: "Przetłumacz na angielski", q: "O tej samej porze za tydzień będziemy świętować.", answer: "This time next week we will be celebrating.", altAnswers: ["This time next week, we'll be celebrating."], hint: "o tej porze za tydzień → Future Continuous" },
  { type: "identify", tenseId: "future-continuous", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "Will you be attending the conference next Thursday?", options: ["Future Simple (will)", "Future (going to)", "Future Continuous", "Present Continuous"], answer: "Future Continuous", hint: "Will you be + -ing? → Future Continuous (pytanie o plan/trwanie)" },

  // ── PAST PERFECT CONTINUOUS extra ──
  { type: "gap", tenseId: "past-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "We were late because we ___ (wait) for the wrong bus for twenty minutes.", answer: "had been waiting", hint: "20 minut czekania PRZED spóźnieniem → Past Perfect Continuous" },
  { type: "gap", tenseId: "past-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "Her voice was hoarse because she ___ (sing) all night.", answer: "had been singing", hint: "Śpiewanie przez całą noc = przyczyna chrypy → PPC" },
  { type: "choice", tenseId: "past-perfect-continuous", instruction: "Wybierz poprawną odpowiedź", q: "The children were muddy. They ___ in the garden.", options: ["played", "were playing", "had been playing", "had played"], answer: "had been playing", hint: "Błoto = skutek ciągłej czynności wcześniej → PPC" },
  { type: "error", tenseId: "past-perfect-continuous", instruction: "Znajdź i popraw błąd", q: "He was ill because he had been overwork.", answer: "He was ill because he had been overworking.", altAnswers: ["He was ill because he had been overworked."], hint: "had been + -ing (brakuje -ing)" },
  { type: "translate", tenseId: "past-perfect-continuous", instruction: "Przetłumacz na angielski", q: "Mieszkali razem od roku, zanim się pobrali.", answer: "They had been living together for a year before they got married.", hint: "Rok wspólnego mieszkania PRZED ślubem → Past Perfect Continuous" },

  // ── FUTURE PERFECT extra ──
  { type: "gap", tenseId: "future-perfect", instruction: "Wpisz właściwą formę czasownika", q: "By the time he retires, he ___ (work) for the company for 40 years.", answer: "will have worked", hint: "'by the time' + zakończone → Future Perfect" },
  { type: "gap", tenseId: "future-perfect", instruction: "Wpisz właściwą formę czasownika", q: "I hope she ___ (recover) fully by next month.", answer: "will have recovered", hint: "Do przyszłego miesiąca = zakończone przed tym momentem → Future Perfect" },
  { type: "choice", tenseId: "future-perfect", instruction: "Wybierz poprawną odpowiedź", q: "By 2050, scientists ___ a cure for many diseases.", options: ["will find", "will be finding", "will have found", "are going to find"], answer: "will have found", hint: "'by 2050' = zakończone przed tym rokiem → Future Perfect" },
  { type: "error", tenseId: "future-perfect", instruction: "Znajdź i popraw błąd", q: "By the end of the year, she will finished the novel.", answer: "By the end of the year, she will have finished the novel.", hint: "'by' + zakończone → will HAVE + V3 (brakuje 'have')" },
  { type: "translate", tenseId: "future-perfect", instruction: "Przetłumacz na angielski", q: "Zanim tu dotrą, my zdążymy zjeść.", answer: "By the time they get here, we will have eaten.", altAnswers: ["By the time they arrive, we will have eaten."], hint: "przed ich przybyciem = zakończone → Future Perfect" },
  { type: "identify", tenseId: "future-perfect", instruction: "Zidentyfikuj czas użyty w zdaniu", q: "She will have submitted her thesis by tomorrow morning.", options: ["Future Continuous", "Future Perfect", "Future Perfect Continuous", "Present Perfect"], answer: "Future Perfect", hint: "will have + V3 = zakończone przed jutrzejszym rankiem → Future Perfect" },

  // ── FUTURE PERFECT CONTINUOUS extra ──
  { type: "gap", tenseId: "future-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "Next year, they ___ (run) this business for a decade.", answer: "will have been running", hint: "Rok następny (punkt) + dekada (czas trwania) → FPC" },
  { type: "gap", tenseId: "future-perfect-continuous", instruction: "Wpisz właściwą formę czasownika", q: "By the end of the marathon, the runners ___ (run) for over four hours.", answer: "will have been running", hint: "Koniec maratonu (punkt) + 4 godziny biegania → FPC" },
  { type: "choice", tenseId: "future-perfect-continuous", instruction: "Wybierz poprawną odpowiedź", q: "By next June, I ___ this job for exactly three years.", options: ["will do", "will be doing", "will have done", "will have been doing"], answer: "will have been doing", hint: "Nacisk na czas trwania (trzy lata) do przyszłego punktu → FPC" },
  { type: "translate", tenseId: "future-perfect-continuous", instruction: "Przetłumacz na angielski", q: "Kiedy skończymy ten projekt, będziemy nad nim pracować przez ponad rok.", answer: "By the time we finish this project, we will have been working on it for over a year.", hint: "punkt w przyszłości + czas trwania → Future Perfect Continuous" },
];

// ─── CONFUSING PAIRS ──────────────────────────────────────────────────────
const confusingPairs = [
  {
    id: "ps-vs-pp", name: "Past Simple vs Present Perfect", emoji: "⏮️🔗", color: "#9B6EBF",
    desc: "Konkretny czas w przeszłości vs doświadczenie bez czasu",
    key: "Past Simple = konkretny czas (yesterday, last week, in 2010). Present Perfect = bez konkretnego czasu, doświadczenie lub skutek teraz.",
    exercises: [
      { type: "choice", instruction: "Wybierz właściwy czas", q: "I ___ Paris in 2019.", options: ["visited", "have visited"], answer: "visited", hint: "'in 2019' = konkretny czas → Past Simple" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "I ___ Paris. It's beautiful there!", options: ["visited", "have visited"], answer: "have visited", hint: "Brak konkretnego czasu, dzielisz się doświadczeniem → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "She ___ her keys. She can't get in.", options: ["lost", "has lost"], answer: "has lost", hint: "Skutek widoczny teraz (nie może wejść) → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "She ___ her keys yesterday, but found them later.", options: ["lost", "has lost"], answer: "lost", hint: "'yesterday' = konkretny czas → Past Simple" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "Shakespeare ___ over 30 plays.", options: ["wrote", "has written"], answer: "wrote", hint: "Osoba nieżyjąca → Past Simple (czas się skończył)" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "___ you ever ___ to Japan?", options: ["Did / go", "Have / been"], answer: "Have / been", hint: "'ever' = kiedykolwiek w życiu → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "I can't find my wallet. I think I ___ it on the bus.", options: ["left", "have left"], answer: "have left", hint: "Skutek teraz (szukasz) → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "I ___ my wallet on the bus last Tuesday.", options: ["left", "have left"], answer: "left", hint: "'last Tuesday' = konkretny czas → Past Simple" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "Newton ___ the laws of motion.", options: ["discovered", "has discovered"], answer: "discovered", hint: "Historyczne odkrycie, osoba nieżyjąca → Past Simple" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "Scientists ___ a new species in the Amazon. The news is everywhere.", options: ["discovered", "have discovered"], answer: "have discovered", hint: "Aktualna wiadomość z widocznym skutkiem teraz → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "— Is Tom here? — No, he ___ to the shop.", options: ["went", "has gone"], answer: "has gone", hint: "'has gone' = wyszedł i jeszcze nie wrócił → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "— Where's Tom? — He ___ to the shop this morning. He's back now.", options: ["went", "has gone"], answer: "went", hint: "Skończona czynność w przeszłości, już wrócił → Past Simple" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "This is the first time I ___ sushi.", options: ["ate", "have eaten"], answer: "have eaten", hint: "'This is the first time' → Present Perfect" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "I ___ sushi for the first time in Tokyo in 2018.", options: ["ate", "have eaten"], answer: "ate", hint: "Konkretne miejsce i rok → Past Simple" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "How long ___ you ___ in Warsaw?", options: ["did / live", "have / lived"], answer: "have / lived", hint: "Mieszkasz tam NADAL → Present Perfect z 'how long'" },
      { type: "choice", instruction: "Wybierz właściwy czas", q: "How long ___ you ___ in Warsaw? (wyprowadziłeś się rok temu)", options: ["did / live", "have / lived"], answer: "did / live", hint: "Już tam nie mieszkasz → zamknięty okres → Past Simple" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "We ___ (just / hear) the news. It's shocking!", answer: "have just heard", hint: "'just' → Present Perfect" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "He ___ (call) me at 8am this morning and we talked for an hour.", answer: "called", hint: "Konkretna godzina rano = skończona czynność → Past Simple" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "I ___ (already / send) the email. Check your inbox.", answer: "have already sent", hint: "'already' → Present Perfect; skutek: możesz sprawdzić" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "She ___ (move) to Kraków in 2020.", answer: "moved", hint: "'in 2020' = konkretny rok → Past Simple" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "He ___ (write) three novels so far.", answer: "has written", hint: "'so far' = do tej pory → Present Perfect" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "They ___ (not / finish) the project yet.", answer: "haven't finished", hint: "'yet' → Present Perfect" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "Maria Curie ___ (win) two Nobel Prizes.", answer: "won", hint: "Osoba nieżyjąca → Past Simple" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "I ___ (never / try) skiing. I'm a bit scared.", answer: "have never tried", hint: "Doświadczenie życiowe + never → Present Perfect" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "She ___ (be) a teacher for 20 years before she retired.", answer: "was", hint: "Skończyła pracę (retired) = zamknięty okres → Past Simple" },
      { type: "gap", instruction: "Past Simple czy Present Perfect?", q: "He ___ (be) a teacher for 20 years and still loves it.", answer: "has been", hint: "Nadal jest nauczycielem → Present Perfect" },
      { type: "error", instruction: "Popraw błąd", q: "Have you seen that film last week?", answer: "Did you see that film last week?", hint: "'last week' = konkretny czas → Past Simple; nie Present Perfect" },
      { type: "error", instruction: "Popraw błąd", q: "I didn't eat yet.", answer: "I haven't eaten yet.", hint: "'yet' → Present Perfect" },
      { type: "error", instruction: "Popraw błąd", q: "She has graduated in 2022.", answer: "She graduated in 2022.", hint: "'in 2022' = konkretny rok → Past Simple" },
    ],
  },
  {
    id: "will-vs-going-to", name: "will vs going to", emoji: "🚀📅", color: "#6BAD8F",
    desc: "Spontaniczna decyzja vs zaplanowany zamiar",
    key: "will = spontaniczna decyzja w momencie mówienia, obietnica, przepowiednia. going to = już zaplanowane, zamiar z wyprzedzeniem, dowód przed oczami.",
    exercises: [
      { type: "choice", instruction: "will czy going to?", q: "— The phone is ringing! — I ___ answer it.", options: ["will", "am going to"], answer: "will", hint: "Spontaniczna decyzja w tej chwili → will" },
      { type: "choice", instruction: "will czy going to?", q: "I've bought a ticket. I ___ see that concert next week.", options: ["will see", "am going to see"], answer: "am going to see", hint: "Kupiłeś bilet = już zaplanowane → going to" },
      { type: "choice", instruction: "will czy going to?", q: "Look at those clouds! It ___ rain.", options: ["will", "is going to"], answer: "is going to", hint: "Widzisz dowód (chmury) → going to" },
      { type: "choice", instruction: "will czy going to?", q: "I think England ___ win the match.", options: ["will", "is going to"], answer: "will", hint: "Opinia bez konkretnych dowodów → will" },
      { type: "choice", instruction: "will czy going to?", q: "She has enrolled in evening classes. She ___ learn Italian.", options: ["will learn", "is going to learn"], answer: "is going to learn", hint: "Zapisała się = zamiar z dowodem → going to" },
      { type: "choice", instruction: "will czy going to?", q: "— There's no milk. — Oh, I ___ get some.", options: ["will get", "am going to get"], answer: "will get", hint: "Decydujesz w tej chwili → will" },
      { type: "choice", instruction: "will czy going to?", q: "We ___ renovate the kitchen. We've already hired a contractor.", options: ["will renovate", "are going to renovate"], answer: "are going to renovate", hint: "Zatrudnili wykonawcę = zaplanowane z wyprzedzeniem → going to" },
      { type: "choice", instruction: "will czy going to?", q: "That box looks really heavy. I ___ help you carry it.", options: ["will", "am going to"], answer: "will", hint: "Spontaniczna oferta pomocy → will" },
      { type: "choice", instruction: "will czy going to?", q: "Look at that child! He ___ fall off the wall!", options: ["will", "is going to"], answer: "is going to", hint: "Widzisz że zaraz się stanie → going to" },
      { type: "choice", instruction: "will czy going to?", q: "I promise I ___ call you as soon as I land.", options: ["will", "am going to"], answer: "will", hint: "Obietnica złożona w tej chwili → will" },
      { type: "choice", instruction: "will czy going to?", q: "She's packed her bags. She ___ leave tomorrow.", options: ["will leave", "is going to leave"], answer: "is going to leave", hint: "Spakowane walizki = dowód na plan → going to" },
      { type: "choice", instruction: "will czy going to?", q: "I think the economy ___ improve next year.", options: ["will", "is going to"], answer: "will", hint: "Osobiste przewidywanie/opinia → will" },
      { type: "choice", instruction: "will czy going to?", q: "We've decided to move. We ___ sell the house in spring.", options: ["will sell", "are going to sell"], answer: "are going to sell", hint: "Już podjęta decyzja → going to" },
      { type: "choice", instruction: "will czy going to?", q: "— The printer is broken. — Don't worry, I ___ fix it.", options: ["will", "am going to"], answer: "will", hint: "Decyzja spontaniczna w reakcji na sytuację → will" },
      { type: "choice", instruction: "will czy going to?", q: "She's been training every day. She ___ run a marathon next month.", options: ["will run", "is going to run"], answer: "is going to run", hint: "Systematyczny trening = dowód na zamiar → going to" },
      { type: "gap", instruction: "will czy going to?", q: "Watch out! That vase ___ (fall)!", answer: "is going to fall", hint: "Widzisz że za chwilę spadnie → going to" },
      { type: "gap", instruction: "will czy going to?", q: "— I can't open this jar. — Give it to me, I ___ (do) it.", answer: "will do", hint: "Spontaniczna oferta → will" },
      { type: "gap", instruction: "will czy going to?", q: "I've booked a table. We ___ (have) dinner at 8.", answer: "are going to have", hint: "Rezerwacja = już zaplanowane → going to" },
      { type: "gap", instruction: "will czy going to?", q: "The doctor says it ___ (be) a girl!", answer: "is going to be", hint: "Wynik badania = konkretny dowód → going to" },
      { type: "gap", instruction: "will czy going to?", q: "Maybe I ___ (learn) Portuguese one day.", answer: "will learn", hint: "Nieokreślony plan na przyszłość / opinia → will" },
      { type: "error", instruction: "Popraw błąd (will / going to)", q: "I will meet Tom tonight — I've already bought the cinema tickets.", answer: "I am going to meet Tom tonight.", hint: "Kupione bilety = już zaplanowane → going to" },
      { type: "error", instruction: "Popraw błąd (will / going to)", q: "— Oh no, I forgot my wallet. — Don't worry, I'm going to pay for you.", answer: "Don't worry, I'll pay for you.", hint: "Decyzja w odpowiedzi na sytuację → will, nie going to" },
    ],
  },
  {
    id: "pp-vs-ppc", name: "Present Perfect vs PPC", emoji: "🔗⏳", color: "#B88040",
    desc: "Wynik/doświadczenie vs czas trwania ciągłej czynności",
    key: "Present Perfect = co zrobiłeś, ile (wynik). PPC = jak długo trwa czynność (czas trwania), ciągłość widoczna teraz.",
    exercises: [
      { type: "choice", instruction: "PP czy PPC?", q: "I ___ three cups of coffee today.", options: ["have drunk", "have been drinking"], answer: "have drunk", hint: "Liczba = konkretny wynik → Present Perfect" },
      { type: "choice", instruction: "PP czy PPC?", q: "You look tired. Have you ___ all day?", options: ["worked", "been working"], answer: "been working", hint: "Ciągła czynność dająca widoczny skutek → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "How long ___ you ___ English?", options: ["have / learned", "have / been learning"], answer: "have / been learning", hint: "'How long?' o ciągłej czynności → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "She ___ the report. You can read it now.", options: ["has finished", "has been finishing"], answer: "has finished", hint: "Raport gotowy = skończony wynik → Present Perfect" },
      { type: "choice", instruction: "PP czy PPC?", q: "My hands are covered in paint. I ___ the walls.", options: ["have painted", "have been painting"], answer: "have been painting", hint: "Widoczny ślad ciągłej czynności → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "The kids ___ outside all morning. They're exhausted.", options: ["have played", "have been playing"], answer: "have been playing", hint: "'all morning' = nacisk na czas trwania → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "I ___ five emails this morning.", options: ["have written", "have been writing"], answer: "have written", hint: "Konkretna liczba = wynik → Present Perfect" },
      { type: "choice", instruction: "PP czy PPC?", q: "She looks flushed — she ___ again.", options: ["has run", "has been running"], answer: "has been running", hint: "Widoczny skutek ciągłej czynności → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "He ___ this book twice. He loves it.", options: ["has read", "has been reading"], answer: "has read", hint: "Liczba razy = wynik → Present Perfect" },
      { type: "choice", instruction: "PP czy PPC?", q: "The baby ___. That's why she's so tired.", options: ["has cried", "has been crying"], answer: "has been crying", hint: "Czas trwania (ciągłe płakanie) dający widoczny skutek → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "We ___ three chapters so far.", options: ["have finished", "have been finishing"], answer: "have finished", hint: "Policzalny wynik ('three chapters') → Present Perfect" },
      { type: "choice", instruction: "PP czy PPC?", q: "I'm covered in mud because I ___ in the garden.", options: ["have worked", "have been working"], answer: "have been working", hint: "Ciągła czynność → jej widoczny efekt → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "He ___ to the gym recently. He looks great!", options: ["has gone", "has been going"], answer: "has been going", hint: "Regularna powtarzająca się czynność → PPC" },
      { type: "choice", instruction: "PP czy PPC?", q: "I ___ all the chapters. I can lend you the book now.", options: ["have read", "have been reading"], answer: "have read", hint: "Skończyłem = wynik zamknięty → Present Perfect" },
      { type: "gap", instruction: "PP czy PPC?", q: "She ___ (study) for four hours and still has more to do.", answer: "has been studying", hint: "Czas trwania + nadal trwa → PPC" },
      { type: "gap", instruction: "PP czy PPC?", q: "I ___ (just / finish) the report. Here it is.", answer: "have just finished", hint: "Właśnie skończyłem = wynik → Present Perfect" },
      { type: "gap", instruction: "PP czy PPC?", q: "He ___ (sleep) all day. He's still not awake.", answer: "has been sleeping", hint: "Trwa cały czas → PPC" },
      { type: "gap", instruction: "PP czy PPC?", q: "The team ___ (score) three goals in this game.", answer: "has scored", hint: "Liczba goli = wynik → Present Perfect" },
      { type: "gap", instruction: "PP czy PPC?", q: "I ___ (wait) for forty minutes! Where are you?", answer: "have been waiting", hint: "Ciągłe czekanie podkreślające frustrację → PPC" },
      { type: "gap", instruction: "PP czy PPC?", q: "She ___ (always / love) the sea. It's her favourite place.", answer: "has always loved", hint: "Uczucie = czasownik stanowy → Present Perfect (NIE PPC)" },
    ],
  },
  {
    id: "ps-vs-pc", name: "Past Simple vs Past Continuous", emoji: "⏮️📽️", color: "#5090C0",
    desc: "Zdarzenie przerywające vs czynność w tle",
    key: "Past Continuous = czynność trwająca w tle (was/were + -ing). Past Simple = krótkie zdarzenie przerywające lub sekwencja.",
    exercises: [
      { type: "choice", instruction: "PS czy PC?", q: "I ___ a shower when the doorbell rang.", options: ["took", "was taking"], answer: "was taking", hint: "Czynność trwająca gdy ktoś zadzwonił → Past Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "I ___ a shower, then got dressed and went to work.", options: ["took", "was taking"], answer: "took", hint: "Sekwencja zakończonych czynności → Past Simple" },
      { type: "choice", instruction: "PS czy PC?", q: "While she ___ TV, the lights went out.", options: ["watched", "was watching"], answer: "was watching", hint: "'While' + tło → Past Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "He ___ his keys while he ___ for his phone.", options: ["found / was looking", "was finding / looked"], answer: "found / was looking", hint: "found = chwilowe zdarzenie; was looking = tło" },
      { type: "choice", instruction: "PS czy PC?", q: "At 7pm yesterday she ___ dinner.", options: ["cooked", "was cooking"], answer: "was cooking", hint: "Konkretna godzina = czynność w toku → Past Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "I met Anna while I ___ for a taxi.", options: ["waited", "was waiting"], answer: "was waiting", hint: "'while' i 'met' przerywa czekanie → Past Continuous dla tła" },
      { type: "choice", instruction: "PS czy PC?", q: "It ___ when we ___ outside.", options: ["rained / went", "was raining / went"], answer: "was raining / went", hint: "Deszcz = tło (trwał), wyjście = chwilowe" },
      { type: "choice", instruction: "PS czy PC?", q: "Last night I ___ to bed at 10, ___ eight hours and felt great.", options: ["went / slept", "was going / was sleeping"], answer: "went / slept", hint: "Sekwencja zamkniętych czynności → Past Simple, Past Simple" },
      { type: "choice", instruction: "PS czy PC?", q: "She ___ a book when her phone suddenly beeped.", options: ["read", "was reading"], answer: "was reading", hint: "Ciągła czynność przerwana nagłym zdarzeniem → Past Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "While the students ___, the teacher quietly left the room.", options: ["worked", "were working"], answer: "were working", hint: "'while' + tło grupy → Past Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "The fire ___ while the family ___.", options: ["started / slept", "was starting / was sleeping"], answer: "started / slept", hint: "Pożar = zdarzenie przerywające; spanie = tło" },
      { type: "choice", instruction: "PS czy PC?", q: "I ___ three calls while I ___ to work.", options: ["received / drove", "was receiving / drove"], answer: "received / drove", hint: "Jazda = tło (ciągła); odebrane połączenia = zdarzenia podczas" },
      { type: "gap", instruction: "PS czy PC?", q: "She ___ (trip) on the stairs while she ___ (carry) the shopping.", answer: "tripped / was carrying", hint: "tripped = chwilowe zdarzenie; was carrying = tło" },
      { type: "gap", instruction: "PS czy PC?", q: "When the teacher ___ (enter), the students ___ (talk) loudly.", answer: "entered / were talking", hint: "Wejście = zdarzenie; rozmowa = tło" },
      { type: "gap", instruction: "PS czy PC?", q: "I ___ (see) a deer while I ___ (jog) in the park.", answer: "saw / was jogging", hint: "saw = chwila; jogging = tło" },
      { type: "gap", instruction: "PS czy PC?", q: "At noon, he ___ (sit) in the café and ___ (read) the paper.", answer: "was sitting / was reading", hint: "Dwie równoległe ciągłe czynności o tej samej godzinie → Past Continuous" },
      { type: "gap", instruction: "PS czy PC?", q: "She ___ (cook), ___ (clean) and ___ (prepare) everything before the guests arrived.", answer: "cooked / cleaned / prepared", hint: "Sekwencja zamkniętych czynności → Past Simple x3" },
      { type: "error", instruction: "Popraw błąd", q: "I was seeing a great film last night.", answer: "I saw a great film last night.", hint: "'last night' = skończona czynność → Past Simple" },
      { type: "error", instruction: "Popraw błąd", q: "While she was sleeping, she heard a noise.", answer: "While she was sleeping, she heard a noise.", hint: "To zdanie jest poprawne! 'heard' = zdarzenie przerywające → Past Simple ✓" },
      { type: "error", instruction: "Popraw błąd", q: "He was gone to school every day when he was young.", answer: "He went to school every day when he was young.", hint: "Regularna czynność przeszła → Past Simple (nie Past Continuous)" },
    ],
  },
  {
    id: "pp-vs-ppast", name: "Present Perfect vs Past Perfect", emoji: "🔗⏪", color: "#9070A0",
    desc: "Przeszłość połączona z teraźniejszością vs przeszłość przed inną przeszłością",
    key: "Present Perfect = łączy przeszłość z TERAZ (have/has + V3). Past Perfect = coś zakończone PRZED inną przeszłą czynnością (had + V3).",
    exercises: [
      { type: "choice", instruction: "PP czy Past Perfect?", q: "By the time she arrived, I ___ already eaten.", options: ["have", "had"], answer: "had", hint: "Przed jej przybyciem (przeszłość) → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "I ___ never seen snow before this morning.", options: ["have", "had"], answer: "had", hint: "'before this morning' = przed przeszłym momentem → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "She ___ just left. You missed her by two minutes!", options: ["has", "had"], answer: "has", hint: "Skutek teraz (możesz ją jeszcze dogonić) → Present Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "When I woke up, I realised I ___ missed my alarm.", options: ["have", "had"], answer: "had", hint: "Zdałem sobie sprawę = przeszłość; przeoczenie = wcześniej → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "___ you ever tried skydiving?", options: ["Have", "Had"], answer: "Have", hint: "Pytanie o życiowe doświadczenie do TERAZ → Present Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "She told me she ___ lived in London for five years.", options: ["has", "had"], answer: "had", hint: "Mowa zależna o przeszłości → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "I ___ already started cooking when she called to cancel dinner.", options: ["have", "had"], answer: "had", hint: "Gotowanie zaczęło się PRZED jej telefonem → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "Look! Someone ___ broken the window!", options: ["has", "had"], answer: "has", hint: "Widzisz wyłamane okno TERAZ → Present Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "I was exhausted because I ___ not slept for two days.", options: ["have", "had"], answer: "had", hint: "Powód zmęczenia = wcześniejsza przeszłość → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "It's a great film. ___ you seen it yet?", options: ["Have", "Had"], answer: "Have", hint: "Pytanie do TERAZ → Present Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "When we reached the station, the train ___ already left.", options: ["has", "had"], answer: "had", hint: "Pociąg odjechał PRZED naszym przyjazdem → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "I ___ never met anyone like her before.", options: ["have", "had"], answer: "had", hint: "'before' w kontekście przeszłym → Past Perfect" },
      { type: "choice", instruction: "PP czy Past Perfect?", q: "He ___ just arrived and already wants to leave.", options: ["has", "had"], answer: "has", hint: "Przyszedł dopiero co (teraz jest tutaj) → Present Perfect" },
      { type: "gap", instruction: "PP czy Past Perfect?", q: "By the time we arrived, they ___ (eat) all the food.", answer: "had eaten", hint: "Przed naszym przybyciem → Past Perfect" },
      { type: "gap", instruction: "PP czy Past Perfect?", q: "She realised she ___ (forget) her passport at home.", answer: "had forgotten", hint: "Uświadomiła sobie (przeszłość) że zapomniała wcześniej → Past Perfect" },
      { type: "gap", instruction: "PP czy Past Perfect?", q: "I'm so tired! I ___ (not / sleep) well lately.", answer: "haven't slept", hint: "'lately' z widocznym skutkiem teraz → Present Perfect" },
      { type: "gap", instruction: "PP czy Past Perfect?", q: "She said she ___ (see) that film three times already.", answer: "had seen", hint: "Mowa zależna, kontekst przeszły → Past Perfect" },
      { type: "gap", instruction: "PP czy Past Perfect?", q: "He ___ (already / leave) the office when I called.", answer: "had already left", hint: "Przed moim telefonem → Past Perfect" },
      { type: "error", instruction: "Popraw błąd", q: "I have never been to Paris before I visited it last year.", answer: "I had never been to Paris before I visited it last year.", hint: "Przed wizytą (przeszłość) → Past Perfect" },
      { type: "error", instruction: "Popraw błąd", q: "When I got home, my flatmate has already cooked dinner.", answer: "When I got home, my flatmate had already cooked dinner.", hint: "Kolacja była gotowa PRZED moim przyjazdem → Past Perfect" },
    ],
  },
  {
    id: "future-continuous-vs-perfect", name: "Future Continuous vs Future Perfect", emoji: "🌊✅", color: "#6080C0",
    desc: "Czynność trwająca vs zakończona przed momentem w przyszłości",
    key: "Future Continuous = czynność będzie TRWAĆ w danym momencie (will be + -ing). Future Perfect = czynność będzie ZAKOŃCZONA przed danym momentem (will have + V3).",
    exercises: [
      { type: "choice", instruction: "FC czy FP?", q: "At 8pm tomorrow, I ___ dinner with my family.", options: ["will be having", "will have had"], answer: "will be having", hint: "O 20:00 kolacja TRWA → Future Continuous" },
      { type: "choice", instruction: "FC czy FP?", q: "By 8pm tomorrow, I ___ dinner already.", options: ["will be having", "will have had"], answer: "will have had", hint: "DO 20:00 kolacja będzie skończona → Future Perfect" },
      { type: "choice", instruction: "FC czy FP?", q: "Don't call at noon — I ___ in a meeting.", options: ["will be sitting", "will have sat"], answer: "will be sitting", hint: "W południe spotkanie TRWA → Future Continuous" },
      { type: "choice", instruction: "FC czy FP?", q: "By the end of this month, she ___ here for a year.", options: ["will be working", "will have worked"], answer: "will have worked", hint: "'by the end' = do końca miesiąca = zakończone → Future Perfect" },
      { type: "choice", instruction: "FC czy FP?", q: "This time next week, we ___ on the beach.", options: ["will be lying", "will have lain"], answer: "will be lying", hint: "'this time next week' = w tym samym momencie tydzień później = trwać → FC" },
      { type: "choice", instruction: "FC czy FP?", q: "By the time you wake up, I ___ already ___.", options: ["will be leaving", "will have left"], answer: "will have left", hint: "'by the time' = zanim się obudzisz = przed tym momentem → Future Perfect" },
      { type: "choice", instruction: "FC czy FP?", q: "At midnight, the scientists ___ the experiment.", options: ["will be conducting", "will have conducted"], answer: "will be conducting", hint: "O północy eksperyment TRWA → Future Continuous" },
      { type: "choice", instruction: "FC czy FP?", q: "By midnight, the scientists ___ the experiment.", options: ["will be conducting", "will have conducted"], answer: "will have conducted", hint: "DO północy = zakończone przed tą godziną → Future Perfect" },
      { type: "choice", instruction: "FC czy FP?", q: "In ten years, she ___ as a surgeon for two decades.", options: ["will be working", "will have been working"], answer: "will have been working", hint: "Czas trwania + 'in ten years' jako punkt graniczny → FPC (najlepiej), ale FP akceptowalne" },
      { type: "choice", instruction: "FC czy FP?", q: "I can't meet you at 7 — I ___ at the gym then.", options: ["will be training", "will have trained"], answer: "will be training", hint: "O 19:00 trening TRWA → Future Continuous" },
      { type: "gap", instruction: "FC czy FP?", q: "When you arrive, we ___ (already / eat) — please hurry!", answer: "will have already eaten", hint: "Przed twoim przyjazdem jedzenie będzie skończone → Future Perfect" },
      { type: "gap", instruction: "FC czy FP?", q: "At 3pm on Friday I ___ (fly) over the Atlantic.", answer: "will be flying", hint: "O 15:00 w piątek lot TRWA → Future Continuous" },
      { type: "gap", instruction: "FC czy FP?", q: "By June, he ___ (save) enough money to buy the car.", answer: "will have saved", hint: "'by June' = do czerwca = zakończone → Future Perfect" },
      { type: "gap", instruction: "FC czy FP?", q: "This time tomorrow we ___ (present) our project to the board.", answer: "will be presenting", hint: "O tej porze jutro prezentacja TRWA → Future Continuous" },
      { type: "gap", instruction: "FC czy FP?", q: "By the time the guests arrive, I ___ (clean) the whole flat.", answer: "will have cleaned", hint: "'by the time' + przyszłość = zakończone przed → Future Perfect" },
    ],
  },
  {
    id: "used-to-vs-ps", name: "used to vs Past Simple", emoji: "🕰️⏮️", color: "#80A848",
    desc: "Dawny nawyk vs jednorazowe zdarzenie w przeszłości",
    key: "'Used to' = powtarzający się nawyk lub stan w przeszłości, który już nie istnieje. Past Simple = konkretne jednorazowe zdarzenie.",
    exercises: [
      { type: "choice", instruction: "used to czy Past Simple?", q: "When I was a child, I ___ climb trees every day.", options: ["used to climb", "climbed"], answer: "used to climb", hint: "Codziennie = powtarzający się nawyk → used to" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "I ___ my knee while hiking last weekend.", options: ["used to hurt", "hurt"], answer: "hurt", hint: "Jednorazowe zdarzenie w ostatni weekend → Past Simple" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "She ___ be very quiet as a teenager.", options: ["used to", "was"], answer: "used to", hint: "Dawna cecha charakteru (już nie taka) → used to" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "We ___ to Rome on our honeymoon.", options: ["used to go", "went"], answer: "went", hint: "Jednorazowe wydarzenie (podróż poślubna) → Past Simple" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "He ___ smoke two packs a day, but he quit in 2015.", options: ["used to", "did"], answer: "used to", hint: "Dawny nawyk, który minął → used to" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "She ___ her first novel in 2010.", options: ["used to write", "wrote"], answer: "wrote", hint: "Konkretna data + jednorazowe działanie → Past Simple" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "My grandfather ___ walk 5 miles to school as a child.", options: ["used to", "did"], answer: "used to", hint: "Regularny nawyk z dzieciństwa → used to" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "I ___ him at a conference in Berlin.", options: ["used to meet", "met"], answer: "met", hint: "Jednokrotne spotkanie → Past Simple" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "They ___ live near us, but they moved to Gdańsk.", options: ["used to", "did"], answer: "used to", hint: "Dawny stan (mieszkali, ale już nie) → used to" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "She ___ a beautiful painting for her mother's birthday.", options: ["used to paint", "painted"], answer: "painted", hint: "Konkretny prezent urodzinowy = jednorazowe → Past Simple" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "They ___ go camping every summer when the kids were small.", options: ["used to", "did"], answer: "used to", hint: "Każde lato = regularne powtarzające się → used to" },
      { type: "choice", instruction: "used to czy Past Simple?", q: "I ___ afraid of dogs, but I got one and it changed everything.", options: ["used to be", "was"], answer: "used to be", hint: "Dawny stan z kontrastem z teraźniejszością → used to (oba możliwe, ale used to mocniej podkreśla zmianę)" },
      { type: "gap", instruction: "used to czy Past Simple?", q: "She ___ (have) long hair, but she cut it all off last year.", answer: "used to have", hint: "Dawny stan (już nie ma) → used to" },
      { type: "gap", instruction: "used to czy Past Simple?", q: "He ___ (fall) off his bike and ___ (break) his wrist.", answer: "fell / broke", hint: "Sekwencja jednorazowych zdarzeń → Past Simple, Past Simple" },
      { type: "gap", instruction: "used to czy Past Simple?", q: "We ___ (spend) hours playing outside when we were kids.", answer: "used to spend", hint: "Regularna aktywność z dzieciństwa → used to" },
      { type: "gap", instruction: "used to czy Past Simple?", q: "The company ___ (employ) 500 people, but now it only has 50.", answer: "used to employ", hint: "Dawny stan z kontrastem → used to" },
      { type: "gap", instruction: "used to czy Past Simple?", q: "He ___ (win) the tournament in 2018 and ___ (celebrate) for a week.", answer: "won / celebrated", hint: "Konkretna data + jednorazowe zdarzenie → Past Simple" },
      { type: "error", instruction: "Popraw błąd", q: "I use to go to that café every morning.", answer: "I used to go to that café every morning.", hint: "Nawyk przeszły → used to (nie: use to)" },
      { type: "error", instruction: "Popraw błąd", q: "He used to broke his leg last year.", answer: "He broke his leg last year.", hint: "'last year' = konkretny czas, jednorazowe → Past Simple" },
      { type: "error", instruction: "Popraw błąd", q: "They used to visit us yesterday.", answer: "They visited us yesterday.", hint: "'yesterday' = konkretny czas → Past Simple (nie used to)" },
    ],
  },
  {
    id: "active-vs-passive", name: "Strona czynna vs bierna", emoji: "⚡🔵", color: "#5090B0",
    desc: "Kiedy użyć Active, a kiedy Passive",
    key: "Active = sprawca ważny i znany. Passive = sprawca nieznany, nieważny lub oczywisty. Passive = bardziej formalny styl.",
    exercises: [
      { type: "choice", instruction: "Active czy Passive?", q: "The window ___ by a ball during practice.", options: ["broke", "was broken"], answer: "was broken", hint: "Okno doznało czynności, sprawca drugorzędny → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "Someone ___ my car last night.", options: ["stole", "was stolen"], answer: "stole", hint: "'someone' = podmiot wykonujący → Active" },
      { type: "choice", instruction: "Active czy Passive?", q: "This novel ___ in 1984.", options: ["wrote", "was written"], answer: "was written", hint: "Nie wiemy kto napisał, ważna jest książka → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "The president ___ the new law last week.", options: ["signed", "was signed"], answer: "signed", hint: "Prezydent = znany sprawca, ważna jego rola → Active" },
      { type: "choice", instruction: "Active czy Passive?", q: "All applications ___ by March 1st.", options: ["must submit", "must be submitted"], answer: "must be submitted", hint: "Formalny komunikat, nieznany wykonawca → Passive Modal" },
      { type: "choice", instruction: "Active czy Passive?", q: "They ___ a new hospital in our city.", options: ["are building", "is being built"], answer: "are building", hint: "'They' = znany sprawca → Active" },
      { type: "choice", instruction: "Active czy Passive?", q: "Penicillin ___ by Alexander Fleming in 1928.", options: ["discovered", "was discovered"], answer: "was discovered", hint: "Sprawca podany przez 'by', ale ważne odkrycie → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "The police ___ three suspects last night.", options: ["arrested", "were arrested"], answer: "arrested", hint: "Policja = aktywny podmiot → Active" },
      { type: "choice", instruction: "Active czy Passive?", q: "The results ___ tomorrow morning.", options: ["will announce", "will be announced"], answer: "will be announced", hint: "Kto ogłosi = oczywiste/nieważne; formalny styl → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "My wallet ___ while I was on the metro.", options: ["stole", "was stolen"], answer: "was stolen", hint: "Nieznany złodziej → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "The contractor ___ the building next year.", options: ["will renovate", "will be renovated"], answer: "will renovate", hint: "'the contractor' = znany sprawca → Active" },
      { type: "choice", instruction: "Active czy Passive?", q: "The building ___ next year.", options: ["will renovate", "will be renovated"], answer: "will be renovated", hint: "Budynek = podmiot; sprawca nieważny → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "This cheese ___ in France.", options: ["makes", "is made"], answer: "is made", hint: "Fakt o produkcie, sprawca nieważny → Passive" },
      { type: "choice", instruction: "Active czy Passive?", q: "The chef ___ this cheese in France.", options: ["makes", "is made"], answer: "makes", hint: "Znany podmiot (chef) → Active" },
      { type: "choice", instruction: "Active czy Passive?", q: "Hundreds of trees ___ by the storm last night.", options: ["destroyed", "were destroyed"], answer: "were destroyed", hint: "Drzewa = ofiary, burza jako 'by' = sprawca → Passive" },
      { type: "gap", instruction: "Active czy Passive?", q: "The letter ___ (send) before the deadline.", answer: "was sent", hint: "Kto wysłał = nieważne → Passive Past Simple" },
      { type: "gap", instruction: "Active czy Passive?", q: "Our team ___ (develop) the new app over six months.", answer: "developed", hint: "Znany podmiot (our team) → Active" },
      { type: "gap", instruction: "Active czy Passive?", q: "The suspects ___ (question) by the police.", answer: "were questioned", hint: "Policja jest sprawcą (by), podejrzani = podmiot → Passive" },
      { type: "gap", instruction: "Active czy Passive?", q: "English ___ (speak) in over 50 countries.", answer: "is spoken", hint: "Fakt, kto mówi = oczywiste → Passive Present Simple" },
      { type: "gap", instruction: "Active czy Passive?", q: "The government ___ (raise) taxes next year.", answer: "will raise", hint: "Rząd = znany sprawca → Active" },
      { type: "error", instruction: "Popraw błąd", q: "The thief was stolen my laptop.", answer: "The thief stole my laptop.", hint: "Złodziej = aktywny sprawca → Active ('stole')" },
      { type: "error", instruction: "Popraw błąd", q: "This road is built in 2005.", answer: "This road was built in 2005.", hint: "2005 = przeszłość → Past Simple Passive: was built" },
      { type: "error", instruction: "Popraw błąd", q: "He must be submit the form today.", answer: "He must submit the form today.", hint: "Znamy podmiot (he) i jego obowiązek → Active: must submit" },
    ],
  },
  {
    id: "pc-vs-ppc", name: "Past Continuous vs Past Perfect Continuous", emoji: "📽️🎞️", color: "#C06890",
    desc: "Czynność trwająca W przeszłości vs trwająca PRZED inną przeszłą czynnością",
    key: "Past Continuous = trwała w konkretnym momencie. Past Perfect Continuous = trwała przez pewien czas przed innym przeszłym zdarzeniem — nacisk na czas trwania.",
    exercises: [
      { type: "choice", instruction: "PC czy PPC?", q: "She was tired because she ___ all day.", options: ["was working", "had been working"], answer: "had been working", hint: "Wyjaśnienie zmęczenia: długa czynność PRZED zmęczeniem → PPC" },
      { type: "choice", instruction: "PC czy PPC?", q: "At 6pm, she ___ on the report.", options: ["was working", "had been working"], answer: "was working", hint: "O 18:00 praca TRWAŁA → Past Continuous" },
      { type: "choice", instruction: "PC czy PPC?", q: "His hands were dirty because he ___ in the garage.", options: ["was working", "had been working"], answer: "had been working", hint: "Brudne ręce = skutek ciągłej wcześniejszej czynności → PPC" },
      { type: "choice", instruction: "PC czy PPC?", q: "When I walked in, he ___ at his desk.", options: ["was sitting", "had been sitting"], answer: "was sitting", hint: "Zastałem go siedzącego = trwał w tym momencie → Past Continuous" },
      { type: "choice", instruction: "PC czy PPC?", q: "He ___ at his desk for three hours when I finally arrived.", options: ["was sitting", "had been sitting"], answer: "had been sitting", hint: "Przez trzy godziny PRZED moim przybyciem → PPC" },
      { type: "choice", instruction: "PC czy PPC?", q: "She could hardly speak — she ___ for an hour.", options: ["was crying", "had been crying"], answer: "had been crying", hint: "Prawie nie mogła mówić = skutek czynności trwającej godzinę wcześniej → PPC" },
      { type: "choice", instruction: "PC czy PPC?", q: "At that moment, Tom ___ and didn't hear the announcement.", options: ["was daydreaming", "had been daydreaming"], answer: "was daydreaming", hint: "W tym momencie = trwający stan → Past Continuous" },
      { type: "choice", instruction: "PC czy PPC?", q: "The ground was wet because it ___ all night.", options: ["was raining", "had been raining"], answer: "had been raining", hint: "Mokra ziemia = skutek; deszcz trwał przed tym → PPC" },
      { type: "choice", instruction: "PC czy PPC?", q: "While I ___ on the phone, someone knocked at the door.", options: ["was talking", "had been talking"], answer: "was talking", hint: "Rozmowa = tło (trwała gdy ktoś zapukał) → Past Continuous" },
      { type: "choice", instruction: "PC czy PPC?", q: "By the time the ambulance arrived, the doctor ___ for help for twenty minutes.", options: ["was calling", "had been calling"], answer: "had been calling", hint: "Dwadzieścia minut PRZED przybyciem → PPC" },
      { type: "gap", instruction: "PC czy PPC?", q: "The athlete was exhausted because she ___ (train) since dawn.", answer: "had been training", hint: "Od świtu = długi czas PRZED wyczerpaniem → PPC" },
      { type: "gap", instruction: "PC czy PPC?", q: "At 9am, the students ___ (take) an exam.", answer: "were taking", hint: "O 9:00 egzamin TRWAŁ → Past Continuous" },
      { type: "gap", instruction: "PC czy PPC?", q: "His eyes were red. He ___ (cry).", answer: "had been crying", hint: "Czerwone oczy = skutek wcześniejszego płakania → PPC" },
      { type: "gap", instruction: "PC czy PPC?", q: "She ___ (argue) with him when I arrived — the atmosphere was tense.", answer: "was arguing", hint: "Kłótnia trwała gdy przybyłam → Past Continuous" },
      { type: "gap", instruction: "PC czy PPC?", q: "By the time the film started, we ___ (wait) for half an hour.", answer: "had been waiting", hint: "Pół godziny PRZED startem filmu → PPC" },
    ],
  },
  {
    id: "fc-vs-ps", name: "Present Continuous vs Present Simple (nawyki vs plany)", emoji: "🔄☀️", color: "#70A0D0",
    desc: "Regularne fakty vs tymczasowe/zaplanowane sytuacje",
    key: "Present Simple = stałe prawdy, nawyki, harmonogramy. Present Continuous = czynności trwające teraz LUB tymczasowe sytuacje lub plany na bliską przyszłość.",
    exercises: [
      { type: "choice", instruction: "PS czy PC?", q: "I ___ to work by bike, but this week I ___ the tram because my bike is broken.", options: ["cycle / take", "am cycling / am taking"], answer: "cycle / am taking", hint: "Nawyk = PS; tymczasowa sytuacja tego tygodnia = PC" },
      { type: "choice", instruction: "PS czy PC?", q: "She always ___ coffee in the morning.", options: ["drinks", "is drinking"], answer: "drinks", hint: "Nawyk 'always' → Present Simple" },
      { type: "choice", instruction: "PS czy PC?", q: "Look! She ___ something. She never drinks coffee!", options: ["drinks", "is drinking"], answer: "is drinking", hint: "Widzisz to TERAZ → Present Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "Tom ___ in Warsaw but right now he ___ in Kraków for a conference.", options: ["lives / is staying", "is living / stays"], answer: "lives / is staying", hint: "Stałe miejsce zamieszkania = PS; tymczasowy pobyt = PC" },
      { type: "choice", instruction: "PS czy PC?", q: "The Earth ___ around the Sun.", options: ["goes", "is going"], answer: "goes", hint: "Fakt naukowy = Present Simple" },
      { type: "choice", instruction: "PS czy PC?", q: "I ___ dinner with Jan tomorrow evening.", options: ["have", "am having"], answer: "am having", hint: "Zaplanowane spotkanie w bliskiej przyszłości → Present Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "The train to Gdańsk ___ at 9:15.", options: ["leaves", "is leaving"], answer: "leaves", hint: "Stały rozkład jazdy → Present Simple" },
      { type: "choice", instruction: "PS czy PC?", q: "Jane usually ___ at 7am, but this week she ___ at 6am because of the gym.", options: ["starts / is starting", "is starting / starts"], answer: "starts / is starting", hint: "Zwykła pora = PS; wyjątkowa sytuacja tego tygodnia = PC" },
      { type: "choice", instruction: "PS czy PC?", q: "Be quiet! The baby ___.", options: ["sleeps", "is sleeping"], answer: "is sleeping", hint: "Teraz śpi → Present Continuous" },
      { type: "choice", instruction: "PS czy PC?", q: "Babies ___ a lot in the first months.", options: ["sleep", "are sleeping"], answer: "sleep", hint: "Ogólny fakt o niemowlętach → Present Simple" },
      { type: "gap", instruction: "PS czy PC?", q: "I usually ___ (cook) dinner at home, but tonight I ___ (eat) out.", answer: "cook / am eating", hint: "Nawyk = PS; plan na dziś wieczór = PC" },
      { type: "gap", instruction: "PS czy PC?", q: "She ___ (speak) three languages fluently.", answer: "speaks", hint: "Stała umiejętność → Present Simple" },
      { type: "gap", instruction: "PS czy PC?", q: "They ___ (renovate) their apartment this month.", answer: "are renovating", hint: "Tymczasowa bieżąca sytuacja → Present Continuous" },
      { type: "gap", instruction: "PS czy PC?", q: "Water ___ (boil) at 100 degrees Celsius.", answer: "boils", hint: "Fakt naukowy → Present Simple" },
      { type: "gap", instruction: "PS czy PC?", q: "I ___ (meet) my boss tomorrow at 10. It's in my calendar.", answer: "am meeting", hint: "Zaplanowane spotkanie → Present Continuous" },
      { type: "error", instruction: "Popraw błąd", q: "He is knowing the answer.", answer: "He knows the answer.", hint: "know = czasownik stanowy → NIE używamy Present Continuous" },
      { type: "error", instruction: "Popraw błąd", q: "I have dinner with Jan tomorrow. I already booked the restaurant.", answer: "I am having dinner with Jan tomorrow.", hint: "Zaplanowane spotkanie → Present Continuous (nie Present Simple)" },
      { type: "error", instruction: "Popraw błąd", q: "Look! The cat is sitting on the sofa every day.", answer: "The cat sits on the sofa every day.", hint: "'every day' = nawyk → Present Simple (nie PC)" },
    ],
  },
];

// ─── STORIES ──────────────────────────────────────────────────────────────
const stories = [
  {
    id: "morning-routine", title: "Zwykły dzień Anny", emoji: "🌅", level: "A2", focus: "Present Simple", color: "#E8B84B",
    intro: "Uzupełnij tekst właściwymi formami czasowników.",
    segments: [
      "Anna ", { verb: "work", answer: "works", hint: "3. os. l. poj. → +s" }, " in a small café. Every morning she ",
      { verb: "get up", answer: "gets up", hint: "get up → gets up" }, " at 6am and ",
      { verb: "take", answer: "takes", hint: "take → takes" }, " a quick shower. She ",
      { verb: "not / have", answer: "doesn't have", altAnswers: ["does not have"], hint: "3. os. l. poj. przecząca: doesn't + bezokolicznik" },
      " time for breakfast, so she ", { verb: "drink", answer: "drinks", hint: "drink → drinks" },
      " coffee at work. The café ", { verb: "open", answer: "opens", hint: "The café → opens" },
      " at 7:30, and customers ", { verb: "start", answer: "start", hint: "l. mn. → bez zmian" },
      " arriving soon after. Anna ", { verb: "love", answer: "loves", hint: "love → loves" },
      " her job because she ", { verb: "meet", answer: "meets", hint: "meet → meets" }, " interesting people every day.",
    ],
  },
  {
    id: "lost-in-rome", title: "Zgubieni w Rzymie", emoji: "🏛️", level: "A2", focus: "Past Simple", color: "#E06B5C",
    intro: "Uzupełnij tekst właściwymi formami czasowników w przeszłości.",
    segments: [
      "Last summer, my friends and I ", { verb: "go", answer: "went", hint: "go → went" },
      " to Rome. We ", { verb: "fly", answer: "flew", hint: "fly → flew" },
      " from Warsaw and ", { verb: "arrive", answer: "arrived", hint: "regularny → arrived" },
      " late in the evening. The next day, we ", { verb: "visit", answer: "visited", hint: "regularny → visited" },
      " the Colosseum and ", { verb: "eat", answer: "ate", hint: "eat → ate" },
      " amazing pasta. On the second day, we ", { verb: "get", answer: "got", hint: "get → got" },
      " completely lost. We ", { verb: "not / have", answer: "didn't have", altAnswers: ["did not have"], hint: "didn't + bezokolicznik" },
      " a map and our phones ", { verb: "not / work", answer: "didn't work", altAnswers: ["did not work"], hint: "didn't + bezokolicznik" },
      ". Finally, a kind man ", { verb: "show", answer: "showed", hint: "regularny → showed" },
      " us the way. We ", { verb: "be", answer: "were", hint: "be → were (l. mn.)" }, " so relieved!",
    ],
  },
  {
    id: "weekend-plans-a2", title: "Plany na weekend", emoji: "🎉", level: "A2", focus: "Future (going to + will)", color: "#5BAD6F",
    intro: "Uzupełnij rozmowę o planach. Użyj 'going to' lub 'will'.",
    segments: [
      "\"What ", { verb: "you / do", answer: "are you going to do", hint: "Plan z wyprzedzeniem → going to" },
      " this weekend?\" \"I ", { verb: "visit", answer: "am going to visit", hint: "Zaplanowana wizyta → going to" },
      " my grandparents on Saturday. I already told them I ", { verb: "come", answer: "will come", hint: "Obietnica w tamtym momencie → will" },
      ". On Sunday I ", { verb: "probably / stay", answer: "will probably stay", hint: "Prawdopodobny plan bez konkretnej rezerwacji → will" },
      " at home.\" \"Oh, that sounds nice. I think I ", { verb: "go", answer: "will go", hint: "Opinia/decyzja w tej chwili → will" },
      " to the cinema. Look — there ", { verb: "be", answer: "is going to be", hint: "Dowód (plakat) → going to" }, " a new film I want to see.\"",
    ],
  },
  {
    id: "at-the-market", title: "Na targu", emoji: "🛒", level: "A2", focus: "Present Simple", color: "#CF87D6",
    intro: "Uzupełnij tekst o cotygodniowej wizycie na targu.",
    segments: [
      "Every Saturday, Marta and her daughter ", { verb: "go", answer: "go", hint: "l. mn. → bezokolicznik" },
      " to the local market. The market ", { verb: "open", answer: "opens", hint: "The market (= it) → opens" },
      " at 8am and ", { verb: "close", answer: "closes", hint: "closes" }, " at 2pm. Marta always ",
      { verb: "buy", answer: "buys", hint: "buys" }, " fresh vegetables and her daughter ",
      { verb: "choose", answer: "chooses", hint: "choose → chooses" }, " the fruit. They ",
      { verb: "not / like", answer: "don't like", hint: "l. mn. przecząca: don't + bezokolicznik" },
      " supermarkets because the food ", { verb: "not / taste", answer: "doesn't taste", hint: "3. os. l. poj. przecząca" },
      " as fresh. The market vendors all ", { verb: "know", answer: "know", hint: "l. mn. → bezokolicznik" },
      " Marta by name and sometimes ", { verb: "give", answer: "give", hint: "give" }, " her free herbs.",
    ],
  },
  {
    id: "first-day-job", title: "Pierwszy dzień w pracy", emoji: "💼", level: "A2", focus: "Past Simple", color: "#4DAFAA",
    intro: "Uzupełnij historię o pierwszym dniu w nowej pracy.",
    segments: [
      "Last Monday was my first day at the new company. I ", { verb: "wake", answer: "woke", hint: "wake → woke" },
      " up very early because I ", { verb: "be", answer: "was", hint: "I → was" },
      " nervous. I ", { verb: "put", answer: "put", hint: "put → put (bez zmian)" },
      " on my best shirt and ", { verb: "leave", answer: "left", hint: "leave → left" },
      " home at 7am. I ", { verb: "take", answer: "took", hint: "take → took" },
      " the tram and ", { verb: "arrive", answer: "arrived", hint: "regularny → arrived" },
      " fifteen minutes early. My new manager ", { verb: "greet", answer: "greeted", hint: "regularny → greeted" },
      " me and ", { verb: "introduce", answer: "introduced", hint: "regularny → introduced" },
      " me to the team. Everyone ", { verb: "be", answer: "was", hint: "l. poj. → was" },
      " very friendly. After work I ", { verb: "call", answer: "called", hint: "regularny → called" },
      " my mum to tell her how the day ", { verb: "go", answer: "went", hint: "go → went" }, ".",
    ],
  },
  {
    id: "grandmothers-recipe", title: "Przepis babci", emoji: "🍰", level: "A2", focus: "Present Simple + Imperative", color: "#E8B84B",
    intro: "Babcia tłumaczy przepis na ciasto. Uzupełnij.",
    segments: [
      "This recipe ", { verb: "come", answer: "comes", hint: "Present Simple 3. os." },
      " from my own grandmother. First, you ", { verb: "need", answer: "need", hint: "Present Simple" },
      " 200g of butter and 300g of flour. The butter ", { verb: "have to / be", answer: "has to be", hint: "has to be (must be) — wymóg" },
      " at room temperature — this ", { verb: "make", answer: "makes", hint: "Present Simple" },
      " a big difference. You ", { verb: "mix", answer: "mix", hint: "Present Simple / Imperative" },
      " the butter with sugar until it ", { verb: "become", answer: "becomes", hint: "Present Simple" },
      " pale and fluffy. The whole process ", { verb: "take", answer: "takes", hint: "Present Simple" },
      " about ten minutes by hand, but a mixer ", { verb: "work", answer: "works", hint: "Present Simple" },
      " much faster. Once the batter ", { verb: "be", answer: "is", hint: "Present Simple" }, " ready, you bake it at 180°C for 35 minutes.",
    ],
  },
  {
    id: "the-storm", title: "Burza w środku nocy", emoji: "⛈️", level: "B1", focus: "Past Simple + Past Continuous", color: "#4DAFAA",
    intro: "Uzupełnij historię. Zwróć uwagę na różnicę między czynnością trwającą a przerywającą.",
    segments: [
      "It was a dark and stormy night. At midnight, Tom ", { verb: "sleep", answer: "was sleeping", hint: "Czynność trwająca → Past Continuous" },
      " peacefully when a crack of thunder ", { verb: "wake", answer: "woke", hint: "Chwilowe zdarzenie → Past Simple" },
      " him up. He ", { verb: "lie", answer: "was lying", hint: "Tło → Past Continuous" },
      " in bed wondering what to do when he heard a noise. Someone ",
      { verb: "move", answer: "was moving", hint: "Dźwięk trwający → Past Continuous" },
      " in the kitchen! Tom carefully ", { verb: "go", answer: "went", hint: "Past Simple" },
      " downstairs. While he ", { verb: "walk", answer: "was walking", hint: "'while' = tło → Past Continuous" },
      " down the corridor, the lights ", { verb: "go out", answer: "went out", hint: "Chwilowe → Past Simple" },
      ". He ", { verb: "grab", answer: "grabbed", hint: "regularny → grabbed" },
      " his phone. To his relief, it was only his cat, who ", { verb: "play", answer: "was playing", hint: "Past Continuous" }, " with a bag.",
    ],
  },
  {
    id: "the-interview", title: "Rozmowa kwalifikacyjna", emoji: "💼", level: "B1", focus: "Present Perfect + Present Simple", color: "#7C5CBF",
    intro: "Anna jest na rozmowie kwalifikacyjnej. Uzupełnij tekst.",
    segments: [
      "\"So, tell me about yourself.\" Anna takes a breath. \"Well, I ", { verb: "work", answer: "have worked", hint: "Doświadczenie do teraz → Present Perfect" },
      " in marketing for five years. I ", { verb: "manage", answer: "have managed", hint: "Present Perfect" },
      " campaigns for three companies.\" \"", { verb: "ever / work", answer: "Have you ever worked", hint: "Pytanie o doświadczenie → PP" },
      " with international clients?\" \"Yes, I ", { verb: "have", answer: "have", hint: "Krótka odpowiedź twierdząca" },
      ". I regularly ", { verb: "communicate", answer: "communicate", hint: "Regularna czynność → Present Simple" },
      " with clients in Germany. I ", { verb: "also / learn", answer: "have also learned", altAnswers: ["have also learnt"], hint: "Wynik nauki → Present Perfect" },
      " basic German, which ", { verb: "help", answer: "helps", hint: "Fakt ogólny → Present Simple 3. os." }, " a lot in meetings.\"",
    ],
  },
  {
    id: "holiday-mishap", title: "Katastrofa na wakacjach", emoji: "🏖️", level: "B1", focus: "Past Simple + Past Continuous", color: "#E8945A",
    intro: "Uzupełnij historię o nieudanych wakacjach.",
    segments: [
      "Last July, we ", { verb: "go", answer: "went", hint: "go → went" }, " to Spain for two weeks. Everything ",
      { verb: "go", answer: "was going", hint: "Trwający stan → Past Continuous" },
      " well until the third day. While I ", { verb: "sunbathe", answer: "was sunbathing", hint: "Past Continuous" },
      " on the beach, someone ", { verb: "steal", answer: "stole", hint: "steal → stole" },
      " my bag. I ", { verb: "not / notice", answer: "didn't notice", hint: "didn't + bezokolicznik" },
      " because I ", { verb: "listen", answer: "was listening", hint: "Past Continuous" },
      " to music. My passport, wallet and phone ", { verb: "be", answer: "were", hint: "l. mn. → were" },
      " inside. We ", { verb: "spend", answer: "spent", hint: "spend → spent" },
      " the whole afternoon at the police station while my husband ", { verb: "try", answer: "was trying", hint: "Past Continuous" },
      " to contact the embassy. It ", { verb: "not / be", answer: "wasn't", altAnswers: ["was not"], hint: "wasn't" }, " the holiday we'd planned!",
    ],
  },
  {
    id: "city-vs-country", title: "Miasto czy wieś?", emoji: "🌆", level: "B1", focus: "Used to / Would + Present Simple", color: "#A0B060",
    intro: "Mężczyzna porównuje życie dawne i obecne.",
    segments: [
      "I ", { verb: "use to / live", answer: "used to live", hint: "Dawny stan → used to live" },
      " in a small village. Every morning I ", { verb: "would / walk", answer: "would walk", hint: "Dawny nawyk → would walk" },
      " to school through the fields. We ", { verb: "use to / have", answer: "used to have", hint: "Dawny stan → used to have" },
      " a dog and I ", { verb: "would / play", answer: "would play", hint: "Dawny nawyk → would play" },
      " with him for hours. Life ", { verb: "be", answer: "was", hint: "Past Simple — opis przeszłości" },
      " quiet and simple. Now I ", { verb: "live", answer: "live", hint: "Present Simple" },
      " in Warsaw and everything ", { verb: "be", answer: "is", hint: "Present Simple" },
      " different. I ", { verb: "not / have", answer: "don't have", hint: "Present Simple przecząca" },
      " time for long walks and I ", { verb: "rarely / see", answer: "rarely see", hint: "Present Simple + rarely" },
      " stars at night because of the light pollution. But I ", { verb: "earn", answer: "earn", hint: "Present Simple" }, " much more money!",
    ],
  },
  {
    id: "lost-passport", title: "Zgubiony paszport", emoji: "🛂", level: "B1", focus: "Present Perfect + Past Simple", color: "#9B6EBF",
    intro: "Uzupełnij dialog na lotnisku.",
    segments: [
      "\"I'm afraid I ", { verb: "lose", answer: "have lost", hint: "Skutek teraz = nie ma paszportu → Present Perfect" },
      " my passport. What should I do?\" The officer frowns. \"When ",
      { verb: "you / last / see", answer: "did you last see", hint: "Ostatni raz = konkretny moment → Past Simple" },
      " it?\" \"I ", { verb: "have", answer: "had", hint: "Past Simple — konkretny moment wcześniej" },
      " it at check-in, but I ", { verb: "not / check", answer: "haven't checked", hint: "Jeszcze nie sprawdziłem → Present Perfect" },
      " my bag yet.\" \"",
      { verb: "you / ever / lose", answer: "Have you ever lost", hint: "Doświadczenie życiowe → Present Perfect" },
      " a passport before?\" \"No, never. This is the first time this ",
      { verb: "happen", answer: "has happened", hint: "'this is the first time' → Present Perfect" },
      " to me. I ", { verb: "look", answer: "looked", hint: "Past Simple — już sprawdziłem" }, " everywhere in my bag but it's not there.\"",
    ],
  },
  {
    id: "cooking-disaster", title: "Kulinarny kataklizm", emoji: "🍳", level: "B1", focus: "Past Simple + Past Continuous", color: "#E06B5C",
    intro: "Uzupełnij historię o nieudanym gotowaniu.",
    segments: [
      "Yesterday I ", { verb: "decide", answer: "decided", hint: "regularny → decided" },
      " to cook a special dinner for my girlfriend. While I ", { verb: "chop", answer: "was chopping", hint: "Past Continuous" },
      " the onions, I accidentally ", { verb: "cut", answer: "cut", hint: "cut → cut (bez zmian)" },
      " my finger. While it ", { verb: "bleed", answer: "was bleeding", hint: "Past Continuous" },
      ", the pasta ", { verb: "boil over", answer: "boiled over", hint: "Past Simple" },
      ". At that moment, the smoke alarm ", { verb: "start", answer: "started", hint: "Past Simple" },
      " beeping. My cat, who ", { verb: "sleep", answer: "was sleeping", hint: "Past Continuous" },
      " on the sofa, ", { verb: "jump", answer: "jumped", hint: "Past Simple" },
      " in fright and ", { verb: "knock", answer: "knocked", hint: "Past Simple" },
      " over a glass of wine. We ", { verb: "end up", answer: "ended up", hint: "Past Simple" }, " ordering pizza.",
    ],
  },
  {
    id: "travel-blog", title: "Blog podróżniczy", emoji: "✈️", level: "B1", focus: "Present Perfect + Present Simple", color: "#5B8EE6",
    intro: "Fragment bloga podróżniczego.",
    segments: [
      "I ", { verb: "travel", answer: "have been travelling", hint: "Czynność ciągła do teraz → Present Perfect Continuous" },
      " for six months now and I ", { verb: "visit", answer: "have visited", hint: "Dotychczasowy wynik → Present Perfect" },
      " fourteen countries. I ", { verb: "never / feel", answer: "have never felt", hint: "Doświadczenie życiowe + never → Present Perfect" },
      " more alive. Every day ", { verb: "bring", answer: "brings", hint: "Present Simple 3. os." },
      " new surprises. This week I ", { verb: "stay", answer: "am staying", hint: "Tymczasowy pobyt → Present Continuous" },
      " in a tiny village in Portugal. The locals ", { verb: "not / speak", answer: "don't speak", hint: "Present Simple przecząca" },
      " English but somehow we ", { verb: "manage", answer: "manage", hint: "Present Simple" },
      " to communicate. I ", { verb: "just / eat", answer: "have just eaten", hint: "just → Present Perfect" },
      " the best seafood of my life. If you ", { verb: "never / try", answer: "have never tried", hint: "Present Perfect z never" }, " fresh grilled sardines, you're missing out!",
    ],
  },
  {
    id: "job-application", title: "List motywacyjny", emoji: "📝", level: "B1", focus: "Present Perfect + Past Simple", color: "#7C5CBF",
    intro: "Fragment listu motywacyjnego. Uzupełnij właściwymi formami.",
    segments: [
      "I am writing to apply for the marketing manager position. I ", { verb: "work", answer: "have worked", hint: "Doświadczenie do teraz → Present Perfect" },
      " in marketing for eight years and ", { verb: "gain", answer: "have gained", hint: "Present Perfect" },
      " extensive experience in digital campaigns. In my current role I ", { verb: "lead", answer: "have been leading", hint: "PPC — nadal trwa" },
      " a team of six people for the past two years. In my previous position, I ", { verb: "increase", answer: "increased", hint: "Skończona czynność w poprzedniej pracy → Past Simple" },
      " website traffic by 150% within a year. I ", { verb: "complete", answer: "have recently completed", hint: "recently → Present Perfect" },
      " a course in data analytics, which I believe ", { verb: "strengthen", answer: "has strengthened", hint: "Present Perfect" }, " my skill set considerably.",
    ],
  },
  {
    id: "the-discovery", title: "Tajemnicze odkrycie", emoji: "🔍", level: "B2", focus: "Past Simple + Past Perfect", color: "#D4836A",
    intro: "Kryminał w muzeum. Zwróć uwagę na kolejność zdarzeń.",
    segments: [
      "Detective Kowalski arrived at the museum at 9am. The curator ", { verb: "call", answer: "had called", hint: "Przed przybyciem → Past Perfect" },
      " him an hour earlier to report a theft. Someone ", { verb: "steal", answer: "had stolen", hint: "Kradzież PRZED przybyciem → Past Perfect" },
      " a priceless painting overnight. The detective ", { verb: "look", answer: "looked", hint: "Sekwencja → Past Simple" },
      " around carefully. A window ", { verb: "break", answer: "had been broken", hint: "Past Perfect Passive" },
      " from the outside. The guard who was on duty ", { verb: "not / notice", answer: "hadn't noticed", altAnswers: ["had not noticed"], hint: "Past Perfect" },
      " anything. Kowalski discovered that the alarm system ", { verb: "not / work", answer: "hadn't been working", altAnswers: ["had not been working"], hint: "Past Perfect Continuous Passive" },
      " for three days. By the end of the day, he ", { verb: "identify", answer: "had identified", hint: "Past Perfect — przed końcem dnia" }, " the main suspect.",
    ],
  },
  {
    id: "better-future", title: "Plany na przyszłość", emoji: "🌟", level: "B2", focus: "Future forms (will / going to / FC / FP)", color: "#5BAD6F",
    intro: "Marek rozmawia o swoich planach. Użyj właściwych form przyszłościowych.",
    segments: [
      "Marek has big plans for next year. He ", { verb: "travel", answer: "is going to travel", hint: "Konkretny plan (kupił bilet) → going to" },
      " to South America — he's already bought his ticket. \"I think it ", { verb: "be", answer: "will be", hint: "Opinia/przepowiednia → will" },
      " an amazing experience.\" He knows he ", { verb: "visit", answer: "is going to visit", hint: "Konkretny zamiar → going to" },
      " Machu Picchu. While travelling, he ", { verb: "work", answer: "will be working", hint: "Czynność trwająca w trakcie podróży → Future Continuous" },
      " remotely. \"By the time I come back,\" he says, \"I ", { verb: "save", answer: "will have saved", hint: "'by the time' + zakończone → Future Perfect" },
      " enough to buy a flat. And I ", { verb: "learn", answer: "will have been learning", hint: "Czas trwania + punkt → FPC" },
      " Spanish for over a year, so I hope my skills ", { verb: "improve", answer: "will have improved", hint: "Future Perfect" }, " a lot.\"",
    ],
  },
  {
    id: "renovation", title: "Remont teatru", emoji: "🔨", level: "B2", focus: "Passive Voice", color: "#5B8EE6",
    intro: "Artykuł o remoncie budynku historycznego. Uzupełnij formami biernymi.",
    segments: [
      "The old theatre in the town centre ", { verb: "renovate", answer: "is being renovated", hint: "Trwa teraz → Present Continuous Passive" },
      " at the moment. The building, which ", { verb: "build", answer: "was built", hint: "Przeszłość → Past Simple Passive" },
      " in 1887, ", { verb: "not / use", answer: "hasn't been used", altAnswers: ["has not been used"], hint: "Present Perfect Passive" },
      " for over a decade. The project ", { verb: "fund", answer: "is being funded", hint: "Present Continuous Passive" },
      " by the city council. A new roof ", { verb: "install", answer: "has already been installed", hint: "Present Perfect Passive + already" },
      " and the walls ", { verb: "repaint", answer: "are currently being repainted", hint: "Present Continuous Passive + currently" },
      ". The work ", { verb: "complete", answer: "will be completed", hint: "Future Passive" },
      " by next spring. Tickets for the opening night can ", { verb: "buy", answer: "be bought", hint: "Modal Passive: can be + V3" }, " online.",
    ],
  },
  {
    id: "job-review", title: "Przegląd roczny", emoji: "📋", level: "B2", focus: "Present Perfect + Present Perfect Continuous", color: "#E8945A",
    intro: "Anna omawia z szefem wyniki rocznego przeglądu.",
    segments: [
      "\"Anna, you ", { verb: "work", answer: "have been working", hint: "Czas trwania → PPC" },
      " here for two years now, and I must say, your performance ", { verb: "improve", answer: "has improved", hint: "Wynik = Present Perfect" },
      " significantly. You ", { verb: "complete", answer: "have completed", hint: "Present Perfect" },
      " every project on time, and you ", { verb: "take", answer: "have taken", hint: "Present Perfect" },
      " on extra responsibilities without being asked. I see you ", { verb: "also / study", answer: "have also been studying", hint: "PPC — czas trwania" },
      " for the management certification. How long ", { verb: "you / prepare", answer: "have you been preparing", hint: "PPC — pytanie o czas trwania" },
      " for it?\" \"I ", { verb: "study", answer: "have been studying", hint: "PPC — nadal trwa" },
      " since January. I ", { verb: "pass", answer: "have passed", hint: "Wynik = Present Perfect" }, " the first two modules already.\"",
    ],
  },
  {
    id: "the-expedition", title: "Ekspedycja polarna", emoji: "🏔️", level: "B2", focus: "Past Simple + Past Perfect + Past Continuous", color: "#60B8C0",
    intro: "Dziennik z wyprawy. Używaj właściwych form.",
    segments: [
      "Day 14. By the time we ", { verb: "reach", answer: "reached", hint: "Past Simple" },
      " base camp, we ", { verb: "walk", answer: "had been walking", hint: "Czas trwania przed dotarciem → PPC" },
      " for eleven hours. The wind ", { verb: "howl", answer: "was howling", hint: "Past Continuous — tło" },
      " when we finally ", { verb: "set up", answer: "set up", hint: "set up → set up" },
      " our tents. We ", { verb: "not / eat", answer: "hadn't eaten", altAnswers: ["had not eaten"], hint: "Past Perfect — przed obozem" },
      " since morning, so we ", { verb: "melt", answer: "melted", hint: "Past Simple" },
      " snow for water and ", { verb: "cook", answer: "cooked", hint: "Past Simple" },
      " a simple meal. While we ", { verb: "eat", answer: "were eating", hint: "Past Continuous" },
      ", someone ", { verb: "notice", answer: "noticed", hint: "Past Simple" },
      " that two team members ", { verb: "not / return", answer: "hadn't returned", altAnswers: ["had not returned"], hint: "Past Perfect" }, " yet. We were worried.",
    ],
  },
  {
    id: "career-change", title: "Zmiana kariery", emoji: "🔄", level: "B2", focus: "Mixed tenses", color: "#CF87D6",
    intro: "Wywiad z osobą, która zmieniła karierę. Uzupełnij tekst.",
    segments: [
      "\"I ", { verb: "work", answer: "had been working", hint: "Czas trwania PRZED decyzją → PPC" },
      " as an accountant for fifteen years when I finally ", { verb: "decide", answer: "decided", hint: "Past Simple" },
      " to change. I ", { verb: "always / want", answer: "had always wanted", hint: "Past Perfect — marzenie z przeszłości" },
      " to be a chef, but I ", { verb: "never / pursue", answer: "had never pursued", hint: "Past Perfect" },
      " it seriously. So I ", { verb: "quit", answer: "quit", hint: "quit → quit" },
      " my job, enrolled in culinary school, and within a year I ",
      { verb: "open", answer: "had opened", hint: "Past Perfect — przed rozmową" },
      " my first restaurant. Now I ", { verb: "run", answer: "run", hint: "Present Simple" },
      " three restaurants and I ", { verb: "never / look", answer: "have never looked", hint: "Present Perfect + never" }, " back.\"",
    ],
  },
  {
    id: "the-reunion", title: "Spotkanie po latach", emoji: "🤝", level: "B2", focus: "Past Perfect + Past Simple + Used to", color: "#9B6EBF",
    intro: "Opis spotkania z dawnym przyjacielem.",
    segments: [
      "Last week I bumped into Mark, an old friend I ", { verb: "not / see", answer: "hadn't seen", altAnswers: ["had not seen"], hint: "Past Perfect — nie widziałem przed spotkaniem" },
      " for over ten years. We ", { verb: "use to / spend", answer: "used to spend", hint: "Dawny nawyk → used to" },
      " every weekend together when we were students. We ", { verb: "would / cycle", answer: "would cycle", hint: "Dawny nawyk → would" },
      " to the lake and ", { verb: "would / stay", answer: "would stay", hint: "would" },
      " there until dark. I barely recognised him — he ", { verb: "change", answer: "had changed", hint: "Past Perfect — zmiana PRZED spotkaniem" },
      " so much. He ", { verb: "grow", answer: "had grown", hint: "Past Perfect" },
      " a beard and ", { verb: "put on", answer: "had put on", hint: "Past Perfect" },
      " some weight. We ", { verb: "sit", answer: "sat", hint: "Past Simple" },
      " in a café and talked for hours. It ", { verb: "feel", answer: "felt", hint: "Past Simple" }, " like no time had passed.",
    ],
  },
  {
    id: "news-report", title: "Relacja z wypadku", emoji: "📰", level: "B2", focus: "Passive Voice (mixed tenses)", color: "#E06B5C",
    intro: "Fragment artykułu prasowego. Uzupełnij formami biernymi.",
    segments: [
      "A fire ", { verb: "report", answer: "was reported", hint: "Past Simple Passive" },
      " in the city centre early this morning. Three buildings ", { verb: "damage", answer: "were damaged", hint: "Past Simple Passive l. mn." },
      " and two people ", { verb: "take", answer: "were taken", hint: "Past Simple Passive" },
      " to hospital. The fire ", { verb: "believe", answer: "is believed", hint: "Present Simple Passive" },
      " to have started in a kitchen. Firefighters ", { verb: "call", answer: "were called", hint: "Past Simple Passive" },
      " at 3am and the blaze ", { verb: "bring under control", answer: "had been brought under control", hint: "Past Perfect Passive" },
      " by 5am. Residents ", { verb: "advise", answer: "have been advised", hint: "Present Perfect Passive" },
      " to avoid the area. An investigation ", { verb: "launch", answer: "has been launched", hint: "Present Perfect Passive" },
      " and the cause of the fire ", { verb: "determine", answer: "will be determined", hint: "Future Passive" }, " soon.",
    ],
  },
  {
    id: "the-heist", title: "Skok na bank", emoji: "🏦", level: "B2", focus: "Past Simple + Past Perfect", color: "#8080D0",
    intro: "Kryminał. Uzupełnij tekst, dbając o kolejność zdarzeń.",
    segments: [
      "The robbery ", { verb: "begin", answer: "began", hint: "Past Simple" },
      " at 9am on a Tuesday. By that time, the gang ", { verb: "plan", answer: "had been planning", hint: "Czas trwania przed napadem → PPC" },
      " the heist for six months. They ", { verb: "study", answer: "had studied", hint: "Past Perfect" },
      " the bank's security system and ", { verb: "identify", answer: "had identified", hint: "Past Perfect" },
      " every weakness. When they ", { verb: "enter", answer: "entered", hint: "Past Simple" },
      " the building, two of them ", { verb: "wear", answer: "were wearing", hint: "Past Continuous" },
      " security uniforms, which they ", { verb: "steal", answer: "had stolen", hint: "Past Perfect — przed wejściem" },
      " the night before. The alarm, which ", { verb: "disable", answer: "had been disabled", hint: "Past Perfect Passive" },
      " earlier, ", { verb: "not / ring", answer: "didn't ring", altAnswers: ["did not ring"], hint: "Past Simple" },
      ". The whole operation ", { verb: "take", answer: "took", hint: "Past Simple" }, " less than fifteen minutes.",
    ],
  },
  {
    id: "mystery-letter", title: "Tajemniczy list", emoji: "📬", level: "B2", focus: "Past Perfect + Past Simple", color: "#9B6EBF",
    intro: "Kobieta otrzymuje tajemniczy list. Uzupełnij.",
    segments: [
      "The letter ", { verb: "arrive", answer: "arrived", hint: "Past Simple" },
      " on a Wednesday morning. Sarah ", { verb: "not / recognise", answer: "didn't recognise", hint: "Past Simple przecząca" },
      " the handwriting. She opened it with trembling hands. Inside was a photograph of a house she ",
      { verb: "never / see", answer: "had never seen", hint: "Past Perfect — nigdy wcześniej" },
      " before, but somehow it ", { verb: "feel", answer: "felt", hint: "Past Simple" },
      " familiar. The letter explained that someone ", { verb: "leave", answer: "had left", hint: "Past Perfect" },
      " the house to her in their will. She ", { verb: "not / know", answer: "hadn't known", altAnswers: ["had not known"], hint: "Past Perfect" },
      " she had a great-uncle. He ", { verb: "live", answer: "had been living", hint: "PPC — przez jakiś czas" },
      " alone in that house for forty years. She later found out that he ", { verb: "search", answer: "had been searching", hint: "PPC" }, " for her her entire life.",
    ],
  },
  {
    id: "digital-detox", title: "Detoks cyfrowy", emoji: "📵", level: "B2", focus: "Mixed tenses", color: "#4DAFAA",
    intro: "Blog o tygodniu bez smartfona.",
    segments: [
      "By the time I ", { verb: "decide", answer: "decided", hint: "Past Simple" },
      " to go phone-free for a week, I ", { verb: "spend", answer: "had been spending", hint: "PPC" },
      " an average of seven hours a day on my phone. On day one, I ", { verb: "reach", answer: "was constantly reaching", hint: "Past Continuous" },
      " for a device that ", { verb: "not / be", answer: "wasn't", altAnswers: ["was not"], hint: "Past Simple" },
      " there. By the end of day three, however, I ", { verb: "notice", answer: "had noticed", hint: "Past Perfect" },
      " something remarkable: I ", { verb: "read", answer: "had read", hint: "Past Perfect" },
      " two entire books. Now, a month later, my relationship with technology ", { verb: "change", answer: "has changed", hint: "Present Perfect" },
      " completely. I ", { verb: "set", answer: "have set", hint: "Present Perfect" },
      " limits on my screen time and I ", { verb: "feel", answer: "have been feeling", hint: "PPC" }, " much better ever since.",
    ],
  },
  {
    id: "science-lab", title: "W laboratorium", emoji: "🔬", level: "C1", focus: "Mixed tenses + Passive", color: "#C07090",
    intro: "Raport naukowy. Użyj właściwych czasów.",
    segments: [
      "Dr Nowak's team ", { verb: "research", answer: "has been researching", hint: "Badania trwają od jakiegoś czasu → PPC" },
      " a new vaccine for three years. By the time clinical trials begin, the team ",
      { verb: "conduct", answer: "will have been conducting", hint: "Do tego momentu + czas trwania → FPC" },
      " laboratory tests for four years. The compound ", { verb: "synthesise", answer: "was first synthesised", hint: "Past Simple Passive" },
      " in 2021 after the team ", { verb: "study", answer: "had been studying", hint: "PPC — przed syntezą" },
      " similar molecules for months. So far, all results ", { verb: "verify", answer: "have been verified", hint: "Present Perfect Passive" },
      " by independent labs, and no side effects ", { verb: "report", answer: "have been reported", hint: "Present Perfect Passive" },
      ". If the trials go well, the vaccine ", { verb: "approve", answer: "will be approved", hint: "Future Passive" }, " within two years.",
    ],
  },
  {
    id: "corporate-drama", title: "Dramat korporacyjny", emoji: "🏢", level: "C1", focus: "Past Perfect + Past Perfect Continuous + Passive", color: "#D4836A",
    intro: "Fragment thrillera korporacyjnego.",
    segments: [
      "By the time the board meeting started, the CEO ", { verb: "receive", answer: "had already received", hint: "Past Perfect" },
      " three anonymous emails. Someone ", { verb: "leak", answer: "had been leaking", hint: "PPC — czynność ciągła przed spotkaniem" },
      " confidential information for months. Documents ", { verb: "copy", answer: "had been copied", hint: "Past Perfect Passive" },
      " and sent to a competitor. The CFO, who ", { verb: "suspect", answer: "had been suspected", hint: "Past Perfect Passive" },
      " for weeks, looked pale. She ", { verb: "not / sleep", answer: "hadn't been sleeping", altAnswers: ["had not been sleeping"], hint: "PPC" },
      " well, and it showed. Evidence ", { verb: "gather", answer: "had been gathering", hint: "PPC Passive" },
      " since January and by that Tuesday, enough proof ", { verb: "compile", answer: "had been compiled", hint: "Past Perfect Passive" }, " to confront her.",
    ],
  },
  {
    id: "the-philosopher", title: "Filozoficzne rozważania", emoji: "🤔", level: "C1", focus: "Future Perfect + Future Continuous + FPC", color: "#8080D0",
    intro: "Esej filozoficzny o przyszłości. Użyj zaawansowanych form przyszłościowych.",
    segments: [
      "In fifty years, humanity ", { verb: "face", answer: "will be facing", hint: "W tym momencie czynność TRWA → FC" },
      " challenges we can barely imagine today. By 2074, the global population ", { verb: "reach", answer: "will have reached", hint: "Future Perfect" },
      " ten billion. Scientists ", { verb: "work", answer: "will have been working", hint: "FPC — długi czas trwania do punktu" },
      " on climate solutions for decades. Whether those solutions ", { verb: "succeed", answer: "will have succeeded", hint: "Future Perfect" },
      " is the question that keeps philosophers awake. At that point, several generations ", { verb: "grow up", answer: "will have grown up", hint: "Future Perfect" },
      " in a world shaped by artificial intelligence. We ", { verb: "live", answer: "will have been living", hint: "FPC — czas trwania" }, " alongside machines for so long that the distinction between human and artificial may blur.",
    ],
  },
  {
    id: "whistle-blower", title: "Sygnalista", emoji: "🔔", level: "C1", focus: "Mixed tenses (all)", color: "#B060A0",
    intro: "Historia sygnalisty. Używaj mieszanych form.",
    segments: [
      "Elena ", { verb: "work", answer: "had been working", hint: "Długi czas PRZED decyzją → PPC" },
      " at the pharmaceutical company for seven years when she ", { verb: "discover", answer: "discovered", hint: "Past Simple" },
      " the fraud. By that point, the company ", { verb: "falsify", answer: "had been falsifying", hint: "PPC Passive" },
      " clinical data for at least two years. She ", { verb: "not / know", answer: "had not known", altAnswers: ["hadn't known"], hint: "Past Perfect" },
      " what to do. She ", { verb: "keep", answer: "had been keeping", hint: "PPC" },
      " quiet for three weeks, but the guilt ", { verb: "eat", answer: "was eating", hint: "Past Continuous" },
      " away at her. Finally she ", { verb: "contact", answer: "contacted", hint: "Past Simple" },
      " a journalist. By the time the story ", { verb: "publish", answer: "was published", hint: "Past Simple Passive" },
      ", Elena ", { verb: "already / lose", answer: "had already lost", hint: "Past Perfect" },
      " her job. Now the case ", { verb: "investigate", answer: "is being investigated", hint: "Present Continuous Passive" },
      " and three executives ", { verb: "arrest", answer: "have been arrested", hint: "Present Perfect Passive" }, ".",
    ],
  },
  {
    id: "ai-future", title: "Przyszłość sztucznej inteligencji", emoji: "🤖", level: "C1", focus: "Future forms + Passive", color: "#5B8EE6",
    intro: "Artykuł o przyszłości AI. Użyj zaawansowanych form.",
    segments: [
      "Artificial intelligence ", { verb: "transform", answer: "has been transforming", hint: "Trwająca zmiana do teraz → PPC" },
      " the workplace for the past decade. By 2035, it ", { verb: "estimate", answer: "is estimated", hint: "Present Simple Passive" },
      " that 40% of current jobs ", { verb: "automate", answer: "will have been automated", hint: "Future Perfect Passive" },
      ". While this ", { verb: "happen", answer: "is happening", hint: "Present Continuous — trwający proces" },
      ", new roles ", { verb: "create", answer: "will be being created", altAnswers: ["will be created"], hint: "Future Passive" },
      " that we cannot yet imagine. Humans and machines ", { verb: "collaborate", answer: "will have been collaborating", hint: "FPC" },
      " for so long by then that resistance will seem futile. The question is not whether AI ", { verb: "integrate", answer: "will be integrated", hint: "Future Passive" },
      " into society, but how it ", { verb: "govern", answer: "will be governed", hint: "Future Passive" }, ".",
    ],
  },
  {
    id: "unreliable-narrator", title: "Zawodny narrator", emoji: "📚", level: "C1", focus: "Past Perfect + PPC + Mixed", color: "#C07090",
    intro: "Fragment powieści psychologicznej. Narrator odkrywa że jego wspomnienia są niepewne.",
    segments: [
      "I ", { verb: "always / believe", answer: "had always believed", hint: "Past Perfect — wcześniejsze przekonanie" },
      " that I ", { verb: "spend", answer: "had spent", hint: "Past Perfect" },
      " my childhood happily, but that evening — going through old photographs — I ",
      { verb: "begin", answer: "began", hint: "Past Simple" }, " to question everything. Someone ",
      { verb: "tear", answer: "had torn", hint: "Past Perfect — przed wieczorem" },
      " out pages from the family album. Why? What ", { verb: "hide", answer: "had been hidden", hint: "PPC Passive — przez jakiś czas" },
      " from me? My mother, who ", { verb: "sit", answer: "was sitting", hint: "Past Continuous" },
      " across the room, ", { verb: "pretend", answer: "had been pretending", hint: "PPC — przez całe życie" },
      " all this time. I ", { verb: "realise", answer: "realised", hint: "Past Simple" }, " then that the story I ", { verb: "tell", answer: "had been told", hint: "PPC Passive" }, " was fiction.",
    ],
  },
  {
    id: "startup-story", title: "Historia startupu", emoji: "🚀", level: "C1", focus: "Perfect tenses (all)", color: "#5BAD6F",
    intro: "Wywiad z założycielką startupu.",
    segments: [
      "\"By the time we launched the app, we ", { verb: "work", answer: "had been working", hint: "PPC — przed launkiem" },
      " on it for two years. We ", { verb: "reject", answer: "had been rejected", hint: "PPC Passive" },
      " by twelve investors before we finally found funding. I ", { verb: "almost / give up", answer: "had almost given up", hint: "Past Perfect" },
      " twice. Now, three years on, we ", { verb: "grow", answer: "have grown", hint: "Present Perfect" },
      " to a team of 80, and our app ", { verb: "download", answer: "has been downloaded", hint: "Present Perfect Passive" },
      " two million times. By this time next year we ", { verb: "expand", answer: "will have expanded", hint: "Future Perfect" },
      " into three new markets, and we ", { verb: "operate", answer: "will have been operating", hint: "FPC" },
      " for six years. The journey ", { verb: "not / be", answer: "hasn't been", hint: "Present Perfect" }, " easy, but it ", { verb: "be", answer: "has been", hint: "Present Perfect" }, " worth it.\"",
    ],
  },
];

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────
const flashcardDecks = [
  { id: "structures", name: "Struktury gramatyczne", emoji: "🏗️", color: "#5B8EE6", desc: "Wzory budowy każdego czasu — twierdzący, przeczący, pytający" },
  { id: "signals",   name: "Słowa-klucze",          emoji: "🔑", color: "#E8B84B", desc: "Signal words — po jakim słowie poznasz dany czas" },
  { id: "examples",  name: "Przykłady w kontekście", emoji: "💬", color: "#4DAFAA", desc: "Jedno zdanie po polsku — jak to brzmi po angielsku?" },
  { id: "passive",   name: "Strona bierna",          emoji: "🔵", color: "#7C9EBF", desc: "Struktury i przykłady strony biernej we wszystkich czasach" },
  { id: "compare",   name: "Mylące pary",            emoji: "⚡", color: "#CF87D6", desc: "Kiedy użyć jednego, a kiedy drugiego?" },
];

const allFlashcards = [
  // ── STRUCTURES ──
  { id: "fc-s-01", deckId: "structures", level: "A2", tenseId: "present-simple",
    front: "Present Simple\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  I/you/we/they + V (base)\n✅  he/she/it + V-s/es\n❌  I/you/we/they + don't + V\n❌  he/she/it + doesn't + V\n❓  Do + I/you/we/they + V?\n❓  Does + he/she/it + V?", examples: ["She works every day.", "He doesn't eat meat.", "Do they live here?"], tip: "Uwaga: 3. os. l. poj. → +s/es tylko w twierdzącym! W przeczącym i pytającym: doesn't/does + bezokolicznik bez -s." } },
  { id: "fc-s-02", deckId: "structures", level: "A2", tenseId: "past-simple",
    front: "Past Simple\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + V2 (past form)\n❌  Subject + didn't + V (base)\n❓  Did + subject + V (base)?", examples: ["She worked yesterday.", "He didn't go to school.", "Did you see that film?"], tip: "Po 'didn't' i 'did' zawsze bezokolicznik, NIE forma przeszła. ❌ didn't went → ✅ didn't go" } },
  { id: "fc-s-03", deckId: "structures", level: "A2", tenseId: "future-will",
    front: "Future Simple (will)\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + will + V (base)\n❌  Subject + won't + V (base)\n❓  Will + subject + V (base)?", examples: ["I will call you tomorrow.", "She won't be late.", "Will you help me?"], tip: "Po 'will' NIGDY nie ma 'to'. ❌ I will to go → ✅ I will go" } },
  { id: "fc-s-04", deckId: "structures", level: "A2", tenseId: "future-going-to",
    front: "Future (going to)\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + am/is/are + going to + V\n❌  Subject + am/is/are + not + going to + V\n❓  Am/Is/Are + subject + going to + V?", examples: ["I'm going to study tonight.", "He isn't going to come.", "Are you going to apply?"], tip: "Skrót: I'm going to, she's going to, they're going to. NIE: 'I am go to'." } },
  { id: "fc-s-05", deckId: "structures", level: "B1", tenseId: "present-continuous",
    front: "Present Continuous\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + am/is/are + V-ing\n❌  Subject + am/is/are + not + V-ing\n❓  Am/Is/Are + subject + V-ing?", examples: ["I am reading right now.", "He isn't listening.", "Are you coming?"], tip: "Czasowniki stanowe NIGDY z -ing: know, love, want, need, hate, believe, understand, own." } },
  { id: "fc-s-06", deckId: "structures", level: "B1", tenseId: "present-perfect",
    front: "Present Perfect\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + have/has + V3\n❌  Subject + haven't/hasn't + V3\n❓  Have/Has + subject + V3?", examples: ["I have visited Paris.", "She hasn't called yet.", "Have you ever tried sushi?"], tip: "V3 = past participle: go→gone, eat→eaten, write→written, see→seen." } },
  { id: "fc-s-07", deckId: "structures", level: "B1", tenseId: "past-continuous",
    front: "Past Continuous\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + was/were + V-ing\n❌  Subject + wasn't/weren't + V-ing\n❓  Was/Were + subject + V-ing?", examples: ["She was sleeping when I called.", "They weren't watching TV.", "What were you doing?"], tip: "I/he/she/it → was. You/we/they → were. ❌ They was → ✅ They were." } },
  { id: "fc-s-08", deckId: "structures", level: "B1", tenseId: "used-to",
    front: "Used to / Would\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + used to + V (base)\n✅  Subject + would + V (base)  [tylko nawyki]\n❌  Subject + didn't use to + V\n❓  Did + subject + use to + V?", examples: ["I used to smoke.", "We would walk to school.", "Did you use to live here?"], tip: "'Would' tylko dla nawyków, NIE dla stanów. ❌ I would live there (stan) → ✅ I used to live there." } },
  { id: "fc-s-09", deckId: "structures", level: "B2", tenseId: "present-perfect-continuous",
    front: "Present Perfect Continuous\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + have/has + been + V-ing\n❌  Subject + haven't/hasn't + been + V-ing\n❓  Have/Has + subject + been + V-ing?", examples: ["I have been working for 3 hours.", "She hasn't been sleeping well.", "How long have you been waiting?"], tip: "Czasowniki stanowe NIE tworzą PPC! ❌ I have been knowing → ✅ I have known." } },
  { id: "fc-s-10", deckId: "structures", level: "B2", tenseId: "past-perfect",
    front: "Past Perfect\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + had + V3\n❌  Subject + hadn't + V3\n❓  Had + subject + V3?", examples: ["She had already eaten.", "He hadn't seen the film.", "Had you finished by then?"], tip: "had = dla wszystkich osób (I had, she had, they had). Nie ma wyjątków." } },
  { id: "fc-s-11", deckId: "structures", level: "B2", tenseId: "future-continuous",
    front: "Future Continuous\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + will be + V-ing\n❌  Subject + won't be + V-ing\n❓  Will + subject + be + V-ing?", examples: ["I will be working at 8pm.", "She won't be joining us.", "Will you be using the car?"], tip: "Świetne do grzecznych pytań o plany: 'Will you be needing the desk?' zamiast 'Do you need?'" } },
  { id: "fc-s-12", deckId: "structures", level: "C1", tenseId: "past-perfect-continuous",
    front: "Past Perfect Continuous\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + had been + V-ing\n❌  Subject + hadn't been + V-ing\n❓  Had + subject + been + V-ing?", examples: ["She had been crying — her eyes were red.", "He hadn't been sleeping well.", "How long had you been waiting?"], tip: "= Past Continuous + cofnięcie w czasie. Ciągła czynność PRZED innym zdarzeniem w przeszłości." } },
  { id: "fc-s-13", deckId: "structures", level: "C1", tenseId: "future-perfect",
    front: "Future Perfect\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + will have + V3\n❌  Subject + won't have + V3\n❓  Will + subject + have + V3?", examples: ["I will have finished by 6pm.", "She won't have arrived yet.", "Will you have left by then?"], tip: "Słowo-klucz: 'by' (= do). 'By 6pm' → co skończy się przed 18:00 → Future Perfect." } },
  { id: "fc-s-14", deckId: "structures", level: "C1", tenseId: "future-perfect-continuous",
    front: "Future Perfect Continuous\nJak zbudować zdanie twierdzące, przeczące i pytające?",
    back: { structure: "✅  Subject + will have been + V-ing\n❌  Subject + won't have been + V-ing\n❓  Will + subject + have been + V-ing?", examples: ["By July, I will have been working here for 10 years.", "She will have been studying for 6 hours."], tip: "Typowa struktura: By [moment w przyszłości], I will have been [czynność] for [jak długo]." } },

  // ── SIGNAL WORDS ──
  { id: "fc-w-01", deckId: "signals", level: "A2", tenseId: "present-simple",
    front: "Present Simple\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "always · usually · often · sometimes · rarely · never\nevery day/week/morning · on Mondays\nin general · as a rule", examples: ["She always drinks coffee in the morning.", "He never eats fish.", "The bank opens at 9 every day."], tip: "Fakty naukowe i stałe prawdy też są Present Simple, nawet bez signal words." } },
  { id: "fc-w-02", deckId: "signals", level: "A2", tenseId: "past-simple",
    front: "Past Simple\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "yesterday · last week/month/year\nago (two days ago, a year ago)\nin 2010 · when I was young · once", examples: ["I saw him yesterday.", "She left two hours ago.", "He was born in 1990."], tip: "Konkretny punkt w przeszłości = Past Simple. Też dla osób nieżyjących: Shakespeare wrote…" } },
  { id: "fc-w-03", deckId: "signals", level: "A2", tenseId: "future-will",
    front: "Future Simple (will)\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "tomorrow · soon · next week/year\nprobably · I think · I'm sure\nI promise · I hope · maybe · perhaps", examples: ["I'll probably be late.", "I think it will rain.", "I promise I'll call you."], tip: "WILL = decyzja podjęta W MOMENCIE MÓWIENIA. Jeśli już wcześniej zdecydowałeś → going to." } },
  { id: "fc-w-04", deckId: "signals", level: "A2", tenseId: "future-going-to",
    front: "Future (going to)\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "tonight · this evening · next week/month\nI plan to · I intend to · I've decided to\n[+ widoczny dowód: Look! / Watch out!]", examples: ["I'm going to study tonight.", "Look — it's going to rain!", "She's going to have a baby."], tip: "Widoczny dowód przed oczami → GOING TO, nie will." } },
  { id: "fc-w-05", deckId: "signals", level: "B1", tenseId: "present-continuous",
    front: "Present Continuous\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "now · right now · at the moment · currently\ntoday · this week/month · Look! · Listen!\nstill (= nadal)", examples: ["Look, it's snowing!", "I'm still waiting for him.", "She's working from home this month."], tip: "Present Continuous też dla planów w bliskiej przyszłości: 'I'm meeting John tomorrow.'" } },
  { id: "fc-w-06", deckId: "signals", level: "B1", tenseId: "present-perfect",
    front: "Present Perfect\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "ever · never · already · just · yet · recently\nfor (+ okres) · since (+ punkt)\nso far · up to now · lately · before", examples: ["Have you ever been to Japan?", "I've just finished.", "She hasn't called yet.", "I've known him for years."], tip: "for = przez (jak długo). since = od (kiedy). for two years vs since 2022." } },
  { id: "fc-w-07", deckId: "signals", level: "B1", tenseId: "past-continuous",
    front: "Past Continuous\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "while · when (czynność trwająca)\nall day/night · all morning\nat [godzina] yesterday · at that moment", examples: ["While I was cooking, he called.", "At 8pm I was watching TV.", "She was working all night."], tip: "'When' + Past Simple = chwilowe zdarzenie. 'While' + Past Continuous = trwające tło." } },
  { id: "fc-w-08", deckId: "signals", level: "B2", tenseId: "present-perfect-continuous",
    front: "Present Perfect Continuous\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "for (+ okres) · since (+ punkt)\nhow long · all day/morning/week\nlately · recently · [+ widoczny skutek teraz]", examples: ["How long have you been waiting?", "I've been working all day — I'm exhausted.", "She's been crying; her eyes are red."], tip: "Widoczne ślady: brudne ręce, czerwone oczy → PPC. 'You've been running!'" } },
  { id: "fc-w-09", deckId: "signals", level: "B2", tenseId: "past-perfect",
    front: "Past Perfect\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "by the time · before · after · when\nalready · just · never (before)\nby [czas w przeszłości]", examples: ["By the time I arrived, she had left.", "I had never seen snow before.", "After she had eaten, she went to bed."], tip: "Dwa zdarzenia w przeszłości: to wcześniejsze → Past Perfect." } },
  { id: "fc-w-10", deckId: "signals", level: "B2", tenseId: "future-continuous",
    front: "Future Continuous\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "at this time tomorrow · this time next week\nat [godzina] tomorrow\nwhen you arrive/call (future context)", examples: ["At noon tomorrow I'll be travelling.", "This time next week she'll be lying on the beach.", "Don't call — I'll be sleeping."], tip: "Też do grzecznych pytań o plany: 'Will you be using the car tonight?'" } },
  { id: "fc-w-11", deckId: "signals", level: "C1", tenseId: "future-perfect",
    front: "Future Perfect\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "by [czas] · by then · by the time…\nbefore [czas przyszły] · by next year", examples: ["By 6pm I will have finished.", "By the time she arrives, we'll have eaten.", "By 2030 he'll have lived here for 20 years."], tip: "Słowo-klucz: 'by'. Bez 'by' → raczej Future Simple." } },
  { id: "fc-w-12", deckId: "signals", level: "C1", tenseId: "past-perfect-continuous",
    front: "Past Perfect Continuous\nJakie słowa-klucze wskazują na ten czas?",
    back: { structure: "for [okres] before/when…\nhow long had… been…\nsince [punkt] when [przeszłość]\n[+ widoczny skutek w przeszłości]", examples: ["He had been waiting for an hour when she arrived.", "She was tired because she had been working all night.", "His hands were dirty — he had been gardening."], tip: "= Past Perfect + ciągłość. Skutek widoczny W PRZESZŁOŚCI i czynność trwała wcześniej → PPC." } },

  // ── EXAMPLES ──
  { id: "fc-e-01", deckId: "examples", level: "A2", tenseId: "present-simple",
    front: `Przetłumacz:\n'On zawsze pije kawę rano.'`,
    back: { structure: "Present Simple — nawyk, 3. os. l. poj.", examples: ["He always drinks coffee in the morning."], tip: "drink → drinks (+s). 'always' to signal word Present Simple." } },
  { id: "fc-e-02", deckId: "examples", level: "A2", tenseId: "past-simple",
    front: `Przetłumacz:\n'Wczoraj nie wyszłam z domu.'`,
    back: { structure: "Past Simple — forma przecząca", examples: ["I didn't go out yesterday."], tip: "didn't + go (bezokolicznik, nie went). 'yesterday' → Past Simple." } },
  { id: "fc-e-03", deckId: "examples", level: "A2", tenseId: "future-will",
    front: `Przetłumacz:\n'Nie martw się, pomogę ci.'`,
    back: { structure: "Future Simple (will) — spontaniczna oferta", examples: ["Don't worry, I'll help you."], tip: "Decyzja podjęta w tej chwili → will (nie going to)." } },
  { id: "fc-e-04", deckId: "examples", level: "A2", tenseId: "future-going-to",
    front: `Przetłumacz:\n'Patrzcie, on zaraz spadnie!'`,
    back: { structure: "Future (going to) — przewidywanie z dowodem", examples: ["Look, he's going to fall!"], tip: "Widzisz, że zaraz się stanie → going to. Nie will." } },
  { id: "fc-e-05", deckId: "examples", level: "B1", tenseId: "present-continuous",
    front: `Przetłumacz:\n'Przepraszam, właśnie teraz jestem na spotkaniu.'`,
    back: { structure: "Present Continuous — czynność trwająca teraz", examples: ["Sorry, I'm in a meeting right now."], tip: "'right now' = teraz → Present Continuous." } },
  { id: "fc-e-06", deckId: "examples", level: "B1", tenseId: "present-perfect",
    front: `Przetłumacz:\n'Ona właśnie skończyła projekt.'`,
    back: { structure: "Present Perfect — 'just' + wynik teraz", examples: ["She has just finished the project."], tip: "'właśnie' = just → Present Perfect. has (3. os. l. poj.)." } },
  { id: "fc-e-07", deckId: "examples", level: "B1", tenseId: "past-continuous",
    front: `Przetłumacz:\n'Czytałem, gdy zadzwonił telefon.'`,
    back: { structure: "Past Continuous + Past Simple", examples: ["I was reading when the phone rang."], tip: "was reading = czynność trwająca (tło). rang = przerywające zdarzenie." } },
  { id: "fc-e-08", deckId: "examples", level: "B1", tenseId: "used-to",
    front: `Przetłumacz:\n'Kiedyś mieszkałam w Poznaniu, ale teraz jestem w Warszawie.'`,
    back: { structure: "Used to — dawny stan, który już nie istnieje", examples: ["I used to live in Poznań, but now I'm in Warsaw."], tip: "Stan (live) → used to, NIE would." } },
  { id: "fc-e-09", deckId: "examples", level: "B2", tenseId: "present-perfect-continuous",
    front: `Przetłumacz:\n'Uczę się angielskiego od trzech lat.'`,
    back: { structure: "Present Perfect Continuous — czas trwania do teraz", examples: ["I have been learning English for three years."], tip: "od trzech lat = for three years. Czynność ciągle trwa → PPC." } },
  { id: "fc-e-10", deckId: "examples", level: "B2", tenseId: "past-perfect",
    front: `Przetłumacz:\n'Kiedy przyszłam, on już wyszedł.'`,
    back: { structure: "Past Perfect — wyjście PRZED moim przyjściem", examples: ["When I arrived, he had already left."], tip: "Dwie czynności w przeszłości: 'when I arrived' (PS) + 'he had left' (PP) — PP = wcześniej." } },
  { id: "fc-e-11", deckId: "examples", level: "B2", tenseId: "future-continuous",
    front: `Przetłumacz:\n'O tej porze jutro będę siedzieć na plaży.'`,
    back: { structure: "Future Continuous — czynność trwająca w momencie w przyszłości", examples: ["This time tomorrow I'll be sitting on the beach."], tip: "'o tej porze jutro' = this time tomorrow → Future Continuous." } },
  { id: "fc-e-12", deckId: "examples", level: "C1", tenseId: "past-perfect-continuous",
    front: `Przetłumacz:\n'Była zmęczona, bo całą noc pracowała.'`,
    back: { structure: "Past Perfect Continuous — przyczyna widoczna w przeszłości", examples: ["She was tired because she had been working all night."], tip: "Zmęczenie (skutek w przeszłości) + ciągła czynność wcześniej → PPC." } },
  { id: "fc-e-13", deckId: "examples", level: "C1", tenseId: "future-perfect",
    front: `Przetłumacz:\n'Do piątku skończę ten raport.'`,
    back: { structure: "Future Perfect — zakończone przed punktem w przyszłości", examples: ["I will have finished this report by Friday."], tip: "'do piątku' = by Friday. Wynik przed tym momentem → Future Perfect." } },
  { id: "fc-e-14", deckId: "examples", level: "C1", tenseId: "future-perfect-continuous",
    front: `Przetłumacz:\n'W lipcu będę pracował w tej firmie od dekady.'`,
    back: { structure: "Future Perfect Continuous — czas trwania do przyszłego punktu", examples: ["By July, I will have been working at this company for a decade."], tip: "By July (punkt) + for a decade (czas trwania) → FPC." } },

  // ── PASSIVE ──
  { id: "fc-p-01", deckId: "passive", level: "B1",
    front: "Passive Voice — ogólna zasada\nJak zmienić zdanie czynne na bierne?",
    back: { structure: "Active:  Subject + verb + object\nPassive: Object + be (odpowiednia forma) + V3 + (by + agent)", examples: ["Active: They built this bridge in 1900.", "Passive: This bridge was built in 1900."], tip: "Sprawcę (by agent) pomijamy gdy jest nieznany, oczywisty lub nieważny." } },
  { id: "fc-p-02", deckId: "passive", level: "B1",
    front: "Passive — Present Simple\nStruktura i przykład.",
    back: { structure: "am/is/are + V3", examples: ["English is spoken worldwide.", "Cars are made in this factory.", "The report is written every month."], tip: "is/are zależy od podmiotu: 'The letter is sent.' vs 'Letters are sent.'" } },
  { id: "fc-p-03", deckId: "passive", level: "B1",
    front: "Passive — Past Simple\nStruktura i przykład.",
    back: { structure: "was/were + V3", examples: ["The Eiffel Tower was built in 1889.", "The windows were broken.", "I was told the news."], tip: "was (l. poj.) / were (l. mn.). ❌ The window were broken → ✅ was broken." } },
  { id: "fc-p-04", deckId: "passive", level: "B2",
    front: "Passive — Present Perfect\nStruktura i przykład.",
    back: { structure: "have/has been + V3", examples: ["The email has been sent.", "Several errors have been found.", "Has the package been delivered?"], tip: "Typowe w newsach: 'Three people have been arrested.' (nieznany sprawca)." } },
  { id: "fc-p-05", deckId: "passive", level: "B2",
    front: "Passive — Future (will)\nStruktura i przykład.",
    back: { structure: "will be + V3", examples: ["The results will be announced tomorrow.", "You will be informed by email.", "The bridge will be completed next year."], tip: "Typowe w ogłoszeniach i komunikatach formalnych." } },
  { id: "fc-p-06", deckId: "passive", level: "B2",
    front: "Passive — Modal Verbs\nStruktura i przykłady.",
    back: { structure: "modal + be + V3\n(can/could/must/should/may/might)", examples: ["This must be done immediately.", "Mistakes can be avoided.", "Applications should be submitted by Monday."], tip: "Zawsze: modal + BE (nie is/are/was) + V3. ❌ must is done → ✅ must be done." } },
  { id: "fc-p-07", deckId: "passive", level: "C1",
    front: "Passive — Past Perfect\nStruktura i przykład.",
    back: { structure: "had been + V3", examples: ["The letter had been written before she arrived.", "By morning, all evidence had been destroyed.", "He was tired — he had been given too much work."], tip: "= Past Perfect + strona bierna. Czynność bierna zakończona przed inną przeszłą czynnością." } },

  // ── COMPARE ──
  { id: "fc-c-01", deckId: "compare", level: "B1",
    front: "Past Simple vs Present Perfect\nKiedy użyć każdego z nich?",
    back: { structure: "Past Simple = konkretny czas (yesterday, in 2010, last year)\nPresent Perfect = bez konkretnego czasu; doświadczenie życiowe; skutek teraz", examples: ["I visited Paris in 2019. (PS — kiedy?)", "I have visited Paris. (PP — doświadczenie)", "She lost her keys → She has lost her keys — she can't get in."], tip: "Test: czy możesz dodać 'yesterday/last year'? → PS. Czy ważny jest wynik teraz? → PP." } },
  { id: "fc-c-02", deckId: "compare", level: "A2",
    front: "will vs going to\nKiedy użyć każdego z nich?",
    back: { structure: "will = spontaniczna decyzja w momencie mówienia; obietnica; opinia\ngoing to = już zaplanowane; zamiar z wyprzedzeniem; dowód przed oczami", examples: ["— There's no milk! — I'll buy some. (spontaniczna)", "I'm going to visit Rome. I bought the ticket. (plan)", "Look at those clouds — it's going to rain! (dowód)"], tip: "Słyszysz problem → will. Już wcześniej zdecydowałeś → going to." } },
  { id: "fc-c-03", deckId: "compare", level: "B2",
    front: "Present Perfect vs Present Perfect Continuous\nKiedy użyć każdego z nich?",
    back: { structure: "Present Perfect = wynik, efekt, ile razy (co zrobiłeś?)\nPPC = czas trwania, ciągłość widoczna teraz (jak długo?)", examples: ["I have read 3 chapters. (wynik — ile?)", "I have been reading all day. (czas trwania)", "She has written the report. vs She has been writing all morning."], tip: "How long? → PPC. How many/much? → PP." } },
  { id: "fc-c-04", deckId: "compare", level: "B1",
    front: "Past Simple vs Past Continuous\nKiedy użyć każdego z nich?",
    back: { structure: "Past Continuous = czynność trwająca w tle (was/were + -ing)\nPast Simple = chwilowe zdarzenie przerywające tło; sekwencja", examples: ["I was cooking (tło) when he called (przerwanie).", "She was walking when it started to rain.", "I cooked, ate and went to bed. (sekwencja)"], tip: "'While' + PC. 'When' + PS (przerwanie). Sekwencja zawsze PS, PS, PS." } },
  { id: "fc-c-05", deckId: "compare", level: "B1",
    front: "used to vs Past Simple\nKiedy użyć każdego z nich?",
    back: { structure: "used to = powtarzający się nawyk/stan w przeszłości, który już nie istnieje\nPast Simple = jednorazowe lub konkretne zdarzenie", examples: ["I used to play tennis every week. (nawyk — już nie gram)", "I played tennis last Saturday. (jednorazowe)", "She used to be shy. (dawny stan)"], tip: "'Used to' sugeruje kontrast z teraźniejszością. Dla jednorazowych → PS." } },
  { id: "fc-c-06", deckId: "compare", level: "C1",
    front: "Future Perfect vs Future Continuous\nKiedy użyć każdego z nich?",
    back: { structure: "Future Perfect = czynność zakończona PRZED momentem w przyszłości (will have + V3)\nFuture Continuous = czynność trwająca W momencie w przyszłości (will be + -ing)", examples: ["By 6pm I will have finished. (zakończone przed 18)", "At 6pm I will be finishing. (trwa o 18)", "This time tomorrow she'll be flying to Tokyo."], tip: "'by' → FP. 'at this time / this time tomorrow' → FC." } },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function normalize(s) { return s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, " "); }
function isCorrect(ex, userInput) {
  const n = normalize(userInput);
  if (normalize(ex.answer) === n) return true;
  if (ex.altAnswers && ex.altAnswers.some(a => normalize(a) === n)) return true;
  return false;
}

// ─── PROGRESS / STORAGE ───────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0, 10); }
async function safeGet(key) {
  try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; }
}
async function safeSet(key, val) {
  try { await window.storage.set(key, JSON.stringify(val)); } catch {}
}
async function bumpStreak() {
  const streak = (await safeGet('p-streak')) || { lastDate: null, count: 0 };
  const today = todayStr();
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (streak.lastDate === today) return;
  streak.count = streak.lastDate === yesterday ? streak.count + 1 : 1;
  streak.lastDate = today;
  await safeSet('p-streak', streak);
}
async function saveExerciseResult(tenseId, correct) {
  if (!tenseId) return;
  const stats = (await safeGet('pt-stats')) || {};
  if (!stats[tenseId]) stats[tenseId] = { correct: 0, total: 0 };
  stats[tenseId].total++;
  if (correct) stats[tenseId].correct++;
  await safeSet('pt-stats', stats);
  await bumpStreak();
}
async function saveFlashcardResult(cardId, know) {
  const stats = (await safeGet('pf-stats')) || {};
  if (!stats[cardId]) stats[cardId] = { know: 0, retry: 0 };
  if (know) stats[cardId].know++; else stats[cardId].retry++;
  await safeSet('pf-stats', stats);
  await bumpStreak();
}
async function saveSession(session) {
  const sessions = (await safeGet('p-sessions')) || [];
  sessions.unshift({ ...session, date: todayStr() });
  if (sessions.length > 50) sessions.splice(50);
  await safeSet('p-sessions', sessions);
}
async function loadProgress() {
  const [tenseStats, fcStats, sessions, streak] = await Promise.all([
    safeGet('pt-stats'), safeGet('pf-stats'), safeGet('p-sessions'), safeGet('p-streak'),
  ]);
  return { tenseStats: tenseStats || {}, fcStats: fcStats || {}, sessions: sessions || [], streak: streak || { lastDate: null, count: 0 } };
}

// ─── STYLES ───────────────────────────────────────────────────────────────
const S = {
  app: { minHeight: "100vh", background: "#0F1117", fontFamily: "'Georgia','Times New Roman',serif", color: "#F0EDE4" },
  header: { background: "linear-gradient(135deg,#1A1D2E 0%,#0F1117 100%)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "1.8rem 2rem 0", textAlign: "center" },
  logo: { fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#9896A0", marginBottom: "0.4rem" },
  title: { fontSize: "clamp(1.6rem,4vw,2.5rem)", fontWeight: 700, background: "linear-gradient(135deg,#F0EDE4 30%,#E8B84B 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "0 0 0.4rem", lineHeight: 1.2 },
  subtitle: { color: "#9896A0", fontSize: "0.85rem", fontStyle: "italic" },
  nav: { display: "flex", justifyContent: "center", gap: "0.2rem", padding: "1rem 1rem 0", flexWrap: "wrap" },
  navBtn: a => ({ padding: "0.45rem 1.1rem", border: a ? "1px solid #E8B84B" : "1px solid rgba(255,255,255,0.1)", borderRadius: "2rem", background: a ? "rgba(232,184,75,0.15)" : "transparent", color: a ? "#E8B84B" : "#9896A0", cursor: "pointer", fontSize: "0.78rem", fontFamily: "Georgia,serif" }),
  content: { maxWidth: "960px", margin: "0 auto", padding: "1.5rem 1rem 3rem" },
  tenseCard: (color, open) => ({ background: open ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)", border: `1px solid ${open ? color + "55" : "rgba(255,255,255,0.07)"}`, borderRadius: "12px", marginBottom: "0.6rem", overflow: "hidden", cursor: "pointer" }),
  cardHeader: { display: "flex", alignItems: "center", gap: "0.8rem", padding: "1rem 1.2rem" },
  dot: c => ({ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }),
  cardTitle: { flex: 1, fontSize: "0.95rem", fontWeight: 600 },
  cardUse: { fontSize: "0.75rem", color: "#9896A0", fontStyle: "italic" },
  chevron: o => ({ fontSize: "0.65rem", color: "#9896A0", transition: "transform 0.3s", transform: o ? "rotate(180deg)" : "rotate(0)" }),
  cardBody: { padding: "0 1.2rem 1.2rem" },
  structure: c => ({ background: `${c}18`, border: `1px solid ${c}40`, borderRadius: "8px", padding: "0.6rem 0.9rem", fontFamily: "'Courier New',monospace", fontSize: "0.85rem", color: c, marginBottom: "1rem" }),
  sLabel: { fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9896A0", marginBottom: "0.35rem" },
  exBox: type => ({ padding: "0.35rem 0.7rem", borderRadius: "6px", fontSize: "0.84rem", fontStyle: "italic", marginBottom: "0.25rem", background: type === "positive" ? "rgba(91,173,111,0.1)" : type === "negative" ? "rgba(224,107,92,0.1)" : "rgba(91,142,230,0.1)", color: type === "positive" ? "#8ECC9E" : type === "negative" ? "#E88B80" : "#8BAEE6", borderLeft: `2px solid ${type === "positive" ? "#5BAD6F" : type === "negative" ? "#E06B5C" : "#5B8EE6"}` }),
  signals: { display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.35rem" },
  signal: { padding: "0.18rem 0.55rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "4px", fontSize: "0.75rem", fontFamily: "'Courier New',monospace", color: "#C8C4D0" },
  tip: { background: "rgba(232,184,75,0.08)", border: "1px solid rgba(232,184,75,0.22)", borderRadius: "8px", padding: "0.7rem 0.9rem", fontSize: "0.8rem", color: "#D4B86A", marginTop: "0.9rem", lineHeight: 1.5 },
  tipLabel: { fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8B84B", marginBottom: "0.25rem", display: "block" },
  dialogueBox: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.9rem 1rem", marginTop: "0.9rem" },
  dialogueSpeaker: isA => ({ fontWeight: 700, fontSize: "0.72rem", color: isA ? "#E8B84B" : "#5B8EE6", minWidth: "1.2rem", paddingTop: "0.1rem" }),
  dialogueText: isA => ({ fontSize: "0.85rem", fontStyle: "italic", color: isA ? "#F0EDE4" : "#C8D8F0", background: isA ? "rgba(232,184,75,0.06)" : "rgba(91,142,230,0.06)", padding: "0.3rem 0.6rem", borderRadius: "6px", lineHeight: 1.5 }),
  overviewGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))", gap: "0.8rem", marginBottom: "1.5rem" },
  overviewCard: (c, dimmed) => ({ background: dimmed ? `${c}08` : `${c}12`, border: `1px solid ${dimmed ? c + "20" : c + "35"}`, borderRadius: "12px", padding: "1rem", opacity: dimmed ? 0.75 : 1 }),
  levelBadge: lv => ({ display: "inline-block", padding: "0.15rem 0.5rem", background: `${LEVELS[lv].color}22`, border: `1px solid ${LEVELS[lv].color}55`, borderRadius: "4px", fontSize: "0.65rem", color: LEVELS[lv].color, fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.4rem" }),
  quizWrap: { maxWidth: "760px", margin: "0 auto" },
  filterBar: { display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.7rem" },
  filterBtn: (active, color) => ({ padding: "0.3rem 0.75rem", border: `1px solid ${active ? color : "rgba(255,255,255,0.12)"}`, borderRadius: "1.5rem", background: active ? `${color}20` : "transparent", color: active ? color : "#9896A0", cursor: "pointer", fontSize: "0.7rem", fontFamily: "Georgia,serif" }),
  progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem", gap: "0.8rem" },
  progressBar: { flex: 1, height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", overflow: "hidden" },
  progressFill: pct => ({ height: "100%", background: "linear-gradient(90deg,#E8B84B,#5BAD6F)", width: `${pct}%`, transition: "width 0.4s ease", borderRadius: "2px" }),
  card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "16px", padding: "1.8rem", marginBottom: "1rem" },
  typeTag: type => ({ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.2rem 0.7rem", background: `${TYPE_COLORS[type] || "#888"}18`, border: `1px solid ${TYPE_COLORS[type] || "#888"}45`, borderRadius: "4px", fontSize: "0.68rem", color: TYPE_COLORS[type] || "#888", letterSpacing: "0.06em", marginBottom: "0.4rem" }),
  tenseTagSmall: c => ({ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.6rem", background: `${c}15`, border: `1px solid ${c}40`, borderRadius: "4px", fontSize: "0.68rem", color: c, marginLeft: "0.4rem", marginBottom: "0.4rem" }),
  instruction: { fontSize: "0.7rem", color: "#9896A0", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" },
  qText: { fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "1.1rem" },
  inputRow: { display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" },
  input: st => ({ flex: 1, minWidth: "200px", padding: "0.75rem 1rem", background: st === "correct" ? "rgba(91,173,111,0.12)" : st === "wrong" ? "rgba(224,107,92,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${st === "correct" ? "#5BAD6F" : st === "wrong" ? "#E06B5C" : "rgba(255,255,255,0.13)"}`, borderRadius: "8px", color: "#F0EDE4", fontSize: "0.95rem", fontFamily: "Georgia,serif", outline: "none" }),
  checkBtn: { padding: "0.75rem 1.4rem", background: "rgba(232,184,75,0.18)", border: "1px solid rgba(232,184,75,0.45)", borderRadius: "8px", color: "#E8B84B", cursor: "pointer", fontSize: "0.82rem", fontFamily: "Georgia,serif", whiteSpace: "nowrap" },
  choiceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "0.6rem", marginBottom: "0.5rem" },
  choiceBtn: (st, sel) => ({ padding: "0.75rem 1rem", background: st === "correct" ? "rgba(91,173,111,0.15)" : st === "wrong" ? "rgba(224,107,92,0.15)" : sel ? "rgba(232,184,75,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${st === "correct" ? "#5BAD6F" : st === "wrong" ? "#E06B5C" : sel ? "#E8B84B" : "rgba(255,255,255,0.1)"}`, borderRadius: "8px", color: st === "correct" ? "#8ECC9E" : st === "wrong" ? "#E88B80" : "#F0EDE4", cursor: st ? "default" : "pointer", fontSize: "0.88rem", fontFamily: "Georgia,serif", textAlign: "left" }),
  feedback: ok => ({ marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: "8px", background: ok ? "rgba(91,173,111,0.1)" : "rgba(224,107,92,0.1)", border: `1px solid ${ok ? "#5BAD6F40" : "#E06B5C40"}`, fontSize: "0.85rem", color: ok ? "#8ECC9E" : "#E88B80" }),
  hintLine: { fontSize: "0.75rem", color: "#9896A0", fontStyle: "italic", marginTop: "0.5rem" },
  nextBtn: { marginTop: "0.9rem", padding: "0.65rem 1.3rem", background: "rgba(91,173,111,0.18)", border: "1px solid rgba(91,173,111,0.45)", borderRadius: "8px", color: "#8ECC9E", cursor: "pointer", fontSize: "0.82rem", fontFamily: "Georgia,serif" },
  scoreBox: { textAlign: "center", padding: "2.5rem 1rem" },
  scoreBig: { fontSize: "4rem", fontWeight: 700, background: "linear-gradient(135deg,#E8B84B,#5BAD6F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" },
  restartBtn: { padding: "0.75rem 1.8rem", background: "rgba(232,184,75,0.14)", border: "1px solid rgba(232,184,75,0.4)", borderRadius: "8px", color: "#E8B84B", cursor: "pointer", fontSize: "0.88rem", fontFamily: "Georgia,serif" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: "0.7rem", maxWidth: "520px", margin: "1.5rem auto 0" },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "10px", padding: "0.8rem", textAlign: "center" },
  statNum: c => ({ fontSize: "1.5rem", fontWeight: 700, color: c }),
  statLabel: { fontSize: "0.65rem", color: "#9896A0", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.2rem" },
  streakBadge: n => ({ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.6rem", background: n >= 5 ? "rgba(232,184,75,0.2)" : n >= 3 ? "rgba(91,173,111,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${n >= 5 ? "rgba(232,184,75,0.5)" : n >= 3 ? "rgba(91,173,111,0.4)" : "rgba(255,255,255,0.12)"}`, borderRadius: "1rem", fontSize: "0.75rem", color: n >= 5 ? "#E8B84B" : n >= 3 ? "#8ECC9E" : "#9896A0", fontWeight: n >= 3 ? 700 : 400 }),
};

// ─── EXERCISE CARD ────────────────────────────────────────────────────────
function ExerciseCard({ ex, onResult, onNext, isLast }) {
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

// ─── STORY PLAYER ────────────────────────────────────────────────────────
function StoryPlayer({ story, onFinish }) {
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
    if (gapIdx + 1 >= gaps.length) { setDone(true); saveSession({ score: gapResults.filter(r => r.correct).length + (correct ? 0 : 0), total: gaps.length, mode: "story" }); return; }
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

// ─── STORY SETUP ──────────────────────────────────────────────────────────
function StorySetup({ onStart }) {
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

// ─── PASSIVE VIEW ────────────────────────────────────────────────────────
function PassiveView() {
  const [expanded, setExpanded] = useState(null);
  const [quizState, setQuizState] = useState("setup");
  const [selTenses, setSelTenses] = useState(passiveTenses.map(t => t.id));
  const [count, setCount] = useState(12);
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  function toggleTense(id) { setSelTenses(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); }
  const available = passiveExercises.filter(e => selTenses.includes(e.tenseId)).length;
  function startQuiz(qs) { setQuestions(qs); setQIdx(0); setScore(0); setResults([]); setStreak(0); setMaxStreak(0); setQuizState("playing"); }
  function handleResult(correct) {
    if (correct) { setScore(s => s + 1); setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; }); } else setStreak(0);
    setResults(r => [...r, correct]);
    if (questions[qIdx]) saveExerciseResult(questions[qIdx].tenseId, correct);
  }
  function handleNext() { if (qIdx + 1 >= questions.length) { setQuizState("done"); saveSession({ score, total: questions.length, mode: "passive" }); } else setQIdx(i => i + 1); }
  const wrongCount = results.filter(r => !r).length;
  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "1rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontSize: "1.1rem" }}>🔵</span>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0" }}>Strona Bierna — Teoria i przykłady</span>
        </div>
        <div style={S.tip}>
          <span style={S.tipLabel}>💡 Kiedy używamy strony biernej?</span>
          Kiedy ważniejszy jest <strong>wynik</strong> lub <strong>fakt</strong> niż osoba wykonująca czynność. Kiedy sprawca jest <strong>nieznany, oczywisty lub nieważny</strong>. Ogólna zasada: <strong>be + V3</strong>.
        </div>
        <div style={{ marginTop: "1rem" }}>
          {passiveTenses.map(t => {
            const open = expanded === t.id;
            return (
              <div key={t.id} style={S.tenseCard(t.color, open)} onClick={() => setExpanded(open ? null : t.id)}>
                <div style={S.cardHeader}>
                  <div style={S.dot(t.color)} />
                  <span style={{ fontSize: "1.1rem" }}>{t.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={S.cardTitle}>{t.name}</span>
                      <span style={{ ...S.levelBadge(t.level), marginBottom: 0 }}>{t.level}</span>
                    </div>
                    <div style={S.cardUse}>{t.use}</div>
                  </div>
                  <span style={S.chevron(open)}>▼</span>
                </div>
                {open && (
                  <div style={S.cardBody} onClick={e => e.stopPropagation()}>
                    <div style={S.structure(t.color)}>{t.structure}</div>
                    <div style={{ marginBottom: "0.6rem" }}>
                      <div style={S.sLabel}>Przykład (strona czynna → bierna)</div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                        <div style={{ ...S.exBox("negative"), flex: 1 }}>Active: {t.active}</div>
                        <span style={{ color: "#9896A0" }}>→</span>
                        <div style={{ ...S.exBox("positive"), flex: 1 }}>Passive: {t.passive}</div>
                      </div>
                    </div>
                    {[["✅ Twierdzące", t.positive, "positive"], ["❌ Przeczące", t.negative, "negative"], ["❓ Pytania", t.question, "question"]].map(([label, items, type]) => (
                      <div key={label} style={{ marginBottom: "0.8rem" }}>
                        <div style={S.sLabel}>{label}</div>
                        {items.map((s, i) => <div key={i} style={S.exBox(type)}>{s}</div>)}
                      </div>
                    ))}
                    <div style={S.tip}><span style={S.tipLabel}>💡 Wskazówka</span>{t.tip}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1.5rem" }}>
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0", marginBottom: "1rem" }}>🧠 Ćwiczenia — Strona Bierna</div>
        {quizState === "setup" && (
          <div style={S.card}>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "1rem" }}>⚙️ Wybierz formy bierne do ćwiczenia</div>
            <div style={S.filterBar}>
              {passiveTenses.map(t => (
                <button key={t.id} style={S.filterBtn(selTenses.includes(t.id), t.color)} onClick={() => toggleTense(t.id)}>
                  {t.emoji} {t.name.replace("Passive", "").trim()}
                  <span style={{ ...S.levelBadge(t.level), marginLeft: "0.3rem", padding: "0.05rem 0.3rem", marginBottom: 0 }}>{t.level}</span>
                </button>
              ))}
            </div>
            <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Liczba pytań: <span style={{ color: "#E8B84B" }}>{Math.min(count, available)}</span><span style={{ color: "#9896A0" }}> / dostępnych: {available}</span></div>
            <input type="range" min={4} max={Math.max(4, Math.min(40, available))} step={4} value={Math.min(count, available)} onChange={e => setCount(+e.target.value)} style={{ width: "100%", accentColor: "#E8B84B", marginBottom: "1.2rem" }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={S.restartBtn} disabled={available === 0} onClick={() => startQuiz(shuffle(passiveExercises.filter(e => selTenses.includes(e.tenseId))).slice(0, Math.min(count, available)))}>Rozpocznij →</button>
            </div>
          </div>
        )}
        {quizState === "playing" && (
          <>
            <div style={S.progressRow}>
              <span style={{ fontSize: "0.75rem", color: "#9896A0" }}>{qIdx + 1}/{questions.length}</span>
              <div style={S.progressBar}><div style={S.progressFill((qIdx / questions.length) * 100)} /></div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "#5BAD6F" }}>✓ {score}</span>
                {streak >= 2 && <span style={S.streakBadge(streak)}>{streak >= 5 ? "🔥" : "⚡"} {streak}</span>}
              </div>
            </div>
            <ExerciseCard key={qIdx} ex={questions[qIdx]} onResult={handleResult} onNext={handleNext} isLast={qIdx + 1 >= questions.length} />
            <div style={{ textAlign: "center" }}>
              <button style={{ background: "none", border: "none", color: "#9896A0", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline", fontFamily: "Georgia,serif" }} onClick={() => { if (window.confirm("Zakończyć?")) setQuizState("setup"); }}>Zakończ sesję</button>
            </div>
          </>
        )}
        {quizState === "done" && (
          <div style={S.scoreBox}>
            <div style={{ fontSize: "2rem", marginBottom: "0.3rem" }}>{score / questions.length >= 0.9 ? "🏆" : score / questions.length >= 0.7 ? "🎯" : "📚"}</div>
            <div style={S.scoreBig}>{score}/{questions.length}</div>
            <div style={{ color: "#9896A0", fontSize: "0.85rem", marginTop: "0.3rem" }}>{score === questions.length ? "Perfekcyjnie! Strona bierna opanowana." : score / questions.length >= 0.7 ? "Świetnie!" : "Wróć do teorii i spróbuj ponownie."}</div>
            {wrongCount > 0 && (
              <div style={{ marginTop: "1rem", display: "inline-block", padding: "0.8rem 1.2rem", background: "rgba(224,107,92,0.08)", border: "1px solid rgba(224,107,92,0.25)", borderRadius: "10px" }}>
                <div style={{ fontSize: "0.8rem", color: "#E88B80", marginBottom: "0.5rem" }}>✗ {wrongCount} błędy — powtórz!</div>
                <button style={{ ...S.restartBtn, background: "rgba(224,107,92,0.18)", border: "1px solid rgba(224,107,92,0.45)", color: "#E88B80", fontSize: "0.8rem", padding: "0.5rem 1rem" }} onClick={() => startQuiz(shuffle(questions.filter((q, i) => !results[i])))}>🔁 Powtórz błędy ({wrongCount})</button>
              </div>
            )}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.2rem", flexWrap: "wrap" }}>
              <button style={S.restartBtn} onClick={() => setQuizState("setup")}>⚙️ Nowa sesja</button>
              <button style={{ ...S.restartBtn, background: "rgba(91,173,111,0.14)", border: "1px solid rgba(91,173,111,0.4)", color: "#8ECC9E" }} onClick={() => startQuiz(shuffle(questions))}>↺ Powtórz te same</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QUIZ SETUP ───────────────────────────────────────────────────────────
function QuizSetup({ onStart }) {
  const [mode, setMode] = useState("standard");
  const [selTypes, setSelTypes] = useState(Object.keys(TYPE_LABELS));
  const [selTenses, setSelTenses] = useState(tenses.map(t => t.id));
  const [selLevels, setSelLevels] = useState(Object.keys(LEVELS));
  const [count, setCount] = useState(15);
  const [selPairs, setSelPairs] = useState(confusingPairs.map(p => p.id));
  const [pairsCount, setPairsCount] = useState(15);
  const [storyState, setStoryState] = useState("list");
  const [activeStory, setActiveStory] = useState(null);
  const toggleType = t => setSelTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleTense = t => setSelTenses(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleLevel = l => setSelLevels(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  const togglePair = id => setSelPairs(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const validTenses = tenses.filter(t => selLevels.includes(t.level)).map(t => t.id);
  const available = allExercises.filter(e => selTypes.includes(e.type) && selTenses.includes(e.tenseId) && validTenses.includes(e.tenseId)).length;
  const pairsAvailable = confusingPairs.filter(p => selPairs.includes(p.id)).reduce((a, p) => a + p.exercises.length, 0);
  if (mode === "story" && storyState === "playing" && activeStory) {
    return <StoryPlayer story={activeStory} onFinish={() => { setStoryState("list"); setActiveStory(null); }} />;
  }
  return (
    <div style={S.quizWrap}>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {[{ id: "standard", label: "📚 Standardowy" }, { id: "pairs", label: "⚡ Mylące pary" }, { id: "story", label: "📖 Historia" }].map(m => (
          <button key={m.id} style={{ ...S.navBtn(mode === m.id), borderRadius: "8px", padding: "0.6rem 1.2rem", fontSize: "0.82rem" }} onClick={() => setMode(m.id)}>{m.label}</button>
        ))}
      </div>
      {mode === "standard" && (
        <div style={S.card}>
          <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1.2rem" }}>⚙️ Skonfiguruj sesję ćwiczeń</div>
          <div style={S.sLabel}>Poziom trudności</div>
          <div style={S.filterBar}>{Object.entries(LEVELS).map(([k, v]) => (<button key={k} style={S.filterBtn(selLevels.includes(k), v.color)} onClick={() => toggleLevel(k)}><strong>{k}</strong> · {v.desc}</button>))}</div>
          <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Typy zadań</div>
          <div style={S.filterBar}>{Object.entries(TYPE_LABELS).map(([k, v]) => (<button key={k} style={S.filterBtn(selTypes.includes(k), TYPE_COLORS[k])} onClick={() => toggleType(k)}>{TYPE_ICONS[k]} {v}</button>))}</div>
          <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Czasy gramatyczne</div>
          <div style={S.filterBar}>{tenses.map(t => (<button key={t.id} style={S.filterBtn(selTenses.includes(t.id) && validTenses.includes(t.id), t.color)} onClick={() => toggleTense(t.id)} disabled={!validTenses.includes(t.id)}>{t.emoji} {t.name} <span style={{ ...S.levelBadge(t.level), marginLeft: "0.3rem", padding: "0.05rem 0.3rem" }}>{t.level}</span></button>))}</div>
          <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Liczba pytań: <span style={{ color: "#E8B84B" }}>{Math.min(count, available)}</span><span style={{ color: "#9896A0" }}> / dostępnych: {available}</span></div>
          <input type="range" min={5} max={Math.max(5, Math.min(60, available))} step={5} value={Math.min(count, available)} onChange={e => setCount(+e.target.value)} style={{ width: "100%", accentColor: "#E8B84B", marginBottom: "1.2rem" }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button style={S.restartBtn} disabled={available === 0} onClick={() => onStart(shuffle(allExercises.filter(e => selTypes.includes(e.type) && selTenses.includes(e.tenseId) && validTenses.includes(e.tenseId))).slice(0, Math.min(count, available)))}>Rozpocznij sesję →</button>
          </div>
        </div>
      )}
      {mode === "pairs" && (
        <div>
          <div style={S.card}>
            <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem" }}>⚡ Tryb porównawczy — mylące pary</div>
            <div style={{ fontSize: "0.8rem", color: "#9896A0", marginBottom: "1.2rem" }}>Ćwiczenia skupione na najczęściej mylonych parach.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem" }}>
              {confusingPairs.map(p => (
                <button key={p.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem", padding: "0.8rem 1rem", border: `1px solid ${selPairs.includes(p.id) ? p.color + "60" : "rgba(255,255,255,0.1)"}`, borderRadius: "10px", background: selPairs.includes(p.id) ? `${p.color}12` : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "left", width: "100%" }} onClick={() => togglePair(p.id)}>
                  <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.88rem", fontWeight: 600, color: selPairs.includes(p.id) ? p.color : "#F0EDE4" }}>{p.name}</div>
                    <div style={{ fontSize: "0.74rem", color: "#9896A0", fontStyle: "italic" }}>{p.desc}</div>
                  </div>
                  <span style={{ color: selPairs.includes(p.id) ? p.color : "#555" }}>{selPairs.includes(p.id) ? "✓" : "○"}</span>
                </button>
              ))}
            </div>
            <div style={{ ...S.sLabel, marginTop: "0.8rem" }}>Liczba pytań: <span style={{ color: "#E8B84B" }}>{Math.min(pairsCount, pairsAvailable)}</span><span style={{ color: "#9896A0" }}> / dostępnych: {pairsAvailable}</span></div>
            <input type="range" min={5} max={Math.max(5, Math.min(60, pairsAvailable))} step={5} value={Math.min(pairsCount, pairsAvailable)} onChange={e => setPairsCount(+e.target.value)} style={{ width: "100%", accentColor: "#E8B84B", marginBottom: "1.2rem" }} />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button style={S.restartBtn} disabled={pairsAvailable === 0} onClick={() => onStart(shuffle(confusingPairs.filter(p => selPairs.includes(p.id)).flatMap(p => p.exercises.map(ex => ({ ...ex, pairId: p.id })))).slice(0, Math.min(pairsCount, pairsAvailable)))}>Rozpocznij →</button>
            </div>
          </div>
        </div>
      )}
      {mode === "story" && storyState === "list" && (
        <StorySetup onStart={s => { setActiveStory(s); setStoryState("playing"); }} />
      )}
    </div>
  );
}
function FlashcardsView() {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [selLevels, setSelLevels] = useState(["A2", "B1", "B2", "C1"]);
  const [queue, setQueue] = useState([]);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionResults, setSessionResults] = useState([]); // "know" | "retry"
  const [retryQueue, setRetryQueue] = useState([]);
  const [phase, setPhase] = useState("decks"); // decks | studying | done

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

  // Card counts per deck
  const deckCounts = flashcardDecks.map(d => ({
    ...d,
    total: allFlashcards.filter(c => c.deckId === d.id && selLevels.includes(c.level)).length,
  }));

  if (phase === "studying" && card) {
    const tenseData = tenses.find(t => t.id === card.tenseId);
    const pct = (cardIdx / queue.length) * 100;
    return (
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Header row */}
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

        {/* Flashcard */}
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
            {/* Deck + level badge */}
            <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1rem", flexWrap: "wrap" }}>
              <span style={{ padding: "0.15rem 0.6rem", background: `${deck?.color || "#888"}18`, border: `1px solid ${deck?.color || "#888"}40`, borderRadius: "4px", fontSize: "0.68rem", color: deck?.color || "#888" }}>
                {deck?.emoji} {deck?.name}
              </span>
              {card.level && <span style={{ ...S.levelBadge(card.level), marginBottom: 0 }}>{card.level}</span>}
              {tenseData && <span style={{ padding: "0.15rem 0.6rem", background: `${tenseData.color}15`, border: `1px solid ${tenseData.color}35`, borderRadius: "4px", fontSize: "0.68rem", color: tenseData.color }}>{tenseData.emoji} {tenseData.name}</span>}
            </div>

            {!flipped ? (
              // FRONT
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontSize: "1.1rem", lineHeight: 1.65, whiteSpace: "pre-line", textAlign: "center", color: "#F0EDE4" }}>
                  {card.front}
                </div>
                <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.72rem", color: "#9896A0" }}>
                  kliknij, żeby obrócić
                </div>
              </div>
            ) : (
              // BACK
              <div style={{ flex: 1 }}>
                {/* Structure box */}
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.8rem 1rem", marginBottom: "1rem", fontFamily: "'Courier New',monospace", fontSize: "0.83rem", color: "#C8C4D0", lineHeight: 1.7, whiteSpace: "pre-line" }}>
                  {card.back.structure}
                </div>
                {/* Examples */}
                <div style={{ marginBottom: "0.8rem" }}>
                  {card.back.examples.map((ex, i) => (
                    <div key={i} style={{ padding: "0.3rem 0.7rem", fontStyle: "italic", fontSize: "0.88rem", color: "#8BAEE6", borderLeft: "2px solid #5B8EE640", marginBottom: "0.3rem" }}>
                      {ex}
                    </div>
                  ))}
                </div>
                {/* Tip */}
                {card.back.tip && (
                  <div style={{ background: "rgba(232,184,75,0.08)", border: "1px solid rgba(232,184,75,0.2)", borderRadius: "8px", padding: "0.6rem 0.8rem", fontSize: "0.79rem", color: "#D4B86A", lineHeight: 1.5 }}>
                    💡 {card.back.tip}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action buttons — only visible after flip */}
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

          {/* Mini summary */}
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

  // DECK SELECTION SCREEN
  return (
    <div>
      {/* Level filter */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "1.2rem", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: "0.7rem", color: "#9896A0", textTransform: "uppercase", letterSpacing: "0.1em", marginRight: "0.3rem" }}>Poziom:</span>
        {Object.entries(LEVELS).map(([k, v]) => (
          <button key={k} style={S.filterBtn(selLevels.includes(k), v.color)} onClick={() => toggleLevel(k)}>
            {k} · {v.desc}
          </button>
        ))}
      </div>

      {/* Decks grid */}
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

            {/* Level breakdown */}
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

// ─── PROGRESS VIEW ────────────────────────────────────────────────────────
function ProgressView() {
  const [data, setData] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => { loadProgress().then(setData); }, []);

  async function clearAll() {
    try {
      await Promise.all(['pt-stats','pf-stats','p-sessions','p-streak'].map(k => window.storage.delete(k).catch(() => {})));
    } catch {}
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

      {/* Top stat cards */}
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

      {/* Tense mastery */}
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

          {/* Legend */}
          <div style={{ display: "flex", gap: "1.2rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {[["#5BAD6F","≥80% Dobrze"], ["#E8B84B","60–79% Ćwicz"], ["#E06B5C","<60% Do poprawy"]].map(([c, l]) => (
              <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                <span style={{ fontSize: "0.7rem", color: "#9896A0" }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Untouched tenses */}
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

      {/* Flashcard mastery */}
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

      {/* Recent sessions */}
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

      {/* Clear data */}
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

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("overview");
  const [expanded, setExpanded] = useState(null);
  const [quizState, setQuizState] = useState("setup");
  const [questions, setQuestions] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  function startQuiz(qs) { setQuestions(qs); setQIdx(0); setScore(0); setResults([]); setStreak(0); setMaxStreak(0); setQuizState("playing"); }
  function handleResult(correct, tenseId) {
    if (correct) { setScore(s => s + 1); setStreak(s => { const ns = s + 1; setMaxStreak(m => Math.max(m, ns)); return ns; }); } else setStreak(0);
    setResults(r => [...r, correct]);
    saveExerciseResult(tenseId, correct);
  }
  function handleNext() { if (qIdx + 1 >= questions.length) setQuizState("done"); else setQIdx(i => i + 1); }
  const wrongCount = results.filter(r => !r).length;

  useEffect(() => {
    if (quizState === "done" && questions.length > 0) {
      const finalScore = results.filter(Boolean).length;
      const mode = questions[0]?.pairId ? "pairs" : "quiz";
      saveSession({ score: finalScore, total: questions.length, mode });
    }
  }, [quizState]);

  const grouped = { A2: tenses.filter(t => t.level === "A2"), B1: tenses.filter(t => t.level === "B1"), B2: tenses.filter(t => t.level === "B2"), C1: tenses.filter(t => t.level === "C1") };

  const typeBreakdown = Object.keys(TYPE_LABELS).map(type => {
    const idxs = questions.map((q, i) => q.type === type ? i : -1).filter(i => i >= 0);
    return { type, total: idxs.length, correct: idxs.filter(i => results[i]).length };
  }).filter(x => x.total > 0);

  const tabs = [{ id: "overview", label: "📋 Przegląd" }, { id: "lessons", label: "📖 Lekcje" }, { id: "passive", label: "🔵 Strona Bierna" }, { id: "flashcards", label: "🃏 Fiszki" }, { id: "progress", label: "📊 Postęp" }, { id: "quiz", label: "🧠 Ćwiczenia" }];

  return (
    <div style={S.app}>
      <div style={S.header}>
        <div style={S.logo}>Kurs Języka Angielskiego</div>
        <h1 style={S.title}>English Tenses</h1>
        <p style={S.subtitle}>14 czasów · Strona Bierna · Fiszki · Postęp · Mylące Pary · A2–C1</p>
        <div style={S.nav}>
          {tabs.map(tab => (
            <button key={tab.id} style={S.navBtn(view === tab.id)} onClick={() => { setView(tab.id); if (tab.id === "quiz") setQuizState("setup"); }}>{tab.label}</button>
          ))}
        </div>
      </div>

      <div style={S.content}>

        {view === "overview" && (
          <div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {Object.entries(LEVELS).map(([k, v]) => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", background: `${v.color}12`, border: `1px solid ${v.color}35`, borderRadius: "8px" }}>
                  <span style={{ ...S.levelBadge(k), marginBottom: 0 }}>{k}</span>
                  <span style={{ fontSize: "0.78rem", color: "#C8C4D0" }}>{v.desc}</span>
                  <span style={{ fontSize: "0.72rem", color: "#9896A0" }}>— {tenses.filter(t => t.level === k).length} czasy</span>
                </div>
              ))}
            </div>
            {Object.entries(grouped).map(([level, ts]) => (
              <div key={level} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.7rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ ...S.levelBadge(level), marginBottom: 0, fontSize: "0.72rem" }}>{level}</span>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0" }}>
                    {LEVELS[level].desc}
                    {level === "A2" && " — Tutaj zacznij naukę"}
                    {level === "B1" && " — Buduj solidne fundamenty"}
                    {level === "B2" && " — Rozszerz słownictwo gramatyczne"}
                    {level === "C1" && " — Zaawansowane struktury"}
                  </span>
                </div>
                <div style={S.overviewGrid}>
                  {ts.map(t => (
                    <div key={t.id} style={S.overviewCard(t.color, level === "C1")}>
                      <div style={S.levelBadge(t.level)}>{t.level} · {LEVELS[t.level].desc}</div>
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.35rem" }}>
                        <span>{t.emoji}</span><span style={{ fontSize: "0.88rem", fontWeight: 600 }}>{t.name}</span>
                      </div>
                      <div style={{ fontSize: "0.74rem", color: "#9896A0", fontStyle: "italic", marginBottom: "0.5rem", lineHeight: 1.4 }}>{t.use}</div>
                      <div style={{ fontSize: "0.78rem", fontStyle: "italic", color: "#C8C4D0" }}>„{t.positive[0]}"</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={S.tip}>
              <span style={S.tipLabel}>💡 Sugerowana ścieżka nauki</span>
              Zacznij od <strong>A2</strong>, potem <strong>B1</strong> i <strong>B2</strong>. Czasy <strong>C1</strong> dopiero gdy B2 opanowane. Kiedy mylisz dwa czasy — skorzystaj z <strong>Mylących Par</strong> w ćwiczeniach. <strong>Stronę Bierną</strong> wprowadź równolegle z B1/B2. Tryb <strong>Historia</strong> pozwala ćwiczyć kilka czasów naraz w naturalnym kontekście.
            </div>
          </div>
        )}

        {view === "lessons" && (
          <div>
            {Object.entries(grouped).map(([level, ts]) => (
              <div key={level} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.7rem", paddingBottom: "0.4rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ ...S.levelBadge(level), marginBottom: 0, fontSize: "0.72rem" }}>{level}</span>
                  <span style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#9896A0" }}>{LEVELS[level].desc}</span>
                </div>
                {ts.map(t => {
                  const open = expanded === t.id;
                  return (
                    <div key={t.id} style={S.tenseCard(t.color, open)} onClick={() => setExpanded(open ? null : t.id)}>
                      <div style={S.cardHeader}>
                        <div style={S.dot(t.color)} />
                        <span style={{ fontSize: "1.1rem" }}>{t.emoji}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={S.cardTitle}>{t.name}</span>
                            <span style={{ ...S.levelBadge(t.level), marginBottom: 0 }}>{t.level}</span>
                          </div>
                          <div style={S.cardUse}>{t.use}</div>
                        </div>
                        <span style={S.chevron(open)}>▼</span>
                      </div>
                      {open && (
                        <div style={S.cardBody} onClick={e => e.stopPropagation()}>
                          <div style={S.structure(t.color)}>{t.structure}</div>
                          {[["✅ Zdania twierdzące", t.positive, "positive"], ["❌ Zdania przeczące", t.negative, "negative"], ["❓ Pytania", t.question, "question"]].map(([label, items, type]) => (
                            <div key={label} style={{ marginBottom: "0.9rem" }}>
                              <div style={S.sLabel}>{label}</div>
                              {items.map((s, i) => <div key={i} style={S.exBox(type)}>{s}</div>)}
                            </div>
                          ))}
                          <div style={{ marginBottom: "0.9rem" }}>
                            <div style={S.sLabel}>🕐 Słowa-klucze</div>
                            <div style={S.signals}>{t.signals.map((s, i) => <span key={i} style={S.signal}>{s}</span>)}</div>
                          </div>
                          <div style={S.tip}><span style={S.tipLabel}>💡 Wskazówka</span>{t.tip}</div>
                          {t.dialogue && (
                            <div style={S.dialogueBox}>
                              <div style={{ ...S.sLabel, marginBottom: "0.6rem" }}>💬 Przykładowy dialog</div>
                              {t.dialogue.map((line, i) => (
                                <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                                  <span style={S.dialogueSpeaker(line.speaker === "A")}>{line.speaker}</span>
                                  <span style={S.dialogueText(line.speaker === "A")}>{line.line}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {view === "passive" && <PassiveView />}

        {view === "flashcards" && <FlashcardsView />}

        {view === "progress" && <ProgressView />}

        {view === "quiz" && (
          <div style={S.quizWrap}>
            {quizState === "setup" && <QuizSetup onStart={startQuiz} />}

            {quizState === "playing" && (
              <>
                <div style={S.progressRow}>
                  <span style={{ fontSize: "0.75rem", color: "#9896A0" }}>{qIdx + 1}/{questions.length}</span>
                  <div style={S.progressBar}><div style={S.progressFill((qIdx / questions.length) * 100)} /></div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#5BAD6F" }}>✓ {score}</span>
                    {streak >= 2 && <span style={S.streakBadge(streak)}>{streak >= 5 ? "🔥" : "⚡"} {streak}</span>}
                  </div>
                </div>
                <ExerciseCard key={qIdx} ex={questions[qIdx]} onResult={handleResult} onNext={handleNext} isLast={qIdx + 1 >= questions.length} />
                <div style={{ textAlign: "center", marginTop: "0.4rem" }}>
                  <button style={{ background: "none", border: "none", color: "#9896A0", cursor: "pointer", fontSize: "0.75rem", textDecoration: "underline", fontFamily: "Georgia,serif" }}
                    onClick={() => { if (window.confirm("Zakończyć sesję?")) setQuizState("setup"); }}>
                    Zakończ sesję
                  </button>
                </div>
              </>
            )}

            {quizState === "done" && (
              <div style={S.scoreBox}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.3rem" }}>{score / questions.length >= 0.9 ? "🏆" : score / questions.length >= 0.7 ? "🎯" : score / questions.length >= 0.5 ? "📈" : "📚"}</div>
                <div style={S.scoreBig}>{score}/{questions.length}</div>
                <div style={{ color: "#9896A0", fontSize: "0.88rem", marginTop: "0.4rem" }}>
                  {score === questions.length ? "Perfekcyjny wynik! Jesteś mistrzem czasów angielskich." : score / questions.length >= 0.8 ? "Świetnie! Znasz czasy angielskie bardzo dobrze." : score / questions.length >= 0.6 ? "Nieźle! Jeszcze trochę ćwiczeń i będziesz mistrzem." : "Wróć do lekcji i spróbuj ponownie. Dasz radę!"}
                </div>
                {maxStreak >= 3 && (
                  <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
                    <div style={S.statCard}><div style={S.statNum("#E8B84B")}>{maxStreak}</div><div style={S.statLabel}>🔥 Max seria</div></div>
                  </div>
                )}
                {wrongCount > 0 && (
                  <div style={{ marginTop: "1.2rem", padding: "0.9rem 1.2rem", background: "rgba(224,107,92,0.08)", border: "1px solid rgba(224,107,92,0.25)", borderRadius: "10px", display: "inline-block" }}>
                    <div style={{ fontSize: "0.82rem", color: "#E88B80", marginBottom: "0.5rem" }}>✗ {wrongCount} {wrongCount === 1 ? "błędna odpowiedź" : "błędne odpowiedzi"} — warto powtórzyć!</div>
                    <button style={{ ...S.restartBtn, background: "rgba(224,107,92,0.18)", border: "1px solid rgba(224,107,92,0.45)", color: "#E88B80", fontSize: "0.82rem", padding: "0.6rem 1.2rem" }}
                      onClick={() => startQuiz(shuffle(questions.filter((q, i) => !results[i])))}>
                      🔁 Powtórz tylko błędy ({wrongCount})
                    </button>
                  </div>
                )}
                {typeBreakdown.length > 1 && (
                  <div style={S.statsGrid}>{typeBreakdown.map(({ type, total, correct }) => (
                    <div key={type} style={S.statCard}><div style={S.statNum(TYPE_COLORS[type])}>{correct}/{total}</div><div style={S.statLabel}>{TYPE_ICONS[type]} {TYPE_LABELS[type]}</div></div>
                  ))}</div>
                )}
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
                  <button style={S.restartBtn} onClick={() => setQuizState("setup")}>⚙️ Nowa sesja</button>
                  <button style={{ ...S.restartBtn, background: "rgba(91,173,111,0.14)", border: "1px solid rgba(91,173,111,0.4)", color: "#8ECC9E" }} onClick={() => startQuiz(shuffle(questions))}>↺ Powtórz te same</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
