import { useRef, useState } from "react";
import styles from "./DraughtsBoard.module.scss";
import {
  verticalAxis,
  horizontalAxis,
  pieceType as pType,
  pieceColor as pColor,
  playerType as plType,
} from "./../../constants";
import Tile from "../tile/Tile";
import Rules from "../../rules/rules";

const initialPieces = () => {
  let pieces = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      pieces.push({
        pieceType: j !== 0 ? pType.PAWN : pType.QUEEN,
        pieceColor: pColor.BLACK,
        playerType: plType.BLACK,
        x: 7 - i * 2 - (j % 2),
        y: 7 - j,
      });
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      pieces.push({
        pieceType: j !== 0 ? pType.PAWN : pType.QUEEN,
        pieceColor: pColor.WHITE,
        playerType: plType.WHITE,
        x: i * 2 + (j % 2),
        y: j,
      });
    }
  }

  return pieces;
};

const DraughtsBoard = () => {
  const draughtsBoardRef = useRef(null);
  const [pieces, setPieces] = useState(initialPieces());
  const [activePiece, setActivePiece] = useState(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const rules = new Rules();

  const createTiles = () => {
    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {
        let pieceType = null;
        let pieceColor = null;
        pieces.forEach((piece) => {
          if (piece.x === i && piece.y === j) {
            pieceType = piece.pieceType;
            pieceColor = piece.pieceColor;
          }
        });

        board.push(
          <Tile
            key={`${[i, j]}`}
            tileColor={(j + i + 2) % 2 ? "white" : "black"}
            pieceType={pieceType}
            pieceColor={pieceColor}
          />
        );
      }
    }
    return board;
  };

  const grabPiece = (e) => {
    const element = e.target;
    const draughtsBoard = draughtsBoardRef.current;
    if (element.classList.value.split("_").includes("piece") && draughtsBoard) {
      const pieceSize = e.target.getBoundingClientRect().width;
      const x = e.clientX - pieceSize / 2;
      const y = e.clientY - pieceSize / 2;
      setGridX(Math.floor((e.clientX - draughtsBoard.offsetLeft) / pieceSize));
      setGridY(
        Math.abs(
          Math.ceil(
            (e.clientY - draughtsBoard.offsetTop - draughtsBoard.clientWidth) /
              pieceSize
          )
        )
      );
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  };

  const movePiece = (e) => {
    const draughtsBoard = draughtsBoardRef.current;
    if (activePiece && draughtsBoard) {
      const pieceSize = e.target.getBoundingClientRect().width;
      const minX = draughtsBoard.offsetLeft;
      const minY = draughtsBoard.offsetTop;
      const maxX =
        draughtsBoard.offsetLeft + draughtsBoard.clientWidth - pieceSize;
      const maxY =
        draughtsBoard.offsetTop + draughtsBoard.clientHeight - pieceSize;

      const x = e.clientX - pieceSize / 2;
      const y = e.clientY - pieceSize / 2;

      activePiece.style.position = "absolute";

      activePiece.style.left =
        x > minX && x < maxX ? `${x}px` : x < minX ? `${minX}px` : `${maxX}px`;

      activePiece.style.top =
        y > minY && y < maxY ? `${y}px` : y < minY ? `${minY}px` : `${maxY}px`;
    }
  };

  const dropPiece = (e) => {
    const draughtsBoard = draughtsBoardRef.current;
    const pieceSize = e.target.getBoundingClientRect().width;
    if (activePiece && draughtsBoard) {
      const x = Math.floor((e.clientX - draughtsBoard.offsetLeft) / pieceSize);
      const y = Math.abs(
        Math.ceil(
          (e.clientY - draughtsBoard.offsetTop - draughtsBoard.clientWidth) /
            pieceSize
        )
      );

      setPieces((value) => {
        const pieces = value.map((piece) => {
          if (piece.x === gridX && piece.y === gridY) {
            const validMove = rules.isValidMove(
              gridX,
              gridY,
              x,
              y,
              piece.pieceType,
              piece.playerType,
              value
            );

            if (validMove) {
              piece.x = x;
              piece.y = y;
            } else {
              activePiece.style.position = "relative";
              activePiece.style.removeProperty("left");
              activePiece.style.removeProperty("top");
            }
          }
          return piece;
        });
        return pieces;
      });

      rules.isAnyAttacksOnBoard(pieces, "");

      setActivePiece(null);
    }
  };

  return (
    <div
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className={styles["draughtsboard"]}
      ref={draughtsBoardRef}
    >
      {createTiles()}
    </div>
  );
};

export default DraughtsBoard;
