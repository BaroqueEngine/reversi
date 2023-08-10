import { atom } from "jotai";
import { PieceColor, Size } from "./Data";

export const turnAtom = atom<number>(PieceColor.Black);
export const boardAtom = atom<number[]>([
  ...Array(Size * Size).fill(PieceColor.None),
]);
export const isPlayingAtom = atom<boolean>(false);
export const piecesAtom = atom<number[]>([0, 0]);
