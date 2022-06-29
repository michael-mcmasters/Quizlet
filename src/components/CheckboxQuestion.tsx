import React, { useEffect, useState } from 'react';
import styles from "../styles/CheckboxQuestion.module.css";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  question: string;
  correctAnswers: string[];
  allAnswers: string[];
  wrongAnswers: string[];
}

const minimumNumOfwrongAnswers = 3;


function CheckboxQuestion(props: Props) {
  
  const [answers, setAnswers] = useState<string[]>([]);
  const [correctAnswerIndexes, setCorrectAnswerIndexes] = useState<number[]>([]);
  const [clickedIndexes, setClickedIndexes] = useState<number[]>([]);
  const [backgroundColor, setBackgroundColor] = useState('');
  
  
  useEffect(() => {
    (function generateAnswers() {
      // Fill array with random answers
      const wrongAnswersCount = (props.wrongAnswers.length >= minimumNumOfwrongAnswers) ? props.wrongAnswers.length : minimumNumOfwrongAnswers;
      const allAnswersCount = props.correctAnswers.length + wrongAnswersCount;
      const answers: string[] = getRandomAnswers(props.allAnswers, allAnswersCount, props.correctAnswers);

      // Replace random indexes with the the given wrong answers
      const usedIndexes: number[] = [];
      for (let w of props.wrongAnswers) {
        const wrongAnswerIndex = getRandomIndexIgnoring(answers.length, usedIndexes);
        answers[wrongAnswerIndex] = w;
        usedIndexes.push(wrongAnswerIndex);
      }

      // Replace random indexes with the given correct answers
      const correctAnswerIndexes = [];
      for (let c of props.correctAnswers) {
        const correctAnswerIndex: number = getRandomIndexIgnoring(answers.length, usedIndexes);
        answers[correctAnswerIndex] = c;
        correctAnswerIndexes.push(correctAnswerIndex);
        usedIndexes.push(correctAnswerIndex);
      }

      setAnswers(answers);
      setCorrectAnswerIndexes(correctAnswerIndexes);
    })();
  }, [props.allAnswers])

  
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
              <div key={uuidv4()} className={styles.answerContainer} onClick={() => handleClickAnswer(index)}>
                <input type="checkbox" checked={isClicked} />
                <label className={styles.answer}>{answer}</label>
              </div>
            );
          })}
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <br />
    </>
  );
}

// Returns an array of unique answers (no duplicates). Param is copied so that passed array is not modified.
function getRandomAnswers([...answers]: string[], numOfAnswers: number, correctAnswers: string[]) {
  for (const correctAnswer of correctAnswers) {
    answers.splice(answers.findIndex(a => a === correctAnswer), 1);
  }

  const getRandomUniqueAnswer = (): string => {
    const index: number = getRandomIndex(answers.length);
    const answer = answers[index];
    answers.splice(index, 1);
    return answer;
  }

  const randomAnswers = [];
  for (let i = 0; i < numOfAnswers; i++) {
    randomAnswers.push(getRandomUniqueAnswer());
  }
  return randomAnswers;
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