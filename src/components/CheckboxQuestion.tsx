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
    const clickedIndexesCopy = [ ...clickedIndexes, clickedIndex ];
    setClickedIndexes(clickedIndexesCopy);
    
    // Verify all answers so far are correct, if not, mark red
    for (let c of clickedIndexesCopy) {
      if (!correctAnswerIndexes.includes(c)) {
        setBackgroundColor("red");
        return;
      }
    }
    
    // All answers so far are correct. Check that user has clicked all possible answers
    if (correctAnswerIndexes.length === clickedIndexesCopy.length) {
      setBackgroundColor("green");
    } else {
      setBackgroundColor("orange");
    }
  }
  
  
  return (
    <>
      <div className={styles.container} style={{backgroundColor: backgroundColor}}>
        {props.question}
        <div>
          {answers.map((answer, index) => (
            <div className={styles.answerContainer} onClick={() => handleClickAnswer(index)}>
              <div>{alphabet[index]}.</div>
              <div className={styles.answer}>{answer}</div>
            </div>
          ))}
        </div>
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