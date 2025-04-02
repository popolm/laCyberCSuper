// GLOBAL SCOPE

let question;
let idQuestion = 0;
let profil;
let dataUser;

// Fonction pour afficher la question sur la profession
function displayProfessionQuestion() {
  const insertElement = document.getElementById("insert");
  insertElement.innerHTML = `
    <p id="question-text">Quel type de professionnel êtes-vous ?</p>
    <div class="flex flex-col items-center p-[1rem]">
      <div>
        <div class="flex gap-[1rem]">
          <input type="radio" id="input1" name="profession" />
          <label for="input1">Chef d'entreprise</label>
        </div>
        <div class="flex gap-[1rem]">
          <input type="radio" id="input2" name="profession" />
          <label for="input2">Collaborateur</label>
        </div>
        <div class="flex gap-[1rem]">
          <input type="radio" id="input3" name="profession" />
          <label for="input3">D.S.I.</label>
        </div>
      </div>
    </div>
    <button type="button" onclick="location.href='index.html'">Retour</button>
    <button type="button" onclick="startQuestionnaire()">Commencer</button>

  `;
}

// Fonction pour charger les questions en fonction du type de professionnel
function loadQuestions(profession) {
  let filePath;
  switch (profession) {
    case "Collaborateur":
      filePath = "../back/dataUser.json";
      break;
    case "D.S.I.":
      filePath = "../back/dataDSI.json";
      break;
    case "Chef d'entreprise":
      filePath = "../back/dataPatron.json";
      break;
    default:
      console.error("Profession non reconnue !");
      return;
  }

  fetch(filePath)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      dataUser = data;
      profil = data;
      idQuestion = 0; // Réinitialise l'index des questions
      insertQuestion();
    })
    .catch((err) => console.error("Erreur de chargement JSON :", err));
}

// Fonction pour insérer une question dans le DOM
function insertQuestion() {
  if (!profil || idQuestion >= profil.length) {
    console.log("Toutes les questions ont été affichées.");
    return;
  }

  const currentQuestion = profil[idQuestion];
  const nextQuestion = document.getElementById("insert");
  nextQuestion.innerHTML = getQuestionHTML(currentQuestion);
}

// Génère le HTML pour une question
function getQuestionHTML(questionData) {
  const { Question, Reponse_possibles, Type_rep } = questionData;

  let typeQuestion;
  if (Type_rep === "QCM") {
    typeQuestion = "checkbox";
  } else if (Type_rep === "QCU") {
    typeQuestion = "radio";
  } else {
    console.error("Type de question non reconnu !");
    return `<p>Erreur : Type de question non reconnu.</p>`;
  }

  let optionsHTML = "";
  for (const [key, value] of Object.entries(Reponse_possibles)) {
    optionsHTML += `
      <div>
        <input type="${typeQuestion}" id="${key}" name="response" />
        <label for="${key}">${value}</label>
      </div>
    `;
  }

  return `
  <div class="flex flex-col items-center p-[1rem]">
    <button type="button" onclick="location.href='index.html'">Retour à l'accueil</button>
    <h2>${Question.value}</h2>
    <form>
      ${optionsHTML}
      <button type="button" onclick="getInput()">Suivant</button>
    </form>
  </div>
  `;
}

// Récupère les réponses de l'utilisateur
function getInput() {
  const currentQuestion = profil[idQuestion];
  const { Reponse_possibles } = currentQuestion;

  const userResponses = {};
  for (const key of Object.keys(Reponse_possibles)) {
    const input = document.getElementById(key);
    userResponses[key] = input ? input.checked : false;
  }
  writeToJSON();

  idQuestion++;
  insertQuestion(); // Passe à la question suivante
}

// Ecrit les réponses de l'utilisateur dans result.json via un POST
function writeToJSON() {
  // Prépare les données à envoyer
  const currentQuestion = profil[idQuestion];
  const { Question, Reponse_possibles } = currentQuestion;

  const userResponses = {};
  for (const key of Object.keys(Reponse_possibles)) {
    const input = document.getElementById(key);
    if (input && input.checked) {
      userResponses[key] = input.checked;
    }
  }

  const result = {
    questionId: currentQuestion.Question.id,
    question: Question.value,
    responses: userResponses,
  };

  // Envoie les données au backend
  fetch("../back/saveResult.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => console.log("Données sauvegardées avec succès :", response))
    .catch((err) => console.error("Erreur lors de la sauvegarde :", err));
}

// Fonction appelée pour démarrer le questionnaire en fonction de la sélection
function startQuestionnaire() {
  const selectedProfession = document.querySelector(
    'input[name="profession"]:checked'
  );
  if (selectedProfession) {
    loadQuestions(selectedProfession.nextElementSibling.textContent.trim());
  } else {
    alert("Veuillez sélectionner un type de professionnel !");
  }
}

// Affiche la question sur la profession au chargement de la page
document.addEventListener("DOMContentLoaded", displayProfessionQuestion);
