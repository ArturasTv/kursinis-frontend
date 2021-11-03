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
    //  console.log(previous, after);
    let listOfMoves = this.rules.findJumpShots(piece, this.getPieces());

    let jumpedPiece = listOfMoves.find(
      (item) => item[0].x === after.x && item[0].y === after.y
    );

    if (jumpedPiece) {
      let firstJumpedPiece = jumpedPiece[0];

      console.log(jumpedPiece);
      console.log("pries viska", this.pieces);
      this.pieces = this.pieces.map((piece) =>
        piece.x === firstJumpedPiece.jx && piece.y === firstJumpedPiece.jy
          ? { ...piece, jumped: true }
          : piece
      );
      console.log("po visko", this.pieces);
    }

    //console.log(this.pieces);
    // console.log(after.x);
    //console.log("labas", listOfMoves);
  }
  removeJumpedPieces(piece) {
    //console.log(piece);

    let listOfMoves = this.rules.findJumpShots(piece, this.pieces);
    //console.log(listOfMoves);
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
    //  console.log(temp);
    return temp;
  }
  getPieces(pieces = this.pieces) {
    return pieces.filter((piece) => !piece.highlighted);
  }
}
