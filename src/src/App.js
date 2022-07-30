import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import { nanoid } from "nanoid";

function App() {
  const [questionData, setQuestionData] = useState([]);
  let [points, setPoints] = useState(0);

  function fetchApi() {
    console.log("fetch");
    const apiURL =
      "https://opentdb.com/api.php?amount=4&difficulty=medium&type=boolean";
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        let qs = [];
        for (let i = 0; i < 4; i++) {
          qs.push({
            id: nanoid(),
            question: data.results[i].question,
            correctAnswer: data.results[i].correct_answer,
            choosenAnswer: "",
            colortrue: "",
            colorfalse: "",
          });
        }
        setQuestionData(qs);
        setPoints(0);
      });
  }

  function showAnswer() {
    let dummyArray = questionData;
    for (let i = 0; i < 4; i++) {
      dummyArray[i].correctAnswer === "True"
        ? (dummyArray[i].colortrue = "#CCFFCC")
        : (dummyArray[i].colorfalse = "#CCFFCC");

      if (dummyArray[i].correctAnswer === dummyArray[i].choosenAnswer) {
        setPoints((prevPoints) => prevPoints + 1);
      }

      if (
        dummyArray[i].correctAnswer === "True" &&
        dummyArray[i].choosenAnswer === "False"
      ) {
        dummyArray[i].colorfalse = "#FFBDBD";
      } else if (
        dummyArray[i].correctAnswer === "False" &&
        dummyArray[i].choosenAnswer === "True"
      ) {
        dummyArray[i].colortrue = "#FFBDBD";
      }
    }

    setQuestionData([...dummyArray]);
  }

  function setValue(value, id) {
    let dummyArray = questionData;
    for (let i = 0; i < 4; i++) {
      if (dummyArray[i].id === id) {
        dummyArray[i].choosenAnswer = value;
        if (value === "True") {
          dummyArray[i].colortrue = "#FFE285";
          dummyArray[i].colorfalse = "#FFF";
        } else {
          dummyArray[i].colorfalse = "#FFE285";
          dummyArray[i].colortrue = "#FFF";
        }
      }
    }

    setQuestionData([...dummyArray]);
  }

  useEffect(fetchApi, []);

  return (
    <div className="App">
      <div className="title">
        <h1>My Quiz App</h1>
      </div>
      {questionData.length > 0
        ? questionData.map((item) => (
            <Question
              key={item.id}
              id={item.id}
              question={item.question}
              correctAnswer={item.correctAnswer}
              choosenAnswer={item.choosenAnswer}
              setValue={setValue}
              colortrue={item.colortrue}
              colorfalse={item.colorfalse}
            />
          ))
        : ""}

      <div className="navigator">
        <button onClick={showAnswer}>Click</button>
        <button onClick={fetchApi}>New Game</button>
      </div>
      <div className="points">{points}/4</div>
    </div>
  );
}

export default App;
