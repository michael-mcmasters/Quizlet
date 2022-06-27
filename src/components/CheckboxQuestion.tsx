import React from 'react';

interface Props {
  question: string;
  answers: string[];
}

function CheckboxQuestion(props: Props) {
  return (
    <>
      <div>
        {props.question}
      </div>
      <div>
        {props.answers.map(q => (
          <div>
            {q}
          </div>
        ))}
      </div>
      <br />
    </>
  );
}

export default CheckboxQuestion;