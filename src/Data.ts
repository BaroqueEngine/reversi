export type PieceType = "black" | "white";
export type AllPieceType = PieceType | "none";
export const Colors: { [key in AllPieceType]: string } = {
  black: "black",
  white: "white",
  none: "transparent",
};
export const Size = 8;
export type Point = {
  x: number;
  y: number;
};
