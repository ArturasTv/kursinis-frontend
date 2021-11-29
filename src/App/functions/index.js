import {
  verticalAxis,
  horizontalAxis,
  pieceType as pType,
  pieceColor as pColor,
  playerType as plType,
} from "../constants";
export const initialPieces = () => {
  let pieces = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      pieces.push({
        pieceType: pType.PAWN,
        pieceColor: pColor.BLACK,
        playerType: plType.BLACK,
        x: 7 - i * 2 - (j % 2),
        y: 7 - j,
      });
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 2; j++) {
      pieces.push({
        pieceType: pType.PAWN,
        pieceColor: pColor.WHITE,
        playerType: plType.WHITE,
        x: i * 2 + (j % 2),
        y: j,
      });
    }
  }

  return pieces;
};
