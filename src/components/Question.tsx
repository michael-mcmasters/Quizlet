import React from 'react';
import styles from "../styles/Question.module.css"

interface Props {
  
}

function Question(props: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.question}>What is a Certificate Authority?</div>

      <div className={styles.answerContainer}>
        <div>
          A.
        </div>
        <div className={styles.answer}>A prodiver (such as Google) signs a website's certificate, which is given to the browser when it visits that page. The browser will check with the Certificate Authority to determine if the website's certificate is signed and is valid. And use this for an encrypted connection (HTTPS)</div>
      </div>
      
      <div className={styles.answerContainer}>
        <div>
          B.
        </div>
        <div className={styles.answer}>A prodiver (such as Google) signs a website's certificate, which is given to the browser when it visits that page. The browser will check with the Certificate Authority to determine if the website's certificate is signed and is valid. And use this for an encrypted connection (HTTPS)</div>
      </div>
      
      <div className={styles.answerContainer}>
        <div>
          C.
        </div>
        <div className={styles.answer}>A prodiver (such as Google) signs a website's certificate, which is given to the browser when it visits that page. The browser will check with the Certificate Authority to determine if the website's certificate is signed and is valid. And use this for an encrypted connection (HTTPS)</div>
      </div>
      
      <div className={styles.answerContainer}>
        <div>
          D.
        </div>
        <div className={styles.answer}>A prodiver (such as Google) signs a website's certificate, which is given to the browser when it visits that page. The browser will check with the Certificate Authority to determine if the website's certificate is signed and is valid. And use this for an encrypted connection (HTTPS)</div>
      </div>
    </div>
  );
}

export default Question;