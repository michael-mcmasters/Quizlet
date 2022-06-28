import React, { useEffect, useState } from 'react';
import styles from "../styles/MultiQuestion.module.css"

interface Props {
  question: string;
  correctAnswer: string;
  allAnswers: string[];
  wrongAnswers: string[];
}

function MultiQuestion(props: Props) {
  
  const [answers, setAnswers] = useState<string[]>([])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>();
  const [backgroundColor, setBackgroundColor] = useState('');
  

  useEffect(() => {
    (function generateAnswers() {
      const answers: string[] = getRandomAnswers(props.allAnswers, props.correctAnswer);

      const usedIndexes: number[] = [];
      for (let w of props.wrongAnswers) {
        const wrongAnswerIndex = getRandomIndexIgnoring(answers.length, usedIndexes);
        answers[wrongAnswerIndex] = w;
        usedIndexes.push(wrongAnswerIndex);
        
        if (usedIndexes.length >= 3) {
          console.warn("There are more than 3 wrong answers provided for this question. Ignoring additional warnings as one slot must have correct answer.")
          break;
        }
      }

      const correctAnswerIndex: number = getRandomIndexIgnoring(answers.length, usedIndexes);
      answers[correctAnswerIndex] = props.correctAnswer;

      setAnswers(answers);
      setCorrectAnswerIndex(correctAnswerIndex);
    })();
  }, [props.allAnswers])

  
  function handleClickAnswer(clickedIndex: number) {
    if (clickedIndex === correctAnswerIndex) {
      console.log("correct!");
      setBackgroundColor('green');
    } else {
      console.log("wrong");
      setBackgroundColor('darkred');
    }
  }
  
  
  return (
    <div className={styles.container} style={{backgroundColor: backgroundColor}}>
      <div className={styles.question}>{props.question}</div>

      <div className={styles.answerContainer} onClick={() => handleClickAnswer(0)}>
        <div>A.</div>
        <div className={styles.answer}>{answers[0]}</div>
      </div>
      
      <div className={styles.answerContainer} onClick={() => handleClickAnswer(1)}>
        <div>B.</div>
        <div className={styles.answer}>{answers[1]}</div>
      </div>
      
      <div className={styles.answerContainer} onClick={() => handleClickAnswer(2)}>
        <div>C.</div>
        <div className={styles.answer}>{answers[2]}</div>
      </div>
      
      <div className={styles.answerContainer} onClick={() => handleClickAnswer(3)}>
        <div>D.</div>
        <div className={styles.answer}>{answers[3]}</div>
      </div>
    </div>
  );
}


// Returns an array of unique answers (no duplicates). Param is copied so that passed array is not modified.
function getRandomAnswers([...answers]: string[], correctAnswer: string) {
  answers.splice(answers.findIndex(a => a === correctAnswer), 1);
  
  const getRandomUniqueAnswer = (): string => {
    const index: number = getRandomIndex(answers.length);
    const answer = answers[index];
    answers.splice(index, 1);
    return answer;
  }
  
  return [ getRandomUniqueAnswer(), getRandomUniqueAnswer(), getRandomUniqueAnswer(), getRandomUniqueAnswer() ];
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


export default MultiQuestion;