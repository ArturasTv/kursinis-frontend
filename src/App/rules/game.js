import { act } from "react-dom/test-utils";
import { pieceType as pType, playerType as plType } from "../constants";
import Rules from "./rules";
export default class Game {
  constructor(pieces) {
    this.pieces = pieces;
    this.rules = new Rules();
    this.playerActivePiece = null;
    this.possibleActivePieceMoves = null;
  }

  getAllpossiblePieceMovesForHistory(piece, pieces = this.pieces) {
    let listOfMoves = [];

    pieces = this.getPieces(pieces);

    listOfMoves = this.rules.findJumpShots(piece, pieces);
    if (listOfMoves.length !== 0) {
      listOfMoves = [...listOfMoves].map((move) => {
        return [...move].map((item) => {
          return { x: item.x, y: item.y };
        });
      });
      return listOfMoves;
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          this.rules.isValidMove(
            piece.x,
            piece.y,
            i,
            j,
            piece.pieceType,
            piece.playerType,
            pieces
          ) &&
          this.rules.countEnemyPiecesInPath(
            piece.x,
            piece.y,
            i,
            j,
            piece.playerType,
            pieces
          ) === 0
        ) {
          listOfMoves.push({ x: i, y: j });
        }
      }
    }

    return listOfMoves;
  }

  getAllpossiblePieceMoves(piece, pieces = this.pieces) {
    let listOfMoves = [];

    pieces = this.getPieces(pieces);

    listOfMoves = this.rules.findJumpShots(piece, pieces);
    if (listOfMoves.length !== 0) {
      listOfMoves = [...listOfMoves].map((move) => {
        return { x: move[0].x, y: move[0].y };
      });
      return listOfMoves;
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (
          this.rules.isValidMove(
            piece.x,
            piece.y,
            i,
            j,
            piece.pieceType,
            piece.playerType,
            pieces
          ) &&
          this.rules.countEnemyPiecesInPath(
            piece.x,
            piece.y,
            i,
            j,
            piece.playerType,
            pieces
          ) === 0
        ) {
          listOfMoves.push({ x: i, y: j });
        }
      }
    }

    return listOfMoves;
  }
  getAllActivePieces(playerType) {
    let activePiecesArray = [];
    let piecesCopy = JSON.parse(JSON.stringify(this.getPieces()));

    let piecesCopy2 = piecesCopy.filter(
      (piece) => piece.playerType === playerType
    );

    piecesCopy.forEach((piece) => {
      let listOfMoves = [];

      listOfMoves = this.rules.findJumpShots(piece, piecesCopy);
      if (listOfMoves.length !== 0) {
        let suitable = piecesCopy2.find(
          (p) => p.x === piece.x && p.y === piece.y
        );
        if (suitable) {
          activePiecesArray.push(suitable);
        }
      }
    });

    if (activePiecesArray.length === 0) {
      piecesCopy.forEach((piece) => {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (
              this.rules.isValidMove(
                piece.x,
                piece.y,
                i,
                j,
                piece.pieceType,
                piece.playerType,
                piecesCopy
              ) &&
              this.rules.countEnemyPiecesInPath(
                piece.x,
                piece.y,
                i,
                j,
                piece.playerType,
                piecesCopy
              ) === 0
            ) {
              let suitable = piecesCopy2.find(
                (p) => p.x === piece.x && p.y === piece.y
              );
              if (suitable) {
                activePiecesArray.push(suitable);
              }
            }
          }
        }
      });
    }

    return activePiecesArray;
  }
  setActivePiece(piece) {
    this.playerActivePiece = piece;

    this.setActivePiecePossibleMoves();
  }

  setActivePiecePossibleMoves() {
    this.possibleActivePieceMoves = this.getAllpossiblePieceMoves(
      this.playerActivePiece
    );
  }

  getPossibleActivePieceMoves(p) {
    return this.getAllpossiblePieceMoves(p);
  }

  takeShot(piece, after) {
    let listOfMoves = this.rules.findJumpShots(piece, this.getPieces());

    let jumpedPiece = listOfMoves.find(
      (item) => item[0].x === after.x && item[0].y === after.y
    );

    if (jumpedPiece) {
      let firstJumpedPiece = jumpedPiece[0];

      this.pieces = this.pieces.map((piece) =>
        piece.x === firstJumpedPiece.jx && piece.y === firstJumpedPiece.jy
          ? { ...piece, jumped: true }
          : piece
      );
    }
  }
  removeJumpedPieces(piece) {
    let listOfMoves = this.rules.findJumpShots(piece, this.pieces);
  }

  cleanJumpedPieces() {
    this.pieces = this.pieces.filter((piece) => !piece.jumped);
  }

  getAvailablePieces() {
    let availablePieces = [];
    this.pieces.forEach((piece) => {
      if (this.getAllpossiblePieceMoves(piece).length !== 0) {
        availablePieces.push(piece);
      }
    });
    return availablePieces;
  }
  getHighlightedPieces(moves) {
    let temp = [...this.pieces];
    moves.forEach((move) => temp.push({ ...move, highlighted: true }));
    return temp;
  }
  getPieces(pieces = this.pieces) {
    return pieces.filter((piece) => !piece.highlighted);
  }
}
