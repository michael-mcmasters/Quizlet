import React, { useMemo } from 'react';
import questionsJson from '../resources/questions.json'
import Question from './Question';
import styles from "../styles/QuestionList.module.css"

interface Props {
  
}

function QuestionsList(props: Props) {
  
  const answers: string[] = useMemo(() => questionsJson.questions.map(q => q.answer), [questionsJson]);
  
  return (
    <div className={styles.container}>
      {questionsJson.questions.map(q => (
        <Question
          key={q.uuid}
          question={q.question}
          correctAnswer={q.answer}
          allAnswers={answers}
        />
      ))}
    </div>
  );
}



export default QuestionsList;