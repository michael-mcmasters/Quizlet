import React, { useEffect, useMemo, useState } from 'react';
import questionsJson from '../resources/aws-questions.json'
import MultiQuestion from './MultiQuestion';
import BooleanQuestion from './BooleanQuestion';
import styles from "../styles/QuestionList.module.css"
import { v4 as uuidv4 } from 'uuid';
import QuestionsJson from '../types/QuestionsJson';
import MultiQuestionT from '../types/MultiQuestion';
import BooleanQuestionT from '../types/BooleanQuestion';
import CheckboxQuestionT from '../types/CheckboxQuestion';
import CheckboxQuestion from './CheckboxQuestion';


interface Props {
  
}

function QuestionsList(props: Props) {
  
  const [multiQuestions, setMultiQuestions] = useState<MultiQuestionT[]>([]);
  const [booleanQuestions, setBooleanQuestions] = useState<BooleanQuestionT[]>([]);
  const [checkboxQuestions, setCheckboxQuestions] = useState<CheckboxQuestionT[]>([]);
  
  
  // Pretend to fetch - Use local json file while waiting for backend to be set up
  useEffect(() => {
    (function fetchQuestions() {
      const questionsResponse: QuestionsJson = questionsJson;
      
      setMultiQuestions(generateKeysIfEmpty(questionsResponse.questions.multiQuestions));
      setBooleanQuestions(generateKeysIfEmpty(questionsResponse.questions.booleanQuestions));
      setCheckboxQuestions(generateKeysIfEmpty(questionsResponse.questions.checkboxQuestions));
    })();
  }, [])
  
  
  const answers: string[] = useMemo(() => multiQuestions.map(q => q.answer), [multiQuestions]);
  
  
  return (

    <div className={styles.container}>
      {multiQuestions.map(q => (
        <MultiQuestion
          key={q.uuid}
          question={q.question}
          correctAnswer={q.answer}
          allAnswers={answers}
          wrongAnswers={q.wrongAnswers}
        />
      ))}
      {booleanQuestions.map(q => (
        <BooleanQuestion
          key={q.uuid}
          question={q.question}
          correctAnswer={q.answer}
        />
      ))}
      {checkboxQuestions.map(q => (
        <CheckboxQuestion
          key={q.uuid}
          question={q.question}
          correctAnswers={q.answers}
          allAnswers={answers}
        />
      ))}
    </div>
  );
}

// Using any because it was more readable than using a generic with an array and making sure the uuid property existed on object
function generateKeysIfEmpty(questions: any[]): any[] {
  return questions.map(q => {
    return {
      ...q,
      uuid: (q.uuid == "") ? uuidv4() : q.uuid
    };
  })
}


export default QuestionsList;