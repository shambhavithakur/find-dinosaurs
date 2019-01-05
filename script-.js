function init() {
  let counter = 0;
  let startTime = 0;
  let totalTime = 0;
  let levelNum = 0;
  let identifiedTreasures = 0;
  let cellSelector = 0;
  let selectorList = [];
  let totalPerLevelDino1 = 0;
  let totalPerLevelDino2 = 0;
  let totalPerLevelDino3 = 0;
  let totalPerLevelDino4 = 0;
  let rowPositions = [];
  let positionsDino1 = { leftPositions: [], cellPositions: [] };
  let positionsDino2 = { leftPositions: [], cellPositions: [] };
  let positionsDino3 = { leftPositions: [], cellPositions: [] };
  let positionsDino4 = { leftPositions: [], cellPositions: [] };
  const spanNumDino1 = "span1";
  const spanNumDino2 = "span2";
  const spanNumDino3 = "span2";
  const spanNumDino4 = "span3";
  const lengthDino1 = 1;
  const lengthDino2 = 2;
  const lengthDino3 = 2;
  const lengthDino4 = 3;
  const sourceDino1 = "images/dino1.png";
  const sourceDino2 = "images/dino2.png";
  const sourceDino3 = "images/dino3.png";
  const sourceDino4 = "images/dino4.png";
  const cells = document.querySelectorAll(".board > button");
  const shader = document.querySelector(".shader");

  for (let i = 0; i < cells.length; i++) {
    cells[i].classList.remove(
      "dino",
      "td",
      "fluke",
      "zilch",
      "selected",
      "game-over"
    );
  }

  shader.classList.remove("visible");

  if (window.matchMedia("(max-width: 349px)").matches) {
    totalPerLevelDino1 = 2;
    totalPerLevelDino2 = 1;
    totalPerLevelDino3 = 1;
    totalPerLevelDino4 = 1;

    let gameModel1 = {
      boardSize: 4,
      cellWidth: 64,
      beginLevelDino1: 0,
      endLevelDino1: 5,
      beginLevelDino2: 6,
      endLevelDino2: 9,
      beginLevelDino3: 6,
      endLevelDino3: 9,
      beginLevelDino4: 10,
      endLevelDino4: 11,
      foundDinosaurs: 0
    };

    generateDino1(gameModel1);
    generateDino2(gameModel1);
    generateDino3(gameModel1);
    generateDino4(gameModel1);
  }

  if (window.matchMedia("(min-width: 350px)").matches) {
    let allImages = document.getElementsByTagName("img");
    for (let i = 0; i < allImages.length; i++) {
      allImages[i].parentNode.removeChild(allImages[i]);
    }
    totalPerLevelDino1 = 3;
    totalPerLevelDino2 = 1;
    totalPerLevelDino3 = 1;
    totalPerLevelDino4 = 1;
    let gameModel2 = {
      boardSize: 5,
      cellWidth: 64,
      beginLevelDino1: 0,
      endLevelDino1: 4,
      beginLevelDino2: 5,
      endLevelDino2: 7,
      beginLevelDino3: 5,
      endLevelDino3: 7,
      beginLevelDino4: 8,
      endLevelDino4: 9,
      foundDinosaurs: 0
    };
    generateDino1(gameModel2);
    generateDino2(gameModel2);
    generateDino3(gameModel2);
    generateDino4(gameModel2);
  }

  function generatePositions(
    gameModelNum,
    spanNum,
    lengthDinoNum,
    totalPerLevelDinoNum,
    positionsDinoNum
  ) {
    let rowPositions = [];
    let perRowCellPositions = [];

    while (rowPositions.length < totalPerLevelDinoNum) {
      if (spanNum === spanNumDino1) {
        cellSelector = Math.floor(Math.random() * gameModelNum.boardSize);
      } else if (spanNum === spanNumDino2 || spanNum === spanNumDino3) {
        let size = gameModelNum.boardSize - 1;
        cellSelector = Math.floor(Math.random() * size);
      } else if (spanNum === spanNumDino4) {
        let size = gameModelNum.boardSize - 2;
        cellSelector = Math.floor(Math.random() * size);
      }

      leftPosition = cellSelector * gameModelNum.cellWidth;

      let thisImageLocations = [];

      if (!rowPositions.includes(leftPosition)) {
        rowPositions.push(leftPosition);
        if (spanNum === spanNumDino1) {
          thisImageLocations.push("col" + cellSelector);
        } else if (spanNum === spanNumDino2) {
          thisImageLocations.push("col" + cellSelector);
          let position2 = cellSelector + 1;
          thisImageLocations.push("col" + position2);
        } else if (spanNum === spanNumDino3) {
          for (let i = 0; i < lengthDinoNum * 2; i++) {
            let positionValue1 = cellSelector + i;
            thisImageLocations.push("col" + positionValue1);
            let positionValue2 = cellSelector + gameModelNum.boardSize + 1 + i;
            thisImageLocations.push("col" + positionValue2);
          }
        } else if (spanNum === spanNumDino4) {
          for (let i = 0; i < lengthDinoNum * 2; i++) {
            let positionValue1 = cellSelector + i;
            thisImageLocations.push("col" + positionValue1);
            let positionValue2 = cellSelector + gameModelNum.boardSize + 1 + i;
            thisImageLocations.push("col" + positionValue2);
          }
        }
      }

      perRowCellPositions.push(thisImageLocations);
      // console.log("per row cell pos " + perRowCellPositions);
    }
    positionsDinoNum.leftPositions.push(rowPositions);
    positionsDinoNum.cellPositions.push(perRowCellPositions);
    // console.log("left positions" + positionsDinoNum.leftPositions);
    // console.log("per row cell positions " + perRowCellPositions);
    // console.log(
    //   positionsDinoNum + "all cell positions " + positionsDinoNum.cellPositions
    // );
    // console.log("Cell positions " + positionsDinoNum.cellPositions);
    // console.log("left positions all" + positionsDinoNum.leftPositions);
  }

  function insertImage(source, spanNum, levelNum, leftPositionNum) {
    const parentElement = document.querySelector("main");
    const firstChild = document.querySelector(".board");
    let newImage = document.createElement("img");
    parentElement.insertBefore(newImage, firstChild);
    newImage.classList.add("placed", spanNum, levelNum);
    newImage.src = source;
    newImage.style.left = leftPositionNum + "px";
    let isFlipped = Math.floor(Math.random() * 2);
    if (isFlipped === 1) {
      newImage.classList.add("flip");
    }
  }

  function generateDino1(gameModelNum) {
    for (
      let i = gameModelNum.beginLevelDino1;
      i <= gameModelNum.endLevelDino1;
      i++
    ) {
      levelNum = "level" + i;
      // console.log("level number is " + levelNum);
      generatePositions(
        gameModelNum,
        spanNumDino1,
        lengthDino1,
        totalPerLevelDino1,
        positionsDino1
      );
      for (let j = 0; j < totalPerLevelDino1; j++) {
        let leftPosition = positionsDino1.leftPositions[i][j];
        // console.log("left positions " + positionsDino1.leftPositions);
        insertImage(sourceDino1, spanNumDino1, levelNum, leftPosition);
      }
    }
  }

  function generateDino2(gameModelNum) {
    let totalLevels =
      gameModelNum.endLevelDino2 - gameModelNum.beginLevelDino2 + 1;
    for (let i = 0; i < totalLevels; i++) {
      let levelValue = i + gameModelNum.beginLevelDino2;
      levelNum = "level" + levelValue;
      console.log("level number is " + levelNum);
      generatePositions(
        gameModelNum,
        spanNumDino2,
        lengthDino2,
        totalPerLevelDino2,
        positionsDino2
      );
      for (let j = 0; j < totalPerLevelDino2; j++) {
        let leftPosition = positionsDino2.leftPositions[i][j];
        if (levelValue % 2 === 0) {
          insertImage(sourceDino2, spanNumDino2, levelNum, leftPosition);
        }
      }
      console.log(
        "left positions 2 from max-width 349 " + positionsDino2.leftPositions
      );
    }
  }

  function generateDino3(gameModelNum) {
    let totalLevels =
      gameModelNum.endLevelDino3 - gameModelNum.beginLevelDino3 + 1;
    for (let i = 0; i < totalLevels; i++) {
      let levelValue = i + gameModelNum.beginLevelDino3;
      levelNum = "level" + levelValue;
      // console.log("level number is " + levelNum);
      generatePositions(
        gameModelNum,
        spanNumDino3,
        lengthDino3,
        totalPerLevelDino3,
        positionsDino3
      );
      for (let j = 0; j < totalPerLevelDino3; j++) {
        let leftPosition = positionsDino3.leftPositions[i][j];
        if (levelValue % 2 !== 0) {
          insertImage(sourceDino3, spanNumDino3, levelNum, leftPosition);
        }
      }
      // console.log("left positions 3 " + positionsDino3.leftPositions);
    }
  }

  function generateDino4(gameModelNum) {
    let totalLevels = gameModelNum.endLevelDino4 - gameModelNum.beginLevelDino4;
    for (let i = 0; i < totalLevels; i++) {
      let levelValue = i + gameModelNum.beginLevelDino4;
      levelNum = "level" + levelValue;
      // console.log("level number is " + levelNum);
      generatePositions(
        gameModelNum,
        spanNumDino4,
        lengthDino4,
        totalPerLevelDino4,
        positionsDino4
      );
      for (let j = 0; j < totalPerLevelDino4; j++) {
        let leftPosition = positionsDino4.leftPositions[i][j];
        insertImage(sourceDino4, spanNumDino4, levelNum, leftPosition);
      }
      // console.log("left positions 4 " + positionsDino4.leftPositions);
    }
  }

  function showShader() {
    shader.classList.add("visible");
    document.querySelector(".total-time").textContent = totalTime;
  }

  // function addIcons() {
  //   if (counter === 0) {
  //     counter++;
  //     startTime = Date.now();
  //   }
  //   if (identifiedTreasures < selectorList.length) {
  //     if (this.classList.contains("dino")) {
  //       this.classList.add("fluke", "selected");
  //       identifiedTreasures++;
  //     } else {
  //       this.classList.add("zilch", "selected");
  //     }
  //   }
  //   if (identifiedTreasures === selectorList.length) {
  //     for (let i = 0; i < cells.length; i++) {
  //       if (!cells[i].classList.contains("selected")) {
  //         cells[i].classList.add("zilch", "game-over");
  //       }
  //     }
  //     totalTime = Math.floor(Date.now() - startTime) / 1000;
  //     shader.classList.add("visible");
  //     document.querySelector(".total-time").textContent = totalTime;
  //     showShader();
  //   }
  // }

  // locateDino();

  // for (let i = 0; i < cells.length; i++) {
  //   if (!cells[i].classList.contains("dino")) {
  //     cells[i].classList.add("td");
  //   }
  // }

  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].addEventListener("click", addIcons);
  // }
}

init();

document.querySelector(".modal-button").addEventListener("click", init);
