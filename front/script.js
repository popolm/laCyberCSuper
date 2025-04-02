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
  const { Question, Reponse_possibles, Type_rep } = questionData;

  let optionsHTML = "";
  
  let typeQuestion = "radio" || "checkbox";
    if(Type_rep==="QCM"){
      typeQuestion="checkbox";
    } else if(Type_rep==="QCU"){
      typeQuestion="radio";
    }

  for (const [key, value] of Object.entries(Reponse_possibles)) {
    optionsHTML += `
      <div>
        <input type="${typeQuestion}" id="${key}" name="${key}" />
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
  createJSON();

  console.log("Réponses utilisateur :", userResponses);

  idQuestion++;
  insertQuestion();
}

function createJSON() {
  const currentQuestion = profil[idQuestion];
  const { Réponse_attendue, Conseil } = currentQuestion;

  // Check if the user's answer is correct
  const userResponses = getUserResponses();
  const isCorrect = checkAnswer(userResponses, Réponse_attendue);

  // Prepare the result object
  const result = {
    questionId: currentQuestion.Question.id,
    isCorrect: isCorrect,
    conseil: isCorrect ? null : Conseil,
  };

  // Send the result to the backend for saving
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
    .then((response) => console.log("Result saved successfully:", response))
    .catch((err) => console.error("Error saving result:", err));
}

function getUserResponses() {
  const currentQuestion = profil[idQuestion];
  const { Reponse_possibles } = currentQuestion;

  const userResponses = [];
  for (const key of Object.keys(Reponse_possibles)) {
    const input = document.getElementById(key);
    if (input && input.checked) {
      userResponses.push(key);
    }
  }
  return userResponses;
}

function checkAnswer(userResponses, expectedResponses) {
  return JSON.stringify(userResponses.sort()) === JSON.stringify(expectedResponses.isCorrect.sort());
}

