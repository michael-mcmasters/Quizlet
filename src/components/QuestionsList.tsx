import React, { useMemo, useState } from 'react';
// import questionsJson from '../resources/questions.json'
import questionsJson from '../resources/aws-questions.json'
import Question from './Question';
import TrueFalseQuestion from './TrueFalseQuestion';
import styles from "../styles/QuestionList.module.css"
import { v4 as uuidv4 } from 'uuid';


interface Props {
  
}

function QuestionsList(props: Props) {
  
  const [questions, setQuestions] = useState<any[]>(questionsJson.questions.map(q => {
    const uuid = (q.uuid == undefined || q.uuid == 0) ? uuidv4() : q.uuid;
    return { ...q, uuid };
  } ));
  
  const answers: string[] = useMemo(() => questionsJson.questions.map(q => q.answer), [questionsJson]);
  
  return (
    
    <div className={styles.container}>
      {questions.map(q => {
        if (q.type === "multi") {
          return <Question
            key={q.uuid}
            question={q.question}
            correctAnswer={q.answer}
            allAnswers={answers}
          />
        } else if (q.type === "boolean") {
          return <TrueFalseQuestion
            key={q.uuid}
            question={q.question}
            correctAnswer={q.answer}
          />
        } else {
          <div>No Question Type specified</div>
        }
      })}
    </div>
  );
}


export default QuestionsList;