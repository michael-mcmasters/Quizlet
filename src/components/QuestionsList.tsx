import React from 'react';
import questionsJson from '../resources/questions.json'
import Question from './Question';
import styles from "../styles/QuestionList.module.css"

interface Props {
  
}

function QuestionsList(props: Props) {
  
  return (
    <div className={styles.container}>
      {questionsJson.questions.map(q => (
        <Question
          key={q.uuid}
          question={q.question}
          answer={q.answer}
          answerOptions={["a possible answer"]}
        />
      ))}
    </div>
  );
}



export default QuestionsList;