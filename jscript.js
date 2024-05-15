let order = [];
let playerOrder = [];
let flash;
let turn;
let correct;
let compTurn;
let intervalId;
let sound = true;
let on = false;
let win;
let winAudio = document.getElementById("win");
let audio = document.getElementById("wrong");

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");


onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
  winAudio.pause();
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
  winAudio.pause();
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  correct = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function one() {
  let audio = document.getElementById("clip1");
  audio.play();
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  let audio = document.getElementById("clip2");
  audio.play();
  topRight.style.backgroundColor = "pink";
}

function three() {
   let audio = document.getElementById("clip3");
   audio.play();
   bottomLeft.style.backgroundColor = "bisque";
}

function four() {
    let audio = document.getElementById("clip4");
    audio.play();
    bottomRight.style.backgroundColor = "lightblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "green";
  topRight.style.backgroundColor = "purple";
  bottomLeft.style.backgroundColor = "gold";
  bottomRight.style.backgroundColor = "blue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "pink";
  bottomLeft.style.backgroundColor = "bisque";
  bottomRight.style.backgroundColor = "lightblue";
}

function gameTurn() {
    on = false;
  
    if (flash == turn) {
      clearInterval(intervalId);
      compTurn = false;
      clearColor();
      on = true;
    }
  
    if (compTurn) {
      clearColor();
      setTimeout(() => {
        if (order[flash] == 1) one();
        if (order[flash] == 2) two();
        if (order[flash] == 3) three();
        if (order[flash] == 4) four();
        flash++;
      }, 200);
    }
  }
  
topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function checkEasy() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    correct = false;

  if (playerOrder.length == 5 && correct) {
    winGame();
  }

  if (correct == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    audio.play();
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      play();
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && correct && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    correct = false;

  if (playerOrder.length == 5 && correct) {
    winGame();
  }

  if (correct == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    audio.play();
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      play();
    }, 800);

    sound = false;
  }

  if (turn == playerOrder.length && correct && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
  let audio = document.getElementById("win");
  audio.play();

  let flashingInterval;

  flashingInterval = setInterval(() => {
    flashColor();
    setTimeout(clearColor, 500); 
  }, 1000); 

  setTimeout(() => {
    clearInterval(flashingInterval);
    clearColor(); 
  }, 50000);
}