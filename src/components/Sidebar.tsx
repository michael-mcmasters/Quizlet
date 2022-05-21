import React from 'react';
import { setSyntheticLeadingComments } from 'typescript';
import styles from "../styles/Sidebar.module.css"

interface Props {
  
}

function Sidebar(props: Props) {
  return (
    <div className={styles.container}>
    <div className={styles.title}>
      Quizes
    </div>
     <div>
      AWS
     </div>
     <div>
       Java
     </div>
      <div>
        React
      </div>
    </div>
  );
}

export default Sidebar;