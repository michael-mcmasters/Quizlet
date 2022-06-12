import React, { useState } from 'react';
import styles from "../styles/BooleanQuestion.module.css"

interface Props {
  question: string;
  correctAnswer: string;
}

function BooleanQuestion(props: Props) {
  
  const [backgroundColor, setBackgroundColor] = useState('');
  
  function handleClickAnswer(clickedAnswer: string) {
    if (clickedAnswer === props.correctAnswer.toLowerCase()) {
      console.log("correct!");
      setBackgroundColor('green');
    } else {
      console.log("wrong");
      setBackgroundColor('darkred');
    }
  }

  return (
    <div className={styles.container} style={{ backgroundColor: backgroundColor }}>
      <div className={styles.question}>{props.question}</div>

      <div className={styles.answerContainer} onClick={() => handleClickAnswer("true")}>
        <div>A.</div>
        <div className={styles.answer}>True</div>
      </div>

      <div className={styles.answerContainer} onClick={() => handleClickAnswer("false")}>
        <div>B.</div>
        <div className={styles.answer}>False</div>
      </div>
    </div>
  );
}

export default BooleanQuestion;