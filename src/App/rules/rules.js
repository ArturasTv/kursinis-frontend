import { pieceType as pType, playerType as plType } from "../constants";
import { findDirection } from "../utills";
export default class Rules {
  checkBounds(x, y, m1, m2) {
    // tikrinama ar neperzengtos ribos lentos
    return x + m1 <= 7 && x + m1 >= 0 && y + m2 <= 7 && y + m2 >= 0;
  }

  isTileOccupied(x, y, pieces) {
    // tikrina ar langelis yra laisvas
    return pieces.find((piece) => piece.x === x && piece.y === y);
  }
  isPathBlockiedByOwnPiece(px, py, x, y, playerType, pieces) {
    // tikrina ar kelias yra uzimtas savos saskes // skirta damai
    const n = Math.abs(x - px) === Math.abs(y - py) ? Math.abs(x - px) - 1 : 0;

    const [dirX, dirY] = findDirection(px, py, x, y);

    for (let i = 1; i <= n; i++) {
      if (
        pieces.find(
          (piece) =>
            piece.x === px + i * dirX &&
            piece.y === py + i * dirY &&
            piece.playerType === playerType
        )
      ) {
        return true;
      }
    }

    return false;
  }

  checkIfQueenHaveStrikes(pieces, jumpedPiece, startPiece) {
    const directions = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ];
    // pagalbine funkcija randant ar dama gali kirsti esamoje padetyje
    let temp = [...pieces];
    temp = temp.map((piece) => {
      return piece.x === jumpedPiece.x && piece.y === jumpedPiece.y
        ? { ...piece, jumped: true }
        : piece;
    });
    //console.log("temp", temp);
    if (startPiece.pieceType === pType.QUEEN) {
      for (let i = 0; i < directions.length; i++) {
        for (let j = 0; j < 8; j++) {
          if (
            temp.find(
              (p) =>
                p.x === startPiece.x + j * directions[i][0] &&
                p.y === startPiece.y + j * directions[i][1] &&
                p.playerType !== startPiece.playerType &&
                !p.jumped
            )
          ) {
            if (
              this.checkBounds(
                startPiece.x,
                startPiece.y,
                (j + 1) * directions[i][0],
                (j + 1) * directions[i][1]
              )
            ) {
              if (
                !temp.find(
                  (p) =>
                    p.x === startPiece.x + (j + 1) * directions[i][0] &&
                    p.y === startPiece.y + (j + 1) * directions[i][1]
                )
              ) {
                if (
                  !this.isPathBlockiedByOwnPiece(
                    startPiece.x,
                    startPiece.y,
                    startPiece.x + (j + 1) * directions[i][0],
                    startPiece.y + (j + 1) * directions[i][1],
                    startPiece.playerType,
                    temp
                  )
                ) {
                  if (
                    this.countEnemyPiecesInPath(
                      startPiece.x,
                      startPiece.y,
                      startPiece.x + (j + 1) * directions[i][0],
                      startPiece.y + (j + 1) * directions[i][1],
                      startPiece.playerType === plType.WHITE
                        ? plType.WHITE
                        : plType.BLACK,
                      temp
                    ) === 1
                  ) {
                    return true;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  countEnemyPiecesInPath(px, py, x, y, playerType, pieces) {
    // suskaiciuoja kiek yra kelyje priesininko saskiu // skirta damkei
    let count = 0;

    const n = Math.abs(x - px) === Math.abs(y - py) ? Math.abs(x - px) - 1 : 0;

    const [dirX, dirY] = findDirection(px, py, x, y);

    for (let i = 1; i <= n; i++) {
      if (
        pieces.find(
          (piece) =>
            piece.x === px + i * dirX &&
            piece.y === py + i * dirY &&
            piece.playerType !== playerType
        )
      ) {
        count++;
      }
    }

    return count;
  }
  pieceOneJumpAttacks(piece, pieces) {
    const firstJumpAttacks = [];

    const directions = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ];
    const pTypesArray = [plType.WHITE, plType.BLACK];

    for (let k = 0; k < pTypesArray.length; k++) {
      if (piece.playerType === pTypesArray[k]) {
        if (piece.pieceType === pType.PAWN) {
          for (let i = 0; i < directions.length; i++) {
            if (
              pieces.find(
                (p) =>
                  p.x === piece.x + directions[i][0] &&
                  p.y === piece.y + directions[i][1] &&
                  p.playerType === (k === 0 ? plType.BLACK : plType.WHITE) &&
                  !p.jumped
              )
            ) {
              if (
                this.checkBounds(
                  piece.x,
                  piece.y,
                  2 * directions[i][0],
                  2 * directions[i][1]
                )
              ) {
                if (
                  !pieces.find(
                    (p) =>
                      p.x === piece.x + 2 * directions[i][0] &&
                      p.y === piece.y + 2 * directions[i][1]
                  )
                ) {
                  firstJumpAttacks.push([
                    // langelis po kirtimo
                    {
                      x: piece.x + 2 * directions[i][0],
                      y: piece.y + 2 * directions[i][1],
                    },
                    {
                      x: piece.x + directions[i][0], // kertama saske
                      y: piece.y + directions[i][1],
                    },
                  ]);
                }
              }
            }
          }
        }
        if (piece.pieceType === pType.QUEEN) {
          for (let i = 0; i < directions.length; i++) {
            for (let j = 0; j < 8; j++) {
              if (
                pieces.find(
                  (p) =>
                    p.x === piece.x + j * directions[i][0] &&
                    p.y === piece.y + j * directions[i][1] &&
                    p.playerType === (k === 0 ? plType.BLACK : plType.WHITE) &&
                    !p.jumped
                )
              ) {
                if (
                  this.checkBounds(
                    piece.x,
                    piece.y,
                    (j + 1) * directions[i][0],
                    (j + 1) * directions[i][1]
                  )
                ) {
                  if (
                    !pieces.find(
                      (p) =>
                        p.x === piece.x + (j + 1) * directions[i][0] &&
                        p.y === piece.y + (j + 1) * directions[i][1]
                    )
                  ) {
                    if (
                      !this.isPathBlockiedByOwnPiece(
                        piece.x,
                        piece.y,
                        piece.x + (j + 1) * directions[i][0],
                        piece.y + (j + 1) * directions[i][1],
                        k !== 0 ? plType.BLACK : plType.WHITE,
                        pieces
                      )
                    ) {
                      if (
                        this.countEnemyPiecesInPath(
                          piece.x,
                          piece.y,
                          piece.x + (j + 1) * directions[i][0],
                          piece.y + (j + 1) * directions[i][1],
                          k !== 0 ? plType.BLACK : plType.WHITE,
                          pieces
                        ) === 1
                      ) {
                        for (let ii = 1; ii < 10; ii++) {
                          if (
                            this.checkBounds(
                              piece.x,
                              piece.y,
                              (j + ii) * directions[i][0],
                              (j + ii) * directions[i][1]
                            )
                          ) {
                            if (
                              !this.isTileOccupied(
                                piece.x + (j + ii) * directions[i][0],
                                piece.y + (j + ii) * directions[i][1],
                                pieces
                              )
                            ) {
                              firstJumpAttacks.push([
                                {
                                  x: piece.x + (j + ii) * directions[i][0],
                                  y: piece.y + (j + ii) * directions[i][1],
                                },
                                {
                                  x: piece.x + j * directions[i][0],
                                  y: piece.y + j * directions[i][1],
                                },
                              ]);
                            } else {
                              console.log("nu bandom", firstJumpAttacks);
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    //  console.log(firstJumpAttacks);
    let count = 0;
    for (let jj = 0; jj < firstJumpAttacks.length; jj++) {
      // if (
      //  this.checkIfQueenHaveStrikes(
      //  pieces,
      //  {
      //    x: piece.x + j * directions[i][0],
      //    y: piece.y + j * directions[i][1],
      //   },
      //   piece
      // )*/
      // )
      {
        count++;
      }
    }

    return firstJumpAttacks;
  }
  isValidMove(px, py, x, y, pieceType, playerType, pieces) {
    if (pieceType === pType.PAWN) {
      if (playerType === plType.WHITE) {
        if (Math.abs(x - px) === 1 && Math.abs(y - py) === 1) {
          if (y > py) {
            if (!this.isTileOccupied(x, y, pieces)) {
              return true;
            }
          }
        }
      }

      if (playerType === plType.BLACK) {
        if (Math.abs(x - px) === 1 && Math.abs(y - py) === 1) {
          if (y < py) {
            if (!this.isTileOccupied(x, y, pieces)) {
              return true;
            }
          }
        }
      }
    }

    if (pieceType === pType.QUEEN) {
      if (playerType === plType.WHITE) {
        if (
          Math.abs(x - px) === Math.abs(y - py) &&
          Math.abs(x - px) !== 0 &&
          Math.abs(y - py) !== 0
        ) {
          if (!this.isTileOccupied(x, y, pieces)) {
            if (
              !this.isPathBlockiedByOwnPiece(px, py, x, y, playerType, pieces)
            ) {
              return true;
            }
          }
        }
      }

      if (playerType === plType.BLACK) {
        if (
          Math.abs(x - px) === Math.abs(y - py) &&
          Math.abs(x - px) !== 0 &&
          Math.abs(y - py) !== 0
        ) {
          if (!this.isTileOccupied(x, y, pieces)) {
            if (
              !this.isPathBlockiedByOwnPiece(px, py, x, y, playerType, pieces)
            ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  updatePiecesAfterJump(pieces, jumpedPiece, beforePiece, afterPiece) {
    let temp = [...pieces];
    temp = temp.filter(
      (piece) => !(piece.x === beforePiece.x && piece.y === beforePiece.y)
    );

    temp = temp.map((piece) => {
      return piece.x === jumpedPiece.x && piece.y === jumpedPiece.y
        ? { ...piece, jumped: true }
        : piece;
    });

    temp.push(afterPiece);
    return temp;
  }

  findJumpShots(piece, pieces) {
    let result = [];
    if (this.pieceOneJumpAttacks(piece, pieces).length === 0) {
      return [];
    }
    console.log(this.pieceOneJumpAttacks(piece, pieces));
    const explore = (so_far, start, pieces) => {
      //console.log(pieces);
      let moves = this.pieceOneJumpAttacks(start, pieces);

      if (moves.length === 0) {
        if (so_far.length !== 0) {
          result.push(so_far);
        }
      } else {
        for (let i = 0; i < moves.length; i++) {
          let move = { ...start, x: moves[i][0].x, y: moves[i][0].y };
          let newPieces = this.updatePiecesAfterJump(
            pieces,
            moves[i][1],
            start,
            move
          );
          // console.log(so_far);

          let new_so_far = [...so_far];

          new_so_far.push(move);
          explore(new_so_far, move, newPieces);
        }
      }
    };

    explore([], piece, pieces, {});

    //console.log(result);
    return null;
  }
}

/*
pirma rasti lista kiek is esamo langelio yra kirtimu 
ISFILTERINTI LISTA KAD BUTU TIK VIENOS RUSIES NUKIRSTOS SASKES IR TADA TIKRINTI AR NERA GALIMU MULTIPLE JUMS IR JEIGU BUS TAI TADA FILTRUOTI TIE KURIE TURI IR TIE KURIE NETURI IR VISKAS DONE BUS PAGALIAU
*/
