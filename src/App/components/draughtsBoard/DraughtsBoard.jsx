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
import Game from "../../rules/game";

const initialPieces = () => {
  let pieces = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
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
    for (let j = 0; j < 3; j++) {
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

const DraughtsBoard = () => {
  const draughtsBoardRef = useRef(null);
  const [pieces, setPieces] = useState(initialPieces());
  const [activePiece, setActivePiece] = useState(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);

  const [playerTurn, setPlayerTurn] = useState(plType.WHITE);

  const [playerChoosenPiece, setPlayerChoosenPiece] = useState(null);
  const [playerMoveHistory, setPlayerMoveHistory] = useState([]);

  const [piecesHistory, setPiecesHistory] = useState(null);

  const rules = new Rules();
  const game = new Game(pieces);

  const createTiles = () => {
    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
      for (let i = 0; i < horizontalAxis.length; i++) {
        let pieceType = null;
        let pieceColor = null;
        let pieceHighlighted = null;
        let pieceJumped = null;
        pieces.forEach((piece) => {
          if (piece.x === i && piece.y === j) {
            pieceType = piece.pieceType;
            pieceColor = piece.pieceColor;
            pieceHighlighted = piece.highlighted;
            pieceJumped = piece.jumped;
          }
        });
        if (!pieceHighlighted) {
          board.push(
            <Tile
              key={`${[i, j]}`}
              tileColor={(j + i + 2) % 2 ? "white" : "black"}
              pieceType={pieceType}
              pieceColor={pieceColor}
              jumped={pieceJumped}
            />
          );
        } else {
          board.push(
            <Tile
              key={`${[i, j]}`}
              tileColor={"available"}
              pieceType={null}
              pieceColor={null}
              jumped={pieceJumped}
            />
          );
        }
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

      const _gridX = Math.floor(
        (e.clientX - draughtsBoard.offsetLeft) / pieceSize
      );
      const _gridY = Math.abs(
        Math.ceil(
          (e.clientY - draughtsBoard.offsetTop - draughtsBoard.clientWidth) /
            pieceSize
        )
      );

      let availablePieces = game.getAvailablePieces();

      let availablePiece = availablePieces.find(
        (piece) => (piece) =>
          piece.x === _gridX &&
          piece.y === _gridY &&
          piece.playerType === playerTurn
      );

      if (!availablePiece) return;

      let p = pieces.find(
        (piece) =>
          piece.x === _gridX &&
          piece.y === _gridY &&
          piece.playerType === playerTurn
      );
      if (p) {
        setGridX(_gridX);
        setGridY(_gridY);
        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        game.removeJumpedPieces(p);
        const possiblePieceMoves = game.getAllpossiblePieceMoves(p);

        const highlightedPieces = game.getHighlightedPieces(possiblePieceMoves);

        setPieces(highlightedPieces);

        if (!playerChoosenPiece) {
          setPiecesHistory(JSON.parse(JSON.stringify(pieces)));
          setPlayerChoosenPiece(JSON.parse(JSON.stringify(p)));
          game.setActivePiece(p);
        }
        setActivePiece(element);
      }
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
    console.log("isrinktasis", playerChoosenPiece);
    const availableMoves = game.getAllpossiblePieceMovesForHistory(
      playerChoosenPiece,
      piecesHistory
    );

    let tempHistory = playerMoveHistory;

    // setPieces([...game.getPieces()]);
    const deepCopyPieces = JSON.parse(JSON.stringify(pieces));
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

      const tempPiece = pieces.find(
        (piece) => piece.x === gridX && piece.y === gridY
      );

      setPieces((value) => {
        const pieces = value.map((piece) => {
          if (piece.x === gridX && piece.y === gridY) {
            let validMove = game
              .getAllpossiblePieceMoves(piece, deepCopyPieces)
              .find((move) => move.x === x && move.y === y);
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

      if (tempPiece) {
        tempHistory.push({ x, y });
        setPlayerMoveHistory(tempHistory);

        game.takeShot(tempPiece, { x, y });
        setPieces([...game.getPieces()]);
      }

      setActivePiece(null);

      setPieces((value) => {
        /// pakeisti i funkcija ir grazinti pieces array ir tada su setPieces pakeist
        const pieces = value.map((piece) => {
          if (rules.checkIfPieceBecomeQueen(piece)) {
            piece.pieceType = pType.QUEEN;
          }

          return piece;
        });
        return pieces;
      });
    }

    for (let i = 0; i < availableMoves.length; i++) {
      console.log("jonas", JSON.stringify([availableMoves[i]]));
      console.log("petras", JSON.stringify(tempHistory));

      if (
        JSON.stringify([availableMoves[i]].flat()) ===
        JSON.stringify(tempHistory)
      ) {
        setPlayerChoosenPiece(null);

        setPlayerTurn(
          playerTurn === plType.WHITE ? plType.BLACK : plType.WHITE
        );
        // alert("oho");
        setPlayerMoveHistory([]);

        game.cleanJumpedPieces();
        setPieces(game.getPieces());
      }
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
