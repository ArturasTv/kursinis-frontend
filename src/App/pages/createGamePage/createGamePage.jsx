import CreateGameForm from "../../components/createGameForm/createGameForm";
import { useSelector } from "react-redux";
import WaitingOponent from "../../components/waitingOponent/waitingOponent";
const CreateGamePage = () => {
  const { waitingOponent } = useSelector((state) => state.createGame);
  return !waitingOponent ? <CreateGameForm /> : <WaitingOponent />;
};

export default CreateGamePage;
