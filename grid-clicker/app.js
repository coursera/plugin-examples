var config;

var clicks;
var timerStarted;
var activeCell;

var timer;

init();

function init() {
  document.getElementById("reset").addEventListener('click', setupGame)
  getRecordAndCall(function(values) {
    var score = values.recordScore;
    if (!score) {
      score = 0;
    }
    document.getElementById("record").innerHTML = score;
  });
  courseraApi.callMethod({
    type: "GET_SESSION_CONFIGURATION",
    onSuccess: function(configuration) {
      config = configuration;
      makeGrid();
      setupGame();
    },
    onFailure: console.log
  });
}

function getRecordAndCall(callback) {
  courseraApi.callMethod({
    type: "GET_STORED_VALUES",
    data: ["recordScore"],
    onSuccess: callback,
    onError: console.log
  });
}

function seeIfRecord(values) {
  if (clicks > values.recordScore) {
    document.getElementById("clicks").innerHTML = clicks + " (RECORD!)";
    document.getElementById("record").innerHTML = clicks;
    courseraApi.callMethod({
      type: "SET_STORED_VALUES",
      data: {recordScore: clicks},
    });
  }
}

function setupGame() {
  clearInterval(timer);
  timerStarted = false;
  clicks = 0;
  document.getElementById("timer").innerHTML = config.timer;
  document.getElementById("clicks").innerHTML = 0;
  if (activeCell)
    activeCell.style.backgroundColor = "white";
  markRandCell();
}

function makeGrid() {
  var container = document.getElementById("grid")
  for(var i = 0; i < config.gridSize; i++){
    var row = document.createElement("div");
    for(var j = 0; j < config.gridSize; j++){
        var cell = document.createElement("div");
        cell.className = "cell";
        cell.id = "r" + i + "c" + j;
        row.appendChild(cell);
    }
    container.appendChild(row);
  }
}

function markRandCell() {
  var i = Math.floor(Math.random() * config.gridSize)
  var j = Math.floor(Math.random() * config.gridSize)
  activeCell = document.getElementById("r" + i + "c" + j);
  activate();
}

function startTimer() {
  var end = new Date().getTime() + config.timer * 1000;

  timer = setInterval(function() {
    var rem = end - new Date().getTime();
    var secs = Math.floor(rem / 100) / 10;
    var elem = document.getElementById("timer");

    if (rem <= 0) {
      clearInterval(timer);
      activeCell.removeEventListener("click", deactivate);
      getRecordAndCall(seeIfRecord);
      elem.innerHTML = "DONE!";
    } else {
      elem.innerHTML = secs;
    }
  }, 100);
}

function updateClicks() {
  clicks++;
  document.getElementById("clicks").innerHTML = clicks;
}

function activate() {
  activeCell.addEventListener("click", deactivate, {once: true});
  activeCell.style.backgroundColor = "green";
}

function deactivate() {
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }
  activeCell.style.backgroundColor = "white";
  updateClicks();
  markRandCell();
}
