let data = { DSI: null, Patron: null, User: null };
let questions = [];
let currentIndex = 0;
let badAnswers = [];
let selectedRole = null;
let answersRecord = [];

async function loadData() {
  const [dsi, patron, user] = await Promise.all([
    fetch("../back/dataDSI.json").then((r) => r.json()),
    fetch("../back/dataPatron.json").then((r) => r.json()),
    fetch("../back/dataUser.json").then((r) => r.json()),
  ]);
  data.DSI = dsi;
  data.Patron = patron;
  data.User = user;
}

async function startQuiz(role) {
  if (!data.DSI) await loadData();
  questions = data[role].filter((q) => getNiveau(q) === "medium");
  selectedRole = role;
  currentIndex = 0;
  badAnswers = [];
  answersRecord = [];

  document.getElementById("role-selection").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const questionData = questions[currentIndex];
  const q =
    questionData.Question ||
    questionData.QuestionAvancee ||
    questionData.QuestionSimple ||
    questionData.QuestionBase;
  document.getElementById("question-title").innerText = q.value;
  const repDiv = document.getElementById("answers");
  repDiv.innerHTML = "";

  const type = questionData.Type_rep;
  const reps = questionData.Reponse_possibles;

  for (const [key, value] of Object.entries(reps)) {
    const container = document.createElement("div");
    container.className = "flex items-center mb-2";

    const input = document.createElement("input");
    input.type = type === "QCM" ? "checkbox" : "radio";
    input.name = "response";
    input.value = key;
    input.id = key;
    input.className = "mr-2";

    const label = document.createElement("label");
    label.htmlFor = key;
    label.innerText = value;
    label.className = "ml-2";

    repDiv.appendChild(input);
    repDiv.appendChild(label);
    repDiv.appendChild(document.createElement("br"));
  }
}

function nextQuestion() {
  const questionData = questions[currentIndex];
  const q =
    questionData.Question ||
    questionData.QuestionAvancee ||
    questionData.QuestionSimple ||
    questionData.QuestionBase;
  const repAttendue = questionData.Réponse_attendue?.isCorrect;

  let selected = [];
  document
    .querySelectorAll('input[name="response"]:checked')
    .forEach((el) => selected.push(el.value));

  // Prevent proceeding if no option is selected
  if (selected.length === 0) {
    alert("Veuillez sélectionner une réponse avant de continuer.");
    return;
  }

  const isCorrect =
    repAttendue &&
    JSON.stringify(repAttendue.sort()) === JSON.stringify(selected.sort());

  answersRecord.push({
    question: q.value,
    selected,
    correct: !!isCorrect,
  });

  if (!isCorrect) {
    badAnswers.push({
      question: q.value,
      conseil: questionData.Conseil,
    });
  }

  currentIndex++;

  if (currentIndex >= questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
  console.log("Réponses cochées :", selected);
  console.log("Réponses attendues :", repAttendue);
}

function getNiveau(questionData) {
  const q =
    questionData.Question ||
    questionData.QuestionAvancee ||
    questionData.QuestionSimple ||
    questionData.QuestionBase;
  return q.niveauQuestion;
}

function endQuiz() {
  // Vérifie si on vient de terminer les questions medium
  if (getNiveau(questions[0]) === "medium") {
    const nextLevel = badAnswers.length === 0 ? "difficile" : "simple";
    const nextQuestions = data[selectedRole].filter(
      (q) => getNiveau(q) === nextLevel
    );

    if (nextQuestions.length > 0) {
      questions = nextQuestions;
      showQuestion();
      return;
    }
  }

  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");

  const adviceList = document.getElementById("advice-list");
  adviceList.innerHTML = "";

  const scoreTotal = questions.length;
  const scoreBonnes = scoreTotal - badAnswers.length;

  const scoreDiv = document.createElement("div");
  scoreDiv.innerHTML = `<h3>🧾 Résultat : ${scoreBonnes} / ${scoreTotal} bonnes réponses</h3>`;
  adviceList.appendChild(scoreDiv);

  const adviceContainer = document.createElement("div");
  adviceContainer.style.width = "60%";
  adviceContainer.style.margin = "0 auto";
  adviceContainer.style.textAlign = "justify";

  if (badAnswers.length === 0) {
    const bravo = document.createElement("p");
    bravo.innerText = "Bravo, vous avez tout bon ! 🎉";
    adviceContainer.appendChild(bravo);
  } else {
    badAnswers.forEach((el) => {
      const div = document.createElement("div");
      div.classList.add("question-block");
      div.innerHTML = `<strong>Question :</strong> ${el.question}<br><strong>Conseil :</strong> ${el.conseil}`;
      adviceContainer.appendChild(div);
    });
  }

  adviceList.appendChild(adviceContainer);
}

function downloadResults() {
  const email = document.getElementById("contact-email")?.value || "";
  const result = {
    date: new Date().toISOString(),
    role: selectedRole,
    email: email,
    responses: answersRecord,
    erreurs: badAnswers,
  };
  const blob = new Blob([JSON.stringify(result, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  fetch("http://localhost:5000/back/saveResult.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  })
    .then((res) =>
      res.ok
        ? console.log("Résultat sauvegardé côté serveur.")
        : console.error("Erreur serveur")
    )
    .catch((err) => console.error("Erreur réseau", err));
  a.download = "result.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
