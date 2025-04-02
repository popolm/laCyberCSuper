// GLOBAL SCOPE

let question;
var dataDSI = require("../back/dataDSI.json");
var dataPatron = require("../dataPatron/dataDSI.json");
var dataUser = require("../back/dataUser.json");
var result = require("../back/result.json");

console.log(dataPatron);

// END GLOBAL SCOPE

function insertQuestion() {
  let nextQuestion = document.getElementById("insert");

  nextQuestion.innerHTML = getQuestion(1);
}

function getQuestion(idQuestion) {
  switch (idQuestion) {
    case 1:
      question = ` 
    <p>Quel type de professionnel êtes-vous ?</p>
        <div class=" flex flex-col items-center p-[1rem]">
            <div>
            <div class="flex gap-[1rem]">
                <input type="checkbox" id="input1">
                <label>Chef d'entreprise</label>
            </div>
            <div class="flex gap-[1rem]">
                <input type="checkbox" id="input2">
                <label>Collaborateur</label>
            </div>
            <div class="flex gap-[1rem]">
                <input type="checkbox" id="input3">
                <label>D.S.I.</label>
            </div>
            <div>
        </div>
    `;
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

  console.log(data);
}

function createJSON() {}
