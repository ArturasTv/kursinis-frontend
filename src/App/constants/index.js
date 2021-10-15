const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

const initialPosition = [
  ["e", "b", "e", "b", "e", "b", "e", "b"],
  ["b", "e", "b", "e", "b", "e", "b", "e"],
  ["e", "b", "e", "b", "e", "b", "e", "b"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["e", "e", "e", "e", "e", "e", "e", "e"],
  ["w", "e", "w", "e", "w", "e", "w", "e"],
  ["e", "w", "e", "w", "e", "w", "e", "w"],
  ["w", "e", "w", "e", "w", "e", "w", "e"],
];

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

export { verticalAxis, horizontalAxis, pieceType, pieceColor, playerType };
