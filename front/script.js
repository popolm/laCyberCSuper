// GLOBAL SCOPE

// import dataUser from ("../back/dataUser.json");

// const dataUser = require("../back/dataUser.json");
// const dataDSI = require("../back/dataDSI.json");
// const dataPatron = require("../back/dataPatron.json");
const result = require("../back/result.json");
let question;
let answer=[];
let result;
let choixProfil;
let idQuestion = 0;
const user = {
  id: 2,
};

const { readFileSync } = require("fs");

const dataUser = readFileSync("../back/dataUser.json");
console.log(JSON.parse(dataUser));

// END GLOBAL SCOPE

//Choix du profil
function selectUser(profil) {
  switch (profil) {
    case 1:
      profil = dataDSI;
      break;
    case 2:
      profil = dataPatron;
      break;
    case 3:
      profil = dataUser;
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
      question = dataUser.stringify("Question");
      break;
  }

  return question;
}

function getInput() {
  if (document.getElementById("input1") !== null) {
    input1 = document.getElementById("input1");
    answer.push(input1);
  } else {
    input1 = null;
  }
  if (document.getElementById("input2") !== null) {
    input2 = document.getElementById("input2");   
    answer.push(input2);
  } else {
    input2 = null;
  }
  if (document.getElementById("input3") !== null) {
    input3 = document.getElementById("input3");
    answer.push(input3);
  } else {
    input3 = null;
  }
  if (document.getElementById("input4") !== null) {
    input4 = document.getElementById("input4");
    answer.push(input4);
  } else {
    input4 = null;
  }
  if (document.getElementById("input5") !== null) {
    input5 = document.getElementById("input5");
    answer.push(input5);
  } else {
    input5 = null;
  }

  // console.log(data);

  idQuestion++;
  console.log(idQuestion);
  insertQuestion();
}

function createJSON() {
  checkAnswer();
  // for dataUSER questions, if it's right, add to a counter to get to the easy/hard question in the password section

  // if answer is wrong, add the advice to the return.json
  if(!result)
  const profil.Conseils[0] = JSON.stringify(user);
  // writing the JSON string content to a file
  result.writeFile("result.json", data, (error) => {
    // throwing the error
    // in case of a writing problem
    if (error) {
      // logging the error
      console.error(error);

      throw error;
    }

    console.log("data.json written correctly");
  });
}

function checkAnswer() {
  // collect answer
  getInput();

  // check if it's right
  // j'ai un doute : est-ce que le [0] ne va pas prendre que le "choix 1" d'un QCM ??
  if(assert.deepStrictEqual(answer[0], profil.Réponse_attendue[0])){
    result=true;
  } else {
        result=false;
  }
  return result;
}
