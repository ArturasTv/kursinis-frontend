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
    let firstJumpAttacks = [];
    let copy1 = [];
    let copy2 = [];
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

    let jumpedPieces = [...firstJumpAttacks];
    jumpedPieces = jumpedPieces.map((piece) => piece[1]);
    jumpedPieces = jumpedPieces.filter(
      (piece, index, self) =>
        index === self.findIndex((t) => t.x === piece.x && t.y === piece.y)
    );
    jumpedPieces = jumpedPieces.map((piece) => [piece, []]);

    if (firstJumpAttacks.length !== 0 && jumpedPieces.length !== 0) {
      for (let jj = 0; jj < firstJumpAttacks.length; jj++) {
        for (let oo = 0; oo < jumpedPieces.length; oo++) {
          if (
            jumpedPieces[oo][0].x == firstJumpAttacks[jj][1].x &&
            jumpedPieces[oo][0].y == firstJumpAttacks[jj][1].y
          ) {
            if (
              this.checkIfQueenHaveStrikes(pieces, jumpedPieces[oo][0], {
                ...piece,
                ...firstJumpAttacks[jj][0],
              })
            ) {
              jumpedPieces[oo][1].push(firstJumpAttacks[jj][0]);
            }
          }
        }
      }
      for (let ee = 0; ee < jumpedPieces.length; ee++) {
        if (jumpedPieces[ee][1].length !== 0) {
          copy1.push(
            [...firstJumpAttacks].filter((item) => {
              return (
                item[1].x === jumpedPieces[ee][0].x &&
                item[1].y === jumpedPieces[ee][0].y &&
                jumpedPieces[ee][1].some((p) => {
                  return p.x === item[0].x && p.y === item[0].y;
                })
              );
            })
          );
        }
      }
      for (let ee = 0; ee < jumpedPieces.length; ee++) {
        if (jumpedPieces[ee][1].length === 0) {
          copy2.push(
            [...firstJumpAttacks].filter((item) => {
              return (
                item[1].x === jumpedPieces[ee][0].x &&
                item[1].y === jumpedPieces[ee][0].y
              );
            })
          );
        }
      }
    }

    if (copy1.length !== 0 || copy2.length !== 0) {
      return [...copy1.flat(1), ...copy2.flat(1)];
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

  checkIfPieceBecomeQueen(piece) {
    if (piece.pieceType === pType.PAWN) {
      if (piece.playerType === plType.WHITE) {
        if (piece.y === 7) return true;
      }
      if (piece.playerType === plType.BLACK) {
        if (piece.y === 0) return true;
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
    if (this.checkIfPieceBecomeQueen(afterPiece))
      afterPiece.pieceType = pType.QUEEN;
    return temp;
  }

  findJumpShots(piece, pieces) {
    let result = [];
    if (this.pieceOneJumpAttacks(piece, pieces).length === 0) {
      return [];
    }
    const explore = (so_far, start, pieces) => {
      let moves = this.pieceOneJumpAttacks(start, pieces);

      if (moves.length === 0) {
        if (so_far.length !== 0) {
          result.push(so_far);
        }
      } else {
        for (let i = 0; i < moves.length; i++) {
          let move = {
            ...start,
            x: moves[i][0].x,
            y: moves[i][0].y,
            jx: moves[i][1].x,
            jy: moves[i][1].y,
          };
          let newPieces = this.updatePiecesAfterJump(
            pieces,
            moves[i][1],
            start,
            move
          );

          let new_so_far = [...so_far];

          new_so_far.push(move);
          explore(new_so_far, move, newPieces);
        }
      }
    };

    explore([], piece, pieces);
    return result;
  }
}
