import { atom } from "jotai";
import { AllPieceType, PieceType, Size } from "./Data";

export const turnAtom = atom<PieceType>("black");
export const boardAtom = atom<AllPieceType[]>([
  ...Array<AllPieceType>(Size * Size).fill("none"),
]);
export const isPlayingAtom = atom<boolean>(false);
export const isResultAtom = atom<boolean>(false);
export const piecesAtom = atom<{ [key in PieceType]: number }>({
  black: 0,
  white: 0,
});
export const canPutPositionAtom = atom<boolean[]>([
  ...Array<boolean>(Size * Size).fill(false),
]);
export const passCountAtom = atom<number>(0);
export const selectPlayerAtom = atom<boolean[]>([...Array(2).fill(true)]);
