const probArea = document.querySelector(".prob");
const ourForm = document.querySelector(".btn");

const ourField = document.querySelector(".our-field");

const pointsNeeded = document.querySelector(".pointsNeeded");
const mistakeAll = document.querySelector(".mistakeAll");
const progressB = document.querySelector(".progress-inner");

const gameResult = document.querySelector(".game-result");
const ResetBtn = document.querySelector(".reset-btn");


let state = {
  wrongAns: 0,
  score: 0
}

function updateProb () {
  generateprob()
  state.currentProb = generateprob()
  probArea.innerHTML = `${state.currentProb.numberOne} ${state.currentProb.operator} ${state.currentProb.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProb()
function generateNumb(max) {
  return Math.floor(Math.random() * (max + 1))
}

function generateprob() {
  return {
    numberOne: generateNumb(10),
    numberTwo: generateNumb(10),
    operator: ['+',
      '-',
      '÷',
      '×'][generateNumb(3)]
  }
}

ourForm.addEventListener("click", handleSubmit) 

function handleSubmit(e) {
  e.preventDefault()
  
  let correctAns 
  let p = state.currentProb
  if (p.operator == "+") correctAns = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAns = p.numberOne - p.numberTwo
  if (p.operator == "×") correctAns = p.numberOne * p.numberTwo
  if (p.operator == "÷") correctAns = p.numberOne / p.numberTwo
  
  if (parseInt(ourField.value, 10) === correctAns) {
    state.score++
    pointsNeeded.textContent = 10 - state.score
    updateProb()
    renderProgressB()
  }else {
    state.wrongAns++
    mistakeAll.textContent = 2 - state.wrongAns
    updateProb()
    probArea.classList.add("wrong-ans")
    setTimeout(() => probArea.classList.remove("wrong-ans"), 331)
  }
  checkLogic()
}

function checkLogic() {
  //if you won
  if (state.score === 10) {
    gameResult.textContent = "Congrats! You Won"
    document.body.classList.add("overlay-is-open")
    setTimeout(() => ResetBtn.focus(), 331);
  }
  
  //if you lost
  if (state.wrongAns === 3) {
    gameResult.textContent = "Sorry, You Lost"
    document.body.classList.add("overlay-is-open")
    setTimeout(() => ResetBtn.focus(), 331);
  }
  
}

ResetBtn.addEventListener("click", resetGame)



function resetGame() {
  document.body.classList.remove("overlay-is-open")
    updateProb()
    state.score = 0
    state.wrongAns = 0
    pointsNeeded.textContent = 10
    mistakeAll.textContent = 2
    renderProgressB()
  }
  
  
  function renderProgressB() {
    progressB.style.transform = `scaleX(${state.score / 10})`
  }