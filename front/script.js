// GLOBAL SCOPE

let question;
let idQuestion = 0;
let profil;
let dataUser;

fetch("../back/dataUser.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    dataUser = data;
    profil = data;
    insertQuestion();
  })
  .catch((err) => console.error("Erreur de chargement JSON :", err));

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
  const { Question, Reponse_possibles } = questionData;

  let optionsHTML = "";
  for (const [key, value] of Object.entries(Reponse_possibles)) {
    optionsHTML += `
      <div>
        <input type="radio" id="${key}" name="${key}" />
        <label for="${key}">${value}</label>
      </div>
    `;
  }

  return `
    <h2>${Question.value}</h2>
    <form>
      ${optionsHTML}
      <button type="button" onclick="getInput()">Suivant</button>
    </form>
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

  console.log("Réponses utilisateur :", userResponses);

  idQuestion++;
  insertQuestion(); // Passe à la question suivante
}

function createJSON() {
  // Fonction à implémenter pour générer un JSON basé sur les réponses utilisateur
}
