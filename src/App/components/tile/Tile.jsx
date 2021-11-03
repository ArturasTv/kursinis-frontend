import styles from "./Tile.module.scss";
import { useState, useEffect } from "react";
import whitePiece from "./../../assets/images/white.png";
import blackPiece from "./../../assets/images/black.png";
import whiteQueen from "./../../assets/images/whiteQueen.png";
import blackQueen from "./../../assets/images/blackQueen.png";
import { pieceColor as pColor, pieceType as pType } from "../../constants";

const Tile = ({ tileColor, pieceType, pieceColor, jumped }) => {
  const findPiece = (pieceType, pieceColor) => {
    if (pieceType === pType.PAWN && pieceColor === pColor.WHITE)
      return whitePiece;
    if (pieceType === pType.QUEEN && pieceColor === pColor.WHITE)
      return whiteQueen;
    if (pieceType === pType.PAWN && pieceColor === pColor.BLACK)
      return blackPiece;
    if (pieceType === pType.QUEEN && pieceColor === pColor.BLACK)
      return blackQueen;
  };
  return (
    <div className={styles[`tile-${tileColor}`]}>
      {pieceType && pieceColor && (
        <div
          style={{
            backgroundImage: `url(${findPiece(pieceType, pieceColor)})`,
            opacity: jumped ? 0.3 : 1,
          }}
          className={styles["piece"]}
        />
      )}
    </div>
  );
};

export default Tile;
