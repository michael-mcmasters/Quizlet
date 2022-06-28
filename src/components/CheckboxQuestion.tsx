import React, { useEffect, useState } from 'react';
import styles from "../styles/CheckboxQuestion.module.css";

interface Props {
  question: string;
  correctAnswers: string[];
  allAnswers: string[];
}

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


function CheckboxQuestion(props: Props) {
  
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState<number[]>([]);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [backgroundColor, setBackgroundColor] = useState('');
  
  // Always makes sure there are at least 2 wrong answers
  useEffect(() => {
    (function generateAnswers() {
      const wrongIndex1 = getRandomIndex(props.allAnswers.length);
      const wrongIndex2 = getRandomIndexIgnoring(props.allAnswers.length, [wrongIndex1]);
      setAnswers([...props.correctAnswers, props.allAnswers[wrongIndex1], props.allAnswers[wrongIndex2]])
      
      const correctAnswerIndexes = [];
      for (let i = 0; i < props.correctAnswers.length; i++) {
        correctAnswerIndexes.push(i);
      }
      setCorrectAnswerIndexes(correctAnswerIndexes);
    })();
  }, [])
  
  
  function handleClickAnswer(clickedIndex: number) {
    const clickedIndexesCopy = [...clickedIndexes ];
    if (!clickedIndexes.includes(clickedIndex)) {
      clickedIndexesCopy.push(clickedIndex);
    } else {
      const index = clickedIndexesCopy.indexOf(clickedIndex);
      clickedIndexesCopy.splice(index, 1)
    }
    setClickedIndexes(clickedIndexesCopy);
  }
  

  function handleSubmit() {
    if (correctAnswerIndexes.length !== clickedIndexes.length) {
      setBackgroundColor("red");
      return;
    }
    
    // Verify all answers are correct
    for (let c of clickedIndexes) {
      if (!correctAnswerIndexes.includes(c)) {
        setBackgroundColor("red");
        return;
      }
    }
    
    setBackgroundColor("green");
  }
  
  
  return (
    <>
      <div className={styles.container} style={{backgroundColor: backgroundColor}}>
        {props.question}
          {answers.map((answer, index) => {
            const isClicked = clickedIndexes.includes(index);
            return (
              <div className={styles.answerContainer} onClick={() => handleClickAnswer(index)}>
                <input type="checkbox" checked={isClicked} />
                <label className={styles.answer}>{answer}</label>
              </div>
            );
          })}
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
    </>
  );
}

function getRandomIndex(maxIndex: number): number {
  return Math.floor(Math.random() * maxIndex);
}

// Returns a random number less than maxIndex, and does not return numbers that appear in the ignoreIndexes array
function getRandomIndexIgnoring(maxIndex: number, ignoreIndexes: number[]): number {
  let randomIndex = getRandomIndex(maxIndex);
  while (ignoreIndexes.includes(randomIndex)) {
    randomIndex = getRandomIndex(maxIndex);
  }
  return randomIndex;
}

export default CheckboxQuestion;