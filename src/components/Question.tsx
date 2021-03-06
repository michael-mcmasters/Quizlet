import React, { useEffect, useState } from 'react';
import styles from "../styles/Question.module.css"

interface Props {
  question: string;
  correctAnswer: string;
  allAnswers: string[];
}

function Question(props: Props) {
  
  const [answers, setAnswers] = useState<string[]>([])
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>();
  
  
  useEffect(() => {
    (function generateAnswers() {
      const answers: string[] = getRandomAnswers(props.allAnswers, props.correctAnswer);
      const correctAnswerIndex: number = getRandomIndex(answers.length);
      answers[correctAnswerIndex] = props.correctAnswer;
      
      setAnswers(answers);
      setCorrectAnswerIndex(correctAnswerIndex);
    })();
  }, [props.allAnswers])
  
  
  function handleClickAnswer(clickedIndex: number) {
    if (clickedIndex === correctAnswerIndex) {
      console.log("correct!");
    } else {
      console.log("wrong");
    }
  }
  
  
  return (
    <div className={styles.container}>
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


function getRandomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}


export default Question;