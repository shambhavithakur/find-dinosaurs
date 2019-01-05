function init() {
  let allImages = document.querySelectorAll("img");
  let length = allImages.length;
  for (let i = 0; i < length; i++) {
    allImages[i].parentNode.removeChild(allImages[i]);
  }

  const buttons = document.querySelectorAll(".board > button");
  const imgDivs = document.querySelectorAll(".img-board > div");
  const shader = document.querySelector(".shader");
  let counter = 0;
  let startTime = 0;
  let totalTime = 0;
  let identifiedDinoParts = 0;
  let totalDinoParts = 0;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "";
    buttons[i].classList.add("col" + i);
  }

  for (let i = 0; i < imgDivs.length; i++) {
    imgDivs[i].classList.remove("fade-in");
  }

  shader.classList.remove("visible");

  const parentDino1 = {
    length: 1,
    spanClass: "span1",
    totalPerLevel: 2,
    sourceDino1: "images/dino1.png"
  };
  const parentDino2 = {
    length: 2,
    spanClass: "span2",
    totalPerLevel: 1,
    sourceDino2: "images/dino2.png"
  };
  const parentDino3 = {
    length: 2,
    spanClass: "span2",
    totalPerLevel: 1,
    sourceDino3: "images/dino3.png"
  };
  const parentDino4 = {
    length: 3,
    spanClass: "span3",
    totalPerLevel: 1,
    sourceDino4: "images/dino4.png"
  };

  let imageLinkedButtonClasses = [];

  let gameModel0 = {
    boardWidth: 4,
    boardLevels: 12,
    cellWidth: 64,
    dino1: {
      beginLevel: 0,
      endLevel: 5,
      leftPositions: [],
      totalSelectedCells: []
    },
    dino2: {
      beginLevel: 6,
      endLevel: 9,
      leftPositions: [],
      totalSelectedCells: []
    },
    dino3: {
      beginLevel: 6,
      endLevel: 9,
      leftPositions: [],
      totalSelectedCells: []
    },
    dino4: {
      beginLevel: 10,
      endLevel: 11,
      leftPositions: [],
      totalSelectedCells: []
    }
  };

  if (window.matchMedia("(min-width: 350px)").matches) {
    gameModel0.boardWidth = 5;
    gameModel0.boardLevels = 10;
    gameModel0.dino1.endLevel = 4;
    gameModel0.dino2.beginLevel = 5;
    gameModel0.dino2.endLevel = 7;
    gameModel0.dino3.beginLevel = 5;
    gameModel0.dino3.endLevel = 7;
    gameModel0.dino4.beginLevel = 8;
    gameModel0.dino4.endLevel = 9;
  }
  if (window.matchMedia("(min-width: 432px)").matches) {
    parentDino2.totalPerLevel = 2;
    parentDino3.totalPerLevel = 2;
    gameModel0.boardWidth = 6;
    gameModel0.boardLevels = 8;
    gameModel0.dino1.endLevel = 3;
    gameModel0.dino2.beginLevel = 4;
    gameModel0.dino2.endLevel = 5;
    gameModel0.dino3.beginLevel = 4;
    gameModel0.dino3.endLevel = 5;
    gameModel0.dino4.beginLevel = 6;
    gameModel0.dino4.endLevel = 7;
  }
  if (window.matchMedia("(min-width: 530px)").matches) {
    parentDino1.totalPerLevel = 3;
  }
  if (window.matchMedia("(min-width: 725px)").matches) {
    parentDino4.totalPerLevel = 2;
    gameModel0.boardWidth = 8;
    gameModel0.boardLevels = 6;
    gameModel0.dino1.endLevel = 1;
    gameModel0.dino2.beginLevel = 2;
    gameModel0.dino2.endLevel = 3;
    gameModel0.dino3.beginLevel = 2;
    gameModel0.dino3.endLevel = 3;
    gameModel0.dino4.beginLevel = 4;
    gameModel0.dino4.endLevel = 5;
  }

  function showShader() {
    shader.classList.add("visible");
    document.querySelector(".total-time").textContent = totalTime;
  }

  function generateLocationsAtLevel(parentDinoNum, gameModelNum, levelNum) {
    let cellSelectors = [];
    let levelPositions = [];
    while (cellSelectors.length < parentDinoNum.totalPerLevel) {
      let cellSelector = 0;
      if (parentDinoNum.length === 1) {
        cellSelector = Math.floor(Math.random() * gameModelNum.boardWidth);
      } else if (parentDinoNum.length === 2) {
        let width = gameModelNum.boardWidth - 1;
        cellSelector = Math.floor(Math.random() * width);
      } else if (parentDinoNum.length === 3) {
        let width = gameModelNum.boardWidth - 2;
        cellSelector = Math.floor(Math.random() * width);
      }
      leftPosition = cellSelector * gameModelNum.cellWidth;
      cellSelector += levelNum * gameModelNum.boardWidth;
      if (!cellSelectors.includes(cellSelector)) {
        levelPositions.push(leftPosition);
        cellSelectors.push(cellSelector);
      }

      if (window.matchMedia("(min-width: 432px)").matches) {
        if (parentDinoNum.length === 2) {
          if (
            !cellSelectors.includes(cellSelector) &&
            !cellSelectors.includes(cellSelector + 1) &&
            !cellSelectors.includes(cellSelector - 1)
          ) {
            levelPositions.push(leftPosition);
            console.log("cell selector is " + cellSelector);
            cellSelectors.push(cellSelector);
          }
        }
      }
    }

    if (parentDinoNum.hasOwnProperty("sourceDino1")) {
      gameModelNum.dino1.leftPositions.push(levelPositions);
      gameModelNum.dino1.totalSelectedCells.push(cellSelectors);
    } else if (parentDinoNum.hasOwnProperty("sourceDino2")) {
      gameModelNum.dino2.leftPositions.push(levelPositions);
      gameModelNum.dino2.totalSelectedCells.push(cellSelectors);
    } else if (parentDinoNum.hasOwnProperty("sourceDino3")) {
      gameModelNum.dino3.leftPositions.push(levelPositions);
      gameModelNum.dino3.totalSelectedCells.push(cellSelectors);
    } else if (parentDinoNum.hasOwnProperty("sourceDino4")) {
      gameModelNum.dino4.leftPositions.push(levelPositions);
      gameModelNum.dino4.totalSelectedCells.push(cellSelectors);
    }

    console.log("left positions Dino2 " + gameModelNum.dino2.leftPositions);
    console.log(
      "total selected cells Dino2 " + gameModelNum.dino2.totalSelectedCells
    );
  }

  function generateDino1(gameModelNum) {
    let totalLevels =
      gameModelNum.dino1.endLevel - gameModelNum.dino1.beginLevel + 1;
    for (let i = 0; i < totalLevels; i++) {
      let levelNum = i + gameModelNum.dino1.beginLevel;
      level = "level" + levelNum;
      generateLocationsAtLevel(parentDino1, gameModelNum, levelNum);

      for (let j = 0; j < parentDino1.totalPerLevel; j++) {
        let leftPosition = gameModelNum.dino1.leftPositions[i][j];

        let thisCell = gameModelNum.dino1.totalSelectedCells[i][j];
        let imageDivClass = "img-col" + thisCell;
        let buttonClass = "col" + thisCell;
        if (!imageLinkedButtonClasses.includes(buttonClass)) {
          imageLinkedButtonClasses.push(buttonClass);
          let imageDiv = document.querySelector("." + imageDivClass);
          let newImage = document.createElement("img");
          imageDiv.appendChild(newImage);
          newImage.src = parentDino1.sourceDino1;
          newImage.style.left = leftPosition + "px";
          newImage.classList.add("placed", "span1", level);

          let buttonCell = document.querySelector("." + buttonClass);
          buttonCell.classList.add("dino1");
        }
      }
    }
  }

  function generateDino2(gameModelNum) {
    let totalLevels =
      gameModelNum.dino2.endLevel - gameModelNum.dino2.beginLevel + 1;
    let dinoCounter = 1;
    for (let i = 0; i < totalLevels; i++) {
      let levelNum = i + gameModelNum.dino2.beginLevel;
      level = "level" + levelNum;
      generateLocationsAtLevel(parentDino2, gameModelNum, levelNum);

      if (levelNum % 2 === 0) {
        for (let j = 0; j < parentDino2.totalPerLevel; j++) {
          let leftPosition = gameModelNum.dino2.leftPositions[i][j];

          let thisCell = gameModelNum.dino2.totalSelectedCells[i][j];
          let imageDivClass = "img-col" + thisCell;
          let buttonClass = "col" + thisCell;
          if (!imageLinkedButtonClasses.includes(buttonClass)) {
            imageLinkedButtonClasses.push(buttonClass);
            let imageDiv = document.querySelector("." + imageDivClass);
            let newImage = document.createElement("img");
            imageDiv.appendChild(newImage);
            newImage.src = parentDino2.sourceDino2;
            newImage.style.left = leftPosition + "px";
            newImage.classList.add("placed", "span2", level);
            let isFlipped = Math.floor(Math.random() * 2);
            if (isFlipped === 1) {
              newImage.classList.add("flip");
            }

            let buttonCell = document.querySelector("." + buttonClass);
            buttonCell.classList.add("dino2", "dino2" + dinoCounter);
            buttonCell.nextElementSibling.classList.add(
              "dino2",
              "dino2" + dinoCounter
            );
          }
        }
        dinoCounter += 1;
      }
    }
  }

  function generateDino3(gameModelNum) {
    let totalLevels =
      gameModelNum.dino3.endLevel - gameModelNum.dino3.beginLevel + 1;
    let dinoCounter = 1;
    for (let i = 0; i < totalLevels; i++) {
      let levelNum = i + gameModelNum.dino3.beginLevel;
      level = "level" + levelNum;
      generateLocationsAtLevel(parentDino3, gameModelNum, levelNum);

      if (levelNum % 2 !== 0) {
        for (let j = 0; j < parentDino3.totalPerLevel; j++) {
          let leftPosition = gameModelNum.dino3.leftPositions[i][j];

          let thisCell = gameModelNum.dino3.totalSelectedCells[i][j];
          let imageDivClass = "img-col" + thisCell;
          let buttonClass = "col" + thisCell;
          if (!imageLinkedButtonClasses.includes(buttonClass)) {
            imageLinkedButtonClasses.push(buttonClass);
            let imageDiv = document.querySelector("." + imageDivClass);
            let newImage = document.createElement("img");
            imageDiv.appendChild(newImage);
            newImage.src = parentDino3.sourceDino3;
            newImage.style.left = leftPosition + "px";
            newImage.classList.add("placed", "span2", level);
            let isFlipped = Math.floor(Math.random() * 2);
            if (isFlipped === 1) {
              newImage.classList.add("flip");
            }

            let buttonCell = document.querySelector("." + buttonClass);
            buttonCell.classList.add("dino3", "dino3" + dinoCounter);
            buttonCell.nextElementSibling.classList.add(
              "dino3",
              "dino3" + dinoCounter
            );
          }
        }
        dinoCounter += 1;
      }
    }
  }

  function generateDino4(gameModelNum) {
    let totalLevels =
      gameModelNum.dino4.endLevel - gameModelNum.dino4.beginLevel;
    let dinoCounter = 1;
    for (let i = 0; i < totalLevels; i++) {
      let levelNum = i + gameModelNum.dino4.beginLevel;
      level = "level" + levelNum;
      generateLocationsAtLevel(parentDino4, gameModelNum, levelNum);

      for (let j = 0; j < parentDino4.totalPerLevel; j++) {
        let leftPosition = gameModelNum.dino4.leftPositions[i][j];
        let thisCell = gameModelNum.dino4.totalSelectedCells[i][j];
        let imageDivClass = "img-col" + thisCell;
        let buttonClass = "col" + thisCell;
        if (!imageLinkedButtonClasses.includes(buttonClass)) {
          imageLinkedButtonClasses.push(buttonClass);
          let imageDiv = document.querySelector("." + imageDivClass);
          let newImage = document.createElement("img");
          imageDiv.appendChild(newImage);
          newImage.src = parentDino4.sourceDino4;
          newImage.style.left = leftPosition + "px";
          newImage.classList.add("placed", "span3", level);
          let isFlipped = Math.floor(Math.random() * 2);
          if (isFlipped === 1) {
            newImage.classList.add("flip");
          }

          let buttonCell = document.querySelector("." + buttonClass);
          buttonCell.classList.add("dino4", "dino4" + dinoCounter);
          buttonCell.nextElementSibling.classList.add(
            "dino4",
            "dino4" + dinoCounter
          );
          buttonCell.nextElementSibling.nextElementSibling.classList.add(
            "dino4",
            "dino4" + dinoCounter
          );
          let row2StartCell = thisCell + gameModelNum.boardWidth;
          let row2StartClass = "col" + row2StartCell;
          let row2StartDiv = document.querySelector("." + row2StartClass);
          row2StartDiv.classList.add("dino4", "dino4" + dinoCounter);
          row2StartDiv.nextElementSibling.classList.add(
            "dino4",
            "dino4" + dinoCounter
          );
          row2StartDiv.nextElementSibling.nextElementSibling.classList.add(
            "dino4",
            "dino4" + dinoCounter
          );
        }
        dinoCounter += 1;
      }
    }
  }

  generateDino1(gameModel0);
  generateDino2(gameModel0);
  generateDino3(gameModel0);
  generateDino4(gameModel0);

  totalDinoParts =
    document.querySelectorAll(".dino1").length +
    document.querySelectorAll(".dino2").length +
    document.querySelectorAll(".dino3").length +
    document.querySelectorAll(".dino4").length;

  function addClasses() {
    if (counter === 0) {
      counter++;
      startTime = Date.now();
    }
    if (identifiedDinoParts < totalDinoParts) {
      if (
        this.classList.contains("dino1") ||
        this.classList.contains("dino2") ||
        this.classList.contains("dino3") ||
        this.classList.contains("dino4")
      ) {
        this.classList.add("found", "fluke");
        identifiedDinoParts += 1;
        if (this.classList.contains("dino1")) {
          this.classList.add("found-all-parts");
          let classesString = this.className;
          let classesArray = classesString.split(" ");
          let imgDivClass = "img-" + classesArray[0];
          document.querySelector("." + imgDivClass).classList.add("fade-in");
        } else if (this.classList.contains("dino2")) {
          let classesString = this.className;
          let classesArray = classesString.split(" ");
          let imgPartClass = classesArray[2];
          let detectedParts = document.getElementsByClassName(imgPartClass);
          let dino2FoundCounter = 0;
          for (let i = 0; i < detectedParts.length; i++) {
            if (!detectedParts[i].classList.contains("fluke")) {
              return false;
            } else {
              dino2FoundCounter += 1;
            }
          }
          if (dino2FoundCounter === 2) {
            for (let i = 0; i < detectedParts.length; i++) {
              detectedParts[i].classList.add("found-all-parts");
              let classesString = detectedParts[i].className;
              let classesArray = classesString.split(" ");
              let imgDivClass = "img-" + classesArray[0];
              document
                .querySelector("." + imgDivClass)
                .classList.add("fade-in");
            }
          }
        } else if (this.classList.contains("dino3")) {
          let classesString = this.className;
          let classesArray = classesString.split(" ");
          let imgPartClass = classesArray[2];
          let detectedParts = document.getElementsByClassName(imgPartClass);
          let dino3FoundCounter = 0;
          for (let i = 0; i < detectedParts.length; i++) {
            if (!detectedParts[i].classList.contains("fluke")) {
              return false;
            } else {
              dino3FoundCounter += 1;
            }
          }
          if (dino3FoundCounter === 2) {
            for (let i = 0; i < detectedParts.length; i++) {
              detectedParts[i].classList.add("found-all-parts");
              let classesString = detectedParts[i].className;
              let classesArray = classesString.split(" ");
              let imgDivClass = "img-" + classesArray[0];
              document
                .querySelector("." + imgDivClass)
                .classList.add("fade-in");
            }
          }
        } else if (this.classList.contains("dino4")) {
          let classesString = this.className;
          let classesArray = classesString.split(" ");
          let imgPartClass = classesArray[2];
          let detectedParts = document.getElementsByClassName(imgPartClass);
          let dino4FoundCounter = 0;
          for (let i = 0; i < detectedParts.length; i++) {
            if (!detectedParts[i].classList.contains("fluke")) {
              return false;
            } else {
              dino4FoundCounter += 1;
            }
          }
          if (dino4FoundCounter === 6) {
            for (let i = 0; i < detectedParts.length; i++) {
              detectedParts[i].classList.add("found-all-parts");
              let classesString = detectedParts[i].className;
              let classesArray = classesString.split(" ");
              let imgDivClass = "img-" + classesArray[0];
              document
                .querySelector("." + imgDivClass)
                .classList.add("fade-in");
            }
          }
        }
      } else {
        this.classList.add("zilch");
      }
    }
    if (identifiedDinoParts === totalDinoParts) {
      for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].classList.contains("found")) {
          buttons[i].classList.add("zilch");
        }
      }
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener("click", addClasses);
      }
      totalTime = Math.floor(Date.now() - startTime) / 1000;
      shader.classList.add("visible");
      document.querySelector(".total-time").textContent = totalTime;
      showShader();
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", addClasses);
  }
}

init();

document.querySelector(".modal-button").addEventListener("click", init);
