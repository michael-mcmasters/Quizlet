import React from 'react';
import logo from './logo.svg';
import Question from './components/Question'
import Sidebar from './components/Sidebar'
import QuestionsList from './components/QuestionsList'
import styles from "./styles/App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSideContainer}>
        <Sidebar />
      </div>
      <div className={styles.center}>
        <QuestionsList />
      </div>
      <div>
        ok
      </div>
    </div>
  );
}

export default App;
