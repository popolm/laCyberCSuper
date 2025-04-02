// GLOBAL SCOPE

let question;
let choixProfil;
let idQuestion = 0;

const dataDSI = fetch("../back/dataDSI.json");
const dataPatron = fetch("../dataPatron/dataDSI.json");
const dataUser = fetch("../back/dataUser.json");
const dataUser = fetch("../back/dataUser.json");
const dataDSI = fetch("../back/dataDSI.json");
const dataPatron = fetch("../back/dataPatron.json");
const result = fetch("../back/result.json");

const user = {
  id: 2,
};

console.log(dataUser);

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

function createJSON() {
  // for dataUSER questions, if it's right, add to a counter to get to the easy/hard question in the password section

  // if answer is wrong, add the advice to the return.json
  const data = JSON.stringify(user);
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
}
