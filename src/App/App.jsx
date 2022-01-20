import styles from "./App.module.scss";

import Webpages from "./webpages/webpages";
function App() {
  return (
    <div className={styles["app"]}>
      <Webpages />
    </div>
  );
}

export default App;
