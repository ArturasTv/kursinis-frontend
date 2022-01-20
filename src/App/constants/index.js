const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const pieceType = {
  QUEEN: "QUEEN",
  PAWN: "PAWN",
};

const pieceColor = {
  BLACK: "BLACK",
  WHITE: "WHITE",
};

const playerType = {
  BLACK: "BLACK",
  WHITE: "WHITE",
};

const menuItems = [
  {
    title: "SUKURTI ŽAIDIMĄ",
    path: "/create",
    key: "CREATE",
    private: true,
  },
  {
    title: "STALAI",
    path: "/tables",
    key: "TABLES",
    private: true,
  },
  {
    title: "PRISIJUNGTI",
    path: "/login",
    key: "LOGIN",
    protected: true,
  },
  {
    title: "REGISTRUOTIS",
    path: "/register",
    key: "REGISTER",
    protected: true,
  },
  {
    title: "STATISTIKA",
    path: "/stats",
    key: "STATS",
    visible: true,
  },
  {
    title: "ATSIJUNGTI",
    path: "/logout",
    key: "LOGOUT",
    private: true,
  },
];

const minutes = [1, 2, 3, 5, 7, 10, 15];
const plus = [0, 1, 2, 3, 5, 10, 15];

export {
  verticalAxis,
  horizontalAxis,
  pieceType,
  pieceColor,
  playerType,
  menuItems,
  minutes,
  plus,
};
