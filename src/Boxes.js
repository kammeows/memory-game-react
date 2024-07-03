import React from "react";
import Header from "./Header.js";

const Board = () => {
  const [boxColors, setBoxColors] = React.useState([
    [28, 84, 92],
    [28, 84, 92],
    [60, 27, 107],
    [60, 27, 107],
    [120, 23, 115],
    [120, 23, 115],
    [143, 112, 29],
    [143, 112, 29],
    [33, 66, 112],
    [33, 66, 112],
    [74, 18, 23],
    [74, 18, 23],
  ]);

  const [count, setCount] = React.useState([0, 0, 0, 0, 0, 0]);
  const [shuffledColors, setShuffledColors] = React.useState([]);
  const [startOver, setStartOver] = React.useState(false);
  const [scoresArray, setScoresArray] = React.useState([]);
  const [isClicked, setIsClicked] = React.useState(false);
  const [boxesClicked, setBoxesClicked] = React.useState([]);
  const [score, setScore] = React.useState(0);

  function start() {
    setScoresArray([]);
    setBoxesClicked([]);
    setScore(0);
    setCount([0, 0, 0, 0, 0, 0]);
    setStartOver((prevState) => !prevState);
    console.log("game start,, ", shuffledColors);
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
      box.style.backgroundColor = "rgb(204, 204, 204)";
    });
  }

  React.useEffect(() => {
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };

    setShuffledColors(shuffleArray(boxColors));
  }, [startOver]);

  console.log("meow", shuffledColors);
  const boxes = document.querySelectorAll(".box");

  function changeColor(i) {
    setCount((prevCount) => {
      const newCount = [...prevCount];
      newCount[i] = newCount[i] + 1;

      boxes[i].style.backgroundColor = rgbToColor(shuffledColors[i]);

      return newCount;
    });

    setIsClicked(() => true);
    const currentColor = rgbToColor(shuffledColors[i]);
    setScoresArray((previtems) => [...previtems, currentColor]);
  }

  React.useEffect(() => {
    console.log("scores array updated: ", scoresArray);
  }, [scoresArray]);

  React.useEffect(() => {
    console.log("boxesClicked updated: ", boxesClicked);
    console.log(boxesClicked[0]);
  }, [boxesClicked]);

  const handleClick = (i) => {
    setBoxesClicked((previtems) => [...previtems, i]);
    changeColor(i);
  };

  if (scoresArray.length === 2) {
    if (scoresArray[0] !== scoresArray[1]) {
      setTimeout(() => {
        const boxes = document.querySelectorAll(".box");
        boxes[boxesClicked[0]].style.backgroundColor = "rgb(204, 204, 204)";
        boxes[boxesClicked[1]].style.backgroundColor = "rgb(204, 204, 204)";
      }, 1000);
    } else {
      setScore(score + 10);
    }

    setScoresArray([]);
    setBoxesClicked([]);
  }

  function rgbToColor(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  return (
    <>
      <Header score={score} />
      <div className="boxBoard">
        <div className="row">
          {Array.from({ length: 12 }, (_, i) => (
            <div className="box" onClick={() => handleClick(i)}></div>
          ))}
        </div>

        <button onClick={start}>Start Game</button>
      </div>
    </>
  );
};

export default Board;
