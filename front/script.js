// GLOBAL SCOPE

let question;
let choixProfil;
let idQuestion=0;

// const dataDSI = require("../back/dataDSI.json");
// const dataPatron = require("../dataPatron/dataDSI.json");
// const dataUser = require("../back/dataUser.json");
const fs = require('fs');
try {
  // Ajustez le chemin selon votre structure de dossiers
  const fichierJSON = fs.readFileSync('../back/dataUser.json', 'utf8');
  const mesData = JSON.parse(fichierJSON);
  console.log("Données JSON chargées :", mesData);
} catch (erreur) {
  console.error("Erreur lors du chargement du JSON :", erreur);
}


// END GLOBAL SCOPE


//Choix du profil
function selectUser(profil){
  switch(profil){
    case 1 :
      profil=dataDSI;
      break;
    case 2 :
      profil=dataPatron;
      break;
    case 3 :
      profil=dataUser;
      break;
  }
}

function insertQuestion() {
  let nextQuestion = document.getElementById("insert");

  nextQuestion.innerHTML = getQuestion(idQuestion);
}


function getQuestion(choixProfil, idQuestion) {
  selectUser(data);

  switch (idQuestion) {
    case idQuestion:
      question = dataUser.stringify("Question")
        
    ;
      break;
  }

  return question;
}

function getInput() {
  if (document.getElementById("input1") !== null) {
    input1 = document.getElementById("input1");
  } else {
    input1 = 0;
  }
  if (document.getElementById("input2") !== null) {
    input2 = document.getElementById("input2");
  } else {
    input2 = 0;
  }
  if (document.getElementById("input3") !== null) {
    input3 = document.getElementById("input3");
  } else {
    input3 = 0;
  }
  if (document.getElementById("input4") !== null) {
    input4 = document.getElementById("input4");
  } else {
    input4 = 0;
  }
  if (document.getElementById("input5") !== null) {
    input5 = document.getElementById("input5");
  } else {
    input5 = 0;
  }

  console.log(input1.checked);

  const data = {
    1: input1.checked,
    2: input2.checked,
    3: input3.checked,
    4: input4.checked,
    5: input5.checked,
  };

  // console.log(data);
  idQuestion++;
  console.log(idQuestion);
  insertQuestion();
}

function createJSON() {}
