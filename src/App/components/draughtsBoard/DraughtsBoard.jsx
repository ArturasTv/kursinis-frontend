import React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import * as useStateRef from "react-usestateref";
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
import { useDispatch } from "react-redux";
import { validateMove } from "../../redux/actions/moveAction";
import { updatePieces } from "../../redux/actions/piecesAction";

const DraughtsBoard = ({ startingPosition, orentation, turn }) => {
  const draughtsBoardRef = useRef(null);
  const [pieces, setPieces] = useState(startingPosition);

  const [activePiece, setActivePiece] = useState(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [playerTurn, setPlayerTurn] = useState(turn);

  const [playerChoosenPiece, setPlayerChoosenPiece] = useState(null);
  const [playerUpdatedPiece, setPlayerUpdatedPiece] = useState(null);
  const [playerMoveHistory, setPlayerMoveHistory] = useState([]);

  const [piecesHistory, setPiecesHistory] = useState(null);

  const [legalMove, setLegalMove] = useState(false);

  const dispatch = useDispatch();

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
      const x =
        orentation === "BLACK"
          ? draughtsBoard.clientWidth - e.clientX - pieceSize / 2
          : e.clientX - pieceSize / 2;
      const y =
        orentation === "BLACK"
          ? draughtsBoard.clientHeight - e.clientY - pieceSize / 4
          : e.clientY - pieceSize / 2;

      const _gridX =
        orentation === "BLACK"
          ? 7 - Math.floor((e.clientX - draughtsBoard.offsetLeft) / pieceSize)
          : Math.floor((e.clientX - draughtsBoard.offsetLeft) / pieceSize);
      const _gridY =
        orentation === "BLACK"
          ? 7 -
            Math.abs(
              Math.ceil(
                (e.clientY -
                  draughtsBoard.offsetTop -
                  draughtsBoard.clientWidth) /
                  pieceSize
              )
            )
          : Math.abs(
              Math.ceil(
                (e.clientY -
                  draughtsBoard.offsetTop -
                  draughtsBoard.clientWidth) /
                  pieceSize
              )
            );

      let availablePieces = game.getAllActivePieces(playerTurn);

      console.log("pirmas", availablePieces);

      if (playerUpdatedPiece) {
        availablePieces = [playerUpdatedPiece];
      }

      console.log("trecias", availablePieces);

      let availablePiece = availablePieces.find(
        (piece) => piece.x === _gridX && piece.y === _gridY
      );

      console.log(availablePieces);

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
        element.style.zIndex = "3";

        game.removeJumpedPieces(p);
        const possiblePieceMoves = game.getAllpossiblePieceMoves(p);

        const highlightedPieces = game.getHighlightedPieces(possiblePieceMoves);

        setPieces(highlightedPieces);

        console.log("pasirinktas", playerChoosenPiece);

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
    if (!activePiece) return;

    const draughtsBoard = draughtsBoardRef.current;
    if (activePiece && draughtsBoard) {
      const pieceSize = e.target.getBoundingClientRect().width;
      const minX = draughtsBoard.offsetLeft;
      const minY =
        orentation === "BLACK"
          ? draughtsBoard.offsetTop - pieceSize / 4
          : draughtsBoard.offsetTop;
      const maxX =
        draughtsBoard.offsetLeft + draughtsBoard.clientWidth - pieceSize;
      const maxY =
        orentation === "BLACK"
          ? draughtsBoard.offsetTop +
            draughtsBoard.clientHeight -
            pieceSize -
            pieceSize / 4
          : draughtsBoard.offsetTop + draughtsBoard.clientHeight - pieceSize;

      const x =
        orentation === "BLACK"
          ? draughtsBoard.clientWidth - e.clientX - pieceSize / 2
          : e.clientX - pieceSize / 2;
      const y =
        orentation === "BLACK"
          ? draughtsBoard.clientHeight - e.clientY - pieceSize / 4
          : e.clientY - pieceSize / 2;

      activePiece.style.position = "absolute";

      activePiece.style.left =
        x > minX && x < maxX ? `${x}px` : x < minX ? `${minX}px` : `${maxX}px`;

      activePiece.style.top =
        y > minY && y < maxY ? `${y}px` : y < minY ? `${minY}px` : `${maxY}px`;
    }
  };

  const dropPiece = (e) => {
    if (!activePiece) return;

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
      const x =
        orentation === "BLACK"
          ? 7 - Math.floor((e.clientX - draughtsBoard.offsetLeft) / pieceSize)
          : Math.floor((e.clientX - draughtsBoard.offsetLeft) / pieceSize);
      const y =
        orentation === "BLACK"
          ? 7 -
            Math.abs(
              Math.ceil(
                (e.clientY -
                  draughtsBoard.offsetTop -
                  draughtsBoard.clientWidth) /
                  pieceSize
              )
            )
          : Math.abs(
              Math.ceil(
                (e.clientY -
                  draughtsBoard.offsetTop -
                  draughtsBoard.clientWidth) /
                  pieceSize
              )
            );

      if (x === gridX && y === gridY) {
        console.log("yra buve");
        activePiece.style.position = "relative";
        activePiece.style.removeProperty("left");
        activePiece.style.removeProperty("top");
        // game.cleanJumpedPieces();
        setPieces(game.getPieces());
        //setPlayerChoosenPiece(null);
        setActivePiece(null);
        return;
      }

      const tempPiece = pieces.find(
        (piece) => piece.x === gridX && piece.y === gridY
      );
      let validMove = game
        .getAllpossiblePieceMoves(tempPiece, deepCopyPieces)
        .find((move) => move.x === x && move.y === y);

      if ((x === gridX && y === gridY) || !validMove) {
        console.log("yra buve");
        activePiece.style.position = "relative";
        activePiece.style.removeProperty("left");
        activePiece.style.removeProperty("top");
        // game.cleanJumpedPieces();
        setPieces(game.getPieces());
        // setPlayerChoosenPiece(null);
        setActivePiece(null);
        return;
      }

      setPieces((value) => {
        const pieces = value.map((piece) => {
          if (piece.x === gridX && piece.y === gridY) {
            let validMove = game
              .getAllpossiblePieceMoves(piece, deepCopyPieces)
              .find((move) => move.x === x && move.y === y);
            if (validMove) {
              piece.x = x;
              piece.y = y;
              setPlayerUpdatedPiece(piece);
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

    console.log(
      "istorija pamokanti Iurim kas cia nutinka",
      JSON.stringify(tempHistory)
    );
    console.log(JSON.stringify([availableMoves].flat()));

    for (let i = 0; i < availableMoves.length; i++) {
      if (
        JSON.stringify([availableMoves[i]].flat()) ===
        JSON.stringify(tempHistory)
      ) {
        setPlayerChoosenPiece(null);
        setPlayerMoveHistory([]);

        game.cleanJumpedPieces();
        setPieces(game.getPieces());
        setPlayerTurn(null);

        setLegalMove(true);
      }
    }
  };

  useEffect(() => {
    if (legalMove) {
      setLegalMove(false);
      dispatch(validateMove());
      dispatch(updatePieces(pieces));
    }
  }, [pieces]);

  return (
    <div
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      className={styles["draughtsboard"]}
      style={orentation === "BLACK" ? { transform: "rotate(180deg)" } : {}}
      ref={draughtsBoardRef}
    >
      {createTiles()}
    </div>
  );
};

export default DraughtsBoard;
