import React, { useState } from 'react';
import styles from "../styles/BooleanQuestion.module.css"

interface Props {
  question: string;
  correctAnswer: string;
  popup: string;
}

function BooleanQuestion(props: Props) {
  
  const [backgroundColor, setBackgroundColor] = useState('');
  
  
  function handleClickAnswer(clickedAnswer: string) {
    if (clickedAnswer === props.correctAnswer.toLowerCase()) {
      setBackgroundColor('green');
    } else {
      setBackgroundColor('darkred');
    }
  }

  
  return (
    <div className={styles.container} style={{ backgroundColor: backgroundColor }}>
      <div className={styles.question}>{props.question}</div>
      
      <br />
      <div className={styles.answerContainer} onClick={() => handleClickAnswer("true")}>
        <span className={styles.answer}>A. True</span>
      </div>

      <br />
      <div className={styles.answerContainer} onClick={() => handleClickAnswer("false")}>
        <span className={styles.answer}>B. False</span>
      </div>
      
      {(backgroundColor === "darkred" && props.popup !== '') && (
        <>
          <br />
          {props.popup}
        </>
      )}
    </div>
  );
}

export default BooleanQuestion;