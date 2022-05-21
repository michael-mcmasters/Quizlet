import React from 'react';
import Question from './Question';
import styles from "../styles/QuestionList.module.css"

interface Props {
  
}

function QuestionsList(props: Props) {
  return (
    <div className={styles.container}>
      <Question />
    </div>
  );
}



export default QuestionsList;