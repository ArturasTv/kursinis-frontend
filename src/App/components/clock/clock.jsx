import styles from "./clock.module.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateWhiteClock,
  updateBlackClock,
} from "../../redux/actions/clockAction";
const Clock = ({ turn }) => {
  const dispatch = useDispatch();
  const { whiteTime, blackTime } = useSelector((state) => state.clock);

  const { clockTicking } = useSelector((state) => state.WS);
  const { clockTurn } = useSelector((state) => state.clock);

  const [time, setTime] = useState(turn === "WHITE" ? whiteTime : blackTime);

  const [currentTurn, setCurrentTurn] = useState(clockTicking);

  const [timePressed, setTimePressed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (turn === "WHITE" && turn === currentTurn) {
        dispatch(updateWhiteClock());
      }
      if (turn === "BLACK" && turn === currentTurn) {
        dispatch(updateBlackClock());
      }
    }, 1000);

    setCurrentTurn(clockTicking);

    setTime(turn === "WHITE" ? whiteTime : blackTime);
    return () => clearTimeout(timer);
  });

  return <div>{time}</div>;
};

export default Clock;
