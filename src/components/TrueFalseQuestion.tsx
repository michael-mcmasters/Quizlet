import React from 'react';
import styles from "../styles/TrueFalseQuestion.module.css"

interface Props {
  question: string;
  correctAnswer: string;
}

function TrueFalseQuestion(props: Props) {
  
  function handleClickAnswer(clickedIndex: number) {
    if (clickedIndex === 0) {
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
        <div className={styles.answer}>True</div>
      </div>

      <div className={styles.answerContainer} onClick={() => handleClickAnswer(1)}>
        <div>B.</div>
        <div className={styles.answer}>False</div>
      </div>
    </div>
  );
}

export default TrueFalseQuestion;