import DraughtsBoard from "./components/draughtsBoard/DraughtsBoard";
import styles from "./App.module.scss";
function App() {
  return (
    <div className={styles["app"]}>
      <DraughtsBoard />
    </div>
  );
}

export default App;
