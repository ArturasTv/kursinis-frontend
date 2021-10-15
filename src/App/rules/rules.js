import { pieceType as pType, playerType as plType } from "../constants";
import { findDirection } from "../utills";
export default class Rules {
  isTileOccupied(x, y, pieces) {
    return pieces.find((piece) => piece.x === x && piece.y === y);
  }
  isPathBlockiedByOwnPiece(px, py, x, y, playerType, pieces) {
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

  countEnemyPiecesInPath(px, py, x, y, playerType, pieces) {
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
  isAnyAttacksOnBoard(pieces, playerType) {
    const directions = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ];
    pieces.forEach((piece) => {
      if (piece.playerType === plType.WHITE) {
        if (piece.pieceType === pType.PAWN) {
          for (let i = 0; i < directions.length; i++) {
            if (
              pieces.find(
                (p) =>
                  p.x === piece.x + directions[i][0] &&
                  p.y === piece.y + directions[i][1] &&
                  p.playerType === plType.BLACK
              )
            ) {
              if (
                piece.x + 2 * directions[i][0] <= 7 &&
                piece.x + 2 * directions[i][0] >= 0 &&
                piece.y + 2 * directions[i][1] <= 7 &&
                piece.y + 2 * directions[i][1] >= 0
              ) {
                if (
                  !pieces.find(
                    (p) =>
                      p.x === piece.x + 2 * directions[i][0] &&
                      p.y === piece.y + 2 * directions[i][1]
                  )
                ) {
                  console.log(piece);
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
                    p.playerType === plType.BLACK
                )
              ) {
                if (
                  piece.x + (j + 1) * directions[i][0] <= 7 &&
                  piece.x + (j + 1) * directions[i][0] >= 0 &&
                  piece.y + (j + 1) * directions[i][1] <= 7 &&
                  piece.y + (j + 1) * directions[i][1] >= 0
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
                        plType.WHITE,
                        pieces
                      )
                    ) {
                      if (
                        this.countEnemyPiecesInPath(
                          piece.x,
                          piece.y,
                          piece.x + (j + 1) * directions[i][0],
                          piece.y + (j + 1) * directions[i][1],
                          plType.WHITE,
                          pieces
                        ) === 1
                      ) {
                        console.log("dama", piece);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (piece.playerType === plType.BLACK) {
        if (piece.pieceType === pType.PAWN) {
          for (let i = 0; i < directions.length; i++) {
            if (
              pieces.find(
                (p) =>
                  p.x === piece.x + directions[i][0] &&
                  p.y === piece.y + directions[i][1] &&
                  p.playerType === plType.WHITE
              )
            ) {
              if (
                piece.x + 2 * directions[i][0] <= 7 &&
                piece.x + 2 * directions[i][0] >= 0 &&
                piece.y + 2 * directions[i][1] <= 7 &&
                piece.y + 2 * directions[i][1] >= 0
              ) {
                if (
                  !pieces.find(
                    (p) =>
                      p.x === piece.x + 2 * directions[i][0] &&
                      p.y === piece.y + 2 * directions[i][1]
                  )
                ) {
                  console.log(piece);
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
                    p.playerType === plType.WHITE
                )
              ) {
                if (
                  piece.x + (j + 1) * directions[i][0] <= 7 &&
                  piece.x + (j + 1) * directions[i][0] >= 0 &&
                  piece.y + (j + 1) * directions[i][1] <= 7 &&
                  piece.y + (j + 1) * directions[i][1] >= 0
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
                        plType.BLACK,
                        pieces
                      )
                    ) {
                      if (
                        this.countEnemyPiecesInPath(
                          piece.x,
                          piece.y,
                          piece.x + (j + 1) * directions[i][0],
                          piece.y + (j + 1) * directions[i][1],
                          plType.BLACK,
                          pieces
                        ) === 1
                      ) {
                        console.log("dama", piece);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
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
}
