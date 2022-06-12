import React from 'react';
import logo from './logo.svg';
import MultiQuestion from './components/MultiQuestion'
import Sidebar from './components/Sidebar'
import QuestionsList from './components/QuestionsList'
import styles from "./styles/App.module.css";

// Color themes from: https://visme.co/blog/website-color-schemes/

function App() {
  return (
    <div className={styles.container}>
      <div className={styles.leftSideContainer}>
        <Sidebar />
      </div>
      <div className={styles.center}>
        <QuestionsList />
      </div>
    </div>
  );
}

export default App;
