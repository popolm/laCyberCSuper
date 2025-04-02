// GLOBAL SCOPE

let question;
let choixProfil;
let idQuestion=0;

const dataDSI = fetch("../back/dataDSI.json");
const dataPatron = fetch("../dataPatron/dataDSI.json");
const dataUser = fetch("../back/dataUser.json");

console.log(dataDSI);

// END GLOBAL SCOPE

fetch('../back/dataDSI.json')  // Utilisez le chemin correct vers votre fichier
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return response.json();  // Convertit la réponse en objet JavaScript
  })
  .then(donneesJSON => {
    // Stockez les données dans une variable
    const mesData = donneesJSON;
    
    // Affichez les données dans la console
    console.log("Données JSON chargées :", mesData);
    
    // À partir d'ici, vous pouvez utiliser la variable mesData comme vous le souhaitez
    // Par exemple, accéder à une propriété spécifique :
    // console.log(mesData.proprieteSpecifique);
  })
  .catch(erreur => {
    console.error("Erreur lors du chargement du JSON :", erreur);
  });

//Faire fonction choix user

function insertQuestion() {
  let nextQuestion = document.getElementById("insert");

  nextQuestion.innerHTML = getQuestion(idQuestion);
}


function getQuestion(choixProfil, idQuestion) {
  switch(profil){
    case 1 :
      profil=dataDSI;
    case 2 :
      profil=dataPatron;
    case 3 :
      profil=dataUser;
  }

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
